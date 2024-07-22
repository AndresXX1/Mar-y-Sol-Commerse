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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
const common_2 = require("@nestjs/common");
const user_schema_1 = require("./schema/user.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const rol_enum_1 = require("../common/enums/rol.enum");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async createUser(createUserDto) {
        try {
            const user = new this.userModel(createUserDto);
            return user.save();
        }
        catch (error) {
            throw new common_2.InternalServerErrorException(error);
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.userModel.findOne({ email: email });
            return user;
        }
        catch (error) {
            throw new common_2.InternalServerErrorException(error);
        }
    }
    async findByEmailWithPassword(email) {
        try {
            const user = await this.userModel
                .findOne({
                email: email,
            })
                .select('+password');
            if (!user) {
                throw new common_1.NotFoundException(`User ${email} not found`);
            }
            return user;
        }
        catch (error) {
            throw new common_2.InternalServerErrorException(error);
        }
    }
    async updateUser(updateUser) {
        try {
            const userExists = await this.userModel.findById(updateUser.id);
            if (!userExists) {
                throw new common_1.NotFoundException('User not found');
            }
            console.log(updateUser);
            const userUpdated = await this.userModel
                .findByIdAndUpdate(updateUser.id, updateUser, {
                new: true,
            })
                .lean();
            const payload = {
                email: userUpdated.email,
                role: userUpdated.role,
                name: userUpdated.name,
            };
            return {
                ...userUpdated,
                access_Token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            if (error instanceof mongoose.Error.CastError && error.path === '_id') {
                throw new common_1.BadRequestException('Invalid ObjectId format');
            }
            throw new common_2.InternalServerErrorException('Error updating user');
        }
    }
    async updateFullUser(updateUser) {
        try {
            const userExists = await this.userModel.findById(updateUser.id);
            if (!userExists) {
                throw new common_1.NotFoundException('User not found');
            }
            if ('password' in updateUser && updateUser.password) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
            }
            const userUpdated = await this.userModel
                .findByIdAndUpdate(updateUser.id, updateUser, {
                new: true,
            })
                .lean();
            const payload = {
                email: userUpdated.email,
                role: userUpdated.role,
                name: userUpdated.name,
            };
            return {
                ...userUpdated,
                access_Token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            if (error instanceof mongoose.Error.CastError && error.path === '_id') {
                throw new common_1.BadRequestException('Invalid ObjectId format');
            }
            throw new common_2.InternalServerErrorException('Error updating user');
        }
    }
    async findUserByToken(resetPasswordToken) {
        try {
            const user = await this.userModel.findOne({
                resetPasswordToken: resetPasswordToken,
            });
            if (!user) {
                throw new common_1.BadRequestException();
            }
            return user;
        }
        catch (error) {
            throw new common_2.InternalServerErrorException(error);
        }
    }
    async getAllRolUsers() {
        try {
            return await this.userModel.find({ role: rol_enum_1.Role.User });
        }
        catch (error) {
            throw new common_2.InternalServerErrorException(error);
        }
    }
    async getAllUsers() {
        try {
            return await this.userModel.find().populate('bookings');
        }
        catch (error) {
            throw new common_2.InternalServerErrorException(error);
        }
    }
    async deleteAccount(id) {
        try {
            return await this.userModel.findOneAndDelete({ id: id });
        }
        catch (error) {
            throw new common_2.InternalServerErrorException(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map