import { Slot } from "./Slot.entity";

export interface ConsolidableData {
    newSlotDto: Slot | undefined;
    oldSlotDto: Slot | undefined;
}