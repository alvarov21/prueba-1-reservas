"use client";

import { useState } from "react";
import { businessConfig } from "@/config/business";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, CheckCircle2 } from "lucide-react";

interface BookingFlowProps {
  service: typeof businessConfig.services[0];
  onClose: () => void;
}

export default function BookingFlow({ service, onClose }: BookingFlowProps) {
  const [step, setStep] = useState<"professional" | "datetime" | "confirm" | "success">("professional");
  const [selectedProfessional, setSelectedProfessional] = useState<typeof businessConfig.professionals[0] | { name: string, id: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const generateTimes = () => {
    const times = [];
    let current = 10;
    while (current < 20) {
      times.push(`${current}:00`);
      times.push(`${current}:30`);
      current++;
    }
    return times;
  };
  const availableTimes = generateTimes();

  const handleProfessionalSelect = (prof: typeof businessConfig.professionals[0] | { name: string, id: string }) => {
    setSelectedProfessional(prof);
    setStep("datetime");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("success");
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md w-full h-[90vh] sm:h-[80vh] p-0 flex flex-col overflow-hidden bg-black border-none rounded-t-[10px] sm:rounded-[10px] gap-0">
        
        {/* iOS Navigation Bar */}
        <DialogHeader className="p-4 border-b border-[#38383A] bg-[#1C1C1E] flex flex-row items-center justify-between sticky top-0 z-10 shrink-0">
          {step !== "success" ? (
            <button 
              onClick={() => {
                if (step === "datetime") setStep("professional");
                else if (step === "confirm") setStep("datetime");
                else onClose();
              }}
              className="text-[#0A84FF] text-[17px] font-normal tracking-tight active:opacity-50"
            >
              {step === "professional" ? "Cancelar" : "Atrás"}
            </button>
          ) : (
            <div className="w-16" /> /* Placeholder for balance */
          )}
          
          <DialogTitle className="text-[17px] font-semibold text-white absolute left-1/2 -translate-x-1/2">
            {step === "professional" && "Elige barbero"}
            {step === "datetime" && "Fecha y hora"}
            {step === "confirm" && "Confirmar"}
            {step === "success" && "¡Completado!"}
          </DialogTitle>
          <DialogDescription className="sr-only">Flujo de reserva</DialogDescription>
          
          <div className="w-16" /> {/* Placeholder for right button to maintain center alignment */}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-black p-4">
          
          {step === "professional" && (
            <div className="space-y-6">
              <h2 className="text-[22px] font-bold tracking-tight mb-2 ml-2">¿Con quién?</h2>
              <div className="bg-[#1C1C1E] rounded-[10px] overflow-hidden">
                <div 
                  className="flex items-center ml-4 pr-4 py-3 border-b border-white/10 cursor-pointer active:bg-white/10"
                  onClick={() => handleProfessionalSelect({ name: "Cualquiera", id: "any" })}
                >
                  <div className="w-14 h-14 rounded-full bg-[#32ADE6] flex items-center justify-center mr-4 shrink-0">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-normal text-[17px] text-white">Cualquiera</h3>
                    <p className="text-[15px] text-[#8E8E93]">Máxima disponibilidad</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#3A3A3C]" />
                </div>

                {businessConfig.professionals.map((prof, index) => (
                  <div 
                    key={prof.id}
                    className={`flex items-center ml-4 pr-4 py-3 cursor-pointer active:bg-white/10 ${index !== businessConfig.professionals.length - 1 ? 'border-b border-white/10' : ''}`}
                    onClick={() => handleProfessionalSelect(prof)}
                  >
                    <Avatar className="w-14 h-14 mr-4 shrink-0">
                      <AvatarImage src={prof.avatar} className="object-cover" />
                      <AvatarFallback>{prof.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-normal text-[17px] text-white">{prof.name}</h3>
                      <p className="text-[15px] text-[#8E8E93]">{prof.role}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#3A3A3C]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "datetime" && (
            <div className="space-y-6 pb-8">
              <h2 className="text-[22px] font-bold tracking-tight mb-2 ml-2">Día de la cita</h2>
              
              <div className="bg-[#1C1C1E] rounded-[10px] p-2 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-none text-white w-full max-w-[300px]"
                />
              </div>
              
              <h2 className="text-[22px] font-bold tracking-tight mb-2 ml-2 mt-6">Hora</h2>
              <div className="bg-[#1C1C1E] rounded-[10px] overflow-hidden">
                <ScrollArea className="h-64 w-full">
                  {availableTimes.map((time, index) => (
                    <div
                      key={time}
                      className={`flex items-center justify-between ml-4 pr-4 py-3 cursor-pointer active:bg-white/10 ${index !== availableTimes.length - 1 ? 'border-b border-white/10' : ''}`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      <span className="text-[17px] text-white font-normal">{time}</span>
                      <ChevronRight className="w-5 h-5 text-[#3A3A3C]" />
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-6">
              <h2 className="text-[22px] font-bold tracking-tight mb-2 ml-2">Resumen</h2>
              
              <div className="bg-[#1C1C1E] rounded-[10px] overflow-hidden">
                <div className="flex justify-between items-center ml-4 pr-4 py-3 border-b border-white/10">
                  <span className="text-[17px] text-white font-normal">Servicio</span>
                  <span className="text-[17px] text-[#8E8E93] truncate max-w-[180px]">{service.name}</span>
                </div>
                <div className="flex justify-between items-center ml-4 pr-4 py-3 border-b border-white/10">
                  <span className="text-[17px] text-white font-normal">Profesional</span>
                  <span className="text-[17px] text-[#8E8E93]">{selectedProfessional?.name}</span>
                </div>
                <div className="flex justify-between items-center ml-4 pr-4 py-3 border-b border-white/10">
                  <span className="text-[17px] text-white font-normal">Día y Hora</span>
                  <span className="text-[17px] text-[#8E8E93]">
                    {selectedDate?.toLocaleDateString()} a las {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between items-center ml-4 pr-4 py-3">
                  <span className="text-[17px] text-white font-semibold">Total a pagar en local</span>
                  <span className="text-[17px] text-primary font-semibold">{service.price}€</span>
                </div>
              </div>
              
              <h2 className="text-[22px] font-bold tracking-tight mb-2 ml-2 mt-6">Tus Datos</h2>
              <div className="bg-[#1C1C1E] rounded-[10px] overflow-hidden">
                <div className="flex items-center ml-4 pr-4 py-3 border-b border-white/10">
                  <span className="text-[17px] text-white w-24">Nombre</span>
                  <input 
                    type="text" 
                    placeholder="Tu nombre completo" 
                    className="flex-1 bg-transparent text-[17px] text-white focus:outline-none placeholder:text-[#8E8E93]"
                  />
                </div>
                <div className="flex items-center ml-4 pr-4 py-3">
                  <span className="text-[17px] text-white w-24">Teléfono</span>
                  <input 
                    type="tel" 
                    placeholder="+34" 
                    className="flex-1 bg-transparent text-[17px] text-white focus:outline-none placeholder:text-[#8E8E93]"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={handleConfirm} 
                  className="w-full bg-[#0A84FF] text-white font-semibold text-[17px] py-3.5 rounded-[10px] active:bg-[#007AFF] transition-colors"
                >
                  Confirmar cita
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center py-20 px-4">
              <div className="w-20 h-20 bg-[#34C759] rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-[28px] font-bold tracking-tight">¡Confirmada!</h3>
              <p className="text-[17px] text-[#8E8E93] mb-8">
                Tienes tu cita con {selectedProfessional?.name} el {selectedDate?.toLocaleDateString()} a las {selectedTime}. Te hemos enviado un SMS con los detalles.
              </p>
              <button 
                onClick={onClose} 
                className="w-full bg-[#1C1C1E] text-white font-semibold text-[17px] py-3.5 rounded-[10px] active:bg-[#2C2C2E] transition-colors mt-8"
              >
                Volver
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
