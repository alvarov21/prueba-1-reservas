"use client";

import { useState } from "react";
import { businessConfig } from "@/config/business";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Clock, Phone, ChevronRight } from "lucide-react";
import BookingFlow from "@/components/BookingFlow";

export default function Home() {
  const [selectedService, setSelectedService] = useState<typeof businessConfig.services[0] | null>(null);

  // Group services by category
  const servicesByCategory = businessConfig.services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof businessConfig.services>);

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans">
      {/* iOS style large header area with subtle background fade */}
      <div className="relative pt-12 pb-6 px-4">
        {/* We can use the image as a small rounded cover or just a top gradient. Let's use a blurred hero */}
        <div 
          className="absolute inset-0 top-0 h-64 bg-cover bg-center opacity-30 mask-image:linear-gradient(to_bottom,black,transparent)"
          style={{ backgroundImage: `url(${businessConfig.image})`, WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}
        />
        <div className="relative z-10 pt-16">
          <h1 className="text-[34px] font-bold tracking-tight leading-tight">{businessConfig.name}</h1>
          <p className="text-[17px] text-gray-400 mt-1">{businessConfig.description}</p>
        </div>
      </div>

      <div className="px-4 relative z-10">
        {/* Ratings and Quick Info */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-[#FF9500] fill-[#FF9500]" />
            <span className="text-[15px] font-semibold text-white">{businessConfig.rating}</span>
          </div>
          <span className="text-[#8E8E93] text-[15px]">• {businessConfig.reviewsCount} valoraciones</span>
        </div>

        {/* iOS Segmented Control */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="w-full bg-[#1C1C1E] p-[3px] h-8 rounded-[9px] mb-6 flex">
            <TabsTrigger value="services" className="flex-1 rounded-[7px] text-[13px] font-semibold data-[state=active]:bg-[#636366] data-[state=active]:text-white">Servicios</TabsTrigger>
            <TabsTrigger value="team" className="flex-1 rounded-[7px] text-[13px] font-semibold data-[state=active]:bg-[#636366] data-[state=active]:text-white">Equipo</TabsTrigger>
            <TabsTrigger value="info" className="flex-1 rounded-[7px] text-[13px] font-semibold data-[state=active]:bg-[#636366] data-[state=active]:text-white">Información</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6 animate-in fade-in duration-300">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category}>
                <h2 className="text-[22px] font-bold tracking-tight mb-3 ml-2">{category}</h2>
                <div className="bg-[#1C1C1E] rounded-[10px] overflow-hidden">
                  {services.map((service, index) => (
                    <div 
                      key={service.id} 
                      onClick={() => setSelectedService(service)}
                      className="group flex flex-col cursor-pointer active:bg-white/10 transition-colors"
                    >
                      <div className={`ml-4 pr-4 py-3 flex justify-between items-center ${index !== services.length - 1 ? 'border-b border-white/10' : ''}`}>
                        <div className="flex-1 pr-4 min-w-0">
                          <h3 className="font-normal text-[17px] tracking-tight text-white mb-0.5">{service.name}</h3>
                          <p className="text-[15px] text-[#8E8E93] line-clamp-1 leading-tight">
                            {service.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center shrink-0">
                          <span className="text-[17px] text-[#8E8E93] mr-3">{service.price}€</span>
                          <div className="bg-white/10 text-primary font-semibold text-[15px] px-4 py-1 rounded-full">
                            Añadir
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="team" className="animate-in fade-in duration-300">
            <h2 className="text-[22px] font-bold tracking-tight mb-3 ml-2">Nuestros Barberos</h2>
            <div className="bg-[#1C1C1E] rounded-[10px] overflow-hidden">
              {businessConfig.professionals.map((prof, index) => (
                <div key={prof.id} className="flex flex-col cursor-pointer active:bg-white/10 transition-colors">
                  <div className={`ml-4 pr-4 py-3 flex items-center ${index !== businessConfig.professionals.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <Avatar className="w-14 h-14 mr-4">
                      <AvatarImage src={prof.avatar} className="object-cover" />
                      <AvatarFallback>{prof.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-normal text-[17px] text-white">{prof.name}</h3>
                      <p className="text-[15px] text-[#8E8E93]">{prof.role}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#3A3A3C]" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="animate-in fade-in duration-300 space-y-6">
            <div>
              <h2 className="text-[22px] font-bold tracking-tight mb-3 ml-2">Detalles del local</h2>
              
              <div className="bg-[#1C1C1E] rounded-[10px] overflow-hidden">
                <div className="flex items-center ml-4 pr-4 py-3 border-b border-white/10">
                  <div className="w-[30px] h-[30px] rounded-md bg-[#0A84FF] flex items-center justify-center mr-3 shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[17px] text-white">Dirección</span>
                  </div>
                  <span className="text-[17px] text-[#8E8E93] truncate max-w-[150px]">{businessConfig.address}</span>
                </div>

                <div className="flex items-center ml-4 pr-4 py-3 border-b border-white/10">
                  <div className="w-[30px] h-[30px] rounded-md bg-[#32ADE6] flex items-center justify-center mr-3 shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[17px] text-white">Horario</span>
                  </div>
                  <span className="text-[17px] text-[#8E8E93]">L-S {businessConfig.workingHours.start}-{businessConfig.workingHours.end}</span>
                </div>

                <div className="flex items-center ml-4 pr-4 py-3">
                  <div className="w-[30px] h-[30px] rounded-md bg-[#34C759] flex items-center justify-center mr-3 shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[17px] text-white">Llamar</span>
                  </div>
                  <span className="text-[17px] text-[#8E8E93]">+34 600 123 456</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Flow Modal */}
      {selectedService && (
        <BookingFlow 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </main>
  );
}
