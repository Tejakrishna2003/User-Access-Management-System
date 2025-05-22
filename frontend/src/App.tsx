import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { CreateSoftware } from "./pages/CreateSoftware";
import { RequestAccess } from "./pages/RequestAccess";
import { PendingRequests } from "./pages/PendingRequests";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-software" element={<CreateSoftware />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};