const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const cancelBooking = async (vehicleNumber: string) => {
    const res = await fetch(`${SERVER_BASE_URL}/api/leavingSlot`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            vehicleId: vehicleNumber,
        }),
    });
    const data = await res.json();
    console.log(data);
    let allBookings = JSON.parse(localStorage.getItem("bookings") as string);
    // @ts-ignore
    allBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));
};
