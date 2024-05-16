// send link to email for reset password.
// get new password from frontend input. update

import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const {token} = reqBody;
    const user = await User.findOne({
        verifyToken:token,
        verifyTokenExpires:{$gt: Date.now()}
    });
    if (!user) {
        return NextResponse.json({error: "User not found"}, {status: 400});
    }
// send email with link

}