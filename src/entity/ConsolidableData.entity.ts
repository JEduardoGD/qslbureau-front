import { Qslcard } from "./Qslcard.entity";
import { Slot } from "./Slot.entity";

export interface ConsolidableData {
    qslDto: Qslcard | undefined;
    newSlotDto: Slot | undefined;
    oldSlotDto: Slot | undefined;
}