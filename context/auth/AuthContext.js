import React, { useState, createContext } from "react";

const AuthContext = createContext([{}, () => {}]);

const AuthContextProvider = props => {
  const [authState, setAuthState] = useState({
    userIsLoggedin: false,
    fName: "",
    lName: "",
    userName: ""
  });
  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
