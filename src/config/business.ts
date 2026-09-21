export const businessConfig = {
  name: "Barbería Clásica Premium",
  description: "Cortes modernos y arreglos de barba tradicionales en un ambiente inigualable.",
  address: "Calle Mayor 123, Madrid",
  rating: 4.8,
  reviewsCount: 342,
  image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  services: [
    {
      id: "s1",
      name: "Corte Clásico",
      description: "Corte a tijera o máquina con lavado y peinado.",
      price: 18,
      durationMinutes: 45,
      category: "Cortes"
    },
    {
      id: "s2",
      name: "Degradado (Fade)",
      description: "Corte degradado a navaja o máquina al cero.",
      price: 20,
      durationMinutes: 45,
      category: "Cortes"
    },
    {
      id: "s3",
      name: "Arreglo de Barba con Navaja",
      description: "Perfilado y rebajado de barba con toalla caliente y navaja.",
      price: 15,
      durationMinutes: 30,
      category: "Barba"
    },
    {
      id: "s4",
      name: "Corte + Barba Premium",
      description: "El combo perfecto: corte clásico o fade junto a un arreglo de barba completo.",
      price: 32,
      durationMinutes: 75,
      category: "Combos"
    }
  ],
  professionals: [
    {
      id: "p1",
      name: "Carlos",
      role: "Maestro Barbero",
      avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p2",
      name: "David",
      role: "Especialista en Fade",
      avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ],
  workingHours: {
    start: "10:00",
    end: "20:00",
    intervalMinutes: 30
  }
};
