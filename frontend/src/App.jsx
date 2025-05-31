import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./components/Products/Profile";
import CollectionPage from "./pages/CollectionPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";


const App = () => {
  return ( 
    <BrowserRouter>
      <Toaster position="top-right" />  
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} /> 
          <Route path="collections/:collection" element={<CollectionPage />} />
          {/* <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={OrderConfirmationPage} /> */}
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          {/* Add other admin routes here */}
          {/* <Route path="users" element={<AdminUsersPage />} />
          <Route path="products" element={<AdminProductsPage />} /> */}
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          {/* <Route path="product/:id" element={<ProductsData />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;