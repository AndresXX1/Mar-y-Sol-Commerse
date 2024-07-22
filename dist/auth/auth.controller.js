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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const requestResetPassword_dto_1 = require("./dto/requestResetPassword.dto");
const resetPassword_dto_1 = require("./dto/resetPassword.dto");
const changePassword_dto_1 = require("./dto/changePassword.dto");
const auth_decorator_1 = require("../common/decorators/auth.decorator");
const rol_enum_1 = require("../common/enums/rol.enum");
const activeUser_decorator_1 = require("../common/decorators/activeUser.decorator");
const user_schema_1 = require("../user/schema/user.schema");
const changeEmail_dto_1 = require("./dto/changeEmail.dto");
const deleteAccount_dto_1 = require("./dto/deleteAccount.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(createAuthDto) {
        return this.authService.register(createAuthDto);
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    requestResetPassword(requestResetPasswordDto) {
        return this.authService.requestResetPassword(requestResetPasswordDto);
    }
    resetPassword(resetPassword) {
        return this.authService.resetPassword(resetPassword);
    }
    changePassword(changePassword, user) {
        return this.authService.changePassword(changePassword, user.email);
    }
    changeEmail(changeEmail, user) {
        return this.authService.changeEmail(changeEmail, user.email);
    }
    deleteAccount(deleteAccount, user) {
        return this.authService.deleteAccount(deleteAccount, user.email);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)('request-reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestResetPassword_dto_1.RequestResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "requestResetPassword", null);
__decorate([
    (0, common_1.Patch)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.User),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, activeUser_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePassword_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('change-email'),
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.User),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, activeUser_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeEmail_dto_1.ChangeEmailDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changeEmail", null);
__decorate([
    (0, common_1.Delete)('delete-account'),
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.User),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, activeUser_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteAccount_dto_1.DeleteAccountDto,
        user_schema_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map