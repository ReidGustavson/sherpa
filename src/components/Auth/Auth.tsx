import { createContext, ReactNode, useContext, useState } from 'react';

const authContext = createContext({
  user: "", 
  signin:(_: () => void) =>{return}, 
  signout:(_:()=> void)=>{return}});

export function useAuth() {
  return useContext(authContext);
}

interface Props extends JSX.IntrinsicAttributes {
  children?: ReactNode
}

export function ProvideAuth({children}: Props) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useProvideAuth() {
  const [user, setUser] = useState("");

  const signin = (cb: () => void) => {
    setUser("user");
    cb();
  };

  const signout = (cb: () => void) => {
    console.log('In Auth');
    setUser("");
    cb();
  };

  return {
    user,
    signin,
    signout
  };
}

