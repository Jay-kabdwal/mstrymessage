import { Message } from "@/model/User";
export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean;
    messages?:Array<Message>;
    
}
/**
 * This file defines the `ApiResponse` interface, which is used for standardizing API responses across the application.
 */

/**
 * Imports the `Message` type from the User model, used for an optional array of messages in the API response.
 */

/**
 * Defines the structure of a standard API response.
 * @property {boolean} success - Indicates whether the API request was successful.
 * @property {string} message - A descriptive message about the API response.
 * @property {boolean} [isAcceptingMessages] - Optional property indicating if messages are being accepted (e.g., for user status).
 * @property {Array<Message>} [messages] - Optional array of messages, typically used when fetching user messages.
 */
