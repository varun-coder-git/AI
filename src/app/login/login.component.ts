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
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormDataComponent, LoginFormDataComponent, ForgotPasswordDetail, SocialLoginDetail } from './../data-model/formData.component';
import { ToasterService, ToasterConfig,ToasterContainerComponent } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AuthGuard } from '../auth.guard';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { IpServiceService } from '../services/ip-service.service';
// import {
//   AuthService,
//   FacebookLoginProvider,
//   GoogleLoginProvider
// } from 'angular-6-social-login';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

declare var IN : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FormDataComponent: FormDataComponent;
  LoginFormDataComponent: LoginFormDataComponent;
  ForgotPasswordDetail: ForgotPasswordDetail;
  SocialLoginDetail: SocialLoginDetail;
  private toasterService: ToasterService;
  submitted: boolean;
  loginSubmitted: boolean;
  forgotSubmitted: boolean;
  modalRef!: BsModalRef;
  forgotUserEmail: string;
  showOTP: boolean;
  additional_form: boolean;
  confirmPassword: string | undefined;
  disabledValue: boolean = false;
  ipAddress:string | undefined;


  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    showCloseButton: true,
    timeout: 2000
  });

  constructor(toasterService: ToasterService,
    public toastrService:ToastrService,
    private serviceApi: ApiService,
    private modalService: BsModalService,
    public nav: NavbarService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private socialAuthService: SocialAuthService, private authGuardService: AuthGuard,private ip:IpServiceService) {
    this.FormDataComponent = new FormDataComponent();
    this.LoginFormDataComponent = new LoginFormDataComponent();
    this.ForgotPasswordDetail = new ForgotPasswordDetail();
    this.SocialLoginDetail = new SocialLoginDetail();
    this.toasterService = toasterService;
    this.submitted = true;
    this.loginSubmitted = true;
    this.forgotUserEmail = '';
    this.showOTP = false;
    this.additional_form = false;
    this.forgotSubmitted = true;
    this.LoginFormDataComponent.login_details.LoginType = 1;
    
  }

  ngOnInit() {
    this.getIP();
    this.nav.hide();
    var linkedIn = document.createElement("script");
    linkedIn.type = "text/javascript";
    linkedIn.src = "https://platform.linkedin.com/in.js";
    linkedIn.innerHTML = "\n"+
        "api_key: 81ak63lvx88plu\n" +
        "authorize: true\n" +
        "scope: r_basicprofile r_emailaddress";
    document.head.appendChild(linkedIn);
  }

  postData(data :any, url:any) {
    return this.serviceApi.postData(url, data);
  }

  // popToast(messageType:any, message:any) {
  //   this.toasterService.pop(messageType, message);
  // }

  signup(signupForm:any): any {
    const formFlag = this.validateForm('signup', signupForm);
    this.submitted = false;
    if (formFlag) {
      this.FormDataComponent.user.StatusId = 1;
      this.FormDataComponent.user.RoleId = 2;
      this.FormDataComponent.user.IsOrganisation = 0;
      this.FormDataComponent.user.UserDetail.UserId = 0;
      this.FormDataComponent.user.UserDetail.Address = '';
      this.FormDataComponent.user.UserDetail.ContactNumber = Number(this.FormDataComponent.user.UserDetail.ContactNumber);
      this.FormDataComponent.user.UserDetail.Email = this.FormDataComponent.user.UserName;
      this.disabledValue = true;
      const url = 'user/create/';
      this.spinnerService.show();
      this.postData(this.FormDataComponent.user, url)
        .subscribe(
          response => {
            this.spinnerService.hide();
            signupForm.reset();
            this.submitted = true;
            //this.popToast('success', 'Thank you for registering.');
            // this.popToast('success', 'Wooowzzaa! Thank you for your registration with Experizer! We are all set to beam you up but first, please verify yourself by clicking on the link from the email that was sent to you.');
            this.toastrService.success('Wooowzzaa! Thank you for your registration with Experizer! We are all set to beam you up but first, please verify yourself by clicking on the link from the email that was sent to you.'); 
            this.disabledValue = false;
          },
          error => {
            this.spinnerService.hide();
            // this.popToast('error', 'Sorry but looks like we have met before! Found an account with this email on Experizer. Try login in or changing your password.');
            this.toastrService.error( 'Sorry but looks like we have met before! Found an account with this email on Experizer. Try login in or changing your password.');
            this.disabledValue = false;
          }
        );
    }
  }

  login(loginForm:any): any {
    const formFlag = this.validateForm('login', loginForm);
    this.loginSubmitted = false;
    if (formFlag) {
      const url = 'user/login/';
      this.LoginFormDataComponent.login_details.LoginMode = 3;
      this.LoginFormDataComponent.login_details.IpAddress=this.ipAddress;
      console.log(  this.LoginFormDataComponent.login_details);
      this.spinnerService.show();
      this.serviceApi.post(this.LoginFormDataComponent.login_details, url)
        .subscribe(
          response => {
            this.spinnerService.hide();
            loginForm.reset();
            const responseData = response.json();

            if (responseData['userData'].ExpiryDate !== null) {
              let planExpiryDate = new Date(responseData['userData'].ExpiryDate);
              let currentDate = new Date();
              planExpiryDate.setHours(24, 0, 0, 0);
              if (planExpiryDate.getTime() > currentDate.getTime()) {
                window.sessionStorage.setItem('planExpiryFlag', '1');
                localStorage.setItem('planExpiryFlag', '1');
                this.authGuardService.setPlanExpiryFlag(true);
              } else {
                window.sessionStorage.setItem('planExpiryFlag', '0');
                localStorage.setItem('planExpiryFlag', '0');
                this.authGuardService.setPlanExpiryFlag(false);
              }
            } else {
              window.sessionStorage.setItem('planExpiryFlag', '1');
              localStorage.setItem('planExpiryFlag', '1');

            }

            if (responseData['token'] !== undefined) {
              if (responseData['userData']['CategoryId'] == 0) {
                this.router.navigateByUrl('/preDashboard');
              }
              else {
                this.router.navigateByUrl('/dashboard');
              }
              window.sessionStorage.setItem('token', responseData['token']);
              window.sessionStorage.setItem('userId', responseData['userData'].Id);
              window.sessionStorage.setItem('ParentFolder', responseData['userData'].AssetFolder);
              window.sessionStorage.setItem('Name', responseData['userData'].Name);
              window.sessionStorage.setItem('Plan', responseData['userData'].PlanName);
              window.sessionStorage.setItem('UserName', responseData['userData'].UserName);
              window.sessionStorage.setItem('ProfileImageUrl', responseData['userData'].ProfileImageUrl);
              window.sessionStorage.setItem('ContactNumber', responseData['userData'].ContactNumber);
              window.sessionStorage.setItem('PatronCount', responseData['userData'].PatronCount);
              window.sessionStorage.setItem('needHelpFlag', ""+false);
              window.sessionStorage.setItem('PersonaId', responseData['userData'].CategoryId);

              localStorage.setItem('needHelpFlag', ''+false);
              localStorage.setItem('token', responseData['token']);
              localStorage.setItem('userId', responseData['userData'].Id);
              localStorage.setItem('ParentFolder', responseData['userData'].AssetFolder);
              localStorage.setItem('Name', responseData['userData'].Name);
              localStorage.setItem('Plan', responseData['userData'].PlanName);
              localStorage.setItem('UserName', responseData['userData'].UserName);
              localStorage.setItem('ProfileImageUrl', responseData['userData'].ProfileImageUrl);
              localStorage.setItem('ContactNumber', responseData['userData'].ContactNumber);
              localStorage.setItem('PatronCount', responseData['userData'].PatronCount);
              localStorage.setItem('PersonaId', responseData['userData'].CategoryId);
              this.serviceApi.setToken(responseData['token']);
            }
          },
          error => {
            // this.spinnerService.hide();
            // // this.router.navigateByUrl('/LoginValidation');
            // this.popToast('error', 'Please enter valid credentials');
            this.spinnerService.hide();
            const errorData = error.json();
            this.toastrService.error( errorData['message']);
            // this.popToast('error', errorData['message']);
        
          }
        );
    }
  }

  forgotPassword(forgotForm:any): any {
    const formFlag = this.validateForm('forgot', forgotForm);
    this.forgotSubmitted = false;
    if ((formFlag == true) && (this.additional_form == false)) {
      const url = 'user/forgotPassword/';
      this.spinnerService.show();
      this.serviceApi.post(this.ForgotPasswordDetail, url)
        .subscribe(
          response => {
            this.spinnerService.hide();
            this.showOTP = true;
            this.additional_form = true;
            this.forgotSubmitted = true;
          },
          error => {
            this.spinnerService.hide();
            // this.popToast('error', 'Could not get you a new password this time. Looks like you will have to try again or write to us at care@experizer.com');
            this.toastrService.error( 'Could not get you a new password this time. Looks like you will have to try again or write to us at care@experizer.com');
          }
        );
    }
    if ((formFlag == true) && (this.additional_form == true)) {
      const authenticateFlag = this.validateForm('forgot', forgotForm);
      this.forgotSubmitted = false;
      if (authenticateFlag) {
        this.spinnerService.show();
        const url = 'user/authenticateOTP/';
        this.serviceApi.post(this.ForgotPasswordDetail, url)
          .subscribe(
            response => {
              this.spinnerService.hide();
              const responseData = response.json();
              if (responseData['status'] == true) {
                forgotForm.reset();
                this.forgotSubmitted = true;
                this.showOTP = false;
                this.modalRef.hide();
               // this.popToast('success', responseData['message']);
              //  this.popToast('success', 'Done! Your password has been changed.');
               this.toastrService.success('Done! Your password has been changed.'); 
              } else {
                // this.popToast('error', 'Could not get you a new password this time. Looks like you will have to try again or write to us at care@experizer.com');
                this.toastrService.error( 'Could not get you a new password this time. Looks like you will have to try again or write to us at care@experizer.com');
              }
            },
            error => {
              this.spinnerService.hide();
              // this.popToast('error', 'Could not get you a new password this time. Looks like you will have to try again or write to us at care@experizer.com');
              this.toastrService.error( 'Could not get you a new password this time. Looks like you will have to try again or write to us at care@experizer.com');
            }
          );
      }
    }
  }

  validateForm(formName:any, form:any):any {
    if (formName == 'signup') {
      if (form.valid) {
        return true;
      } else {
        return false;
      }
    }
    if (formName == 'login') {
      if (form.valid) {
        return true;
      } else {
        return false;
      }
    }
    if (formName == 'forgot') {
      if (form.valid) {
        return true;
      } else {
        return false;
      }
    }
  }

  openModal(template: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template, { class: 'modal-md modal-content-margin' });
    this.showOTP = false;
    this.additional_form = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-content-radius' });
  }

  closeForgotModel(forgotForm :any) {
    forgotForm.reset();
    this.forgotSubmitted = true;
    this.showOTP = false;
    this.modalRef.hide();
  }

  drawUserCustom(userData:any) {
    this.SocialLoginDetail.OrganizationName = userData.positions.values[0].company.name;
    this.SocialLoginDetail.name = userData.firstName + ' ' + userData.lastName;
    this.SocialLoginDetail.email = userData.emailAddress;
    // this.SocialLoginDetail.profileImageSrc = userData.pictureUrl;
    this.SocialLoginDetail.token = IN.ENV.auth.oauth_token;
    this.SocialLoginDetail.ContactNumber = 0;
    if ((this.SocialLoginDetail.OrganizationName == null) || (this.SocialLoginDetail.OrganizationName == undefined)) {
      this.SocialLoginDetail.OrganizationName = '';
    }
    // if ((this.SocialLoginDetail.profileImageSrc == null) || (this.SocialLoginDetail.profileImageSrc == undefined)) {
    //   this.SocialLoginDetail.profileImageSrc = '-';
    // }
    // Now sign-in with userData
    // ...
    const url = 'user/login/';
    this.spinnerService.show();
    this.serviceApi.post(this.SocialLoginDetail, url)
    .subscribe(
      response => {
        const responseData = response.json();
        this.spinnerService.hide();
        if (responseData['token'] !== undefined) {
          if (responseData['userData'].ExpiryDate !== null) {
            let planExpiryDate = new Date(responseData['userData'].ExpiryDate);
            let currentDate = new Date();
            planExpiryDate.setHours(24, 0, 0, 0);
            if (planExpiryDate.getTime() > currentDate.getTime()) {
              window.sessionStorage.setItem('planExpiryFlag', '1');
              localStorage.setItem('planExpiryFlag', '1');
              this.authGuardService.setPlanExpiryFlag(true);
            } else {
              window.sessionStorage.setItem('planExpiryFlag', '0');
              localStorage.setItem('planExpiryFlag', '0');
              this.authGuardService.setPlanExpiryFlag(false);
            }
          } else {
            window.sessionStorage.setItem('planExpiryFlag', '1');
            localStorage.setItem('planExpiryFlag', '1');

          }
          let loginMode = this.SocialLoginDetail.LoginMode.toString();
          window.sessionStorage.setItem('token', responseData['token']);
          window.sessionStorage.setItem('userId', responseData['userData'].Id);
          window.sessionStorage.setItem('ParentFolder', responseData['userData'].AssetFolder);
          window.sessionStorage.setItem('Name', responseData['userData'].Name);
          window.sessionStorage.setItem('Plan', responseData['userData'].PlanName);
          window.sessionStorage.setItem('UserName', responseData['userData'].UserName);
          window.sessionStorage.setItem('ProfileImageUrl', responseData['userData'].ProfileImageUrl);
          window.sessionStorage.setItem('lMode', loginMode);
          window.sessionStorage.setItem('PatronCount', responseData['userData'].PatronCount);
          window.sessionStorage.setItem('PersonaId', responseData['userData'].CategoryId);

          localStorage.setItem('token', responseData['token']);
          localStorage.setItem('userId', responseData['userData'].Id);
          localStorage.setItem('ParentFolder', responseData['userData'].AssetFolder);
          localStorage.setItem('Name', responseData['userData'].Name);
          localStorage.setItem('Plan', responseData['userData'].PlanName);
          localStorage.setItem('UserName', responseData['userData'].UserName);
          localStorage.setItem('ProfileImageUrl', responseData['userData'].ProfileImageUrl);
          localStorage.setItem('PatronCount', responseData['userData'].PatronCount);
          localStorage.setItem('lMode', loginMode);
          localStorage.setItem('PersonaId', responseData['userData'].CategoryId);

          this.serviceApi.setToken(responseData['token']);
          if (responseData['userData']['CategoryId'] == 0) {
            this.router.navigateByUrl('/preDashboard');
          }
          else {
            this.router.navigateByUrl('/dashboard');
          }
        }
      },
      error => {
        this.spinnerService.hide();
        const errorData = error.json();
        // this.popToast('error', errorData['message']);
        this.toastrService.error( errorData['message']);
      }
      );
      return this.SocialLoginDetail;
  }

  public onLinkedInLoadCustom() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      IN.User.authorize(function () {
        IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url,positions:(is-current,company:(name)))').result(function (res:any) {
          resolve(_this.drawUserCustom(res));
        });
      });
    });
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if (socialPlatform == 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      this.SocialLoginDetail.LoginMode = 1;
    } else if (socialPlatform == 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.SocialLoginDetail.LoginMode = 2;
    } else if (socialPlatform == "linkedin") {
      this.SocialLoginDetail.LoginMode = 2;
      this.onLinkedInLoadCustom();   
    }

    if ( (socialPlatform == 'facebook') || (socialPlatform == 'google') ) {
      this.socialAuthService.signIn(socialPlatformProvider || '{}').then(
        (userData) => {
          this.SocialLoginDetail.name = userData.name;
          this.SocialLoginDetail.email = userData.email;
          // this.SocialLoginDetail.token = userData.token;
          // this.SocialLoginDetail.profileImageSrc = userData.image;
          this.SocialLoginDetail.token = userData.authToken;
          this.SocialLoginDetail.profileImageSrc = userData.photoUrl;
          this.SocialLoginDetail.OrganizationName = '';
          this.SocialLoginDetail.ContactNumber = 0;
          // Now sign-in with userData
          // ...
          const url = 'user/login/';
          this.spinnerService.show();
          this.serviceApi.post(this.SocialLoginDetail, url)
            .subscribe(
              response => {
                const responseData = response.json();

                this.spinnerService.hide();
                if (responseData['token'] !== undefined) {
                  if (responseData['userData'].ExpiryDate !== null) {
                    let planExpiryDate = new Date(responseData['userData'].ExpiryDate);
                    let currentDate = new Date();
                    planExpiryDate.setHours(24, 0, 0, 0);
                    if (planExpiryDate.getTime() > currentDate.getTime()) {
                      window.sessionStorage.setItem('planExpiryFlag', '1');
                      localStorage.setItem('planExpiryFlag', '1');
                      this.authGuardService.setPlanExpiryFlag(true);
                    } else {
                      window.sessionStorage.setItem('planExpiryFlag', '0');
                      localStorage.setItem('planExpiryFlag', '0');
                      this.authGuardService.setPlanExpiryFlag(false);
                    }
                  } else {
                    window.sessionStorage.setItem('planExpiryFlag', '1');
                    localStorage.setItem('planExpiryFlag', '1');
               
                  }
                  let loginMode = this.SocialLoginDetail.LoginMode.toString();
                  window.sessionStorage.setItem('token', responseData['token']);
                  window.sessionStorage.setItem('userId', responseData['userData'].Id);
                  window.sessionStorage.setItem('ParentFolder', responseData['userData'].AssetFolder);
                  window.sessionStorage.setItem('Name', responseData['userData'].Name);
                  window.sessionStorage.setItem('Plan', responseData['userData'].PlanName);
                  window.sessionStorage.setItem('UserName', responseData['userData'].UserName);
                  window.sessionStorage.setItem('ProfileImageUrl', responseData['userData'].ProfileImageUrl);
                  window.sessionStorage.setItem('PatronCount', responseData['userData'].PatronCount);
                  window.sessionStorage.setItem('lMode', loginMode);
                  window.sessionStorage.setItem('PersonaId', responseData['userData'].CategoryId);

                  localStorage.setItem('token', responseData['token']);
                  localStorage.setItem('userId', responseData['userData'].Id);
                  localStorage.setItem('ParentFolder', responseData['userData'].AssetFolder);
                  localStorage.setItem('Name', responseData['userData'].Name);
                  localStorage.setItem('Plan', responseData['userData'].PlanName);
                  localStorage.setItem('UserName', responseData['userData'].UserName);
                  localStorage.setItem('ProfileImageUrl', responseData['userData'].ProfileImageUrl);
                  localStorage.setItem('PatronCount', responseData['userData'].PatronCount);
                  localStorage.setItem('lMode', loginMode);
                  localStorage.setItem('PersonaId', responseData['userData'].CategoryId);

                  this.serviceApi.setToken(responseData['token']);
                  if (responseData['userData']['CategoryId'] == 0) {
                    this.router.navigateByUrl('/preDashboard');
                  }
                  else {
                    this.router.navigateByUrl('/dashboard');
                  }
                }
              },
              error => {
                this.spinnerService.hide();
                const errorData = error.json();
                // this.popToast('error', errorData['message']);
                this.toastrService.error( errorData['message']);
              }
            );
        }
      );
    }
  }

  getIP()
  {
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    });
  }

}

