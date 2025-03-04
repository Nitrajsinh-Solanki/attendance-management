// attendance-management\src\app\dashboard\faculty\page.tsx



'use client';

import { useState, useEffect } from 'react';
import { FaUserTie, FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

interface Faculty {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
}

export default function FacultyManagement() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await fetch('/api/faculty');
      const data = await response.json();
      if (data.success) {
        setFaculties(data.faculties);
      }
    } catch (error) {
      console.error('Failed to fetch faculties:', error);
    }
  };

  const handleEdit = (faculty: Faculty) => {
    setFormData({
      fullName: faculty.fullName,
      email: faculty.email,
      mobileNumber: faculty.mobileNumber
    });
    setSelectedFacultyId(faculty._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this faculty?')) {
      try {
        const response = await fetch(`/api/faculty/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          setFaculties(faculties.filter(faculty => faculty._id !== id));
        }
      } catch (error) {
        setError('Failed to delete faculty');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditMode 
        ? `/api/faculty/${selectedFacultyId}`
        : '/api/faculty';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        if (isEditMode) {
          setFaculties(faculties.map(faculty => 
            faculty._id === selectedFacultyId ? data.faculty : faculty
          ));
        } else {
          setFaculties([data.faculty, ...faculties]);
        }
        setIsModalOpen(false);
        setFormData({ fullName: '', email: '', mobileNumber: '' });
        setIsEditMode(false);
        setSelectedFacultyId(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(`Failed to ${isEditMode ? 'update' : 'add'} faculty`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedFacultyId(null);
    setFormData({ fullName: '', email: '', mobileNumber: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Faculty Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FaPlus /> Add Faculty
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((faculty) => (
            <div
              key={faculty._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUserTie className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{faculty.fullName}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(faculty)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(faculty._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>Email: {faculty.email}</p>
                <p>Mobile: {faculty.mobileNumber}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Faculty Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? 'Edit Faculty' : 'Add New Faculty'}
                </h2>
                <button
                  onClick={handleModalClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-zinc-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-zinc-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-zinc-900"
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {isEditMode ? 'Update Faculty' : 'Add Faculty'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}