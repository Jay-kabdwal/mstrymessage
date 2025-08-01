import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !session.user) {
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

    const userId = user._id;
    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                isAcceptingMessage: acceptMessages,
            },
            { new: true }
        );
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "failed to update user status to accept messages",
                },
                {
                    status: 401,
                }
            );
        }
        return Response.json(
            {
                success: true,
                message: "message acceptance status updated succesfully",
                updatedUser,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("failed to update user status to accept messages");
        return Response.json(
            {
                success: false,
                message: "failed to update user status to accept messages",
            },
            {
                status: 500,
            }
        );
    }
}


export async function GET(request: Request) {
    dbConnect()

    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !session.user) {
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

    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "failed to find user",
                },
                {
                    status: 404,
                }
            );
        }
        return Response.json({
            success: true,
            message: "user found",
            isAcceptingMessage: foundUser.isAcceptingMessage
        }, {
            status: 200
        })
    } catch (error) {
        console.error("error in getting message acceptance status")
        return Response.json({
            success: false,
            message: "error in getting message acceptance status"
        }, {
            status: 500
        })

    }


}