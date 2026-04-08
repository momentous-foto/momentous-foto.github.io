import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Closed from "./pages/Closed";

const App = () => (
  <TooltipProvider>
    <BrowserRouter
      basename={import.meta.env.MODE === 'production' ? '/momentous-studio-raya' : '/'}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<Closed />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;