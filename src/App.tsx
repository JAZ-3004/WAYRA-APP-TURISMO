import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar as CalendarIcon, PartyPopper, ChevronLeft, ChevronRight, Info, X, Music, Map as MapIcon, Navigation, ExternalLink, Locate, ArrowRight, RefreshCw, Loader2, Bus, List, Compass, Bell, Trash2, Clock, ShoppingBag } from 'lucide-react';
import { MUNICIPALITIES as FALLBACK_MUNICIPALITIES, PROVINCES, Municipality, GALLERY_CATEGORIES, GALLERY_IMAGES, GalleryItem, PASTO_EVENTS, DetailedEvent, TypicalFood, CURIOSITIES, WORDS_NARINENSES, DIALECT_INFO } from './data';
import wairaLogo from '../assets/WAIRA APP_1 png.png';
import solDeLosPastos from '../assets/SOL DE LOS PASTOS PNG.png';
import Papa from 'papaparse';
import { Leaf, Sparkles, Image as ImageIcon, UtensilsCrossed, Utensils, Languages } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

// Fix for Leaflet default icon issue in React
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon for the user's location
const UserIcon = L.divIcon({
  html: `
    <div class="flex flex-col items-center justify-center">
      <div class="bg-amber-700 text-white px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap mb-1 shadow-lg border border-white/50 animate-pulse">
        Tú estás aquí
      </div>
      <div class="bg-amber-700 p-1.5 rounded-full text-white shadow-xl border-2 border-white transform hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div class="w-1.5 h-1.5 bg-amber-600 rounded-full mt-0.5 animate-ping"></div>
    </div>
  `,
  className: 'custom-user-icon',
  iconSize: [80, 60],
  iconAnchor: [40, 55]
});

const TransportIcon = L.divIcon({
  html: `
    <div class="flex flex-col items-center justify-center">
      <div class="bg-amber-950 p-2 rounded-xl text-white shadow-xl border-2 border-white transform hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1 1-2V7a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v9c0 1 1 2 1 2h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
      </div>
    </div>
  `,
  className: 'custom-transport-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

type View = 'home' | 'calendar' | 'map' | 'pasto-events' | 'know-more' | 'transport' | 'experience' | 'reminders' | 'shop';

interface TravelReminder {
  id: string;
  municipalityName: string;
  eventName: string;
  eventDate: string;
  reminderDaysBefore: number;
}

interface Review {
  id: string;
  municipalityName: string;
  rating: number;
  userName: string;
  comment: string;
  date: string;
}

export interface TransportTerminal {
  name: string;
  type: 'Terminal Principal' | 'Paradero de Camionetas' | 'Acopio';
  location: string;
  lat: number;
  lng: number;
  destinations: string[];
  description: string;
}

const TRANSPORT_TERMINALS: TransportTerminal[] = [
  {
    name: "Terminal de Transportes de Pasto",
    type: "Terminal Principal",
    location: "Pasto (Sur)",
    lat: 1.1969,
    lng: -77.2694,
    destinations: ["Ipiales", "Tumaco", "Cali", "Sibundoy", "Mocoa", "Popayán"],
    description: "La central de transporte más grande de Nariño, conecta con todo el país y el sur del departamento."
  },
  {
    name: "Torobajo (Colectivos y Camionetas)",
    type: "Paradero de Camionetas",
    location: "Pasto (Occidente)",
    lat: 1.2291,
    lng: -77.2942,
    destinations: ["Ancuyá", "Sandoná", "Consacá", "La Florida"],
    description: "Punto estratégico para viajar a los municipios del occidente nariñense en camionetas y buses colectivos."
  },
  {
    name: "Terminal de Ipiales",
    type: "Terminal Principal",
    location: "Ipiales",
    lat: 0.8167,
    lng: -77.6333,
    destinations: ["Pasto", "Popayán", "Cali", "Ecuador (Rumichaca)"],
    description: "Terminal fronterizo clave para el comercio y turismo entre Colombia y Ecuador."
  },
  {
    name: "Salida al Norte (Calle 22)",
    type: "Acopio",
    location: "Pasto (Norte)",
    lat: 1.2335,
    lng: -77.2818,
    destinations: ["Buesaco", "La Unión", "Higuerones", "Arboleda"],
    description: "Zona de embarque para destinos hacia el norte del departamento por la vía Panamericana."
  },
  {
    name: "Barrio Chapal",
    type: "Acopio",
    location: "Pasto (Sur)",
    lat: 1.1932,
    lng: -77.2797,
    destinations: ["Catambuco", "Puerres", "Córdoba", "Gualmatán"],
    description: "Punto de salida informal pero tradicional para el sur profundo de Nariño."
  },
  {
    name: "Terminal de Samaniego",
    type: "Terminal Principal",
    location: "Samaniego",
    lat: 1.3347,
    lng: -77.5960,
    destinations: ["Pasto", "Túquerres", "La Llanada", "Sandoná"],
    description: "Centro neurálgico para el transporte en la zona de cordillera y occidente."
  },
  {
    name: "Terminal de El Tambo",
    type: "Terminal Principal",
    location: "El Tambo",
    lat: 1.4167,
    lng: -77.3967,
    destinations: ["Pasto", "La Florida", "Sandoná", "Peñol"],
    description: "Punto de conexión clave para los municipios circundantes al volcán Galeras."
  },
  {
    name: "Acopio Cumbal",
    type: "Acopio",
    location: "Cumbal",
    lat: 0.9167,
    lng: -77.7833,
    destinations: ["Ipiales", "Guachucal", "Pasto"],
    description: "Punto de partida para el transporte hacia los páramos y el volcán Cumbal."
  }
];

export interface Animal {
  name: string;
  description: string;
  image: string | string[];
}

export interface Flora {
  name: string;
  description: string;
  image: string | string[];
}

// Helper to calculate distance in km between two points
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Map component to handle view changes
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Food Carousel Component
function FoodCarousel({ images, dish }: { images: string[], dish: string }) {
  const [index, setIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          alt={dish}
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-950/40 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-950/40 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-amber-400 w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>('home');
  const [municipalities, setMunicipalities] = useState<Municipality[]>(FALLBACK_MUNICIPALITIES);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(GALLERY_IMAGES);
  const [typicalFoods, setTypicalFoods] = useState<TypicalFood[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [flora, setFlora] = useState<Flora[]>([]);
  const [transportTerminals] = useState<TransportTerminal[]>([
    ...TRANSPORT_TERMINALS,
    {
      name: "Terminal de Transportes de Sandoná",
      type: "Terminal Principal",
      location: "Sandoná",
      lat: 1.2889,
      lng: -77.4719,
      destinations: ["Pasto", "Ancuyá", "Consacá", "La Florida"],
      description: "Punto central de transporte en Sandoná para viajar a Pasto y pueblos vecinos."
    },
    {
      name: "Acopio Principal Ancuya",
      type: "Acopio",
      location: "Ancuyá",
      lat: 1.2678,
      lng: -77.5311,
      destinations: ["Sandoná", "Pasto", "Linares"],
      description: "Zona de salida de camionetas y colectivos hacia Sandoná y la capital."
    },
    {
      name: "Terminal de Transportes La Unión",
      type: "Terminal Principal",
      location: "La Unión",
      lat: 1.6053,
      lng: -77.1306,
      destinations: ["Pasto", "Cali", "Mercaderes", "San Lorenzo"],
      description: "Centro logístico del norte de Nariño."
    },
    {
      name: "Terminal de Transportes Túquerres",
      type: "Terminal Principal",
      location: "Túquerres",
      lat: 1.0872,
      lng: -77.6186,
      destinations: ["Pasto", "Ipiales", "Guachucal", "Cumbal", "Tumaco"],
      description: "Puerta de entrada a la sabana de Túquerres y paso hacia la costa."
    },
    {
      name: "Terminal de Transportes de Tumaco",
      type: "Terminal Principal",
      location: "Tumaco",
      lat: 1.8081,
      lng: -78.7619,
      destinations: ["Pasto", "Barbacoas", "Cali"],
      description: "Terminal portuario y terrestre principal en la costa pacífica."
    },
    {
      name: "Muelle de Barbacoas",
      type: "Acopio",
      location: "Barbacoas",
      lat: 1.6714,
      lng: -78.1417,
      destinations: ["Tumaco", "Junín", "Pasto"],
      description: "Conexión fluvial y terrestre vital para la región del Telembí."
    },
    {
      name: "Puerto Fluvial El Charco",
      type: "Acopio",
      location: "El Charco",
      lat: 2.4764,
      lng: -78.1106,
      destinations: ["Tumaco", "Guapi", "Buenaventura"],
      description: "Principal terminal fluvial para la conexión con el Pacífico norte nariñense."
    },
    {
      name: "Terminal de Samaniego",
      type: "Terminal Principal",
      location: "Samaniego",
      lat: 1.3347,
      lng: -77.5960,
      destinations: ["Pasto", "Túquerres", "La Llanada", "Sandoná"],
      description: "Centro neurálgico para el transporte en la zona de cordillera y occidente."
    },
    {
      name: "Terminal de El Tambo",
      type: "Terminal Principal",
      location: "El Tambo",
      lat: 1.4167,
      lng: -77.3967,
      destinations: ["Pasto", "La Florida", "Sandoná", "Peñol"],
      description: "Punto de conexión clave para los municipios circundantes al volcán Galeras."
    }
  ]);
  const [transportOrigin, setTransportOrigin] = useState<string>('');
  const [selectedTransportDestination, setSelectedTransportDestination] = useState<string>('');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // PWA Install states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install response: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  // Fetch Google Sheets Data
  useEffect(() => {
    let csvUrl = import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL;
    
    if (!csvUrl) {
      console.warn("VITE_GOOGLE_SHEETS_CSV_URL no está definido. Usando datos locales de respaldo.");
      return;
    }

    // Convert edit/pubhtml links to export/pub links
    if (csvUrl.includes('/edit')) {
      csvUrl = csvUrl.replace(/\/edit.*$/, '/export?format=csv');
    } else if (csvUrl.includes('/pubhtml')) {
      csvUrl = csvUrl.replace('/pubhtml', '/pub?output=csv');
    }

    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status} ${response.statusText}`);
        }
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as any[];
            
            // Filter and Map Municipalities
            const parsedMunicipalities = data
              .filter((row: any) => 
                (row.type === 'municipality' || !row.type) && // Allow rows without type if name/lat/lng exist
                (row.name || row.municipio || row.pueblo) && 
                (row.lat || row.latitud) && 
                (row.lng || row.longitud)
              )
              .map((row: any) => ({
                name: row.name || row.municipio || row.pueblo || row.d || row.D,
                festival: row.festival || row.fiesta || row.evento || '',
                date: row.date || row.fecha || '',
                province: row.province || row.provincia || '',
                lat: parseFloat(String(row.lat || row.latitud).replace(',', '.')),
                lng: parseFloat(String(row.lng || row.longitud).replace(',', '.')),
                description: row.description || row.info || row.informacion || row.detalles || row.cronica || row.e || row.E || '',
                image: row.image || row.foto || row.imagen || ''
              })) as Municipality[];

            // Filter and Map Gallery Items
            const parsedGallery = data
              .filter((row: any) => row.type === 'gallery' && row.url && row.title)
              .map((row: any) => ({
                url: row.url,
                title: row.title,
                category: row.category || 'paisaje',
                sourceUrl: row.sourceUrl || '',
                description: row.description || '',
                location: row.location || ''
              })) as GalleryItem[];
            
            if (parsedMunicipalities.length > 0) {
              setMunicipalities(parsedMunicipalities);
            }
            
            if (parsedGallery.length > 0) {
              setGalleryImages(parsedGallery);
            }

            setDataError(null);
            setIsLoadingData(false);
          },
          error: (error: any) => {
            console.error("Error parseando CSV:", error);
            setDataError("No se pudo procesar la tabla de Google Sheets.");
            setIsLoadingData(false);
          }
        });
      } catch (err) {
        console.error("Error cargando datos:", err);
        setDataError(err instanceof Error ? err.message : "Error al conectar con Google Sheets.");
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Fetch Typical Foods Data
  useEffect(() => {
    const foodsCsvUrl = 'https://docs.google.com/spreadsheets/d/1GjjZkzRDn6RqJd30hqWYDChnLt54qH29ynJGwViUuRc/export?format=csv';
    
    const priorityFoods: TypicalFood[] = [
      {
        municipality: "Tumaco / Barbacoas / Ricaurte / Roberto Payán",
        dish: "Pescado con Encocado",
        description: "El alma del Pacífico nariñense. Pescado fresco preparado en una suntuosa salsa de leche de coco natural, aliños regionales y hierbas de azotea como la chillangua y el chirarán.",
        image: [
          'https://1.bp.blogspot.com/-eTUSxeiA5aE/YGd6Sx6j_pI/AAAAAAAAAQ4/8DUPU8yOz9A44sUUi5IAadXri2jLX-WWwCLcBGAsYHQ/w378-h219/5.jpg',
          'https://i.pinimg.com/736x/81/4b/1f/814b1f8ea8546ab7f5eab56fb2e4e5b0--colombian-recipes-colombian-food.jpg',
          'https://comidaperuana.online/wp-content/uploads/2022/09/receta-de-pescado-frito-1200x800.jpg'
        ]
      },
      {
        municipality: "Tumaco / Costa Pacífica",
        dish: "Cazuela de Mariscos",
        description: "Una explosión de sabores marinos que incluye camarón, pota, almejas y caracoles, todo cocido lentamente en leche de coco. Un manjar que representa la abundancia del mar.",
        image: [
          'https://elturismoencolombia.com/wp-content/uploads/2022/02/gastronomia-tumaco-narino-colombia.jpg',
          'https://img.freepik.com/fotos-premium/delicioso-plato-mariscos-plato-abundancia-delicias-culinarias_975681-326.jpg',
          'https://uploads.vibra.co/1/2022/12/platos-tipicos-de-la-region-pacifica.jpg'
        ]
      },
      {
        municipality: "El Encano (La Cocha)",
        dish: "Trucha Arcoíris",
        description: "Proveniente de las aguas frías y cristalinas de la Laguna de la Cocha, la trucha se sirve en diversas preparaciones: ahumada, al ajillo o frita, siendo el plato insignia de este corregimiento.",
        image: [
          'https://marketingsimulator.net/mmartinez/wp-content/uploads/sites/242/2016/08/GastronomiaSalentina-672x372.jpg',
          'https://polloslariviera.com/wp-content/uploads/2022/10/LA_RIVIERA__TRUCHA.jpg',
          'https://crianzamaresyriosdespana.es/wp-content/uploads/2023/11/trucha-plancha.jpg'
        ]
      },
      {
        municipality: "Guachucal / Cumbal / Túquerres",
        dish: "Quesos y Lácteos",
        description: "Nariño es tierra de pastos verdes y alta producción lechera. Sus quesos campesinos, cuajadas con miel y postres lácteos son famosos por su pureza y sabor tradicional de montaña.",
        image: [
          'https://dondevamoseva.com/wp-content/uploads/2025/02/quesos-la-realeza-guachucal-narino-colombia.jpg',
          'https://turismo.narino.gov.co/wp-content/uploads/2024/02/Copia-de-DSC09933-2048x1363.jpg',
          'https://media.airedesantafe.com.ar/p/71c815c2e53a7062a3d049cc41da234e/adjuntos/268/imagenes/003/719/0003719787/1200x0/smart/como-hacer-un-bizcochuelo-leche.png'
        ]
      },
      {
        municipality: "Pasto / Genoy / Catambuco",
        dish: "Cuy Asado",
        description: "El plato bandera de Nariño. Cuy criado tradicionalmente y asado a la brasa hasta que su piel queda perfectamente crocante, servido con crispetas, papas y ají de maní.",
        image: [
          'https://comidaecuatoriana.com.es/wp-content/uploads/2020/01/cuy-asado-1080x628.jpg',
          'https://lh3.googleusercontent.com/-Q3JO040o5os/UzyEPjdJmkI/AAAAAAAAC8A/Wd7DB_B7oD4/s0/Biblian_cuy.JPG',
          'https://img.goraymi.com/2018/04/12/12eb27a62884653f15802451ac7c5347_lg.jpg'
        ]
      },
      {
        municipality: "Pasto",
        dish: "Frito Pastuso",
        description: "Trozos de carne de cerdo marinados en aliños tradicionales y fritos en su propia grasa, acompañados de mote, crispetas y papa cocida.",
        image: [
          'https://carnesdelsebastian.com/wp-content/uploads/elementor/thumbs/frito-pastuso-p7d3edk9f1l9b9r7eosa5itzd2xc9n66gurf590q6k.jpg',
          'https://elturismoencolombia.com/wp-content/uploads/2022/05/frito-pastuso-narino-colombia.jpg',
          'https://carnesdelsebastian.com/wp-content/uploads/2021/03/carnes-del-sebastian-frito-pastuso.jpg'
        ]
      },
      {
        municipality: "Pasto",
        dish: "Hervidos",
        description: "Bebida caliente emblemática de las noches pastusas, hecha a base de jugo de frutas (lulo, mora o maracuyá) y aguardiente, servida en copas humeantes.",
        image: [
          'https://seecolombia.travel/blog/wp-content/uploads/2013/01/hervidos.jpg',
          'https://rtvc-assets-radionica3.s3.amazonaws.com/s3fs-public/styles/1200x630/public/2023-09/Hervidos%20rumipamba%20-%20Pasto.jpg?itok=eR7XsQsM',
          'https://descarregacesped.com.ar/wp-content/uploads/que-son-los-hervidos-en-pasto.webp'
        ]
      },
      {
        municipality: "Ancuyá",
        dish: "Melcochas",
        description: "Dulce tradicional elaborado a base de panela, con una textura elástica y pegajosa que se estira artesanalmente hasta lograr su punto perfecto. Es el sabor más icónico de Ancuyá.",
        image: [
          'https://radionacional-v3.s3.amazonaws.com/s3fs-public/inline-images/WhatsApp%20Image%202022-04-13%20at%2012.03.54%20AM.jpeg',
          'https://tubarco.news/wp-content/uploads/2025/01/WhatsApp-Image-2022-04-13-at-12.04.00-AM.jpeg',
          'https://i.pinimg.com/originals/f8/65/75/f865752bc7325d63b5d2db42fcb2af02.jpg'
        ]
      },
      {
        municipality: "Sandoná",
        dish: "Rosquillas",
        description: "Famosas rosquillas de harina de trigo y manteca, horneadas hasta quedar crocantes. Un acompañante indispensable para el café en la mesa sandoneña.",
        image: [
          'https://www.pasteleite.com/wp-content/uploads/2020/05/rosquillas-blancas-pastusas-600x390.jpg',
          'https://s1.elespanol.com/2023/04/15/cocinillas/recetas/756434514_232439715_1706x960.jpg'
        ]
      },
      {
        municipality: "Sandoná / Ancuyá",
        dish: "Helado de Paila",
        description: "Helado artesanal elaborado en paila de bronce sobre una cama de hielo y sal, girando la mezcla hasta que cristaliza en una textura suave y natural con sabores a frutas regionales.",
        image: [
          'https://www.chefskarte.de/wp-content/uploads/2023/02/Helado-de-Paila-.jpg',
          'https://www.tastingtable.com/img/gallery/helado-de-paila-the-ecuadorian-ice-cream-you-should-know-about/l-intro-1659369877.jpg',
          'https://i.ytimg.com/vi/FgyWS-Pkm20/maxresdefault.jpg'
        ]
      }
    ];

    const nariñoAnimals: Animal[] = [
      {
        name: "Gato de Nariño (Leopardus narinensis)",
        description: "Especie de felino recientemente descrita, característica de los bosques de niebla de Nariño. Su pelaje tiene patrones únicos que lo distinguen de otros leopardos andinos.",
        image: [
          'https://www.javeriana.edu.co/pesquisa/wp-content/uploads/2023/07/portada-nueva-especie-felino-colombia.jpg',
          'https://s.yimg.com/ny/api/res/1.2/AyIdkAFn0ZdDZQUMjtD.5g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-09/7aa71550-4bdd-11ee-bfea-bd8fd9911268',
          'https://s.13.cl/sites/default/files/styles/manualcrop_850x475/public/13c/articulos/field-imagen/2023-07/GATO%20GEOFFROY.jpg.jpeg?itok=VixN_MLa'
        ]
      },
      {
        name: "Colibrí Rutilante",
        description: "Joyas aladas de los Andes. Estos colibríes destacan por sus colores metálicos y su vuelo acrobático entre las flores de los jardines y bosques nariñenses.",
        image: [
          'https://4.bp.blogspot.com/-ej19qxjn5r8/WRkZsPtZ0RI/AAAAAAAAAQY/tFE6dIHyquglYCccV4NxX-uG-aE_hSvbACLcB/s1600/colibri.jpg',
          'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/121422231/1800',
          'https://live.staticflickr.com/5301/5826492589_8f2ded6663_b.jpg'
        ]
      },
      {
        name: "Cuy (Cobayo)",
        description: "Animal emblemático de la región andina. Más allá de su importancia gastronómica, es un animal doméstico central en la vida rural de Nariño.",
        image: [
          'https://c2.staticflickr.com/8/7077/7223651910_3542e6cbd8_b.jpg',
          'https://cr00.epimg.net/radio/imagenes/2020/12/12/al_campo/1607765996_114634_1607769182_noticia_normal_recorte1.jpg',
          'https://s3.animalia.bio/animals/photos/full/1.25x1/zippy.webp'
        ]
      },
      {
        name: "Oso de Anteojos",
        description: "El guardián de los páramos. El único oso de Suramérica, símbolo de conservación, habita en las zonas altas y nubladas de la cordillera nariñense.",
        image: [
          'https://lanotapositiva.com/wp-content/uploads/2015/06/osos.jpg',
          'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjlNPQIf4UOkTWGyw5D4KQI7ZOgWktFd_DJOSxd69GBCr9obpemcteegjIbHusuufvvYyZ_nuvpytFoyJzjYBS8xQewOeELrNzyVMhiiQKgSA0Pwr6AkbvJkctC609xKjD5eixJjB1DswZ7M41nu6z2fcRyexa1qc_ll6IL8sWklYlrdx9wJLcX_NVfWe8r/s900/Oso%20de%20Anteojos.jpg',
          'https://wwflac.awsassets.panda.org/img/original/oso_de_anteojos.png'
        ]
      },
      {
        name: "Gorrión",
        description: "Pequeño y vivaz, el gorrión es un compañero constante en los parques y campos de Nariño, animando el día con su canto característico.",
        image: [
          'https://i0.wp.com/farallonesdelcitara.bioexploradores.com/wp-content/uploads/2023/02/Portada-Zonotrichia-capensis-Rufous-collared-Sparrow-Pinche-Gorrion-Afrechero.jpg?resize=1200%2C628&ssl=1',
          'https://cdn.pixabay.com/photo/2023/05/20/05/20/bird-8005901_1280.jpg'
        ]
      },
      {
        name: "Trucha Arcoíris",
        description: "Habitante de las aguas gélidas de la Laguna de la Cocha y los ríos de montaña. Su colorido y dinamismo la hacen resaltar en los ecosistemas acuáticos.",
        image: [
          'http://www.pescacosmar.com/blog/wp-content/uploads/2016/06/trucha_arcoiris-2.jpg',
          'https://www.bigfish.mx/__export/1750014435703/sites/debate/img/2025/06/15/trucha_arcoiris.jpg_673822677.jpg',
          'https://i.ytimg.com/vi/14bm0GfefPc/maxresdefault.jpg'
        ]
      },
      {
        name: "Terlaque",
        description: "Ave representativa de los bosques andinos, de colores sobrios y porte elegante, es una de las joyas de la biodiversidad que se puede observar en Nariño.",
        image: [
          'https://i.pinimg.com/originals/90/83/c6/9083c61afd6d83c9c8376ffeffdb7f4c.jpg',
          'https://vivirenelpoblado.com/wp-content/uploads/2022/08/Terlaque-de-Narino-Autor-Carlos-Ivan-Restrepo-768x576.jpg'
        ]
      }
    ];

    const nariñoFlora: Flora[] = [
      {
        name: "Frailejón",
        description: "Componente místico de los páramos andinos. Sus hojas afelpadas capturan la humedad de la niebla, regulando el ciclo del agua que nutre a toda la región.",
        image: [
          'https://s3.amazonaws.com/rtvc-assets-misenal.tv/ms-public/inline-images/HOLI%20%286%29.jpg',
          'https://www.uniminutoradio.com.co/wp-content/uploads/2019/01/Frailejon-tomada-de-www.corpochivor.gov_.co_.jpg',
          'https://qhubobucaramanga.com/wp-content/uploads/2022/11/v60810029_7665077_20221115102547.jpg'
        ]
      },
      {
        name: "Bailarina",
        description: "Flor de formas caprichosas y elegantes que parecen danzar con la brisa de los bosques nariñenses. Su colorido es un regalo visual en los senderos naturales.",
        image: [
          'https://i.ytimg.com/vi/7ctwF61ZdcQ/maxresdefault.jpg',
          'https://i.pinimg.com/736x/35/0e/49/350e49eae8053bb60500f743f503da6a--flowers-plants.jpg',
          'https://i.pinimg.com/736x/d2/fe/4f/d2fe4f938ecefe7e2173b953d36c6737.jpg'
        ]
      },
      {
        name: "Siete Cueros (Tibouchina sp)",
        description: "Árbol ornamental de flores moradas vibrantes. Su nombre proviene de la característica corteza que se desprende en láminas, revelando su fuerza y belleza.",
        image: [
          'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6c8Kv0iOMTh-9OKcLaVIFeRSuRdIZjz8Src_PiNbOdA6bfWZ9329mSJW4aqwk3Lro_fvS0FGzKjfRxygkH4NacqCIMn7uJZ2wH6QPf_D4fkDRvGbnbHqPnMSVaqqCqeEYm6Lvv5odV7g/s1600/Tibouchina_sp.jpg',
          'https://live.staticflickr.com/2846/9976451753_d0d84445e3_z.jpg',
          'https://3.bp.blogspot.com/-Itr1bEkOXrU/Uad8p4VNxVI/AAAAAAAAAFU/yAf6h38jyLg/s1600/TIBOUCHINA+URVILLEANA+O+SIETE+CUEROS+3.JPG'
        ]
      },
      {
        name: "Chaquilulo",
        description: "Arbusto de bayas comestibles y medicinales, común en los campos de Nariño. Parte esencial de la botánica popular y la biodiversidad local.",
        image: [
          'https://1.bp.blogspot.com/-UopybgeBJ1o/XR6MtFuEjcI/AAAAAAAAAOk/IiV0KOoAqrIZ3qYXSRjIZYkJ61u0iE-4wCLcBGAs/s1600/chaquilulo.jpg',
          'https://live.staticflickr.com/7364/9703760750_1a38d29bf8_z.jpg'
        ]
      },
      {
        name: "Mortiño",
        description: "El fruto silvestre de los páramos. Sus pequeñas bayas oscuras son el ingrediente secreto de mermeladas y dulces tradicionales de la cordillera.",
        image: [
          'https://secretosparacontar.org/wp-content/uploads/2025/07/Mortino.webp',
          'https://willkaurku.com/wp-content/uploads/2025/10/facebook-octubre-willka-urku-14_11zon.webp'
        ]
      },
      {
        name: "Arrayán",
        description: "Árbol de madera noble y follaje siempre verde. Sus flores blancas y delicadas perfuman los bosques andinos, simbolizando la pureza del territorio.",
        image: [
          'https://www.jardineriaon.com/wp-content/uploads/2018/07/Luma_apiculata-1024x743.jpg',
          'https://mujermexico.com/wp-content/uploads/2022/05/arrayan-flor.jpg',
          'https://mujermexico.com/wp-content/uploads/2022/05/arrayan-que-es.jpg'
        ]
      }
    ];

    const fetchFoods = async () => {
      setAnimals(nariñoAnimals);
      setFlora(nariñoFlora);
      try {
        // More robust URL for exported CSV
        const robustUrl = foodsCsvUrl.includes('export?format=csv') 
          ? foodsCsvUrl 
          : 'https://docs.google.com/spreadsheets/d/1GjjZkzRDn6RqJd30hqWYDChnLt54qH29ynJGwViUuRc/gviz/tq?tqx=out:csv';
          
        const response = await fetch(robustUrl);
        if (!response.ok) {
          throw new Error(`Error de red (Comidas): ${response.status} ${response.statusText}`);
        }
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as any[];
            const parsedFoods = data
              .filter((row: any) => (row.municipio || row.municipality) && (row.comida || row.dish || row.plato))
              .map((row: any) => ({
                municipality: row.municipio || row.municipality || '',
                dish: row.comida || row.dish || row.plato || row.Typical_Food || '',
                description: row.descripcion || row.description || row.info || row.detalles || '',
                image: row.imagen || row.image || row.foto || ''
              })) as TypicalFood[];
            
            // Filter out priority foods if they exist in the CSV to avoid duplicates
            const filteredParsed = parsedFoods.filter(f => 
              !priorityFoods.some(pf => pf.dish.toLowerCase() === f.dish.toLowerCase() && pf.municipality.toLowerCase() === f.municipality.toLowerCase())
            );

            setTypicalFoods([...priorityFoods, ...filteredParsed]);
          },
          error: (error: any) => {
            console.info("Gastronomía Nariñense: Cargados platos típicos predefinidos de respaldo.");
            setTypicalFoods(priorityFoods); // At least show priority if CSV fails
          }
        });
      } catch (err) {
        console.info("Gastronomía Nariñense: Cargados platos típicos predefinidos de respaldo.");
        setTypicalFoods(priorityFoods);
      }
    };

    fetchFoods();
  }, []);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryItem | null>(null);
  const [knowMoreSection, setKnowMoreSection] = useState<'menu' | 'foods' | 'animals' | 'flora'>('menu');
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      municipalityName: 'Ancuyá',
      rating: 5,
      userName: 'Carlos Pastuso',
      comment: '¡Las melcochas más ricas de Nariño! El santuario es impresionante y el clima es perfecto.',
      date: '10 abr 2024'
    },
    {
      id: '2',
      municipalityName: 'Ipiales',
      rating: 5,
      userName: 'Elena Viajera',
      comment: 'Las Lajas es sin duda el lugar más hermoso que he visitado en Colombia.',
      date: '5 abr 2024'
    },
    {
      id: '3',
      municipalityName: 'Sandoná',
      rating: 4,
      userName: 'Mario Gourmet',
      comment: 'Las rosquillas son de otro mundo. La iglesia de piedra es una joya arquitectónica.',
      date: '2 abr 2024'
    }
  ]);
  const [reviewForm, setReviewForm] = useState({ municipality: '', rating: 0, name: '', comment: '' });
  const [reminders, setReminders] = useState<TravelReminder[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [calDate, setCalDate] = useState(new Date(2025, 0, 1)); // Start at Jan 2025 for full cycle

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const parseFestivalDays = (dateStr: string, targetMonthIndex: number) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const targetMonth = months[targetMonthIndex];
    const lower = dateStr.toLowerCase();
    
    if (!lower.includes(targetMonth)) return [];

    const numbers = lower.match(/\d+/g);
    if (!numbers) return [];

    if (lower.includes('-') && numbers.length >= 2) {
      const start = parseInt(numbers[0]);
      const end = parseInt(numbers[1]);
      const days = [];
      for (let i = start; i <= (end || start); i++) {
        if (i > 0 && i <= 31) days.push(i);
      }
      return days;
    }

    return numbers.map(n => parseInt(n)).filter(n => n > 0 && n <= 31);
  };

  const addReminder = (municipalityName: string, eventName: string, eventDate: string) => {
    const id = Date.now().toString();
    setReminders(prev => [...prev, {
      id,
      municipalityName,
      eventName,
      eventDate,
      reminderDaysBefore: 3
    }]);
    setShowNotification(`¡Recordatorio guardado! Te avisaremos antes del inicio en ${municipalityName}.`);
    setTimeout(() => setShowNotification(null), 4000);
    playCultureSound('magia');
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const topDestinations = useMemo(() => {
    const totals: Record<string, { sum: number, count: number }> = {};
    reviews.forEach(review => {
      if (!totals[review.municipalityName]) {
        totals[review.municipalityName] = { sum: 0, count: 0 };
      }
      totals[review.municipalityName].sum += review.rating;
      totals[review.municipalityName].count += 1;
    });

    return Object.entries(totals)
      .map(([name, data]) => ({
        name,
        average: data.sum / data.count,
        count: data.count
      }))
      .sort((a, b) => b.average - a.average || b.count - a.count)
      .slice(0, 10);
  }, [reviews]);

  const submitReview = () => {
    if (!reviewForm.municipality || !reviewForm.rating || !reviewForm.comment || !reviewForm.name) return;
    
    const newReview = {
      id: Date.now().toString(),
      municipalityName: reviewForm.municipality,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      userName: reviewForm.name,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setReviews([newReview, ...reviews]);
    setReviewForm({ municipality: '', rating: 0, name: '', comment: '' });
    
    // Play a happy sound
    playCultureSound('magia');
  };

  // Sound effects for Nariño culture
  const nariñoSounds = [
    'https://actions.google.com/sounds/v1/ambiences/mountain_lake.ogg', // Nature
    'https://actions.google.com/sounds/v1/foley/wind_chime_single.ogg', // Magic
    'https://actions.google.com/sounds/v1/crowds/outdoor_festival_ambience.ogg', // Festival
    'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg' // Rain/Nature
  ];

  const playCultureSound = (type?: string) => {
    let soundUrl = nariñoSounds[Math.floor(Math.random() * nariñoSounds.length)];
    
    // Try to match sound to category if possible
    if (type === 'naturaleza') soundUrl = nariñoSounds[0];
    if (type === 'magia') soundUrl = nariñoSounds[1];
    if (type === 'tradicion') soundUrl = nariñoSounds[2];
    
    const audio = new Audio(soundUrl);
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Audio play blocked by browser", e));
  };
  
  // Map states
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([1.2136, -77.2811]); // Pasto
  const [mapZoom, setMapZoom] = useState(9);
  const [locationSearch, setLocationSearch] = useState('');
  const [nearbyFestivals, setNearbyFestivals] = useState<Municipality[]>([]);
  const [startingPoint, setStartingPoint] = useState<{name: string, lat: number, lng: number} | null>(null);
  const [homeLocationInput, setHomeLocationInput] = useState('');
  const [showNearbyList, setShowNearbyList] = useState(false);

  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  };

  const filteredMunicipalities = useMemo(() => {
    let list = [...municipalities];
    
    // Sort by distance if starting point exists
    if (startingPoint) {
      list.sort((a, b) => {
        const distA = getDistance(startingPoint.lat, startingPoint.lng, a.lat, a.lng);
        const distB = getDistance(startingPoint.lat, startingPoint.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    if (searchQuery) {
      const query = normalizeText(searchQuery);
      list = list.filter(m => 
        normalizeText(m.name).includes(query) || 
        normalizeText(m.festival).includes(query)
      );
    } else if (selectedProvince) {
      list = list.filter(m => m.province === selectedProvince);
    }
    
    return list;
  }, [searchQuery, selectedProvince, startingPoint, municipalities]);

  const handleBack = () => {
    if (view === 'know-more' && knowMoreSection !== 'menu') {
      setKnowMoreSection('menu');
      return;
    }
    
    if (selectedProvince || view === 'pasto-events' || view === 'know-more' || view === 'transport' || view === 'shop') {
      setSelectedProvince(null);
      setView('home');
    } else if (showNearbyList) {
      setShowNearbyList(false);
    } else {
      setView('home');
    }
    setSearchQuery('');
  };

  const openInGoogleMaps = (municipality: string, from?: [number, number] | null) => {
    let url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(municipality + ', Nariño, Colombia')}`;
    if (from) {
      url = `https://www.google.com/maps/dir/?api=1&origin=${from[0]},${from[1]}&destination=${encodeURIComponent(municipality + ', Nariño, Colombia')}&travelmode=driving`;
    }
    window.open(url, '_blank');
  };

  const openProvinceRoute = (province: string) => {
    const provinceMunicipalities = municipalities.filter(m => m.province === province);
    const destinations = provinceMunicipalities.slice(0, 5).map(m => m.name + ', Nariño').join('/');
    const url = `https://www.google.com/maps/dir/${destinations}`;
    window.open(url, '_blank');
  };

  const [isLocating, setIsLocating] = useState(false);

  const getUserLocation = (isHome: any = false) => {
    // Ensure isHome is a boolean even if an event is passed
    const isHomeView = isHome === true;
    
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización o está desactivada.");
      return;
    }

    setIsLocating(true);
    
    // Options for geolocation
    const options = {
      enableHighAccuracy: true,
      timeout: 15000, // Increase timeout to 15 seconds
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Ubicación obtenida:", latitude, longitude);
        
        setUserLocation([latitude, longitude]);
        setMapCenter([latitude, longitude]);
        setMapZoom(11);
        findNearby(latitude, longitude);
        
        if (isHomeView) {
          setStartingPoint({ name: 'Mi ubicación actual', lat: latitude, lng: longitude });
          setSearchQuery('');
          setSelectedProvince(null);
          setShowNearbyList(true);
        }
        
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        console.error("Error de geolocalización:", error);
        
        let errorMessage = "No pudimos obtener tu ubicación.";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permiso denegado. Por favor, permite el acceso a la ubicación en tu navegador.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "La información de ubicación no está disponible.";
            break;
          case error.TIMEOUT:
            errorMessage = "Se agotó el tiempo de espera para obtener la ubicación.";
            break;
        }
        alert(errorMessage);
      },
      options
    );
  };

  const handleHomeLocationSearch = (name: string) => {
    if (!name.trim()) return;
    
    const query = normalizeText(name);
    
    // Try to find a municipality that matches the name
    const muni = municipalities.find(m => {
      const mName = normalizeText(m.name);
      return mName === query || mName.includes(query) || query.includes(mName);
    });

    if (muni) {
      // If we found a municipality, set it as starting point and show nearby
      setStartingPoint({ name: muni.name, lat: muni.lat, lng: muni.lng });
      findNearby(muni.lat, muni.lng);
      setHomeLocationInput('');
      setSearchQuery(''); // Clear search query to show all sorted by proximity
      setShowNearbyList(true);
    } else {
      // If no municipality found, just use it as a text search query
      setSearchQuery(name);
      setShowNearbyList(true);
    }
  };

  const findNearby = (lat: number, lng: number) => {
    const sorted = [...municipalities].sort((a, b) => {
      const distA = getDistance(lat, lng, a.lat, a.lng);
      const distB = getDistance(lat, lng, b.lat, b.lng);
      return distA - distB;
    });
    setNearbyFestivals(sorted.slice(0, 5));
  };

  // Logic to find festivals happening "this week" (simulated for March 7, 2026)
  const festivalsThisWeek = useMemo(() => {
    // Current simulated date: March 7
    // We look for festivals in "marzo" or that mention "marzo-abril"
    return municipalities.filter(m => {
      const date = m.date.toLowerCase();
      return date.includes('marzo') || (date.includes('7') && date.includes('marzo'));
    });
  }, [municipalities]);

  const [showOnlyWeekly, setShowOnlyWeekly] = useState(false);

  const mapMarkers = useMemo(() => {
    if (showOnlyWeekly) return festivalsThisWeek;
    return municipalities;
  }, [showOnlyWeekly, festivalsThisWeek, municipalities]);

  const handleLocationSearch = (name: string) => {
    if (!name.trim()) return;
    const muni = municipalities.find(m => 
      m.name.toLowerCase().includes(name.toLowerCase()) || 
      name.toLowerCase().includes(m.name.toLowerCase())
    );
    if (muni) {
      setMapCenter([muni.lat, muni.lng]);
      setMapZoom(12);
      findNearby(muni.lat, muni.lng);
      setLocationSearch(muni.name);
    } else {
      alert("Municipio no encontrado en el mapa.");
    }
  };

  // Group festivals by month for the calendar
  const festivalsByMonth = useMemo(() => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const grouped: Record<string, Municipality[]> = {};
    months.forEach(m => grouped[m] = []);

    municipalities.forEach(m => {
      const dateLower = m.date.toLowerCase();
      months.forEach(month => {
        if (dateLower.includes(month)) {
          grouped[month].push(m);
        }
      });
    });

    return grouped;
  }, [municipalities]);

  return (
    <div className="min-h-screen font-sans text-slate-900 pb-24 indigenous-pattern">
      {/* Video Header */}
      <div className="relative h-64 w-full overflow-hidden bg-amber-950 flex items-center justify-center">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto aspect-video z-0 pointer-events-none scale-110"
          src="https://www.youtube.com/embed/OeWA2bLyNn4?autoplay=1&mute=1&loop=1&playlist=OeWA2bLyNn4&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3"
          title="Cultura Nariñense Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-10" />
        
        {/* Sol de los Pastos Overlay */}
        <div className="absolute top-4 right-4 w-12 h-12 opacity-90 z-20 hover:scale-110 transition-transform duration-300">
          <img src={solDeLosPastos} className="w-full h-full object-contain" alt="Sol de los Pastos" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Header */}
      <header className="earthy-gradient text-white shadow-2xl sticky top-0 z-30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.svgrepo.com/show/381534/star-8.svg')] bg-[length:400px_400px] bg-center opacity-5 pointer-events-none" />
        <div className="max-w-md mx-auto px-6 py-8 flex flex-col items-center relative">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-amber-400/30 rounded-full scale-150"
              />
              <img src={wairaLogo} className="w-16 h-16 object-contain relative z-10" alt="Waira Logo" referrerPolicy="no-referrer" />
            </div>
            <h1 className="text-5xl font-logo font-medium text-center leading-none text-amber-400 tracking-tight select-none">
              Wayra
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-px w-8 bg-amber-400/30" />
              <p className="text-amber-200/80 text-[10px] font-accent font-bold uppercase tracking-[0.5em]">Sabiduría Ancestral</p>
              <div className="h-px w-8 bg-amber-400/30" />
            </div>
          </motion.div>

        </div>
      </header>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-8 left-4 right-4 z-[100] sm:left-auto sm:right-8 sm:max-w-xs"
          >
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-900/20">
                <Bell size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-500 mb-1">Cultura Nariñense</p>
                <p className="text-xs font-medium leading-relaxed">{showNotification}</p>
              </div>
              <button onClick={() => setShowNotification(null)} className="opacity-40 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto px-6 mt-6 relative z-20 pb-12">
        {/* PWA Install Banner */}
        <AnimatePresence>
          {showInstallBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-5 rounded-[2rem] shadow-xl border border-amber-800/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 shrink-0 border border-amber-500/20">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-logo font-black uppercase text-xs tracking-wider text-amber-400">Instala Wayra</h3>
                    <p className="text-[10px] text-amber-100/70 font-sans mt-0.5 leading-relaxed">
                      Accede más rápido, ahorra datos y disfruta de una experiencia nativa sin barras de navegación.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={handleInstallApp}
                      className="px-4 py-2 bg-amber-500 text-amber-950 font-sans font-black uppercase tracking-wider text-[9px] rounded-xl hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
                    >
                      Instalar
                    </button>
                    <button
                      onClick={() => setShowInstallBanner(false)}
                      className="text-[9px] font-sans font-black uppercase tracking-wider text-amber-200/50 hover:text-amber-200 cursor-pointer text-center py-1"
                    >
                      Luego
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar (Only in home view) */}
        {view === 'home' && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded-[24px] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-amber-900/40" />
                  </div>
                  <input
                    type="text"
                    placeholder="Encuentra tu próximo destino..."
                    className="block w-full pl-12 pr-10 py-5 bg-white rounded-2xl shadow-xl border border-amber-900/5 focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all outline-none font-medium placeholder:text-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleHomeLocationSearch(searchQuery);
                      }
                    }}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <X size={18} className="text-slate-300 hover:text-slate-500" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => handleHomeLocationSearch(searchQuery)}
                  className="px-6 bg-amber-950 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-amber-900 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Ir
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {view === 'pasto-events' ? (
            <motion.div
              key="pasto-events"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={handleBack}
                  className="group flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                    <ChevronLeft size={18} />
                  </div>
                  <span className="text-[10px] font-accent font-bold uppercase tracking-widest">Volver</span>
                </button>
                <h2 className="text-[10px] font-accent font-bold text-slate-300 uppercase tracking-[0.2em]">Agenda Pasto</h2>
              </div>

              <div className="space-y-12">
                {PASTO_EVENTS.map((event) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl border border-white/20 mb-6">
                      <img 
                        src={event.image} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        alt={event.name}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarIcon size={12} className="text-amber-500" />
                          <span className="text-[10px] font-accent font-bold text-amber-200 uppercase tracking-[0.3em]">{event.date}</span>
                        </div>
                        <h3 className="text-3xl font-display italic text-white leading-tight uppercase tracking-tight">{event.name}</h3>
                      </div>
                    </div>
                    
                    <div className="px-4 space-y-8">
                      <p className="text-slate-600 text-base leading-relaxed font-medium first-letter:text-4xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-amber-900/40">
                        {event.description}
                      </p>

                      {event.gallery && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <h4 className="text-[11px] font-accent font-bold text-slate-800 uppercase tracking-widest whitespace-nowrap">Registro Visual</h4>
                            <div className="h-px w-full bg-slate-100" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {event.gallery.map((img, idx) => (
                              <motion.div 
                                key={`${event.id}-gallery-${idx}`} 
                                whileHover={{ scale: 1.02 }}
                                className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-xl"
                              >
                                <img 
                                  src={img} 
                                  className="w-full h-full object-cover" 
                                  alt={`${event.name} gallery ${idx}`}
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="py-20 text-center">
                <div className="w-16 h-px bg-slate-200 mx-auto mb-6" />
                <p className="text-[10px] font-accent font-bold text-slate-300 uppercase tracking-[0.4em]">Fin del recorrido</p>
              </div>
            </motion.div>
          ) : view === 'home' ? (
            !selectedProvince && !searchQuery && !showNearbyList ? (
              /* Province Selection View */
              <motion.div
                key="provinces"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 mt-12"
              >
                {/* Home Stats / Quick Access */}
                {reminders.length > 0 && (
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setView('reminders')}
                    className="w-full p-6 rounded-[40px] bg-white border border-amber-500/20 shadow-xl flex items-center justify-between group overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-125 transition-transform" />
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-lg animate-bounce">
                        <Bell size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg font-display italic text-slate-800 leading-tight">Tienes {reminders.length} {reminders.length === 1 ? 'viaje programado' : 'viajes programados'}</h4>
                        <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mt-1">¡No te pierdas las fiestas de Nariño!</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-amber-600 transition-colors" />
                  </motion.button>
                )}

                {/* Where am I? Section (Radar) */}
                <div className="bg-white p-10 rounded-[48px] shadow-[0_30px_70px_rgba(0,0,0,0.08)] border border-amber-900/5 space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/30 blur-[100px] rounded-full -mr-24 -mt-24" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-600/60">Servicio de Radar</span>
                      </div>
                      <h2 className="text-2xl font-display italic text-slate-800 flex items-center gap-3">
                        Tu <span className="font-black not-italic text-amber-700">Ubicación</span>
                      </h2>
                    </div>
                    {startingPoint && (
                      <button 
                        onClick={() => setStartingPoint(null)}
                        className="px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-amber-50 hover:text-amber-700 transition-all border border-slate-100"
                      >
                        Cambiar
                      </button>
                    )}
                  </div>
                  
                  {!startingPoint ? (
                    <div className="space-y-8 relative z-10">
                      <div className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100/50">
                        <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"Encuentra las rutas más cortas y las festividades que están por comenzar cerca de ti."</p>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-600 transition-colors">
                            <MapPin size={18} />
                          </div>
                          <input
                            type="text"
                            placeholder="¿Dónde te encuentras ahora?"
                            className="block w-full pl-14 pr-4 py-5 bg-white border-2 border-slate-100 rounded-3xl text-base focus:ring-8 focus:ring-amber-500/5 focus:border-amber-500 outline-none transition-all placeholder:text-slate-300 font-medium shadow-sm"
                            value={homeLocationInput}
                            onChange={(e) => setHomeLocationInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleHomeLocationSearch(homeLocationInput)}
                          />
                        </div>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => handleHomeLocationSearch(homeLocationInput)}
                            className="flex-1 py-5 bg-amber-700 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-900/20 hover:bg-amber-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            Calcular Rutas
                          </button>
                          <button 
                            onClick={() => getUserLocation(true)}
                            className="w-16 h-[60px] bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-slate-900/20 hover:bg-black transition-all active:scale-95"
                            title="Usar GPS"
                          >
                            <Navigation size={20} className="animate-pulse" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8 relative z-10">
                      <div className="flex items-center gap-5 bg-gradient-to-br from-amber-50 to-white p-6 rounded-[36px] border border-amber-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 blur-2xl rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                        <div className="bg-amber-700 w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-amber-900/30 group-hover:rotate-6 transition-transform">
                          <Locate size={28} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest block mb-1">Base de Operaciones</span>
                          <p className="font-display italic text-2xl text-slate-800 truncate">{startingPoint.name}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Pueblos Cercanos</h3>
                          <div className="h-px flex-1 mx-4 bg-slate-100" />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {nearbyFestivals.slice(0, 3).map((m, idx) => (
                            <motion.div 
                              key={`home-nearby-${m.name}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ x: 8 }}
                              onClick={() => setSelectedMunicipality(m)}
                              className="flex items-center justify-between p-5 bg-white rounded-[28px] border border-slate-100 cursor-pointer shadow-sm hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 transition-all group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 font-black text-xs group-hover:bg-amber-600 group-hover:text-white transition-all">
                                  {idx + 1}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-slate-800 text-base group-hover:text-amber-900 transition-colors">{m.name}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50/80 text-amber-700 rounded-full">
                                      <Navigation size={8} />
                                      <span className="text-[9px] font-black uppercase tracking-widest">
                                        {getDistance(startingPoint.lat, startingPoint.lng, m.lat, m.lng).toFixed(1)} km
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium truncate italic">{m.province}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-200 group-hover:text-amber-600 group-hover:bg-white transition-all border border-transparent group-hover:border-amber-100">
                                <ArrowRight size={20} />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <button 
                            onClick={() => setView('map')}
                            className="py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all flex items-center justify-center gap-2"
                          >
                            <MapIcon size={14} />
                            Ver Mapa
                          </button>
                          <button 
                            onClick={() => setShowNearbyList(true)}
                            className="py-4 bg-white text-slate-800 border-2 border-slate-100 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-amber-50 hover:border-amber-200 transition-all flex items-center justify-center gap-2"
                          >
                            <List size={14} />
                            Ver Todos
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-8 pt-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-px bg-amber-200" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600/60">Recorre Nuestro Mapa</span>
                    </div>
                    <h2 className="text-3xl font-display italic text-slate-800">
                      Nuestras <span className="font-black not-italic text-amber-900">Provincias</span>
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                  {PROVINCES.map((province, index) => (
                    <motion.button
                      key={province}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProvince(province)}
                      className="group relative h-32 w-full rounded-[40px] overflow-hidden shadow-xl border border-slate-100 bg-white"
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-1/3 h-full bg-slate-50 group-hover:bg-amber-50 transition-colors duration-500 flex items-center justify-center">
                          <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-all duration-500 ${
                            index === 0 ? 'bg-amber-100 text-amber-700' : 
                            index === 1 ? 'bg-amber-200 text-amber-800' : 
                            index === 2 ? 'bg-amber-50 text-amber-600' : 
                            index === 3 ? 'bg-slate-100 text-slate-700' : 
                            'bg-amber-100 text-amber-900'
                          }`}>
                            <Compass size={32} />
                          </div>
                        </div>
                        <div className="flex-1 p-8 flex items-center justify-between">
                          <div className="text-left">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 block mb-1">Zona Territorial</span>
                            <h3 className="text-2xl font-display italic text-slate-800 group-hover:text-amber-900 transition-colors">
                              {province.replace('Provincia ', '')}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                              <span className="w-1 h-1 rounded-full bg-amber-500" />
                              <span className="text-[8px] font-black uppercase tracking-widest text-amber-600">Explorar municipios</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-200 group-hover:border-amber-200 group-hover:text-amber-600 group-hover:bg-amber-50 transition-all">
                            <ArrowRight size={24} />
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Element */}
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-100/10 blur-2xl rounded-full group-hover:bg-amber-500/10 transition-all duration-700" />
                    </motion.button>
                  ))}
                  </div>
                </div>


                {/* Top Rated Destinos (Mini Ranking) */}
                {topDestinations.length > 0 && (
                  <div className="space-y-4 pt-12">
                    <div className="flex items-center justify-between px-2">
                       <h3 className="text-[10px] font-accent font-bold uppercase tracking-[0.3em] text-slate-300 flex items-center gap-2">
                        <Sparkles size={12} className="text-amber-500" />
                        Nuestros Favoritos
                       </h3>
                       <button 
                        onClick={() => setView('experience')}
                        className="text-[9px] font-black text-amber-700 uppercase tracking-widest hover:underline"
                       >
                        Ver Ranking
                       </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-2">
                      {topDestinations.slice(0, 5).map((dest, idx) => (
                        <motion.div 
                          key={`mini-rank-${dest.name}`}
                          whileHover={{ y: -5 }}
                          onClick={() => {
                            const mun = municipalities.find(m => m.name === dest.name);
                            if (mun) setSelectedMunicipality(mun);
                          }}
                          className="shrink-0 w-48 p-5 rounded-[32px] bg-white border border-slate-50 shadow-xl relative overflow-hidden cursor-pointer group"
                        >
                          <div className={`absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shadow-inner transition-colors ${
                            idx === 0 ? 'bg-amber-400 text-amber-950' : 
                            idx === 1 ? 'bg-slate-200 text-slate-800' : 
                            idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-400'
                          }`}>
                            #{idx + 1}
                          </div>
                          <div className="mt-2">
                            <h4 className="font-display italic text-lg text-slate-800 leading-tight truncate pr-8 group-hover:text-amber-700 transition-colors">{dest.name}</h4>
                            <div className="flex items-center gap-1 mt-2">
                              <Sparkles size={12} className="text-amber-500 fill-amber-500/10" />
                              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{dest.average.toFixed(1)} Puntos</span>
                            </div>
                            <p className="text-[8px] text-slate-300 font-bold uppercase mt-1">{dest.count} Reseñas</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-6 pt-12">
                   <div className="flex items-center gap-3">
                    <h2 className="text-xl font-display italic text-slate-800 whitespace-nowrap">
                      Sello <span className="font-black not-italic text-amber-600">Ancestral</span>
                    </h2>
                    <div className="h-px w-full bg-slate-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {GALLERY_CATEGORIES.map((cat) => {
                      const firstImg = galleryImages.find(img => img.category === cat.id);
                      return (
                        <motion.div 
                          key={cat.id} 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedGalleryCategory(cat.id)}
                          className="relative aspect-square rounded-[36px] overflow-hidden shadow-2xl group cursor-pointer border border-white/20"
                        >
                          <img 
                            src={firstImg?.url} 
                            alt={cat.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                            <div className="flex items-center gap-2 mb-1">
                              {cat.id === 'curiosidades' && <Sparkles size={12} className="text-amber-400" />}
                              {cat.id === 'palabras' && <Languages size={12} className="text-amber-500" />}
                              <span className="text-white text-[10px] font-accent font-black uppercase tracking-[0.2em]">{cat.title}</span>
                            </div>
                            <span className="text-white/50 text-[8px] font-bold uppercase tracking-widest pl-5">
                              {galleryImages.filter(img => img.category === cat.id).length} Escenas
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Know More Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setView('know-more');
                        setKnowMoreSection('menu');
                      }}
                      className="w-full p-8 rounded-[40px] bg-amber-950 text-white flex items-center justify-between shadow-2xl group border-2 border-amber-900/10"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[24px] bg-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                          <Info size={32} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-2xl font-display italic leading-tight">
                            Conoce más <span className="font-black not-italic text-amber-400">de Nariño</span>
                          </h3>
                          <p className="text-[10px] font-accent font-bold uppercase tracking-[0.3em] text-white/50">Explora lo inexplorado</p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-amber-950 transition-all">
                        <ArrowRight size={20} />
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* Municipality List View */
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-medium"
                  >
                    <ChevronLeft size={20} />
                    Volver
                  </button>
                  <div className="flex items-center gap-2">
                    {selectedProvince && (
                      <button 
                        onClick={() => openProvinceRoute(selectedProvince)}
                        className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-amber-200 transition-colors"
                      >
                        <MapIcon size={14} />
                        Ruta Mapa
                      </button>
                    )}
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {searchQuery ? 'Resultados' : showNearbyList ? 'Fiestas Cercanas' : selectedProvince?.replace('Provincia ', '')}
                    </span>
                  </div>
                </div>

                {startingPoint && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                    <div className="bg-amber-600 p-1.5 rounded-lg text-white">
                      <MapPin size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-amber-900/60 font-bold uppercase tracking-wider">Cerca de:</p>
                      <p className="text-sm font-bold text-amber-900">{startingPoint.name}</p>
                    </div>
                    <button 
                      onClick={() => setStartingPoint(null)}
                      className="text-amber-400 hover:text-amber-600 p-1"
                      title="Quitar ubicación"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {filteredMunicipalities.length > 0 ? (
                  <div className="space-y-6">
                    {filteredMunicipalities.map((m) => (
                      <motion.div
                        layoutId={m.name}
                        key={m.name}
                        onClick={() => setSelectedMunicipality(m)}
                        className="premium-card p-8 rounded-[40px] cursor-pointer group"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="min-w-0 pr-4">
                            <h3 className="text-2xl font-display italic text-slate-800 leading-tight mb-1 group-hover:text-amber-800 transition-colors">{m.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-accent font-bold text-slate-400 uppercase tracking-widest">{m.province}</span>
                              {startingPoint && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">
                                  <div className="w-1 h-1 rounded-full bg-amber-500" />
                                  <span className="text-[8px] font-black uppercase tracking-widest">
                                    {getDistance(startingPoint.lat, startingPoint.lng, m.lat, m.lng).toFixed(1)} km
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                            <Music size={20} />
                          </div>
                        </div>

                        {m.description && (
                          <div className="mb-8 overflow-hidden">
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed italic border-l border-amber-200 pl-4">
                              {m.description}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                              <PartyPopper size={14} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[8px] font-accent font-bold text-slate-300 uppercase tracking-widest block">Evento</span>
                              <span className="text-[10px] font-bold text-slate-700 truncate block leading-tight">{m.festival}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                              <CalendarIcon size={14} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[8px] font-accent font-bold text-slate-300 uppercase tracking-widest block">Fecha</span>
                              <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block leading-tight">{m.date}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium">No se encontraron municipios</p>
                  </div>
                )}
              </motion.div>
            )
          ) : view === 'know-more' ? (
            /* Know More View */
            <motion.div
              key="know-more"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 pb-32"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleBack}
                  className="group flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                    <ChevronLeft size={18} />
                  </div>
                  <span className="text-[10px] font-accent font-bold uppercase tracking-widest">Volver</span>
                </button>
                <h2 className="text-[10px] font-accent font-bold text-slate-300 uppercase tracking-[0.2em]">Más Nariño</h2>
              </div>

              {knowMoreSection === 'menu' ? (
                <div className="space-y-12">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-display italic text-slate-800 leading-tight">
                      Descubre la <span className="font-black not-italic text-amber-700">Riqueza</span> Regional
                    </h2>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto">
                      Sumérgete en los sabores y saberes que hacen de Nariño un territorio único en el mundo.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setKnowMoreSection('foods')}
                      className="p-8 rounded-[40px] bg-white border border-amber-900/5 shadow-xl flex items-center gap-8 text-left group"
                    >
                      <div className="w-20 h-20 rounded-[32px] bg-amber-50 flex items-center justify-center text-amber-900 shadow-inner group-hover:bg-amber-900 group-hover:text-white transition-all duration-500">
                        <UtensilsCrossed size={36} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display italic text-slate-800 group-hover:text-amber-900 transition-colors">Comidas Típicas</h3>
                        <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-slate-400">Sabores de cada municipio</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setKnowMoreSection('animals')}
                      className="p-8 rounded-[40px] bg-white border border-amber-900/5 shadow-xl flex items-center gap-8 text-left group"
                    >
                      <div className="w-20 h-20 rounded-[32px] bg-amber-50 flex items-center justify-center text-amber-900 shadow-inner group-hover:bg-amber-900 group-hover:text-white transition-all duration-500">
                        <Leaf size={36} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display italic text-slate-800 group-hover:text-amber-900 transition-colors">Animales</h3>
                        <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-slate-400">Fauna representativa</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setKnowMoreSection('flora')}
                      className="p-8 rounded-[40px] bg-white border border-amber-900/5 shadow-xl flex items-center gap-8 text-left group"
                    >
                      <div className="w-20 h-20 rounded-[32px] bg-amber-50 flex items-center justify-center text-amber-900 shadow-inner group-hover:bg-amber-900 group-hover:text-white transition-all duration-500">
                        <Sparkles size={36} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display italic text-slate-800 group-hover:text-amber-900 transition-colors">Flora</h3>
                        <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-slate-400">Naturaleza regional</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setView('experience')}
                      className="p-8 rounded-[40px] bg-amber-700 text-white shadow-xl flex items-center gap-8 text-left group overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-500" />
                      <div className="w-20 h-20 rounded-[32px] bg-white/20 flex items-center justify-center text-white shadow-inner backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                        <PartyPopper size={36} />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-display italic text-white leading-tight">Déjanos tu experiencia</h3>
                        <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-amber-200/80">Califica y recomienda lugares</p>
                      </div>
                    </motion.button>
                  </div>

                  <div className="p-8 rounded-[40px] bg-amber-950/5 border border-amber-900/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Sparkles size={18} />
                        <h4 className="text-[11px] font-accent font-bold uppercase tracking-widest">Dato Curioso</h4>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        <span className="font-bold text-amber-900">Carnaval de Negros y Blancos:</span> Declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2009. Sus raíces son indígenas y se remonta a celebraciones para agradecer las cosechas.
                      </p>
                    </div>
                  </div>
                </div>
              ) : knowMoreSection === 'animals' ? (
                /* Animals List */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setKnowMoreSection('menu')}
                      className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div>
                      <h3 className="text-2xl font-display italic text-slate-800 leading-none">Fauna <span className="font-black not-italic text-amber-700">Nariñense</span></h3>
                      <p className="text-[9px] font-accent font-bold text-slate-400 uppercase tracking-widest mt-1">Biodiversidad de nuestra tierra</p>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {animals.map((animal, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="relative aspect-video rounded-[36px] overflow-hidden shadow-2xl border border-white/20 mb-6 bg-slate-100">
                          {Array.isArray(animal.image) ? (
                            <FoodCarousel images={animal.image} dish={animal.name} />
                          ) : (
                            <img 
                              src={animal.image} 
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                              alt={animal.name}
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-6 left-8 right-8">
                            <h4 className="text-2xl font-display italic text-white leading-tight uppercase tracking-tight">{animal.name}</h4>
                          </div>
                        </div>
                        <div className="px-4">
                          <p className="text-slate-600 leading-relaxed italic text-sm border-l-2 border-amber-200 pl-5">
                            {animal.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : knowMoreSection === 'flora' ? (
                /* Flora List */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setKnowMoreSection('menu')}
                      className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div>
                      <h3 className="text-2xl font-display italic text-slate-800 leading-none">Flora <span className="font-black not-italic text-amber-700">Nariñense</span></h3>
                      <p className="text-[9px] font-accent font-bold text-slate-400 uppercase tracking-widest mt-1">Naturaleza en su esplendor</p>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {flora.map((plant, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="relative aspect-video rounded-[36px] overflow-hidden shadow-2xl border border-white/20 mb-6 bg-slate-100">
                          {Array.isArray(plant.image) ? (
                            <FoodCarousel images={plant.image} dish={plant.name} />
                          ) : (
                            <img 
                              src={plant.image} 
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                              alt={plant.name}
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-6 left-8 right-8">
                            <h4 className="text-2xl font-display italic text-white leading-tight uppercase tracking-tight">{plant.name}</h4>
                          </div>
                        </div>
                        <div className="px-4">
                          <p className="text-slate-600 leading-relaxed italic text-sm border-l-2 border-amber-200 pl-5">
                            {plant.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Typical Foods List */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setKnowMoreSection('menu')}
                      className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div>
                      <h3 className="text-2xl font-display italic text-slate-800 leading-none">Comidas <span className="font-black not-italic text-amber-700">Típicas</span></h3>
                      <p className="text-[9px] font-accent font-bold text-slate-400 uppercase tracking-widest mt-1">Gastronomía de los 64 municipios</p>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {typicalFoods.length > 0 ? (
                      typicalFoods.map((food, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative aspect-video rounded-[36px] overflow-hidden shadow-2xl border border-white/20 mb-6 bg-slate-100">
                            {food.image ? (
                              Array.isArray(food.image) ? (
                                <FoodCarousel images={food.image} dish={food.dish} />
                              ) : (
                                <img 
                                  src={food.image} 
                                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                  alt={food.dish}
                                  referrerPolicy="no-referrer"
                                />
                              )
                            ) : (
                              <div className="w-full h-full flex items-center justify-center opacity-10">
                                <Utensils size={64} className="text-amber-900" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-8 right-8">
                              <p className="text-[9px] font-accent font-bold text-amber-400 uppercase tracking-[0.4em] mb-2">{food.municipality}</p>
                              <h4 className="text-2xl font-display italic text-white leading-tight uppercase tracking-tight">{food.dish}</h4>
                            </div>
                          </div>
                          <div className="px-4">
                            <p className="text-slate-600 leading-relaxed italic text-sm border-l-2 border-amber-200 pl-5">
                              {food.description}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-20 px-8">
                        <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 text-slate-200">
                          <Loader2 size={32} className="animate-spin text-amber-200" />
                        </div>
                        <h4 className="text-xl font-display italic text-slate-800 mb-2">Cocinando los Sabores...</h4>
                        <p className="text-slate-400 text-xs font-medium">Estamos trayendo las recetas más deliciosas de nuestras tierras.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : view === 'calendar' ? (
            /* Calendar View */
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10 pb-32"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-display italic text-slate-800 leading-none">Ruta <span className="font-black not-italic text-amber-700">Cronológica</span></h2>
                  <p className="text-[10px] font-accent font-bold text-slate-400 uppercase tracking-widest mt-2">{calDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}
                    className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-amber-700 hover:border-amber-200 transition-all shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}
                    className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-amber-700 hover:border-amber-200 transition-all shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Grid Calendar */}
              <div className="bg-white p-6 rounded-[40px] shadow-2xl border border-amber-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-30 -mr-16 -mt-16" />
                
                <div className="grid grid-cols-7 mb-4">
                  {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                    <div key={d} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: getFirstDayOfMonth(calDate.getFullYear(), calDate.getMonth()) }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  {Array.from({ length: getDaysInMonth(calDate.getFullYear(), calDate.getMonth()) }).map((_, i) => {
                    const day = i + 1;
                    const monthIdx = calDate.getMonth();
                    
                    // Check if there are festivals or reminders this day
                    const festivalsToday = municipalities.filter(m => parseFestivalDays(m.date, monthIdx).includes(day));
                    const hasReminder = reminders.some(r => parseFestivalDays(r.eventDate, monthIdx).includes(day));
                    const isToday = new Date().getDate() === day && new Date().getMonth() === monthIdx && new Date().getFullYear() === calDate.getFullYear();

                    return (
                      <motion.div
                        key={`day-${day}`}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative cursor-pointer transition-all border
                          ${festivalsToday.length > 0 ? 'bg-amber-50 border-amber-100' : 'bg-slate-50/30 border-transparent'}
                          ${hasReminder ? 'ring-2 ring-amber-600 ring-offset-2' : ''}
                          ${isToday ? 'border-amber-900' : ''}
                        `}
                        onClick={() => {
                          if (festivalsToday.length > 0) {
                            setSelectedMunicipality(festivalsToday[0]);
                          }
                        }}
                      >
                        <span className={`text-xs font-black ${festivalsToday.length > 0 ? 'text-amber-900' : 'text-slate-400'}`}>
                          {day}
                        </span>
                        
                        <div className="flex gap-0.5 mt-1">
                          {hasReminder && (
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
                          )}
                          {festivalsToday.length > 0 && !hasReminder && (
                            <div className="w-1 h-1 rounded-full bg-amber-300" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Legend & Stats */}
              <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar pb-2">
                <div className="flex items-center gap-2 shrink-0 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-4 ring-amber-600/10" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">Tus Viajes</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-100" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Festividades</span>
                </div>
              </div>

              {/* List of events for selected month */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Detalle Mensual</h3>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                
                <div className="grid gap-4">
                  {(festivalsByMonth[calDate.toLocaleString('es-ES', { month: 'long' }).toLowerCase()] || []).map(m => {
                    const isSaved = reminders.some(r => r.municipalityName === m.name);
                    return (
                      <motion.div 
                        key={`cal-list-${m.name}`}
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedMunicipality(m)}
                        className={`p-6 rounded-[32px] bg-white border shadow-xl flex items-center gap-6 cursor-pointer transition-all group
                          ${isSaved ? 'border-amber-200' : 'border-slate-50'}
                        `}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-colors
                          ${isSaved ? 'bg-amber-700 text-white shadow-amber-900/20' : 'bg-slate-50 text-slate-300 group-hover:bg-amber-50 group-hover:text-amber-600'}
                        `}>
                          {isSaved ? <Bell size={24} /> : <PartyPopper size={24} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {isSaved && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest rounded-full">Programado</span>}
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{m.date}</p>
                          </div>
                          <h4 className="font-display italic text-xl text-slate-800 leading-tight truncate">{m.name}</h4>
                          <p className="text-xs text-slate-400 truncate mt-1 italic">{m.festival}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-slate-50 flex items-center justify-center text-slate-200 group-hover:text-amber-600 group-hover:border-amber-100 transition-all">
                          <ChevronRight size={20} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : view === 'map' ? (
            /* Map View */
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                  <MapIcon size={28} className="text-amber-700" />
                  Mapa Festivo
                </h2>
                <button 
                  onClick={() => setShowOnlyWeekly(!showOnlyWeekly)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg border-2 ${showOnlyWeekly ? 'bg-amber-700 text-white border-amber-500' : 'bg-white/90 text-slate-700 border-white/50 glass-card'}`}
                >
                  {showOnlyWeekly ? 'Ver Todo' : 'Radar: Esta Semana'}
                </button>
              </div>
              
              {/* Map Controls */}
              <div className="glass-card p-6 rounded-3xl shadow-xl border border-white/40 space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Escribe un municipio..."
                      className="block w-full pl-10 pr-3 py-3 border border-white/50 rounded-xl bg-white/50 text-sm focus:ring-2 focus:ring-amber-500 outline-none font-medium"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch(locationSearch)}
                    />
                  </div>
                  <button 
                    onClick={() => handleLocationSearch(locationSearch)}
                    className="px-5 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition-all shadow-md font-black text-[10px] uppercase tracking-widest"
                  >
                    Buscar
                  </button>
                  <button 
                    onClick={() => getUserLocation(false)}
                    disabled={isLocating}
                    className={`p-3 bg-white/80 text-amber-700 rounded-xl hover:bg-white transition-all border border-white/50 flex items-center justify-center shadow-md ${isLocating ? 'animate-pulse' : ''}`}
                    title="Mi Ubicación"
                  >
                    <Locate size={22} className={isLocating ? 'animate-spin' : ''} />
                  </button>
                </div>

                {/* Leaflet Map */}
                <div className="h-72 rounded-[32px] overflow-hidden border border-white/60 z-10 shadow-2xl relative">
                  <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 z-[400] rounded-[32px]" />
                  <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <ChangeView center={mapCenter} zoom={mapZoom} />
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <ZoomControl position="bottomright" />
                    {userLocation && (
                      <Marker position={userLocation} icon={UserIcon}>
                        <Popup>
                          <div className="text-center">
                            <p className="font-black text-amber-700 text-xs uppercase tracking-widest">¡Estás aquí!</p>
                            <p className="text-[10px] text-slate-500 mt-1">Explora las fiestas a tu alrededor</p>
                          </div>
                        </Popup>
                      </Marker>
                    )}
                    {mapMarkers.map(m => (
                      <Marker key={m.name} position={[m.lat, m.lng]}>
                        <Popup>
                          <div className="text-center p-1">
                            <strong className="block text-slate-800 text-sm font-black uppercase tracking-tight">{m.name}</strong>
                            <span className="text-xs text-slate-600 font-medium">{m.festival}</span>
                            <p className="text-[10px] font-black text-amber-700 mt-1 uppercase tracking-wider">{m.date}</p>
                            <button 
                              onClick={() => setSelectedMunicipality(m)}
                              className="mt-3 block w-full py-2 bg-gradient-to-r from-amber-700 to-amber-600 text-white text-[10px] rounded-lg font-black uppercase tracking-widest shadow-md"
                            >
                              Ver Detalles
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}

                    {transportTerminals.map((terminal, idx) => (
                      <Marker key={`terminal-${idx}`} position={[terminal.lat, terminal.lng]} icon={TransportIcon}>
                        <Popup>
                          <div className="text-center p-2 min-w-[150px]">
                             <span className="text-[8px] font-black bg-amber-950 text-white px-2 py-0.5 rounded-full uppercase mb-1 inline-block">
                               {terminal.type}
                             </span>
                             <h4 className="font-black text-slate-800 text-xs uppercase tracking-tight mt-1 leading-tight">{terminal.name}</h4>
                             <p className="text-[9px] text-slate-500 italic mt-1">{terminal.location}</p>
                             <div className="mt-2 border-t border-slate-100 pt-2">
                               <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">Viajes a:</p>
                               <div className="flex flex-wrap gap-1 justify-center">
                                 {terminal.destinations.slice(0, 4).map((d, i) => (
                                   <span key={i} className="text-[7px] bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded text-slate-600">{d}</span>
                                 ))}
                                 {terminal.destinations.length > 4 && <span className="text-[7px] text-slate-400">...</span>}
                               </div>
                             </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>

                {/* Nearby Festivals */}
                <div className="pt-2">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                    <PartyPopper size={14} className="text-amber-600" />
                    {showOnlyWeekly ? 'FESTIVALES AHORA' : userLocation ? 'MUNICIPIOS MÁS CERCANOS A TI' : 'MÁS CERCANOS'}
                  </h3>
                  <div className="space-y-3">
                    {(showOnlyWeekly ? 
                      [...festivalsThisWeek].sort((a, b) => {
                        const distA = getDistance(mapCenter[0], mapCenter[1], a.lat, a.lng);
                        const distB = getDistance(mapCenter[0], mapCenter[1], b.lat, b.lng);
                        return distA - distB;
                      }).slice(0, 5) : 
                      nearbyFestivals
                    ).map(m => (
                      <div 
                        key={`nearby-${m.name}`}
                        className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/50 hover:bg-white/60 transition-all group"
                      >
                        <div className="min-w-0">
                          <h4 className="font-black text-slate-800 text-sm truncate tracking-tight group-hover:text-amber-700 transition-colors">{m.name}</h4>
                          <p className="text-[10px] text-slate-600 truncate font-medium">{m.festival}</p>
                          {(userLocation || startingPoint) && (
                            <p className="text-[9px] font-black text-amber-700 uppercase mt-0.5 tracking-wider">
                              A {getDistance(userLocation?.[0] || startingPoint?.lat || mapCenter[0], userLocation?.[1] || startingPoint?.lng || mapCenter[1], m.lat, m.lng).toFixed(1)} km
                            </p>
                          )}
                          {showOnlyWeekly && <p className="text-[9px] font-black text-amber-600 uppercase mt-0.5 tracking-wider">{m.date}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedMunicipality(m)}
                            className="bg-amber-500 text-white p-2.5 rounded-xl hover:bg-amber-600 transition-all shadow-md"
                            title="Ver Detalles"
                          >
                            <Info size={18} />
                          </button>
                          <button 
                            onClick={() => openInGoogleMaps(m.name, userLocation || mapCenter)}
                            className="bg-amber-700 text-white p-2.5 rounded-xl hover:bg-amber-800 transition-all shadow-md"
                            title="Ver Ruta"
                          >
                            <Navigation size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {showOnlyWeekly && festivalsThisWeek.length === 0 && (
                      <p className="text-center text-xs text-slate-500 py-6 italic font-medium">No hay fiestas programadas para esta semana.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-white/40 flex items-start gap-3 shadow-lg">
                <div className="bg-amber-50 p-2 rounded-xl">
                  <Info size={20} className="text-amber-700 shrink-0" />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong className="text-amber-900">Radar de Fiestas:</strong> Activa el radar para ver solo los pueblos que están celebrando esta semana. ¡No te pierdas de nada!
                </p>
              </div>
            </motion.div>
          ) : view === 'transport' ? (
            /* Rutas & Transporte View */
            <motion.div
              key="transport"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-display italic text-slate-800 leading-none">Rutas & <span className="font-black not-italic text-amber-700">Transporte</span></h2>
                  <p className="text-[10px] font-accent font-bold text-slate-500 uppercase tracking-widest mt-2">¿Cómo llegar a tu destino?</p>
                </div>
              </div>

              {/* inDrive Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-[40px] bg-gradient-to-br from-amber-950 to-amber-900 text-white shadow-2xl border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Bus size={120} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center text-amber-950 shadow-lg shadow-amber-400/20">
                    <Navigation size={40} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-display italic leading-tight">¿Buscas servicio de transporte <span className="text-amber-400 not-italic font-black">desde tu casa?</span></h3>
                    <p className="text-sm text-slate-400 mt-2 italic">Usa inDrive para moverte por la ciudad de forma rápida y segura.</p>
                  </div>
                  <a 
                    href="https://indrive.com/es/home/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-amber-900 text-amber-50 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-amber-800 transition-all shadow-xl flex items-center gap-2 border border-white/10"
                  >
                    Pedir un inDrive <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>

              {/* Principales Centros de Transporte */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Principales Centros de Transporte</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
                  {transportTerminals.map((terminal, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ y: -4 }}
                      onClick={() => {
                        setMapCenter([terminal.lat, terminal.lng]);
                        setMapZoom(16);
                        setView('map');
                      }}
                      className="shrink-0 w-64 p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl text-left flex flex-col justify-between h-48"
                    >
                      <div>
                        <p className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1">{terminal.type}</p>
                        <h4 className="text-lg font-display italic text-slate-800 leading-tight">{terminal.name}</h4>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                         <div className="flex items-center gap-1">
                           <MapPin size={12} />
                           <span className="text-[10px] font-bold">{terminal.location}</span>
                         </div>
                         <ArrowRight size={16} className="text-amber-300" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : view === 'reminders' ? (
            /* Reminders View */
            <motion.div
              key="reminders"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8 pb-32"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-display italic text-slate-800 leading-none">Recordatorios <span className="font-black not-italic text-amber-700">de Viaje</span></h2>
                  <p className="text-[10px] font-accent font-bold text-slate-500 uppercase tracking-widest mt-2">Organiza tus visitas festivas</p>
                </div>
              </div>

              {reminders.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                    <Bell size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-display italic text-slate-800">No tienes viajes programados</h3>
                    <p className="text-xs text-slate-400 font-medium max-w-[240px]">Explora el calendario o el mapa y guarda tus destinos favoritos para recibir avisos.</p>
                  </div>
                  <button 
                    onClick={() => setView('calendar')}
                    className="px-8 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-amber-700 shadow-sm hover:bg-amber-50 transition-colors"
                  >
                    Ver Calendario
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {reminders.map((reminder) => (
                    <motion.div
                      key={reminder.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 rounded-[32px] bg-white border border-slate-50 shadow-xl flex items-center gap-6 group"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 flex flex-col items-center justify-center text-amber-700 shrink-0">
                        <Clock size={20} className="mb-0.5" />
                        <span className="text-[8px] font-black uppercase tracking-tighter">Próximo</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display italic text-lg text-slate-800 leading-tight truncate">{reminder.municipalityName}</h4>
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-1 truncate">{reminder.eventName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <CalendarIcon size={12} className="text-slate-300" />
                          <span className="text-[10px] font-bold text-slate-400">Fecha: {reminder.eventDate}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeReminder(reminder.id)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                  
                  <div className="p-8 rounded-[32px] bg-amber-900 text-white shadow-2xl relative overflow-hidden group mt-4">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full -mr-16 -mt-16" />
                    <div className="relative z-10 space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">¿Sabías qué?</h4>
                       <p className="text-sm italic leading-relaxed opacity-80">
                         Los recordatorios se activan automáticamente 3 días antes de cada festividad para que tengas tiempo de preparar tu viaje.
                       </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : view === 'experience' ? (
            /* Experience/Reviews View */
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 pb-32"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-display italic text-slate-800 leading-none">Tu <span className="font-black not-italic text-amber-700">Experiencia</span></h2>
                  <p className="text-[10px] font-accent font-bold text-slate-500 uppercase tracking-widest mt-2">Comparte y descubre lo mejor de Nariño</p>
                </div>
                <button 
                  onClick={() => setView('home')}
                  className="p-3 bg-white rounded-2xl shadow-xl border border-slate-100 text-slate-400 hover:text-amber-800 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Review Form */}
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[48px] shadow-2xl border border-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
                    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                       <PartyPopper className="text-amber-600" size={20} />
                       Cuéntanos tu viaje
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Municipio visitado</label>
                        <select 
                          value={reviewForm.municipality}
                          onChange={(e) => setReviewForm({...reviewForm, municipality: e.target.value})}
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-4 text-sm font-medium focus:outline-none focus:border-amber-400 transition-all"
                        >
                          <option value="">Selecciona un lugar...</option>
                          {municipalities.map(m => (
                            <option key={m.name} value={m.name}>{m.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">¿Cuántas estrellas le das?</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setReviewForm({...reviewForm, rating: star})}
                              className={`p-3 rounded-2xl transition-all ${reviewForm.rating >= star ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-200'}`}
                            >
                              <Sparkles size={24} className={reviewForm.rating >= star ? 'fill-amber-600/20' : ''} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Tu nombre</label>
                        <input 
                          type="text"
                          value={reviewForm.name}
                          onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                          placeholder="¿Cómo te llamas?"
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-4 text-sm font-medium focus:outline-none focus:border-amber-400 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Tu reseña</label>
                        <textarea 
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                          placeholder="¿Qué fue lo que más te gustó?"
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-4 text-sm font-medium focus:outline-none focus:border-amber-400 transition-all h-32 resize-none"
                        />
                      </div>

                      <button 
                        onClick={submitReview}
                        disabled={!reviewForm.municipality || !reviewForm.rating || !reviewForm.comment || !reviewForm.name}
                        className="w-full bg-amber-700 text-white p-5 rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-amber-900/20 hover:bg-amber-800 disabled:opacity-50 disabled:grayscale transition-all mt-4"
                      >
                        Publicar Reseña
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rankings & List */}
                <div className="space-y-8">
                  <div className="bg-amber-950 p-8 rounded-[48px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full -ml-32 -mt-32" />
                    <h3 className="text-xl font-display italic text-amber-400 mb-6 relative z-10">Ranking <span className="font-black not-italic text-white">Nariñense</span></h3>
                    
                    <div className="space-y-4 relative z-10">
                      {topDestinations.length > 0 ? (
                        topDestinations.map((dest, idx) => (
                          <motion.div 
                            key={dest.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-10 rounded-xl flex flex-col items-center justify-center font-black shadow-inner ${
                                idx === 0 ? 'bg-amber-400 text-amber-950' : 
                                idx === 1 ? 'bg-slate-200 text-slate-800' : 
                                idx === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-white/50'
                              }`}>
                                <span className="text-[7px] uppercase tracking-tighter leading-none mb-0.5">Top</span>
                                <span className="text-sm leading-none">{idx + 1}</span>
                              </div>
                              <div>
                                <h4 className="text-slate-100 font-bold tracking-tight">{dest.name}</h4>
                                <div className="flex items-center gap-1">
                                  <Sparkles size={10} className="text-amber-400 fill-amber-400/20" />
                                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{dest.average.toFixed(1)} Puntos</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">{dest.count} Reseñas</p>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-amber-200/40 text-xs italic py-8 text-center">Sé el primero en calificar un destino...</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Reseñas Recientes</h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {reviews.length > 0 ? (
                        reviews.map((review, idx) => (
                          <motion.div 
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 text-xs font-black">
                                  {review.userName.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-black text-slate-800">{review.userName}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Sparkles 
                                    key={i} 
                                    size={10} 
                                    className={i < review.rating ? 'text-amber-500 fill-amber-500/20' : 'text-slate-100'} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">{review.municipalityName}</p>
                            <p className="text-xs text-slate-500 leading-relaxed italic">"{review.comment}"</p>
                            <p className="text-[8px] text-slate-300 mt-2 font-bold uppercase">{review.date}</p>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-center text-slate-400 text-xs py-10 font-medium italic">Aún no hay reseñas. ¡Comparte la tuya!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : view === 'shop' ? (
            /* Shop View (Mercadillo de Artesanías de Nariño) */
            <motion.div
              key="shop"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 pb-32"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-display italic text-slate-800 leading-none">
                    Mercadillo de <span className="font-black not-italic text-amber-700">Artesanías</span>
                  </h2>
                  <p className="text-[10px] font-accent font-bold text-slate-500 uppercase tracking-widest mt-2">
                    Apoya el talento tradicional de Nariño
                  </p>
                </div>
                <button 
                  onClick={() => setView('home')}
                  className="p-3 bg-white rounded-2xl shadow-xl border border-slate-100 text-slate-400 hover:text-amber-800 transition-all cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>

              {/* Main empty state container matching the premium and indigenous styles */}
              <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl border border-slate-50 relative overflow-hidden text-center max-w-2xl mx-auto">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-950/5 blur-3xl rounded-full -ml-32 -mb-32" />
                
                <div className="relative z-10 flex flex-col items-center justify-center py-8">
                  <div className="bg-amber-50 p-6 rounded-full text-amber-700 mb-6 border border-amber-100 shadow-md animate-bounce">
                    <ShoppingBag size={48} className="stroke-[2]" />
                  </div>
                  
                  <h3 className="text-2xl font-display italic text-amber-900 mb-3">Tu bolsa de compras está vacía</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto mb-8 text-balance">
                    Próximamente podrás adquirir obras maestras directamente de nuestros artesanos nariñenses: sombreros de paja toquilla de Sandoná, piezas exquisitas en Barniz de Pasto (Mopa-Mopa), coloridos tejidos de Cumbal e instrumentos musicales autóctonos de la cordillera.
                  </p>

                  <div className="w-full border-t border-slate-100 my-6"></div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-center font-sans">
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl relative overflow-hidden group hover:border-amber-200 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3 mx-auto">
                        <Sparkles size={16} />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">Artesanía Auténtica</h4>
                      <p className="text-slate-400 text-xs">Obras certificadas con denominación de origen e identidad nariñense.</p>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl relative overflow-hidden group hover:border-amber-200 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3 mx-auto">
                        <UtensilsCrossed size={16} />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">Comercio Justo Directo</h4>
                      <p className="text-slate-400 text-xs font-sans">El 100% de las ventas va directamente a las familias de artesanos locales.</p>
                    </div>
                  </div>

                   <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md justify-center">
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setView('home')}
                      className="px-6 py-4 bg-amber-700 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-amber-900/10 hover:bg-amber-800 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans w-full"
                    >
                      <span>Explorar Festividades</span>
                      <ArrowRight size={14} />
                    </motion.button>

                    {deferredPrompt && (
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleInstallApp}
                        className="px-6 py-4 bg-slate-900 text-amber-400 rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans w-full border border-amber-500/10"
                      >
                        <span>Instalar App</span>
                        <ShoppingBag size={14} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto min-w-[320px] bg-amber-950/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-40 px-4 sm:px-8 py-4 flex justify-between items-center gap-1 sm:gap-4 md:gap-6">
        <button 
          onClick={() => setView('home')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'home' ? 'text-amber-600 scale-110' : 'text-white/40 hover:text-white/80'}`}
        >
          <MapPin size={22} className={view === 'home' ? 'fill-amber-600/10' : ''} />
          <span className="text-[7px] sm:text-[8px] font-accent font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">{view === 'home' ? 'Inicio' : ''}</span>
        </button>
        <button 
          onClick={() => setView('calendar')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'calendar' ? 'text-amber-600 scale-110' : 'text-white/40 hover:text-white/80'}`}
        >
          <CalendarIcon size={22} className={view === 'calendar' ? 'fill-amber-600/10' : ''} />
          <span className="text-[7px] sm:text-[8px] font-accent font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">{view === 'calendar' ? 'Ciclos' : ''}</span>
        </button>
        <button 
          onClick={() => setView('map')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'map' ? 'text-amber-600 scale-110' : 'text-white/40 hover:text-white/80'}`}
        >
          <MapIcon size={22} className={view === 'map' ? 'fill-amber-600/10' : ''} />
          <span className="text-[7px] sm:text-[8px] font-accent font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">{view === 'map' ? 'Explora' : ''}</span>
        </button>
        <button 
          onClick={() => setView('transport')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'transport' ? 'text-amber-600 scale-110' : 'text-white/40 hover:text-white/80'}`}
        >
          <Bus size={22} className={view === 'transport' ? 'fill-amber-600/10' : ''} />
          <span className="text-[7px] sm:text-[8px] font-accent font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">{view === 'transport' ? 'Rutas' : ''}</span>
        </button>
        <button 
          onClick={() => setView('reminders')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'reminders' ? 'text-amber-600 scale-110' : 'text-white/40 hover:text-white/80'}`}
        >
          <div className="relative">
            <Bell size={22} className={view === 'reminders' ? 'fill-amber-600/10' : ''} />
            {reminders.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-slate-900" />
            )}
          </div>
          <span className="text-[7px] sm:text-[8px] font-accent font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">{view === 'reminders' ? 'Viajes' : ''}</span>
        </button>
        <button 
          onClick={() => setView('experience')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'experience' ? 'text-amber-600 scale-110' : 'text-white/40 hover:text-white/80'}`}
        >
          <Sparkles size={22} className={view === 'experience' ? 'fill-amber-600/10' : ''} />
          <span className="text-[7px] sm:text-[8px] font-accent font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">{view === 'experience' ? 'Ranking' : ''}</span>
        </button>
        <button 
          onClick={() => setView('shop')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${view === 'shop' ? 'text-amber-600 scale-110' : 'text-white/40 hover:text-white/80'}`}
        >
          <ShoppingBag size={22} className={view === 'shop' ? 'fill-amber-600/10' : ''} />
          <span className="text-[7px] sm:text-[8px] font-accent font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">{view === 'shop' ? 'Tienda' : ''}</span>
        </button>
      </nav>

      {/* Gallery Category Modal */}
      <AnimatePresence>
        {selectedGalleryCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryCategory(null)}
              className="absolute inset-0 bg-amber-950/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-amber-50 w-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border-4 border-amber-600"
            >
              <div className="p-6 earthy-gradient text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                    {selectedGalleryCategory === 'curiosidades' && <Sparkles size={24} />}
                    {selectedGalleryCategory === 'palabras' && <Languages size={24} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter">
                      {GALLERY_CATEGORIES.find(c => c.id === selectedGalleryCategory)?.title}
                    </h2>
                    <p className="text-amber-200 text-[10px] font-bold uppercase tracking-widest">Nuestra Tierra</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedGalleryCategory(null)}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 indigenous-pattern">
                {selectedGalleryCategory === 'curiosidades' ? (
                  <div className="space-y-6">
                    {CURIOSITIES.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.id * 0.1 }}
                        className="bg-white/80 p-6 rounded-3xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-lg font-black text-amber-900 mb-2 leading-tight">{item.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.content}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600/60 uppercase tracking-widest">
                          <ExternalLink size={10} />
                          <span>Fuente: {item.source}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : selectedGalleryCategory === 'palabras' ? (
                  <div className="space-y-8">
                    <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 space-y-4">
                      <h3 className="text-amber-900 font-black flex items-center gap-2">
                        <Info size={18} />
                        El Idioma de Nuestra Tierra
                      </h3>
                      <p className="text-sm text-amber-800/80 leading-relaxed">{DIALECT_INFO.description}</p>
                      <p className="text-sm text-amber-800/80 leading-relaxed font-medium italic">"{DIALECT_INFO.culturalImportance}"</p>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600/40 uppercase tracking-widest">
                         <ExternalLink size={10} />
                         <span>Fuente: {DIALECT_INFO.source}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {WORDS_NARINENSES.map((word, idx) => (
                        <motion.div
                          key={word.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white p-5 rounded-2xl border-b-4 border-slate-100 group hover:border-amber-400 transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-amber-600 font-display font-black text-lg italic tracking-tight">{word.word}</span>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors">
                              <Music size={14} />
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{word.meaning}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryImages.filter(img => img.category === selectedGalleryCategory).map((img, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          playCultureSound(selectedGalleryCategory || undefined);
                          setSelectedGalleryImage(img);
                        }}
                        className="group relative aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-amber-900/10 cursor-pointer"
                      >
                        <img 
                          src={img.url} 
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${img.title}/800/450`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <p className="text-white font-bold text-sm tracking-tight">{img.title}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-amber-100/50 border-t border-amber-200 text-center shrink-0">
                <button 
                  onClick={() => setSelectedGalleryCategory(null)}
                  className="px-8 py-2 bg-amber-800 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-md hover:bg-amber-900 transition-colors"
                >
                  Cerrar Galería
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Image Detail Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute inset-0 bg-amber-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="relative aspect-video">
                <img 
                  src={selectedGalleryImage.url} 
                  alt={selectedGalleryImage.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedGalleryImage(null)}
                  className="absolute top-4 right-4 bg-amber-950/50 hover:bg-amber-950/70 p-2 rounded-full text-white backdrop-blur-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm uppercase tracking-widest mb-2">
                  <MapPin size={16} />
                  {selectedGalleryImage.location}
                </div>
                <h2 className="text-3xl font-black text-slate-800 mb-4">{selectedGalleryImage.title}</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {selectedGalleryImage.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMunicipality && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMunicipality(null)}
              className="absolute inset-0 bg-amber-950/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedMunicipality.name}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="relative bg-white w-full max-w-md max-h-[90vh] rounded-[48px] overflow-hidden shadow-2xl flex flex-col border border-white/20"
            >
              <div className="h-64 sm:h-80 bg-slate-100 relative shrink-0 overflow-hidden">
                {selectedMunicipality.image ? (
                  <motion.img 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={selectedMunicipality.image} 
                    alt={selectedMunicipality.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-950 via-amber-800 to-amber-950 opacity-20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedMunicipality(null)}
                  className="absolute top-8 right-8 bg-amber-950/20 hover:bg-amber-950/40 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md transition-all text-white z-20 border border-white/20"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <span className="text-[10px] font-accent font-bold text-amber-400 uppercase tracking-[0.4em] mb-2 block text-shadow-sm">Destino Nariñense</span>
                  <h2 className="text-4xl font-display italic text-white leading-tight uppercase tracking-tight text-shadow-md">{selectedMunicipality.name}</h2>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto px-8 pb-10 custom-scrollbar">
                <div className="flex items-center gap-6 py-8 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-amber-600" />
                    <span className="text-[10px] font-accent font-bold text-slate-400 uppercase tracking-widest">{selectedMunicipality.province}</span>
                  </div>
                  {startingPoint && (
                    <div className="flex items-center gap-2">
                      <Navigation size={14} className="text-amber-600" />
                      <span className="text-[10px] font-accent font-bold text-slate-400 uppercase tracking-widest">A {getDistance(startingPoint.lat, startingPoint.lng, selectedMunicipality.lat, selectedMunicipality.lng).toFixed(0)} km</span>
                    </div>
                  )}
                </div>

                <div className="space-y-10 pt-8">
                  {selectedMunicipality.description && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-[11px] font-accent font-bold text-slate-900 uppercase tracking-widest whitespace-nowrap">Crónica Local</h4>
                        <div className="h-px w-full bg-slate-50" />
                      </div>
                      <p className="text-lg font-serif italic text-slate-600 leading-relaxed font-light first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-4 first-letter:text-amber-900/30 antialiased">
                        {selectedMunicipality.description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 flex items-center justify-between group">
                      <div className="space-y-1">
                        <span className="text-[9px] font-accent font-bold text-slate-400 uppercase tracking-widest">Sello Festivo</span>
                        <p className="text-xl font-display italic text-slate-800">{selectedMunicipality.festival}</p>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-amber-700 shadow-sm border border-slate-100">
                        <PartyPopper size={20} />
                      </div>
                    </div>

                    <div className="p-8 rounded-[40px] bg-amber-50/50 border border-amber-100/50 flex items-center justify-between group">
                      <div className="space-y-1">
                        <span className="text-[9px] font-accent font-bold text-amber-500 uppercase tracking-widest">Ciclo / Fecha</span>
                        <p className="text-xl font-display italic text-amber-900">{selectedMunicipality.date}</p>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                        <CalendarIcon size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => addReminder(selectedMunicipality.name, selectedMunicipality.festival, selectedMunicipality.date)}
                      className="w-full py-5 bg-white border-2 border-amber-600 text-amber-700 rounded-[2.5rem] font-accent font-black text-[11px] uppercase tracking-[0.3em] shadow-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-4"
                    >
                      <Bell size={18} /> Programar Recordatorio
                    </button>
                    <button 
                      onClick={() => openInGoogleMaps(selectedMunicipality.name, userLocation)}
                      className="w-full py-6 bg-amber-950 text-white rounded-[2.5rem] font-accent font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:bg-amber-900 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
                    >
                      Trazar Ruta GPS <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
