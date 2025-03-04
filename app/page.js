"use client";
import { useSession } from "next-auth/react";
// Pages
import Home from "./home/page";
import Header from "./components/commen/Header/Header";
import Login from "./(auth)/login/page";
import Footer from "./components/commen/Footer/Footer";
export default function Page() {
  const session = useSession();
  const loggedIn = !!session.data;

  return loggedIn ? (
    <Home />
  ) : (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}
