import React, { FC } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LegoCursor from "./components/LegoCursor";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import NowPage from "./pages/NowPage";
import ThingsPage from "./pages/ThingsPage";
import FantasyPage from "./pages/FantasyPage";
import LotteryPage from "./pages/LotteryPage";

const App: FC = () => (
  <HashRouter>
    <LegoCursor />
    <Nav />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/fantasy" element={<FantasyPage />} />
      <Route path="/fantasy/lottery" element={<LotteryPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/now" element={<NowPage />} />
      <Route path="/things" element={<ThingsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </HashRouter>
);

export default App;