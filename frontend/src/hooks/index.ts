import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string ;
    "title": string ;
    "id": number
    "author": {
        "name": string 
    }
}

export const useBlog = ({id} : {id : string})=>{
    const [loading,setLoading] = useState(true) ;
    const [blog,setBlog] = useState<Blog>() ;

    useEffect(()=>{
        console.log(`${BACKEND_URL}/api/v1/blog/${id}`) ;

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers : {
                Authorization : localStorage.getItem("token") 
            }
        })
            .then(response =>{
                setBlog(response.data.blog) ;
                setLoading(false) ;
            })
    },[id])
    return {
        loading ,
        blog
    }
}

export const useBlogs = ()=>{
    const [loadingEachOne,setLoadingEachOne] = useState(true) ;
    const [blogsEachOne,setBlogsEachOne] = useState<Blog>() ;

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers : {
                Authorization : localStorage.getItem("token") 
            }
        })
            .then(response =>{
                setBlogsEachOne(response.data.blogs) ;
                setLoadingEachOne(false) ;
            })
    },[])
    return {
        loadingEachOne ,
        blogsEachOne
    }
}