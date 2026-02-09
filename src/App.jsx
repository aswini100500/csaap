import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';


// Placeholder components for the other pages
import ProjectsPage from './pages/ProjectsPage';
import ContractorsPage from './pages/ContractorPage';
import BrokerPage from './pages/BrokerPage';
import SupplierPage from './pages/SupplierPage';
import IndentMain from './pages/Stock&inventory/IndentMain';
import BarcodeSale from './pages/Stock&inventory/BarcodeSale';
import PurchaseMain from './pages/Stock&inventory/PurchaseMain';
import StockMain from './pages/Stock&inventory/StockMain';
import SalesMain from './pages/Stock&inventory/SalesMain';
import SupplierList from './pages/Stock&inventory/SupplierList';
import StockEntry from './pages/Stock&inventory/StockEntry';



import PABC from "./components/project/PABC"
function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          
          {/* Builder Routes */}
          <Route path="/projects" element={<PABC />} />
          <Route path="/contractors" element={<ContractorsPage />} />
          <Route path="/brokers" element={<BrokerPage />} />
          <Route path="/suppliers" element={<SupplierPage />} />
          {/* stock-inventory routes */}
              <Route path="/builder-erp/admin/purchase-main" element={<PurchaseMain />} />
              <Route path="/builder-erp/admin/stock-entry" element={<StockEntry />} />
              <Route path="/builder-erp/admin/sale-main" element={<SalesMain />} />

              <Route path="/builder-erp/admin/indent-main" element={<IndentMain />} />
              <Route path="/builder-erp/admin/supplier-list" element={<SupplierList />} />

              <Route path="/builder-erp/admin/barcode-sale" element={<BarcodeSale />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}
export default App;