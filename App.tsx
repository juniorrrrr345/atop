import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import InfosPage from "@/pages/infos";
import CanalPage from "@/pages/canal";
import { ThemeProvider } from "@/components/ThemeProvider";
import BottomNav from "@/components/BottomNav";
import { PageBackground } from "@/components/PageBackground";
import { GlobalProductDrawer } from "@/components/GlobalProductDrawer";
import InitialLoading from "@/components/InitialLoading";
import PageTitle from "@/components/PageTitle";

// Import ShowcasePanel pour la vitrine
import ShowcasePanel from "@/components/ShowcasePanel";

// Page Showcase avec le composant ShowcasePanel
function ShowcasePage() {
  return <ShowcasePanel />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} /> {/* Page d'accueil unique */}
      <Route path="/admin" component={Admin} /> {/* Panneau d'administration protégé */}
      <Route path="/showcase" component={ShowcasePage} /> {/* Page de vitrine produits */}
      <Route path="/infos" component={InfosPage} /> {/* Page d'informations */}
      <Route path="/canal" component={CanalPage} /> {/* Page des canaux de communication */}
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          {/* Gestion dynamique du titre de la page */}
          <PageTitle />
          
          <InitialLoading>
            <div className="min-h-screen text-white flex flex-col">
              {/* Afficher l'arrière-plan personnalisé */}
              <PageBackground />
              
              <div className="flex-grow pb-16">
                <Toaster />
                <Router />
                <GlobalProductDrawer />
              </div>
              
              {/* Barre de navigation inférieure (style HASHTAG BOT) 
                 Afficher sur toutes les pages sauf /admin */}
              <Route path="/">
                <BottomNav />
              </Route>
            </div>
          </InitialLoading>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
