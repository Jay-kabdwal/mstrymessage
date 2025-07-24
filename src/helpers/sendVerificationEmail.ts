import VerificationEmail from "../../emails/sendVerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifycode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Hello world",
      react: VerificationEmail({ username, otp: verifycode }),
    });

    return {
      success: true,
      message: "sent verification email",
    };
  } catch (error) {
    console.log("error sending verification emial", error);

    return {
      success: false,
      message: "error sending verification email",
    };
  }
}
/**
 * This file contains a helper function to send a verification email to a user.
 * It uses the Resend API to send emails and a custom React component for the email template.
 */

/**
 * Imports the `VerificationEmail` React component for the email template.
 */

/**
 * Imports the `ApiResponse` type definition for consistent API responses.
 */

/**
 * Imports the initialized Resend client for sending emails.
 */

/**
 * Asynchronously sends a verification email to the specified user.
 *
 * @param email The recipient's email address.
 * @param username The username of the recipient.
 * @param verifycode The verification code to be sent.
 * @returns A Promise that resolves to an `ApiResponse` indicating the success or failure of the email sending operation.
 */

/**
 * Attempts to send the email using the Resend API.
 * The `from` address is set to "Acme <onboarding@resend.dev>".
 * The `to` address is the provided `email`.
 * The `subject` is "Hello world".
 * The `react` property renders the `VerificationEmail` component with the provided `username` and `verifycode` (as `otp`).
 */

/**
 * If the email is sent successfully, returns a success `ApiResponse`.
 */

/**
 * If an error occurs during email sending, logs the error and returns a failure `ApiResponse`.
 */
