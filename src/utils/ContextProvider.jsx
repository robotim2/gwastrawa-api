import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  notification: null,
  setUser: () => { },
  setNotification: () => { },
  danger: null,
  setDanger: () => { },
  warning: null,
  setWarning: () => { },
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [notification, _setNotification] = useState('');
  const [danger, _setDanger] = useState('');
  const [warning, _setWarning] = useState('');

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification('')
    }, 3000)
  }
  
  const setDanger = (message) => {
    _setDanger(message);
    setTimeout(() => {
      _setDanger('')
    }, 3000)
  }
  
  const setWarning = (message) => {
    _setWarning(message);
    setTimeout(() => {
      _setWarning('')
    }, 3000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      notification,
      setNotification,
      danger,
      setDanger,
      warning,
      setWarning,
    
    }}>

      {children}
    </StateContext.Provider>
  );

}

export const useStateContext = () => useContext(StateContext);
