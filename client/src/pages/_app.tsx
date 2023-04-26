import { store } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { ClientProvider } from "@/components/ClientProvider";
import { Header } from "@/components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ClientProvider>
        <Component {...pageProps} />
      </ClientProvider>
    </Provider>
  );
}
