import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "invalid query parameter",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser){
      return Response.json(
        {
          success: false,
          message:"username already taken"
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "username is unique"
      },
      {
        status: 200,
      }
    );

    

  } catch (error) {
    console.error("Error checking usernaem");
    return (
      Response.json({
        success: false,
        message: "error checking username",
      }),
      { status: 500 }
    );
  }
}