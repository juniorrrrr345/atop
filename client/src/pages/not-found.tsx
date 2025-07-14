import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <Leaf className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Page Introuvable</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Désolé, la page que vous recherchez n'existe pas dans notre boutique CBD.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            La page que vous cherchez a peut-être été déplacée, supprimée ou l'URL est incorrecte.
          </p>
          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <Link href="/showcase">
              <Button variant="outline" className="w-full">
                Voir nos produits CBD
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotFound;