 /*************************************************************************
 * 
 * EQUATIONS WORK CONFIDENTIAL
 * __________________
 * 
 *  [2018] - [2020] Equations Work IT Services Private Limited, India
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Equations Work IT Services Private Limited and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Equations Work IT Services Private Limited
 * and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Equations Work IT Services Private Limited.
*
 * Copyright (C) Equations Work IT Services Pvt. Ltd.
 * NOTE: Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Owned and written by the proprietors of Equations Work IT Private Limited, India, August 2018
 */
import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
//import { TabsetComponent } from 'ngx-bootstrap';
import { Router,  RoutesRecognized } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  //  @ViewChild('staticTabs')
  // staticTabs!: TabsetComponent;
termsFlag: any;
privacyFlag: any;
locationLenght: any;
  constructor(public nav: NavbarService, public router: Router, private locations: Location) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.nav.hide();
    this.termsFlag = true;
    this.privacyFlag = false;
     if (window.location.href.indexOf('term') > -1) {
        // $('html, body').animate({
        //   scrollTop: $('#serviceMainDiv').offset().top
        //   }, 1000);
      this.selectTab(0);
     } else if (window.location.href.indexOf('privacypolicy') > -1) {
        // $('html, body').animate({
        //   scrollTop: $('#serviceMainDiv').offset().top
        //   }, 1000);
           this.selectTab(1);
  }
   this.router.events
            .pipe(filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
                // console.log(e[0].urlAfterRedirects); // previous url
                this.locationLenght = e[0].urlAfterRedirects;
            });
  }
  scrollToDiv(el:any) {
    // console.log(el);
    el.scrollIntoView();
}

selectTab(tab_id: number) {
   window.scroll(0, 0);
  //  console.log('tab id:' , tab_id);
  //this.staticTabs.tabs[tab_id].active = true;
  if(tab_id == 0)
  {
    this.router.navigateByUrl('/term');
  }
  else
  {
    this.router.navigateByUrl('/privacypolicy');
  }
  }

TermsSideBar() {
this.termsFlag = true;
this.privacyFlag = false;
this.router.navigateByUrl('/term');
}

PrivacySideBar() {
this.termsFlag = false;
this.privacyFlag = true;
this.router.navigateByUrl('/privacypolicy');
}

navigateTo() {
if (this.locations.back() !== null) {
this.router.navigateByUrl('/login');
  } else {
this.locations.back();
  }
}
}

