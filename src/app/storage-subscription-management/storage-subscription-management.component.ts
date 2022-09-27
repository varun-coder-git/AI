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
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from '../services/navbar.service';
declare var require: any;
declare var $: any;

@Component({
  selector: 'app-storage-subscription-management',
  templateUrl: './storage-subscription-management.component.html',
  styleUrls: ['./storage-subscription-management.component.css']
})
export class StorageSubscriptionManagementComponent implements OnInit {
  formDataVar: any;
  educationalPlans!: any[];
  individualPlans!: any[];
  private toasterService: ToasterService;
  // public config: ToasterConfig = new ToasterConfig({
  //   positionClass: 'toast-top-center',
  //   animation: 'fade',
  //   limit: 3,
  //   timeout: 40000000,
  //   showCloseButton: true,
  // });
  UserPlanId:any;
  CurrentPlanExpired:any=false;
  cnt!: number;
  userId: any;
  token: any;
  modalRef!: BsModalRef;
  type!: string;
  totalExperiences: number;
  publishedExperiences: number;
  totalPatrons: number;
  totalViews: number;
  totalViewCount!: number;
  totalDaysCount!: number;
  totalStorageCount!: number;
  viewsConsumed!: number;
  RemainingStorage!: number;
  ViewType!: string;
  stacked: any[] = [];
  views: any[] = [];
  daysArray: any[] = [];
  storageArray: any[] = [];
  daysSpend: any;
  result: any;
  analytics: any;
  json: any;
  planType!: number;
  planId!: number;
  pieChartLabels!:string[];
  pieChartData:any;
  pieChartType:any;
  pieChartLegend:any;
  isStorage:boolean = false;
  plans:any;
  planname:any;
  addOns:any;

  constructor(public toastrService:ToastrService,private router: Router, private serviceApi: ApiService, toasterService: ToasterService,
     private modalService: BsModalService, public nav: NavbarService ) {
    this.json = require('./storageSubsription.json');
    this.toasterService = toasterService;
    this.userId = window.sessionStorage.getItem('userId');
    this.totalExperiences = 0;
    this.publishedExperiences = 0;
    this.totalPatrons = 0;
    this.totalViews = 0;
    this.result = {};
    this.analytics = {};
  }
  ngOnInit() {
    
    this.nav.show();
    this.getViewCountDaysCountStorageCount();
    this.getAnalyticsData();
    this.getCurrentPlan();
    this.getAllPlan();
    this.getAllAddOns();
    window.scroll(0, 0);

    this.pieChartLegend = {
      legend:{position:"bottom"},
      showAllTooltips:true
      
    }
  //  this.getPlanId();
  }
  getCurrentPlan(){
    let url = 'subscription/activePlan/' + parseInt(window.sessionStorage.getItem('userId')||'{}');
    this.serviceApi.getData(url)
      .subscribe(
        (response:any) => {
          var data=response['data'];
          this.UserPlanId=data[0].PlanId;
          var dateTime=new Date(data[0].ExpiryDate);
        //   console.log("date",dateTime );
        // console.log("Date",new Date() );
        if(dateTime<=(new Date())){
          this.CurrentPlanExpired=true;
          // console.log("Date",new Date() );
        }
      },
        error => {
          // this.popToast('error', 'Woooops! Cannot get Active Plan.');
        }
      )
  }
  public chartClicked(e:any):void {
    // console.log(e);
  }
 
  public chartHovered(e:any):void {
    // console.log(e);
  }

  progressBarMouseEvent(e:any) {
    // console.log('On mouse over', e);
    // const target = e.target;
    e.target.classList.add('toolright');
  }

  mouseUpEvent(e:any) {
    // console.log('On mouse relese', e);
  }

  callStorage() {
   // this.router.navigateByUrl('/assetsmanagement');
   $(".active6").click();
  }


  getAllPlan() {
    this.serviceApi.getData('subscription/planactive')
      .subscribe((results:any) => {
        this.plans = results['data'];
        this.individualPlans = [];
        this.educationalPlans = [];
        this.plans.forEach((element:any) => {
            if(element.PlanType == 0){
              element.StorageAllowedInMB = element.StorageAllowed / 1048576;
              if(element.StorageAllowedInMB == 1024){
                element.StorageAllowedInMB = "1 GB"
              }
              else{
                element.StorageAllowedInMB = element.StorageAllowedInMB + "MB";
              }
              this.individualPlans.push(element);
            }
            else if(element.PlanType == 1){
              element.StorageAllowedInMB = element.StorageAllowed / 1048576 ;
              if(element.StorageAllowedInMB == 1024){
                element.StorageAllowedInMB = "1 GB"
              }
              else{
                element.StorageAllowedInMB = element.StorageAllowedInMB + "MB";
              }
              this.educationalPlans.push(element);
            }
        });
        this.planname = window.sessionStorage.getItem('Plan');
        this.bindDataVariables();
      }, (error) =>{});
  }

  getAllAddOns() {
    this.serviceApi.getData('subscription/addonactive')
      .subscribe((results:any) => {
        this.addOns = results['data'];
        this.bindDataVariables();
      }, (error) =>{});
  }

  getViewCountDaysCountStorageCount() {
    this.serviceApi.getData('view/' + this.userId)
      .subscribe((results:any) => {
        this.result = results['data'][0];
        this.bindDataVariables();
      }, (error) =>{});
  }

  getAnalyticsData() {
    this.serviceApi.getData('subscription/getSummaryByUserId/' + this.userId)
      .subscribe((analytic:any) => {
        this.analytics = analytic['data'];
        this.bindDataVariables();
      }, (error) =>{});
  }

  openModal(template: TemplateRef<any>, pType: number, pId: number) {
    this.planId = pId;
    this.planType = pType;
    this.modalRef = this.modalService.show(template, {class: 'modal-md modal-content-radius'});
  }

  // popToast(massage:any, Body:any) {
  //   this.toasterService.pop(massage, Body);
  // }

  getSubscription() {
    const dataToPost = {
      'UserId': this.userId,
      'SubscriptionType': this.planType,
      'SubscriptionId': this.planId
    };

    this.serviceApi.postData('subscription/request', dataToPost).subscribe(
      data => {
        // console.log(data);
        // this.popToast('success', 'Thank you so much for your interest in this plan. One of our associates will shortly get in touch with you.');
        this.toastrService.success('Thank you so much for your interest in this plan. One of our associates will shortly get in touch with you.'); 
       },
      error => { }
    );
    this.modalRef.hide();

  }


  bindDataVariables() {    
    // if (this.analytics['length']) {
    //   this.analytics['ExperienceCount']
    //   {this.analytics['PublishedExperienceCount']
    // }
    if ( this.result['length'] === 0) {
      this.viewsConsumed = 0;
      this.daysSpend = 0;
      this.totalViewCount = 0;
      this.totalDaysCount = 0;
      this.totalStorageCount = 0;
    } else {
      this.RemainingStorage = this.result['RemainingStorage'];
      this.viewsConsumed = this.result['RemainingView'];
      this.daysSpend = this.result['RemainingDays'];
      this.totalViewCount = this.result['TotalView'];
      this.totalDaysCount = this.result['TotalDays'];
      this.totalStorageCount = this.result['TotalStorage'];
      let usedStorage = Number((this.result['TotalStorage'] - this.result['RemainingStorage'])/(1024*1024));
      
      usedStorage = Number(usedStorage.toFixed());
      let p1:any = Number((this.result['TotalStorage'] - this.result['RemainingStorage'])/(1024*1024));
      p1 = Number(p1.toFixed());
      let p2:any = Number(this.result['RemainingStorage']/(1024*1024));
      p2 = Number(p2.toFixed());

      this.pieChartLabels = ['Used Storage (in MB)', 'Remaining Storage (in MB)'];
        this.pieChartData = [p1, p2];
        this.pieChartType = 'pie';
        this.isStorage = true;
  }
  if ( this.analytics['length'] === 0) {
        this.totalExperiences = 0;
        this.totalPatrons = 0;
        this.totalViews = 0;
        this.publishedExperiences = 0;
  } else {
    this.totalExperiences = this.analytics['ExperienceCount'];
    this.publishedExperiences = this.analytics['PublishedExperienceCount'];
    this.totalViews = this.analytics['ViewCount'] ;
    this.totalPatrons = this.analytics['PatronCount'];
  }

  if (!this.totalExperiences) {
    this.totalExperiences = 0;
  }
  if (!this.totalPatrons) {
    this.totalPatrons = 0;
  }
  if (!this.totalViews) {
    this.totalViews = 0;
  }
  if (!this.publishedExperiences) {
    this.publishedExperiences = 0;
  }

    // progressBar Values
    // View Count
    let type: string;
    let value1: number;
    if (this.totalViewCount === 0) {
      value1 = 0;
    } else {
     value1 = ( this.viewsConsumed / this.totalViewCount) * 100;
    }
     if (value1 <= 50) {
      type = 'success';
    } else if (value1 <= 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    // console.log('total storage count in mbs', value1);

    this.views.push({
      max: 100,
      value: Math.floor(value1),
      type: type,
      label: Math.floor(value1) + '%/100%'
    });

    // Storage Count
    let storagetype: string;
    let value: number;
    if (this.totalStorageCount === 0) {
        value = 0;
    } else {
      value = (this.RemainingStorage / this.totalStorageCount) * 100;
    }if (value <= 50) {
      storagetype = 'danger';
    } else if (value <= 75) {
      storagetype = 'warning';
    } else {
      storagetype = 'success';
    }

    this.storageArray.push({
       max: 100,
      value: Math.floor(value),
      type: storagetype,
      label:  Math.floor(value) + '%/100%'
    });

    // Days ProgressBar
    let bar: string;
    let value2: number;
    if (this.totalDaysCount === 0) {
       value2 = 0;
    } else {
    value2 = ( this.daysSpend / this.totalDaysCount ) * 100;
    }
    if (value2 <= 50) {
      bar = 'success';
    } else if (value2 <= 75) {
      bar = 'warning';
    } else {
      bar = 'danger';
    }
    this.daysArray.push({
      max: 100,
      value: Math.floor(value2),
      type: bar,
      label: Math.floor(value2) + '%/100%'
    });
  }
}
