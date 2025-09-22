
import { FaBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-3 bg-transparent">
      <div className="w-full flex items-center justify-between bg-white py-2 px-4 rounded-2xl shadow-sm">
        {/* Notification Bell */}
        <div className="relative">
          <img src="public/csaap.png" className="h-12 w-32" alt="" />
        
        </div>
        {/* User Avatar */}
        <div>
          <img
            src="public/icon.png"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
        
        </div>
      
      </div>
      
    </nav>
  );
}



