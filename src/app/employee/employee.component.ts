import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  @ViewChild('myModal') model: ElementRef | undefined;
  employeeObj:employeeModel = new employeeModel();
  employeeList: employeeModel[]=[];
  ngOnInit(): void {
    this.getEmployeeList();
  }
  openModel(){
    const empmodel = document.getElementById('myModal');
    if(empmodel !=null){
      empmodel.style.display='block';
    }
  }

  closeModel(){

    this.employeeObj= new employeeModel();
    if(this.model !=null){
      this.model.nativeElement.style.display='none';
    }
  }

  onSaveform(){
    debugger;
    const localData=localStorage.getItem('employeedata');
    if(localData!=null){
      const empData=JSON.parse(localData);
      this.employeeObj.id=empData.length+1;
      empData.push(this.employeeObj);
      localStorage.setItem('employeedata', JSON.stringify(empData));

    }
    else{
      const newEmployee=[];
      newEmployee.push(this.employeeObj);
      this.employeeObj.id=1;
      localStorage.setItem('employeedata', JSON.stringify(newEmployee));
    }
    this.closeModel();
    this.getEmployeeList();
  }

  onUpdateform(){
    const currentEmployee=this.employeeList.find(e=>e.id===this.employeeObj.id);
    if(currentEmployee!=undefined){
      currentEmployee.name=this.employeeObj.name;
      currentEmployee.mobile=this.employeeObj.mobile;
      currentEmployee.email=this.employeeObj.email;
      currentEmployee.gender=this.employeeObj.gender;
      currentEmployee.doj=this.employeeObj.doj;
      currentEmployee.address=this.employeeObj.address;
      currentEmployee.status=this.employeeObj.status;

    }
    localStorage.setItem('employeedata', JSON.stringify(this.employeeList));
    this.closeModel();
    this.getEmployeeList();
  }

  onDeleteEmployee(data:employeeModel){
    const isConfirm=confirm('Are you sure you want to delete this employee?....');
    if(isConfirm){
      const currentEmployee=this.employeeList.findIndex(e=>e.id===this.employeeObj.id);
      this.employeeList.splice(currentEmployee,1);
      localStorage.setItem('employeedata', JSON.stringify(this.employeeList));

    }
    
  }

  onEditEmployee(employeeData:employeeModel){
    this.employeeObj=employeeData;
    this.openModel();

  }
  getEmployeeList(){
    const localData=localStorage.getItem('employeedata');
    if(localData!=null){
      this.employeeList=JSON.parse(localData);

    }
  }

}

export class employeeModel{
  id:number;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  doj: string;
  address: string;
  status: boolean;

  constructor(){
    this.id=0;
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.gender = "";
    this.doj = "";
    this.address = "";
    this.status = false;

  }
}
