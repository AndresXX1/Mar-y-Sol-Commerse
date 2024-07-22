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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const auth_decorator_1 = require("../common/decorators/auth.decorator");
const rol_enum_1 = require("../common/enums/rol.enum");
const activeUser_decorator_1 = require("../common/decorators/activeUser.decorator");
const booking_handler_dto_1 = require("./dto/booking-handler.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
let BookingsController = class BookingsController {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    create(createBookingDto, user) {
        console.log(createBookingDto);
        return this.bookingsService.createBooking(createBookingDto, user);
    }
    findAllBy(filter, id) {
        return this.bookingsService.findAllBy(filter, id);
    }
    bookingHandler(bookingHandler) {
        return this.bookingsService.BookingsHandler(bookingHandler);
    }
    UpdateBooking(bookingToUpdate) {
        return this.bookingsService.updateBookingById(bookingToUpdate);
    }
    getBookingsByDate() {
        return this.bookingsService.getBookingsByMonth();
    }
    getBookingsByWeek() {
        return this.bookingsService.getBookingsThisWeek();
    }
    getBookingsByDay(day) {
        return this.bookingsService.getBookingsByDay(day);
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.User),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, activeUser_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('filter')),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findAllBy", null);
__decorate([
    (0, common_1.Put)('/changeState'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_handler_dto_1.BookingHandlerDto]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "bookingHandler", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "UpdateBooking", null);
__decorate([
    (0, common_1.Get)('/byMonth'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "getBookingsByDate", null);
__decorate([
    (0, common_1.Get)('/byWeek'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "getBookingsByWeek", null);
__decorate([
    (0, common_1.Get)('/byDay/:day'),
    __param(0, (0, common_1.Param)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "getBookingsByDay", null);
exports.BookingsController = BookingsController = __decorate([
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map