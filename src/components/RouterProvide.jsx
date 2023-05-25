import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import App from '../views/App';
import Login from '../views/auths/Login';
import store from '../redux/store';
import SignUpBuyer from '../views/signUpBuyer';
import DashBoardIndex from './dashboards/admin/contents/DashBoardIndex';
import ResetPassword from '../passwordreset/ResetPassword';
import NewPassword from '../passwordreset/newPassword';
import TwoFaForm from '../views/auths/2FaForm';
import VendorRoutes from '../middlewares/authMiddlewares/VendorRoutes';
import SingleProduct from '../views/SingleProduct/singleproduct';
import CartPage from './cart/CartPage';
import CustomerProfilePage from '../views/userProfile/CustomerProfilePage';
import WishListPage from './wishlist/WishListPage';
import ValidatedBuyer from '../middlewares/authMiddlewares/ValidatedBuyer';
import ShopPage from '../views/shoppingPage/shop';
import ContactPage from '../views/about/ContactPage';
import AboutPage from '../views/about/AboutPage';
import CheckoutPage from '../views/checkoutPage/checkoutpage';
import NotificatonContainer from './NotificatonContainer';
import ChatBody from '../views/ChatBody'; // Replace with your server URL
import PasswordUpdate from '../views/passwordUpdatePage/passwordUpdate';

const socket = io('https://ecommerce-app-legends-bn-production.up.railway.app');
// dotenv.config();
const RouterProv = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/chat" element={<ChatBody socket={socket} />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/reset" element={<NewPassword />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact_us" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/passwordUpdate" element={<PasswordUpdate />} />
            <Route element={<VendorRoutes />}>
              <Route path="/*" element={<DashBoardIndex />} />
            </Route>
            <Route element={<ValidatedBuyer />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishListPage />} />
            </Route>
            <Route path="/notifications" element={<NotificatonContainer />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/profile" element={<CustomerProfilePage />} />
            <Route path="/verify-otp" element={<TwoFaForm />} />
            <Route path="/sign-up-buyer" element={<SignUpBuyer />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
export default RouterProv;
// eslint-disable-next-line prettier/prettier
