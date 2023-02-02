import mongoose from "mongoose";

const Connection = () => {
  const MONGOOSE_URL =
    "mongodb+srv://ashimbc1012:vw86Aq8NuDFrOBD3@cluster0.hhvjruo.mongodb.net/?retryWrites=true&w=majority";

  mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("database Connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("database disconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Error while connecting to database", error.message);
  });
};

export default Connection;
