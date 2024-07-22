"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const booking_schema_1 = require("./schema/booking.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const mailer_service_1 = require("../mailer/mailer.service");
const findBookingBy_enum_1 = require("./enums/findBookingBy.enum");
const bookingState_1 = require("./enums/bookingState");
const date_fns_1 = require("date-fns");
const mongoose_3 = require("mongoose");
let BookingsService = class BookingsService {
    constructor(bookingModel, mailerService) {
        this.bookingModel = bookingModel;
        this.mailerService = mailerService;
    }
    async checkBookings(checkBooking) {
        let isValid = false;
        const { startTime, endingTime } = checkBooking;
        if ((0, date_fns_1.isAfter)(startTime, endingTime)) {
            return true;
        }
        const bookings = await this.bookingModel.find().lean();
        console.log(bookings);
        bookings.forEach((booking) => {
            if ((0, date_fns_1.isWithinInterval)(booking.startTime, {
                start: startTime,
                end: endingTime,
            })) {
                isValid = true;
            }
        });
        return isValid;
    }
    async createBooking(createBookingDto, user) {
        try {
            if (await this.checkBookings(createBookingDto)) {
                throw new common_1.BadRequestException('Bookings already exist');
            }
            console.log(createBookingDto);
            const booking = new this.bookingModel({
                ...createBookingDto,
                bookingToken: (0, uuid_1.v4)(),
                state: bookingState_1.BookingState.Pending,
            });
            const mail = {
                recipients: { name: user.name, address: user.email },
                subject: 'Booking created',
                html: `<p>Hola ${user.name},</p><p>Su reserva ha sido creada exitosamente. Aquí está su token de reserva: <strong>${booking.bookingToken}</strong></p><p>Por favor, lleve este token consigo cuando se presente.</p><p>Saludos,</p><p>El equipo de reservas</p>`,
            };
            await this.mailerService.sendEmail(mail);
            return booking.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findAllBy(filter, id) {
        if (filter in findBookingBy_enum_1.FindBookingBy) {
            if (filter === 'all')
                return await this.bookingModel.find();
            if (!(0, mongoose_3.isValidObjectId)(id)) {
                throw new common_1.BadRequestException('Invalid ObjectId');
            }
            const bookings = await this.bookingModel.find({ [filter]: new mongoose_3.Types.ObjectId(id) });
            if (!bookings.length) {
                throw new common_1.NotFoundException('Bookings not found');
            }
            return bookings;
        }
        else {
            throw new common_1.BadRequestException('Filter not valid, valid filters are user,state,id,day ');
        }
    }
    async BookingsHandler(bookingHandler) {
        try {
            const { bookingToken, state } = bookingHandler;
            const booking = await this.bookingModel.findOne({
                bookingToken: bookingToken,
            });
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            booking.state = state;
            return booking.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateBookingById(bookingToUpdate) {
        try {
            const { id, ...updateFields } = bookingToUpdate;
            console.log(bookingToUpdate);
            const booking = await this.bookingModel.findById(id);
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            return await this.bookingModel.findByIdAndUpdate(id, updateFields, {
                new: true,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getBookingsByMonth() {
        const bookings = await this.bookingModel.find().lean();
        const bookingsSats = {
            Jan: 0,
            Feb: 0,
            Mar: 0,
            Apr: 0,
            May: 0,
            Jun: 0,
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0,
            total: bookings.length,
            cancel: 0,
        };
        bookings.forEach((book) => {
            const month = (0, date_fns_1.format)(book.startTime, 'MMM');
            bookingsSats[month]++;
            book.state === bookingState_1.BookingState.Canceled && bookingsSats.cancel++;
        });
        return bookingsSats;
    }
    async getBookingsThisWeek() {
        const now = new Date();
        const startOfWeekDate = (0, date_fns_1.startOfWeek)(now, { weekStartsOn: 1 });
        const endOfWeekDate = (0, date_fns_1.endOfWeek)(now, { weekStartsOn: 1 });
        startOfWeekDate.setHours(0, 0, 0, 0);
        endOfWeekDate.setHours(23, 59, 59, 999);
        const bookings = await this.bookingModel
            .find({
            startTime: {
                $gte: startOfWeekDate,
                $lte: endOfWeekDate,
            },
        })
            .lean();
        const bookingsStats = {
            Sun: 0,
            Mon: 0,
            Tue: 0,
            Wed: 0,
            Thu: 0,
            Fri: 0,
            Sat: 0,
            total: bookings.length,
            cancel: 0,
        };
        if (!bookings.length) {
            throw new common_1.NotFoundException('Bookings not found');
        }
        bookings.forEach((booking) => {
            const dayStats = (0, date_fns_1.format)(booking.startTime, 'EEE');
            bookingsStats[dayStats]++;
            booking.state === bookingState_1.BookingState.Canceled && bookingsStats.cancel++;
        });
        return bookingsStats;
    }
    async getBookingsByDay(day) {
        console.log(day);
        try {
            const dayToDate = new Date(day);
            if (isNaN(dayToDate.getTime())) {
                throw new common_1.BadRequestException('Invalid date format');
            }
            const formatDate = dayToDate.toISOString().split('T')[0];
            const bookings = await this.bookingModel.find({
                $expr: {
                    $eq: [
                        { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
                        formatDate,
                    ],
                },
            });
            if (!bookings.length) {
                throw new common_1.NotFoundException('Bookings not found');
            }
            return bookings;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mailer_service_1.MailerService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map