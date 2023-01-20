import type { AppProps } from "next/app";
import { createContext, Dispatch, useContext, useState } from "react";
import Layout from "../components/layout";
import "../styles/globals.css";

const AppContext = createContext<{
  contextData: any;
  setContextData: Dispatch<any>;
}>({} as any);

export default function App({ Component, pageProps }: AppProps) {
  const [contextData, setContextData] = useState({} as any);
  const contextValue = { contextData, setContextData };

  return (
    <AppContext.Provider value={contextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
