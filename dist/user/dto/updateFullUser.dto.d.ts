import { Role } from 'src/common/enums/rol.enum';
import { Status } from 'src/common/enums/status.enum';
export declare class UpdateFullUserDto {
    id: string;
    name?: string;
    lastName?: string;
    country?: string;
    email?: string;
    password?: string;
    role?: Role;
    phone?: string;
    age?: string;
    address?: string;
    gender?: string;
    profilePicture?: string;
    status?: Status;
    rolCompany?: Status;
}
