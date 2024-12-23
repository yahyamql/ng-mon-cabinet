import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const SEANCE_URL = 'seance/'
const GET_PATIENT_URL = 'get-patient'

@Injectable()
export class AgendaService {

  constructor(private http: HttpClient) { }

  getPatientByKeyword(keyword: String): Observable<any>  {
    return this.http.get(`${environment.BASE_API +
      SEANCE_URL + GET_PATIENT_URL}?keyword=${keyword}`);
  }

  insert(seance: EventInput) {
    console.log('seance:',seance);
    return this.http.post(environment.BASE_API + SEANCE_URL, seance);
  }

  getSeanceByPatientID(idPatient: number) {
    return this.http.get(environment.BASE_API + SEANCE_URL + idPatient);
  }

  deleteSeance(idSeance: number) {
    return this.http.delete(environment.BASE_API + SEANCE_URL + idSeance);
  }

  update(seance: EventInput) {
    return this.http.put(environment.BASE_API + SEANCE_URL, seance);
  }

  getAll() {
    return this.http.get(environment.BASE_API + SEANCE_URL);

  }
}
