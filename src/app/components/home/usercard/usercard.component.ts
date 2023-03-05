import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css'],
})
export class UsercardComponent {
  @Input() miUser: User | any;

  constructor(private usersServices: UsersService) {}

  async deleteUser(pId: any | undefined): Promise<void> {
    if (pId !== undefined) {
      try {
        let response = await this.usersServices.delete(pId);
        if (response) {
          alert('Usuario borrado correctamente');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
