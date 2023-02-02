import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import route from "./routes/todolist.js";
import Connection from "./database/db.js";
import userRoute from "./routes/user.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/todolist", route);
app.use("/", userRoute);
app.use("/url", (req, res) => {
  res.json({
    message: "This is Test",
  });
});

Connection();

const PORT = 2500;
app.listen(PORT, () => console.log("Successfully connected"), PORT);
