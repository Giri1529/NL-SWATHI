import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SinglePagePortfolio from "@/pages/SinglePagePortfolio";
import { useEffect } from "react";

function App() {
  // Add base styles to body
  useEffect(() => {
    document.body.classList.add('min-h-screen');
    // Remove default background for gradient sections
    document.body.style.background = 'transparent';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SinglePagePortfolio />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
