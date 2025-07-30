import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import  { Message } from "@/model/User";

export async function POST(request:Request){
    await dbConnect();

    const { username , content }= await request.json();

    try {
        const user = await UserModel.findOne({username});

        if(!user){
            return Response.json({
                success: false,
                message:'user not found'
            },{
                status:404
            })
        }

        //check if user accepting messages
        if(!user.isAcceptingMessage ){
            return Response.json({
                success: false,
                message: 'user not accepting messages'
            }, {
                status: 403
            }) 
        }

        const newMessage ={content, createdAt:new Date()}
        user.message.push(newMessage as Message)

        await user.save()
        return Response.json({
            success: true,
            message: 'messages sent succesfully'
        }, {
            status: 200
        })

    } catch (error) {
        console.error("unable to send message")
        return Response.json({
            success: false,
            message: 'unable to send message'
        }, {
            status: 500
        })
        
    }

}