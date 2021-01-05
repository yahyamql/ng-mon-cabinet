export class Patient {
    public  id ?: String;
    public  firstName ?: String;
    public lastName ?: String;
    public address ?: String;
    public tel ?: Number;
    public age ?: Number;
    public numberChildren ?: Number = 0;
    public gender ?: String = 'HOMME';
    public insurance ?: String = 'Sans';
    public familySituation ?: String;
    public dateBirth ?: Date;

    
}