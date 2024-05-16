import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } catch (e:any) {
        throw new Error(e.message)
    }
}