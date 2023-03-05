import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', []),
        last_name: new FormControl('', []),
        username: new FormControl('', []),
        email: new FormControl('', []),
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
          alert(
            `usuario ${response.first_name} con id ${response.id} se ha actualizado correctamente`
          );
          this.router.navigate(['/home']);
        }
      } catch (err) {
        console.log(err);
      }
      
    } else {
      //Registrando
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          alert(
            `usuario ${response.first_name} con id ${response.id} se ha creado correctamente`
          );
          this.router.navigate(['/home']);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
