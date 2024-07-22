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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    create(createRoomDto, buildingId) {
        return this.roomsService.createRoom(buildingId, createRoomDto);
    }
    findAllByFloor(buildingId) {
        return this.roomsService.findAllByBuilding(buildingId);
    }
    findAllByBuildingSortedByFloor(buildingId, order) {
        return this.roomsService.findAllByBuildingSortedByFloor(buildingId, order);
    }
    findNumberOfRooms() {
        return this.roomsService.findNumberOfRooms();
    }
    findOneByName(buildingId, name) {
        return this.roomsService.findOneByName(buildingId, name);
    }
    findOneById(buildingId, roomId) {
        return this.roomsService.findOneById(roomId);
    }
    update(buildingId, roomId, updateRoomDto) {
        return this.roomsService.update(buildingId, roomId, updateRoomDto);
    }
    remove(buildingId, roomId) {
        return this.roomsService.remove(buildingId, roomId);
    }
    findRanking() {
        return this.roomsService.rankingRoomsByBookings();
    }
    findAvailableRooms() {
        return this.roomsService.filterByDaysAndHours();
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, common_1.Post)(':buildingId/types'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('buildingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto, String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/findByBuilding/:buildingId'),
    __param(0, (0, common_1.Param)('buildingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findAllByFloor", null);
__decorate([
    (0, common_1.Get)('/findByBuildingSorted/:buildingId'),
    __param(0, (0, common_1.Param)('buildingId')),
    __param(1, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findAllByBuildingSortedByFloor", null);
__decorate([
    (0, common_1.Get)('/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findNumberOfRooms", null);
__decorate([
    (0, common_1.Get)('/findByName/:buildingId/search'),
    __param(0, (0, common_1.Param)('buildingId')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findOneByName", null);
__decorate([
    (0, common_1.Get)(':roomId'),
    __param(0, (0, common_1.Param)('buildingId')),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Patch)(':buildingId/types/:roomId'),
    __param(0, (0, common_1.Param)('buildingId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:buildingId/types/:roomId'),
    __param(0, (0, common_1.Param)('buildingId')),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findRanking", null);
__decorate([
    (0, common_1.Get)('/findAvailableRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findAvailableRooms", null);
exports.RoomsController = RoomsController = __decorate([
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map