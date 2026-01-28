import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Education from "@/pages/Education";
import Experience from "@/pages/Experience";
import Research from "@/pages/Research";
import Awards from "@/pages/Awards";
import Contact from "@/pages/Contact";
import { useEffect } from "react";

function Router() {
  // Scroll to top on route change
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div onFocus={scrollToTop}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/education" component={Education} />
        <Route path="/experience" component={Experience} />
        <Route path="/research" component={Research} />
        <Route path="/awards" component={Awards} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  // Add base styles to body for full height
  useEffect(() => {
    document.body.classList.add('min-h-screen', 'bg-slate-50');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
