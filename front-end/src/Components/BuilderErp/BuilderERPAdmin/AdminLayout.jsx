import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from  '../BuilderERPAdmin/Header'
import Sidebar from '../BuilderERPAdmin/Sidebar';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleNavigation = () => {
    // Close mobile sidebar when a menu item is clicked
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onNavigate={handleNavigation}
        />
      </div>
      
      {/* Sidebar - Mobile (overlay) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileSidebar}
          />
          <div className="fixed inset-y-0 left-0 w-56 z-40">
            <Sidebar 
              isCollapsed={false}
              onNavigate={handleNavigation}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isMobileSidebarOpen={isMobileSidebarOpen}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        
        {/* Main Content - Use React Router Outlet */}
        <main className="flex-1 overflow-y-auto p-2 md:p-4">
          <Outlet /> {/* This will render the matched child route */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;