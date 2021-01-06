import { Patient } from "./Patient.model";

export class Seance {
    public id ?: Number;
    public patient ?: Patient;
    public comment ?: String;
    public dateSeance ?: String;
}