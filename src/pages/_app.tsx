import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createWrapper } from "next-redux-wrapper";
import { AppStore, initStore } from "@/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={initStore()}>
      <Component {...pageProps} />
        <ToastContainer
          style={{ zIndex: 999999 }}
          position="top-center"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="resetToast"
          limit={1}
        />
      </Provider>
  );
}

const makeStore = () => initStore();

export const wrapper = createWrapper<AppStore>(makeStore);





