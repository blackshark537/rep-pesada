import { BusinessInterface } from "./business";
import { CapacityInterface } from "./capacity"
import { EggLotInterface } from "./EggLots";
import { LotProjection } from "./lot";
import { ProducerInterface } from "./producers"

export class AppModel{
    lots: any[];
    eggLots: EggLotInterface[];
    producers: ProducerInterface[];
    capacities: CapacityInterface[];
    businesses: BusinessInterface[];
    projections: LotProjection[];
}