import "./App.css";
import { BrowserRouter as WebRouter } from "react-router-dom";
import Router from "./router/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <WebRouter>
        <Router></Router>
      </WebRouter>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  );
}

export default App;
