import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateMailDto } from './dto/create-mail.dto';
export declare class MailerService {
    private readonly configServices;
    constructor(configServices: ConfigService);
    mailTransport(): nodemailer.Transporter<unknown>;
    sendEmail(createEmail: CreateMailDto): Promise<unknown>;
}
