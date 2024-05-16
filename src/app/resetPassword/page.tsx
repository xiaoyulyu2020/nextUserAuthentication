'use client'
import Link from "next/link";
import axios from "axios";
import React, {useEffect, useState} from "react";

export default function ResetPassword () {
    const [password, setPassword] = useState("");

    return (
        <div className="text-center">
            <h1 className="bg-amber-500 text-center">Reset your password</h1>
            <label htmlFor="newpasssword">New Password</label>
            <input type="password"
                   id="newpasssword"
                   placeholder="new password"
                   onChange={(input)=>{
                       setPassword(input.target.value);
                   }}/>

        </div>
    )
}