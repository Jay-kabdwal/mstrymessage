import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
 
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("database connected succesfully");
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
/**
 * This file handles the database connection using Mongoose.
 * It ensures a single connection instance across the application.
 */

/**
 * Defines the type for the connection object, indicating if the database is connected.
 */

/**
 * Initializes an empty connection object to store the connection state.
 */

/**
 * Asynchronously connects to the MongoDB database.
 * If already connected, it logs a message and returns.
 * Otherwise, it attempts to connect using the MONGODB_URI from environment variables.
 * On successful connection, it updates the connection state and logs a success message.
 * On failure, it logs an error and exits the process.
 */

/**
 * Exports the `dbConnect` function as the default export.
 */
