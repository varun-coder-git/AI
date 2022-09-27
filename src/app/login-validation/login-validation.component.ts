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
import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormDataComponent, LoginFormDataComponent, ForgotPasswordDetail } from './../data-model/formData.component';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-login-validation',
  templateUrl: './login-validation.component.html',
  styleUrls: ['./login-validation.component.css']
})
export class LoginValidationComponent implements OnInit {
  FormDataComponent: FormDataComponent;
  LoginFormDataComponent: LoginFormDataComponent;
  private toasterService: ToasterService;
  ForgotPasswordDetail: ForgotPasswordDetail;
  submitted: boolean;
  loginSubmitted: boolean;
  modalRef!: BsModalRef;
  forgotSubmitted: boolean;
  forgotUserEmail!: string;
  showOTP!: boolean;
  additional_form: boolean;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    showCloseButton: true,
    timeout: 2000
  });

  
  constructor(toasterService: ToasterService,
    public toastrService:ToastrService,
    private serviceApi: ApiService,
    public nav: NavbarService,
    private modalService: BsModalService,
    private router: Router) {
      this.FormDataComponent = new FormDataComponent();
      this.LoginFormDataComponent = new LoginFormDataComponent();
      this.ForgotPasswordDetail = new ForgotPasswordDetail();
      this.toasterService = toasterService;
      this.submitted = true;
      this.loginSubmitted = true;
      this.forgotSubmitted = true;
      this.additional_form = false;
      this.LoginFormDataComponent.login_details.LoginType = 1;
     }

  ngOnInit() {
    this.nav.hide();
  }

  // popToast(messageType:any, message:any) {
  //   this.toasterService.pop(messageType, message);
  // }
  
  login(loginForm:any): any {

    let formFlag = this.validateForm('login',loginForm);
    this.loginSubmitted = false;
    if (formFlag) {
      let url = 'user/login/';
      this.LoginFormDataComponent.login_details.LoginMode = 3;
      this.serviceApi.post(this.LoginFormDataComponent.login_details, url)
        .subscribe(
          response => {
            loginForm.reset();
            let responseData = response.json();
            if(responseData['userData']['CategoryId'] == 0){
              this.router.navigateByUrl('/preDashboard');}
              else{
                this.router.navigateByUrl('/dashboard');
              }
            window.sessionStorage.setItem('token', responseData['token']);
            window.sessionStorage.setItem('userId', responseData['userData'].Id);
            this.serviceApi.setToken(responseData['token']);          },
          error => {
            let errorData = error.json();
            if (errorData == null) {
              // this.popToast('error', errorData['message']);
              this.toastrService.error( errorData['message']);
            } else {
              // this.popToast('error', 'Failed To Login.');
              this.toastrService.error( 'Failed To Login.');
            }
            
          }
        );
    }
  }

  forgotPassword(forgotForm:any): any {
    let formFlag = this.validateForm('forgot',forgotForm);
    this.forgotSubmitted = false;
    if ((formFlag == true) && (this.additional_form == false)) {      
      let url = 'user/forgotPassword/';
      this.serviceApi.post(this.ForgotPasswordDetail, url)
      .subscribe(
        response => {
          this.showOTP = true;
          this.additional_form = true;
          this.forgotSubmitted = true;
        },
        error => {
          // this.popToast('error', 'Failed To Request Forgot Password.');
          this.toastrService.error( 'Failed To Request Forgot Password.');
        }
        );      
    }
    if ((formFlag == true) && (this.additional_form == true)) {
      let authenticateFlag = this.validateForm('forgot',forgotForm);
      this.forgotSubmitted = false;
      if (authenticateFlag) {
        let url = 'user/authenticateOTP/';
        this.serviceApi.post(this.ForgotPasswordDetail, url)
        .subscribe(
          response => {
            let responseData = response.json();
            if (responseData['status'] == true) {
              forgotForm.reset();
              this.showOTP = false;
              this.modalRef.hide();
              // this.popToast('success', responseData['message']);
              this.toastrService.success(responseData['message']);
            } else {
              // this.popToast('error', responseData['message']);
              this.toastrService.error( responseData['message']);
            }
            
          },
          error => {
            // this.popToast('error', 'Failed To Request Forgot Password.');
            this.toastrService.error( 'Failed To Request Forgot Password.');
          }
          );
      }
    }
  }

  validateForm(formName:any,form:any):any {
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
    this.modalRef = this.modalService.show(template,{class: 'modal-md modal-content-margin'});
  }

  closeForgotModel(forgotForm:any) {
    forgotForm.reset();
    this.forgotSubmitted = true;
    this.showOTP = false;
    this.modalRef.hide();
  }
  signUPLink(){
    this.router.navigateByUrl('/login');
  }
}
