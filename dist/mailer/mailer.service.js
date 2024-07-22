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
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let MailerService = class MailerService {
    constructor(configServices) {
        this.configServices = configServices;
    }
    mailTransport() {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: this.configServices.get('MAIL_HOST'),
            port: this.configServices.get('MAIL_PORT'),
            secure: true,
            auth: {
                user: this.configServices.get('MAIL_USER'),
                pass: this.configServices.get('MAIL_PASS'),
            },
        });
        return transporter;
    }
    async sendEmail(createEmail) {
        const { html, from, text, recipients, subject, placeHolderReplacement } = createEmail;
        const transport = this.mailTransport();
        const options = {
            from: from ??
                `${this.configServices.get('APP_NAME')} <${this.configServices.get('DEFAULT_MAIL_FROM')}>`,
            to: recipients,
            subject: subject,
            html: html,
        };
        try {
            const result = await transport.sendMail(options);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map