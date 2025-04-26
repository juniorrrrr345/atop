import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function CategorySettings() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Charger les catégories existantes
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/products');
        // Extraire les catégories uniques
        const uniqueCategories = Array.from(
          new Set(response.data.map((p: any) => p.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  // Fonction pour supprimer une catégorie
  const handleDeleteCategory = async (category: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category}" ?`)) {
      return;
    }

    setSaving(true);
    try {
      // Récupérer tous les produits
      const response = await axios.get('/api/products');
      const products = response.data;
      
      // Identifier les produits à mettre à jour
      const productsToUpdate = products.filter((p: any) => p.category === category);
      
      // Mettre à jour chaque produit pour retirer la catégorie
      let updateSuccess = true;
      
      for (const product of productsToUpdate) {
        try {
          // Création d'un FormData pour assurer que la requête est envoyée au bon format
          const formData = new FormData();
          
          // Ajouter toutes les propriétés existantes du produit
          formData.append('name', product.name);
          formData.append('price', product.price.toString());
          formData.append('description', product.description);
          formData.append('category', ''); // Catégorie vide
          
          // Ajouter les propriétés optionnelles uniquement si elles existent
          if (product.farm) formData.append('farm', product.farm);
          if (product.externalLink) formData.append('externalLink', product.externalLink);
          if (product.media) formData.append('media', product.media);
          
          // Envoyer la requête avec le bon format
          await axios.put(`/api/products/${product.id}`, formData);
          
        } catch (err) {
          console.error(`Erreur lors de la mise à jour du produit ${product.id}:`, err);
          updateSuccess = false;
        }
      }
      
      // Mettre à jour l'état local, même si certaines mises à jour ont échoué
      // pour éviter une incohérence entre l'affichage et les données réelles
      setCategories(categories.filter(c => c !== category));
      
      if (updateSuccess) {
        toast({
          title: "Catégorie supprimée",
          description: `La catégorie "${category}" a été supprimée avec succès.`,
        });
      } else {
        toast({
          title: "Suppression partielle",
          description: `La catégorie a été supprimée, mais certains produits n'ont pas pu être mis à jour.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la catégorie.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-gray-800 bg-muted">
        <CardHeader>
          <CardTitle className="text-lg">Gestion des catégories</CardTitle>
          <CardDescription>Gérez vos catégories de produits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-800 rounded"></div>
            <div className="h-10 bg-gray-800 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-800 bg-muted">
      <CardHeader>
        <CardTitle className="text-lg">Gestion des catégories</CardTitle>
        <CardDescription>Gérez vos catégories de produits</CardDescription>
      </CardHeader>
      <CardContent>
        {categories.length > 0 ? (
          <div className="space-y-2">
            {categories.map(category => (
              <div 
                key={category} 
                className="flex items-center justify-between p-3 rounded-md bg-gray-800/50 border border-gray-700"
              >
                <span className="text-gray-200">{category}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCategory(category)}
                  disabled={saving}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            Aucune catégorie disponible.
          </div>
        )}
      </CardContent>
    </Card>
  );
}