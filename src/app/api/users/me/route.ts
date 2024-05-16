import {getDataFromToken} from "@/helpers/getDataFromToken";
import {NextResponse, NextRequest} from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect()

export async function GET(req: NextRequest) {
    try {
        const userID = await getDataFromToken(req);
        const user = await User.findOne({_id:userID}).select("-password");
        return NextResponse.json({
            message:"success",
            data:user
        });
    } catch (e:any) {
        return NextResponse.json({error: e.message}, {status: 400});
    }
}