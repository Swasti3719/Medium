import { SignupInput } from "@swasti3719/medium-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"

export const Auth = ({type} : {type : "signup" | "signin"})=>{
    const [ postInputs , setpostInputs ] = useState<SignupInput>({
        name : "" ,
        username : "" ,
        password : ""
    }) ;

    return <div className = "h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                    Already have an account?
                    <Link className = "pl-2 underline" to = {"/signin"}>Login</Link>
                </div>
                <LabelledInput label="Name" placeholder="Swasti Prakash..." onChange={(e)=>{
                    setpostInputs({
                        ...postInputs ,
                        name : e.target.value ,
                    })
                }}></LabelledInput>
                <LabelledInput label="Username" placeholder="swasti@gmail.com" onChange={(e)=>{
                    setpostInputs({
                        ...postInputs ,
                        username : e.target.value ,
                    })
                }}></LabelledInput>
                <LabelledInput label="Password" type = {"password"} placeholder="123456789" onChange={(e)=>{
                    setpostInputs({
                        ...postInputs ,
                        password : e.target.value ,
                    })
                }}></LabelledInput>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>
            </div>
        </div>
    </div>
}

interface LabelledInputtype{
    label : string ;
    placeholder : string ;
    onChange : (e : ChangeEvent<HTMLInputElement>)=>void
    type? : string
}



function LabelledInput({label,placeholder,onChange,type} : LabelledInputtype){
    return <div>
        <div>
            <label className="block mb-1 pt-4 text-sm text-black font-semibold">{label}</label>
            <input onChange = {onChange} type = { type || "text" } id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}