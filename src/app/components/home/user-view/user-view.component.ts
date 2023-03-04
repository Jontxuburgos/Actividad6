import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  user!: User | any;
  

  constructor(
    private userServices: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      console.log(params._id);
      this.user = await this.userServices.getById(params._id);
      console.log(this.user);



      // let _id: string = params.id;

      // let response: any = await this.userServices.getById(_id);

    });
  }
}
