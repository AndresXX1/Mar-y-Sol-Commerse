"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const products_schema_1 = require("./schema/products.schema");
const mongoose_1 = require("@nestjs/mongoose");
const collection_schema_1 = require("../collections/schema/collection.schema");
const booking_schema_1 = require("../bookings/schema/booking.schema");
let productsModule = class productsModule {
};
exports.productsModule = productsModule;
exports.productsModule = productsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: products_schema_1.Room.name, schema: products_schema_1.productschema },]),
            mongoose_1.MongooseModule.forFeature([{ name: collection_schema_1.collection.name, schema: collection_schema_1.collectionSchema },]),
            mongoose_1.MongooseModule.forFeature([{ name: booking_schema_1.Booking.name, schema: booking_schema_1.BookingSchema },]),
        ],
        controllers: [products_controller_1.productsController],
        providers: [products_service_1.productservice],
    })
], productsModule);
//# sourceMappingURL=products.module.js.map