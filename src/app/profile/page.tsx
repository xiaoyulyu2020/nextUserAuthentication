"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function ProfilePage() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logged out")
            router.push("/login")
        } catch (e:any) {
            console.log(e.message)
            toast.error(e.message)
        }
    }

    const [data, setData] = useState("")
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
             <p>{ data ? <Link href={`/profile/${ data }`}>{data}</Link> : "NOTHING" }</p>
            <br/>
            <button
                onClick={logout}
                className="mt-4 bg-amber-500 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button
                onClick={getUserDetails}
                className="mt-4 bg-amber-500 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded">User Detail</button>
        </div>
    )
}