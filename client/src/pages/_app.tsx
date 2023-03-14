import secretjsService from "@/services/secretjs.service";
import { setUpStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const store = setUpStore();


  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
