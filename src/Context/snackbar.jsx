import React, { useState, useCallback, useContext } from "react";
import Snackbar from "../Components/Snackbar";

export const SnackbarContext = React.createContext({
  msg: { msg: "", type: "" },
  setMsg: () => {},
  removeMsg: () => {},
});

const SnackbarProvider = ({ children }) => {
  const [msg, setMsg] = useState({ msg: "", type: "" });
  const removeMsg = () => setMsg({ msg: "", type: "" });
  const addMsg = (msg, type) => setMsg({ msg, type });

  const contextValue = {
    msg,
    setMsg: useCallback((message, type) => addMsg(message, type), []),
    removeMsg: useCallback(() => removeMsg(), []),
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const { msg: string, setMsg, removeMsg } = useContext(SnackbarContext);
  return { msg: string, setMsg, removeMsg };
};

export default SnackbarProvider;
