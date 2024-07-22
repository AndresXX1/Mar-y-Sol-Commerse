/// <reference types="node" />
import { UUID } from 'crypto';
import { BookingState } from '../enums/bookingState';
export declare class BookingHandlerDto {
    bookingToken: UUID;
    state: BookingState;
}
