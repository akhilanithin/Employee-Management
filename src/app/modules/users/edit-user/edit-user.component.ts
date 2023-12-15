import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import { ToasterService } from 'src/app/service/toaster.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  user:UserSchema={}
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router,private toaster:ToasterService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
     this.existinguser(id)
    })
  }

  existinguser(id:any){
    this.api.getexistinguser(id).subscribe({
      next:(res:UserSchema)=>{
        this.user = res
      },
      error:(err:any)=>{
        console.log(err);
        // alert("Cannot perform the action now.. Please try after some times!!!")
        this.toaster.showError("Cannot perform the action now... Please try after some times!!!")
      }
    })
  }

  updateUser(){
    this.api.updateuser(this.user.id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        // alert("User details updated successfully...")
        this.toaster.showSuccess("User details updated successfully...")
        this.router.navigateByUrl("users")
      },
      error:(err:any)=>{
        console.log(err);
        // alert("Cannot perform the action now... Please try after some times!!!")
        this.toaster.showSuccess("Cannot perform the action now... Please try after some times!!!")
      }
    })
  }

  cancelUpdate(userId:any){
    console.log("cancel clicked");
   this.existinguser(userId) 
  }
}
