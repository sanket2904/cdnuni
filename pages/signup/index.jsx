import style from "../../styles/signup.module.scss"
import { useRouter } from "next/router"
import React from "react"
import axios from "axios"
// import operations from "../../func"
export default function Signup() {
    let host = "https://api.uploadly.dev"
    const [loader,setLoader] = React.useState(false)
    const [match,setMatch] = React.useState("initial")
    const [empty,setEmpty] = React.useState("initial")
    const [email,setEmail] = React.useState("initial")

    const [password,setPassword] = React.useState("initial")
    React.useEffect(() => {
        window.ssn = JSON.parse(window.localStorage.getItem("session"))

        let host = "https://api.uploadly.dev"
        if (window.ssn) {
            axios.get(host + "/api/account/" + window.ssn.accountId, {
                headers: {
                    "Authorization": "bearer " + window.ssn.token
                }
            }).then((res) => {
                if (res.status !== 404) {
                    router.push("/")
                }
                else {
                    
                }
            })
        }
       
    }, [])
    function signUp() {
        let email = document.querySelector("input[name='email']").value
        let password = document.querySelector("input[name='password']").value
        let passWordConfirm = document.querySelector("input[name='passwordConfirm']").value

        if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setEmail("error")
            return
        }
        
        if (password.length < 8) {
            console.log("password too short")
            setPassword("error")
            return
        }

        if (email == "" || password == "" || passWordConfirm == "") {
            setEmpty("empty")
            return
        }
        else {
            setEmpty("filled")
        }
            
        

        if (password !== passWordConfirm) {
            setMatch("unmatched")
            return
        }
    
        

        axios.post(host+"/api/create_account", {email,password}).then((res) => {
            console.log(res.data)
            window.localStorage.setItem("session",JSON.stringify(res.data.session))
            window.location.href = "/"
        }).catch(err => console.log(err))
        setMatch("matched")
        setLoader(true)

        
        
    


       

    }

    const router = useRouter()

    if (!loader) {
        return (
            <div className="flex pl-6 pr-6  w-full pt-5 sm:h-screen sm:items-center">
                <div className="w-full sm:w-1/2 flex justify-center">
                    <div className="flex flex-col w-full max-w-sm ">
                        <div className="h-32 sm:hidden">

                        </div>
                        <div className="top flex flex-col pb-3 pt-3">
                            <h1 className=" text-lg">Sign up</h1>
                            <div style={{ fontSize: "14px", fontWeight: 600 }} className="flex">
                                <p className=" text-gray-400">Already have an account? </p><a onClick={e => {
                                    e.preventDefault()
                                    router.push("/login")
                                }} className=" text-blue-400 cursor-pointer">Sign in</a>
                            </div>
                        </div>

                        <div className="flex flex-col mt-2 mb-2 gap-3">
                            <label htmlFor="user_email">Email</label>
                            <input className={style.input} type="email" name="email" pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" style={{ border: (empty != "empty") ? "1px solid #616161" : "1px solid red", backgroundColor: "#2b2b2b", height: "40px", borderRadius: "5px", paddingLeft: "10px" }} />
                            {email == "error" && <p className="text-red-500 text-sm">Please enter a valid email</p>}
                        </div>
                        <div className="flex flex-col mt-2 mb-2 gap-3">
                            <label htmlFor="password">Password</label>
                            <input className={style.input} type="password" name="password" style={{ border: (match != "unmatched") ? "1px solid #616161" : "1px solid red", backgroundColor: "#2b2b2b", height: "40px", borderRadius: "5px", paddingLeft: "10px" }} />
                            {password == "error" && <p className="text-red-500 text-sm">Password must be atleast 8 characters</p>}
                        </div>
                        <div className="flex flex-col mt-2 mb-2 gap-3">
                            <label htmlFor="password">Password confirmation</label>
                            <input className={style.input} type="password" name="passwordConfirm" style={{ border: (match != "unmatched") ? "1px solid #616161" : "1px solid red", backgroundColor: "#2b2b2b", height: "40px", borderRadius: "5px", paddingLeft: "10px" }} />
                            {
                                !(match != "unmatched") && <p style={{ color: "red" }}>Passwords do not match</p>
                            }
                            {
                                !(empty != "empty") && <p style={{ color: "red" }}>Please fill all the fields</p>
                            }
                        </div>
                        <p className="mt-2">
                            <a style={{ color: "#a1a1a1", fontSize: "14px" }} className=" text-gray-500 cursor-pointer ">Forgot password?</a>
                        </p>

                        <div className="b">
                            <button onClick={signUp} className="mt-4 w-full font-semibold pt-2 pb-1 bg-white text-black rounded-md text-sm">Sign up</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    else {
        return (
            <div className="flex pl-6 pr-6  w-full h-screen pt-5 sm:h-screen sm:items-center items-center justify-center">
                <Loader />
            </div>
        )
    }

   
    
}


function  Loader(params) {
    return (
        <svg style={{width:"40%",height:"40%"}} className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" fill="none" viewBox="0 0 24 24">
            {/* <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> */}
            <path className="opacity-75" fill="currentColor" strokeWidth="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}