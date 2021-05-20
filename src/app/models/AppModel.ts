import { BusinessInterface } from "./business";
import { CapacityInterface } from "./capacity"
import { LotProjection } from "./lot";
import { ProducerInterface } from "./producers"

export class AppModel{
    lots: any[];
    producers: ProducerInterface[];
    capacities: CapacityInterface[];
    businesses: BusinessInterface[];
    projections: LotProjection[];
}