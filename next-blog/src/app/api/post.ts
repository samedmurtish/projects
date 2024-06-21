import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongodb";
import mongoose, { Schema } from "mongoose";

connectDB();

const postSchema = new Schema({
  title: String,
  content: String,
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { title, content } = req.body;

      const newPost = new Post({ title, content });
      await newPost.save();

      res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
