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
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { Location } from '@angular/common';
import { FormDataComponent } from './data-model/formData.component';
import { ApiService } from './services/api.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';
// import timezones from '../assets/google-timezones/timezones.json';
// var timezones = require('google-timezones-json');
//import { Subject } from 'rxjs/Subject';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { ExperienceTemplateService } from './services/experience-template.service';
declare var jquery: any;
declare var $: any;
var orderId=0;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  // @ViewChild(DashboardComponent) private dashComponent: DashboardComponent;
  experienceTemplateMeta: any;
  allCategoryMeta: any[] = [];
  // allCategoryMeta: any;
   private toasterService: ToasterService;
  timezone:any;dragPosition = {x: 0, y: 0};
  placeholderString = 'Select timezone';
  RequestTypeInfo:any;
  requestTypeModal:any;
  FormDataComponent: FormDataComponent;
  createExpMessage: any;
  navPopup:boolean = false;
  Email:any = localStorage.getItem('UserName') ? localStorage.getItem('UserName') : window.sessionStorage.getItem('UserName');
  UserName:any = localStorage.getItem('Name') ? localStorage.getItem('Name') : window.sessionStorage.getItem('Name');
  PlanName:any = localStorage.getItem('Plan') ? localStorage.getItem('Plan') : window.sessionStorage.getItem('Plan');
  loginModeFlag:any;
  ProfileImageUrl:any;
  passwordSubmitForm:boolean = true;
  AllTimezones:any;
  selectedTimezone:any;
  isTimezoneSelected:boolean=true;
  isReasonSelected:boolean=true;
  isContactNumberFilled:boolean=true;
  ContactNumber:any;
  requestContactNumberModal:any;
  changePwdFlag:boolean = false;
  callMeFlag:boolean = false;
  needHelpFlag:boolean = false;
  isSmallDevice:boolean = false;
   Passwords=
  {
     CurrentPassword: '',
     NewPassword: '',
     ConfirmPassword: ''
   } 
 
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    messageClass: 'toastrmsg',
    timeout: 9000
  });

  constructor(public toastrService:ToastrService,public router: Router ,private ref: ChangeDetectorRef, public nav: NavbarService, public location: Location, public serviceApi: ApiService,toasterService: ToasterService, public experienceTemplate : ExperienceTemplateService){
     this.FormDataComponent = new FormDataComponent();
    
    this.toasterService = toasterService;
   }

  title = 'app';
    ngOnInit() 
    {
    

      if ( (localStorage.getItem('token') !== '' ||
        localStorage.getItem('token') !== null ||
        localStorage.getItem('userId') !== null ) &&
        (window.sessionStorage.getItem('token') == '' ||
        window.sessionStorage.getItem('token') == null ||
        window.sessionStorage.getItem('userId') == null ) )
      {
        window.sessionStorage.setItem('token', localStorage.getItem('token')|| '{}');
        window.sessionStorage.setItem('userId', localStorage.getItem('userId')|| '{}');
        window.sessionStorage.setItem('ProfileImageUrl', localStorage.getItem('ProfileImageUrl')|| '{}');
        window.sessionStorage.setItem('lMode', localStorage.getItem('lMode')|| '{}');
        window.sessionStorage.setItem('UserName', localStorage.getItem('UserName')|| '{}');
        window.sessionStorage.setItem('Name', localStorage.getItem('Name')|| '{}');
        window.sessionStorage.setItem('Plan', localStorage.getItem('Plan')|| '{}');
        window.sessionStorage.setItem('ContactNumber', localStorage.getItem('ContactNumber')|| '{}');
        window.sessionStorage.setItem('ParentFolder', localStorage.getItem('ParentFolder')|| '{}');
        window.sessionStorage.setItem('PatronCount', localStorage.getItem('PatronCount')|| '{}');
        window.sessionStorage.setItem('PersonaId', localStorage.getItem('PersonaId')|| '{}');
      }
      this.serviceApi.helpTextChange.subscribe((lang:any) => {
        this.serviceApi.helpText = lang;
        this.ref.detectChanges();
      });  
    
      this.serviceApi.helpFlagChange.subscribe((flag:any) => { 
        this.serviceApi.helpFlag = flag;
        this.ref.detectChanges();
      });
      this.AllTimezones =[
        {
        Name:"Pacific/Niue",
        Value: "(GMT-11:00) Niue"
        }
        ,
        {
          Name:"Pacific/Pago_Pago",
          Value: "(GMT-11:00) Pago Pago"
          },
          {
            Name:"Pacific/Honolulu",
            Value: "(GMT-10:00) Hawaii Time"
            },
        
    

    
    ];
  //    this.AllTimezones ={
  //     "Pacific/Niue": "(GMT-11:00) Niue",
  //     "Pacific/Pago_Pago": "(GMT-11:00) Pago Pago",
  //     "Pacific/Honolulu": "(GMT-10:00) Hawaii Time",
  //     "Pacific/Rarotonga": "(GMT-10:00) Rarotonga",
  //     "Pacific/Tahiti": "(GMT-10:00) Tahiti",
  //     "Pacific/Marquesas": "(GMT-09:30) Marquesas",
  //     "America/Anchorage": "(GMT-09:00) Alaska Time",
  //     "Pacific/Gambier": "(GMT-09:00) Gambier",
  //     "America/Los_Angeles": "(GMT-08:00) Pacific Time",
  //     "America/Tijuana": "(GMT-08:00) Pacific Time - Tijuana",
  //     "America/Vancouver": "(GMT-08:00) Pacific Time - Vancouver",
  //     "America/Whitehorse": "(GMT-08:00) Pacific Time - Whitehorse",
  //     "Pacific/Pitcairn": "(GMT-08:00) Pitcairn",
  //     "America/Dawson_Creek": "(GMT-07:00) Mountain Time - Dawson Creek",
  //     "America/Denver": "(GMT-07:00) Mountain Time",
  //     "America/Edmonton": "(GMT-07:00) Mountain Time - Edmonton",
  //     "America/Hermosillo": "(GMT-07:00) Mountain Time - Hermosillo",
  //     "America/Mazatlan": "(GMT-07:00) Mountain Time - Chihuahua, Mazatlan",
  //     "America/Phoenix": "(GMT-07:00) Mountain Time - Arizona",
  //     "America/Yellowknife": "(GMT-07:00) Mountain Time - Yellowknife",
  //     "America/Belize": "(GMT-06:00) Belize",
  //     "America/Chicago": "(GMT-06:00) Central Time",
  //     "America/Costa_Rica": "(GMT-06:00) Costa Rica",
  //     "America/El_Salvador": "(GMT-06:00) El Salvador",
  //     "America/Guatemala": "(GMT-06:00) Guatemala",
  //     "America/Managua": "(GMT-06:00) Managua",
  //     "America/Mexico_City": "(GMT-06:00) Central Time - Mexico City",
  //     "America/Regina": "(GMT-06:00) Central Time - Regina",
  //     "America/Tegucigalpa": "(GMT-06:00) Central Time - Tegucigalpa",
  //     "America/Winnipeg": "(GMT-06:00) Central Time - Winnipeg",
  //     "Pacific/Galapagos": "(GMT-06:00) Galapagos",
  //     "America/Bogota": "(GMT-05:00) Bogota",
  //     "America/Cancun": "(GMT-05:00) America Cancun",
  //     "America/Cayman": "(GMT-05:00) Cayman",
  //     "America/Guayaquil": "(GMT-05:00) Guayaquil",
  //     "America/Havana": "(GMT-05:00) Havana",
  //     "America/Iqaluit": "(GMT-05:00) Eastern Time - Iqaluit",
  //     "America/Jamaica": "(GMT-05:00) Jamaica",
  //     "America/Lima": "(GMT-05:00) Lima",
  //     "America/Nassau": "(GMT-05:00) Nassau",
  //     "America/New_York": "(GMT-05:00) Eastern Time",
  //     "America/Panama": "(GMT-05:00) Panama",
  //     "America/Port-au-Prince": "(GMT-05:00) Port-au-Prince",
  //     "America/Rio_Branco": "(GMT-05:00) Rio Branco",
  //     "America/Toronto": "(GMT-05:00) Eastern Time - Toronto",
  //     "Pacific/Easter": "(GMT-05:00) Easter Island",
  //     "America/Caracas": "(GMT-04:30) Caracas",
  //     "America/Asuncion": "(GMT-03:00) Asuncion",
  //     "America/Barbados": "(GMT-04:00) Barbados",
  //     "America/Boa_Vista": "(GMT-04:00) Boa Vista",
  //     "America/Campo_Grande": "(GMT-03:00) Campo Grande",
  //     "America/Cuiaba": "(GMT-03:00) Cuiaba",
  //     "America/Curacao": "(GMT-04:00) Curacao",
  //     "America/Grand_Turk": "(GMT-04:00) Grand Turk",
  //     "America/Guyana": "(GMT-04:00) Guyana",
  //     "America/Halifax": "(GMT-04:00) Atlantic Time - Halifax",
  //     "America/La_Paz": "(GMT-04:00) La Paz",
  //     "America/Manaus": "(GMT-04:00) Manaus",
  //     "America/Martinique": "(GMT-04:00) Martinique",
  //     "America/Port_of_Spain": "(GMT-04:00) Port of Spain",
  //     "America/Porto_Velho": "(GMT-04:00) Porto Velho",
  //     "America/Puerto_Rico": "(GMT-04:00) Puerto Rico",
  //     "America/Santo_Domingo": "(GMT-04:00) Santo Domingo",
  //     "America/Thule": "(GMT-04:00) Thule",
  //     "Atlantic/Bermuda": "(GMT-04:00) Bermuda",
  //     "America/St_Johns": "(GMT-03:30) Newfoundland Time - St. Johns",
  //     "America/Araguaina": "(GMT-03:00) Araguaina",
  //     "America/Argentina/Buenos_Aires": "(GMT-03:00) Buenos Aires",
  //     "America/Bahia": "(GMT-03:00) Salvador",
  //     "America/Belem": "(GMT-03:00) Belem",
  //     "America/Cayenne": "(GMT-03:00) Cayenne",
  //     "America/Fortaleza": "(GMT-03:00) Fortaleza",
  //     "America/Godthab": "(GMT-03:00) Godthab",
  //     "America/Maceio": "(GMT-03:00) Maceio",
  //     "America/Miquelon": "(GMT-03:00) Miquelon",
  //     "America/Montevideo": "(GMT-03:00) Montevideo",
  //     "America/Paramaribo": "(GMT-03:00) Paramaribo",
  //     "America/Recife": "(GMT-03:00) Recife",
  //     "America/Santiago": "(GMT-03:00) Santiago",
  //     "America/Sao_Paulo": "(GMT-02:00) Sao Paulo",
  //     "Antarctica/Palmer": "(GMT-03:00) Palmer",
  //     "Antarctica/Rothera": "(GMT-03:00) Rothera",
  //     "Atlantic/Stanley": "(GMT-03:00) Stanley",
  //     "America/Noronha": "(GMT-02:00) Noronha",
  //     "Atlantic/South_Georgia": "(GMT-02:00) South Georgia",
  //     "America/Scoresbysund": "(GMT-01:00) Scoresbysund",
  //     "Atlantic/Azores": "(GMT-01:00) Azores",
  //     "Atlantic/Cape_Verde": "(GMT-01:00) Cape Verde",
  //     "Africa/Abidjan": "(GMT+00:00) Abidjan",
  //     "Africa/Accra": "(GMT+00:00) Accra",
  //     "Africa/Bissau": "(GMT+00:00) Bissau",
  //     "Africa/Casablanca": "(GMT+00:00) Casablanca",
  //     "Africa/El_Aaiun": "(GMT+00:00) El Aaiun",
  //     "Africa/Monrovia": "(GMT+00:00) Monrovia",
  //     "America/Danmarkshavn": "(GMT+00:00) Danmarkshavn",
  //     "Atlantic/Canary": "(GMT+00:00) Canary Islands",
  //     "Atlantic/Faroe": "(GMT+00:00) Faeroe",
  //     "Atlantic/Reykjavik": "(GMT+00:00) Reykjavik",
  //     "Etc/GMT": "(GMT+00:00) GMT (no daylight saving)",
  //     "Europe/Dublin": "(GMT+00:00) Dublin",
  //     "Europe/Lisbon": "(GMT+00:00) Lisbon",
  //     "Europe/London": "(GMT+00:00) London",
  //     "Africa/Algiers": "(GMT+01:00) Algiers",
  //     "Africa/Ceuta": "(GMT+01:00) Ceuta",
  //     "Africa/Lagos": "(GMT+01:00) Lagos",
  //     "Africa/Ndjamena": "(GMT+01:00) Ndjamena",
  //     "Africa/Tunis": "(GMT+01:00) Tunis",
  //     "Africa/Windhoek": "(GMT+02:00) Windhoek",
  //     "Europe/Amsterdam": "(GMT+01:00) Amsterdam",
  //     "Europe/Andorra": "(GMT+01:00) Andorra",
  //     "Europe/Belgrade": "(GMT+01:00) Central European Time - Belgrade",
  //     "Europe/Berlin": "(GMT+01:00) Berlin",
  //     "Europe/Brussels": "(GMT+01:00) Brussels",
  //     "Europe/Budapest": "(GMT+01:00) Budapest",
  //     "Europe/Copenhagen": "(GMT+01:00) Copenhagen",
  //     "Europe/Gibraltar": "(GMT+01:00) Gibraltar",
  //     "Europe/Luxembourg": "(GMT+01:00) Luxembourg",
  //     "Europe/Madrid": "(GMT+01:00) Madrid",
  //     "Europe/Malta": "(GMT+01:00) Malta",
  //     "Europe/Monaco": "(GMT+01:00) Monaco",
  //     "Europe/Oslo": "(GMT+01:00) Oslo",
  //     "Europe/Paris": "(GMT+01:00) Paris",
  //     "Europe/Prague": "(GMT+01:00) Central European Time - Prague",
  //     "Europe/Rome": "(GMT+01:00) Rome",
  //     "Europe/Stockholm": "(GMT+01:00) Stockholm",
  //     "Europe/Tirane": "(GMT+01:00) Tirane",
  //     "Europe/Vienna": "(GMT+01:00) Vienna",
  //     "Europe/Warsaw": "(GMT+01:00) Warsaw",
  //     "Europe/Zurich": "(GMT+01:00) Zurich",
  //     "Africa/Cairo": "(GMT+02:00) Cairo",
  //     "Africa/Johannesburg": "(GMT+02:00) Johannesburg",
  //     "Africa/Maputo": "(GMT+02:00) Maputo",
  //     "Africa/Tripoli": "(GMT+02:00) Tripoli",
  //     "Asia/Amman": "(GMT+02:00) Amman",
  //     "Asia/Beirut": "(GMT+02:00) Beirut",
  //     "Asia/Damascus": "(GMT+02:00) Damascus",
  //     "Asia/Gaza": "(GMT+02:00) Gaza",
  //     "Asia/Jerusalem": "(GMT+02:00) Jerusalem",
  //     "Asia/Nicosia": "(GMT+02:00) Nicosia",
  //     "Europe/Athens": "(GMT+02:00) Athens",
  //     "Europe/Bucharest": "(GMT+02:00) Bucharest",
  //     "Europe/Chisinau": "(GMT+02:00) Chisinau",
  //     "Europe/Helsinki": "(GMT+02:00) Helsinki",
  //     "Europe/Istanbul": "(GMT+02:00) Istanbul",
  //     "Europe/Kaliningrad": "(GMT+02:00) Moscow-01 - Kaliningrad",
  //     "Europe/Kiev": "(GMT+02:00) Kiev",
  //     "Europe/Riga": "(GMT+02:00) Riga",
  //     "Europe/Sofia": "(GMT+02:00) Sofia",
  //     "Europe/Tallinn": "(GMT+02:00) Tallinn",
  //     "Europe/Vilnius": "(GMT+02:00) Vilnius",
  //     "Africa/Khartoum": "(GMT+03:00) Khartoum",
  //     "Africa/Nairobi": "(GMT+03:00) Nairobi",
  //     "Antarctica/Syowa": "(GMT+03:00) Syowa",
  //     "Asia/Baghdad": "(GMT+03:00) Baghdad",
  //     "Asia/Qatar": "(GMT+03:00) Qatar",
  //     "Asia/Riyadh": "(GMT+03:00) Riyadh",
  //     "Europe/Minsk": "(GMT+03:00) Minsk",
  //     "Europe/Moscow": "(GMT+03:00) Moscow+00 - Moscow",
  //     "Asia/Tehran": "(GMT+03:30) Tehran",
  //     "Asia/Baku": "(GMT+04:00) Baku",
  //     "Asia/Dubai": "(GMT+04:00) Dubai",
  //     "Asia/Tbilisi": "(GMT+04:00) Tbilisi",
  //     "Asia/Yerevan": "(GMT+04:00) Yerevan",
  //     "Europe/Samara": "(GMT+04:00) Moscow+01 - Samara",
  //     "Indian/Mahe": "(GMT+04:00) Mahe",
  //     "Indian/Mauritius": "(GMT+04:00) Mauritius",
  //     "Indian/Reunion": "(GMT+04:00) Reunion",
  //     "Asia/Kabul": "(GMT+04:30) Kabul",
  //     "Antarctica/Mawson": "(GMT+05:00) Mawson",
  //     "Asia/Aqtau": "(GMT+05:00) Aqtau",
  //     "Asia/Aqtobe": "(GMT+05:00) Aqtobe",
  //     "Asia/Ashgabat": "(GMT+05:00) Ashgabat",
  //     "Asia/Dushanbe": "(GMT+05:00) Dushanbe",
  //     "Asia/Karachi": "(GMT+05:00) Karachi",
  //     "Asia/Tashkent": "(GMT+05:00) Tashkent",
  //     "Asia/Yekaterinburg": "(GMT+05:00) Moscow+02 - Yekaterinburg",
  //     "Indian/Kerguelen": "(GMT+05:00) Kerguelen",
  //     "Indian/Maldives": "(GMT+05:00) Maldives",
  //     "Asia/Calcutta": "(GMT+05:30) India Standard Time",
  //     "Asia/Colombo": "(GMT+05:30) Colombo",
  //     "Asia/Katmandu": "(GMT+05:45) Katmandu",
  //     "Antarctica/Vostok": "(GMT+06:00) Vostok",
  //     "Asia/Almaty": "(GMT+06:00) Almaty",
  //     "Asia/Bishkek": "(GMT+06:00) Bishkek",
  //     "Asia/Dhaka": "(GMT+06:00) Dhaka",
  //     "Asia/Omsk": "(GMT+06:00) Moscow+03 - Omsk, Novosibirsk",
  //     "Asia/Thimphu": "(GMT+06:00) Thimphu",
  //     "Indian/Chagos": "(GMT+06:00) Chagos",
  //     "Asia/Rangoon": "(GMT+06:30) Rangoon",
  //     "Indian/Cocos": "(GMT+06:30) Cocos",
  //     "Antarctica/Davis": "(GMT+07:00) Davis",
  //     "Asia/Bangkok": "(GMT+07:00) Bangkok",
  //     "Asia/Hovd": "(GMT+07:00) Hovd",
  //     "Asia/Jakarta": "(GMT+07:00) Jakarta",
  //     "Asia/Krasnoyarsk": "(GMT+07:00) Moscow+04 - Krasnoyarsk",
  //     "Asia/Saigon": "(GMT+07:00) Hanoi",
  //     "Asia/Ho_Chi_Minh": "(GMT+07:00) Ho Chi Minh",
  //     "Indian/Christmas": "(GMT+07:00) Christmas",
  //     "Antarctica/Casey": "(GMT+08:00) Casey",
  //     "Asia/Brunei": "(GMT+08:00) Brunei",
  //     "Asia/Choibalsan": "(GMT+08:00) Choibalsan",
  //     "Asia/Hong_Kong": "(GMT+08:00) Hong Kong",
  //     "Asia/Irkutsk": "(GMT+08:00) Moscow+05 - Irkutsk",
  //     "Asia/Kuala_Lumpur": "(GMT+08:00) Kuala Lumpur",
  //     "Asia/Macau": "(GMT+08:00) Macau",
  //     "Asia/Makassar": "(GMT+08:00) Makassar",
  //     "Asia/Manila": "(GMT+08:00) Manila",
  //     "Asia/Shanghai": "(GMT+08:00) China Time - Beijing",
  //     "Asia/Singapore": "(GMT+08:00) Singapore",
  //     "Asia/Taipei": "(GMT+08:00) Taipei",
  //     "Asia/Ulaanbaatar": "(GMT+08:00) Ulaanbaatar",
  //     "Australia/Perth": "(GMT+08:00) Western Time - Perth",
  //     "Asia/Pyongyang": "(GMT+08:30) Pyongyang",
  //     "Asia/Dili": "(GMT+09:00) Dili",
  //     "Asia/Jayapura": "(GMT+09:00) Jayapura",
  //     "Asia/Seoul": "(GMT+09:00) Seoul",
  //     "Asia/Tokyo": "(GMT+09:00) Tokyo",
  //     "Asia/Yakutsk": "(GMT+09:00) Moscow+06 - Yakutsk",
  //     "Pacific/Palau": "(GMT+09:00) Palau",
  //     "Australia/Adelaide": "(GMT+10:30) Central Time - Adelaide",
  //     "Australia/Darwin": "(GMT+09:30) Central Time - Darwin",
  //     "Antarctica/DumontDUrville": "(GMT+10:00) Dumont D'Urville",
  //     "Asia/Magadan": "(GMT+10:00) Moscow+07 - Magadan",
  //     "Asia/Vladivostok": "(GMT+10:00) Moscow+07 - Yuzhno-Sakhalinsk",
  //     "Australia/Brisbane": "(GMT+10:00) Eastern Time - Brisbane",
  //     "Australia/Hobart": "(GMT+11:00) Eastern Time - Hobart",
  //     "Australia/Sydney": "(GMT+11:00) Eastern Time - Melbourne, Sydney",
  //     "Pacific/Chuuk": "(GMT+10:00) Truk",
  //     "Pacific/Guam": "(GMT+10:00) Guam",
  //     "Pacific/Port_Moresby": "(GMT+10:00) Port Moresby",
  //     "Pacific/Efate": "(GMT+11:00) Efate",
  //     "Pacific/Guadalcanal": "(GMT+11:00) Guadalcanal",
  //     "Pacific/Kosrae": "(GMT+11:00) Kosrae",
  //     "Pacific/Norfolk": "(GMT+11:00) Norfolk",
  //     "Pacific/Noumea": "(GMT+11:00) Noumea",
  //     "Pacific/Pohnpei": "(GMT+11:00) Ponape",
  //     "Asia/Kamchatka": "(GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy",
  //     "Pacific/Auckland": "(GMT+13:00) Auckland",
  //     "Pacific/Fiji": "(GMT+13:00) Fiji",
  //     "Pacific/Funafuti": "(GMT+12:00) Funafuti",
  //     "Pacific/Kwajalein": "(GMT+12:00) Kwajalein",
  //     "Pacific/Majuro": "(GMT+12:00) Majuro",
  //     "Pacific/Nauru": "(GMT+12:00) Nauru",
  //     "Pacific/Tarawa": "(GMT+12:00) Tarawa",
  //     "Pacific/Wake": "(GMT+12:00) Wake",
  //     "Pacific/Wallis": "(GMT+12:00) Wallis",
  //     "Pacific/Apia": "(GMT+14:00) Apia",
  //     "Pacific/Enderbury": "(GMT+13:00) Enderbury",
  //     "Pacific/Fakaofo": "(GMT+13:00) Fakaofo",
  //     "Pacific/Tongatapu": "(GMT+13:00) Tongatapu",
  //     "Pacific/Kiritimati": "(GMT+14:00) Kiritimati"
  // };
     this.ContactNumber = parseInt(window.sessionStorage.getItem('ContactNumber')|| '{}');
    
      let order;

     
      //  this.getAllCategoryData();
      if(window.location.href.indexOf("needhelp") > -1)
      {
        this.needHelpFlag = true;
      }

    
      if(window.location.href.indexOf("subscription") > -1)
      {
        order=7;
        orderId=8;
      }
      else if(window.location.href.indexOf("assetsmanagement") > -1)
      {        
        order=6;
        orderId=6;
      }
      else if(window.location.href.indexOf("patron") > -1)
      {
        order=2;
        orderId=5;
      }else if(window.location.href.indexOf("3dassetmanagement") > -1)
      {
        orderId=7;
      }
      else if(window.location.href.indexOf("myexperience") > -1)
      {
        order=3;
        orderId=2;
      }
      else if(window.location.href.indexOf("publishedexperience") > -1)
      {
        order=4;
        orderId=3;
      }
      else if(window.location.href.indexOf("rooms") > -1)
      {
        order=5;
        orderId=4;
      }
      else  if(window.location.href.indexOf("dashboard") > -1)
      {
        order = 1;
        orderId=order;
      }
      this.loginModeFlag = false;   
    }

    ngAfterViewInit() {
       this.deviceCheck();
    }

needHelp()
{  
 
  $("#helpContainer").slideToggle();
  $("#needHelpRedirection").toggle();
  this.needHelpFlag=!this.needHelpFlag;
  window.sessionStorage.setItem('needHelpFlag', ""+this.needHelpFlag);
              localStorage.setItem('needHelpFlag', ''+this.needHelpFlag);
  if(this.needHelpFlag){
    this.serviceApi.helpText='This guide is mouse pointer sensitive. Point at a page item to view its help.';
    this.dragPosition = {x: 0, y: 0};
  }else{
    this.serviceApi.helpText='';
     }
   
}

slideDownHelpBox()
{
  this.needHelp();
}

 mouseEnter(div : string){
  if(this.needHelpFlag){
  this.serviceApi.setHelpText(div);
  this.serviceApi.setHelpFlag(true);   

  this.serviceApi.helpTextChange.subscribe((lang:any) => {
    this.serviceApi.helpText = lang;
    this.ref.detectChanges();
  });  

  this.serviceApi.helpFlagChange.subscribe((flag:any) => { 
    this.serviceApi.helpFlag = flag;
    this.ref.detectChanges();
  });
}
 } 

 mouseLeave()
 {
if(this.needHelpFlag) { 
  this.serviceApi.setHelpText("This guide is mouse pointer sensitive. Point at a page item to view its help.");
  this.serviceApi.setHelpFlag(false);  
  this.serviceApi.helpTextChange.subscribe((lang:any) => {
    this.serviceApi.helpText = lang;
    this.ref.detectChanges();
  }); 

  this.serviceApi.helpFlagChange.subscribe((flag:any) => { 
    this.serviceApi.helpFlag = flag;
    this.ref.detectChanges();
  });
}
else{
  this.serviceApi.helpText = "";
}
 } 

slideDownChangePwd(password:any)
{
  this.changePwdFlag = !this.changePwdFlag;
  password.reset();
  this.passwordSubmitForm = true;
  
  //PasswordChange.reset();
  
  
  $(".personal-info-detail").slideUp();
  $(".personal-info-detail").addClass("slideup");
 // $(".popover-arrow").toggleClass("popover-arrow-slide-down");
 if(this.changePwdFlag == true)
 {
   $(".popover-arrow").css("top","4%");  
 }
 else
 {
   $(".popover-arrow").css("top","7%");  
 }  
  $("#changePwdBlock").slideToggle();
}    

GetHeaders(obj:any)
{
  var cols = new Array();
  var p = obj;
  var result = "";
  $.each(obj, function(k:any, v:any)
  {
     let val = k + " |" +v
     let zone = {Name:k,Value:val}
      cols.push(zone);
  });

  return cols;
}
    
confirmationSubmit(flag:any)
{
  if(flag == 'save')
    $("#save-btn").trigger("click");
  else
    $("#cancel-btn").trigger("click");
}
getCreateExperienceVar()
{
  return this.createExpMessage;
}

setCreateExperienceVar(msg:any)
{
  this.createExpMessage = msg;
}

getRequestTypeData() {
 const requestTypeData = this.serviceApi.getData('request/getRequestType');
  requestTypeData.subscribe((data:any) => {
    this.RequestTypeInfo = data['data'];
    },
    error => {
      // console.log(error);
    });
}

liMenuClick (order: any,e: any,pages:any)
{
  e.stopPropagation();
  // if(this.allCategoryMeta.length==0){
  //   this.getAllCategoryData();
  // }
  let angle;
  if($("#sidebar").hasClass("shrinked"))
  {
    $(".page-content").removeClass("unshrinked-body");
    $(".page-content").addClass("shrinked-body");
    angle = 80 + (order * 35); 
    this.checkForCategoryDropdownHideEvent();
   // this.openCategoryShrinkedNavbar(e);
  }
  else
  {
    $(".page-content").addClass("unshrinked-body");
    $(".page-content").removeClass("shrinked-body");
    angle = 155 + (order * 35); 

    if(pages!= 'studio'){
      $(".collapse").collapse('hide');
      if($("#scrollable-left-menu").hasClass("div-height-left-menu")){
        $("#scrollable-left-menu").removeClass("div-height-left-menu");
      }
      else{
        //$("#scrollable-left-menu").addClass("div-height-left-menu");
      }
    
    } 
  }  

  $(".tabPointer").css("transform","translateY("+angle+"px)");
  $("nav#sidebar li").removeClass("active");
  $("nav#sidebar li").removeClass("liMenuActive");
  $(".active"+order).addClass("active");
  $(".active"+order).addClass("liMenuActive");
  $(".tabPointer").css("display","block");

 
  if(pages== 'studio')
  {
    // $(".collapse").collapse('toggle');
   // this.experienceTemplate.isCategoryClick = false;
    this.experienceTemplate.selectedCategory = "All";
    this.experienceTemplate.getExperienceTemplate(0);
    this.router.navigateByUrl('/dashboard');
    // this.experienceTemplate.upArrowHide=false;
    this.slideDownSecondHeaderForCategoryMenuClick();

  }
  else if(pages == 'subscription')
  {
    this.router.navigateByUrl('/subscription');
  }
  else if(pages == 'uploads')
  {
    this.router.navigateByUrl('/assetsmanagement');
    
  }
  else if (pages == '3duploads') {
    this.router.navigateByUrl('/3dassetmanagement');

  }
  else if(pages == 'patrons')
  {
     this.router.navigateByUrl('/patron');
  }
  else if(pages == 'myexperience')
  {
     this.router.navigateByUrl('/dashboard/myexperience');
  }
  else if(pages == 'publishexperience')
  {
     this.router.navigateByUrl('/dashboard/publishedexperience');
  }
   else if(pages == 'rooms')
  {
     this.router.navigateByUrl('/dashboard/rooms');
  }
}

goToPersonalInfo(e:any)
{
  e.stopPropagation();
  this.router.navigateByUrl('/personalinfo');
  this.onHidden();
  $("popover-container").css("display","none");
}

createExperience(e:any)
{
  e.stopPropagation();
  this.router.navigateByUrl('/dashboard');
  $(".tabPointer").css("transform","translateY(190px)");
  setTimeout(function(){ $(".slide-down-icon").trigger("click"); }, 500);  
}

userInfoPopover (e:any)
{
  e.stopPropagation();
  this.getRequestTypeData();
}
openPopover(e:any)
{
  e.stopPropagation(); 
  this.openNav();
  $(".userProfile").trigger("click");
}

goToAccountSetting (e:any)
{
  e.stopPropagation(); 
   this.router.navigateByUrl('/subscription');
  this.onHidden();
  $("popover-container").css("display","none"); 
}

onShown(): void
 {  
    if ( window.sessionStorage.getItem('lMode') === '1' || window.sessionStorage.getItem('lMode') === '2' ) {
      this.ProfileImageUrl = window.sessionStorage.getItem('ProfileImageUrl');
    } else {
      this.ProfileImageUrl = this.serviceApi.apiBaseUrl + window.sessionStorage.getItem('ProfileImageUrl') + "?"+Math.random();
    }
    
    if(this.ProfileImageUrl.includes("/profile/-"))
      {
        this.ProfileImageUrl = null;
      }

    $(".userProfile > i").css("transform","rotate(-90deg)");
    $(".userProfile > i").css("transition","transform .3s ease-in-out");
    $(".popover-arrow").css("top","7%");   
  }

 onHidden(): void 
 {
    $(".userProfile > i").css("transform","rotate(0deg)");
    $(".userProfile > i").css("transition","transform .3s ease-in-out");
  }

labelChange() {
 var text = $('.usernameLabel').text();
 $('.usernameLabel').css("display","none");
 $('#inputs').css("display","inline-block");
 $('#inputs input').val(text);
}

updateUserName()
{
  const formdata: FormData = new FormData();
  formdata.append('file', null!);
  formdata.append('UserId', window.sessionStorage.getItem('userId')|| '{}');
  formdata.append('Name', $('#attribute').val());
  formdata.append('Address', null!);
  formdata.append('ContactNumber', null!);
  formdata.append('Status', null!);
  formdata.append('ProfileImageUrl', null!);  

    this.serviceApi.uploadFilePut('user/update', formdata).subscribe(
      (data:any) => {
        if (data['body']) {
          if (data['body']['status']) 
          {
             window.sessionStorage.setItem('Name',$('#attribute').val());
             this.UserName = $('#attribute').val();
             $('#inputs').css("display","none");
   $('.usernameLabel').css("display","inline-block");
       window.sessionStorage.setItem('Name', this.UserName);
       localStorage.setItem('Name', this.UserName);
             this.toastrService.success('Username updated successfully.'); 
          } 
          else
          {
            this.toastrService.error( 'Failed to update username.');
          }
      }
      },
      error => {  this.toastrService.error( 'Failed to update username.'); }
    );
}

navClick()
{
  console.log("shirnked");
  $("#scrollable-left-menu").addClass("div-height-left-menu");
  if($("#sidebar").hasClass("shrinked"))
  {
    console.log("In shirnked");
    $("#sidebar").removeClass("shrinked");
    if($("#shrinked-category-dropdown").hasClass("category-dropdown"))
    {
      $("#shrinked-category-dropdown").removeClass("category-dropdown");
      $("#shrinked-category-dropdown").addClass("category-dropdown-hide");
    }
    
    // if($("#scrollable-left-menu").hasClass("div-height-left-menu")){
    //   $("#scrollable-left-menu").removeClass("div-height-left-menu");
    // }
    // else{
    //  // $("#scrollable-left-menu").addClass("div-height-left-menu");
    // }

    $("#scrollable-left-menu > ul > li.active1 > i").css("transform","rotate(0deg)");
    $("#scrollable-left-menu > ul > li.active1 > i").css("transition","transform .3s ease-in-out");

      $('li').each((i:any)=>{
      if($(this).is('.active'))
      {
        let angle = 155 + ((i+1) * 35);
        $(".tabPointer").css("transform","translateY("+angle+"px)");
        $("nav#sidebar li").removeClass("active");
        $(".active"+(i+1)).addClass("active");
        return false;
      }else
      return;
    });
    $(".page-content").removeClass("shrinked-body");
    $(".page-content").addClass("unshrinked-body");
  }
  else
  {
    $("#sidebar").addClass("shrinked");
    if($("#scrollable-left-menu").hasClass("div-height-left-menu")){
      $("#scrollable-left-menu").removeClass("div-height-left-menu");
     }

     $("#scrollable-left-menu > ul > li.active1 > i").css("transform","rotate(-90deg)");
     $("#scrollable-left-menu > ul > li.active1 > i").css("transition","transform .3s ease-in-out");
    $('li').each((i:any)=>{
      if($(this).is('.active'))
      {
        let angle = 80 + ((i+1) * 35);
        $(".tabPointer").css("transform","translateY("+angle+"px)");
        $("nav#sidebar li").removeClass("active");
        $(".active"+(i+1)).addClass("active");
        return false;
      }else{
        return;
      }
    });
    $(".page-content").removeClass("unshrinked-body");
    $(".page-content").addClass("shrinked-body");
  }
}

openNav()
{
  $("#sidebar").removeClass("shrinked");
  if($("#scrollable-left-menu").hasClass("div-height-left-menu")){
    // $("#scrollable-left-menu").removeClass("div-height-left-menu");
  }
  else{
    $("#scrollable-left-menu").addClass("div-height-left-menu");
  }

  $("#scrollable-left-menu > ul > li.active1 > i").css("transform","rotate(0deg)");
  $("#scrollable-left-menu > ul > li.active1 > i").css("transition","transform .3s ease-in-out");
      $('li').each((i:any)=>{
      if($(this).is('.active'))
      {
        let angle = 155 + ((i+1) * 35);
        $(".tabPointer").css("transform","translateY("+angle+"px)");
        $("nav#sidebar li").removeClass("active");
        $(".active"+(i+1)).addClass("active");
      }
    });
    $(".page-content").removeClass("shrinked-body");
    $(".page-content").addClass("unshrinked-body");
}

closeNav()
{
  $("#sidebar").addClass("shrinked");
  if($("#scrollable-left-menu").hasClass("div-height-left-menu")){
    $("#scrollable-left-menu").removeClass("div-height-left-menu");
   }

   $("#scrollable-left-menu > ul > li.active1 > i").css("transform","rotate(-90deg)");
   $("#scrollable-left-menu > ul > li.active1 > i").css("transition","transform .3s ease-in-out");
    $('li').each((i:any)=>{
      if($(this).is('.active'))
      {
        let angle = 80 + ((i+1) * 35);
        $(".tabPointer").css("transform","translateY("+angle+"px)");
        $("nav#sidebar li").removeClass("active");
        $(".active"+(i+1)).addClass("active");
      }
    });
    $(".page-content").removeClass("unshrinked-body");
    $(".page-content").addClass("shrinked-body");
}



doNotClick(e:any)
{
  e.stopPropagation();  
}
 
isLoggedIn()
{
  if (localStorage.getItem('token') === '' ||
    localStorage.getItem('token') === null ||
    localStorage.getItem('userId') === null ) {
    if( (this.location.path() !== "/login") && (this.location.path() !== "/LoginValidation")
      && (this.location.path() !== "/term")  && (this.location.path() !== "/privacypolicy") && (this.location.path() !== "/needhelp") && (!this.location.path().includes("userverification")) && (!this.location.path().includes("/copyright")) && (!this.location.path().includes("/faqs"))  && (!this.location.path().includes("/getstarted"))  && (!this.location.path().includes("/mobileapp"))  && (!this.location.path().includes("/topics")) && (!this.location.path().includes("/topics/create")) && (!this.location.path().includes("/topics/vrexperience"))  && (!this.location.path().includes("/topics/assignroom"))  && (!this.location.path().includes("/topics/newroom")) && (!this.location.path().includes("/topics/trackxapi")) && (!this.location.path().includes("/topics/mywork"))) {
      this.router.navigateByUrl('');
    }
  } else{
    if( (this.location.path() !== "/login") && (this.location.path() !== "/LoginValidation") ) {
      this.serviceApi.setToken(localStorage.getItem('token'));
      this.Email = localStorage.getItem('UserName');
      this.UserName = localStorage.getItem('Name');
      this.PlanName = localStorage.getItem('Plan');
      if ((localStorage.getItem('ContactNumber') != null) || (localStorage.getItem('ContactNumber') != undefined)) {
        this.requestContactNumberModal = Number(localStorage.getItem('ContactNumber'));
      }
      
      if ( localStorage.getItem('lMode') === '1' || localStorage.getItem('lMode') === '2' ) {
        this.loginModeFlag = true;
        this.ProfileImageUrl = localStorage.getItem('ProfileImageUrl');
      } else {
        this.loginModeFlag = false;
        this.ProfileImageUrl = this.serviceApi.apiBaseUrl + localStorage.getItem('ProfileImageUrl') + "?"+Math.random();
      }
      if(this.ProfileImageUrl.includes("/profile/-")|| this.ProfileImageUrl.includes("undefined"))
      {
        this.ProfileImageUrl = null;
      }
      this.getRequestTypeData();
    } else {       
      this.router.navigateByUrl('dashboard');
    }
  }
}

redirectToNeedHelp(e:any)
{
  this.navClick();  
}

personalQuery()
{  
  this.callMeFlag = !this.callMeFlag;
  this.isContactNumberFilled = true;
  this.isReasonSelected = true;
  this.isTimezoneSelected = true;
  $("#timezoneDropdown").val('0');
  $("#requestTypeDropdown").val('0');
  if ((window.sessionStorage.getItem('ContactNumber') != null) || (window.sessionStorage.getItem('ContactNumber') != undefined)) {
    this.requestContactNumberModal = Number(window.sessionStorage.getItem('ContactNumber'));
  } else {
    this.requestContactNumberModal = null;
  }
  if(this.callMeFlag == true)
  {
   $(".popover-arrow").css("top","3.3%");  
  }
  else
  {
   $(".popover-arrow").css("top","7%");  
  }  


  $("#timezoneDropdown").val('0');
  $("#requestTypeDropdown").val('0');

  $(".popover-arrow").toggleClass("popover-arrow-slide-up");
  $("#changePwdBlock").slideUp();

  if($(".personal-info-detail").hasClass("slideup"))
  {
    $('input[name=query]').prop('checked',false);
    $(".personal-info-detail").slideDown();
    $(".popover-arrow").addClass("popover-arrow-slide-up");
    $(".popover-arrow").removeClass("popover-arrow-slide-down");
    $(".personal-info-detail").removeClass("slideup");  
  }
  else
  {    
    $(".personal-info-detail").slideUp();
    $(".popover-arrow").addClass("popover-arrow-slide-down");
    $(".popover-arrow").removeClass("popover-arrow-slide-up");
    $(".personal-info-detail").addClass("slideup");
  } 
}

signOut() 
{
  if (localStorage.getItem('token') !== '' ||
    localStorage.getItem('token') !== null ||
    localStorage.getItem('userId') !== null ) 
    {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('ProfileImageUrl');
      localStorage.removeItem('lMode');
      localStorage.removeItem('UserName');
      localStorage.removeItem('Name');
      localStorage.removeItem('Plan');
      localStorage.removeItem('ContactNumber');

      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('userId');
      window.sessionStorage.removeItem('ProfileImageUrl');
      window.sessionStorage.removeItem('lMode');
      window.sessionStorage.removeItem('UserName');
      window.sessionStorage.removeItem('Name');
      window.sessionStorage.removeItem('Plan');
      window.sessionStorage.removeItem('ContactNumber');
      this.router.navigateByUrl('');
      // if(this.isSmallDevice == true)
      // {
      //   this.toastMsg();
      // }      
    }
}

// popToast(messageType:any, message:any) 
// {
//     this.toasterService.pop(messageType, message); 
// }

handleChange() 
{
    if($("#contactNumberInput").val().length >=9 && $("#contactNumberInput").val().length <=10)
    {
        this.isContactNumberFilled = true;
    }
}

timezoneChange() {
  this.isTimezoneSelected = true;
}

requestTypeChange()
{
   this.isReasonSelected = true;
}

setCallback()
{
  //this.isReasonSelected = typeof $("input[name='query']:checked").val() != 'undefined';  
  if($("#requestTypeDropdown").val() == null)
  {
    this.isReasonSelected = false;
  }
  if($("#timezoneDropdown").val() == null)
  {
    this.isTimezoneSelected = false;
  }

  if(this.requestContactNumberModal == null || $("#contactNumberInput").val().length > 10 || $("#contactNumberInput").val().length < 10 || isNaN($("#contactNumberInput").val()))
  {
    this.isContactNumberFilled = false;
  }
  
  if(this.isReasonSelected && this.isTimezoneSelected && this.isContactNumberFilled)
  {
     let data = 
    {
      UserId:parseInt(window.sessionStorage.getItem('userId')||'{}'),
      RequestTypeId:this.requestTypeModal,
      TimeZone:this.selectedTimezone,
      ContactNumber:this.requestContactNumberModal
    }
    let url = 'request/add';
        this.serviceApi.postData(url,data)
          .subscribe(
            response => {
              this.toastrService.success('The call requested has been placed successfully. We love to hear as much as we love to talk! Allow us sometime to get in touch with you.');
              $("#timezoneDropdown").val('0');
              $("#requestTypeDropdown").val('0');
              this.requestContactNumberModal = null;
            },
            error => {
              this.toastrService.error( 'Failed To set call.');
            }
          );
  }
 
}

upgradePlan()
{
  this.router.navigateByUrl('/subscription');
}

uploadProfilePic()
{
  $('#imgupload').trigger('click');
}

uploadNewFile(files:any)
{  
  const formdata: FormData = new FormData();
  formdata.append('file', files[0]);
  formdata.append('UserId', window.sessionStorage.getItem('userId')!);
  formdata.append('Name', null!);
  formdata.append('Address', null!);
  formdata.append('ContactNumber', null!);
  formdata.append('Status', null!);
  formdata.append('ProfileImageUrl', null!);  

    this.serviceApi.uploadFilePut('user/update', formdata).subscribe(
      (data:any) => {
        if (data['body']) {
          if (data['body']['status']) 
          {
            let path = this.serviceApi.apiBaseUrl + data['body']['ProfileImageUrl'];
            $('.navProfilePic').attr('src',path);
            $('.navPopupProfilePic').attr('src',path);
            window.sessionStorage.setItem('ProfileImageUrl', data['body']['ProfileImageUrl']);
            if ( window.sessionStorage.getItem('lMode') === '1' || window.sessionStorage.getItem('lMode') === '2' ) {
              this.ProfileImageUrl = window.sessionStorage.getItem('ProfileImageUrl');
            } else {
              this.ProfileImageUrl = this.serviceApi.apiBaseUrl + window.sessionStorage.getItem('ProfileImageUrl') + "?"+Math.random();
            }
            this.toastrService.success('File uploaded successfully'); 
          } 
          else
          {
            this.toastrService.error('Failed to upload file.');
          }
      }
      },
      error => { this.toastrService.error( 'Failed to upload file.'); }
    );
}

returnTrue()
{
  return false;
}


changePassword(password:any)
{

  console.log(password);
  this.passwordSubmitForm = false;

  if(password.valid == true)
  {
    this.passwordSubmitForm = true;   
    if((this.Passwords.NewPassword === this.Passwords.ConfirmPassword))
    {
      var data = 
      {
        UserName:"",
        NewPassword:"",
        OldPassword:""
      }

      data.UserName = this.Email;
      data.NewPassword = this.Passwords.NewPassword;
      data.OldPassword =this.Passwords.CurrentPassword;
      let url = 'user/changepassword';
          this.serviceApi.putData(url,data)
            .subscribe(
              response => {
              //  this.popToast('success', 'Password updated successfully.');
              this.toastrService.success("Password updated successfully.")
              this.signOut();
              },
              error => {
                //this.popToast('error', error['error']["message"]);
                this.toastrService.error(error['error']["message"]);
              }
            ); 
    }
    else
    {
      this.toastrService.error('New password and confirm password should be the same.');
    }
  }
}

deviceCheck()
{
 if(($( window ).width() < 960) || (window.innerHeight) > (window.innerWidth))
  { 
    var url=window.location.href;
    if(!url.includes("userverification")){
      this.isSmallDevice = true;
      this.signOut();    
      $('#smallDevice').modal('show');
    }
  }
}

// toastMsg()
// {
//    this.popToast('error', 'Small device');
// }


 redirect(){
  document.location.href = "https://www.experizer.com";
}

  openCategoryShrinkedNavbar(e:any){
    e.stopPropagation();
    if($("#sidebar").hasClass("shrinked"))
    { 
        if($("#shrinked-category-dropdown").hasClass("category-dropdown"))
        {
          $("#shrinked-category-dropdown").removeClass("category-dropdown");
        }
        else{
          $("#shrinked-category-dropdown").addClass("category-dropdown");
        }
    }
    else
    {
      $("#shrinked-category-dropdown").addClass("category-dropdown-hide");
      $(".collapse").collapse('toggle');
      // if($("#scrollable-left-menu").hasClass("div-height-left-menu")){
      //   $("#scrollable-left-menu").removeClass("div-height-left-menu");
      // }
      // else{
        $("#scrollable-left-menu").addClass("div-height-left-menu");
      // }
    } 
    
  }

  /*getAllCategoryData() {
    const userId = parseInt(window.sessionStorage.getItem('userId'));
    const myCategoryData = this.serviceApi.getData('predashboard/getCataloguewiseCategory/' + userId);
    myCategoryData.subscribe(data => {
      this.allCategoryMeta = data['data'];
      console.log("this.allCategoryMeta :", this.allCategoryMeta);
    },
      error => {
      });
  }*/

  checkForCategoryDropdownHideEvent(){
    if($("#sidebar").hasClass("shrinked"))
    { 
      $("#shrinked-category-dropdown").removeClass("category-dropdown");
    }
    else
    {
      
    } 
  }

  categoryMenuClick(e:any,category:any,order:any){
    e.stopPropagation();
    this.router.navigateByUrl('/dashboard');
    
    $("nav#sidebar li").removeClass("active");
    $("nav#sidebar li").removeClass("liMenuActive");
    $(".subMenuActive"+order).addClass("active");
    $(".subMenuActive"+order).addClass("liMenuActive");
    this.experienceTemplate.isCategoryClick = true;
    this.experienceTemplate.selectedCategory = category.Name;
    var categoryID=category.Id;
    categoryID = categoryID+1;
    if(categoryID==7){
      categoryID=0;
    }
    this.experienceTemplate.getExperienceTemplate(categoryID);
    
    this.checkForCategoryDropdownHideEvent();
    this.slideDownSecondHeaderForCategoryMenuClick();
  }

  slideDownSecondHeaderForCategoryMenuClick() {
        // $(".dashboard-second-header").slideUp();
        // $(".slide-down-icon").removeClass("hidden");
        // $(".slide-up-icon").addClass("hidden");
        
        $(".dashboard-second-header").slideDown();
        $(".slide-up-icon").removeClass("hidden");
        $(".slide-down-icon").addClass("hidden");
        $(".dashboard-second-header").removeClass("slideup");
        this.experienceTemplate.upArrowHide=true;

}

}

$(document).ready(() => {
  if(orderId!=0){
  var selectedopt=orderId;
  $("nav#sidebar li").removeClass("active");
      $("nav#sidebar li").removeClass("liMenuActive");
      $(".active"+selectedopt).addClass("active");
      $(".active"+selectedopt).addClass("liMenuActive");
  }
  })
  