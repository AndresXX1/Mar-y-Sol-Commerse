import { Booking } from 'src/bookings/schema/booking.schema';
export declare class createproductsDto {
    name: string;
    booking: Booking[];
    location: string;
    equipment: string[];
    type: string[];
    floorNumber: number;
    plans: string;
    description: string;
    images: string[];
    state: string;
}
