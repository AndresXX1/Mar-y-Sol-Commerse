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
exports.BuildingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const building_schema_1 = require("./schema/building.schema");
let BuildingsService = class BuildingsService {
    constructor(buildingModel) {
        this.buildingModel = buildingModel;
    }
    async createBuilding(createBuildingDto) {
        try {
            const newBuilding = await this.buildingModel.create(createBuildingDto);
            console.log('Building created successfully!');
            return newBuilding;
        }
        catch (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                console.error('There was a duplicate key error');
            }
            else {
                console.error('An error occurred:', error);
            }
        }
    }
    async findAll() {
        const buildings = await this.buildingModel
            .find()
            .populate('rooms')
            .lean()
            .exec();
        return buildings;
    }
    async findOne(id) {
        const building = await this.buildingModel
            .findById(id)
            .populate('rooms')
            .lean()
            .exec();
        return building;
    }
    async updateBuilding(id, updateBuildingDto) {
        const buildingUpdated = await this.buildingModel
            .findByIdAndUpdate(id, updateBuildingDto, { new: true })
            .populate('rooms')
            .lean()
            .exec();
        return buildingUpdated;
    }
    async removeBuilding(id) {
        const buildingDeleted = await this.buildingModel
            .findByIdAndDelete(id)
            .populate('rooms')
            .lean()
            .exec();
        return buildingDeleted;
    }
};
exports.BuildingsService = BuildingsService;
exports.BuildingsService = BuildingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(building_schema_1.Building.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BuildingsService);
//# sourceMappingURL=buildings.service.js.map