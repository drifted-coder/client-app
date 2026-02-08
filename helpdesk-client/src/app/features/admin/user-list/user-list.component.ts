import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList: any = [];
  selectedUser: any;
  selectedRole: string = '';
  roles = ['admin', 'agent', 'user']

  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeModalRole') closeModalRole!: ElementRef;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList = () => {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userList = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  confirmStatusChange = (data: any) => {
    let payload = {
      active: !data.active
    }
    this.userService.updateUser(data._id, payload).subscribe({
      next: (res) => {
        if (res)
          this.getUsersList();
        this.closeModal.nativeElement.click();
      }
    })
  }

  submitRoleChange = () => {
    let payload = {
      role: this.selectedRole
    }
    this.userService.updateUser(this.selectedUser._id, payload).subscribe({
      next: (res) => {
        if (res)
          this.getUsersList();
        this.closeModalRole.nativeElement.click();
      }
    })
  }
}
