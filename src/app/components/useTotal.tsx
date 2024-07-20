import {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface TotalContextType {
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
}

const TotalContext = createContext<TotalContextType | null>(null);

export function TotalProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState(0);
  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
}

export function useTotal(): TotalContextType {
  const context = useContext(TotalContext);
  if (!context) {
    throw new Error("useTotal must be used within a TotalProvider");
  }
  return context;
}
