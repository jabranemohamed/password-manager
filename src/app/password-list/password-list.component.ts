import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PasswordManagerService} from "../password-manager.service";

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

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      console.log("val.siteImgURL", val)
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImage;
    })
  }

  onSubmit(value: any) {
    this.passwordManagerService.addPassword(value,this.siteId)
      .then(() => {
       console.log("khjgfqsg ")
      })
      .catch(() => {

      })
  }
}
