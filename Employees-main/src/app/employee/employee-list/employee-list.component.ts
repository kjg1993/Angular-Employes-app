import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Employee } from "../employee-model";
import { EmployeeService } from "../employee.service";

//Intentar el modal
import { MatDialog } from "@angular/material/dialog";



@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  isLoading = false;
  private employeesSub!: Subscription;
  term!: string;

  constructor(
    public employeeService: EmployeeService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.employeeService.getEmployees();
    this.employeesSub = this.employeeService.getEmployeeUpdateListener()
      .subscribe((employees: Employee[]) => {
        this.isLoading = false;
        this.employees = employees;
      });
  }

  onDelete(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId);
  }

  ngOnDestroy() {
    this.employeesSub.unsubscribe();
  }


  search(value: string) {
    this.term = value;
  }


}


