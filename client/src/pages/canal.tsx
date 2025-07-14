import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Twitter,
  Send,
  Headphones
} from "lucide-react";

function CanalPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Pour toutes vos questions",
      value: "contact@cbdshop-premium.fr",
      action: "Envoyer un email",
      href: "mailto:contact@cbdshop-premium.fr",
      availability: "Réponse sous 24h"
    },
    {
      icon: Phone,
      title: "Téléphone",
      description: "Service client direct",
      value: "+33 1 23 45 67 89",
      action: "Appeler maintenant",
      href: "tel:+33123456789",
      availability: "Lun-Ven 9h-18h"
    },
    {
      icon: MessageCircle,
      title: "Chat en ligne",
      description: "Assistance immédiate",
      value: "Disponible sur le site",
      action: "Démarrer le chat",
      href: "#chat",
      availability: "Lun-Ven 9h-18h"
    }
  ];

  const socialNetworks = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@cbdshop_premium",
      description: "Suivez nos nouveautés et conseils",
      followers: "12.5K",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Facebook,
      name: "Facebook",
      handle: "CBD Shop Premium",
      description: "Communauté et avis clients",
      followers: "8.2K",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Twitter,
      name: "Twitter",
      handle: "@CBDShopPremium",
      description: "Actualités et informations",
      followers: "5.1K",
      color: "from-sky-400 to-sky-500"
    },
    {
      icon: Send,
      name: "Telegram",
      handle: "@cbdshop_premium",
      description: "Offres exclusives et notifications",
      followers: "3.8K",
      color: "from-blue-400 to-blue-500"
    }
  ];

  const supportTopics = [
    {
      title: "Commandes",
      description: "Suivi, modifications, annulations",
      icon: "📦"
    },
    {
      title: "Produits",
      description: "Informations, conseils d'utilisation",
      icon: "🌿"
    },
    {
      title: "Livraison",
      description: "Délais, zones, tarifs",
      icon: "🚚"
    },
    {
      title: "Retours",
      description: "Politique de retour, remboursements",
      icon: "↩️"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* En-tête */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Headphones className="h-12 w-12 text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold">Nos Canaux de Communication</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Plusieurs moyens de nous contacter pour vous accompagner
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Méthodes de contact principal */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-muted-foreground">
            Notre équipe d'experts est à votre disposition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <method.icon className="h-12 w-12 mx-auto text-blue-600" />
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-lg">{method.value}</p>
                  <Badge variant="outline" className="mt-2">
                    {method.availability}
                  </Badge>
                </div>
                <Button asChild className="w-full">
                  <a href={method.href}>
                    {method.action}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Réseaux sociaux */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Suivez-nous</h2>
          <p className="text-muted-foreground">
            Retrouvez-nous sur les réseaux sociaux pour les dernières actualités
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialNetworks.map((network, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
              <div className={`h-20 bg-gradient-to-r ${network.color}`} />
              <CardHeader className="text-center -mt-8">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                  <network.icon className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-lg">{network.name}</CardTitle>
                <CardDescription className="text-sm">
                  {network.handle}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  {network.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary">{network.followers} abonnés</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Suivre
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Sujets d'aide */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Comment pouvons-nous vous aider ?</h2>
          <p className="text-muted-foreground">
            Nos domaines d'expertise pour vous accompagner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportTopics.map((topic, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mx-auto">{topic.icon}</div>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Informations pratiques */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Informations Pratiques</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horaires d'ouverture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="font-medium">9h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="font-medium">10h00 - 16h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-muted-foreground">Fermé</span>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Support en ligne disponible pendant les horaires d'ouverture
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Adresse de contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">CBD Shop Premium</p>
                <p className="text-muted-foreground">123 Rue de la République</p>
                <p className="text-muted-foreground">75001 Paris, France</p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-sm font-medium">Métro le plus proche:</p>
                <p className="text-sm text-muted-foreground">République (Lignes 3, 5, 8, 9, 11)</p>
              </div>
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Voir sur la carte
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ rapide */}
      <section className="bg-muted/50 rounded-lg p-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Questions Fréquentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <h4 className="font-semibold">Délais de livraison ?</h4>
              <p className="text-sm text-muted-foreground">
                24-48h en France métropolitaine
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Modes de paiement acceptés ?</h4>
              <p className="text-sm text-muted-foreground">
                CB, virement, crypto-monnaies
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Produits légaux ?</h4>
              <p className="text-sm text-muted-foreground">
                100% conformes, THC ≤ 0,2%
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Politique de retour ?</h4>
              <p className="text-sm text-muted-foreground">
                14 jours, produits non ouverts
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CanalPage;