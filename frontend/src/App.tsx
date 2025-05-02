import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CreateGamePage from "./pages/CreateGamePage";
import EditGamePage from "./pages/EditGamePage";
import NotFoundPage from "./pages/NotFoundPage";



const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games/new" element={<CreateGamePage />} />
        <Route path="/games/edit/:id" element={<EditGamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
