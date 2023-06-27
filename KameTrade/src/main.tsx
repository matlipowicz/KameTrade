import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { store } from "./redux/store/rootStore.ts";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
