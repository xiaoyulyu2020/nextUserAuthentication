import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST (request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log("reqBody", reqBody)

        //Check existing
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        //Check passwork validation
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        //Create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
        }
        //Create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        const response = NextResponse.json({
            success: "User saved successfully.",
            token: tokenData
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    } catch (e:any) {
        return NextResponse.json({error: e.message}, {status: 500});
    }
}