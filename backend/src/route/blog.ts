import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@swasti3719/medium-common";
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string ,
        JWT_SECRET : string
    } ,
    Variables : {
        userId : string 
    }
}>() ;

blogRouter.use("/*",async(c,next)=>{
    const authHeader = c.req.header("authorization")  || "";
    const user = await verify(authHeader,c.env.JWT_SECRET) ;
    if(user){
        c.set("userId",user.id) ;
        await next() ;
    }else {
        c.status(403) ;
        return c.json({
            message : "You are not Logged in" 
        })
    }
})

blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL ,
    }).$extends(withAccelerate()) ;
    const body = await c.req.json() ;
    const { success } = createBlogInput.safeParse(body) ;
    if(!success){
        c.status(411) ;
        return c.json({
            message : "inputs are wrong" 
        })
    }
    const userId = c.get("userId") ;

    const blog = await prisma.blog.create({
        data : {
            title : body.title ,
            content : body.content ,
            authorId : Number(userId) 
        }
    })

    return c.json({
        id : blog.id 
    })
})
  
blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL ,
    }).$extends(withAccelerate()) ;
    const body = await c.req.json() ;

    const { success } = updateBlogInput.safeParse(body) ;
    if(!success){
        c.status(411) ;
        return c.json({
            message : "inputs are wrong" 
        })
    }

    const blog = await prisma.blog.update({
        where : {
            id : body.id 
        },
        data : {
            title : body.title ,
            content : body.content 
        }
    })

    return c.json({
        id : blog.id 
    })
}) 

//TODO ADD PAGINATION 

blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL ,
    }).$extends(withAccelerate()) ;
    
    const blogs = await prisma.blog.findMany({
        select : {
            content : true ,
            title : true ,
            id : true ,
            author : {
                select : {
                    name : true ,
                }
            } 
        }
    }) ;

    return c.json({
        blogs 
    })
})
  
blogRouter.get('/:id', async(c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL ,
        }).$extends(withAccelerate()) ;
        const id = c.req.param("id") ;
    
        const blog = await prisma.blog.findFirst({
            where : {
                id : Number(id)  ,
            } ,
            select : {
                id : true ,
                title : true ,
                content : true ,
                author : {
                    select : {
                        name : true  
                    }
                }
            }
        })
    
        return c.json({
            blog  
        })
    } catch(err){
        c.status(411) ;
        return c.json({
            message : "Couldn't get the blog post" 
        })
    }
}) 