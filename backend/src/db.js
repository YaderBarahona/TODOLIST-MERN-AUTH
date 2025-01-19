import mongoose from "mongoose";
import { URL } from "./config.js";

export const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost/merndb");
    await mongoose.connect(URL);

    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
