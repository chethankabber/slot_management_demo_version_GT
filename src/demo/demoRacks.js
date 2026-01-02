// src/demo/demoRacks.js

export const demoRacks = [
  {
    id: "rack1",
    rackName: "Rack A",
    slots: [
      {
        slotId: "slot1",
        slotNumber: 1,
        slotName: "Slot A1",
        items: [
            {
            itemId: "item1",
            itemName: "Buck Converter Module",
            total: 5,
            remaining: 3,
            itemCategory: "Power Components",
            componentType: "DC-DC Module",
            package: "BGA",
            takenHistory: [
              
            ],
          },
        ],
      },
      {
        slotId: "slot2",
        slotNumber: 2,
        slotName: "Slot A2",
        items: [
          {
            itemId: "item2",
            itemName: "Arduino Uno",
            total: 5,
            remaining: 3,
            itemCategory: "MCU / Processor",
            componentType: "Microcontroller",
            package: "DIP",
            takenHistory: [
              {
                borrowId: "b1",
                userName: "User Demo",
                quantity: 2,
                returnDate: new Date().toISOString(),
              },
            ],
          },
        ],
      },
      {
        slotId: "slot3",
        slotNumber: 3,
        slotName: "Slot A3",
        items: [
               {
            itemId: "item3",
            itemName: "Raspberry Pi 4",
            total: 5,
            remaining: 3,
            itemCategory: "MCU / Processor",
            componentType: "SoC",
            package: "DIP",
            takenHistory: [
              
            ],
          },
        ],
      },
      {
        slotId: "slot4",
        slotNumber: 4,
        slotName: "Slot A4",
        items: [
            {
            itemId: "item4",
            itemName: "Pixel 6",
            total: 5,
            remaining: 3,
            itemCategory: "MCU / Processor",
            componentType: "SoC",
            package: "NAND",
            takenHistory: [
              {
                borrowId: "b1",
                userName: "User Demo",
                quantity: 2,
                returnDate: new Date().toISOString(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rack3",
    rackName: "Rack B",
    slots: [
      {
        slotId: "slot3",
        slotNumber: 5,
        slotName: "C1",
        items: [],
      },
      {
        slotId: "slot2",
        slotNumber: 2,
        slotName: "C2",
        items: [
          {
            itemId: "item2",
            itemName: "Capacitor 100uF",
            total: 2,
            remaining: 3,
            itemCategory: "MCU / Processor",
            componentType: "Microcontroller",
            package: "DIP",
            takenHistory: [
              
            ],
          },
        ],
      },
      {
        slotId: "slot3",
        slotNumber: 3,
        slotName: "C3",
        items: [
          {
            itemId: "item3",
            itemName: "Resister",
            total: 2,
            remaining: 3,
            itemCategory: "MCU / Processor",
            componentType: "Microcontroller",
            package: "DIP",
            takenHistory: [
              
            ],
          },
        ],
      },
      {
        slotId: "slot4",
        slotNumber: 4,
        slotName: "B4",
        items: [],
      },
    ],
  },
  {
    id: "rack2",
    rackName: "Rack C",
    slots: [
      {
        slotId: "slot1",
        slotNumber: 1,
        slotName: "B1",
        items: [],
      },
      {
        slotId: "slot2",
        slotNumber: 2,
        slotName: "B2",
        items: [],
      },
      {
        slotId: "slot3",
        slotNumber: 3,
        slotName: "B3",
        items: [],
      },
      {
        slotId: "slot4",
        slotNumber: 4,
        slotName: "B4",
        items: [],
      },
    ],
  },
  
];
