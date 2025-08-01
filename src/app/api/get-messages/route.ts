import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user: User = session?.user
    
    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "not authenticated",
            },
            {
                status: 401,
            }
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            {$match: {id: userId}},
            {$unwind:'$messages'},
            {$sort: {'messages.createdAt': -1}},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}},
        ])
        if(!user || user.length === 0){
            return Response.json(
                {
                    success: false,
                    message: "user not found",
                },
                {
                    status: 401,
                }
            );
        }
        return Response.json(
            {
                success: true,
                messages:user[0].messages,
            },
            {
                status: 200,
            }
        );
        
    } catch (error) {
        console.error("unable to get messages",error)
        Response.json({
            success: false,
            message:"unable to get messages"
        },{
            status:500
        })
    }


}