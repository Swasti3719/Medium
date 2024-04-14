import { Hono } from "hono" ;
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@swasti3719/medium-common";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string ;
        JWT_SECRET : string 
    }
}>() ;

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL ,
    }).$extends(withAccelerate()) ;
    const body = await c.req.json() ;
    try {
      const { success } = signupInput.safeParse(body) ;
      if(!success){
        c.status(411) ;
        return c.json({
          message : "Incorrect Inputs" 
        })
      }
    }
    catch(err){
      console.log(err) ;
    }
    try{
      const user = await prisma.user.create({
        data : {
          username : body.username ,
          password : body.password ,
          name : body.name 
        }
      })
  
      const jwt = await sign({
        id : user.id 
      } , c.env.JWT_SECRET) ;
  
      return c.text(jwt) 
  
    } catch(err){
      c.status(411) ;
      return c.json({
        message : err 
      }) ;
    }
  
    return c.text('Hello Hono!')
})
  
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL ,
    }).$extends(withAccelerate()) ;
    const body = await c.req.json() ;
    const { success } = signinInput.safeParse(body) ;
    if(!success){
      c.status(411) ;
      return c.json({
        message : "Incorrect Inputs" 
      })
    }
    try{
      const user = await prisma.user.findFirst({
        where : {
          username : body.username ,
          password : body.password  
        }
        })
  
        if(!user){
            c.status(403) ;
            return c.json({
                message : "You Entered The Wrong Creds" 
            })
        }
  
        const jwt = await sign({
            id : user.id 
        } , c.env.JWT_SECRET) ;
  
        return c.text(jwt) 
  
    } catch(err){
      c.status(411) ;
      return c.text('invalid') ;
    }
  
    return c.text('Hello Hono!')
})
  