import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/Patient.model';

const PATIENT_URL = 'patient/'

@Injectable()
export class PatientService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(environment.BASE_API + PATIENT_URL);
  }
  insert(patient: Patient) {
    return this.http.post(environment.BASE_API + PATIENT_URL, patient);
  }

}
