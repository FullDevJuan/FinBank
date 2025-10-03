import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/common/Nav";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";

function App() {
  return (
    <main className="dashboard">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
