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


import { ServicesMotherComponent } from './components/ServiceListing/ServicesMotherComponent';
import { ServiceList } from './components/ServiceListing/ServiceList';
import { AddServices } from './components/ServiceListing/AddServices';
import { PackagesMotherComponent } from './components/ServiceListing/PackagesMotherComponent';
import { PackagesList } from './components/ServiceListing/PackagesList';
import { AddPackages } from './components/ServiceListing/AddPackages';



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


import { MyAccount } from './pages/MyAccount';
import { GeneralInfo } from './components/MyAccount/GeneralInfo';
import { Wallet } from './components/MyAccount/Wallet';


import AuthWatcher from './common/AuthWatcher';
import { ToastMessage } from './common/Toast/ToastMessage';





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

        {/* AuthWatcher component */}
        <AuthWatcher />

        {/* ScrollToTop component */}
        <ScrollToTop />

        {/* Toast Message */}
        <ToastMessage />      {/* Keep this in the root of your app */}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/GeneralInfoForm" element={
            <GeneralInfoForm
              emailAddress={''}
              contactNumber={''}
              ownersName={''}
              salonName={''}
              providerImage={''} />
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
              proofOfIdentityNumber={''}
              proofOfIdentityType={''}
              proofOfAddressType={''}
              tax_file={undefined}
              gst_file={undefined}
              // identity_file={undefined}
              // address_file={undefined}
              identity_file={new File([], "")}  // ✅ Empty file
              address_file={new File([], "")}  // ✅ Empty file
            />
          } />

          <Route path="/GeneralInfoFreelanceForm" element={
            <GeneralInfoFreelanceForm
              fullName={''}
              emailAddress={''}
              contactNumber={''}
              yearsOfExperience={''} providerImage={''} />
          } />
          <Route path="/BankAccInfoFreelanceForm" element={<BankAccInfoFreelanceForm />} />
          <Route path="/TaxInfoFreelanceForm" element={<TaxInfoFreelanceForm />} />
          <Route path="/Thankyou" element={<Thankyou />} />


          {/* Login Layout Routes */}

          {/* Protected Routes */}

          <Route path="/" element={<ProtectedRoute><LoginLayout /></ProtectedRoute>}>
            {/* <Route path="/" element={<LoginLayout />}> */}
            <Route path="/Dashboard" element={<ProtectedRoute permissionKey="dashboard"><Dashboard /></ProtectedRoute>} >

              {/* Redirect to DashBoardData when /Dashboard is accessed */}
              <Route index element={<Navigate to="DashBoardData" replace />} />


              {/* Sub-routes */}
              <Route path="DashBoardData" element={<DashBoardData />} />
              <Route path="ProfileProgress" element={<ProfileProgress />} />
            </Route>

            <Route path="/ManageRole" element={<ProtectedRoute permissionKey="manage_role"><ManageRole /></ProtectedRoute>} >

              {/* Redirect to RolesManagement when /ManageRole is accessed */}
              <Route index element={<Navigate to="RolesManagement" replace />} />

              {/* Sub-routes */}
              <Route path="RolesManagement" element={<RolesManagement />} />
              <Route path="StaffManagement" element={<StaffManagement staff={0} name={''} role_name={''} branch_name={''} status={''} phone={''} photo={''} />} />
              <Route path="BranchManagement" element={<BranchManagement branch_id={''} branch_name={''} phone={''} location={''} logo={''} latitude={0} longitude={0} staff={[]} service_status={0} />} />
            </Route>

            <Route path="/ServiceListing" element={<ProtectedRoute permissionKey="service_listing"><ServiceListing /></ProtectedRoute>}>

              {/* Redirect to ServiceList when /ServiceListing is accessed */}
              <Route index element={<Navigate to="ServiceList" replace />} />

              {/* Sub-routes */}
              <Route path="/ServiceListing/ServiceList" element={<ServicesMotherComponent />}>
                <Route index element={<ServiceList service_name={''} category={''} subcategory={''} service_time={''} duration={''} status={''} sku_value={''} />} /> {/* Default child route */}
                <Route path="AddServices" element={<AddServices />} /> {/* Sub-route */}
              </Route>

              {/* Sub-routes */}
              <Route path="/ServiceListing/PackagesList" element={<PackagesMotherComponent />}>
                <Route index element={<PackagesList />} /> {/* Default child route */}
                <Route path="AddPackages" element={<AddPackages />} /> {/* Sub-route */}
              </Route>

            </Route>

            <Route path="/ServiceManagement" element={<ProtectedRoute permissionKey="service_management"><ServiceManagement /></ProtectedRoute>}>

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

            <Route path="/SalesTransactions" element={<ProtectedRoute permissionKey="sales_transactions"><SalesTransactions /></ProtectedRoute>} />
            <Route path="/RatingsReviews" element={<ProtectedRoute permissionKey="ratings_reviews"><RatingsReviews /></ProtectedRoute>} />
            <Route path="/Reports" element={<ProtectedRoute permissionKey="report_details"><Reports /></ProtectedRoute>} />

            <Route path="/MyAccount" element={<MyAccount />} >

              {/* Redirect to GeneralInfo when /MyAccount is accessed */}
              <Route index element={<Navigate to="GeneralInfo" replace />} />

              {/* Sub-routes */}
              <Route path="GeneralInfo" element={<GeneralInfo />} />
              <Route path="Wallet" element={<Wallet />} />
            </Route>

          </Route>
        </Routes>

      </BrowserRouter >

    </>
  )
}

export default App;
