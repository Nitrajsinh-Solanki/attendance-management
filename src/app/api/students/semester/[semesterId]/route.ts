// attendance-management\src\app\api\students\semester\[semesterId]\route.ts



import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(
  req: Request,
  { params }: { params: { semesterId: string } }
) {
  try {
    await connectDB();

    // Destructure and await the semesterId
    const { semesterId } = await params;

    const students = await Student.find({ 
      semester: parseInt(semesterId) 
    }).select('fullName enrollmentNumber email mobileNumber');

    return NextResponse.json({ 
      success: true, 
      students 
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}