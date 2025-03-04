// attendance-management\src\app\api\faculty\route.ts

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Faculty from '@/models/Faculty';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    const faculty = new Faculty(data);
    await faculty.save();

    return NextResponse.json({ 
      success: true, 
      faculty 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to add faculty' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const faculties = await Faculty.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      faculties 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch faculties' },
      { status: 500 }
    );
  }
}