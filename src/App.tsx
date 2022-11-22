import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./components/book";
import Top from "./components/top";


const App: React.FC = () => {
  return (
       <Routes>
         <Route path="/top" element={Top()}/>
         <Route path="/book" element={Details()}/>
       </Routes>
  );
};

export default App;