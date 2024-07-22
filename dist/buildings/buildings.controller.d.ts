import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
export declare class BuildingsController {
    private readonly buildingsService;
    constructor(buildingsService: BuildingsService);
    create(createBuildingDto: CreateBuildingDto): Promise<import("./schema/building.schema").Building>;
    findAll(): Promise<import("./schema/building.schema").Building[]>;
    findOne(id: string): Promise<import("./schema/building.schema").Building>;
    update(id: string, updateBuildingDto: UpdateBuildingDto): Promise<import("./schema/building.schema").Building>;
    remove(id: string): Promise<import("./schema/building.schema").Building>;
}
