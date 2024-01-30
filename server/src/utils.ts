export const parseBookingId = (bookingId: string) => {
    const [floor, bayId] = bookingId.split(":");
    console.log("Floor: ", floor);
    console.log("BayId :", bayId);
    return { floor, bayId };
};
