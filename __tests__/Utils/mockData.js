
export const parkingSpace = {
    id: 5,
    name: "Parking",
    area: "Space",
    title: "Parking Space Title",
    parkingSlots: [{id: 1, name: "Parking Slot", price: 300}]
};

export const vehicularSpace = {
    id: 2,
    name: "Vehicular",
    area: "Space",
    title: "Vehicular Space",
    vehicularSpaces: [{id: 1, name: "Vehicular Space Slot", price: 200}]
};

export const area = {
    id: 1,
    name: "Area",
    parkingSlots: [parkingSpace]
};