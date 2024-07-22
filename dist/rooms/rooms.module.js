"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsModule = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const rooms_controller_1 = require("./rooms.controller");
const rooms_schema_1 = require("./schema/rooms.schema");
const mongoose_1 = require("@nestjs/mongoose");
const building_schema_1 = require("../buildings/schema/building.schema");
const booking_schema_1 = require("../bookings/schema/booking.schema");
let RoomsModule = class RoomsModule {
};
exports.RoomsModule = RoomsModule;
exports.RoomsModule = RoomsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: rooms_schema_1.Room.name, schema: rooms_schema_1.RoomSchema },]),
            mongoose_1.MongooseModule.forFeature([{ name: building_schema_1.Building.name, schema: building_schema_1.BuildingSchema },]),
            mongoose_1.MongooseModule.forFeature([{ name: booking_schema_1.Booking.name, schema: booking_schema_1.BookingSchema },]),
        ],
        controllers: [rooms_controller_1.RoomsController],
        providers: [rooms_service_1.RoomsService],
    })
], RoomsModule);
//# sourceMappingURL=rooms.module.js.map