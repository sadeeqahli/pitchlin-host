import { create } from "zustand";

export const usePitchStore = create((set, get) => ({
  // Dashboard data
  todayStats: {
    revenue: 175,
    bookings: 8,
    activeHours: 12,
    utilization: 75,
  },

  // Pitches data
  pitches: [
    {
      id: 1,
      name: "Main Field",
      type: "5-a-side",
      status: "available",
      hourlyRate: 25,
      location: "North Block",
      facilities: ["Floodlights", "Changing Room"],
      image: null,
    },
    {
      id: 2,
      name: "Training Ground",
      type: "7-a-side",
      status: "inactive",
      hourlyRate: 35,
      location: "South Block",
      facilities: ["Floodlights", "Parking"],
      image: null,
    },
    {
      id: 3,
      name: "Elite Pitch",
      type: "11-a-side",
      status: "available",
      hourlyRate: 50,
      location: "East Block",
      facilities: ["Floodlights", "Changing Rooms", "Parking"],
      image: null,
    },
  ],

  // Bookings data
  bookings: [
    {
      id: 1,
      pitchId: 1,
      pitchName: "Main Field",
      customerName: "John Smith",
      date: new Date().toISOString().split("T")[0],
      startTime: "19:00",
      endTime: "20:00",
      status: "confirmed",
      amount: 25,
      paymentStatus: "paid",
    },
    {
      id: 2,
      pitchId: 2,
      pitchName: "Training Ground",
      customerName: "Football Club A",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      startTime: "18:00",
      endTime: "20:00",
      status: "pending",
      amount: 70,
      paymentStatus: "pending",
    },
    {
      id: 3,
      pitchId: 3,
      pitchName: "Elite Pitch",
      customerName: "Premier League Academy",
      date: new Date().toISOString().split("T")[0],
      startTime: "15:00",
      endTime: "17:00",
      status: "confirmed",
      amount: 100,
      paymentStatus: "paid",
    },
  ],

  // Payments data
  payments: [
    {
      id: 1,
      bookingId: 1,
      amount: 25,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      customerName: "John Smith",
      method: "card",
    },
    {
      id: 2,
      bookingId: 2,
      amount: 70,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "pending",
      customerName: "Football Club A",
      method: "cash",
    },
    {
      id: 3,
      bookingId: 3,
      amount: 100,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      customerName: "Premier League Academy",
      method: "card",
    },
  ],

  // Recent activity
  recentActivity: [
    {
      id: 1,
      bookingId: 3,
      type: "booking",
      message: "New booking for Elite Pitch",
      time: "2 hours ago",
      amount: 100,
      date: new Date().toISOString().split("T")[0],
      customerName: "Premier League Academy",
    },
    {
      id: 2,
      bookingId: 1,
      type: "payment",
      message: "Payment received from John Smith",
      time: "4 hours ago",
      amount: 25,
      date: new Date().toISOString().split("T")[0],
      customerName: "John Smith",
    },
  ],

  // Actions
  addPitch: (pitch) =>
    set((state) => ({
      pitches: [...state.pitches, { ...pitch, id: Date.now() }],
    })),

  updatePitch: (id, updates) =>
    set((state) => ({
      pitches: state.pitches.map((pitch) =>
        pitch.id === id ? { ...pitch, ...updates } : pitch,
      ),
    })),

  deletePitch: (id) =>
    set((state) => ({
      pitches: state.pitches.filter((pitch) => pitch.id !== id),
    })),

  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, { ...booking, id: Date.now() }],
    })),

  updateBooking: (id, updates) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id ? { ...booking, ...updates } : booking,
      ),
    })),

  updateTodayStats: (stats) =>
    set((state) => ({
      todayStats: { ...state.todayStats, ...stats },
    })),

  addActivity: (activity) =>
    set((state) => ({
      recentActivity: [
        { ...activity, id: Date.now() },
        ...state.recentActivity.slice(0, 9),
      ],
    })),

  // Add the missing getRevenueStats function
  getRevenueStats: () => {
    const { payments } = get();
    const today = new Date().toISOString().split("T")[0];
    
    // Calculate today's revenue
    const todayRevenue = payments
      .filter(payment => payment.date === today && payment.status === "completed")
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    // Calculate weekly revenue (7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyRevenue = payments
      .filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= oneWeekAgo && payment.status === "completed";
      })
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    // Calculate monthly revenue (30 days)
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    const monthlyRevenue = payments
      .filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= oneMonthAgo && payment.status === "completed";
      })
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    return {
      today: todayRevenue,
      weekly: weeklyRevenue,
      monthly: monthlyRevenue
    };
  },
}));