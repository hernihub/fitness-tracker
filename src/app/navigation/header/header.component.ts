import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription; //

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      // this.isAuth = authStatus; // Whenever you subscribe to an observable you should unsuscribe when is not
                                // needed anymore to prevent memory leaks.
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
