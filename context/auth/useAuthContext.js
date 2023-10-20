import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAuthContext = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const login = loginDetails => {
    setAuthState({
      userIsLoggedin: true,
      fName: "test fname",
      lName: "test lname",
      userName: "testname"
    });
  };

  const logout = () => {
    setAuthState({
      userIsLoggedin: false,
      fName: "",
      lName: "",
      userName: ""
    });
  };

  return { login, logout };
};

export default useAuthContext;
