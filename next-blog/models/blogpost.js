import mongoose, { Schema } from "mongoose";
const blogPostSchema = new Schema({
    title: String,
    content: String,
}, {
    timestamps: true,
});

const BlogPost =
    mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;