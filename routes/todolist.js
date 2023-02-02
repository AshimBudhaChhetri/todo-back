import express from "express";
import {
  gettodocontroller,
  posttodocontroller,
  gettodobyid,
  gettodobyidandupdate,
  gettodobyidanddelete,
  // todelete,
} from "../controller/todocontroller.js";

const route = express.Router();

route.get("/:get", gettodocontroller); // fetch
route.post("/post", posttodocontroller); // value to frontend
route.get("/a/:id", gettodobyid); // minor update
route.get("/getbyidupdate", gettodobyidandupdate);
route.get("/getbyiddelete", gettodobyidanddelete);

export default route;
