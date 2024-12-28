// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute
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

import { BookingStatus } from './components/ServiceManagement/BookingStatus';
import { EditServices } from './components/ServiceManagement/EditServices';

import { AllBooking } from './components/ServiceManagement/AllBooking';
import { Schedule } from './components/ServiceManagement/Schedule';
import { Inprogress } from './components/ServiceManagement/Inprogress';
import { Completed } from './components/ServiceManagement/Completed';
import { Cancelled } from './components/ServiceManagement/Cancelled';


import { GeneralInfoForm } from './pages/GeneralInfoForm';
import { BankAccInfoForm } from './pages/BankAccInfoForm';
import { TaxInfoForm } from './pages/TaxInfoForm';

import { GeneralInfoFreelanceForm } from './pages/GeneralInfoFreelanceForm';
import { BankAccInfoFreelanceForm } from './pages/BankAccInfoFreelanceForm';
import { TaxInfoFreelanceForm } from './pages/TaxInfoFreelanceForm';
import { Thankyou } from './pages/Thankyou';




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
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/GeneralInfoForm" element={
            <GeneralInfoForm
              emailAddress={''}
              contactNumber={''}
              ownersName={''}
              salonName={''}
            />
          } />
          <Route path="/BankAccInfoForm" element={
            <BankAccInfoForm
              bankAccHolderName={''}
              bankName={''}
              bankAccountNumber={''}
              accountType={''}
            />
          } />
          <Route path="/TaxInfoForm" element={
            <TaxInfoForm
              taxIdentificationNumber={''}
              gstNumber={''}
            />
          } />

          <Route path="/GeneralInfoFreelanceForm" element={
            <GeneralInfoFreelanceForm
              fullName={''}
              emailAddress={''}
              contactNumber={''}
            />
          } />
          <Route path="/BankAccInfoFreelanceForm" element={<BankAccInfoFreelanceForm />} />
          <Route path="/TaxInfoFreelanceForm" element={<TaxInfoFreelanceForm />} />
          <Route path="/Thankyou" element={<Thankyou />} />


          {/* Login Layout Routes */}

          {/* Protected Routes */}

          <Route path="/" element={<ProtectedRoute><LoginLayout /></ProtectedRoute>}>
            {/* <Route path="/" element={<LoginLayout />}> */}
            <Route path="/Dashboard" element={<Dashboard />} >

              {/* Redirect to DashBoardData when /Dashboard is accessed */}
              <Route index element={<Navigate to="DashBoardData" replace />} />


              {/* Sub-routes */}
              <Route path="DashBoardData" element={<DashBoardData />} />
              <Route path="ProfileProgress" element={<ProfileProgress />} />
            </Route>

            <Route path="/ManageRole" element={<ManageRole />} >

              {/* Redirect to RolesManagement when /ManageRole is accessed */}
              <Route index element={<Navigate to="RolesManagement" replace />} />

              {/* Sub-routes */}
              <Route path="RolesManagement" element={<RolesManagement />} />
              <Route path="StaffManagement" element={<StaffManagement staff={0} name={''} role_name={''} branch_name={''} status={''} />} />
              <Route path="BranchManagement" element={<BranchManagement branch_id={''} branch_name={''} phone={''} location={''} logo={''} />} />
            </Route>

            <Route path="/ServiceListing" element={<ServiceListing />}>

              {/* Redirect to ServiceList when /ServiceListing is accessed */}
              <Route index element={<Navigate to="ServiceList" replace />} />

              {/* Sub-routes */}
              <Route path="ServiceList" element={<ServiceList service_id={0} service_name={''} category={''} subcategory={''} price={''} service_time={''} status={''} sku_value={''} duration={''} />} />
              <Route path="AddServices" element={<AddServices />} />
            </Route>

            <Route path="/ServiceManagement" element={<ServiceManagement />}>

              {/* Redirect to BookingStatus when /ServiceManagement is accessed */}
              <Route index element={<Navigate to="BookingStatus" replace />} />

              {/* BookingStatus sub-routes */}
              <Route path="BookingStatus" element={<BookingStatus />}>

                {/* Redirect to AllBooking when /BookingStatus is accessed */}
                <Route index element={<Navigate to="AllBooking" replace />} />

                <Route path="AllBooking" element={<AllBooking />} />
                <Route path="Schedule" element={<Schedule />} />
                <Route path="Inprogress" element={<Inprogress />} />
                <Route path="Completed" element={<Completed />} />
                <Route path="Cancelled" element={<Cancelled />} />
              </Route>

              {/* EditServices route */}
              <Route path="EditServices" element={<EditServices />} />

            </Route>

            <Route path="/SalesTransactions" element={<SalesTransactions />} />
            <Route path="/RatingsReviews" element={<RatingsReviews />} />
            <Route path="/Reports" element={<Reports />} />
          </Route>
        </Routes>

      </BrowserRouter >

    </>
  )
}

export default App;
