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
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RequestResetPasswordDto } from './dto/requestResetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ChangeEmailDto } from './dto/changeEmail.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';
import { MailerService } from 'src/mailer/mailer.service';
export declare class AuthService {
    private readonly mailerService;
    private readonly userService;
    private jwtService;
    constructor(mailerService: MailerService, userService: UserService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        email: string;
        name: string;
        phone: string;
    }>;
    login({ email, password }: LoginDto): Promise<{
        access_Token: string;
    }>;
    requestResetPassword(requestResetPassword: RequestResetPasswordDto): Promise<import("mongoose").Document<unknown, {}, import("../user/schema/user.schema").User> & import("../user/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    resetPassword(resetPassword: ResetPasswordDto): Promise<{
        message: string;
    }>;
    changePassword(changePassword: ChangePasswordDto, email: string): Promise<{
        message: string;
    }>;
    changeEmail(changeEmail: ChangeEmailDto, email: string): Promise<{
        message: string;
    }>;
    deleteAccount(deleteAccount: DeleteAccountDto, email: string): Promise<{
        message: string;
    }>;
}
