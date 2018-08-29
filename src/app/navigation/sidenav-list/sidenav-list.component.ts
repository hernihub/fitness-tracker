import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);

    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      // this.isAuth = authStatus; // Whenever you subscribe to an observable you should unsuscribe when is not
                                // needed anymore to prevent memory leaks.
    // });
  }

  private onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
