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
exports.BuildingsController = void 0;
const common_1 = require("@nestjs/common");
const buildings_service_1 = require("./buildings.service");
const create_building_dto_1 = require("./dto/create-building.dto");
const update_building_dto_1 = require("./dto/update-building.dto");
let BuildingsController = class BuildingsController {
    constructor(buildingsService) {
        this.buildingsService = buildingsService;
    }
    async create(createBuildingDto) {
        return await this.buildingsService.createBuilding(createBuildingDto);
    }
    findAll() {
        return this.buildingsService.findAll();
    }
    findOne(id) {
        return this.buildingsService.findOne(id);
    }
    update(id, updateBuildingDto) {
        return this.buildingsService.updateBuilding(id, updateBuildingDto);
    }
    remove(id) {
        return this.buildingsService.removeBuilding(id);
    }
};
exports.BuildingsController = BuildingsController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_building_dto_1.CreateBuildingDto]),
    __metadata("design:returntype", Promise)
], BuildingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_building_dto_1.UpdateBuildingDto]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "remove", null);
exports.BuildingsController = BuildingsController = __decorate([
    (0, common_1.Controller)('buildings'),
    __metadata("design:paramtypes", [buildings_service_1.BuildingsService])
], BuildingsController);
//# sourceMappingURL=buildings.controller.js.map