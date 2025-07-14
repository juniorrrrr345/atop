import { Switch, Route } from "wouter";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./toaster";
import { TooltipProvider } from "./tooltip";
import NotFound from "./not-found";
import Home from "./home";
import Admin from "./admin";
import InfosPage from "./infos";
import CanalPage from "./canal";
import { ThemeProvider } from "./ThemeProvider";
import BottomNav from "./BottomNav";
import { PageBackground } from "./PageBackground";
import { GlobalProductDrawer } from "./GlobalProductDrawer";
import InitialLoading from "./InitialLoading";
import PageTitle from "./PageTitle";

// Import ShowcasePanel pour la vitrine
import ShowcasePanel from "./ShowcasePanel";

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
