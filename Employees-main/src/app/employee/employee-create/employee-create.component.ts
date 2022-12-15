import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { EmployeeService } from "../employee.service";
import { Employee } from "../employee-model";

@Component({
  selector: "app-employee-create",
  templateUrl: "./employee-create.component.html",
  styleUrls: ["./employee-create.component.css"]
})
export class EmployeeCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  employee!: Employee;
  isLoading = false;
  private mode = "create";
  private employeeId!: string;

  constructor(
    public employeesService: EmployeeService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("employeeId")) {
        this.mode = "edit";
        this.employeeId = paramMap.get("employeeId")!;
        this.isLoading = true;
        this.employeesService.getEmployee(this.employeeId).subscribe(employeeData => {
          this.isLoading = false;
          
          this.employee = {
            id: employeeData._id, 
            name: employeeData.name, 
            position: employeeData.position, 
            office: employeeData.office, 
            salary: employeeData.salary};
        });
      } else {
        this.mode = "create";
        this.employeeId = null!;
      }
    });
  }

  onSaveEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === "create") {
      this.employeesService.addEmployee(form.value.name, form.value.position, form.value.office, form.value.salary);
    } else {
      this.employeesService.updateEmployee(
        this.employeeId,
        form.value.name,
        form.value.position,
        form.value.office,
        form.value.salary
      );
    }
    form.resetForm();
  }

}



