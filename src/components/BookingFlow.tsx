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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

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
    if (!formData.name || !formData.phone) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 1500);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      {/* iOS 17 Sheet has rounded-t-[32px] and is slightly pulled down from the top */}
      <DialogContent className="sm:max-w-md w-full h-[92vh] sm:h-[85vh] p-0 flex flex-col overflow-hidden bg-[#000000] border-none rounded-t-[32px] sm:rounded-[32px] gap-0 font-[system-ui,-apple-system,sans-serif]">
        
        {/* iOS Sheet Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 bg-[#1C1C1E]">
          <div className="w-10 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* Translucent Navigation Bar */}
        <DialogHeader className="px-4 py-3 bg-[#1C1C1E]/95 backdrop-blur-xl flex flex-row items-center justify-between sticky top-0 z-10 shrink-0 shadow-sm border-b border-white/[0.08]">
          {step !== "success" ? (
            <button 
              onClick={() => {
                if (step === "datetime") setStep("professional");
                else if (step === "confirm") setStep("datetime");
                else onClose();
              }}
              className="text-[#0A84FF] text-[17px] font-normal tracking-tight active:opacity-50"
              disabled={isSubmitting}
            >
              {step === "professional" ? "Cancelar" : "Atrás"}
            </button>
          ) : (
            <div className="w-20" />
          )}
          
          <DialogTitle className="text-[17px] font-semibold text-white tracking-tight absolute left-1/2 -translate-x-1/2">
            {step === "professional" && "Elige barbero"}
            {step === "datetime" && "Fecha y hora"}
            {step === "confirm" && "Confirmar cita"}
            {step === "success" && "¡Completado!"}
          </DialogTitle>
          <DialogDescription className="sr-only">Flujo de reserva</DialogDescription>
          
          <div className="w-20 flex justify-end">
             {/* Optional top-right action button in iOS */}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-[#000000] p-4 relative">
          {isSubmitting && (
             <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-md">
                <div className="w-9 h-9 border-4 border-white/20 border-t-[#0A84FF] rounded-full animate-spin"></div>
             </div>
          )}
          
          {step === "professional" && (
            <div className="space-y-6 pb-8">
              <h2 className="text-[34px] font-bold tracking-tight mb-4 ml-2 mt-2 leading-tight">¿Con quién?</h2>
              <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden">
                <div 
                  className="flex items-center ml-4 pr-4 py-3.5 border-b border-white/[0.08] cursor-pointer active:bg-white/10 transition-colors"
                  onClick={() => handleProfessionalSelect({ name: "Cualquiera", id: "any" })}
                >
                  <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#5AC8FA] to-[#32ADE6] flex items-center justify-center mr-4 shrink-0">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[17px] tracking-tight text-white">Cualquiera</h3>
                    <p className="text-[14px] tracking-tight text-[#8E8E93]">Máxima disponibilidad</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30" />
                </div>

                {businessConfig.professionals.map((prof, index) => (
                  <div 
                    key={prof.id}
                    className={`flex items-center ml-4 pr-4 py-3.5 cursor-pointer active:bg-white/10 transition-colors ${index !== businessConfig.professionals.length - 1 ? 'border-b border-white/[0.08]' : ''}`}
                    onClick={() => handleProfessionalSelect(prof)}
                  >
                    <Avatar className="w-[50px] h-[50px] mr-4 shrink-0 border border-white/5">
                      <AvatarImage src={prof.avatar} className="object-cover" />
                      <AvatarFallback>{prof.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-[17px] tracking-tight text-white">{prof.name}</h3>
                      <p className="text-[14px] tracking-tight text-[#8E8E93]">{prof.role}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "datetime" && (
            <div className="space-y-8 pb-10">
              <div>
                <h2 className="text-[28px] font-bold tracking-tight mb-4 ml-2 mt-2">Día</h2>
                <div className="bg-[#1C1C1E] rounded-2xl p-3 flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-none text-white w-full max-w-[320px]"
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-[28px] font-bold tracking-tight mb-4 ml-2">Hora</h2>
                <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden">
                  <ScrollArea className="h-[280px] w-full">
                    {availableTimes.map((time, index) => (
                      <div
                        key={time}
                        className={`flex items-center justify-between ml-4 pr-4 py-3.5 cursor-pointer active:bg-white/10 transition-colors ${index !== availableTimes.length - 1 ? 'border-b border-white/[0.08]' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <span className="text-[17px] text-white font-medium tracking-tight">{time}</span>
                        <ChevronRight className="w-5 h-5 text-white/30" />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-8 pb-10">
              <h2 className="text-[34px] font-bold tracking-tight mb-2 ml-2 mt-2 leading-tight">Confirmar</h2>
              
              <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden">
                <div className="flex justify-between items-center ml-4 pr-4 py-3.5 border-b border-white/[0.08]">
                  <span className="text-[17px] text-white font-medium tracking-tight">Servicio</span>
                  <span className="text-[17px] text-[#8E8E93] tracking-tight truncate max-w-[180px]">{service.name}</span>
                </div>
                <div className="flex justify-between items-center ml-4 pr-4 py-3.5 border-b border-white/[0.08]">
                  <span className="text-[17px] text-white font-medium tracking-tight">Profesional</span>
                  <span className="text-[17px] text-[#8E8E93] tracking-tight">{selectedProfessional?.name}</span>
                </div>
                <div className="flex justify-between items-center ml-4 pr-4 py-3.5 border-b border-white/[0.08]">
                  <span className="text-[17px] text-white font-medium tracking-tight">Fecha</span>
                  <span className="text-[17px] text-[#8E8E93] tracking-tight">
                    {selectedDate?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center ml-4 pr-4 py-3.5 border-b border-white/[0.08]">
                  <span className="text-[17px] text-white font-medium tracking-tight">Hora</span>
                  <span className="text-[17px] text-[#8E8E93] tracking-tight">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between items-center ml-4 pr-4 py-3.5 bg-white/[0.02]">
                  <span className="text-[17px] text-white font-bold tracking-tight">Total (en local)</span>
                  <span className="text-[17px] text-white font-bold tracking-tight">{service.price}€</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-[15px] font-medium tracking-tight text-[#8E8E93] mb-2 ml-4 uppercase">Tus Datos</h3>
                <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden">
                  <div className="flex items-center ml-4 pr-4 py-3.5 border-b border-white/[0.08]">
                    <span className="text-[17px] text-white font-medium tracking-tight w-24">Nombre</span>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Tu nombre completo" 
                      className="flex-1 bg-transparent text-[17px] tracking-tight text-white focus:outline-none placeholder:text-[#8E8E93]/60"
                    />
                  </div>
                  <div className="flex items-center ml-4 pr-4 py-3.5">
                    <span className="text-[17px] text-white font-medium tracking-tight w-24">Teléfono</span>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+34" 
                      className="flex-1 bg-transparent text-[17px] tracking-tight text-white focus:outline-none placeholder:text-[#8E8E93]/60"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 px-2">
                <button 
                  onClick={handleConfirm} 
                  disabled={!formData.name || !formData.phone || isSubmitting}
                  className="w-full bg-[#0A84FF] disabled:bg-[#0A84FF]/30 disabled:text-white/40 text-white font-bold tracking-tight text-[17px] py-4 rounded-xl active:bg-[#007AFF] transition-all transform active:scale-[0.98]"
                >
                  Confirmar reserva
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center py-20 px-4 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-gradient-to-b from-[#34C759] to-[#28CD41] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-900/50">
                <CheckCircle2 className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-[34px] font-bold tracking-tight leading-tight">¡Reserva <br/>Confirmada!</h3>
              <p className="text-[17px] tracking-tight text-[#8E8E93] mb-8 mt-2 max-w-[280px]">
                Te esperamos el {selectedDate?.toLocaleDateString()} a las {selectedTime} con {selectedProfessional?.name}.
              </p>
              <button 
                onClick={onClose} 
                className="w-full bg-[#1C1C1E] text-[#0A84FF] font-bold tracking-tight text-[17px] py-4 rounded-xl active:bg-[#2C2C2E] transition-colors mt-12"
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
