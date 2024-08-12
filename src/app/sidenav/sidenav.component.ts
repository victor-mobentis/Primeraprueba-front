import { ChangeDetectorRef, Component, ViewChild, computed, signal } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditPopupComponent } from '../configuration/configuration-general/profile-edit-popup/profile-edit-popup.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class PagesComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    public _loginServices: LoginService,
    private router: Router,
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  isExpanded = signal(true);

  sidenavWidth = computed(() => (this.isExpanded() ? '250px' : '70px'));
  
  profilePicSice = computed(() => this.isExpanded() ? '70' : '32');

  ngOnInit(): void {
    // this.img = localStorage.getItem('img');
    // this.username = localStorage.getItem('user');
    // this.cargo = localStorage.getItem('cargo');
  }

  openProfileEditPopup(): void {
    const dialogRef = this.dialog.open(ProfileEditPopupComponent, {
      width: '400px',
      disableClose: true
    });
  }

  logout() {
    this._loginServices.logout();
    this.router.navigateByUrl('/login');
  }
}
