// attendance-management\src\app\dashboard\page.tsx


'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { FaUserGraduate, FaChalkboardTeacher, FaBookReader, FaUserCheck } from 'react-icons/fa';
interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  activeClasses: number;
  totalSubjects: number;
}

export default function Dashboard() {

  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalFaculty: 0,
    activeClasses: 0,
    totalSubjects: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const { data } = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  const managementCards = [
    {
      id: 'students',
      title: 'Student Management',
      description: 'Add, edit, and manage student records',
      icon: <FaUserGraduate className="w-8 h-8" />,
      stats: `${stats.totalStudents} Students`,
      color: 'bg-blue-500'
    },
    {
      id: 'faculty',
      title: 'Faculty Management',
      description: 'Manage faculty members and their details',
      icon: <FaChalkboardTeacher className="w-8 h-8" />,
      stats: `${stats.totalFaculty} Faculty Members`,
      color: 'bg-green-500'
    },
    {
      id: 'classes',
      title: 'Class Management',
      description: 'Create and manage classes and subjects',
      icon: <FaBookReader className="w-8 h-8" />,
      stats: `${stats.activeClasses} Active Classes`,
      color: 'bg-purple-500'
    },
    {
      id: 'assignments',
      title: 'Faculty Assignment',
      description: 'Assign faculty members to subjects',
      icon: <FaUserCheck className="w-8 h-8" />,
      stats: `${stats.totalSubjects} Subjects`,
      color: 'bg-orange-500'
    }
  ];

  const handleManageClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'students') {
      router.push('/dashboard/students');
    }
     
    
    
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {managementCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              <div className={`${card.color} p-4 text-white`}>
                {card.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {card.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {card.stats}
                  </span>
                  <button 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => handleManageClick(card.id)}
                  >
                    Manage →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quick Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600">Total Faculty</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalFaculty}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600">Active Classes</p>
                <p className="text-2xl font-bold text-purple-600">{stats.activeClasses}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalSubjects}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}