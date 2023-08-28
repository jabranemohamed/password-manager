import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PasswordManagerService} from "../password-manager.service";
import {Observable} from "rxjs";
import {AES, enc} from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteId !: string;
  siteName!: string;
  siteURL !: string;
  siteImgURL !: string;
  passwordList !: Array<any>;

  email !: string;
  username  !: string;
  password  !: string;
  passwordId  !: string;
  formState: string = 'Add new'

  isSuccess: boolean = false;
  successMessage !: string;

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImage;
    })
    this.loadPasswords();
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.passwordId = '';
    this.formState = '';
    this.password = '';
  }

  onSubmit(value: any) {
    value.password = this.encrypPassword(value.password);
    if (this.formState == 'Add new') {
      this.passwordManagerService.addPassword(value, this.siteId)
        .then(() => {
          this.showAlert("Password Save Successffuly ");
          this.resetForm();
        })
        .catch(() => {

        })
    } else if (this.formState == 'Edit') {
      this.passwordManagerService.updatePassword(this.siteId, this.passwordId, value)
        .then(() => {
          this.showAlert("Password updated Successffuly ");
          this.resetForm();
        })
        .catch(() => {

        })
    }
  }

  loadPasswords() {
    this.passwordManagerService.loadPassword(this.siteId).subscribe((val) => {
      this.passwordList = val;
    })
  }

  editPassword(email: string, username: string, password: string, id: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = id;
    this.formState = 'Edit'

  }

  deletePassword(password: string) {
    this.passwordManagerService.deletePassword(this.siteId, password)
      .then(() => {
        this.showAlert('Data Deleted');
        this.resetForm();
      })
      .catch(() => {
        this.showAlert('Exception  Deleted')
      })
  }

  encrypPassword(password: string) {
    const secretKey = 'Qf/bHvw9HSDXVbu90HQKt3uTtK9nL+0boCTEVo+PMAn97AjGrztU3TjOGCaNX//i\n';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = 'Qf/bHvw9HSDXVbu90HQKt3uTtK9nL+0boCTEVo+PMAn97AjGrztU3TjOGCaNX//i\n';
    const decryptedPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decryptedPassword;
  }

  onDecryptPassword(password: string, i: number) {
    const decPassword = this.decryptPassword(password)
    this.passwordList[i].password = decPassword;
  }
}
