import Layout from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <main className={poppins.className}>
        <Layout>
          <Component {...pageProps} />
          <Toaster richColors />
        </Layout>
      </main>
    </ErrorBoundary>
  );
}
