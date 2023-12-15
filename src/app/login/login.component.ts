import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/service/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  
  //property
  email: string = "admin@demoapp.com"
  password: string = "demoapp123"
  constructor(private api: ApiService, private loginRouter: Router,private toaster:ToasterService) { }
  

  login() {
    if (this.email && this.password) {
      // we should get admin details from http://localhost:3000/users/1
      // for that we have to make an api call to http://localhost:3000/users/1
      this.api.adminDetails().subscribe({
        next: (result: any) => {
          // console.log(result);
          // compare email and password with admin details
          if (this.email === result.email && this.password === result.password) {
            //save details in local storage
            localStorage.setItem("admin_name", result.name)
            localStorage.setItem("admin_pswd", result.password)
            // alert("Authorisation successfull")
            this.toaster.showSuccess("Authorisation successfull")
            //navigate to home page - use navigateByUrl() - Router class
            this.loginRouter.navigateByUrl('home')
          } else {
            // alert("Invalid Admin Credentials!!!")
            this.toaster.showError("Invalid Admin Credentials!!!")
          }
        },
        error: (result: any) => {
          // console.log(result);
          // alert(`Error while fetching the data... Please try after some time!!! ${result.message}`)
          this.toaster.showError(`Error while fetching the data... Please try after some time!!! ${result.message}`)
        }
      })
    } else {
      // alert("Please fill the form completely!!!")
      this.toaster.showError("Please fill the form completely!!!")

    }
  }

}
