import { Component } from '@angular/core';
import { UserSchema } from '../users.model';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/service/toaster.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user:UserSchema={}

  constructor(private api:ApiService,private router:Router,private toaster:ToasterService) {}

  addUser(){
    this.api.addUser(this.user).subscribe({
      next:(res:any)=>{
        console.log(res);        
        // alert("New user added successfully")
        this.toaster.showSuccess("New user added successfully")
        this.router.navigateByUrl('users')
      },
      error:(err:any)=>{
        console.log(err);        
        // alert("Cannot perform the action now... Please try after some times!!!")
        this.toaster.showError("Cannot perform the action now... Please try after some times!!!")
      }
    })
  }

  cancel(){
    this.user = {}
  }
  
}
