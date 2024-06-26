import About from "./components/AboutPage/About";

function App() {
  document.title = "Harun Spaho`s Portfolio";
  return (
    <div className="h-screen flex justify-start flex-col w- screen select-none">
      <About />
    </div>
  );
}

export default App;
