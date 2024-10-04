import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
function Layout() {
  const location = useLocation();
  const blackList = ["/register", "/login", "/forgotpassword", "/seller"];

  const hideComponents = blackList.includes(location.pathname);
  const hideFooter = location.pathname === "/chat";

  return (
    <>
      <Navbar />
      {!hideComponents && <Navbar2 />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
}

export default Layout;
