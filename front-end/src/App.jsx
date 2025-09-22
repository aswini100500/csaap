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
import Dashboard from './Components/SuperAdmin/Dashboard';
import Menulist from './Components/SuperAdmin/Menu/Menulist';
import Menugroup from './Components/SuperAdmin/Menu/Menugroup';
import Userlist from './Components/SuperAdmin/User/Userlist';
import Rolelist from './Components/SuperAdmin/User/Rolelist';
import Createcategory from './Components/SuperAdmin/Category/Createcategory';
import AdminBanner from './Components/SuperAdmin/Homepage/Banner';
import BestforBuss from './Components/SuperAdmin/Homepage/BestforBuss';
import IndustrySupport from './Components/SuperAdmin/Homepage/IndustrySupport';
import PlanningCreate from './Components/SuperAdmin/Subscription/PlanningCreate'
import ApplicationCreate from './Components/SuperAdmin/Subscription/ApplicationCreate'
import DownloadCreate from './Components/SuperAdmin/Subscription/DownloadCreate'
import Plan from "./Components/SuperAdmin/Subscription/Plan";
import Appcreate from "./Components/SuperAdmin/Subscription/Appcreate";
import UserCompany from "./Components/SuperAdmin/Subscription/UserCompany";
import Appgroup from "./Components/SuperAdmin/Subscription/AppGroup";
import Job from "./Components/SuperAdmin/JobOpen.jsx/Job";
import Appprice from "./Components/SuperAdmin/Subscription/Appprice";
import Customer_receipt from "./Components/SuperAdmin/Customer_support/Customer_receipt";
import Demo from "./Components/SuperAdmin/Customer_support/Demo";
import Customer_list from "./Components/SuperAdmin/Customer_support/Customer_list";
import Customer_company from "./Components/SuperAdmin/Customer_support/Customer_company";
import AdminLayout from './Components/SuperAdmin/AdminLayout';
import CartPage from './Pages/CartPage';
import PricingPage from './Pages/PricingPage';




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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menulist" element={<Menulist />} />
            <Route path="/menugroups" element={<Menugroup />} />
            <Route path="/users" element={<Userlist />} />
            <Route path="/rolelist" element={<Rolelist />} />
            <Route path="/create-category" element={<Createcategory />} />
            <Route path="/addbanner" element={<AdminBanner />} />
            <Route path="/best-for-business" element={<BestforBuss />} />
            <Route path="/industry-support" element={<IndustrySupport />} />
            <Route path="/planning" element={<PlanningCreate />} />
            <Route path="/Application" element={<ApplicationCreate />} />
            <Route path="/download" element={<DownloadCreate />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/app" element={<Appcreate />} />
            <Route path="/app-group" element={<Appgroup />} />
            <Route path="/job-create" element={<Job />} />
            <Route path="/app-price" element={<Appprice />} />
            <Route path="/customer-receipt" element={<Customer_receipt />} />
            <Route path="/demo-request" element={<Demo />} />
            <Route path="/customer-list" element={<Customer_list />} />
            <Route path="/customer-company" element={<Customer_company />} />
            <Route path="/user-company-app" element={<UserCompany />} />
            <Route path="/adminpage" element={<AdminLayout />} />
            <Route path="/pricing" element={<PricingPage />} />
            


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;