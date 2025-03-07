// attendance-management\src\app\dashboard\students\page.tsx




'use client';

import { useState } from 'react';
import { FaGraduationCap, FaUsers, FaArrowRight, FaUpload } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Semester {
  id: number;
  title: string;
  studentCount: number;
  description: string;
}

const semesters: Semester[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Semester ${i + 1}`,
  studentCount: 0,
  description: `Manage students enrolled in semester ${i + 1}.`
}));

const SemesterCard = ({ semester, onManage }: { semester: Semester, onManage: (id: number) => void }) => (
  <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 min-h-[400px] flex flex-col">
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-3xl font-bold text-white">{semester.title}</h3>
        <FaGraduationCap className="text-white text-4xl" />
      </div>
      <div className="h-1 w-20 bg-white opacity-50 rounded"></div>
    </div>

    <div className="p-8 flex-grow flex flex-col justify-between">
      <div>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          {semester.description}
        </p>
        <div className="flex items-center mb-8 bg-blue-50 p-4 rounded-lg">
          <FaUsers className="text-blue-500 text-2xl mr-3" />
          <span className="text-gray-700 text-lg">
            Total Students: <span className="font-bold text-blue-600">{semester.studentCount}</span>
          </span>
        </div>
      </div>

      <button
        onClick={() => onManage(semester.id)}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700
                 transition duration-200 flex items-center justify-center font-semibold text-lg
                 group cursor-pointer"
      >
        Manage Students
        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

export default function StudentManagement() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/students/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus(`Successfully uploaded ${data.count} students`);
      } else {
        setUploadStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setUploadStatus('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleManageSemester = (semesterId: number) => {
    router.push(`/dashboard/students/semester/${semesterId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800">
              Student Management Dashboard
            </h1>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700
                         transition duration-200 flex items-center cursor-pointer"
              >
                <FaUpload className="mr-2" />
                Upload Students
              </label>
            </div>
          </div>
          {uploadStatus && (
            <div className={`text-center p-4 rounded-lg mb-6 ${
              uploadStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {uploadStatus}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {semesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onManage={handleManageSemester}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
