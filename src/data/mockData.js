export const MOCK_IPHONES = [
  {
    id: "1",
    brand: "Apple",
    model: "iPhone 15 Pro",
    capacity: "256GB",
    color: "Natural Titanium",
    imei: "358291002233445",
    batteryLevel: 100,
    faceId: "OK",
    condition: "Scellé",
    purchasePrice: 750000,
    sellingPrice: 950000,
    status: "Disponible",
    createdAt: "2024-01-10T10:00:00Z",
    defects: [],
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1695048133062-8495f5903b71?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1695048132717-5784ea3751a0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "2",
    brand: "Apple",
    model: "iPhone 13",
    capacity: "128GB",
    color: "Midnight",
    imei: "359922001144556",
    batteryLevel: 88,
    faceId: "OK",
    condition: "Occasion",
    purchasePrice: 280000,
    sellingPrice: 380000,
    status: "Disponible",
    createdAt: "2024-01-12T14:30:00Z",
    defects: ["rayure_legere_ecran"],
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591337676887-a217a6970c8a?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "3",
    brand: "Apple",
    model: "iPhone 11",
    capacity: "64GB",
    color: "White",
    imei: "351122009988776",
    batteryLevel: 82,
    faceId: "Defectueux",
    condition: "Occasion",
    purchasePrice: 150000,
    sellingPrice: 220000,
    status: "Vendu",
    createdAt: "2024-01-05T09:15:00Z",
    defects: ["fissure_arriere"],
    images: [
      "https://images.unsplash.com/photo-1574315042633-89d5f00e2387?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "4",
    brand: "Samsung",
    model: "Galaxy S23 Ultra",
    capacity: "512GB",
    color: "Phantom Black",
    imei: "357711223344556",
    batteryLevel: 95,
    faceId: "OK",
    condition: "Occasion",
    purchasePrice: 450000,
    sellingPrice: 600000,
    status: "Disponible",
    createdAt: "2024-01-15T11:00:00Z",
    defects: [],
    images: [
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1678911820194-e3c79e65839b?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "5",
    brand: "Samsung",
    model: "Galaxy A54",
    capacity: "128GB",
    color: "Awesome Violet",
    imei: "351122334455667",
    batteryLevel: 100,
    faceId: "OK",
    condition: "Scellé",
    purchasePrice: 150000,
    sellingPrice: 210000,
    status: "Disponible",
    createdAt: "2024-01-16T09:00:00Z",
    defects: [],
    images: [
      "https://images.unsplash.com/photo-1679051390466-99b3d9021e15?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

export const MOCK_CUSTOMERS = [
  { id: "c1", name: "Moussa Diop", phone: "+221 77 123 45 67", totalPurchases: 2, notes: "Client fidèle, préfère le paiement cash." },
  { id: "c2", name: "Fatou Kane", phone: "+221 78 987 65 43", totalPurchases: 1, notes: "A pris à crédit, bon payeur." },
  { id: "c3", name: "Ibrahim Traoré", phone: "+223 66 111 22 33", totalPurchases: 0, notes: "Potentiel client pour iPhone 15." }
];

export const MOCK_SALES = [
  { id: "s1", customerId: "c1", iphoneId: "3", amount: 220000, totalAmount: 220000, paidAmount: 220000, date: "2024-01-05", paymentType: "Cash", status: "Payé" },
  { id: "s2", customerId: "c2", iphoneId: "2", amount: 380000, totalAmount: 380000, paidAmount: 150000, date: "2024-01-12", paymentType: "Crédit", status: "Partiel" }
];

export const MOCK_STATS = {
  totalStock: 5,
  totalSalesMonth: 370000,
  pendingCredits: 230000,
  recentSales: [
    { date: "05 Jan", amount: 220000 },
    { date: "12 Jan", amount: 150000 }
  ]
};
