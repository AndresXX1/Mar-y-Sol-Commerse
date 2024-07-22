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
/// <reference types="mongoose" />
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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateFullUserDto } from './dto/updateFullUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateUser(userToUpdate: UpdateUserDto): Promise<{
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
        role: import("../common/enums/rol.enum").Role;
        phone: string;
        resetPasswordToken: string;
        bookings: import("mongoose").FlattenMaps<import("mongoose").Schema.Types.ObjectId>[];
        createdAt: Date;
        updatedAt: Date;
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateFullUser(userToUpdate: UpdateFullUserDto): Promise<{
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
        role: import("../common/enums/rol.enum").Role;
        phone: string;
        resetPasswordToken: string;
        bookings: import("mongoose").FlattenMaps<import("mongoose").Schema.Types.ObjectId>[];
        createdAt: Date;
        updatedAt: Date;
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllRolUsers(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getAllUsers(): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}
