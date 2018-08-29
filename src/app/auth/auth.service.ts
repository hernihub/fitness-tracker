import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  // authChange = new Subject<boolean>();
  private user: User;
  // private isAuthenticated = false;
  constructor(private router: Router,
              private appAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackbar: MatSnackBar,
              private uiService: UIService,
              private store: Store<fromRoot.State>) {}

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.appAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 3500);
    });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.appAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 3500);
    });
  }

  initAuthListener() {
    this.appAuth.authState.subscribe(user => {
      if (user) {
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.store.dispatch(new Auth.Authenticate());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        // this.authChange.next(false);
        this.store.dispatch(new Auth.UnAuthenticate());
        this.router.navigate(['/login']);
        // this.isAuthenticated = false;
      }
    });
  }

  logout() {
    this.trainingService.cancelSubscriptions();
    this.appAuth.auth.signOut();
    // this.authChange.next(false);
    this.router.navigate(['/login']);
    // this.isAuthenticated = false;
  }
}
