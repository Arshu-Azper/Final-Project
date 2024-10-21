import {
    useContext,
    createContext,
    type PropsWithChildren,
    useEffect,
    useState,
  } from "react";

  const AuthContext = createContext<{
    reload?: boolean;
  }>({
    reload: true,
  });

export function workAround() {
  const [reload, setReload] = useState<boolean>();

    return {reload, setReload};
  }