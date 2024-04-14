import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const Fullblog = ({ blogging } : { blogging :  Blog }) => { return <div>
    <Appbar />
    <div className="flex justify-center">
    <div className="grid grid-cols-12 px-10 w-full pt-200">
        <div className="px-5 col-span-8">
            <div className="px-5 text-4xl font-extrabold pt-14">
                {blogging.title }
            </div>
            <div className="px-5 text-slate-500 text-1xl pt-3">
                Post on 2nd December 2023
            </div>
            <div className="px-5 text-l pt-8">
                {blogging.content}
            </div>
        </div>
        <div className="col-span-4 pt-20">
            <div className="text-slate-600">
                Author
            </div>
            <div className="pt-5 flex">
                <div className="pr-2">
                    <Avatar name={blogging.author.name || "Anonymous"}/>
                </div>
                <div className="text-xl font-bold">
                    {blogging.author.name || "Anonymous"}
                </div>
            </div>   
            <div className="pt-2 pl-7 text-slate-400">
                Random catch phrase about the author's ability to grab the reader attention
            </div>
        </div>
    </div>
    </div>
</div> }