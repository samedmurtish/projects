import React from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/footer/Footer";
export default function App() {
  return (
    <>
      <NavigationBar />
      <div className="flex h-screen flex-col">
        <div className="py-96">content</div>
        <footer className="justify-self-end self-end">
          <Footer />
        </footer>
      </div>
    </>
  );
}
