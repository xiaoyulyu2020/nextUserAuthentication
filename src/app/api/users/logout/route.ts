// just clear out the token, that is

import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successfully",
                success: true,
            }
        )
        response.cookies.set("token", "",
            {httpOnly: true})
        return response
    } catch (e:any) {
        return NextResponse.json({error: e.message}, {status: 500});
    }
}