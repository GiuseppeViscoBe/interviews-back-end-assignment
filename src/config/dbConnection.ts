import mongoose, { Connection } from 'mongoose';

let connection: Connection | null = null;

const connectDb = async (): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  try {
    const newConnection = await mongoose.connect(process.env.CONNECTION_STRING as string);
    connection = newConnection.connection;
    console.log(
      "Database connected: ",
      connection.host,
      connection.name
    );
    return connection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}; 

export default connectDb;
