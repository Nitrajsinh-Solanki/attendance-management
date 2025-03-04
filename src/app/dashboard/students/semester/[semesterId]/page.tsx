// attendance-management\src\app\dashboard\students\semester\[semesterId]\page.tsx



'use client';
import { useEffect, useState } from 'react';
import { FaUserGraduate, FaEdit, FaTrash } from 'react-icons/fa';

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  email: string;
  mobileNumber: string;
  semester: number;
}

export default function SemesterStudents({ params }: { params: { semesterId: string } }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/students/semester/${params.semesterId}`);
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data.students);
    } catch (err) {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (student: Student) => {
    setSelectedStudent({
      ...student,
      mobileNumber: student.mobileNumber || '' // Ensure mobileNumber is not undefined
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`/api/students/${studentId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setStudents(students.filter(student => student._id !== studentId));
        } else {
          throw new Error('Failed to delete student');
        }
      } catch (error) {
        alert('Failed to delete student');
      }
    }
  };

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      const response = await fetch(`/api/students/${selectedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedStudent),
      });

      if (response.ok) {
        setStudents(students.map(student =>
          student._id === selectedStudent._id ? selectedStudent : student
        ));
        setIsEditModalOpen(false);
      } else {
        throw new Error('Failed to update student');
      }
    } catch (error) {
      alert('Failed to update student');
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Semester {params.semesterId} Students
        </h1>

        <div className="space-y-6">
          {students.map((student, index) => (
            <div
              key={student._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex items-center p-6 gap-4"
            >
              <div className="bg-blue-500 rounded-full h-16 w-16 flex items-center justify-center">
                <FaUserGraduate className="text-white text-3xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {student.fullName}
                </h3>
                <div className="text-gray-600">
                  <p><span className="font-medium">Enrollment:</span> {student.enrollmentNumber}</p>
                  <p><span className="font-medium">Email:</span> {student.email}</p>
                  <p><span className="font-medium">Mobile:</span> {student.mobileNumber}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleUpdate(student)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
              <span className="text-gray-500 font-medium ml-4">#{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
            <h2 className="text-2xl  mb-6 text-gray-900 font-bold">Edit Student</h2>
            <form onSubmit={handleSubmitUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={selectedStudent.fullName}
                  onChange={e => setSelectedStudent({...selectedStudent, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
                <input
                  type="text"
                  value={selectedStudent.enrollmentNumber}
                  onChange={e => setSelectedStudent({...selectedStudent, enrollmentNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={selectedStudent.email}
                  onChange={e => setSelectedStudent({...selectedStudent, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={selectedStudent.mobileNumber}
                  onChange={e => setSelectedStudent({...selectedStudent, mobileNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
