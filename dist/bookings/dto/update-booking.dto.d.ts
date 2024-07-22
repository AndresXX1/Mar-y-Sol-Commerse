import { BookingState } from '../enums/bookingState';
export declare class UpdateBookingDto {
    id: string;
    tittle: string;
    startTime: Date;
    endingTime: Date;
    comment: string;
    state: BookingState;
}
