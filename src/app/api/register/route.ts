// attendance-management\src\app\api\register\route.ts

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { generateOTP, sendOTP } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Generate OTP
    const otp = generateOTP();

    // Create new user
    const user = new User({
      username,
      email,
      password,
      otp,
      isVerified: false
    });

    await user.save();

    // Send OTP email
    await sendOTP(email, otp);

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}