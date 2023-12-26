import { Routes, Route, Navigate } from "react-router-dom";
import CreateApplication from "./components/publicApplication/CreateApplication";
import SuccessApplication from "./components/publicApplication/SuccessApplication";
import QueryApplication from "./components/publicApplication/QueryApplication";
import ResultApplication from "./components/publicApplication/ResultApplication";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Navbar from "./components/Navbar";
import { ApplicationDataProvider } from "./context/ApplicationDataContext";
import { AuthProvider } from "./context/AuthContext";
import AdminApplicationList from "./components/adminPanel/AdminApplicationList";
import AdminSingleApplication from './components/adminPanel/AdminSingleApplication';

function App() {


  return (
    <AuthProvider>
      <ApplicationDataProvider>
        <div className="bg-gray-200">
          <Navbar />
          <div>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/basvuru-olustur" replace />}
              />
              <Route path="/basvuru-olustur" element={<CreateApplication />} />
              <Route path="/basvuru-basarili" element={<SuccessApplication />} />
              <Route path="/basvuru-sorgula" element={<QueryApplication />} />
              <Route
                path="/basvuru-sorgula/:applicationNumber"
                element={<ResultApplication />}
              />
              <Route
                path="/admin"
                element={<AdminPanel />}
              />
              <Route
                path="/admin/basvuru-listesi"
                element={<AdminApplicationList />}
              />
              <Route
                path="/admin/basvuru/:singleApplication"
                element={<AdminSingleApplication />}
              />
            </Routes>
          </div>
        </div>
      </ApplicationDataProvider>
    </AuthProvider>
  );
}

export default App;
