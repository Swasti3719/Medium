import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BLogSkeleton } from "../components/BlogSkeleton.tsx";
import { useBlogs } from "../hooks/index.ts"


interface Blog {
    "content": string ;
    "title": string ;
    "id": number
    "author": {
        "name": string 
    }
}

export const Blogs = () =>{

    const { loadingEachOne , blogsEachOne } = useBlogs() ;

    if(loadingEachOne){
        return <div>
            <Appbar />
            <div className="px-40">
                <BLogSkeleton /> 
                <BLogSkeleton /> 
                <BLogSkeleton /> 
                <BLogSkeleton />
            </div>
        </div>
    }
    return <div>
           <Appbar />
           <div className="flex justify-center">
        <div className="">
            {blogsEachOne.map(blogEach => <BlogCard 
                id = {blogEach.id} 
                authorName = {blogEach.author.name || "U"} 
                title = {blogEach.title} 
                content = {blogEach.content} 
                publishedDate = {"12/3/2003"} 
            />)}
        </div>
    </div> 
        </div>
}