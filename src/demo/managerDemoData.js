/* ================= APPROVED REQUESTS ================= */
export const demoApprovedRequests = [
  {
    _id: "req101",
    user: {
      name: "User Demo",
      email: "user@demo.com",
    },
    itemName: "Arduino Uno",
    quantity: 2,
    project: "IoT Project",
    isReturnable: true,
    returnDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    message: "For testing sensors",
  },
  {
    _id: "req101",
    user: {
      name: "User Demo",
      email: "user@demo.com",
    },
    itemName: "Raspberry Pi 4",
    quantity: 2,
    project: "IoT Project",
    isReturnable: true,
    returnDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    message: "For testing sensors",
  },
];

export const demoItemAvailabilityMap = {
  "Arduino Uno": [
    {
      rackName: "Rack A",
      slotName: "Slot 1",
      slotNumber: 1,
      remaining: 5,
    },
  ],

  // ❌ Item NOT available → triggers purchase button
  "Raspberry Pi 4": [],
}

/* ================= ITEM AVAILABILITY ================= */
export const demoItemAvailability = [
  {
    rackId: "rack1",
    rackName: "Rack A",
    slotId: "slot1",
    slotNumber: 1,
    slotName: "Slot 1",
    remaining: 5,
  },
  {
    rackId: "rack1",
    rackName: "Rack A",
    slotId: "slot2",
    slotNumber: 2,
    slotName: "Slot 2",
    remaining: 2,
  },
];
