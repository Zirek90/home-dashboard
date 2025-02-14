import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { useLogin, useRegister } from "@src/api/mutations";
import { QUERY_KEYS } from "@src/api/queries/query-keys";
import { LoginRequestType, RegisterRequestType } from "@src/api/request-type";
import { AuthInterface } from "@src/interfaces";
import { errorHandler } from "@src/utils";
import { useNotificationContext } from "./NotificationProvider";

interface AuthProviderState {
  auth: AuthInterface | null;
  handleRegister: (credentials: RegisterRequestType) => Promise<void>;
  handleLogin: (credentials: LoginRequestType) => Promise<void>;
  handleLogout: () => void;
  loginPending: boolean;
  registerPending: boolean;
}

export const AuthContext = createContext<AuthProviderState | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // const [user, setUser] = useState<UserInterface | null>({ userId: "1", email: "", username: "" });
  const [auth, setAuth] = useState<AuthInterface | null>(() => {
    const savedUser = localStorage.getItem("user_auth");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const { mutateAsync: register, isPending: registerPending } = useRegister();
  const { mutateAsync: login, isPending: loginPending } = useLogin();
  const queryClient = useQueryClient();

  const { showSuccess, showError } = useNotificationContext();

  useEffect(() => {
    if (auth?.access_token) {
      httpClient.defaults.headers["Authorization"] = `Bearer ${auth.access_token}`;
    }
  }, [auth]);

  const handleRegister = async (credentials: RegisterRequestType) => {
    try {
      await register(credentials);
      showSuccess("Register successful");
    } catch (error) {
      const errorMessage = errorHandler(error);
      showError(`Register failed - ${errorMessage}`);
      throw error;
    }
  };

  const handleLogin = async (credentials: LoginRequestType) => {
    try {
      const userAuth = await login(credentials);
      setAuth(userAuth);
      showSuccess("Login successful");
      localStorage.setItem("user_auth", JSON.stringify(userAuth));
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    } catch (error) {
      const errorMessage = errorHandler(error);
      showError(`Login failed - ${errorMessage}`);
      throw error;
    }
  };

  const handleLogout = () => {
    setAuth(null);
    showSuccess("Successfully logout");
    localStorage.removeItem("user_auth");
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
  };

  return (
    <AuthContext.Provider value={{ auth, handleRegister, handleLogin, loginPending, registerPending, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const state = useContext(AuthContext);
  if (state === null) {
    throw new Error("State is still null");
  } else if (state === undefined) {
    throw new Error("Attempt to access from outside of context");
  }
  return state;
};
