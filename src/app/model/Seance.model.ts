import { Patient } from "./Patient.model";

export class Seance {
    public id ?: Number;
    public patient ?: Patient;
    public comment ?: string;
    public isConfirm ?: string;
    public dateSeance ?: string;
    public title ?: string;
}