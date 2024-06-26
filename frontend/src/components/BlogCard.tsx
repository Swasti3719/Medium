import { Link } from "react-router-dom";

interface BlogCardProps {
    id : number ;
    authorName : string ;
    title : string ;
    content : string ;
    publishedDate : string 
}
 
export const BlogCard = ({
    id ,
    authorName ,
    title ,
    content ,
    publishedDate
} : BlogCardProps)=>{
    return <Link to = {`/blog/${id}`}><div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name = {authorName} />
            </div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2 ">
                <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
        </div>
        <div className="pt-3 text-xl font-bold">
            {title} 
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="pt-5 text-slate-500 text-sm font-thin">
           {`${Math.ceil(content.length/100)} minutes read`}
        </div>
    </div>
    </Link>
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export function Avatar({name} :  { name : string }){
    return <div className={`relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
}