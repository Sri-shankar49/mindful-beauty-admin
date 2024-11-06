// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { RolesManagement } from './components/ManageRole/RolesManagement';
import { StaffManagement } from './components/ManageRole/StaffManagement';
import { BranchManagement } from './components/ManageRole/BranchManagement';


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

          {/* Login Layout Routes */}
          <Route path="/" element={<LoginLayout />}>
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/ManageRole" element={<ManageRole />} >
              <Route path="RolesManagement" element={<RolesManagement />} />
              <Route path="StaffManagement" element={<StaffManagement />} />
              <Route path="BranchManagement" element={<BranchManagement />} />
            </Route>

            <Route path="/ServiceListing" element={<ServiceListing />} />
            <Route path="/ServiceManagement" element={<ServiceManagement />} />
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
