import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ClaimPage from "./pages/ClaimPage";

// Every time the page (route) changes, start at the top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// This file is the "map" of your website:
//   /             -> your home page
//   /check-claim  -> the fraud detection form (opened by "Get Started")
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-claim" element={<ClaimPage />} />
      </Routes>
    </>
  );
}
