import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { localStoragePersister, queryClient } from "./libs/queryClient.ts";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { BrowserRouter } from "react-router";
import { AuthContextProvider } from "./context/auth-context.tsx";
import ScrollToTop from "./components/ScrollTotop.tsx";
import Header from "./components/Header.tsx";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: localStoragePersister }}
        >
            <HelmetProvider>
                <Helmet>
                    <title>{import.meta.env.VITE_WEBSITE_TITLE}</title>
                </Helmet>
                <AuthContextProvider>
                    <BrowserRouter>
                        <ScrollToTop />
                        <Header />
                        <Suspense fallback={<div>Loading</div>}>
                            <App />
                        </Suspense>
                    </BrowserRouter>
                </AuthContextProvider>
            </HelmetProvider>
        </PersistQueryClientProvider>
    </StrictMode>
);
