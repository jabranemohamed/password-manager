import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Auth, authState, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(private afAuth: Auth, private router: Router) {
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.afAuth, email, password).then(logRef => {
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/site-list']);
    }).catch(e => {
    })
  }

  loadUser() {
    authState(this.afAuth).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));

    });
  }

  logOut() {
    signOut(this.afAuth).then(() => {
      localStorage.removeItem('user');

      this.loggedIn.next(false);
      this.isLoggedInGuard = false;

      this.router.navigate(['/']);
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}
