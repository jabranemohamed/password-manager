import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PasswordManagerService} from "../password-manager.service";
import {Observable} from "rxjs";

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
  passwordList !: Observable<Array<any>>;

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      console.log("val.siteImgURL", val)
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImage;
    })
    this.loadPasswords();
  }

  onSubmit(value: any) {
    this.passwordManagerService.addPassword(value,this.siteId)
      .then(() => {
       console.log("khjgfqsg ")
      })
      .catch(() => {

      })
  }

  loadPasswords(){
    this.passwordList = this.passwordManagerService.loadPassword(this.siteId)
  }
}
