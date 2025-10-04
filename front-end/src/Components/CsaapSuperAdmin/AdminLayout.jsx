import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AdminHeroSection from './HeroSection';
import BrokerAdminDashboard from './Broker';
import ProjectsPage from './ProjectManegement';
import PropertyListingForm from './PrpoertyListingForm';
import AddCompanyForm from '../../Pages/csapSuperAdminPages/AddCompany';
import CompanyManagement from '../../Pages/csapSuperAdminPages/CompanyManegement';
import PlansPage from '../../Pages/csapSuperAdminPages/PlansPage';
import ModuleManagement from '../../Pages/csapSuperAdminPages/ModuleManagement';
import CategoriesPage from '../../Pages/csapSuperAdminPages/CategoriesPage';
import RolesPage from '../../Pages/csapSuperAdminPages/RolesPage';
import PermissionsPage from '../../Pages/csapSuperAdminPages/PermissionsPage';
import RolePermissionManagement from '../../Pages/csapSuperAdminPages/RoleAndPermissionManegement';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleNavigation = (contentId) => {
    setActiveContent(contentId);
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
          activeContent={activeContent}
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
              activeContent={activeContent}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* <Header 
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isMobileSidebarOpen={isMobileSidebarOpen}
          toggleMobileSidebar={toggleMobileSidebar}
          showCollapseIcon={activeContent === 'dashboard'} // Only show collapse icon on dashboard
        /> */}
        
        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto ${activeContent === 'company' ? 'p-0' : 'p-2 md:p-4'}`}>
          {activeContent === 'dashboard' && <AdminHeroSection />}
          {activeContent === 'company' && (
            <div className="h-full w-full">
              <CompanyManagement className="h-full w-full" />
            </div>
          )}
          {activeContent === 'plan' && <PlansPage/>}
          {activeContent === 'customers' && <PropertyListingForm/>}
          {activeContent === 'modules' && <ModuleManagement/>}
          {activeContent === 'category' && <CategoriesPage />}
          {activeContent === 'roles' && <RolesPage />}
         {activeContent === 'permissions' && <PermissionsPage />}
          {activeContent === 'role-permission-management' && <RolePermissionManagement />}
        
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;