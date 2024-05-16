import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log("reqBody", reqBody)

        //check existing
        const user = await User.findOne({ username, email })
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User(
            {
                username,
                email,
                password: hashedPassword,
            }
        );

        const savedUser = await newUser.save()
        console.log("savedUser", savedUser)

        // send email
        await sendEmail({email, emailType:"VERIFY", userId: savedUser._id})

        return NextResponse.json({success: "User saved successfully.", savedUser});

    } catch (e: any) {
        return NextResponse.json({error: e.message}, {status: 500});
    }
}