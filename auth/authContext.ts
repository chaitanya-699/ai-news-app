import { createContext } from "react";
import { User } from "../interfaces/interfaces";

export const AuthContext = createContext({
  user: null as User | null,
  token: null as string | null,
  setToken: (token: string | null) => {},
  login: (data: any) => {},
  logout: () => {},
  loading: true,
});

