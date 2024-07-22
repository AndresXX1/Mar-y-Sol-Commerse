import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
interface Order {
    type: 'asc' | 'desc';
}
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    create(createRoomDto: CreateRoomDto, buildingId: string): Promise<import("./schema/rooms.schema").Room>;
    findAllByFloor(buildingId: string): Promise<import("./schema/rooms.schema").Room[]>;
    findAllByBuildingSortedByFloor(buildingId: string, order: Order['type']): Promise<import("./schema/rooms.schema").Room[]>;
    findNumberOfRooms(): Promise<number>;
    findOneByName(buildingId: string, name: string): Promise<string[]>;
    findOneById(buildingId: string, roomId: string): Promise<import("./schema/rooms.schema").Room>;
    update(buildingId: string, roomId: string, updateRoomDto: UpdateRoomDto): Promise<import("./schema/rooms.schema").Room>;
    remove(buildingId: string, roomId: string): Promise<string>;
    findRanking(): Promise<import("./schema/rooms.schema").Room[]>;
    findAvailableRooms(): Promise<void>;
}
export {};
