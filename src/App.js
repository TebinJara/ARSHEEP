import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { RouterPrincipal } from "./components/routers/RouterPrincipal";


function App() {
  return (
    <div className="App">
      <Layout/>
    </div>
  );
}

export default App;
