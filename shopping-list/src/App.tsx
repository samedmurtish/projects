import "./App.css";
import ShoppingList from "./ShoppingList";

function App() {
  return (
    <div className="main-container">
      <h1>Shopping List</h1>
      <div className="shopping-list">
        <ShoppingList />
      </div>
    </div>
  );
}

export default App;
