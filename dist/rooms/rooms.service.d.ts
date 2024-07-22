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
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Model } from 'mongoose';
import { Room } from './schema/rooms.schema';
import { Building } from 'src/buildings/schema/building.schema';
import { Booking } from 'src/bookings/schema/booking.schema';
export declare class RoomsService {
    private readonly roomModel;
    private readonly buildingModel;
    private readonly bookingModel;
    constructor(roomModel: Model<Room>, buildingModel: Model<Building>, bookingModel: Model<Booking>);
    createRoom(buildingId: string, createRoomDto: CreateRoomDto): Promise<Room>;
    findOneById(roomId: string): Promise<Room>;
    findAllByBuilding(buildingId: string): Promise<Room[]>;
    findAllByBuildingSortedByFloor(buildingId: string, order: string): Promise<Room[]>;
    findNumberOfRooms(): Promise<number>;
    findOneByName(buildingId: string, name: string): Promise<string[]>;
    update(buildingId: string, roomId: string, updateRoomDto: UpdateRoomDto): Promise<Room>;
    remove(buildingId: string, roomId: string): Promise<string>;
    filterByDaysAndHours(): Promise<void>;
    rankingRoomsByBookings(): Promise<Room[]>;
}
