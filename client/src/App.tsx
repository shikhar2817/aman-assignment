import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import { bookSlot } from "./actions/bookSlot";
import { BookingTicket } from "./components/BookingTicket";
import { cancelBooking } from "./actions/cancelBooking";

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [weight, setWeight] = useState<number>(0);
    const [vehicleNumber, setVehicleNumber] = useState<string>("");
    const [bookings, setBookings] = useState<[]>([]);
    const handleWeightChange = (e: any) => setWeight(Number(e.target.value));
    const handleNumberChange = (e: any) => setVehicleNumber(e.target.value);

    const handleBookSlot = async () => {
        setIsLoading(true);
        const data = await bookSlot(weight, vehicleNumber);
        if (data.message) {
            toast.error(data.message);
            return;
        }
        let newBookings = bookings;
        // @ts-ignore
        newBookings?.push({ bookingId: data.bookingId, vehicleNumber: data.vehicleNumber });
        await setBookings(newBookings);
        console.log(bookings);
        console.log("Data inside", data);
        setIsLoading(false);

        console.log(weight, vehicleNumber);
    };
    const handleCancelBooking = async () => {
        await cancelBooking(vehicleNumber);
        let allBookings = JSON.parse(localStorage.getItem("bookings") as string);
        //@ts-ignore
        let newBookings = allBookings.filter((booking) => {
            if (booking.vehicleNumber === vehicleNumber) return true;
        });
        localStorage.setItem("booking", newBookings);
    };

    useEffect(() => {
        const localdata = localStorage.getItem("bookings");
        if (localdata) setBookings(JSON.parse(localdata));
        else localStorage.setItem("bookings", JSON.stringify([]));
    }, []);
    return (
        <div className="flex flex-col text-center justify-center w-screen h-screen bg-slate-800 overflow-clip">
            <h1 className="text-white font-extrabold text-5xl my-12 animate-pulse">Hey Coach Parking Booking</h1>
            <div className="w-auto md:w-[400px] mx-auto">
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select
                    onChange={handleWeightChange}
                    className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected>Choose Vehicle Size</option>
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3">Large</option>
                    <option value="4">Extra Large</option>
                </select>
            </div>
            <div className="my-6 w-auto md:w-[400px] mx-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Number</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleNumberChange}
                />
            </div>
            <div className="mx-auto">
                <button
                    type="button"
                    className="w-auto md:w-[400px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 my-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-xl"
                    onClick={handleBookSlot}
                >
                    Book Slot
                </button>
            </div>
            <div className="h-[400px] overflow-scroll mt-10">
                {bookings.map((booking) => {
                    return (
                        <div className="sadf">
                            <BookingTicket
                                // @ts-ignore
                                vehicleNumber={booking.vehicleId ?? ""}
                                // @ts-ignore
                                bookingId={booking.bookingId ?? ""}
                            />
                        </div>
                    );
                })}
            </div>
            <ToastContainer />
            {isLoading && <Loader />}
        </div>
    );
}

export default App;
