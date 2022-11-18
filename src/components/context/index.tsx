import { useState, useRef } from "react";
import { AppContext } from "./app-context";

export default function ContextFeeder({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(false);
  const contextValues = {
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
