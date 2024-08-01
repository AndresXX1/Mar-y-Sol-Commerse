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
exports.productsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
let productsController = class productsController {
    constructor(productservice) {
        this.productservice = productservice;
    }
    create(createproductsDto, collectionId) {
        return this.productservice.createproducts(collectionId, createproductsDto);
    }
    findAllByFloor(collectionId) {
        return this.productservice.findAllBycollection(collectionId);
    }
    findAllBycollectionSortedByFloor(collectionId, order) {
        return this.productservice.findAllBycollectionSortedByFloor(collectionId, order);
    }
    findNumberOfproducts() {
        return this.productservice.findNumberOfproducts();
    }
    findOneByName(collectionId, name) {
        return this.productservice.findOneByName(collectionId, name);
    }
    findOneById(collectionId, roomId) {
        return this.productservice.findOneById(roomId);
    }
    update(collectionId, roomId, updateproductsDto) {
        return this.productservice.update(collectionId, roomId, updateproductsDto);
    }
    remove(collectionId, roomId) {
        return this.productservice.remove(collectionId, roomId);
    }
    findRanking() {
        return this.productservice.rankingproductsByBookings();
    }
    findAvailableproducts() {
        return this.productservice.filterByDaysAndHours();
    }
};
exports.productsController = productsController;
__decorate([
    (0, common_1.Post)(':collectionId/types'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('collectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.createproductsDto, String]),
    __metadata("design:returntype", void 0)
], productsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/findBycollection/:collectionId'),
    __param(0, (0, common_1.Param)('collectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], productsController.prototype, "findAllByFloor", null);
__decorate([
    (0, common_1.Get)('/findBycollectionSorted/:collectionId'),
    __param(0, (0, common_1.Param)('collectionId')),
    __param(1, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], productsController.prototype, "findAllBycollectionSortedByFloor", null);
__decorate([
    (0, common_1.Get)('/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], productsController.prototype, "findNumberOfproducts", null);
__decorate([
    (0, common_1.Get)('/findByName/:collectionId/search'),
    __param(0, (0, common_1.Param)('collectionId')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], productsController.prototype, "findOneByName", null);
__decorate([
    (0, common_1.Get)(':roomId'),
    __param(0, (0, common_1.Param)('collectionId')),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], productsController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Patch)(':collectionId/types/:roomId'),
    __param(0, (0, common_1.Param)('collectionId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_room_dto_1.updateproductsDto]),
    __metadata("design:returntype", void 0)
], productsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:collectionId/types/:roomId'),
    __param(0, (0, common_1.Param)('collectionId')),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], productsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], productsController.prototype, "findRanking", null);
__decorate([
    (0, common_1.Get)('/findAvailableproducts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], productsController.prototype, "findAvailableproducts", null);
exports.productsController = productsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.productservice])
], productsController);
//# sourceMappingURL=products.controller.js.map