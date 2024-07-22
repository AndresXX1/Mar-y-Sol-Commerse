/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/aggregate" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/callback" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/collection" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/connection" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/cursor" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/document" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/error" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/expressions" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/helpers" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/middlewares" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/indexes" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/models" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/pipelinestage" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/populate" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/query" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/schemaoptions" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/schematypes" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/session" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/types" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/utility" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/validation" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/virtuals" />
/// <reference types="mongoose-sequence/node_modules/mongoose" />
/// <reference types="mongoose-sequence" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-sequence/node_modules/mongoose/types/inferschematype" />
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/enums/rol.enum';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    findByEmailWithPassword(email: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    updateUser(updateUser: UpdateUserDto): Promise<{
        access_Token: string;
        name: string;
        email: string;
        lastName: string;
        age: string;
        address: string;
        gender: string;
        rolCompany: string;
        country: string;
        profilePicture: string;
        status: import("../common/enums/status.enum").Status;
        password: string;
        role: Role;
        phone: string;
        resetPasswordToken: string;
        bookings: mongoose.FlattenMaps<mongoose.Schema.Types.ObjectId>[];
        createdAt: Date;
        updatedAt: Date;
        _id: Types.ObjectId;
    }>;
    updateFullUser(updateUser: UpdateUserDto): Promise<{
        access_Token: string;
        name: string;
        email: string;
        lastName: string;
        age: string;
        address: string;
        gender: string;
        rolCompany: string;
        country: string;
        profilePicture: string;
        status: import("../common/enums/status.enum").Status;
        password: string;
        role: Role;
        phone: string;
        resetPasswordToken: string;
        bookings: mongoose.FlattenMaps<mongoose.Schema.Types.ObjectId>[];
        createdAt: Date;
        updatedAt: Date;
        _id: Types.ObjectId;
    }>;
    findUserByToken(resetPasswordToken: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    getAllRolUsers(): Promise<(mongoose.Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    })[]>;
    getAllUsers(): Promise<Omit<mongoose.Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }, never>[]>;
    deleteAccount(id: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
}
