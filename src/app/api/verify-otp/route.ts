import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { otp } = await req.json();
    
    await connectDB();

    const user = await User.findOne({ otp });

    if (!user) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}