import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Search from "./pages/Search";
import Layout from "./components/Layout";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/:propId" element={<PropertyDetails />}></Route>
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  );
}

export default App;
