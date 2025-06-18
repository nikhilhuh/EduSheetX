import { ReactNode } from "react";
import { UserProvider } from "./UserContext";

// Create an AppProvider that wraps RoomProvider and PlayerProvider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <UserProvider>{children}</UserProvider>;
};
