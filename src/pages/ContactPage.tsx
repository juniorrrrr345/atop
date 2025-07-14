import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Leaf } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Message envoyé! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@cbdshoppremium.fr",
      description: "Réponse sous 24h"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      description: "Lun-Ven 9h-18h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "123 Rue du CBD, 75001 Paris",
      description: "France métropolitaine"
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun-Ven: 9h-18h",
      description: "Support client disponible"
    }
  ];

  const faqItems = [
    {
      question: "Vos produits sont-ils légaux en France ?",
      answer: "Oui, tous nos produits CBD respectent la législation française avec un taux de THC inférieur à 0,2%."
    },
    {
      question: "Comment choisir le bon produit CBD ?",
      answer: "Nous recommandons de commencer avec des concentrations faibles (5-10%) et d'augmenter progressivement selon vos besoins."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Expédition sous 24h en France métropolitaine, livraison en 2-3 jours ouvrés."
    },
    {
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous disposez de 14 jours pour retourner un produit non ouvert selon la loi française."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Header */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <MessageCircle className="h-12 w-12 text-green-400" />
          <div>
            <h1 className="text-4xl font-bold cbd-text-gradient">Contactez-nous</h1>
            <p className="text-xl text-gray-400 mt-2">
              Notre équipe d'experts CBD est là pour vous accompagner
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center">
              <Icon className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{info.title}</h3>
              <p className="text-green-300 font-medium mb-1">{info.value}</p>
              <p className="text-sm text-gray-400">{info.description}</p>
            </div>
          );
        })}
      </section>

      {/* Contact Form and Info */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">Envoyez-nous un message</h2>
            <p className="text-gray-400">
              Une question sur nos produits CBD ? Besoin de conseils ? Notre équipe vous répond rapidement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Sujet *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="product-info">Information produit</option>
                <option value="order">Question sur commande</option>
                <option value="support">Support technique</option>
                <option value="partnership">Partenariat</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="Décrivez votre demande en détail..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="space-y-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold">Conseils personnalisés</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Notre équipe d'experts CBD vous aide à choisir les produits adaptés à vos besoins :
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Conseils sur les dosages</li>
              <li>• Choix du type de produit (huile, fleurs, résines)</li>
              <li>• Informations sur la légalité</li>
              <li>• Suivi post-achat</li>
            </ul>
          </div>

          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-300 mb-2">Engagement qualité</h4>
            <p className="text-sm text-green-200">
              Tous nos produits sont testés en laboratoire et certifiés conformes 
              à la réglementation française (THC ≤ 0,2%).
            </p>
          </div>

          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h4 className="font-semibold text-blue-300 mb-2">Livraison discrète</h4>
            <p className="text-sm text-blue-200">
              Expédition rapide et emballage discret pour protéger votre vie privée. 
              Livraison gratuite dès 50€ d'achat.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
          <p className="text-gray-400">
            Retrouvez les réponses aux questions les plus courantes
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>{item.question}</span>
                <span className="text-green-400 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-300">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Legal Notice */}
      <section className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-amber-300">Protection des données</h3>
          <p className="text-sm text-amber-200">
            Vos données personnelles sont protégées et utilisées uniquement pour répondre à votre demande. 
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;