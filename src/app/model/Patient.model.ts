import { FAMILY_SITUATION } from "../shared/Constants";

export class Patient {
    public id ?: number;
    public firstName ?: String;
    public lastName ?: String;
    public address ?: String;
    public tel ?: Number;
    public age ?: Number;
    public numberChildren ?: Number = 0;
    public gender ?: String = 'HOMME';
    public insurance ?: String = 'Sans';
    public familySituation ?: String = FAMILY_SITUATION.single.key;
    public dateBirth ?: Date;
}