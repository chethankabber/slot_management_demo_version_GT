/* ================= RACKS ================= */
export const demoContainers = [
  {
    _id: "rack1",
    id: "rack1",
    rackName: "Rack A",
    capacity: 10,
    slots: [
      {
        slotId: "slot1",
        slotNumber: 1,
        items: [
          {
            itemId: "item1",
            itemName: "Arduino Uno",
            total: 10,
            remaining: 4,
          },
        ],
      },
      {
        slotId: "slot2",
        slotNumber: 2,
        items: [],
      },
    ],
  },
  {
    _id: "rack2",
    id: "rack2",
    rackName: "Rack B",
    capacity: 10,
    slots: [
      {
        slotId: "slot1",
        slotNumber: 1,
        items: [
          {
            itemId: "item1",
            itemName: "Capacitor 100uF",
            total: 10,
            remaining: 4,
          },
        ],
      },
      {
        slotId: "slot2",
        slotNumber: 2,
        items: [],
      },
    ],
  },
  {
    _id: "rack3",
    id: "rack3",
    rackName: "Rack C",
    capacity: 10,
    slots: [
      {
        slotId: "slot1",
        slotNumber: 1,
        items: [
          {
            itemId: "item1",
            itemName: "Resistor 10k",
            total: 10,
            remaining: 4,
          },
        ],
      },
      {
        slotId: "slot2",
        slotNumber: 2,
        items: [],
      },
    ],
  },
];

/* ================= PERMISSION REQUESTS ================= */
export const demoPermissionRequests = [
  {
    _id: "req1",
    user: {
      name: "User Demo",
      email: "user@demo.com",
    },
    itemName: "Arduino Uno",
    project: "IoT Project",
    quantity: 1,
    requestDate: new Date().toISOString(),
    isReturnable: true,
    returnDate: new Date(Date.now() + 4 * 86400000).toISOString(),
    status: "pending",
  },
  {
    _id: "req2",
    user: {
      name: "User Demo",
      email: "user@demo.com",
    },
    itemName: "Resistor 10k",
    project: "Electronics Lab",
    quantity: 10,
    requestDate: new Date().toISOString(),
    isReturnable: false,
    status: "pending",
  },
];

/* ================= LOW STOCK ================= */
export const demoLowStock = [
  {
    itemName: "Capacitor 100uF",
    remaining: 2,
    rackName: "Rack A",
    slotName: "Slot 1",
    slotNumber: 1,
    rackId: "rack1",
    slotId: "slot1",
  },
  {
    itemName: "NPN Transistor",
    remaining: 2,
    rackName: "Rack A",
    slotName: "Slot 1",
    slotNumber: 1,
    rackId: "rack1",
    slotId: "slot1",
  },
];

/* ================= DUE DATES ================= */
export const demoDueDates = [
  {
    borrowId: "b1",
    itemName: "Arduino Uno",
    userName: "User Demo",
    takenDate: new Date().toISOString(),
    returnDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    daysLeft: 3,
    overdueDays: 0,
  },
  {
    borrowId: "b2",
    itemName: "Copper Wire",
    userName: "User Demo",
    takenDate: new Date().toISOString(),
    returnDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    daysLeft: 0,
    overdueDays: 3,
  },
];

/* ================= PURCHASE ITEMS ================= */
export const demoPurchaseItems = [
  {
    _id: "p1",
    name: "Breadboard",
    qty: 5,
    description: "optional notes",
  },
   {
    _id: "p2",
    name: "Notebook",
    qty: 5,
    description: "For taking notes during experiments",
  },
];
