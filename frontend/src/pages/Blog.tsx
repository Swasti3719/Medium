import { useBlog } from "../hooks/index.ts"
import { useParams } from "react-router-dom";
import { Fullblog } from "../components/FullBlog.tsx";
import { BLogSkeleton } from "../components/BlogSkeleton.tsx";
import { Spinner } from "../components/Spinner.tsx";


export const Blog = () => {
    const { id } = useParams() ;

    const { loading , blog } = useBlog({
        id : id || "" ,
    })
   
    if(loading) {
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Spinner />
            </div> 
        </div>
    }
    return <div>
        <Fullblog blogging = {blog} />
    </div>
}


