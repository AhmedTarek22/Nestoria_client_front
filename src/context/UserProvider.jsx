import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../apis/axiosConfig";

const userInfoContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = (await axiosInstance.get("/api/v1/fur/profile")).data.user;
        if (res.role !== "workshop" && res.role !== "admin") {
          setCurrentUser(res);
          setIsLogin(res.isLoggedin);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <userInfoContext.Provider
      value={{ currentUser, setCurrentUser, isLogin, setIsLogin }}
    >
      {children}
    </userInfoContext.Provider>
  );
}

function useUserInfoContext() {
  const context = useContext(userInfoContext);
  return context;
}

export { UserProvider, useUserInfoContext };
