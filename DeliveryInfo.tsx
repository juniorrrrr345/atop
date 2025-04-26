import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TruckIcon, UserIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeliveryInfoItem {
  id: number;
  title: string;
  description: string;
  type: 'delivery' | 'meetup' | 'hours' | 'notice';
  isActive: boolean;
  customName?: string; // Nom personnalisé pour le type
}

// Fonction pour obtenir le nom du type (pour l'affichage ou l'attribut title)
const getTypeName = (type: string): string => {
  switch(type) {
    case 'delivery':
      return 'Livraison';
    case 'meetup':
      return 'Meetup';
    case 'hours':
      return 'Horaires';
    case 'notice':
      return 'Information';
    default:
      return 'Information';
  }
};

// Fonction pour obtenir l'icône correspondant au type
const getIcon = (type: string) => {
  switch(type) {
    case 'delivery':
      return <TruckIcon className="h-5 w-5" />;
    case 'meetup':
      return <UserIcon className="h-5 w-5" />;
    case 'hours':
      return <ClockIcon className="h-5 w-5" />;
    case 'notice':
      return <AlertCircleIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function DeliveryInfo() {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Rafraîchir à intervalles réguliers pour garantir la synchronisation
  useEffect(() => {
    // Fetch delivery info data from the API
    const fetchDeliveryInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/delivery-info');
        if (Array.isArray(response.data)) {
          setDeliveryInfo(response.data);
        } else {
          console.error('Delivery info data is not an array:', response.data);
          setDeliveryInfo([]);
        }
      } catch (error) {
        console.error('Error fetching delivery info:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les informations de livraison.",
          variant: "destructive",
        });
        setDeliveryInfo([]);
      } finally {
        setLoading(false);
      }
    };
    
    // Faire la première requête immédiatement
    fetchDeliveryInfo();
    
    // Créer un intervalle pour rafraîchir les données toutes les 5 secondes
    const intervalId = setInterval(fetchDeliveryInfo, 5000);
    
    // Nettoyer l'intervalle lors du démontage
    return () => clearInterval(intervalId);
  }, [toast]);

  if (loading) {
    return (
      <div className="p-4 border border-gray-800 rounded-lg bg-gradient-to-b from-gray-900 to-black">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-800 rounded w-1/4"></div>
          <div className="h-10 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (deliveryInfo.length === 0) {
    return null;
  }

  const activeInfo = deliveryInfo.filter(item => item.isActive);
  
  return (
    <Card className="border-gray-800 bg-black/60 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Informations</CardTitle>
        <CardDescription>Livraisons, rencontres et horaires</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeInfo.length > 0 ? activeInfo[0].id.toString() : undefined} className="w-full">
          <TabsList className={`grid ${activeInfo.length > 4 ? 'grid-cols-4' : `grid-cols-${activeInfo.length}`} bg-gray-900`}>
            {activeInfo.map(info => (
              <TabsTrigger 
                key={info.id} 
                value={info.id.toString()}
                className="flex items-center gap-2 data-[state=active]:bg-gray-800"
                title={info.customName || getTypeName(info.type)}
              >
                {getIcon(info.type)}
                {info.customName && <span className="hidden sm:inline text-xs truncate max-w-[60px]">{info.customName}</span>}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {activeInfo.map(info => (
            <TabsContent key={info.id} value={info.id.toString()} className="py-2">
              <h3 className="font-medium text-white">{info.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{info.description}</p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}