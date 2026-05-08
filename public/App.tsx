import React, { useState, FC } from "react";
import LegoCursor from "./components/LegoCursor";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import NowPage from "./pages/NowPage";
import ThingsPage from "./pages/ThingsPage";

const App: FC = () => {
  const [page, setPage] = useState<string>("home");

  const pages: Record<string, React.ReactNode> = {
    home: <HomePage />,
    resume: <ResumePage />,
    now: <NowPage />,
    things: <ThingsPage />
  };

  return (
    <div>
      <LegoCursor />
      <Nav page={page} setPage={setPage} />
      {pages[page]}
    </div>
  );
};

export default App;
