import { createContext, useReducer, useEffect } from "react";

export const UserStateContext = createContext();
export const UserDispatchContext = createContext();

// const initialState = {
//   isAuth: false,
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        isAuth: true,
        token: action.token,
        userId: action.userId,
        userName: action.userName
      };
    }
    case "LOGOUT": {
      return {
        isAuth: false,
        token: "",
        userId: "",
        userName: ""
      };
    }
    default: {
      throw new Error("Unhandled action type.");
    }
  }
};

const UserProvider = ({ children, isAuthenticated, token, userId, userName }) => {
  const [state, dispatch] = useReducer(reducer, { isAuth: isAuthenticated, token:token, userId:userId, userName:userName });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ 
        type: "LOGIN", 
        userName: userName, 
        token: token, 
        userId: userId });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, [isAuthenticated]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
