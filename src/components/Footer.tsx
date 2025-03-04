// attendance-management\src\components\Footer.tsx

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically
  
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p>© {currentYear} Smart Attendance Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  