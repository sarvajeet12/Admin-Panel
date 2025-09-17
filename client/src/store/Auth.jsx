// TODO: ============================================================= WAREHOUSE ============================================================

import { createContext, useContext, useEffect, useState } from "reac";

// context
export const AuthContext = createContext();

//Provider
export const AuthProvider = ({ children }) => {
  // get and set token in token variable
  const [token, setToken] = useState(localStorage.getItem("adminPanelToken"));
  //console.log("admin token panel", token);

  const [user, setUser] = useState("");

  // ! Since, I am admin but cannot access admin page, so we use isLoading Concept  [true means stop, don't show data, right now it's loading]
  const [isLoading, setIsLoading] = useState(true);

  // token storage
  const authorizationToken = `Bearer ${token}`;

  // function definition
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("adminPanelToken", serverToken);
  };

  // check user login or not
  //* if token exist [isLoggedIn =true] else [isLoggedIn=false]
  let isLoggedIn = !!token;
  //?console.log(isLoggedIn);

  //logout function definition
  const logOutUser = () => {
    setToken("");
    localStorage.removeItem("adminPanelToken");
  };

  // JWT Authentication : To get the currently  logged-in user's data

  const userAuthentication = async () => {
    try {
      setIsLoading(true); //![true means stop, don't show data, right now it's loading]
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      //console.log("userData response: ", response);

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        console.log("user data", data.userData);
        setIsLoading(false); //![false means after data received, now show]
      } else {
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching user data");
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        logOutUser,
        isLoggedIn,
        user,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook / function
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }

  return authContextValue;
};
