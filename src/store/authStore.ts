import { create } from "zustand";

interface AuthState {
  isLogged: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const ADMIN_USER = { username: "admin", password: "admin123", token: "secret-token" };

export const useAuth = create<AuthState>((set) => ({
  isLogged: Boolean(localStorage.getItem("mv_token")),
  token: localStorage.getItem("mv_token"),
  login: async (username, password) => {
    // mock auth: check hardcoded admin
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      localStorage.setItem("mv_token", ADMIN_USER.token);
      set({ isLogged: true, token: ADMIN_USER.token });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("mv_token");
    set({ isLogged: false, token: null });
  }
}));
