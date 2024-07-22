"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const bookings_module_1 = require("./bookings/bookings.module");
const rooms_module_1 = require("./rooms/rooms.module");
const mailer_module_1 = require("./mailer/mailer.module");
const config_1 = require("@nestjs/config");
const buildings_module_1 = require("./buildings/buildings.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://optimo123:optimo123@optimo.zlmwo9b.mongodb.net/?retryWrites=true&w=majority&appName=Optimo'),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            buildings_module_1.BuildingsModule,
            bookings_module_1.BookingsModule,
            rooms_module_1.RoomsModule,
            mailer_module_1.MailerModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map