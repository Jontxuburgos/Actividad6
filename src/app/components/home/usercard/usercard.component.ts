import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css'],
})
export class UsercardComponent {
  @Input() miUser: User | any;
}
