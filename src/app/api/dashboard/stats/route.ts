// attendance-management\src\app\api\dashboard\stats\route.ts

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    await connectDB();
    
    // Get dashboard data
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });
    
    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        totalFaculty,
        activeClasses: 12, // You can make this dynamic later
        totalSubjects: 8   // You can make this dynamic later
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}