import { Role } from 'src/common/enums/rol.enum';
import { Status } from 'src/common/enums/status.enum';
export declare class UpdateUserDto {
    id: string;
    name?: string;
    lastName?: string;
    role?: Role;
    phone?: string;
    age?: string;
    address?: string;
    country?: string;
    gender?: string;
    profilePicture?: string;
    status?: Status;
    rolCompany?: Status;
}
