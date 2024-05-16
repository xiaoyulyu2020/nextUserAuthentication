"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response);
            router.push("/login");
        } catch (e:any) {
            console.log("Sign up failed...", e.message);
            toast.error("Error creating account: ", e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-md shadow-sm w-1/5 text-sky-600"
                type="text"
                id="username"
                placeholder="Enter your username"
                onChange={(e) => setUser({...user, username: e.target.value})}/>
            <hr/>
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-md shadow-sm w-1/5 text-sky-600"
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setUser({...user, email: e.target.value})}/>
            <hr/>
            <label htmlFor="username">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-md shadow-sm w-1/5 text-sky-600"
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setUser({...user, password: e.target.value})}/>
            <br/>
            <button
            className="p-2 border border-gray-300 rounded-md shadow-sm w-1/5 text-sky-600"
            onClick={onSignup}
            >{ buttonDisabled? "No signup" : "SignUp" }</button>
            <br/>
            <Link href="/login">or Login</Link>
        </div>
    )
}