import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {token} = reqBody
        const user = await User.findOne({
            verifyToken:token,
            verifyTokenExpires:{$gt: Date.now()}
        });

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "User saved successfully.",
            token: token,
            success: true
        });
    } catch (e:any) {
        return NextResponse.json({error:e.message},{status:500});
    }
}