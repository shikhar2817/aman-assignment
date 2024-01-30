import { Request, Response } from "express";
import mongoose from "mongoose";
import { parseBookingId } from "./utils";

const parkingSlot = new mongoose.Schema({
    floor: { type: Number, default: 1 },
    slot: { type: Number, default: 1 },
    weight: { type: Number, default: 1 }, // 1 - S, 2 - M, 3 - L, X - 4,
    bayId: { type: String }, // size and slot no. S1, S1, L1, L2
    occupied: { type: Boolean, default: false },
    vehicleId: { type: String, default: "" }, // UP78 SS 8899
});

const vehicle = new mongoose.Schema({
    vehicleId: { type: String },
    weight: { type: Number, default: 1 }, // 1 - S, 2 - M, 3 - L, X - 4,
});

const ParkingSlot = mongoose.model("ParkingSlot", parkingSlot);
const Vehicle = mongoose.model("Vehicle", vehicle);

// Ensure there is only one parking lot in the database (1200 parking slots)
const createDefaultParkingLot = async () => {
    const alrealyBuild = await ParkingSlot.find();
    if (alrealyBuild.length !== 0) return;
    const parkingSlots = [];
    for (let floor = 1; floor <= 3; floor++) {
        // for small size vehicle
        for (let i = 1; i <= 100; ++i) {
            const PL = new ParkingSlot({
                floor: floor,
                slot: i,
                weight: 1,
                bayId: `S${i}`,
            });
            parkingSlots.push(PL);
        }

        // for medium size vehicle
        for (let i = 1; i <= 100; ++i) {
            const PL = new ParkingSlot({
                floor: floor,
                slot: i,
                weight: 2,
                bayId: `M${i}`,
            });
            parkingSlots.push(PL);
        }

        // for large size vehicle
        for (let i = 1; i <= 100; ++i) {
            const PL = new ParkingSlot({
                floor: floor,
                slot: i,
                weight: 3,
                bayId: `L${i}`,
            });
            parkingSlots.push(PL);
        }

        // for Xlarge size vehicle
        for (let i = 1; i <= 100; ++i) {
            const PL = new ParkingSlot({
                floor: floor,
                slot: i,
                weight: 4,
                bayId: `X${i}`,
            });
            parkingSlots.push(PL);
        }
    }
    await ParkingSlot.insertMany(parkingSlots).then(() => {
        console.log("Parking Slots Created");
    });
};
createDefaultParkingLot();

export const bookSlot = async (req: Request, res: Response) => {
    const { weight, vehicleId } = req.body;
    try {
        const parkingSlots = await ParkingSlot.findOneAndUpdate(
            { occupied: false, weight: { $gte: weight } },
            { occupied: true, vehicleId: vehicleId },
            { new: true }
        ); // if slotWeight >= vehicleWeight

        if (!parkingSlots) {
            return res.status(200).send({ message: "No Slot Found" });
        }

        return res.status(200).send({ parkingSlots, bookingId: `${parkingSlots.floor}:${parkingSlots.bayId}` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const leavingSlot = async (req: Request, res: Response) => {
    const { bookingId, vehicleId } = req.body;
    try {
        if (vehicleId) {
            const parkingSlots = await ParkingSlot.findOneAndUpdate(
                { occupied: true, vehicleId: vehicleId },
                { occupied: false, vehicleId: "" },
                { new: true }
            );
            if (parkingSlots) return res.status(200).send({ message: "Booking Removed, Slot is available again!" });
            return res.status(200).send({ message: "Vehicle Not Found" });
        }

        const { floor, bayId } = parseBookingId(bookingId);
        const parkingSlots = await ParkingSlot.findOneAndUpdate(
            { occupied: true, floor: floor, bayId: bayId },
            { occupied: false, vehicleId: "" },
            { new: true }
        );

        if (!parkingSlots) return res.status(200).send({ message: "No Slot Found" });

        return res.status(200).send({ message: "Booking Removed, Slot is available again!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// what you can more do
// vechical number validation - vehicle no should be unique
