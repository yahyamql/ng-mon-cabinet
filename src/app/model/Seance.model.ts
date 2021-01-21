import { Patient } from "./Patient.model";

export class Seance {

    public id ?: number;
    public comment ?: string;
    public dateSeance ?: Date;
    public confirm ?: string; 
    public title ?: string; 
    public patient ?: Patient; 

}