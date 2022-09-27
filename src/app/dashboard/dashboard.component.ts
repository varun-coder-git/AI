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
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
// import { TabsetComponent } from "ngx-bootstrap";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NavbarService } from "../services/navbar.service";
import { ApiService } from "../services/api.service";
import {
  FormDataComponent,
  XapiSingleProfileData,
} from "./../data-model/formData.component";
import { ToasterService, ToasterConfig } from "angular2-toaster";
//
import { ToastrService } from "ngx-toastr";
// import { Angular5Csv } from "angular5-csv/Angular5-csv";

// import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { ClipboardService } from "ngx-clipboard";
import { combineLatest, Subscription } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
// import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ExperienceTemplateService } from "../services/experience-template.service";
import { AngularCsv } from "angular-csv-ext/dist/Angular-csv";

declare var require: any;
const jsPDF = require("jspdf");
require("jspdf-autotable");

declare var $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showArrow!: boolean;
  firstTimeUserLoginData: any;
  isStudioURL!: string;
  catalogueCategoryId: any;
  personaId!: string;
  allCategoryMeta: any;
  @ViewChild("canvas") public canvas!: ElementRef;
  changeNameForm!: FormGroup;
  title:any = 'app';
  elementType :any= 'url';
  value :any= 'Techiediaries';
  private cx!: CanvasRenderingContext2D;
  private toasterService: ToasterService;
  FormDataComponent: FormDataComponent;
  XapiSingleProfileData: XapiSingleProfileData;
  addNewRoomFlag!: string;
  modalRef!: BsModalRef;
  modalReference!: BsModalRef;
  changeNameData: any;
  orignalExpName: any;
  subscriptions: Subscription[] = [];
  added: boolean = false;
  isFirstOpen!: boolean;
  submitted: any = false;
  accordionShareClassEmail: string;
  accordionShareClassPage: string;
  accordionShareClassText: string;
  accordionShareClassQRCode: string;
  tData: any[];
  patronsAdd: any[] = [];
  patronsDelete: any[] = [];
  myExperiencesMeta: any;
  myExperiencesMetaCount: number = -1;
  experienceTemplateMeta: any;
  templateDataMeta: any;
  modalExperienceName: any;
  experienceTemplateDataCount!: number;
  tableData1: any;
  tableData2: any;
  tableData1Length: number;
  tableData2Length: number;
  modalTemplateId: any;
  modalTemplateName: string;
  selectedExperience: any;
  customExpId!: number;
  selectedRoomValidity: any = 1;
  publishExperienceId!: number;
  publishedExperienceMeta: any;
  publishedExperienceId!: number;
  publishedExperienceMetaCount: number = -1;
  RoomInfo!: any[];
  RoomInfoCount: number = -1;
  isAdd!: boolean;
  isEdit!: boolean;
  isChecked: boolean = false;
  cloneExperienceId!: number;
  cloneExperienceName!: string;
  isCloneExperienceChecked: boolean = false;
  isDatePickerVisible: boolean = false;
  roomName: string;
  roomStartDate: any;
  roomEndDate: any;
  numberOfViews!: 1000;
  customizeRoomData: any;
  ExpId!: number;
  roomIDValue!: number;
  RoomExpMapping!: {};
  UserId!: number;
  sendMailInvite: any;
  publicRoomId!: number;
 // roomRangeValue!: Date[];
  roomRangeValue:any;
  Email!: string;
  UserName!: string;
  PlanName!: string;
  myExperienceId!: number;
  getroomsArray: any;
  getOldRoomsArray: any;
  selectedRoomsAll: any;
  RoomNamePatron!: string;
  RoomIdPatron!: string;
  RoomPublishCodePatron!: string;
  roomInviteIdd!: number;
  invitedPublishCode!: string;
  selectedAllMailInvites!: boolean;
  getSendMailInvitesArray: any;
  DisplayPublishCode!: string;
  embedURL: any;
  embedHighDefURL: any;
  mainUrl: any;
  ExperiencePath!: string;
  ReportRoomName!: string;
  RoomVerboseData: any;
  imgData: any;
  radioData: any;
  radioValue: any;
  reportModalRoomId!: number;
  roomNameFlag: boolean;
  createExpFlag: boolean;
  cloneExpFlag: boolean;
  xapiDropDownListFlag!: boolean;
  xapiSingleProfileFlag!: boolean;
  xapiProfileData!: any[];
  xapiSingleProfileData!: any[];
  enablexAPI!: boolean;
  lrsProfileId: any;
  xapiProfileList!: number;
  roomId!: number;
  lrsRoomProfileId!: number;
  roomXapiCreateCall!: boolean;
  isPublic!: any;
  minDate: Date;
  showDateFlag!: boolean;
  isWeb: boolean = false;
  isAndroid: boolean = false;
  isIPhone: boolean = false;
  isCardboard: boolean = false;
  isDayDream: boolean = false;
  roomstatus: any;
  isPrivatechkboxValue: boolean;
  newlyAddedRoom: any[] = [];
  DisplayIFrameTag: any;
  imgBaseURL: string;
  random: number;
  planId!: number;
  totalRec!: number;
  totalRecPublishedExperince!: number;
  totalRecRoomCount!: number;
  page: number = 1;
  pagePublishedExperince: number = 1;
  pageRoomCount: number = 1;
  // AudioSrc: any;
  RoomDeatils: any;
  AllRoomDetails: any;
  mailUrl: any;
  deleteExpName: any;
  embedPreviewURL: string;
  DisplayHDIFrameTag : any;

  userPlan: any;
  //  public config1: ToasterConfig = new ToasterConfig({
  //   positionClass: 'toast-top-center',
  //   animation: 'fade',
  //   showCloseButton: true,
  //   timeout: 2000,
  //     });

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private modalService: BsModalService,
    private ApiService: ApiService,
    public nav: NavbarService,
    toasterService: ToasterService,
    public toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
   private _clipboardService: ClipboardService,
    private changeDetection: ChangeDetectorRef,
    public experienceTemplate: ExperienceTemplateService
  ) {
    this.FormDataComponent = new FormDataComponent();
    this.XapiSingleProfileData = new XapiSingleProfileData();
    this.tData = [
      {
        Id: "1",
        Name: "Tony Mays",
        Type: "Member",
        Members: "1",
      },
      {
        Id: "2",
        Name: "Anna Club",
        Type: "Group",
        Members: "20",
      },
    ];
    this.imgBaseURL = this.ApiService.apiBaseUrl + "/profile/";
    this.radioValue = "PDF";
    this.accordionShareClassEmail = "accordionShareClassEmail";
    this.accordionShareClassPage = "accordionShareClassPage";
    this.accordionShareClassText = "accordionShareClassText";
    this.accordionShareClassQRCode = "accordionShareClassQRCode";
    this.tableData1 = "";
    this.tableData1Length = -1;
    this.tableData2Length = -1;
    this.toasterService = toasterService;
    this.roomNameFlag = true;

    this.getroomsArray = new Array();
    this.getOldRoomsArray = new Array();
    this.getSendMailInvitesArray = new Array();
    this.embedURL = "https://edbt%VR%bitlink";
    this.embedHighDefURL = "https://edbt%VR%bitlink";
    this.embedPreviewURL = "https://edbt%VR%bitlink";
    this.selectedExperience = undefined;
    //    this.selectedExperience = null;
    this.modalTemplateName = "";
    this.createExpFlag = true;
    this.cloneExpFlag = true;
    this.roomName = "";
    this.lrsProfileId = undefined;
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.roomstatus = 1;
    //this.FormDataComponent.Room.IsPublic = false;
    this.isPrivatechkboxValue = false;
    this.random = Math.random();

    // this.AudioSrc = "assets/files/templateHover.mp3";
    // let audio = new Audio();
    // audio.load();
   
  }

  get change() {
    return this.changeNameForm.controls;
  }

  ngOnInit() {
    if(this.experienceTemplate.upArrowHide==true){
      $(".dashboard-second-header").slideDown();
      $(".slide-up-icon").removeClass("hidden");
      $(".slide-down-icon").addClass("hidden");
      $(".dashboard-second-header").removeClass("slideup");
    }
    this.changeNameForm = this.formBuilder.group({
      ExperienceName: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9:_@!&? -]*$"),
      ]),
    });
    this.UserId = parseInt(window.sessionStorage.getItem("userId") || '{}' );
    this.Email = window.sessionStorage.getItem("UserName") || '{}';
    this.UserName = window.sessionStorage.getItem("Name") || '{}';
    this.PlanName = window.sessionStorage.getItem("Plan") || '{}';
    this.personaId = window.sessionStorage.getItem("PersonaId") || '{}';

    this.catalogueCategoryId = 0;
    // this.showArrow = false;
    // this.getFirstTimeUserLoginData();

    // window.sessionStorage.setItem('catalogueCategoryId', this.catalogueCategoryId);
    // window.sessionStorage.setItem('IsStudioLinkFlag', 'true');

    // localStorage.setItem('catalogueCategoryId', this.catalogueCategoryId);
    // localStorage.setItem('IsStudioLinkFlag', 'true');

    // this.isStudioURL = window.sessionStorage.getItem('IsStudioLinkFlag');

    this.experienceTemplate.getAllCategoryData();
    this.nav.show();
    this.showDateFlag = true;
    if (window.location.href.indexOf("myexperience") > -1) {
      $("html, body").animate(
        {
          scrollTop: $("#experience-div").offset().top,
        },
        1000
      );
      this.onTabClicked(1);
    } else if (window.location.href.indexOf("publishedexperience") > -1) {
      $("html, body").animate(
        {
          scrollTop: $("#experience-div").offset().top,
        },
        1000
      );
      this.onTabClicked(2);
    } else if (window.location.href.indexOf("rooms") > -1) {
      $("html, body").animate(
        {
          scrollTop: $("#experience-div").offset().top,
        },
        1000
      );
      this.onTabClicked(3);
    } else if (window.location.href.indexOf("createexperience") > -1) {
      $(".dashboard-second-header").slideDown();
      $(".slide-up-icon").removeClass("hidden");
      $(".dashboard-second-header").removeClass("slideup");
      setTimeout(function () {
        $(".slide-down-icon").addClass("hidden");
      }, 500);
    } else if (window.location.href.indexOf("dashboard") > -1) {
      $("nav#sidebar li").removeClass("active");
      $(".active1").addClass("active");
      $(".tabPointer").css("display", "block");
    }

   // console.log("flag", this.experienceTemplate.isCategoryClick);
    if (this.experienceTemplate.isCategoryClick != true) {
      // this.getExperienceTemplate(this.catalogueCategoryId);
      this.experienceTemplate.getExperienceTemplate(this.catalogueCategoryId);
    }
    console.log("experienceTemplate",this.experienceTemplate);
    this.getAllMyExperience();
    this.getRoomData();
    // this.getExistingPatrons();
    this.getUserPlan();
    // this.getPlanId();
  }

  // getPlanId(){
  //   let url = 'room/activePlan/' + parseInt(window.sessionStorage.getItem('userId'));
  //   this.ApiService.getData(url)
  //     .subscribe(
  //       response => {
  //         var data=response['data'];
  //         this.planId=data[0].PlanId;
  //       },
  //       error => {
  //         this.popToast('error', 'Woooops! Looks like something is not right in here.');
  //       }
  //     )
  // }
  
  // popToast(messageType:any, message:any) {
  //   this.toasterService.pop(messageType, message);
  // }

  mouseEnter(div: string) {
    if (window.sessionStorage.getItem("needHelpFlag") === "true") {
      this.ApiService.helpText = div;
      this.ApiService.helpFlag = true;
    }
  }

  mouseLeave() {
    if (window.sessionStorage.getItem("needHelpFlag") === "true") {
      this.ApiService.helpText =
        "This guide is mouse pointer sensitive. Point at a page item to view its help.";
      this.ApiService.helpFlag = false;
    }
  }

  sildeNext() {
    // console.log('sildeNext',this.getSendMailInvitesArray);
    if (
      $(".step1").hasClass("active") &&
      this.getSendMailInvitesArray.length == 0
    ) {
      return;
    }
    $(".prev").removeClass("hidden");
    if ($(".step2").hasClass("active")) {
      $(".next").addClass("hidden");
      $("#SendInviteID").removeClass("hidden");
    }
  }

  sildePrev() {
    $(".next").removeClass("hidden");
    if ($(".step2").hasClass("active")) {
      $(".prev").addClass("hidden");
    } else if ($(".step3").hasClass("active")) {
      $("#SendInviteID").addClass("hidden");
    }
  }

  copy(text: string,type:any) {
    this._clipboardService.copyFromContent(text);
    if(type=='URL'){
    // this.popToast("success", "Link copied.");
    this.toastrService.success("Link copied")
    }
    if(type=='Embed'){
      // this.popToast("success", "Embed tag copied.");
      this.toastrService.success("Embed tag copied.");
      }
      if(type=='Code'){
        // this.popToast("success", "Code copied.");
        this.toastrService.success("Code copied.");
        }
  }
  

  slideDownSecondHeader() {
    if ($(".dashboard-second-header").hasClass("slideup")) {
      $(".dashboard-second-header").slideDown();
      $(".dashboard-second-header").removeClass("slideup");
    /*  if (this.showArrow == true) {
        this.addFirstTimeUserInfo();
      }*/
      $(".slide-down-icon").addClass("hidden");
      $(".slide-up-icon").removeClass("hidden");
    } else {
      
    this.experienceTemplate.upArrowHide=false;
      let el:any = document.getElementById("target");
      $(".dashboard-second-header").slideUp();
      $(".dashboard-second-header").addClass("slideup");
      el.scrollIntoView();
      setTimeout(() => {
        console.log('in timeout');
        $(".slide-down-icon").removeClass("hidden");
        $(".slide-up-icon").addClass("hidden");
      }, 500);
    }
    $(".mouse-wheel").addClass("mousewhile-margin");
  }

  onTabClicked(number: any) {
    $(".tabset-header").removeClass("active");
    //$(".tab-content").removeClass("active");
    for(var i=1;i<=3;i++){

      if($(".tab-content"+i).hasClass("active")){

        $(".tab-content"+i).removeClass("active");

      }

    }
    var order=number+1;
    $("nav#sidebar li").removeClass("active");
    $("nav#sidebar li").removeClass("liMenuActive");
    $(".active"+order).addClass("active");
    $(".active"+order).addClass("liMenuActive");
    $(".tab" + number).addClass("active");
    //$("#tab" + number).addClass("active");

    if (number == 1) {
      $(".tab-content1").addClass("active");
      this.getAllMyExperience();
    } else if (number == 2) {
      $(".tab-content2").addClass("active");
      this.getAllPublishedExperience();
    } else if (number == 3) {
      $(".tab-content3").addClass("active");
      this.getUserPlan();
      this.getRoomData();
      this.getXapiProfileData();
    }
  }

  goToPublishedHistory(
    publishedId: number,
    templateName: string,
    experienceName: string
  ) {
    this.router.navigateByUrl(
      "/publishedhistory/" +
        publishedId +
        "/" +
        templateName +
        "/" +
        experienceName
    );
  }

  goTopublish(template: TemplateRef<any>, experienceId: number) {
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
    this.publishExperienceId = experienceId;
  }

  goToEdit(expId:any, expTempName:any, expName:any) {
    this.router.navigateByUrl(
      "/createexperience/" + expId + "/" + expTempName + "/" + expName
    );
    this.isEdit = false;
  }

  goToAnalytics(
    publishExpId: number,
    publishedTempName: string,
    publishedExpName: string
  ) {
    this.router.navigateByUrl(
      "/publishanalytics/" +
        publishExpId +
        "/" +
        publishedTempName +
        "/" +
        publishedExpName
    );
  }

  goToManagePatrons(
    template: TemplateRef<any>,
    RoomNamePatron: string,
    RoomIdPatron: string,
    RoomPublishCodePatron: string,
    publishedExperienceRoomMappingId: number,
    invitedPublishCodeS: string,
    ExperienceFolderPath: string,
    RoomName: string
  ) {
    this.patronsAdd = [];
    this.RoomNamePatron = RoomNamePatron;
    this.RoomIdPatron = RoomIdPatron;
    this.RoomPublishCodePatron = RoomPublishCodePatron;
    this.mailUrl =
      this.ApiService.getExperienceBaseUrl() +
      "" +
      ExperienceFolderPath +
      "/?" +
      publishedExperienceRoomMappingId +
      "--0--0--0/" +
      RoomName.replace(/ /g, "-");
    this.getExistingPatrons();
    this.modalRef = this.modalService.show(template, {
      class: "modal-md modal-content-radius",
    });
  }

  goToShare(
    template: TemplateRef<any>,
    publishedExperienceRoomMappingId: number,
    invitedPublishCodeS: string,
    ExperienceFolderPath: string,
    RoomName: string
  ) {
    this.roomInviteIdd = publishedExperienceRoomMappingId;
    this.invitedPublishCode = invitedPublishCodeS;
    this.DisplayPublishCode = this.invitedPublishCode;
    this.ExperiencePath = ExperienceFolderPath;
    this.mainUrl = this.ExperiencePath;
    this.embedURL =  this.ApiService.getExperienceBaseUrl() +"" +this.ExperiencePath +"/?" +publishedExperienceRoomMappingId +"--0--0--0/" +RoomName.replace(/ /g, "-");
    // this.embedPreviewURL =this.ApiService.getExperienceBaseUrl() +"" +this.ExperiencePath +"/exp.php?" + publishedExperienceRoomMappingId +"--0--0--0/" +RoomName.replace(/ /g, "-");
    this.embedHighDefURL =this.ApiService.getExperienceBaseUrl() +"" +this.ExperiencePath +"/index-hd.php?" +publishedExperienceRoomMappingId +"--0--0--0/" +RoomName.replace(/ /g, "-");
    this.invitedPublishCode =this.ApiService.getExperienceBaseUrl() +"" +this.ExperiencePath +"/?" +publishedExperienceRoomMappingId +"--0--0--0/" +this.invitedPublishCode;
    this.DisplayIFrameTag ='<iframe src="' +this.embedURL +'" width="560" height="315"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    this.DisplayHDIFrameTag ='<iframe src="' +this.embedHighDefURL +'" width="560" height="315"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
  }

  openInvitaionPopup(
    template: TemplateRef<any>,
    roomInviteId: number,
    invitedPublishCodeS: string
  ) {
    this.selectedAllMailInvites = false;
    this.roomInviteIdd = roomInviteId;
    this.invitedPublishCode = invitedPublishCodeS;
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
    const sendMailInvite = this.ApiService.getData(
      "user/addedPatronRoom/" + this.UserId + "/" + this.roomInviteIdd
    );
    sendMailInvite.subscribe(
      (data:any) => {
        this.sendMailInvite = data["data"];
        // console.log("sendMailInvite",this.sendMailInvite);
      },
      (error) => {}
    );
  }

  openInvitaionSharePopup(
    template: TemplateRef<any>,
    roomInviteId: number,
    invitedPublishCodeS: string
  ) {
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
    const sendMailInvite = this.ApiService.getData(
      "user/addedPatronRoom/" + this.UserId + "/" + this.roomInviteIdd
    );
    sendMailInvite.subscribe(
      (data:any) => {
        this.sendMailInvite = data["data"];
      },
      (error) => {}
    );
  }

  goToPublicRoomPopup(template: TemplateRef<any>, roomData: any, isRoomPublic:any) {
    if (
      (this.userPlan.planData[0].RemainingPrivateRoom > 0 &&
        isRoomPublic == true) ||
      isRoomPublic == false
    ) {
      this.isPublic = roomData.IsPublic;
      this.publicRoomId = roomData.Id;
      this.modalRef = this.modalService.show(template, {
        class: "modal-content-radius",
      });
      this.roomstatus = null;
    } else {
      // this.popToast(
      //   "error",
      //   "Oops! Looks like your account is out of Private Rooms."
      // );
      this.toastrService.error("Oops! Looks like your account is out of Private Rooms.");
    }
  }

  makeRoomPublic() {
    // this.FormDataComponent.Room.UserId = parseInt(window.sessionStorage.getItem('userId'), 0);
    // this.FormDataComponent.Room.IsPublic = !this.isPublic;
    var data = {
      UserId: parseInt(window.sessionStorage.getItem("userId")||'{}', 0),
      IsPublic: !this.isPublic,
    };

    this.FormDataComponent.Room.IsPublic = !this.isPublic;

    let url = "room/updateRoom/" + this.publicRoomId;
    this.ApiService.putData(url, data).subscribe(
      (response) => {
        if (this.FormDataComponent.Room.IsPublic === false) {
          // this.popToast(
          //   "success",
          //   "This Room is now private - Share it exclusively!"
          // );
          this.toastrService.success("This Room is now private - Share it exclusively!");
        }
        if (this.FormDataComponent.Room.IsPublic === true) {
          // this.popToast(
          //   "success",
          //   "This Room is now public - Share it freely!"
          // );
          this.toastrService.success("This Room is now public - Share it freely!");
        }

        this.getRoomData();
        this.getUserPlan();
      },
      (error) => {
        // this.popToast(
        //   "error",
        //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
        // );
        this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
      }
    );
    this.modalRef.hide();
  }

  openExperienceTemplate(
    template: TemplateRef<any>,
    templateId: number,
    experienceName: any
  ) {
    if (templateId == -1) {
      this.extraTemplate();
      return;
    }
    this.checkForCategoryDropdownHideEvent();
    window.scrollTo(0, 0);
    this.createExpFlag = true;
    this.modalExperienceName = experienceName;
    this.selectedExperience = undefined;
    let templateData = this.ApiService.getData(
      "experience/getOpenExperienceByTemplateId/" + templateId
    );
    templateData.subscribe(
      (data:any) => {
        this.templateDataMeta = data["data"];
        this.modalTemplateId = templateId;
      },
      (error) => {}
    );
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
  }

  /* getExperienceTemplate(catalogueCategoryId) {
         let experienceTemplateData = this.ApiService.getData('experience/getAllExperienceTemplate/' + this.personaId + '/' + catalogueCategoryId);
         experienceTemplateData.subscribe(data => {
                 this.experienceTemplateMeta = data['data'];
                 this.experienceTemplate.experienceTemplateMetaData = this.experienceTemplateMeta;
                 this.experienceTemplateDataCount = this.experienceTemplateMeta.length;
                 this.experienceTemplate.experienceTemplateDataCount = this.experienceTemplateDataCount;
             },
             error => {

             })
     }*/

  createNewExperience(experienceData:any) {
    var val = experienceData.form.controls.expname.value;
    this.modalTemplateName = experienceData.form.controls.expname.value.trim();
    if (this.modalTemplateName == "") {
      experienceData.form.controls["expname"].setErrors({
        required: true,
      });
    }
    if (this.modalTemplateName.length > 100) {
      experienceData.form.controls["expname"].setErrors({
        maxlength: true,
      });
    }
    this.createExpFlag = false;
    if (experienceData.valid) {
      if (
        this.selectedExperience != undefined &&
        this.selectedExperience != null
      ) {
        this.FormDataComponent.IntialExperience.ExperienceId = this.selectedExperience;
      } else {
        this.FormDataComponent.IntialExperience.ExperienceId = this.templateDataMeta[0].Id;
      }
      this.FormDataComponent.IntialExperience.ExperienceName = this.modalTemplateName;
      this.FormDataComponent.IntialExperience.ExperienceTemplateId = this.modalTemplateId;
      this.FormDataComponent.IntialExperience.UserId = Number(
        window.sessionStorage.getItem("userId")
      );
      this.FormDataComponent.IntialExperience.IsSampleExperience = this.isChecked;

      let urlChkDuplicate = "experience/checkExperienceName";

      if (
        this.modalTemplateName.indexOf("/") > -1 ||
        this.modalTemplateName.indexOf("\\") > -1
      ) {
        // this.popToast("error", "Special character '/' or '\\' is not allowed.");
        this.toastrService.error("Special character '/' or '\\' is not allowed.");
      } else {
        this.spinnerService.show();
        var createButton:any = document.getElementById("createExp");
        createButton.setAttribute("disabled", "true");

        this.ApiService.postData(
          urlChkDuplicate,
          this.FormDataComponent.IntialExperience
        ).subscribe(
          (response:any) => {
            this.spinnerService.hide();
            createButton.removeAttribute("disabled");
            if (response["status"] === true) {
              // this.popToast("error", "Experience name already exists.");
              this.toastrService.error("Experience name already exists.");
              createButton.removeAttribute("disabled");
              this.spinnerService.hide();
            } else {
              let url = "experience/createInitialExperience";
              this.ApiService.postData(
                url,
                this.FormDataComponent.IntialExperience
              ).subscribe(
                (response:any) => {
                  this.createExpFlag = true;
                  // this.popToast(
                  //   "success",
                  //   "Whipping your shiny new Experizer Experience. Happy customization!"
                  // );
                  this.toastrService.success("Whipping your shiny new Experizer Experience. Happy customization!");
                  this.router.navigateByUrl(
                    "/createexperience/" +
                      response["ExperienceId"] +
                      "/" +
                      this.modalExperienceName +
                      "/" +
                      this.modalTemplateName
                  );
                },
                (error) => {
                  // this.popToast(
                  //   "error",
                  //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
                  // );
                  this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
                  this.createExpFlag = true;
                  createButton.removeAttribute("disabled");
                  this.spinnerService.hide();
                }
              );
              this.modalRef.hide();
            }
          },
          (error) => {
            // console.log("Inside error log");
            // this.popToast(
            //   "error",
            //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
            // );
            this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
            this.spinnerService.hide();
            createButton.removeAttribute("disabled");
          }
        );
      }
    }
  }

  cloneExperience(cloneExpData:any) {
    this.cloneExpFlag = false;
    this.cloneExperienceName = this.cloneExperienceName.trim();
    console.log(this.cloneExperienceName);
    if (this.cloneExperienceName == "") {
      cloneExpData.form.controls["cloneExpName"].setErrors({
        required: true,
      });
    }
    if (cloneExpData.valid) {
      this.FormDataComponent.CloneExperience.Id = this.cloneExperienceId;
      this.FormDataComponent.CloneExperience.ExperienceName = this.cloneExperienceName;
      this.FormDataComponent.CloneExperience.IsSampleExperience = this.isCloneExperienceChecked;
      this.FormDataComponent.CloneExperience.UserId = Number(
        window.sessionStorage.getItem("userId")
      );
      this.spinnerService.show();
      let urlChkDuplicate = "experience/checkExperienceName";

      if (
        this.cloneExperienceName.indexOf("/") > -1 ||
        this.cloneExperienceName.indexOf("\\") > -1
      ) {
        // this.popToast("error", "Special character '/' or '\\' is not allowed.");
        this.toastrService.error("Special character '/' or '\\' is not allowed.");
        return;
      } else {
        this.ApiService.postData(
          urlChkDuplicate,
          this.FormDataComponent.CloneExperience
        ).subscribe(
          (response:any) => {
            if (response["status"] === true) {
              this.spinnerService.hide();
              // this.popToast("error", "Experience name already exists.");
              this.toastrService.error("Experience name already exists.");
            } else {
              let url = "experience/cloneExperience";
              this.ApiService.postData(
                url,
                this.FormDataComponent.CloneExperience
              ).subscribe(
                (response) => {
                  this.cloneExpFlag = true;
                  // this.popToast(
                  //   "success",
                  //   "Ziiiiinggg! You have a clone of your " +
                  //     this.cloneExperienceName +
                  //     " Experience."
                  // );
                  this.toastrService.success("Ziiiiinggg! You have a clone of your " + this.cloneExperienceName + " Experience.");
                  this.getAllMyExperience();
                  cloneExpData.reset();
                  this.spinnerService.hide();
                },
                (error) => {
                  this.cloneExpFlag = true;
                  // this.popToast(
                  //   "error",
                  //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
                  // );
                  this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
                  this.spinnerService.hide();
                }
              );

              this.modalRef.hide();
            }
          },
          (error) => {
            this.spinnerService.hide();
            // this.popToast(
            //   "error",
            //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
            // );
            this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
          }
        );
      }
    }
  }

  getAllMyExperience() {
    const userId = parseInt(window.sessionStorage.getItem("userId")||'{}');
    const myExperienceData = this.ApiService.getData(
      "experience/getAllExperienceByUserId/" + userId
    );
    myExperienceData.subscribe(
      (data:any) => {
        this.myExperiencesMeta = data["data"];
        this.myExperiencesMetaCount = this.myExperiencesMeta.length;
        this.totalRec = this.myExperiencesMeta.length;
      },
      (error) => {}
    );
  }

  getAllPublishedExperience() {
    let userId = parseInt(window.sessionStorage.getItem("userId")||'{}');
    let publishedExperienceData = this.ApiService.getData(
      "experience/getPublishedExperienceByUserId/" + userId
    );
    publishedExperienceData.subscribe(
      (data:any) => {
        this.publishedExperienceMeta = data["data"];
        this.publishedExperienceMetaCount = this.publishedExperienceMeta.length;
        this.totalRecPublishedExperince = this.publishedExperienceMeta.length;
      },
      (error) => {}
    );
  }

  publishExperience() {
    var publishExpButton:any = document.getElementById("publishExp");
    publishExpButton.setAttribute("disabled", "true");

    let data = {};
    this.ApiService.postData(
      "experience/publishExperience/" + this.publishExperienceId,
      data
    ).subscribe(
      (apiresults) => {
        // this.popToast(
        //   "success",
        //   "Congratulation! Your Experience has been published successfully. Don't forget to add this to a room now (If you have not already)."
        // );
        this.toastrService.success("Congratulation! Your Experience has been published successfully. Don't forget to add this to a room now (If you have not already).");
        this.modalRef.hide();
      },
      (err) => {
        // this.popToast(
        //   "error",
        //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
        // );
        this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
        publishExpButton.removeAttribute("disabled");
      }
    );
  }

  setRoomMapping() {
    this.getroomsArray = [];
    let counter = 0;
    const userId = window.sessionStorage.getItem("userId");
    const roomData = this.ApiService.getData("room/getRoomsByUserId/" + userId);
    roomData.subscribe(
      (data:any) => {
        this.RoomInfo = data["data"];
        this.RoomInfoCount = this.RoomInfo.length;
        this.totalRecRoomCount = this.RoomInfo.length;
        for (let i = 0; i < this.RoomInfo.length; i++) {
          if (this.RoomInfo[i].PublishedExperienceId == this.customExpId) {
            counter = counter + 1;
            this.RoomInfo[i].selected = true;
            if (this.RoomInfo.length == counter) {
              this.selectedRoomsAll = true;
            }
            this.getroomsArray.push(this.RoomInfo[i].Id);
          } else {
            this.RoomInfo[i].selected = false;
            this.selectedRoomsAll = false;
          }

          if (this.newlyAddedRoom.length > 0) {
            for (let j = 0; j < this.newlyAddedRoom.length; j++) {
              if (this.RoomInfo[i].Id == this.newlyAddedRoom[j]) {
                this.RoomInfo[i].selected = true;
                this.getroomsArray.push(this.RoomInfo[i].Id);
              }
            }
          }
        }
        // this.getroomsArray = [];
        this.ExpId = this.customExpId;
      },
      (error) => {}
    );
  }

  goToRoomMapping(template: TemplateRef<any>, ExpId: number) {
    this.spinnerService.show();
    //this.selectedRoomsAll = false;

    this.getroomsArray = [];
    this.getOldRoomsArray = [];
    this.customExpId = ExpId;
    let counter = 0;
    const userId = window.sessionStorage.getItem("userId");
    const roomData = this.ApiService.getData("room/getRoomsByUserId/" + userId);
    roomData.subscribe(
      (data:any) => {
        this.RoomInfo = data["data"];
        this.RoomInfoCount = this.RoomInfo.length;
        for (let i = 0; i < this.RoomInfo.length; i++) {
          if (this.RoomInfo[i].PublishedExperienceId == ExpId) {
            counter = counter + 1;
            this.RoomInfo[i].selected = true;
            if (this.RoomInfo.length == counter) {
              this.selectedRoomsAll = true;
            }
            this.getroomsArray.push(this.RoomInfo[i].Id);
            this.getOldRoomsArray.push(this.RoomInfo[i].Id);
          } else {
            this.RoomInfo[i].selected = false;
            this.selectedRoomsAll = false;
          }
        }

        this.spinnerService.hide();

        this.newlyAddedRoom = [];
        const _combine = combineLatest(
          this.modalService.onShown,
          this.modalService.onHide
        ).subscribe(() => this.changeDetection.markForCheck());
        this.subscriptions.push(
          this.modalService.onShown.subscribe((reason: string) => {})
        );
        //   this.subscriptions.push(
        //    this.modalService.onHide.subscribe((reason: string) => {
        //      if($("modal-container").length == 1)
        //      {
        //        $("body").removeClass("modal-open");
        //      }
        //      $("modal-container:nth-child(2)").remove();
        //      $('bs-modal-backdrop').remove();
        //    })
        //  );
        //  this.subscriptions.push(
        //    this.modalService.onHidden.subscribe((reason: string) => {
        //      this.unsubscribe();
        //    })
        //  );

        this.modalReference = this.modalService.show(template, {
          class: "modal-content-radius",
        });
        this.subscriptions.push(_combine);
        // this.getroomsArray = [];
        this.ExpId = ExpId;
      },
      (error) => {}
    );
  }

  updateSelectedAllRooms(e:any) {
    this.getroomsArray = [];
    if (e.target.checked === true) {
      for (let i = 0; i < this.RoomInfo.length; i++) {
        this.RoomInfo[i].selected = true;
        const id = this.RoomInfo[i].Id;
        this.getroomsArray.push(id);
      }
      this.selectedRoomsAll = true;
    } else {
      for (let i = 0; i < this.RoomInfo.length; i++) {
        this.RoomInfo[i].selected = false;
        this.getroomsArray.pop();
      }
      this.selectedRoomsAll = false;
    }
  }

  updateSelectedElementRoom(e:any) {
    if (e.target.checked === true) {
      const id = e.target.id;
      this.getroomsArray.push(+id);
    } else {
      const id = e.target.id;
      const index = this.getroomsArray.indexOf(+id);
      this.getroomsArray.splice(index, 1);
    }
    if (this.getroomsArray.length !== this.RoomInfo.length) {
      this.selectedRoomsAll = false;
    } else {
      this.selectedRoomsAll = true;
    }
  }

  getRoomData() {
    // const userId = window.sessionStorage.getItem('userId');
    // const roomData = this.ApiService.getData('room/getRoomsByUserId/' + userId);
    // roomData.subscribe(data => {
    //   this.RoomInfo = data['data'];
    //   this.RoomInfoCount = this.RoomInfo.length;
    this.setRoomMapping();
    // },
    //   error => {

    //   });

    // if(this.planId==2){
    //   const roomData = this.ApiService.getData('room/getRoomDetailsByUserId/' + userId);
    //   roomData.subscribe(data => {
    //     this.RoomDeatils = data['data'];
    //     this.RoomDeatils[0].Available= (this.RoomDeatils[0].Available*5)+1;
    //     console.log( "room",this.RoomDeatils);

    //   },
    //     error => {

    //     });
    // }
  }

  onChange($event:any) {
    //  console.log('range value', this.roomRangeValue);

    if (this.selectedRoomValidity == 2) {
      //  console.log(this.roomRangeValue);
      this.isDatePickerVisible = true;

      this.showDateFlag = true;
    } else {
      this.isDatePickerVisible = false;
    }
  }

  goTodeletePublishedExperience(
    template: TemplateRef<any>,
    publishedExperienceData: any
  ) {
    this.publishedExperienceId = publishedExperienceData.Id;
    this.deleteExpName = publishedExperienceData.ExperienceName;
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
  }

  goTodeleteMyExperience(template: TemplateRef<any>, myExperiencesData: any) {
    this.myExperienceId = myExperiencesData.Id;
    this.deleteExpName = myExperiencesData.ExperienceName;
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
  }

  deleteMyExperience() {
    this.spinnerService.show();
    this.ApiService.deleteData(
      "experience/deleteMyExperience/" + this.myExperienceId
    ).subscribe(
      (response) => {
        this.spinnerService.hide();
        // this.popToast("success", "Done! Cleared that up for you.");
        this.toastrService.success("Done! Cleared that up for you.");
        this.getAllMyExperience();
      },
      (error) => {
        this.spinnerService.hide();
        // this.popToast(
        //   "error",
        //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
        // );
        this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
      }
    );
    this.modalRef.hide();
  }

  deletePublishedExperience() {
    this.spinnerService.show();
    const url =
      "experience/deletePublishExperience/" + this.publishedExperienceId;
    this.ApiService.deleteData(url).subscribe(
      (response) => {
        this.spinnerService.hide();
        // this.popToast("success", "Done! Cleared that up for you.");
        this.toastrService.success("Done! Cleared that up for you.");
        this.getAllPublishedExperience();
      },
      (error) => {
        this.spinnerService.hide();
        // this.popToast(
        //   "error",
        //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
        // );
        this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
      }
    );
    this.modalRef.hide();
  }

  goToCloneExperience(template: TemplateRef<any>, experienceId: number) {
    this.cloneExpFlag = true;
    this.cloneExperienceId = experienceId;
    this.cloneExperienceName = "";
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
  }

  addNewRoom(template: TemplateRef<any>, flag: string) {
    // var data={
    //   "UserId":this.UserId
    // }
    // let url = 'room/canCreate';
    // this.ApiService.postData(url,data)
    //   .subscribe(
    //     response => {
    // if(this.userPlan.planData[0].RemainingPrivateRoom>0){
    this.roomNameFlag = true;
    this.isEdit = false;
    this.isAdd = true;
    this.roomName = "";
    this.numberOfViews = 1000;
    this.addNewRoomFlag = flag;
    this.xapiDropDownListFlag = false;
    this.xapiSingleProfileFlag = false;
    this.enablexAPI = false;
    this.isPrivatechkboxValue = false;
    this.lrsProfileId = 0;
    this.selectedRoomValidity = 1;
    this.isDatePickerVisible = false;
    this.roomRangeValue = [];
    this.FormDataComponent.Room.IsPublic = true;
    if (this.selectedRoomValidity == 1) {
      this.showDateFlag = true;
    } else {
      this.showDateFlag = false;
    }

    //this.roomRangeValue = null;
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
    // }
    // else{
    //   //this.popToast('error', 'Private room count exceeds.');
      // this.toastrService.error('Private room count exceeds.');
    // }

    //   },
    //   error => {
    //     console.log("error",error)
    //     //this.popToast('error', error.error.message);
    //     this.toastrService.error(error.error.message);
    //   }
    // );
  }

  closeModalPopup(template: TemplateRef<any>) {
    // $('body').removeClass('modal-open');
    // $('modal-container').remove();
    // $('bs-modal-backdrop').remove();

    this.modalReference.hide();
  }

  changeRoomStatus(roomId: number, statusId: number) {
    // this.FormDataComponent.Room.StatusId = statusId;
    const data = {
      StatusId: statusId,
      //  UserId:this.UserId
    };

    const url = "room/updateRoomOnlineStatus/" + roomId;
    this.ApiService.putData(url, data).subscribe(
      (response) => {
        if (statusId === 1) {
          // this.popToast("success", "This Room is now LIVE!");
          this.toastrService.success("This Room is now LIVE!");
        } else {
          // this.popToast("success", "This Room is now Shut Down.");
          this.toastrService.success("This Room is now Shut Down.");
        }
        this.getRoomData();
      },
      (error) => {
        console.log("error", error);
        // this.popToast("error", error.error.message);
        this.toastrService.error(error.error.message);
      }
    );
  }

  openRoomSettings(template: TemplateRef<any>, roomData: any) {
    this.roomStartDate = null;
    // console.log(roomData.StartDate);
    this.addNewRoomFlag = "Room";
    this.isAdd = false;
    this.isEdit = true;
    this.customizeRoomData = roomData;
    this.roomName = roomData.RoomName;
    this.numberOfViews = 1000;
    this.roomStartDate = roomData.StartDate;
    this.roomEndDate = roomData.EndDate;
    this.roomId = roomData.Id;
    this.enablexAPI = false;
    this.lrsProfileId = null;
    this.xapiDropDownListFlag = false;
    this.xapiSingleProfileFlag = false;
    this.showDateFlag = true;

    if (roomData.IsPublic == 0) {
      this.FormDataComponent.Room.IsPublic = false;
      this.isPrivatechkboxValue = true;
    } else {
      this.FormDataComponent.Room.IsPublic = true;
      this.isPrivatechkboxValue = false;
    }

    if (roomData.EnablexAPI == 0) {
      this.lrsRoomProfileId = 0;
      this.lrsProfileId = undefined;
    } else {
      this.enablexAPI = true;
      this.xapiDropDownListFlag = true;
      this.xapiSingleProfileFlag = true;
      let url = "/room/xapiprofile/room/";

      if (this.xapiProfileData !== undefined && this.xapiProfileData != null) {
        if (roomData.LRSProfileId > 0) {
          this.lrsProfileId = roomData.LRSProfileId;
          this.lrsRoomProfileId = roomData.LRSProfileId;
          this.xapiSingleProfileFlag = true;
          for (let i = 0; i < this.xapiProfileData.length; i++) {
            if (this.lrsProfileId == this.xapiProfileData[i]["Id"]) {
              this.XapiSingleProfileData.ProfileName = this.xapiProfileData[i][
                "ProfileName"
              ];
              this.XapiSingleProfileData.EndPointUrl = this.xapiProfileData[i][
                "EndPointUrl"
              ];
              this.XapiSingleProfileData.AuthUserKey = this.xapiProfileData[i][
                "AuthUserKey"
              ];
              this.XapiSingleProfileData.AuthSecretKey = this.xapiProfileData[
                i
              ]["AuthSecretKey"];
            }
          }
        } else {
          this.xapiDropDownListFlag = false;
          this.xapiSingleProfileFlag = false;
          this.lrsProfileId = null;
        }
      }
    }

    let tempDate = new Date();
    if (this.roomStartDate == undefined) {
      this.roomStartDate = tempDate;
      this.roomRangeValue = null;
      //  this.roomRangeValue[0] = null;
      // this.roomRangeValue[1] = null;
    } else {
      this.roomRangeValue = [
        new Date(this.roomStartDate),
        new Date(this.roomEndDate),
      ];
    }
    if (roomData.IsAlwaysActive == true) {
      this.selectedRoomValidity = 1;
      this.isDatePickerVisible = false;
    } else {
      this.selectedRoomValidity = 2;
      this.isDatePickerVisible = true;
    }

    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
  }

  convertDateToUTC(date:any) {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  }

  closeAddRoomPopup(template: TemplateRef<any>, roomData:any) {
    if (this.addNewRoomFlag == "Room") {
      $("body").removeClass("modal-open");
    }
    // roomData.reset();
    this.selectedRoomValidity = 1;
    this.isDatePickerVisible = false;
    this.modalRef.hide();
  }
  isDateValid(input:any) {
    if (Object.prototype.toString.call(input) === "[object Date]") return true;
    return false;
  }

  // onChangeDate() {
  //   let rangevalueFlag1 = this.isDateValid(this.roomRangeValue[0]);
  //   let rangevalueFlag2 = this.isDateValid(this.roomRangeValue[1])

  //  // console.log('range valid', rangevalueFlag1);

  //   if(rangevalueFlag1 && rangevalueFlag2) {
  //     this.showDateFlag = true;
  //   } else {
  //     this.showDateFlag = false;
  //   }
  // }

  saveRoomInfo(template: TemplateRef<any>, roomData:any):any {
    this.roomNameFlag = false;
    this.showDateFlag = false;
    this.roomName=this.roomName.trim();
    if (true) {
      if (this.enablexAPI) {
        if (this.xapiSingleProfileFlag == true) {
          if (
            this.XapiSingleProfileData.ProfileName === "" ||
            this.XapiSingleProfileData.ProfileName === null
          ) {
            this.roomNameFlag = false;
            return false;
          }
          if (
            this.XapiSingleProfileData.EndPointUrl === "" ||
            this.XapiSingleProfileData.EndPointUrl === null
          ) {
            this.roomNameFlag = false;
            return false;
          }
          if (
            this.XapiSingleProfileData.AuthUserKey === "" ||
            this.XapiSingleProfileData.AuthUserKey === null
          ) {
            this.roomNameFlag = false;
            return false;
          }
          if (
            this.XapiSingleProfileData.AuthSecretKey === "" ||
            this.XapiSingleProfileData.AuthSecretKey === null
          ) {
            this.roomNameFlag = false;
            return false;
          }
        } else {
          return false;
        }
      }

      if (this.roomName === null || this.roomName === "") {
        this.roomNameFlag = false;
      } else {
        if (this.numberOfViews !== null) {
          // if (roomData.value.publicChkBoxValue == true) {
          //     this.FormDataComponent.Room.IsPublic = false;
          // } else {
          //     this.FormDataComponent.Room.IsPublic = true;
          // }

          //this.roomNameFlag = false;
          this.FormDataComponent.Room.UserId = Number(
            window.sessionStorage.getItem("userId")
          );
          this.FormDataComponent.Room.RoomName = this.roomName;
          this.FormDataComponent.Room.TotalViews = this.numberOfViews;
          /*This is commented because while room update api call it is not given, only added for add room*/
          /*this.FormDataComponent.Room.IsPublic = false;*/
          this.FormDataComponent.Room.EnablexAPI = false;
          this.FormDataComponent.Room.LRSProfileId = 0;
          this.FormDataComponent.Room.RoomName = this.roomName;
          if (this.selectedRoomValidity == 1) {
            // this.roomNameFlag = false;
            this.FormDataComponent.Room.IsAlwaysActive = true;
            this.FormDataComponent.Room.StartDate = null;
            this.FormDataComponent.Room.EndDate = null;
            this.roomNameFlag = true;
          } else {
            this.FormDataComponent.Room.IsAlwaysActive = false;

            let rangevalueFlag1;

            let rangevalueFlag2;
            if (this.roomRangeValue instanceof Array) {
              rangevalueFlag1 = this.isDateValid(this.roomRangeValue[0]);
              rangevalueFlag2 = this.isDateValid(this.roomRangeValue[1]);
            } else {
              rangevalueFlag1 = false;
              rangevalueFlag2 = false;
            }
            if (rangevalueFlag1 && rangevalueFlag2) {
            } else {
              this.showDateFlag = false;
              return false;
            }
            let d = new Date(this.roomRangeValue[0]);
            let n = d.getDate();
            let d1 = new Date(this.roomRangeValue[1]);
            let n1 = d1.getDate();
            this.FormDataComponent.Room.StartDate = this.roomRangeValue[0];
            this.FormDataComponent.Room.EndDate = this.roomRangeValue[1];
            this.roomNameFlag = true;
          }
          if (this.isEdit == true) {
            this.XapiSingleProfileData.UserId = this.FormDataComponent.Room.UserId;
            this.XapiSingleProfileData.RoomId = this.roomId;
            this.FormDataComponent.Room.EnablexAPI = this.xapiDropDownListFlag;
            this.FormDataComponent.Room.LRSProfileId = Number(
              this.lrsProfileId
            );

            if (this.xapiDropDownListFlag == true) {
              if (this.roomXapiCreateCall == true) {
                let url = "room/xapiprofile";
                this.ApiService.postData(
                  url,
                  this.XapiSingleProfileData
                ).subscribe(
                  (response:any) => {
                    this.FormDataComponent.Room.LRSProfileId = Number(
                      response["InsertedId"]
                    );
                    let urlRoomUpdate =
                      "room/updateRoom/" + this.customizeRoomData.Id;
                    this.ApiService.putData(
                      urlRoomUpdate,
                      this.FormDataComponent.Room
                    ).subscribe(
                      (response) => {
                        // this.popToast("success", "Room updated successfully.");
                        this.toastrService.success("Room updated successfully.");
                        this.getRoomData();
                        this.getXapiProfileData();
                        this.modalRef.hide();
                      },
                      (error) => {
                        // this.popToast("error", error.message);
                        this.toastrService.error(error.message);
                        this.modalRef.hide();
                      }
                    );
                  },
                  (error) => {
                    // this.popToast("error", "Failed To update room.");
                    this.toastrService.error("Failed To update room.");
                    this.modalRef.hide();
                  }
                );
              } else {
                let url =
                  "room/xapiprofile/" +
                  Number(this.FormDataComponent.Room.LRSProfileId);
                this.ApiService.putData(
                  url,
                  this.XapiSingleProfileData
                ).subscribe(
                  (response) => {
                    let urlRoomUpdate =
                      "room/updateRoom/" + this.customizeRoomData.Id;
                    this.ApiService.putData(
                      urlRoomUpdate,
                      this.FormDataComponent.Room
                    ).subscribe(
                      (response) => {
                        // this.popToast("success", "Room updated successfully.");
                        this.toastrService.success("Room updated successfully.");
                        this.getRoomData();
                        this.getXapiProfileData();
                        this.modalRef.hide();
                      },
                      (error) => {
                        // this.popToast("error", "Failed To update room.");
                        this.toastrService.error("Failed To update room.");
                        this.modalRef.hide();
                      }
                    );
                  },
                  (error) => {
                    // this.popToast("error", "Failed To update room.");
                    this.toastrService.error("Failed To update room.");
                    this.modalRef.hide();
                  }
                );
              }
            } else {
              this.FormDataComponent.Room.LRSProfileId = 0;
              let url = "room/updateRoom/" + this.customizeRoomData.Id;
              this.ApiService.putData(
                url,
                this.FormDataComponent.Room
              ).subscribe(
                (response) => {
                  this.getRoomData();
                  this.getXapiProfileData();
                  this.modalRef.hide();

                  // this.popToast("success", "Room updated successfully.");
                  this.toastrService.success("Room updated successfully.");
                },
                (error) => {
                  // this.popToast("error", error.error.message);
                  this.toastrService.error(error.error.message);
                }
              );
            }
            $("body").removeClass("modal-open");
          } else if (this.isAdd == true) {
            this.FormDataComponent.Room.EnablexAPI = this.xapiDropDownListFlag;
            //  this.FormDataComponent.Room.IsPublic = false;

            let url = "room/create";
            this.ApiService.postData(
              url,
              this.FormDataComponent.Room
            ).subscribe(
              (response:any) => {
                /*XAPI profile change*/
                if (response["status"]) {
                  if (
                    this.xapiDropDownListFlag == true &&
                    response["RoomId"] != null
                  ) {
                    this.XapiSingleProfileData.UserId = this.FormDataComponent.Room.UserId;
                    this.XapiSingleProfileData.RoomId = response["RoomId"];
                    this.FormDataComponent.Room.EnablexAPI = this.xapiDropDownListFlag;
                    this.FormDataComponent.Room.LRSProfileId = Number(
                      this.lrsProfileId
                    );
                    if (this.roomXapiCreateCall == true) {
                      let url = "room/xapiprofile";
                      this.ApiService.postData(
                        url,
                        this.XapiSingleProfileData
                      ).subscribe(
                        (response:any) => {
                          this.FormDataComponent.Room.LRSProfileId = Number(
                            response["InsertedId"]
                          );
                          let urlRoomUpdate =
                            "room/updateXAPIProfile/" +
                            this.XapiSingleProfileData.RoomId;
                          this.ApiService.putData(
                            urlRoomUpdate,
                            this.FormDataComponent.Room
                          ).subscribe(
                            (response) => {
                              // this.popToast(
                              //   "success",
                              //   "Voila! Your Room is now ready."
                              // );
                              this.toastrService.success("Voila! Your Room is now ready.");
                              this.getRoomData();
                              this.getXapiProfileData();
                              //roomData.reset();
                              this.selectedRoomValidity = 1;
                              this.isPrivatechkboxValue = false;
                              this.roomRangeValue = null;
                              this.modalRef.hide();
                            },
                            (error) => {
                              // this.popToast(
                              //   "error",
                              //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
                              // );
                              this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
                              this.modalRef.hide();
                            }
                          );
                        },
                        (error) => {
                          // this.popToast(
                          //   "error",
                          //   "Woooops! Looks like something is not right in here. Can you try doing that again? "
                          // );
                          this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
                          this.modalRef.hide();
                        }
                      );
                    } else {
                      let url =
                        "room/xapiprofile/" +
                        Number(this.FormDataComponent.Room.LRSProfileId);
                      this.ApiService.putData(
                        url,
                        this.XapiSingleProfileData
                      ).subscribe(
                        (response) => {
                          let urlRoomUpdate =
                            "room/updateXAPIProfile/" +
                            this.XapiSingleProfileData.RoomId;
                          this.ApiService.putData(
                            urlRoomUpdate,
                            this.FormDataComponent.Room
                          ).subscribe(
                            (response) => {
                              // this.popToast(
                              //   "success",
                              //   "Voila! Your Room is now ready."
                              // );
                              this.toastrService.success("Voila! Your Room is now ready.");
                              this.getRoomData();
                              this.getXapiProfileData();
                              this.modalRef.hide();
                            },
                            (error) => {
                              // this.popToast(
                              //   "error",
                              //   "Woooops! Looks like something is not right in here. Can you try doing that again? "
                              // );
                              this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
                              this.modalRef.hide();
                            }
                          );
                        },
                        (error) => {
                          // this.popToast(
                          //   "error",
                          //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
                          // );
                          this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
                          this.modalRef.hide();
                        }
                      );
                    }
                  } else {
                    // this.popToast("success", "Voila! Your Room is now ready.");
                    this.toastrService.success("Voila! Your Room is now ready.");
                    this.getRoomData();
                  }

                  this.roomNameFlag = false;
                  roomData.reset();
                  this.selectedRoomValidity = 1;
                  this.isDatePickerVisible = false;
                  this.FormDataComponent.Room.IsPublic = false;
                  this.newlyAddedRoom.push(response["RoomId"]);
                } else {
                  // this.popToast(
                  //   "error",
                  //   "Woooops! Room with the same name already exists."
                  // );
                  this.toastrService.error("Woooops! Room with the same name already exists.");
                  this.modalRef.hide();
                }
              },
              (error) => {
                // this.popToast(
                //   "error",
                //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
                // );
                this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
              }
            );
            if (this.addNewRoomFlag == "Room") {
              $("body").removeClass("modal-open");
            }
            this.modalRef.hide();
            // this.getRoomData();
            //this.setRoomMapping();
          }
          // New If End
          this.getUserPlan();
        } else {
          this.roomNameFlag = false;
        }
      }
    }
  }

  addPatron(index:any) {
    console.log(
      "count",
      this.tableData1Length + "count" + this.patronsAdd.length
    );
    console.log("count1", this.userPlan.planData[0].TotalPatron);
    if (
      this.tableData1Length + this.patronsAdd.length <
      this.userPlan.planData[0].TotalPatron
    ) {
      this.patronsAdd.push(this.tableData2[index].PatronId);
      this.tableData2[index].added = true;
    } else {
      // this.popToast("error", "Too small room have yet another Patron.");
      this.toastrService.error("Too small room have yet another Patron.");
    }
  }

  removePatron(i:any) {
    this.tableData2[i].added = false;
    this.patronsAdd.splice(i, 1);
  }

  submitAddPatron() {
    if (this.patronsAdd.length > 0) {
      const data = {
        RoomId: this.RoomIdPatron,
        UserId: this.UserId,
        PatronId: this.patronsAdd,
        PublishedCode: this.RoomPublishCodePatron,
        url: this.mailUrl,
      };
      this.ApiService.postData("user/patronroom", data).subscribe(
        (apiresults) => {
          this.patronsAdd = [];
          this.ApiService.getData(
            "user/patronroom/" + this.UserId + "/" + this.RoomIdPatron
          );
          // this.popToast("success", "Taadaa! Your new Patron is now ready!");
          this.toastrService.success("Taadaa! Your new Patron is now ready!");
          this.getNonExistingPatrons();
        },
        (err) => {
          this.patronsAdd = [];
          // this.popToast(
          //   "error",
          //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
          // );
          this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
        }
      );
    }
    this.modalRef.hide();
  }

  deleteAddPatron(index:any) {
    this.patronsDelete.push(this.tableData1[index].PatronId);
    // this.patronsDelete = this.tableData1[index].PattronId;

    this.tableData1[index].added = true;
  }

  deletePatron(i:any) {
    this.tableData1[i].added = false;
    this.patronsDelete.pop();
    this.patronsDelete.splice(i, 1);
  }

  submitDeletePatron() {
    if (this.patronsDelete.length > 0) {
      const data = {
        RoomId: this.RoomIdPatron,
        UserId: this.UserId,
        PatronId: this.patronsDelete,
      };

      this.ApiService.putData("user/patronroom", data).subscribe(
        (apiresults) => {
          // this.popToast(
          //   "success",
          //   "Done! That Patron registration has been taken care of!"
          // );
          this.toastrService.success("Done! That Patron registration has been taken care of!");
          this.patronsDelete = [];
          this.getExistingPatrons();
          this.modalRef.hide();
        },
        (err) => {
          this.patronsDelete = [];
          // this.popToast(
          //   "error",
          //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
          // );
          this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
        }
      );
    }
    if ($("modal-container").length > 1) {
      $("body").removeClass("modal-open");
      $("modal-container").remove();
      $("bs-modal-backdrop").remove();
    }
    this.modalRef.hide();
  }

  getExistingPatrons() {
    this.spinnerService.show();
    this.tableData1 = [];
    this.ApiService.getData(
      "user/addedPatronRoom/" + this.UserId + "/" + this.RoomIdPatron
    ).subscribe(
      (apiresults) => {
        this.tableData1 = apiresults;
        this.tableData1 = this.tableData1.data;
        this.tableData1Length = this.tableData1.length;
        this.spinnerService.hide();
      },
      (err) => {
        this.tableData1Length = 0;
      }
    );
  }

  getNonExistingPatrons() {
    this.tableData2 = [];
    this.ApiService.getData(
      "user/patronroom/" + this.UserId + "/" + this.RoomIdPatron
    ).subscribe(
      (apiresults) => {
        this.tableData2 = apiresults;
        this.tableData2 = this.tableData2.data;
        this.tableData2Length = this.tableData2.length;
      },
      (err) => {
        this.tableData2Length = 0;
      }
    );
  }

  addRoomExperienceMapping(template: TemplateRef<any>, expId: number) {
    this.modalReference.hide();
    const roomIDValue = this.roomIDValue;
    const expIdValue = expId;
    const UID = this.UserId;
    let flag = false;
    let newflag = false;
    let removeArray = [];
    let newArray = [];

    for (let i = 0; i < this.getOldRoomsArray.length; i++) {
      for (let j = 0; j < this.getroomsArray.length; j++) {
        if (this.getOldRoomsArray[i] == this.getroomsArray[j]) {
          flag = true;
          break;
        } else {
          flag = false;
        }
      }
      if (flag == false) {
        if (removeArray.indexOf(this.getOldRoomsArray[i]) == -1)
          removeArray.push(this.getOldRoomsArray[i]);
      }
    }

    for (let k = 0; k < this.getroomsArray.length; k++) {
      for (let m = 0; m < this.getOldRoomsArray.length; m++) {
        if (this.getroomsArray[k] == this.getOldRoomsArray[m]) {
          newflag = true;
          break;
        } else {
          newflag = false;
        }
      }
      if (newflag == false) {
        if (newArray.indexOf(this.getroomsArray[k]) == -1)
          newArray.push(this.getroomsArray[k]);
      }
    }

    if (newArray.length > 0 || removeArray.length > 0) {
      const data = {
        ExperienceID: expId,
        UserId: UID,
        RoomIds: this.getroomsArray,
        RoomIdsNew: newArray,
        RoomIdsRemove: removeArray,
      };

      this.ApiService.postData(
        "room/publishedExperienceRoomMapping",
        data
      ).subscribe(
        (dataApiRoomMap:any) => {
          this.RoomExpMapping = dataApiRoomMap["data"];
          // this.popToast(
          //   "success",
          //   "Grab some popcorn now! The room is now showing your Experizer Experience."
          // );
          this.toastrService.success("Grab some popcorn now! The room is now showing your Experizer Experience.");
        },
        (err) => {
          // this.popToast(
          //   "error",
          //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
          // );
          this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
        }
      );
    }
    this.modalReference.hide();
    // $('body').removeClass('modal-open');
    // $('modal-container').remove();
    // $('bs-modal-backdrop').remove();
  }

  updateSelectedAllMailInvites(e:any) {
    // this.getSendMailInvitesArray = [];
    if (e.target.checked === true) {
      for (let i = 0; i < this.sendMailInvite.length; i++) {
        this.sendMailInvite[i].selected = true;
        const id = this.sendMailInvite[i].PatronId;
        this.getSendMailInvitesArray.push(id);
      }
      this.selectedAllMailInvites = true;
      $(".next").removeClass("hidden");
    } else {
      for (let i = 0; i < this.sendMailInvite.length; i++) {
        this.sendMailInvite[i].selected = false;
        this.getSendMailInvitesArray.pop();
      }
      $(".next").addClass("hidden");
      this.selectedAllMailInvites = false;
    }
  }

  updateSelectedElementMailInvites(e:any) {
    if (e.target.checked === true) {
      if (this.getSendMailInvitesArray.length <= 4) {
        const id = e.target.id;
        this.getSendMailInvitesArray.push(+id);
        $(".next").removeClass("hidden");
      } else {
        // this.popToast("error", "Please select 5 patrons only.");
        this.toastrService.error("Please select 5 patrons only.");
        e.target.checked = false;
      }
    } else {
      const id = e.target.id;
      const index = this.getSendMailInvitesArray.indexOf(+id);
      this.getSendMailInvitesArray.splice(index, 1);

      if (this.getSendMailInvitesArray.length == 0) {
        $(".next").addClass("hidden");
      }
    }
    if (this.getSendMailInvitesArray.length !== this.sendMailInvite.length) {
      this.selectedAllMailInvites = false;
    } else {
      this.selectedAllMailInvites = true;
    }
  }

  SendMailInviteToPatrons() {
    const inviteCount = this.getSendMailInvitesArray.length;
    console.log("this.getSendMailInvitesArray", this.getSendMailInvitesArray);
    if (inviteCount > 0) {
      const data = {
        RoomId: this.roomInviteIdd,
        UserId: this.UserId,
        PatronId: this.getSendMailInvitesArray,
        PublishedCode: this.invitedPublishCode,
        // PublishedCode: this.RoomPublishCodePatron,
        url: this.mailUrl,
        isSendInvitation: true,
      };
      this.ApiService.postData("user/patronroom", data).subscribe(
        (apiresults) => {
          this.patronsAdd = [];
          this.ApiService.getData(
            "user/patronroom/" + this.UserId + "/" + this.RoomIdPatron
          );
          // this.popToast(
          //   "success",
          //   "Shoooop! Patron has been sent a sweet invitation as per your request."
          // );
          this.toastrService.success("Shoooop! Patron has been sent a sweet invitation as per your request.");
          this.getNonExistingPatrons();
          this.getSendMailInvitesArray = [];
          this.modalRef.hide();
        },
        (err) => {
          // this.popToast(
          //   "error",
          //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
          // );
          this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");

          this.modalRef.hide();
        }
      );
    } else {
      // this.popToast("error", "Please select the patrons.");
      this.toastrService.error("Please select the patrons.");
    }

    // Uncomment this when slider is unable
    // if (inviteCount > 0) {

    //   const data = {
    //     RoomId: this.roomInviteIdd,
    //     UserId: this.UserId,
    //     PatronId: this.getSendMailInvitesArray,
    //     PublishedCode: this.invitedPublishCode,
    //     // PublishedCode: this.RoomPublishCodePatron,
    //     url:this.mailUrl
    //   };
    //   const sendMailInvite = this.ApiService.postData('user/sendinvite', data);
    //   sendMailInvite.subscribe(dataApiInviteMail => {
    //     this.sendMailInvite = dataApiInviteMail['data'];
    //     this.getSendMailInvitesArray = [];
    //     //this.popToast('success', 'Shoooop! Patron has been sent a sweet invitation as per your request.');
      // this.toastrService.success('Shoooop! Patron has been sent a sweet invitation as per your request.');
    //     this.modalRef.hide();
    //   },
    //     (err) => {
    //       //this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
      //this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
    //       this.modalRef.hide();
    //     });
    // } else {

    //   //this.popToast('error', 'Please select the patrons.');
    // this.toastrService.error('Please select the patrons.');
    // }
  }

  goToReport(
    template: TemplateRef<any>,
    reportRoomIdd: number,
    reportRoomName: string
  ) {
    this.reportModalRoomId = reportRoomIdd;
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
    this.ReportRoomName = reportRoomName;
  }

  xapiListShow(e:any) {
    if (e.target.checked == true) {
      this.enablexAPI = true;
      this.xapiDropDownListFlag = true;
      if (this.isAdd === true) {
        this.lrsRoomProfileId = 0;
      }
      if (
        this.lrsRoomProfileId != 0 &&
        this.lrsRoomProfileId != undefined &&
        this.lrsRoomProfileId != null
      ) {
        this.lrsProfileId = this.lrsRoomProfileId;
        for (let i = 0; i < this.xapiProfileData.length; i++) {
          if (this.lrsRoomProfileId == this.xapiProfileData[i]["Id"]) {
            this.XapiSingleProfileData.ProfileName = this.xapiProfileData[i][
              "ProfileName"
            ];
            this.XapiSingleProfileData.EndPointUrl = this.xapiProfileData[i][
              "EndPointUrl"
            ];
            this.XapiSingleProfileData.AuthUserKey = this.xapiProfileData[i][
              "AuthUserKey"
            ];
            this.XapiSingleProfileData.AuthSecretKey = this.xapiProfileData[i][
              "AuthSecretKey"
            ];
          }
        }
      }

      if (this.lrsProfileId != 0 && this.lrsProfileId != null) {
        this.xapiSingleProfileFlag = true;
      } else {
        this.lrsProfileId = undefined;
      }
      this.getXapiProfileData();
    } else {
      // this.enablexAPI = true;

      this.enablexAPI = false;
      this.xapiDropDownListFlag = false;
      this.xapiSingleProfileFlag = false;
      this.lrsProfileId = null;
    }
  }

  downloadCSV() {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      useBom: true,
      noDownload: true,
      headers: [
        "ExperienceName",
        "ExperienceStatus",
        "ExperienceCreatedDate",
        "ExperienceLastModified",
      ],
    };

    new AngularCsv(
      this.RoomVerboseData.data,
      "Experizer_" + this.ReportRoomName
    );
  }

  downloadPDF() {
    const img = new Image();
    img.crossOrigin = "";
    const classOBJ:any = this;
    img.onload = function () {
      const canvasEl: HTMLCanvasElement = classOBJ.canvas.nativeElement;
      canvasEl.height = img.height;
      canvasEl.width = img.width;
      classOBJ.cx = canvasEl.getContext("2d");
      classOBJ.cx.fillStyle = "#ffffff";
      classOBJ.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
      classOBJ.cx.drawImage(img, 0, 0);
      classOBJ.imgData = canvasEl.toDataURL();
      const col = [
        "Experience Name",
        "Experience Status",
        "Experience Created Date",
        "Experience Last Modified",
      ];
      const rows:any = [];

      classOBJ.RoomVerboseData.data.forEach((element:any) => {
        if (element.ExperienceStatus === 2) {
          element.ExperienceStatus = "Inactive";
        } else {
          element.ExperienceStatus = "Active";
        }
        const expCDate = new Date(element.ExperienceCreatedDate)
          .toISOString()
          .slice(0, 10);
        const expMDate = new Date(element.ExperienceCreatedDate)
          .toISOString()
          .slice(0, 10);
        element.ExperienceCreatedDate = expCDate;
        element.ExperienceLastModified = expMDate;
        const temp = [
          element.ExperienceName,
          element.ExperienceStatus,
          element.ExperienceCreatedDate,
          element.ExperienceLastModified,
        ];
        rows.push(temp);
      });
      const doc = new jsPDF("landscape");
      doc.addImage(classOBJ.imgData, "png", 10, 10, 100, 24);
      doc.setFontSize(20);
      doc.line(10, 32, 283, 32);
      doc.setTextColor(233, 120, 91);
      doc.autoTable(col, rows, {
        theme: "grid",
        margin: {
          top: 40,
        },
        styles: {
          overflow: "linebreak",
          cellWidth: "wrap",
        },
      });
      doc.save("Experizer_" + classOBJ.ReportRoomName + ".pdf");
    };
    img.src = "assets/images/dashboard/pdf/experizerlogo_335.png";
  }

  handleChange(event:any) {
    const value = event;
    this.radioValue = value;
  }

  getRoomNameOnRoomIDReportDownload() {
    let ReportData;
    const RoomVerbose = this.ApiService.getData(
      "analytics/room/" + this.reportModalRoomId
    );
    RoomVerbose.subscribe(
      (data) => {
        this.RoomVerboseData = data;
        ReportData = data;
        if (this.radioValue === "PDF") {
          this.downloadPDF();
        } else {
          this.downloadCSV();
        }
      },
      (error) => {}
    );
    this.modalRef.hide();
  }

  onChangeXapiProfile(e:any) {
    this.xapiSingleProfileFlag = true;
    this.roomNameFlag = true;
    if (e.target.selectedOptions["0"].value == 0) {
      this.roomXapiCreateCall = true;
      this.XapiSingleProfileData.ProfileName = null;
      this.XapiSingleProfileData.EndPointUrl = null;
      this.XapiSingleProfileData.AuthUserKey = null;
      this.XapiSingleProfileData.AuthSecretKey = null;
    } else {
      this.lrsProfileId = e.target.selectedOptions["0"].value;
      this.roomXapiCreateCall = false;
      for (let i = 0; i < this.xapiProfileData.length; i++) {
        if (
          e.target.selectedOptions["0"].value == this.xapiProfileData[i]["Id"]
        ) {
          this.XapiSingleProfileData.ProfileName = this.xapiProfileData[i][
            "ProfileName"
          ];
          this.XapiSingleProfileData.EndPointUrl = this.xapiProfileData[i][
            "EndPointUrl"
          ];
          this.XapiSingleProfileData.AuthUserKey = this.xapiProfileData[i][
            "AuthUserKey"
          ];
          this.XapiSingleProfileData.AuthSecretKey = this.xapiProfileData[i][
            "AuthSecretKey"
          ];
        }
      }
    }
  }

  /*selectedXapiProfile(profileId) {
      if (profileId == this.lrsProfileId) {
        return true;
      }
    }*/

  getXapiProfileData() {
    const userId = window.sessionStorage.getItem("userId");
    const profileData = this.ApiService.getData("room/xapiprofile/" + userId);
    profileData.subscribe(
      (data:any) => {
        this.xapiProfileData = data["data"];
      },
      (error) => {}
    );
  }
  closeShareModelpopup(template: TemplateRef<any>) {
    this.modalRef.hide();
    $("body").removeClass("modal-open");
    $("modal-container").removeClass("show");
    $("bs-modal-backdrop").removeClass("show");
  }

  closeCreateExperiencePopup(experienceData:any) {
    experienceData.reset();
    this.modalRef.hide();
  }

  extraTemplate() {
    window.location.href = "mailto:care@experizer.com";
  }

  chkIsPublic(e:any) {
    if (e.target.checked == true) {
      if (this.userPlan.planData[0].RemainingPrivateRoom > 0) {
        this.FormDataComponent.Room.IsPublic = false;
      } else {
        this.FormDataComponent.Room.IsPublic = true;
        e.target.checked = false;
        // this.popToast(
        //   "error",
        //   "Oops! Looks like your account is out of Private Rooms."
        // );
        this.toastrService.error("Oops! Looks like your account is out of Private Rooms.");
      }

      //  this.isPrivatechkboxValue = true;
    } else {
      this.FormDataComponent.Room.IsPublic = true;
      // this.isPrivatechkboxValue = false;
    }
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  /*Redirect to room report page*/
  goToRoomReport(roomInfo:any) {
    this.router.navigateByUrl(
      "/roomreport/" + roomInfo["Id"] + "/" + roomInfo["RoomName"]
    );
  }

  goToPreview(id:any, path:any) {
    window.open(
      this.ApiService.getExperienceBaseUrl() +
        "" +
        path +
        "/preview.html?e=" +
        id,
      "_blank",
      "type=fullWindow, fullscreen, location=no"
    );
  }

  // playSound(){
  //  // alert("In playsound");
  //  // console.log("In playsound");
  //   let audio = new Audio();
  //   audio.src = this.AudioSrc
  //   audio.play();
  // }
  goToEditName(
    template: TemplateRef<any>,
    expId:any,
    expTempName:any,
    expName:any,
    expTempId:any
  ) {
    console.log("In editname", expId, expTempName, expName);
    this.orignalExpName = expName;
    this.changeNameData = {
      ExperienceId: expId,
      ExperienceTemplateId: expTempId,
      IsSampleExperience: false,
      UserId: parseInt(window.sessionStorage.getItem("userId")||'{}'),
    };
    this.changeNameForm = new FormGroup({
      ExperienceName: new FormControl(expName, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9:_@!&? -]*$"),
        Validators.maxLength(100),
      ]),
    });
    this.modalRef = this.modalService.show(template, {
      class: "modal-content-radius",
    });
  }
  onSaveNameSubmit() {
    this.submitted = true;

    this.changeNameForm.value.ExperienceName = this.changeNameForm.value.ExperienceName.trim();
    if (this.changeNameForm.value.ExperienceName == "") {
      this.changeNameForm.controls["ExperienceName"].setErrors({
        required: true,
      });
      this.changeNameForm = new FormGroup({
        ExperienceName: new FormControl(
          this.changeNameForm.value.ExperienceName,
          [Validators.required, Validators.pattern("^[a-zA-Z0-9:_@!&? -]*$")]
        ),
      });
    }
    // stop here if form is invalid
    if (this.changeNameForm.invalid) {
      return;
    } else {
      let urlChkDuplicate = "experience/checkExperienceName";

      if (
        this.changeNameForm.value.ExperienceName.indexOf("/") > -1 ||
        this.changeNameForm.value.ExperienceName.indexOf("\\") > -1
      ) {
        // this.popToast("error", "Special character '/' or '\\' is not allowed.");
        this.toastrService.error("Special character '/' or '\\' is not allowed.");
      } else {
        this.changeNameData.ExperienceName = this.changeNameForm.value.ExperienceName;
        if (this.changeNameData.ExperienceName == this.orignalExpName) {
          this.modalRef.hide();
          // this.popToast("success", "Experience name changed successfully.");
          this.toastrService.success("Experience name changed successfully.");
        } else {
          this.ApiService.postData(
            urlChkDuplicate,
            this.changeNameData
          ).subscribe(
            (response:any) => {
              if (response["status"] === true) {
                // this.popToast("error", "Experience name already exists.");
                this.toastrService.error("Experience name already exists.");
              } else {
                let data = {
                  ExperienceName: this.changeNameData.ExperienceName,
                  UserId: parseInt(window.sessionStorage.getItem("userId")||'{}'),
                };
                // //this.popToast('success','Create new experience.');
                // this.toastrService.success('Create new experience.');
                this.ApiService.putData(
                  "experience/renameExperience/" +
                    this.changeNameData.ExperienceId,
                  data
                ).subscribe(
                  (response) => {
                    this.modalRef.hide();
                    this.onTabClicked(1);
                    // this.popToast(
                    //   "success",
                    //   "Experience name changed successfully."
                    // );
                    this.toastrService.success("Experience name changed successfully.");
                  },
                  (error) => {
                    // this.popToast(
                    //   "error",
                    //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
                    this.createExpFlag = true;
                  }
                );
                this.modalRef.hide();
              }
            },
            (error) => {
              // console.log("Inside error log");
              // this.popToast(
              //   "error",
              //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
              // );
              this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
            }
          );
        }
      }
    }
  }

  clearExperienceInputFields() {
    this.modalTemplateName = "";
  }

  getUserPlan() {
    this.spinnerService.show();
    const url = "subscription/getPlanDetailByUserId/" + this.UserId;
    this.ApiService.getData(url).subscribe(
      (apiresults) => {
        this.userPlan = apiresults;
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
        // this.popToast(
        //   "error",
        //   "Woooops! Looks like something is not right in here. Can you try doing that again?"
        // );
        this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?");
      }
    );
  }

  /*
  getFirstTimeUserLoginData() {
    const url = "user/getFirstTimeUserLoginData";
    let data = {
      emailId: this.Email,
    };

    this.ApiService.postData(url, data).subscribe(
      (response) => {
        this.firstTimeUserLoginData = response["data"];
        if (this.firstTimeUserLoginData.length > 0) {
          this.firstTimeUserLoginData.forEach((element) => {
            if (element.firstLogin == 1) {
              this.showArrow = false;
            }
          });
        } else if (this.firstTimeUserLoginData.length == 0) {
          this.showArrow = true;
        }
      },
      (error) => {}
    );
  }

  addFirstTimeUserInfo() {
    const url = "user/addFirstTimeUserLoginData";
    let data = {
      emailId: this.Email,
      firstLoginFlag: true,
    };

    this.ApiService.postData(url, data).subscribe(
      (response) => {
        this.showArrow = false;
      },
      (error) => {}
    );
  }*/

  scrollToTop() {
    $(".dashboard-second-header").slideUp();
    $(".slide-down-icon").removeClass("hidden");
    $(".slide-up-icon").addClass("hidden");
    $(".dashboard-second-header").addClass("slideup");
    let el:any = document.getElementById("experience-div");
    el.scrollIntoView();
  }
  checkForCategoryDropdownHideEvent() {
    if ($("#sidebar").hasClass("shrinked")) {
      $("#shrinked-category-dropdown").removeClass("category-dropdown");
    } else {
    }
  }
}
