import React from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/footer/Footer";
import Content from "./components/content/Content";

export default function App() {
  return (
    <>
      <NavigationBar />
      <div className="flex h-screen flex-col">
        <Content />
        <footer className="justify-self-end self-end ">
          <Footer />
        </footer>
      </div>
    </>
  );
}
