import style from "../../styles/signup.module.scss"
import {useRouter} from "next/router"
import React from "react"
import axios from "axios"
export default function Login() {

    let [show,setShow] = React.useState(false)

    React.useEffect(() => {
        window.ssn = JSON.parse(window.localStorage.getItem("session"))
    
        let host = "https://api.uploadly.dev"
        if (window.ssn) {
            axios.get(host+"/api/account/"+window.ssn.accountId, {headers: {
                "Authorization": "bearer "+window.ssn.token
            }}).then((res) => {
                if(res.status !== 404) {
                    router.push("/")
                }
                else {
                    setShow(true)
                }
            })
        }
        setShow(true)
    },[])

    const router = useRouter()
    
    function Login() {
        console.log("login")
        let email = document.querySelector("input[name='email']").value
        let password = document.querySelector("input[name='password']").value
        let host = "https://api.uploadly.dev"
        
        axios.post(host+"/api/login", {email,password}).then((res) => {
            console.log(res.data)
            window.localStorage.setItem("session",JSON.stringify(res.data.session))
            router.push("/")
        }).catch(err => console.log(err))
    }
    if (show) {return(
        <div className="flex pl-6 pr-6  w-full pt-5 sm:h-screen sm:items-center">
            <div className="w-full sm:w-1/2 flex justify-center">
                <div className="flex flex-col w-full max-w-sm ">
                    <div className="h-32 sm:hidden">

                    </div>
                    <div className="top flex flex-col pb-3 pt-3">
                        <h1 className=" text-lg">Sign in</h1>
                        <div style={{ fontSize: "14px", fontWeight: 600 }} className="flex">
                            <p className=" text-gray-400">New to uploadly? </p><a onClick={e => { 
                                e.preventDefault()
                                router.push("/signup")}} className=" text-blue-400 cursor-pointer"> Sign up for an account</a>
                        </div>
                    </div>
                    <div className="flex flex-col mt-2 mb-2 gap-3">
                        <label htmlFor="user_email">Email</label>
                        <input className={style.input} type="email" name="email" style={{ border: "1px solid #616161", backgroundColor: "#2b2b2b", height: "40px", borderRadius: "5px", paddingLeft: "10px" }} />
                    </div>
                    <div className="flex flex-col mt-2 mb-2 gap-3">
                        <label htmlFor="password">Password</label>
                        <input className={style.input} type="password" name="password" style={{ border: "1px solid #616161", backgroundColor: "#2b2b2b", height: "40px", borderRadius: "5px", paddingLeft: "10px" }} />
                    </div>
                    <p className="mt-2">
                        <a style={{ color: "#a1a1a1", fontSize: "14px" }} className=" text-gray-500 cursor-pointer ">Forgot password?</a>
                    </p>

                    <div className="b">
                        <button onClick={Login} className="mt-4 w-full font-semibold pt-2 pb-1 bg-white text-black rounded-md text-sm">Sign in</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
}