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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rooms_schema_1 = require("./schema/rooms.schema");
const building_schema_1 = require("../buildings/schema/building.schema");
const booking_schema_1 = require("../bookings/schema/booking.schema");
let RoomsService = class RoomsService {
    constructor(roomModel, buildingModel, bookingModel) {
        this.roomModel = roomModel;
        this.buildingModel = buildingModel;
        this.bookingModel = bookingModel;
    }
    async createRoom(buildingId, createRoomDto) {
        const building = await this.buildingModel.findById(buildingId);
        if (!building) {
            throw new Error('El edificio especificado no existe.');
        }
        const createdRoom = await this.roomModel.create(createRoomDto);
        building.rooms.push(createdRoom.id);
        await building.save();
        return createdRoom;
    }
    async findOneById(roomId) {
        const room = await this.roomModel.findOne({ _id: roomId }).exec();
        if (!room) {
            throw new Error('La habitación especificada no existe.');
        }
        return room;
    }
    async findAllByBuilding(buildingId) {
        const building = await this.buildingModel.findById(buildingId);
        if (!building) {
            throw new Error('El piso especificado no existe.');
        }
        const rooms = await this.roomModel.find({ _id: { $in: building.rooms } });
        return rooms;
    }
    async findAllByBuildingSortedByFloor(buildingId, order) {
        const building = await this.buildingModel.findById(buildingId);
        if (!building) {
            throw new Error('El piso especificado no existe.');
        }
        if (order !== 'asc' && order !== 'desc') {
            throw new Error('El parámetro "order" debe ser "asc" o "desc"');
        }
        const sortOrder = order === 'asc' ? 1 : -1;
        const rooms = await this.roomModel
            .find({ _id: { $in: building.rooms } })
            .sort({ floorNumber: sortOrder });
        return rooms;
    }
    async findNumberOfRooms() {
        let count = 0;
        const allBuildings = await this.buildingModel
            .find()
            .populate('rooms')
            .lean()
            .exec();
        console.log(allBuildings);
        for (let i = 0; i < allBuildings.length; i++) {
            count += allBuildings[i].rooms.length;
        }
        return count;
    }
    async findOneByName(buildingId, name) {
        const building = await this.buildingModel
            .findById(buildingId)
            .populate('rooms')
            .lean()
            .exec();
        if (!building) {
            throw new Error('El edificio especificado no existe.');
        }
        const roomsWithName = building.rooms.filter((room) => room.name.toLowerCase().trim().includes(name.toLowerCase().trim()));
        return roomsWithName;
    }
    async update(buildingId, roomId, updateRoomDto) {
        const building = await this.buildingModel.findById(buildingId);
        if (!building) {
            throw new Error('El edificio especificado no existe.');
        }
        const updatedRoom = await this.roomModel.findByIdAndUpdate(roomId, updateRoomDto, { new: true });
        return updatedRoom;
    }
    async remove(buildingId, roomId) {
        const building = await this.buildingModel.findById(buildingId);
        if (!building) {
            throw new Error('El edificio especificado no existe.');
        }
        await this.roomModel.findByIdAndDelete(roomId);
        return 'Room removed';
    }
    async filterByDaysAndHours() {
    }
    async rankingRoomsByBookings() {
        const rooms = await this.roomModel.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: '_id',
                    foreignField: 'roomId',
                    as: 'bookings',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    totalBookings: { $size: '$bookings' },
                },
            },
            {
                $sort: { totalBookings: -1 },
            },
            {
                $limit: 6,
            },
        ]);
        return rooms;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rooms_schema_1.Room.name)),
    __param(1, (0, mongoose_1.InjectModel)(building_schema_1.Building.name)),
    __param(2, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map