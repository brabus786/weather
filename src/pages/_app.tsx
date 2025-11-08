import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createWrapper } from "next-redux-wrapper";
import { AppStore, initStore } from "@/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { APIProvider } from "@vis.gl/react-google-maps";
import "core-js/stable";
import "regenerator-runtime/runtime";
import PopupDespatcher from "@/Components/Popups/PopupDespatcher";
import "reactflow/dist/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={initStore()}>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_MAP || ""}
        libraries={["places"]}
        language="en"
      >
        <Component {...pageProps} />
        <PopupDespatcher />
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
      </APIProvider>
    </Provider>
  );
}

const makeStore = () => initStore();

export const wrapper = createWrapper<AppStore>(makeStore);
