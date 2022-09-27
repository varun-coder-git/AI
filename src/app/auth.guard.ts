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
import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { CreateExperienceComponent } from './create-experience/create-experience.component';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate

 {
  planExpiryFlag!: boolean;
  flag: number;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    showCloseButton: true,
    timeout: 2000
  });

  constructor(toasterService: ToasterService,
   public toastrService: ToastrService,
    private serviceApi: ApiService,
    private router: Router
  ) {
    this.flag = parseInt(window.sessionStorage.getItem('planExpiryFlag') || '{}');
    this.toasterService = toasterService;
  }

  // popToast(messageType:any, message:any) {
  //   this.toasterService.pop(messageType, message);
  // }

  getPlanExpiryFlag() {
    return this.planExpiryFlag;
  }

  setPlanExpiryFlag(flag:any) {
    this.planExpiryFlag = flag;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let tokenExpire = false;
    if (localStorage.getItem('planExpiryFlag') == '' || localStorage.getItem('planExpiryFlag') == null) {
      this.toastrService.warning('You must login to continue.');
      this.router.navigate(['/login']);
      return false;
    } else {
      this.flag = parseInt(localStorage.getItem('planExpiryFlag') || '{}') ? parseInt(localStorage.getItem('planExpiryFlag') || '{}') : parseInt(window.sessionStorage.getItem('planExpiryFlag') || '{}');
      if (this.flag !== 1) {
        this.toastrService.warning('Your plan has expired. Please renew your Plan.');
        this.router.navigate(['/subscription']);
        return false;
      }
      else {
        return true;
      }
    }

  }

  canDeactivate(
    component: CreateExperienceComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): any {
    if (this.serviceApi.isCustomizationEnd == false)
      return false;
    else if (this.serviceApi.isCustomizationEnd == true)
      return true;
  }
}
