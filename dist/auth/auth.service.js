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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const mailer_service_1 = require("../mailer/mailer.service");
const status_enum_1 = require("../common/enums/status.enum");
let AuthService = class AuthService {
    constructor(mailerService, userService, jwtService) {
        this.mailerService = mailerService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const user = await this.userService.findByEmail(registerDto.email);
        if (user) {
            throw new common_1.BadRequestException('email already exists');
        }
        await this.userService.createUser({
            ...registerDto,
            password: await bcrypt.hash(registerDto.password, 10),
        });
        const mail = {
            recipients: { name: registerDto.name, address: registerDto.email },
            subject: 'Bienvenido',
            html: `<p>Hola,</p>${registerDto.name}<p>Su cuenta ha sido creada exitosamente.</p><p>Saludos,</p><p>El equipo de soporte de <strong>${process.env.APP_NAME}</strong></p>`,
        };
        this.mailerService.sendEmail(mail);
        return {
            email: registerDto.email,
            name: registerDto.name,
            phone: registerDto?.phone,
        };
    }
    async login({ email, password }) {
        const user = await this.userService.findByEmailWithPassword(email);
        if (!user) {
            throw new common_1.NotFoundException(`User ${email} not found`);
        }
        if (user.status === status_enum_1.Status.Banned) {
            throw new common_1.UnauthorizedException(`User ${email} is banned`);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException(`password is wrong`);
        }
        const payload = {
            email: user.email,
            role: user.role,
            name: user.name,
            userId: user.id,
            image: user.profilePicture,
            country: user.country,
            lastname: user.lastName,
            age: user.age,
            addres: user.address,
            gender: user.gender,
            phone: user.phone
        };
        return { access_Token: await this.jwtService.signAsync(payload) };
    }
    async requestResetPassword(requestResetPassword) {
        const { email } = requestResetPassword;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`User ${email} not found`);
        }
        user.resetPasswordToken = (0, uuid_1.v4)();
        const mail = {
            recipients: { name: user.name, address: email },
            subject: 'Reset Password',
            html: `<p>Hola,</p> ${user.name}<p>Se le ha enviado un token para restablecer su contraseña. Por favor, siga las instrucciones para actualizar su contraseña. <strong>${user.resetPasswordToken}</strong></p><p>Si usted no solicitó este cambio, por favor ignore este correo electrónico.</p><p>Saludos,</p><p>El equipo de soporte de <strong>${process.env.APP_NAME}</strong></p>`,
        };
        this.mailerService.sendEmail(mail);
        return user.save();
    }
    async resetPassword(resetPassword) {
        const { password, resetPasswordToken } = resetPassword;
        const user = await this.userService.findUserByToken(resetPasswordToken);
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        const mail = {
            recipients: { name: user.name, address: user.email },
            subject: 'Reset Password',
            html: ` <p>Hola,</p>${user.name}<p>Su contraseña ha sido cambiada exitosamente. Si usted no realizó este cambio, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte de <strong>${process.env.APP_NAME}</strong></p>`,
        };
        this.mailerService.sendEmail(mail);
        await user.save();
        return { message: 'success' };
    }
    async changePassword(changePassword, email) {
        const user = await this.userService.findByEmailWithPassword(email);
        const { newPassword, oldestPassword } = changePassword;
        if (await bcrypt.compare(oldestPassword, user.password)) {
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            const mail = {
                recipients: { name: user.name, address: user.email },
                subject: 'Reset Password',
                html: ` <p>Hola,</p>${user.name}<p>Su contraseña ha sido cambiada exitosamente. Si usted no realizó este cambio, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte de <strong>${process.env.APP_NAME}</strong></p>`,
            };
            this.mailerService.sendEmail(mail);
            return { message: 'success' };
        }
        else {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
    }
    async changeEmail(changeEmail, email) {
        const user = await this.userService.findByEmailWithPassword(email);
        const { newEmail, password } = changeEmail;
        if (await bcrypt.compare(password, user.password)) {
            user.email = newEmail;
            await user.save();
            const mail = {
                recipients: { name: user.name, address: user.email },
                subject: 'Change Email',
                html: ` <p>Hola,</p>${user.name}<p>Su Email ha sido cambiada exitosamente. Si usted no realizó este cambio, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte de <strong>${process.env.APP_NAME}</strong></p>`,
            };
            this.mailerService.sendEmail(mail);
            return { message: 'success' };
        }
        else {
            throw new common_1.BadRequestException('password is incorrect');
        }
    }
    async deleteAccount(deleteAccount, email) {
        const user = await this.userService.findByEmailWithPassword(email);
        const { password } = deleteAccount;
        if (await bcrypt.compare(password, user.password)) {
            this.userService.deleteAccount(user.id);
            const mail = {
                recipients: { name: user.name, address: user.email },
                subject: 'Delete Account',
                html: ` <p>Hola,</p>${user.name}<p>Su Cuenta ha sido eliminada exitosamente. Si usted no realizó esta acción, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte de <strong>${process.env.APP_NAME}</strong></p>`,
            };
            this.mailerService.sendEmail(mail);
            return { message: 'success' };
        }
        else {
            throw new common_1.BadRequestException('password is incorrect');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map