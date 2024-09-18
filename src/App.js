import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import NotfountPage from "./pages/NotfountPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Shop from "./pages/shop";
import Checkout from "./pages/Checkout";
import HeroSection from "./components/workshop/HeroSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ProfileUser from "./pages/ProfileUser";
import { SearchProvider } from "./context/SearchContext";
import { UserProvider } from "./context/UserProvider";
import ChatComponent from "./components/chatPage/Chat";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./payment/CheckoutForm";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import SellerPage from "./components/sellerRegister/SellerPage";
import ThankYou from "./components/sellerRegister/WaitingPage";
import Admin from "./pages/Admin";
import UnauthorizedPage from "./pages/UnauthorizedPage ";

// Load Stripe outside of a component to avoid re-creating it on every render
const stripePromise = loadStripe(
  "pk_test_51PoWjlG63yy5fRrkIeVefe6uAFjzUZ7n71C3TSrwWmGEjp79bWlOm8z62eiQCBP83CiM3jhfr3VgDlcuYbCRk5nj00tRXbd1il"
);

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <UserProvider>
        <SearchProvider>
          <Elements stripe={stripePromise}>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="product-details/:id"
                    element={<ProductDetails />}
                  />
                  <Route path="shop" element={<Shop />} />
                  <Route path="contactus" element={<ContactUs />} />
                  <Route path="aboutus" element={<AboutUs />} />
                  <Route path="wishlist" element={<WishList />} />
                  <Route path="workshop" element={<HeroSection />} />
                  <Route path="/chat" element={<ChatComponent />} />
                  {/* <Route path="/chat" element={<ChatPage />} /> */}
                  <Route path="/seller" element={<SellerPage />} />
                  <Route path="/thanks" element={<ThankYou />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="profile" element={<ProfileUser />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route
                    path="workshopprofile/:workshopId"
                    element={<HeroSection />}
                  />
                </Route>
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/confirmemail" element={<ConfirmEmail />} />
                <Route path="checkoutForm" element={<CheckoutForm />} />
                <Route path="paymentsuccess" element={<PaymentSuccess />} />
                <Route path="paymentfailure" element={<PaymentFailure />} />
                <Route path="admin" element={<Admin />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotfountPage />} />
              </Routes>
            </Router>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              //transition= {Bounce}
            />
          </Elements>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default App;
