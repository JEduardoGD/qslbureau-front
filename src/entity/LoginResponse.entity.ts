import { Local } from "./Local.entity";

export interface LoginResponse {
    jwtToken: string;
    capturerId: number;
    capturerName: string;
    capturerLastName: string;
    capturerUsername: string;
    localsDto: Local[];
}