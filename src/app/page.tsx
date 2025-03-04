// attendance-management\src\app\page.tsx

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <main className="flex-grow w-full">
        <section className="py-16 px-6 sm:px-12 lg:px-20 text-center">
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6">
              Welcome to <span className="text-blue-600">Smart Attendance System</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
              Streamline your attendance management with our intelligent solution.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <FacilityCard 
                title="Easy Management"
                description="Manage attendance effortlessly with an intuitive interface."
                icon="📱"
              />
              <FacilityCard 
                title="Real-time Tracking"
                description="Monitor attendance live with accurate reports."
                icon="⚡"
              />
              <FacilityCard 
                title="Detailed Analytics"
                description="Gain insights with comprehensive attendance reports."
                icon="📊"
              />
              <FacilityCard 
                title="Assign Faculty"
                description="Easily assign faculties to subjects and classes."
                icon="🎓"
              />
              <FacilityCard 
                title="Add Students"
                description="Register students and manage their attendance data."
                icon="👨‍🎓"
              />
              <FacilityCard 
                title="Create Classes"
                description="Organize subjects and manage class-wise attendance."
                icon="🏫"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const FacilityCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full">
      <div className="text-5xl mb-4 text-center">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">{title}</h3>
      <p className="text-gray-600 text-center text-lg">{description}</p>
    </div>
  );
};
