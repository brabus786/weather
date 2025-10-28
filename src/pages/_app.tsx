import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createWrapper } from "next-redux-wrapper";
import { AppStore, initStore } from "@/store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={initStore()}>
      <Component {...pageProps} />
    </Provider>
  );
}

const makeStore = () => initStore();

export const wrapper = createWrapper<AppStore>(makeStore);





