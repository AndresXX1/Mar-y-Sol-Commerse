import { productservice } from './products.service';
import { createproductsDto } from './dto/create-room.dto';
import { updateproductsDto } from './dto/update-room.dto';
interface Order {
    type: 'asc' | 'desc';
}
export declare class productsController {
    private readonly productservice;
    constructor(productservice: productservice);
    create(createproductsDto: createproductsDto, collectionId: string): Promise<import("./schema/products.schema").Room>;
    findAllByFloor(collectionId: string): Promise<import("./schema/products.schema").Room[]>;
    findAllBycollectionSortedByFloor(collectionId: string, order: Order['type']): Promise<import("./schema/products.schema").Room[]>;
    findNumberOfproducts(): Promise<number>;
    findOneByName(collectionId: string, name: string): Promise<string[]>;
    findOneById(collectionId: string, roomId: string): Promise<import("./schema/products.schema").Room>;
    update(collectionId: string, roomId: string, updateproductsDto: updateproductsDto): Promise<import("./schema/products.schema").Room>;
    remove(collectionId: string, roomId: string): Promise<string>;
    findRanking(): Promise<import("./schema/products.schema").Room[]>;
    findAvailableproducts(): Promise<void>;
}
export {};
