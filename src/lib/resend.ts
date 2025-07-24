import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);/**
 * This file initializes the Resend client for sending emails.
 * It uses the RESEND_API_KEY from environment variables for authentication.
 */
