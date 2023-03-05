import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  userForm: FormGroup;


  constructor(
    private usersService: UsersService,
    private router: Router
    )
  
  {
    this.userForm = new FormGroup({
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      username: new FormControl("", []),
      email: new FormControl("", []),
      image: new FormControl("", []),
    }, []);
  }



  // getDataForm() {
  //   let user: User = this.userForm.value;
  //   this.usersService.create(user)
  //     .then((response) => {
  //       if (response._id) {
  //         alert(`usuario ${response.first_name} con id ${response.id} se ha creado correctamente`);
  //         this.router.navigate(['/home']);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  async getDataForm() {
    try {
      let user: User = this.userForm.value;
      let response = await this.usersService.create(user)
      if (response.id) {
        alert(`usuario ${response.first_name} con id ${response.id} se ha creado correctamente`);
        this.router.navigate(['/home']);
      }
    }
    catch (err) {
      console.log(err)
    }
  }




}
