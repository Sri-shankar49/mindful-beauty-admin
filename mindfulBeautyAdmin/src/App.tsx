// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import ScrollToTop from './common/ScrollToTop';
import { LoginLayout } from './layout/LoginLayout';
import { Dashboard } from './pages/Dashboard';
import { ManageRole } from './pages/ManageRole';
import { ServiceListing } from './pages/ServiceListing';
import { ServiceManagement } from './pages/ServiceManagement';
import { SalesTransactions } from './pages/SalesTransactions';
import { RatingsReviews } from './pages/RatingsReviews';
import { Reports } from './pages/Reports';

import { DashBoardData } from './components/Dashboard/DashBoardData';
import { ProfileProgress } from './components/Dashboard/ProfileProgress';

import { RolesManagement } from './components/ManageRole/RolesManagement';
import { StaffManagement } from './components/ManageRole/StaffManagement';
import { BranchManagement } from './components/ManageRole/BranchManagement';

import { AddServices } from './components/ServiceListing/AddServices';
import { ServiceList } from './components/ServiceListing/ServiceList';

import { AllBooking } from './components/ServiceManagement/AllBooking';
import { Schedule } from './components/ServiceManagement/Schedule';
import { Inprogress } from './components/ServiceManagement/Inprogress';
import { Completed } from './components/ServiceManagement/Completed';
import { Cancelled } from './components/ServiceManagement/Cancelled';
import { GeneralInfoForm } from './pages/GeneralInfoForm';
import { BankAccInfoForm } from './pages/BankAccInfoForm';
import { TaxInfoForm } from './pages/TaxInfoForm';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <BrowserRouter>
        {/* ScrollToTop component */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/GeneralInfoForm" element={<GeneralInfoForm />} />
          <Route path="/BankAccInfoForm" element={<BankAccInfoForm />} />
          <Route path="/TaxInfoForm" element={<TaxInfoForm />} />

          {/* Login Layout Routes */}
          <Route path="/" element={<LoginLayout />}>
            <Route path="/Dashboard" element={<Dashboard />} >

              {/* Redirect to DashBoardData when /Dashboard is accessed */}
              <Route index element={<Navigate to="ProfileProgress" replace />} />


              {/* Sub-routes */}
              <Route path="DashBoardData" element={<DashBoardData />} />
              <Route path="ProfileProgress" element={<ProfileProgress />} />
            </Route>

            <Route path="/ManageRole" element={<ManageRole />} >

              {/* Redirect to RolesManagement when /ManageRole is accessed */}
              <Route index element={<Navigate to="RolesManagement" replace />} />

              {/* Sub-routes */}
              <Route path="RolesManagement" element={<RolesManagement />} />
              <Route path="StaffManagement" element={<StaffManagement />} />
              <Route path="BranchManagement" element={<BranchManagement />} />
            </Route>

            <Route path="/ServiceListing" element={<ServiceListing />}>

              {/* Redirect to ServiceList when /ServiceListing is accessed */}
              <Route index element={<Navigate to="ServiceList" replace />} />

              {/* Sub-routes */}
              <Route path="ServiceList" element={<ServiceList />} />
              <Route path="AddServices" element={<AddServices />} />
            </Route>

            <Route path="/ServiceManagement" element={<ServiceManagement />}>
              <Route path="AllBooking" element={<AllBooking />} />
              <Route path="Schedule" element={<Schedule />} />
              <Route path="Inprogress" element={<Inprogress />} />
              <Route path="Completed" element={<Completed />} />
              <Route path="Cancelled" element={<Cancelled />} />
            </Route>

            <Route path="/SalesTransactions" element={<SalesTransactions />} />
            <Route path="/RatingsReviews" element={<RatingsReviews />} />
            <Route path="/Reports" element={<Reports />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App;
