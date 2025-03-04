// attendance-management\src\app\api\faculty\[id]\route.ts

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Faculty from '@/models/Faculty';

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = await context.params; // Extract params inside function
    const data = await req.json();
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ success: true, faculty: updatedFaculty });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update faculty' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = await context.params; // Extract params inside function
    await Faculty.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete faculty' },
      { status: 500 }
    );
  }
}
