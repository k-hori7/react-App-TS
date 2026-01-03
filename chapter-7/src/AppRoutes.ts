import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Contact from "./Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/posts/:id" element={<Detail />} />
    </Routes>
  );
}
