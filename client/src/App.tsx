import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Questionnaire from "./pages/Questionnaire";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/planos" component={Plans} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/sucesso" component={Success} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contato" component={Contact} />
      <Route path="/cadastro" component={Questionnaire} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
