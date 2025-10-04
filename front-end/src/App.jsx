// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';

import Home from './Components/Home';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import ERPSolutions from './Pages/ERPSolutions';
import PayrollSoftware from './Pages/PayrollSoftware';
import AccountingSoftware from './Pages/AccountingSoftware';
import BookDemoPage from './Pages/BookDemoPage';
import LogoHeader from './Pages/imagePage';
import Emp from "./Pages/Employee/Emp";
 import Banner from "./Pages/Billing/Banner";
import Herosection from "./Pages/GST/Herosection";
import Hero from "./Pages/Inventory/Hero";
import HeroPage from "./Pages/Invoice/BannerPage";
import ABanner from "./Pages/Accounting/ABanner";
import SBanner from "./Pages/SaleForce/SBanner";

import CartPage from './Pages/CartPage';
import PricingPage from './Pages/PricingPage';
import BuilderERPHome from './Components/BuilderErp/Home';
import AdminLayout from './Components/BuilderErp/BuilderERPAdmin/AdminLayout';
import BrokerPage from  './Pages/BuilderERPpages/BrokerPage';

import ContractorPage from  './Pages/BuilderERPpages/ContractorPage';
import EngineersPage from  './Pages/BuilderERPpages/EngineersPage';
import ArchitectsPage from  './Pages/BuilderERPpages/ArchitectsPage';
import CustomersPage from  './Pages/BuilderERPpages/CustomersPage';
// import PropertyListingForm from  './Pages/BuilderERPpages/PropertyListingForm';
import StockPage from  './Pages/BuilderERPpages/StockPage';
import SupplierPage from  './Pages/BuilderERPpages/SupplierPage';
import PurchaseEntry from  './Pages/BuilderERPpages/PurchaseEntry';
import PurchaseHistory from  './Pages/BuilderERPpages/PurchaseHistory';
import PurchaseLedger from  './Pages/BuilderERPpages/PurchaseLedger';
import StockEntry from  './Pages/BuilderERPpages/StockEntry';
import StockList from  './Pages/BuilderERPpages/StockList';    
import ProjectManagement from './Pages/BuilderERPpages/ProjectManegement';
import StockTransferEntry from  './Pages/BuilderERPpages/StockTransferEntry';
import StockTransferAccept from  './Pages/BuilderERPpages/StockTransferAccept';
import SaleEntry from  './Pages/BuilderERPpages/SaleEntry';
import SaleHistory from  './Pages/BuilderERPpages/SaleHistory';
import IndentHistory from  './Pages/BuilderERPpages/IndentHistory';
import IndentEntry from  './Pages/BuilderERPpages/IndentEntry';
import BarcodeSale from  './Pages/BuilderERPpages/BarcodeSale';
import SupplierList from  './Pages/BuilderERPpages/SupplierList'; 
import HeroSection from './Components/BuilderErp/HeroSection';
import BuilderLogin from './Pages/BuilderERPpages/BuilderLogin';
// Csaap SuperAdmin
import AdminLayoutWrapper from './Components/CsaapSuperAdmin/AdminLayout';
import AdminHeroSection from './Components/CsaapSuperAdmin/HeroSection';
// import Sidebar from './Components/CsaapSuperAdmin/SupportAdminSidebar';
import CompanyManagement from './Pages/csapSuperAdminPages/CompanyManegement';
import PlansPage from './Pages/csapSuperAdminPages/PlansPage';
import ModuleManagement from './Pages/csapSuperAdminPages/ModuleManagement';
import CategoriesPage from './Pages/csapSuperAdminPages/CategoriesPage';
import RolesPage from './Pages/csapSuperAdminPages/RolesPage';
import PermissionsPage from './Pages/csapSuperAdminPages/PermissionsPage';
import RolePermissionManagement from './Pages/csapSuperAdminPages/RoleAndPermissionManegement';
 import PropertyListingForm from './Components/CsaapSuperAdmin/PrpoertyListingForm';
// import { FiBook, FiTruck } from 'react-icons/fi';    




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="ERPSolutions" element={<ERPSolutions/>}/>
          <Route path="PayrollSoftware" element={<PayrollSoftware/>}/>
          <Route path='accountingsoftware' element={<AccountingSoftware/>}/>
           <Route path="bookdemo" element={<BookDemoPage />} />
            <Route path="logoheader" element={<LogoHeader />} />
             <Route path="/emp" element={<Emp />} />
             <Route path="/cartpage" element={<CartPage/>} />
             {/* arghya tasks */}
            <Route path="/billing" element={<Banner />} />
            <Route path="/gst" element={<Herosection />} />
            <Route path="/inventory" element={<Hero />} />
            <Route path="/invoice" element={<HeroPage />} />
            <Route path="/accounting" element={<ABanner />} />
            <Route path="/sales" element={<SBanner />} />
            {/* super admin */}
    

      
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/builder-erp" element={<BuilderERPHome />} />
        <Route path="/builder-erp/admin" element={<AdminLayout />}>
          <Route index element={<HeroSection />} />
          <Route path="broker" element={<BrokerPage />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="contractors" element={<ContractorPage />} />
          <Route path="engineers" element={<EngineersPage />} />
          <Route path="architects" element={<ArchitectsPage />} />
          <Route path="customer" element={<CustomersPage />} />
          {/* <Route path="propertyform" element={<PropertyListingForm />} /> */}
          <Route path="stockpage" element={<StockPage />} />
          <Route path="supplierpage" element={<SupplierPage />} />
          <Route path="purchase-entry" element={<PurchaseEntry />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="purchase-ledger" element={<PurchaseLedger />} />
          <Route path="stock-entry" element={<StockEntry />} />
          <Route path="stock-list" element={<StockList />} />
          <Route path="stock-transfer-entry" element={<StockTransferEntry />} />
          <Route path="stock-transfer-accept" element={<StockTransferAccept />} />
          <Route path="sale-entry" element={<SaleEntry />} />
          <Route path="sale-history" element={<SaleHistory />} />
          <Route path="indent-History" element={<IndentHistory />} />
          <Route path="indent-entry" element={<IndentEntry />} />
          <Route path="barcode-sale" element={<BarcodeSale />} />
          <Route path="supplier-list" element={<SupplierList />} />
           {/* <Route path="/builder-erp/builderLogin" element={<BuilderLogin />} /> */}

       
        </Route>
            {/* Csaap superAdmin */}
            <Route path="/admin-dashboard" element={<AdminLayoutWrapper />}>
        <Route index element={<AdminHeroSection />} />
        <Route path="company" element={<CompanyManagement />} />
        <Route path="plan" element={<PlansPage />} />
        <Route path="modules" element={<ModuleManagement />} />
        <Route path="category" element={<CategoriesPage />} />
        <Route path="settings" element={<div>System Settings</div>} />
        <Route path="propertyform" element={<PropertyListingForm />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        <Route path="role-permission-management" element={<RolePermissionManagement />} />
      </Route>
            


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;