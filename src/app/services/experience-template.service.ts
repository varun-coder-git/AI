import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class ExperienceTemplateService {

  isCategoryClick: boolean;
  experienceTemplateMetaData: any[] = [];
  allCategoryMeta : any[] = [];
  experienceTemplateDataCount !: number;
  selectedCategory : any;
  upArrowHide: boolean=false;
  constructor(public serviceApi: ApiService, private spinnerService:NgxSpinnerService) { 
    this.experienceTemplateMetaData = [];
    this.allCategoryMeta  = [];
    this.isCategoryClick = false;
    this.selectedCategory = "All";
  }

  getExperienceTemplate(category:any){
    // category = category+1;
    // if(category==7){
    //   category=0;
    // }
    this.spinnerService.show();
    const personaId = parseInt(window.sessionStorage.getItem('PersonaId')||'{}');
    let experienceTemplateData = this.serviceApi.getData('experience/getCategorywiseExperienceTemplate/'+ personaId +'/'+category);
    experienceTemplateData.subscribe((data :any)=> {
       this.experienceTemplateMetaData = [];
       this.experienceTemplateMetaData = data['data'];
       var contactUsObj = {
         'ExperienceTemplateId': -1,
        'ThumbnailImagePath':'./assets/images/dashboard/thinking.jpg',
        'ExperienceName':'I have an idea!',
        'Description':'Not found what you are looking out for? No problem, just email us your requirement at <a href="mailto:care@experizer.com">care@experizer.com</a> and we’ll get in touch.'
       }

       this.experienceTemplateMetaData.push(contactUsObj);

       this.experienceTemplateDataCount = this.experienceTemplateMetaData.length;
       this.spinnerService.hide();
    },
      error => {
        this.experienceTemplateMetaData = [];
        this.experienceTemplateDataCount = this.experienceTemplateMetaData.length;
        this.spinnerService.hide();
      })
  }

  getAllCategoryData() {
    const userId = parseInt(window.sessionStorage.getItem('userId')|| '{}');
    const myCategoryData = this.serviceApi.getData('predashboard/getCataloguewiseCategory/' + userId);
    myCategoryData.subscribe((data:any) => {
      this.allCategoryMeta = data['data'];
      console.log("this.allCategoryMeta :", this.allCategoryMeta);
    },
      error => {
      });
  }
}
