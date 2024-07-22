/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/aggregate" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/callback" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/collection" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/connection" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/cursor" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/document" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/error" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/expressions" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/helpers" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/middlewares" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/indexes" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/models" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/pipelinestage" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/populate" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/query" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/schemaoptions" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/schematypes" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/session" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/types" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/utility" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/validation" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/virtuals" />
/// <reference types="mongoose-sequence/node_modules/mongoose" />
/// <reference types="mongoose-sequence" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/inferschematype" />
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { IUserRequest } from 'src/common/interfaces/requestUser.interface';
import { BookingHandlerDto } from './dto/booking-handler.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto, user: IUserRequest): Promise<import("mongoose").Document<unknown, {}, import("./schema/booking.schema").Booking> & import("./schema/booking.schema").Booking & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAllBy(filter: string, id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/booking.schema").Booking> & import("./schema/booking.schema").Booking & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    bookingHandler(bookingHandler: BookingHandlerDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/booking.schema").Booking> & import("./schema/booking.schema").Booking & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    UpdateBooking(bookingToUpdate: UpdateBookingDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/booking.schema").Booking> & import("./schema/booking.schema").Booking & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getBookingsByDate(): Promise<{
        Jan: number;
        Feb: number;
        Mar: number;
        Apr: number;
        May: number;
        Jun: number;
        Jul: number;
        Aug: number;
        Sep: number;
        Oct: number;
        Nov: number;
        Dec: number;
        total: number;
        cancel: number;
    }>;
    getBookingsByWeek(): Promise<{
        Sun: number;
        Mon: number;
        Tue: number;
        Wed: number;
        Thu: number;
        Fri: number;
        Sat: number;
        total: number;
        cancel: number;
    }>;
    getBookingsByDay(day: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/booking.schema").Booking> & import("./schema/booking.schema").Booking & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
