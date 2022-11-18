import "./App.css";
import { Routes, Route } from "react-router-dom";
import NewPage from "./Components/NewPage";
import MainPage from "./Components/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/newpage" element={<NewPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
