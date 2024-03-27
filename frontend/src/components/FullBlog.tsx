import { Blog } from "../hooks"
import { Appbar } from "./Appbar"

export const Fullblog = ({blog} : {blog : Blog}) => <div>
    <Appbar />
    <div className="grid grid-cols-12 px-10 w-full pt-200">
        <div className="col-span-8">
            <div className="text-3xl font-extrabold">
                {blog.title}
            </div>
            <div className="">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4">
            hello
        </div>
    </div>
</div>