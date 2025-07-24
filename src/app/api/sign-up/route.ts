import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByusername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByusername) {
      return Response.json(
        {
          success: false,
          message: "username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "user already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifycodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifycodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        message: [],
      });
      await newUser.save();
    }

    //send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "user registered successfully, please check your email",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("error registering user", error);
    return Response.json(
      {
        success: false,
        message: "error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
/**
 * This file contains the API route for user sign-up.
 * It handles user registration, including checking for existing users,
 * hashing passwords, saving user data to the database, and sending
 * verification emails.
 */

/**
 * Imports the database connection utility.
 */

/**
 * Imports the Mongoose User model.
 */

/**
 * Imports the bcryptjs library for password hashing.
 */

/**
 * Imports the helper function for sending verification emails.
 */

/**
 * Imports the `date` type from `zod` (though it appears unused in this snippet).
 */

/**
 * Handles the POST request for user sign-up.
 *
 * @param request The incoming Request object containing user sign-up data.
 * @returns A Promise that resolves to a Response object indicating the outcome of the sign-up process.
 */

/**
 * Connects to the database.
 */

/**
 * Tries to process the sign-up request.
 */

/**
 * Extracts username, email, and password from the request body.
 */

/**
 * Checks if a user with the given username already exists and is verified.
 */

/**
 * If a verified user with the username exists, returns a 400 Bad Request response.
 */

/**
 * Checks if a user with the given email already exists.
 * Generates a 6-digit verification code.
 */

/**
 * If a user with the email exists:
 */

/**
 * If the existing user is verified, returns a 400 Bad Request response.
 */

/**
 * If the existing user is not verified, updates their password, verification code,
 * and verification code expiry, then saves the changes.
 */

/**
 * If no user with the email exists:
 */

/**
 * Hashes the provided password.
 */

/**
 * Calculates the expiry date for the verification code (1 hour from now).
 */

/**
 * Creates a new UserModel instance with the provided user data.
 */

/**
 * Saves the new user to the database.
 */

/**
 * Sends a verification email to the user.
 */

/**
 * If the email sending fails, returns a 500 Internal Server Error response.
 */

/**
 * If the user is registered and email sent successfully, returns a 20*/
