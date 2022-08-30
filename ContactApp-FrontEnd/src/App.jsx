import Loginpage from "./assets/Loginpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./assets/RegisterPage";
import { useContext, createContext, useState } from "react";
import Dashboard from "./assets/Dashboard";
import NewContacts from "./assets/NewContacts";
import ViewContacts from "./assets/ViewContacts";
import ErrorPage from "./assets/ErrorPage";
export const store = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <store.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          {!token && <Route path="/register" element={<RegisterPage />} />}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addcontact" element={<NewContacts />} />
          <Route path="/contacts" element={<ViewContacts />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
}

export default App;
