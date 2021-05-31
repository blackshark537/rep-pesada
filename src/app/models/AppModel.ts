import { BusinessInterface } from "./business";
import { CapacityInterface } from "./capacity"
import { EggLotInterface, EggLotProjectionInterface } from "./EggLots";
import { LotModel, LotProjection } from "./lot";
import { ProducerInterface } from "./producers"

export class AppModel{
    lots: LotModel[];
    eggLots: EggLotInterface[];
    producers: ProducerInterface[];
    capacities: CapacityInterface[];
    businesses: BusinessInterface[];
    projections: LotProjection[];
    eggsProjections: EggLotProjectionInterface[];
}