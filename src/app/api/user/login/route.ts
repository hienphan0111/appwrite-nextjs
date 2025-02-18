import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // compare password 
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    //create token
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: 3600 }); 

    const response = NextResponse.json(
      { message: "User logged in successfully", success: true },
      { status: 200 }
    )

    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
