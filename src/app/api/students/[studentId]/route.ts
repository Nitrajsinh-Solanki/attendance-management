// attendance-management\src\app\api\students\[studentId]\route.ts


import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/models/Student';

export async function PUT(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    await connectDB();
    const data = await req.json();
    const { studentId } = await params;
    
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      data,
      { new: true }
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, student: updatedStudent });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update student' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    await connectDB();
    const { studentId } = await params;
    
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete student' },
      { status: 500 }
    );
  }
}