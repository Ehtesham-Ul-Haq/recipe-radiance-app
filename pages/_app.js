import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';


export default function App({ Component, pageProps }) {
  return <>
  <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
  <Header />
  <Component {...pageProps} />;
  <Footer />
  </GoogleOAuthProvider>
  </>
}

