import { request } from "http";
import connectMongoDB from "../../../lib/mongodb";
import BlogPost from "../../../models/BlogPost";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { title, postContent } = await req.json();
    await connectMongoDB();
    await BlogPost.create({ title, postContent });
    return NextResponse.json({ message: "BlogPost Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const blogPosts = await BlogPost.find();
    return NextResponse.json({ blogPosts });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await BlogPost.findByIdAndDelete(id);
    return NextResponse.json({ message: "BlogPost deleted" }, { status: 200 });
}