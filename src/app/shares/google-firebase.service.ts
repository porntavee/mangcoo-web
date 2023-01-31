import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ServiceProviderService } from './service-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleFirebaseService {
  constructor(
    private afAuth: AngularFireAuth,
    private serviceProviderService: ServiceProviderService,
    private router: Router,
    ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;
    if (!isAuthenticated) {
      alert("error");
    }
    return isAuthenticated;
  }

  setLocalStorage(param) {
    localStorage.setItem('token', param.token);
    localStorage.setItem('profileCode', param.profileCode);
    localStorage.setItem('userId', param.userId);
    localStorage.setItem('username', param.username);
    localStorage.setItem('first_name', param.first_name);
    localStorage.setItem('last_name', param.last_name);
    localStorage.setItem('email', param.email);
    localStorage.setItem('type', param.type);
    localStorage.setItem('imageUrl', param.imageUrl);
  }

  signIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider).then(data => {
      console.log(data)
      let profile = data.additionalUserInfo.profile;
      let model = {
        token: data.credential["idToken"],
        userId: profile["id"],
        username: profile["name"],
        first_name: profile["given_name"],
        last_name: profile["family_name"],
        imageUrl: profile["picture"],
        email: profile["email"],
        type: 'google',
      };
      this.serviceProviderService.post('w/login/login', model).subscribe(data => {
        model["profileCode"] = data["objectData"].code;
        this.setLocalStorage(model);
        this.router.navigate(['']);

      }, err => {
      }
      );
    }
    );
  }


  signOut() {
    this.afAuth.signOut();
  }
}
