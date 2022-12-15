import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Employee } from "./employee-model";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  private employees: Employee[] = [];
  private employeesUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getEmployees() {
    this.http
      .get<{ message: string; employees: any }>("http://localhost:3000/api/employees/")
      .pipe(
        map(employeeData => {
          return employeeData.employees.map((employee: any) => {
            return {
              name: employee.name,
              position: employee.position,
              office: employee.office,
              salary: employee.salary,
              id: employee._id
            };
          });
        })
      )
      .subscribe(transformedEmployees => {
        this.employees = transformedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  getEmployee(id: string) {
    return this.http.get<{ _id: string; name: string, position: string, office: string, salary: number}>(
      "http://localhost:3000/api/employees/" + id
    );
  }

  addEmployee(name: string, position: string, office: string, salary: number ) {
    const employee: Employee = { id: null!, name: name, office: office, position: position, salary: salary};
    this.http
      .post<{ message: string; employeeId: string }>(
        "http://localhost:3000/api/employees/",
        employee
      )
      .subscribe(responseData => {
        const id = responseData.employeeId;
        employee.id = id;
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(["/"]);
      });
  }

  updateEmployee(id: string, name: string, position: string, office: string, salary: number) {
    const employee: Employee = { 
      id: id,
      name: name, 
      position: position, 
      office: office, 
      salary: salary 
    };
    this.http
      .put("http://localhost:3000/api/employees/" + id, employee)
      .subscribe(response => {
        const updatedEmployees = [...this.employees];
        const oldEmployeeIndex = updatedEmployees.findIndex(p => p.id === employee.id);
        updatedEmployees[oldEmployeeIndex] = employee;
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(["/"]);
      });
  }

  deleteEmployee(employeeId: string) {
    this.http
      .delete("http://localhost:3000/api/employees/" + employeeId)
      .subscribe(() => {
        const updatedEmployees = this.employees.filter(employee => employee.id !== employeeId);
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }
}