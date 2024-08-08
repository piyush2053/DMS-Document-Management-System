import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Navbar } from './Component/Navbar';
import ErrorPage from './Component/ErrorPage';
import { EmailProvider } from './Store/Provider';
import Login from './Component/Login';
import LayoutS from './Component/Layout/Layout';
import ProtectedRoute from './Component/Firewall/ProtectedRouting';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <EmailProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute element={
            <div>
              <Navbar />
              <LayoutS />
            </div>
          } />
        } />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </EmailProvider>
);

reportWebVitals();
