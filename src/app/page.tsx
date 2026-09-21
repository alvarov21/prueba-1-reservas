"use client";

import { useState } from "react";
import { businessConfig } from "@/config/business";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Clock, Phone, ChevronRight } from "lucide-react";
import BookingFlow from "@/components/BookingFlow";

export default function Home() {
  const [selectedService, setSelectedService] = useState<typeof businessConfig.services[0] | null>(null);

  const servicesByCategory = businessConfig.services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof businessConfig.services>);

  return (
    <main className="min-h-screen bg-black/40 text-white pb-24 font-[system-ui,-apple-system,sans-serif] relative">
      {/* Full-screen blurred ambient background */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-[0.15] blur-3xl scale-110 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${businessConfig.image})` }}
      />

      {/* iOS 17 style immersive header */}
      <div className="relative pt-12 pb-6 px-4">
        <div 
          className="absolute inset-0 top-0 h-[400px] bg-cover bg-center opacity-60 mask-image:linear-gradient(to_bottom,black,transparent)"
          style={{ backgroundImage: `url(${businessConfig.image})`, WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }}
        />
        <div className="relative z-10 pt-[220px]">
          <h1 className="text-[36px] font-bold tracking-tight leading-tight drop-shadow-md">{businessConfig.name}</h1>
          <p className="text-[17px] text-gray-200 mt-1 font-medium tracking-tight drop-shadow-sm">{businessConfig.description}</p>
        </div>
      </div>

      <div className="px-4 relative z-10">
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-[#FF9500] fill-[#FF9500]" />
            <span className="text-[16px] font-semibold tracking-tight">{businessConfig.rating}</span>
          </div>
          <span className="text-[#8E8E93] text-[16px] tracking-tight">• {businessConfig.reviewsCount} valoraciones</span>
        </div>

        {/* Modern iOS Segmented Control */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="w-full bg-[#1C1C1E]/60 backdrop-blur-2xl p-[3px] h-[32px] rounded-[9px] mb-8 flex">
            <TabsTrigger value="services" className="flex-1 rounded-[7px] text-[13px] font-semibold tracking-tight shadow-none data-[state=active]:bg-[#636366] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">Servicios</TabsTrigger>
            <TabsTrigger value="team" className="flex-1 rounded-[7px] text-[13px] font-semibold tracking-tight shadow-none data-[state=active]:bg-[#636366] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">Equipo</TabsTrigger>
            <TabsTrigger value="info" className="flex-1 rounded-[7px] text-[13px] font-semibold tracking-tight shadow-none data-[state=active]:bg-[#636366] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-8 animate-in fade-in duration-300">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category}>
                <h2 className="text-[22px] font-bold tracking-tight mb-3 ml-2">{category}</h2>
                <div className="bg-[#1C1C1E]/60 backdrop-blur-2xl rounded-2xl overflow-hidden">
                  {services.map((service, index) => (
                    <div 
                      key={service.id} 
                      onClick={() => setSelectedService(service)}
                      className="group flex flex-col cursor-pointer active:bg-white/10 transition-colors"
                    >
                      <div className={`ml-4 pr-4 py-3.5 flex justify-between items-center ${index !== services.length - 1 ? 'border-b border-white/[0.08]' : ''}`}>
                        <div className="flex-1 pr-4 min-w-0">
                          <h3 className="font-medium text-[17px] tracking-tight text-white mb-0.5">{service.name}</h3>
                          <p className="text-[14px] text-[#8E8E93] line-clamp-1 tracking-tight leading-tight">
                            {service.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center shrink-0">
                          <span className="text-[17px] font-medium text-[#8E8E93] mr-3 tracking-tight">{service.price}€</span>
                          <div className="bg-white/10 text-[#0A84FF] font-bold text-[14px] tracking-tight px-4 py-1.5 rounded-full active:bg-[#0A84FF] active:text-white transition-colors">
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
            <div className="bg-[#1C1C1E]/60 backdrop-blur-2xl rounded-2xl overflow-hidden">
              {businessConfig.professionals.map((prof, index) => (
                <div key={prof.id} className="flex flex-col cursor-pointer active:bg-white/10 transition-colors">
                  <div className={`ml-4 pr-4 py-3 flex items-center ${index !== businessConfig.professionals.length - 1 ? 'border-b border-white/[0.08]' : ''}`}>
                    <Avatar className="w-14 h-14 mr-4">
                      <AvatarImage src={prof.avatar} className="object-cover" />
                      <AvatarFallback>{prof.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-[17px] tracking-tight text-white">{prof.name}</h3>
                      <p className="text-[14px] tracking-tight text-[#8E8E93]">{prof.role}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="animate-in fade-in duration-300 space-y-8">
            <div>
              <h2 className="text-[22px] font-bold tracking-tight mb-3 ml-2">Información del local</h2>
              
              <div className="bg-[#1C1C1E]/60 backdrop-blur-2xl rounded-2xl overflow-hidden">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(businessConfig.address)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center ml-4 pr-4 py-3 border-b border-white/[0.08] active:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-gradient-to-b from-[#47A1FF] to-[#0A84FF] flex items-center justify-center mr-4 shrink-0 shadow-sm">
                    <MapPin className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[17px] font-medium tracking-tight text-white">Dirección</span>
                  </div>
                  <span className="text-[17px] tracking-tight text-[#8E8E93] truncate max-w-[150px]">{businessConfig.address}</span>
                  <ChevronRight className="w-5 h-5 text-white/30 ml-2" />
                </a>

                <div className="flex items-center ml-4 pr-4 py-3 border-b border-white/[0.08]">
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-gradient-to-b from-[#5AC8FA] to-[#32ADE6] flex items-center justify-center mr-4 shrink-0 shadow-sm">
                    <Clock className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[17px] font-medium tracking-tight text-white">Horario</span>
                  </div>
                  <span className="text-[17px] tracking-tight text-[#8E8E93]">L-S {businessConfig.workingHours.start}-{businessConfig.workingHours.end}</span>
                </div>

                <a 
                  href="tel:+34600123456"
                  className="flex items-center ml-4 pr-4 py-3 active:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-gradient-to-b from-[#34C759] to-[#28CD41] flex items-center justify-center mr-4 shrink-0 shadow-sm">
                    <Phone className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[17px] font-medium tracking-tight text-white">Llamar</span>
                  </div>
                  <span className="text-[17px] tracking-tight text-[#8E8E93]">+34 600 123 456</span>
                  <ChevronRight className="w-5 h-5 text-white/30 ml-2" />
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedService && (
        <BookingFlow 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </main>
  );
}
