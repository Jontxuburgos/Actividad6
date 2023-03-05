import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  title: string = 'Registro';
  userForm: FormGroup;
  msg:string = "";
  type:string = "";


  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
        ]),
        image: new FormControl('', []),
      },
      []
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id = params._id;
      console.log(params._id);
      if (_id) {
        this.title = 'Actualizar';
        const response = await this.usersService.getById(_id);
        console.log(response);
        const user: User = response;

        this.userForm = new FormGroup(
          {
            _id: new FormControl(_id, []),
            first_name: new FormControl(user?.first_name, []),
            last_name: new FormControl(user?.last_name, []),
            username: new FormControl(user?.username, []),
            email: new FormControl(user?.email, []),
            image: new FormControl(user?.image, []),
          },
          []
        );
      }
    });
  }

  async getDataForm() {
    let user = this.userForm.value;
    if (user._id) {
      //Actualizando
      try {
        let response = await this.usersService.update(user);
        if (response.id) {
          this.msg = 
            `usuario ${response.first_name} con id ${response.id} se ha actualizado correctamente`;
            this.type = 'success'
          // this.router.navigate(['/home']);
        }
      } catch (err) {
        console.log(err);
      }
      
    } else {
      //Registrando
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          this.msg = 
            `usuario ${response.first_name} con id ${response.id} se ha creado correctamente`;
            this.type = 'success'
          // this.router.navigate(['/home']);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched) {
      return true
    }
    return false
  }


}
