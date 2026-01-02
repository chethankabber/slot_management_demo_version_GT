export const demoUser = {
    id: "user1",
    name: "User Demo",
    email: "user@demo.com",
    role: "user",
    joined: new Date("2024-01-10"),
};

export const demoRequests = [
  {
    _id: "req1",
    itemName: "Capacitor 100uF",
    quantity: 3,
    project: "IoT Project",
    isReturnable: true,
    returnDate: new Date(Date.now() + 4 * 86400000)
      .toISOString()
      .split("T")[0],
    status: "approved",
    takenDate: new Date().toISOString().split("T")[0],
  },
  {
    _id: "req2",
    itemName: "Resistor 10k",
    quantity: 10,
    project: "Electronics Lab",
    isReturnable: false,
    status: "non-returnable",
    takenDate: new Date().toISOString().split("T")[0],
    returnDate: "-",
  },
];


export const demoHistory = [
    {
        borrowId: "b1",
        itemName: "Resistor 10k",
        project: "IoT Project",
        quantity: 1,
        takenDate: new Date().toISOString().split("T")[0],
        returnDate: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],

        status: "not-returned",
    },
     {
        borrowId: "b2",
        itemName: "Motherboard ASUS",
        project: "Slot Project",
        quantity: 1,
        takenDate: new Date().toISOString().split("T")[0],
        returnDate: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],

        status: "returned",
    },
];


