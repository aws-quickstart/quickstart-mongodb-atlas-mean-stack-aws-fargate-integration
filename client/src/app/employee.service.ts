import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Employee } from './employee';
import { EnvVariablesServiceService } from './env-variables-service.service';
// import { * }  from '@dotenv';
// import * as dotenv from 'dotenv';
// Load environment variables from the .env file, where the ATLAS_URI is configured
// dotenv.config();

// const ATLAS_URI = process.env
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  /*private url = 'http://partner-demo-eb-meanstack-dev.us-east-1.elasticbeanstalk.com:5200'; */
//9fe9cd91d3863eaa.elb.us-east-1.amazonaws.com
  // private url = ATLAS_URI;

  private url :any;
  private employees$: Subject<Employee[]> = new Subject();

  constructor(private httpClient: HttpClient,private service: EnvVariablesServiceService) { 
    this.url = this.service.ENV.ATLAS_URI
    console.log("ENV varible ", this.url)
  }

  // private employees$: Subject<Employee[]> = new Subject();

  // constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(`${this.url}/employees`)
      .subscribe(employees => {
        this.employees$.next(employees);
      });
  }

  getEmployees(): Subject<Employee[]> {
    this.refreshEmployees();
    return this.employees$;
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<string> {
    return this.httpClient.post(`${this.url}/employees`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
  }
}
