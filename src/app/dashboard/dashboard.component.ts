import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('snav') sideBar: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isSideNavOpened = true;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private fireService: FirebaseService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isSideNavOpened = !this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.fireService.logout();
  }
}
