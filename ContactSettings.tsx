import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaSave } from 'react-icons/fa';

// Interface pour les informations de contact
interface ContactInfo {
  id?: number;
  email: string;
  phone: string;
  address: string;
  hours: string;
  isActive: boolean;
}

export default function ContactSettings() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'contact@broly69.com',
    phone: '+33 7 12 34 56 78',
    address: 'Paris, France',
    hours: 'Lun-Ven: 10h-18h\nSam: 10h-16h',
    isActive: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Charger les informations de contact
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('/api/contact-info');
        if (response.data) {
          setContactInfo(response.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des informations de contact:', error);
        // Si l'API n'existe pas encore, on utilise les valeurs par défaut
      }
    };
    
    fetchContactInfo();
  }, []);

  // Enregistrer les modifications
  const handleSave = async () => {
    setIsSaving(true);
    try {
      let response;
      if (contactInfo.id) {
        response = await axios.put(`/api/contact-info/${contactInfo.id}`, contactInfo);
      } else {
        response = await axios.post('/api/contact-info', contactInfo);
      }
      
      toast({
        title: "Informations de contact mises à jour",
        description: "Les informations de contact ont été enregistrées avec succès.",
      });
      
      // Mettre à jour l'ID si c'est une nouvelle entrée
      if (!contactInfo.id && response.data.id) {
        setContactInfo(prev => ({ ...prev, id: response.data.id }));
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des informations de contact:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des informations de contact.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Informations de contact</h2>
        <p className="text-gray-400 mb-6">
          Modifiez les informations de contact qui seront affichées sur votre site
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-blue-400">
                <FaEnvelope /> Email
              </label>
              <Input
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contact@broly69.com"
                className="bg-gray-900 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-blue-400">
                <FaPhone /> Téléphone
              </label>
              <Input
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+33 7 12 34 56 78"
                className="bg-gray-900 border-gray-700"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-blue-400">
                <FaMapMarkerAlt /> Adresse
              </label>
              <Input
                value={contactInfo.address}
                onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Paris, France"
                className="bg-gray-900 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-blue-400">
                <FaClock /> Heures d'ouverture
              </label>
              <Textarea
                value={contactInfo.hours}
                onChange={(e) => setContactInfo(prev => ({ ...prev, hours: e.target.value }))}
                placeholder="Lun-Ven: 10h-18h&#10;Sam: 10h-16h"
                className="bg-gray-900 border-gray-700 h-24"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? (
              <>Enregistrement...</>
            ) : (
              <><FaSave className="mr-2" /> Enregistrer</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}