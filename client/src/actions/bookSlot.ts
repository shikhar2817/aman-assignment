const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const bookSlot = async (weight: number, vehicleNumber: string) => {
    const res = await fetch(`${SERVER_BASE_URL}/api/bookslot`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            vehicleId: vehicleNumber,
            weight: weight,
        }),
    });
    const data = await res.json();
    console.log(data);
    const booking = {
        vehicleId: data.parkingSlots.vehicleId,
        bookingId: data.bookingId,
    };
    if (!data.message) {
        let allBookings = JSON.parse(localStorage.getItem("bookings") as string);
        allBookings.push(booking);
        localStorage.setItem("bookings", JSON.stringify(allBookings));
    }
    return data;
};
