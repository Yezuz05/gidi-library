import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApolloQueryResult } from '@apollo/client/core';
import { AdminsService } from 'src/app/services/admins.service';
import { DeleteComponent } from '../delete.component';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss'],
})
export class AdminsListComponent implements OnInit {
  admins = [];
  displayedColumns: string[] = ['position', 'name', 'email', 'actions'];
  isFetchingAdmins = false;
  constructor(private adminsService: AdminsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.isFetchingAdmins = true;
    this.adminsService
      .getAdmins()
      .subscribe((res: ApolloQueryResult<{ users: any[] }>) => {
        this.admins = res.data.users.map((user, index) => {
          return {
            ...user,
            position: index + 1,
          };
        });
        this.isFetchingAdmins = false;
      });
  }

  deleteAdmin(admin) {
    const deleteDialogRef = this.dialog.open(DeleteComponent, {
      data: { id: admin.id, type: 'admin' },
    });
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdmins();
      }
    });
  }
}
