import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Leaf,
  Shield
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  thcLevel: string;
  cbdLevel: string;
  stock: number;
  status: 'active' | 'inactive';
  certification: string;
}

interface Order {
  id: number;
  customerName: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: number;
  date: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
}

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const queryClient = useQueryClient();

  // Mock data - Dans une vraie app, ces données viendraient de l'API
  const dashboardStats = {
    totalProducts: 47,
    totalOrders: 128,
    totalCustomers: 89,
    monthlyRevenue: 12450
  };

  const mockProducts: Product[] = [
    {
      id: 1,
      name: "CBD Oil Premium 10%",
      category: "Huiles CBD",
      price: "45.00€",
      description: "Huile CBD full spectrum premium",
      thcLevel: "< 0.2%",
      cbdLevel: "10%",
      stock: 25,
      status: 'active',
      certification: "Bio EU"
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia",
      category: "Fleurs CBD",
      price: "12.00€",
      description: "Fleurs CBD indoor Amnesia Haze",
      thcLevel: "< 0.2%",
      cbdLevel: "18%",
      stock: 15,
      status: 'active',
      certification: "Lab Tested"
    }
  ];

  const mockOrders: Order[] = [
    {
      id: 1001,
      customerName: "Marie Dupont",
      email: "marie@email.com",
      total: 67.50,
      status: 'pending',
      items: 3,
      date: "2024-01-15"
    },
    {
      id: 1002,
      customerName: "Pierre Martin",
      email: "pierre@email.com",
      total: 45.00,
      status: 'shipped',
      items: 1,
      date: "2024-01-14"
    }
  ];

  const mockCustomers: Customer[] = [
    {
      id: 1,
      name: "Marie Dupont",
      email: "marie@email.com",
      orders: 5,
      totalSpent: 234.50,
      lastOrder: "2024-01-15"
    },
    {
      id: 2,
      name: "Pierre Martin", 
      email: "pierre@email.com",
      orders: 3,
      totalSpent: 156.00,
      lastOrder: "2024-01-14"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Leaf className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold">Administration CBD Shop</h1>
          <p className="text-muted-foreground">Gérez votre boutique CBD en toute simplicité</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Tableau de bord
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Produits
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Commandes
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Clients
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produits</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">+5 ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">+12 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">+7 ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.monthlyRevenue.toLocaleString()}€</div>
                <p className="text-xs text-muted-foreground">+15% vs mois dernier</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">#{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total.toFixed(2)}€</p>
                        <Badge className={`text-white ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produits populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProducts.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.price}</p>
                        <p className="text-sm text-green-600">CBD: {product.cbdLevel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des Produits CBD</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un produit
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>CBD</TableHead>
                    <TableHead>THC</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className="text-green-600">{product.cbdLevel}</TableCell>
                      <TableCell className="text-orange-600">{product.thcLevel}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge className={`text-white ${getStatusColor(product.status)}`}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-red-600">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer le produit</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-2xl font-bold">Gestion des Commandes</h2>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.email}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.total.toFixed(2)}€</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge className={`text-white ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select defaultValue={order.status}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="processing">En cours</SelectItem>
                              <SelectItem value="shipped">Expédiée</SelectItem>
                              <SelectItem value="delivered">Livrée</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <h2 className="text-2xl font-bold">Gestion des Clients</h2>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Commandes</TableHead>
                    <TableHead>Total dépensé</TableHead>
                    <TableHead>Dernière commande</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.totalSpent.toFixed(2)}€</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold">Paramètres de la boutique</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Conformité Légale CBD
                </CardTitle>
                <CardDescription>
                  Paramètres spécifiques aux réglementations CBD
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="thc-limit">Limite THC autorisée (%)</Label>
                  <Input id="thc-limit" type="number" step="0.01" defaultValue="0.2" />
                  <p className="text-xs text-muted-foreground">
                    Limite légale française: 0.2%
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age-verification">Vérification d'âge</Label>
                  <Select defaultValue="18">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18">18 ans minimum</SelectItem>
                      <SelectItem value="21">21 ans minimum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legal-notice">Avertissement légal</Label>
                  <Textarea 
                    id="legal-notice"
                    placeholder="Texte d'avertissement légal obligatoire..."
                    className="min-h-20"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>
                  Configuration de base de la boutique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Nom de la boutique</Label>
                  <Input id="shop-name" defaultValue="CBD Shop Premium" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select defaultValue="EUR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Taux de TVA (%)</Label>
                  <Input id="tax-rate" type="number" step="0.01" defaultValue="20" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Actions administratives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline">Exporter les données</Button>
                <Button variant="outline">Sauvegarder la configuration</Button>
                <Button variant="destructive">Vider le cache</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Admin;