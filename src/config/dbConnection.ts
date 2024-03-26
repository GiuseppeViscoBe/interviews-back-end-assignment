import mongoose, { Connection } from "mongoose";

let connection: Connection | null = null;

const connectDb = async (): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  try {
    const newConnection = await mongoose.connect(
      process.env.CONNECTION_STRING as string
    );
    connection = newConnection.connection;

    return connection;
  } catch (error) {
    console.log(error);
    console.log("ESCO DAL PROCESSO")
    process.exit(1);
  }
};

export default connectDb;
