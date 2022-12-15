import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Employee } from './employee-model';

@Pipe({
  name: 'EmployeeFilterPipe'
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(employees: Employee[], term: string) {
   let filteredEmployees: Employee[] = [];  

   if(term && term.length > 0){
    filteredEmployees = employees.filter(
    (employee: Employee) => employee.name.toLowerCase().includes(term.toLowerCase())
    );
   }

   if(filteredEmployees.length < 1){
    return employees;
   }

   return filteredEmployees;
  }


}

