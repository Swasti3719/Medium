import { Circle } from "./BlogCard"

export const BLogSkeleton = ()=>{
    return <div>
        <div className="flex">
            <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
        <div className="pt-3 text-xl font-bold">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div> 
        </div>
        <div className="text-md font-thin">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="pt-5 text-slate-500 text-sm font-thin">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
    </div>
}