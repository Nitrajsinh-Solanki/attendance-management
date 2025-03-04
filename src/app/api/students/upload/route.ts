import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/models/Student';
import * as XLSX from 'xlsx';

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const students = jsonData.map((row: any) => ({
      enrollmentNumber: row['ENROLLMENT NUMBER'],
      fullName: row['STUDENTS FULL NAME'],
      email: row['EMAIL ID OF THE STUDENT'],
      mobileNumber: row['MOBILE NUMBER OF STUDENT'],
      semester: row['SEMESTER']
    }));

    await Student.insertMany(students);

    return NextResponse.json({ 
      message: 'Students uploaded successfully',
      count: students.length 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}