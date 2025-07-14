import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Leaf, Shield, Truck, Clock } from "lucide-react";
import { Link } from "wouter";

interface SiteSettings {
  homeWelcomeTitle: string;
  homeWelcomeText: string;
  homeActionButtonText: string;
  siteName: string;
}

function Home() {
  const { data: siteSettings } = useQuery<SiteSettings>({
    queryKey: ['/api/site-settings'],
  });

  const featuredProducts = [
    {
      id: 1,
      name: "CBD Oil Premium 10%",
      price: "45.00€",
      image: "/api/placeholder/300/200",
      category: "Huiles CBD",
      thc: "< 0.2%",
      cbd: "10%"
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia",
      price: "12.00€",
      image: "/api/placeholder/300/200", 
      category: "Fleurs CBD",
      thc: "< 0.2%",
      cbd: "18%"
    },
    {
      id: 3,
      name: "Résine CBD Hash",
      price: "25.00€",
      image: "/api/placeholder/300/200",
      category: "Résines CBD", 
      thc: "< 0.2%",
      cbd: "22%"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
            {siteSettings?.homeWelcomeTitle || "Boutique CBD Premium"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {siteSettings?.homeWelcomeText || "Découvrez notre sélection de produits CBD de haute qualité, conformes à la législation française"}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            THC ≤ 0.2%
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            100% Légal
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Livraison France
          </Badge>
        </div>

        <Link href="/showcase">
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
            {siteSettings?.homeActionButtonText || "Découvrir nos produits"}
          </Button>
        </Link>
      </section>

      <Separator />

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Produits Vedettes</h2>
          <p className="text-muted-foreground">Nos meilleures sélections de produits CBD</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <Leaf className="h-16 w-16 text-green-600" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </div>
                  <Badge variant="outline">{product.price}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">THC: {product.thc}</span>
                  <span className="text-green-600 font-medium">CBD: {product.cbd}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Benefits Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir Notre CBD ?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">Qualité Garantie</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tous nos produits sont testés en laboratoire et conformes aux normes européennes
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Leaf className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">100% Naturel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Produits biologiques sans pesticides ni additifs chimiques
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Truck className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">Livraison Rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Expédition sous 24h, livraison discrète partout en France
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">Support Client</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Équipe d'experts disponible pour vous conseiller
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="bg-muted/50 rounded-lg p-6">
        <div className="text-center space-y-2">
          <h3 className="font-semibold">Avertissement Légal</h3>
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
            Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française. 
            Réservé aux adultes de plus de 18 ans. Ne pas conduire après consommation. 
            Consultez votre médecin avant utilisation si vous êtes enceinte, allaitez ou sous traitement médical.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;