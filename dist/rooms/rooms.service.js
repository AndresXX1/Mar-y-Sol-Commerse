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
exports.productservice = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_schema_1 = require("./schema/products.schema");
const collection_schema_1 = require("../collections/schema/collection.schema");
const booking_schema_1 = require("../bookings/schema/booking.schema");
let productservice = class productservice {
    constructor(roomModel, collectionModel, bookingModel) {
        this.roomModel = roomModel;
        this.collectionModel = collectionModel;
        this.bookingModel = bookingModel;
    }
    async createproducts(collectionId, createproductsDto) {
        const collection = await this.collectionModel.findById(collectionId);
        if (!collection) {
            throw new Error('El edificio especificado no existe.');
        }
        const createdRoom = await this.roomModel.create(createproductsDto);
        collection.products.push(createdRoom.id);
        await collection.save();
        return createdRoom;
    }
    async findOneById(roomId) {
        const room = await this.roomModel.findOne({ _id: roomId }).exec();
        if (!room) {
            throw new Error('La habitación especificada no existe.');
        }
        return room;
    }
    async findAllBycollection(collectionId) {
        const collection = await this.collectionModel.findById(collectionId);
        if (!collection) {
            throw new Error('El piso especificado no existe.');
        }
        const products = await this.roomModel.find({ _id: { $in: collection.products } });
        return products;
    }
    async findAllBycollectionSortedByFloor(collectionId, order) {
        const collection = await this.collectionModel.findById(collectionId);
        if (!collection) {
            throw new Error('El piso especificado no existe.');
        }
        if (order !== 'asc' && order !== 'desc') {
            throw new Error('El parámetro "order" debe ser "asc" o "desc"');
        }
        const sortOrder = order === 'asc' ? 1 : -1;
        const products = await this.roomModel
            .find({ _id: { $in: collection.products } })
            .sort({ floorNumber: sortOrder });
        return products;
    }
    async findNumberOfproducts() {
        let count = 0;
        const allcollections = await this.collectionModel
            .find()
            .populate('products')
            .lean()
            .exec();
        console.log(allcollections);
        for (let i = 0; i < allcollections.length; i++) {
            count += allcollections[i].products.length;
        }
        return count;
    }
    async findOneByName(collectionId, name) {
        const collection = await this.collectionModel
            .findById(collectionId)
            .populate('products')
            .lean()
            .exec();
        if (!collection) {
            throw new Error('El edificio especificado no existe.');
        }
        const productsWithName = collection.products.filter((room) => room.name.toLowerCase().trim().includes(name.toLowerCase().trim()));
        return productsWithName;
    }
    async update(collectionId, roomId, updateproductsDto) {
        const collection = await this.collectionModel.findById(collectionId);
        if (!collection) {
            throw new Error('El edificio especificado no existe.');
        }
        const updatedRoom = await this.roomModel.findByIdAndUpdate(roomId, updateproductsDto, { new: true });
        return updatedRoom;
    }
    async remove(collectionId, roomId) {
        const collection = await this.collectionModel.findById(collectionId);
        if (!collection) {
            throw new Error('El edificio especificado no existe.');
        }
        await this.roomModel.findByIdAndDelete(roomId);
        return 'Room removed';
    }
    async filterByDaysAndHours() {
    }
    async rankingproductsByBookings() {
        const products = await this.roomModel.aggregate([
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
        return products;
    }
};
exports.productservice = productservice;
exports.productservice = productservice = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Room.name)),
    __param(1, (0, mongoose_1.InjectModel)(collection_schema_1.collection.name)),
    __param(2, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], productservice);
//# sourceMappingURL=products.service.js.map