import { SignupInput } from "@swasti3719/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom" ;
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type} : {type : "signup" | "signin"})=>{
    const navigate = useNavigate() ;
    const [ postInputs , setpostInputs ] = useState<SignupInput>({
        name : "" ,
        username : "" ,
        password : ""
    }) ;

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,postInputs) ;
            const jwt = response.data ;
            localStorage.setItem("token",jwt) ;
            navigate("/blog") ;
        }catch(err){

        }
    }

    return <div className = "h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                   { type === "signin" ? "Don't have an account?" : "Already have an account?" }
                    <Link className = "pl-2 underline" to = {type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                </div>
                {type == "signup" ? <LabelledInput label="Name" placeholder="Swasti Prakash..." onChange={(e)=>{
                    setpostInputs({
                        ...postInputs ,
                        name : e.target.value ,
                    })
                }}></LabelledInput> : null }
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
                <div className="pt-5 flex justify-center">
                    <button onClick = {sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{ type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
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