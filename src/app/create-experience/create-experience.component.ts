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
import { Component,OnInit,Input,ElementRef,Renderer2,NgModule,ViewChild,AfterViewInit,TemplateRef,ChangeDetectorRef,Inject,OnDestroy,HostListener} from '@angular/core';
import { DOCUMENT,Location} from '@angular/common';
import { DomSanitizer} from '@angular/platform-browser';
import { BsModalService,ModalDirective} from 'ngx-bootstrap/modal';
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ApiService } from '../services/api.service';
import { NavbarService } from '../services/navbar.service';
import { ToasterService,ToasterConfig} from 'angular2-toaster';
import { AssetsManagementComponent } from '../assets-management/assets-management.component';
import { HttpResponse,HttpEventType} from '@angular/common/http';
import { ActivatedRoute, Event,Router,NavigationStart,RoutesRecognized,RouteConfigLoadStart,RouteConfigLoadEnd,NavigationEnd,NavigationCancel,NavigationError} from '@angular/router';
import { FormDataComponent } from './../data-model/formData.component';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from '../app.component';
import { filter } from 'rxjs/operators';
import {FileSystemFileEntry,FileSystemDirectoryEntry, NgxFileDropEntry } from 'ngx-file-drop';
import 'blueimp-canvas-to-blob/js/canvas-to-blob.min.js';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
declare var $: any;


@Component({
    selector: 'app-create-experience',
    templateUrl: './create-experience.component.html',
    styleUrls: ['./create-experience.component.css'],
})


export class CreateExperienceComponent implements OnInit, OnDestroy {
    experienceTitleLength!: number;
    // @ViewChild(ModalDirective) assetsPopup: ModalDirective;
    //   @ViewChild(ModalDirective) alertCreateExpPopup: ModalDirective;
    @ViewChild('assetsPopup') public assetPopup!: ModalDirective;
    @ViewChild('id_description_iframe') modelPreview!: ElementRef;
    @ViewChild('threeAssetPopup') public threeAssetPopup!: ModalDirective;
    @ViewChild('canvas') public canvas!: ElementRef;
    @ViewChild('uploadAssetsInput') public uploadAssetsInput!: ElementRef;
    isCustomizationLoaded:boolean=false;
    isPreviewLoaded:any=false;
    changeNameForm!: FormGroup;
    sidePaddingCheck!: boolean;
    submitted: boolean = false;
    changeNameData: any;
    topPaddingCheck!: boolean;
    uploadingFileEXP: boolean;
    templateTitle!: string;
    experienceTitle!: string;
    iframeURL!: string;
    showEditButton: boolean = true;
    modelPreviewUrl: any;
    width60: any;
    modelSelected: boolean = true;
    fileIndex!: number;
    experienceId!: number;
    experienceTemplateId!: number;
    experienceMeta: any;
    userId: any;
    modalRef!: BsModalRef;
    nextClickFlag: boolean = false;
    experienceCustomizerURL: any;
    experienceJSON: any;
    iframeElement: any;
    iframeElement1: any;
    modifiedExperienceJSON: any;
    previewExperienceJSON: any;
    newExperienceName!: string;
    fileName: any;
    assetsId!: number;
    isCustomization: boolean = false;
    isPreview: any = false;
    assetsData: any[] = [];
    assetsDataCommon: any[] = [];
    typeAsset:any;
    isSperical!: boolean;
    imageChangedEvent: any = '';
    originalImage: any = '';
    sidePaddingImage: any = '';
    topPaddingImage: any = '';
    croppedImage: any = '';
    viewToggle: boolean = false;
    baseURL = this.apiService.apiBaseUrl;
    parentFolder: any;
    ThreeDParentFolder :any;
    newFolderNameModel: string;
    addNewFolderFlag!: boolean;
    inputFileClick: boolean;
    totalFiles!: number;
    ThumbnailPath: string;
    public files:any = [];
    private toasterService: ToasterService;
    private assetsManagement!: AssetsManagementComponent;
    breadcrumArryPopup: any[] = [];
    breadcrumArryPopupCommon: any[] = [];
    assetsSrc: any = '';
    objSrc!: string;
    mtlSrc!: string;
    gltfSrc!: string;
    viewData: any;
    parentFolderName!: string;
    savedExperienceJson: any;
    confirmationToSave: boolean = false;
    todayNumber!: number;
    model:any;
    modelScale:any;
    modelRotation:any;
    public toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center',
        animation: 'fade',
        showCloseButton: true,
        timeout: 2000
    });
    FormDataComponent: FormDataComponent;
    modalRef2!: BsModalRef;
    navigationSubscription;
    nextURL!: string;
    AudioSrc: any;
    changeExperienceNameFlag!: boolean;
    userAsset:boolean=true;
    userAssetId:boolean=true;

    constructor(private sanitizer: DomSanitizer,
        private toastrService:ToastrService,
        private formBuilder: FormBuilder,
        private modalService: BsModalService,
        private apiService: ApiService,
        private elementRef: ElementRef,
        public nav: NavbarService,
        private renderer2: Renderer2,
        toasterService: ToasterService,
        private route: ActivatedRoute, private router: Router,
        private activatedRoute: ActivatedRoute,
        private spinnerService:NgxSpinnerService,
        private appComponent: AppComponent,
        private cdr: ChangeDetectorRef,
        @Inject(DOCUMENT) document:any) {
        (<any>window).triggerAssetsPopup = this.triggerAssetsPopup.bind(this);
        (<any>window).triggerThreeDAssetsPopup = this.triggerThreeDAssetsPopup.bind(this);
        (<any>window).mouseEnter = this.mouseEnter.bind(this);
        (<any>window).mouseLeave = this.mouseLeave.bind(this);
        this.experienceCustomizerURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.apiService.getExperienceBaseUrl());
        this.toasterService = toasterService;
        this.FormDataComponent = new FormDataComponent();
        this.newFolderNameModel = '';
        this.uploadingFileEXP = false;
        this.inputFileClick = false;
        this.ThumbnailPath = '';
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof RoutesRecognized) {
                if (this.isPreview == false && this.isCustomization == true) {
                    this.previewExperienceJSON = this.iframeElement.contentWindow.getExperienceToSave();
                }
                if ((this.previewExperienceJSON != this.savedExperienceJson) && (this.confirmationToSave == false)) {
                    this.apiService.isCustomizationEnd = false;
                } else {
                    this.apiService.isCustomizationEnd = true;
                }
            } else if (e instanceof NavigationCancel) {
                this.nextURL = e.url;
                this.initialiseInvites();
            }
        });
        this.AudioSrc = "assets/files/templateHover.mp3";
        let audio = new Audio();
        audio.load();
    }
    get change() { return this.changeNameForm.controls; }
    initialiseInvites() {
        //   var html = $("#confirmationSaveModalDiv").html();
        //   $("#confirmationSaveModal").remove();
        //   $(html).appendTo( $( "body" ) );
        $('#confirmationSaveModal').modal('show');
    }

    ngOnDestroy() {
        // avoid memory leaks here by cleaning up after ourselves. If we  
        // don't then we will continue to run our initialiseInvites()   
        // method on every navigationEnd event.
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.changeNameForm = this.formBuilder.group({
            ExperienceName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9:_@!&? -]*$')])

        });
        this.iframeElement = this.renderer2.selectRootElement('iframe');
        this.modelPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.apiService.getExperienceBaseUrl() + "v0.1/verbose/3DAssetLibrary/objectPreview.html");
        this.fileIndex = 0;
        this.assetsId = 0;
        this.addNewFolderFlag = true;
        this.changeExperienceNameFlag = true;
        this.width60 = '?w=60';
        this.userId = window.sessionStorage.getItem('userId');
        this.parentFolder = window.sessionStorage.getItem('ParentFolder');
        this.ThreeDParentFolder= window.sessionStorage.getItem('ParentFolder');
        const temp = {
            name: 'Home',
            url: this.parentFolder,
            index: 0
        };
        const temp1 = {
            name: 'Home',
            url: "images/assets/cy8w0648",
            index: 0
        };
        this.breadcrumArryPopup.push(temp);
        this.breadcrumArryPopupCommon.push(temp1);
        this.route.params.subscribe(params => {
            this.experienceId = params['experienceId'];
            this.templateTitle = params['templateName'];
            // this.experienceTitle = params['experienceName'];
            this.getExperienceData();
            this.appComponent.closeNav();
        });
        this.nav.show();
        $('.mainAssetPopup').remove();
        $('#assetPopup').appendTo('body');
        $('.mainThreeAssetPopup').remove();
        $('#threeAssetPopup').appendTo('body');
        this.spinnerService.show();
        this.getPopupThreeDAssetData();
        this.tableData=this.tableDataUser;
    }

    mouseEnter(div: any) {
        if (window.sessionStorage.getItem('needHelpFlag') === "true") {
            this.apiService.setHelpText(div);
            this.apiService.setHelpFlag(true);
        }
    }

    mouseLeave() {
        if (window.sessionStorage.getItem('needHelpFlag') === "true") {
            this.apiService.setHelpFlag(false);
            this.apiService.setHelpText("This guide is mouse pointer sensitive. Point at a page item to view its help.");
        }
    }

    redirectToNextPage(flag:any) {
        if (flag == 'save') {
            this.confirmationToSave = true;
            this.isCustomization = true;
            this.save();
        } else if (flag == 'cancel') {
            this.confirmationToSave = true;
            this.apiService.isCustomizationEnd = true;
            this.router.navigateByUrl(this.nextURL);
        }
    }

    authoring() {
        this.showEditButton = true;
        if (!this.isCustomization && this.isPreviewLoaded) {
            // this.spinnerService.show();
            
            this.isCustomization = true;
            this.isPreview = false;
            this.iframeElement.contentWindow.location.replace(
                this.apiService.getExperienceBaseUrl() + this.experienceMeta.ExperienceFolderPath + "/customization.html");
        } else return;
    }

    preview() {
        if (!this.isPreview && this.isCustomizationLoaded) {
            this.showEditButton = false;
            // this.spinnerService.show();
            this.previewExperienceJSON = this.iframeElement.contentWindow.getExperienceToSave();
            this.experienceJSON = this.previewExperienceJSON;
            this.isCustomization = false;
            this.isPreview = true;
            var jsonData = JSON.parse(this.experienceJSON);
            this.iframeElement.contentWindow.location.replace(this.apiService.getExperienceBaseUrl() + this.experienceMeta.ExperienceFolderPath + "/preview.html");
        } else return;
    }

    save() {
        if (this.isCustomization) {
            // Trigger save function from the loaded iframe.
            if (this.isPreview == true) {
                this.modifiedExperienceJSON = this.previewExperienceJSON;
            }
            else {
                this.modifiedExperienceJSON = this.iframeElement.contentWindow.getExperienceToSave();
            }
            this.updateExperience(this.modifiedExperienceJSON);
        } else return;
        this.screenShot();
    }
    screenShot() {
        var india = document.querySelector('iframe')?.contentDocument?.querySelector('a-scene');
        
        if (india != null || india != undefined) {
           // const cancass= document.querySelector('iframe')?.contentDocument?.querySelector('a-scene')['components'].screenshot.getCanvas('perspective');
           const cancass2:any= document.querySelector('iframe')?.contentDocument?.querySelector('a-scene');
           const cancass:any=cancass2.components.screenshot.getCanvas('perspective');
           const canWidth = cancass.width / 10;
            const canHeight = cancass.height / 10;
            const cvs:any = document.createElement('canvas');
            cvs.width = canWidth;
            cvs.height = canHeight;
            const img = new Image();
            const obj = this;
            img.src = cancass.toDataURL();
            img.onload = () => {
                const ctx = cvs.getContext('2d').drawImage(img, 0, 0, canWidth, canHeight);
                const file = obj.dataURLtoFile(cvs.toDataURL(), obj.experienceId + '.png');
                // console.log(file);
                const formdata: FormData = new FormData();
                formdata.append('Id', obj.experienceId.toString());
                formdata.append('file', file);
                formdata.append('filename', obj.experienceId + '.png');
                obj.apiService.uploadFile('asset/uploadExperienceThumbnailPath', formdata).subscribe(
                    data => {
                        // console.log(data);
                    },
                    error => {
                        // console.log(error);
                    }
                );
            };
        }
        // else{
        //     const cancass = document.querySelector('iframe').contentDocument.querySelector('#scene')['components'].screenshot.getCanvas('perspective');

        //     const canWidth = cancass.width / 10;
        //     const canHeight = cancass.height / 10;
        //     const cvs = document.createElement('canvas');
        //     cvs.width = canWidth;
        //     cvs.height = canHeight;
        //     const img = new Image();
        //     const obj = this;
        //     img.src = cancass.toDataURL();
        //     img.onload = () => {
        //         const ctx = cvs.getContext('2d').drawImage(img, 0, 0, canWidth, canHeight);
        //         const file = obj.dataURLtoFile(cvs.toDataURL(), obj.experienceId + '.png');
        //         // console.log(file);
        //         const formdata: FormData = new FormData();
        //         formdata.append('Id', obj.experienceId.toString());
        //         formdata.append('file', file);
        //         formdata.append('filename', obj.experienceId + '.png');
        //         obj.apiService.uploadFile('asset/uploadExperienceThumbnailPath', formdata).subscribe(
        //             data => {
        //                 // console.log(data);
        //             },
        //             error => {
        //                 // console.log(error);
        //             }
        //         );
        //     };
        // }
    }

    publishConfirmation(template: TemplateRef<any>) {
        if (this.isCustomization) {
            this.modalRef = this.modalService.show(template, {
                class: 'modal-content-radius'
            });
        }
    }
    newFolderPopup(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {
            class: 'modal-content-radius new-folder-popup-border'
        });
    }
    publish() {
        if (this.isCustomization) {
            // Trigger function from the loaded iframe to get the modified experience JSON.
            this.modifiedExperienceJSON = this.iframeElement.contentWindow.getExperienceToSave();
            this.saveBeforePublishExperience(this.modifiedExperienceJSON);
        } else return;
    }

    saveAs(template: TemplateRef<any>) {
        if (this.isCustomization) {
            // Open Save as modal pop-up
            this.modalRef = this.modalService.show(template, {
                class: 'modal-content-radius'
            });
        } else return;
    }

    experienceSaveAs(saveAsForm:any) {
        this.newExperienceName = saveAsForm.value.experienceName;

        if (this.newExperienceName === '' || this.newExperienceName === undefined || this.newExperienceName === null) {
            this.changeExperienceNameFlag = false;
            this.spinnerService.hide();
            return;
        }

        this.newExperienceName = this.newExperienceName.trim();
        if (this.newExperienceName == '') {
            saveAsForm.form.controls['experienceName'].setErrors({ 'required': true });
            this.changeExperienceNameFlag = false;
        }

        this.FormDataComponent.ExperienceSaveAs.ExperienceJSON = this.iframeElement.contentWindow.getExperienceToSave();
        this.FormDataComponent.ExperienceSaveAs.ThumbnailImagePath = this.ThumbnailPath;
        this.FormDataComponent.ExperienceSaveAs.ExperienceTemplateId = this.experienceTemplateId;
        this.FormDataComponent.ExperienceSaveAs.UserId = parseInt(window.sessionStorage.getItem('userId') || '');
        this.FormDataComponent.ExperienceSaveAs.IsSampleExperience = false;
        this.FormDataComponent.ExperienceSaveAs.ExperienceName = this.newExperienceName;

        let urlChkDuplicate = 'experience/checkExperienceName';
        if (saveAsForm.valid) {
            this.spinnerService.show();
            if (this.newExperienceName.indexOf('/') > -1 || this.newExperienceName.indexOf('\\') > -1) {
                this.toastrService.error( "Special character '/' or '\\' is not allowed.");
                this.spinnerService.hide();
                return;
            } else {
                this.apiService.postData(urlChkDuplicate, this.FormDataComponent.ExperienceSaveAs)
                    .subscribe(
                        (response:any) => {
                            if (response['status'] === true) {
                                this.toastrService.error('Experience name already exists.');
                                this.spinnerService.hide();
                            } else {

                                let url = 'experience/saveAsExperience';
                                this.apiService.postData(url, this.FormDataComponent.ExperienceSaveAs)
                                    .subscribe(
                                        response => {
                                            this.savedExperienceJson = this.FormDataComponent.ExperienceSaveAs.ExperienceJSON;
                                            this.changeExperienceNameFlag = true;
                                            this.spinnerService.hide();
                                            this.modalRef.hide();
                                            this.toastrService.success( 'Ziiiiinggg! You have a clone of your  "' + this.newExperienceName + '" Experience.');
                                            setTimeout(() => {
                                                this.router.navigateByUrl('/dashboard/myexperience');
                                            }, 2000);
                                        },
                                        error => {
                                            this.spinnerService.hide();
                                            this.modalRef.hide();
                                            this.changeExperienceNameFlag = true;
                                            //this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                                            this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                                        }
                                    );
                            }
                        },
                        error => {
                            this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                        }
                    );
            }
        }
    }

    help() {
        // Need to redirect to separate page where user guide is loaded for specific experiences
        this.router.navigateByUrl('/needhelp');
    }
    exitToStudio() {
        this.router.navigateByUrl('/dashboard');
    }


    getExperienceData() {
        this.apiService.isCustomizationEnd = false;
        this.spinnerService.show();
        const experienceData = this.apiService.getData('experience/getExperienceById/' + this.experienceId);
        experienceData.subscribe((data:any) => {
            this.experienceMeta = data['data']['0'];
            this.experienceTitle = this.experienceMeta.ExperienceName;
            this.experienceTitleLength = this.experienceTitle.length;
            this.experienceTemplateId = this.experienceMeta.ExperienceTemplateId;
            this.ThumbnailPath = this.experienceMeta.ThumbnailImagePath;
            this.experienceJSON = this.experienceMeta.ExperienceJSON;
            this.savedExperienceJson = this.experienceJSON;
            this.iframeElement.contentWindow.location.replace(
                this.apiService.getExperienceBaseUrl() + this.experienceMeta.ExperienceFolderPath + "/customization.html");
            this.spinnerService.hide();
            this.isCustomization = true;
            return this.experienceMeta;
        },
            error => {
                this.toastrService.error('Failed to retrieve experience data for "' + this.experienceTitle + '"');
                this.spinnerService.hide();
                console.error(error);
            });
    }

    passExperienceJSON(experienceJSON:any) {
        // check if user is in authering mode or preview mode before triggering iframe functions.
        if (this.isCustomization) {
            this.iframeElement.contentWindow.initializeCustomization(experienceJSON);
            this.spinnerService.hide();
            this.isCustomizationLoaded=true;
            this.isPreviewLoaded=false;
        } else if (this.isPreview) {
            this.iframeElement.contentWindow.initializePreview(experienceJSON, this.experienceTitle);
            this.spinnerService.hide();
            this.isCustomizationLoaded=false;
            this.isPreviewLoaded=true;
        }
    }

    updateExperience(modifiedJSON:any) {
        this.spinnerService.show();
        const updatedExperienceJSON = modifiedJSON;
        const dataToUpdate = {
            'ExperienceJSON': updatedExperienceJSON
        };
        const experienceUpdateData = this.apiService.putData('experience/updateExperience/' + this.experienceId, dataToUpdate);
        experienceUpdateData.subscribe(data => {
            this.spinnerService.hide();
            this.toastrService.success( 'Done! Your Experizer experience file has been saved successfully.');
            this.savedExperienceJson = updatedExperienceJSON;
            this.apiService.isCustomizationEnd = true;
            if (this.confirmationToSave == true) {
                this.router.navigateByUrl(this.nextURL);
            }
        },
            error => {
                this.spinnerService.hide();
                this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
                console.error(error);
            });
    }

    saveBeforePublishExperience(modifiedJSON:any) {
        this.spinnerService.show();
        this.screenShot();
        const updatedExperienceJSON = modifiedJSON;
        const dataToUpdate = {
            'ExperienceJSON': updatedExperienceJSON
        };
        const experienceUpdateData = this.apiService.putData('experience/updateExperience/' + this.experienceId, dataToUpdate);
        experienceUpdateData.subscribe(data => {
            this.savedExperienceJson = updatedExperienceJSON;
            this.spinnerService.hide();
            // this.popToast('success', 'Done! Your Experizer Experience file has been saved successfully.');
            this.toastrService.success( 'Done! Your Experizer Experience file has been saved successfully.');
            this.publishExperience();
        },
            error => {
                this.spinnerService.hide();
                // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                console.error(error);
            });
    }

    publishExperience() {
        this.spinnerService.show();
        const data = {};
        this.apiService.postData('experience/publishExperience/' + this.experienceId, data)
            .subscribe((apiresults) => {
                this.spinnerService.hide();
                this.modalRef.hide();
                // this.popToast('success', "Congratulation! Your Experience has been published successfully. Don't forget to add this to a room now (If you have not already).");
                this.toastrService.success("Congratulation! Your Experience has been published successfully. Don't forget to add this to a room now (If you have not already).");
                setTimeout(() => {
                    this.router.navigateByUrl('/dashboard/publishedexperience');
                }, 2000);
            },
                (err) => {
                    // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                    this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                    this.spinnerService.hide();
                    this.modalRef.hide();
                });
    }

    triggerAssetsPopup() {
        this.typeAsset = this.iframeElement.contentWindow.getAssetType();
        this.getPopupAssetData(this.breadcrumArryPopup[this.breadcrumArryPopup.length - 1].url);
        this.getPopupAssetDataCommon(this.breadcrumArryPopupCommon[this.breadcrumArryPopupCommon.length - 1].url);
        this.assetPopup.show();
    }

    triggerThreeDAssetsPopup(model:any,scale:any,rotation:any) {
        this.model=model;
        this.modelScale=scale;
        this.modelRotation=rotation;
        this.typeAsset = this.iframeElement.contentWindow.getAssetType();
        this.getPopupThreeDAssetData();
        this.getPopupThreeDAssetDataCommon();
        this.threeAssetPopup.show();
        this.bindThreeDData();
        // this.tableData=this.tableDataUser;
    }

    // popToast(messageType:any, message:any) {
    //     this.toasterService.pop(messageType, message);
    // }

    dataURLtoFile(dataurl:any, filename:any) {
        const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const blob:any = new Blob([u8arr], {
            type: mime
        });
        blob['name'] = filename;
        blob['lastModifiedDate'] = new Date();
        return blob;
    }
    // uploadPopToast(massage:any, Title:any, Body:any) {
    //     this.toasterService.pop(massage, Title, Body);
    // }

    ////////////////// create experiance back end/////////
    uploadBase64() {
        this.spinnerService.show();
       // console.log(this.croppedImage);
        const newfile = this.dataURLtoFile(this.croppedImage, this.fileName);
        const formdata: FormData = new FormData();
        formdata.append('UserId', this.userId);
        formdata.append('FolderName', '');
        formdata.append('ParentFolder', this.parentFolder);
        formdata.append('file', newfile);
        const size = newfile.size;
        formdata.append('FileSize', size.toString());
        formdata.append('AssetType', '5');
        formdata.append('name', newfile['name']);
        this.apiService.uploadFile('asset/upload', formdata).subscribe(
            (data:any) => {
                if (data['body']) {
                    if (data['body']['status']) {
                        this.toastrService.success( 'Phew! Uploaded! This asset is now ready to be used in your Experizer Experiences.','Upload File');
                        this.modalRef2.hide();
                        $('.modal-backdrop').removeClass('second-model-backdrop');
                        this.getPopupAssetData(this.parentFolder);
                        this.assetsId = data['body']['InsertedAssetId'];
                        const filename = data['body']['FileName'];
                        let id = filename;
                        id = id.split('.');
                        id = id[0].replace(/[^a-zA-Z0-9]/g, '_');
                        const str = '<span class="text-overflow-file-upload">' + filename + '</span> <span class="pull-right">Completed <i class="fa fa-check"  aria-hidden="true"></i></span>';
                        $('#' + id).html(str);
                        setTimeout(() => {
                            $('#fileNames').html('');
                        }, 1000);
                        this.fileIndex = 0;
                        this.uploadingFileEXP = false;
                        this.isSperical = false;
                        this.spinnerService.hide();
                    } else {
                        this.toastrService.error('Your storage is running out of space!!','Upload File');
                        this.isSperical = false;
                        this.uploadingFileEXP = false;
                        $('#fileNames').html('Failed');
                        setTimeout(() => {
                            $('#fileNames').html('');
                        }, 1000);
                        this.spinnerService.hide();
                    }
                }
            },
            error => {
                console.error(error);
                $('#fileNames').html('Failed');
                setTimeout(() => {
                    $('#fileNames').html('');
                }, 1000);
                this.uploadingFileEXP = false;
                this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?','Upload File',);
                this.spinnerService.hide();
            }
        );
    }
    uploadNewExpFile(files:any, template: TemplateRef<any>) {
        this.uploadingFileEXP = true;
        this.fileIndex = 0;
        if (files.length === 0) {
            this.toastrService.error( 'No File selected','Upload File',);
            this.spinnerService.hide();
            $('#fileNames').html('');
            this.inputFileClick = false;
            this.uploadingFileEXP = false;
            return;
        }
        this.totalFiles = files.length;
        // this.spinnerService.show();
        if (!this.isSperical) {
            const idArr:any = {};
            for (let i = 0; i < this.totalFiles; i++) {
                let span = '';

                let id = files[i].name;
                id = id.split('.');
                id = id[0].replace(/[^a-zA-Z0-9]/g, '_');
                const val = Math.floor(1000 + Math.random() * 9000);
                id = id + '_' + val;
                idArr[files[i].name] = id;
                //span = span + '<div id="' + id + '"><span class="text-overflow-file-upload">' + files[j].name + '</span> <span class="pull-right">uploading...</span></div>';
                span = span + '<div class="progress mb-2"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" id="' + id + '"  style="width:2%"><span class="text-overflow-file-upload pull-right text-black">' + files[i].name + '</span></div></div>';
                $('#fileNames').append(span);

            }
            this.uploadExpfile(files, template, idArr, this.fileIndex);
        } else {
            let filetype = files[this.fileIndex].name;
            if (filetype.length >= 100) {
                // this.uploadPopToast('error', 'Upload File', 'Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters.');
                this.toastrService.error('Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters.','Upload File');
                $('#fileNames').html('');
                this.spinnerService.hide();
                return;
            }
            filetype = filetype.split('.');
            filetype = filetype[filetype.length - 1];
            filetype = filetype.toLowerCase();
            if (filetype !== 'jpg' && filetype !== 'jpeg' && filetype !== 'png') {
                this.toastrService.error( 'Please select only image (jpg, jpeg, png) file','Upload File');
                this.spinnerService.hide();
                $('#fileNames').html('');
                return;
            }
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            const myReader: FileReader = new FileReader();

            myReader.onloadend = (e) => {
                this.imageChangedEvent = myReader.result;
                this.originalImage = this.imageChangedEvent;
                this.fileName = files[this.fileIndex].name;
                this.modalRef2 = this.modalService.show(template, {
                    class: 'modal-lg modal-lg-sphercal modal-content-radius',
                    ignoreBackdropClick: true
                });
                $('.modal-backdrop').addClass('second-model-backdrop');
                this.spinnerService.hide();
            };
            myReader.readAsDataURL(files[this.fileIndex]);
        }
        this.isSperical = false;
    }
    uploadExpfile(files:any, template: TemplateRef<any>, idArr:any, i:any) {
        let filetype = files[i].name;
        const id = idArr[filetype];
        let dup = false;
        for (let j = 0; j < this.assetsData.length; j++) {
            if (this.assetsData[j].FileName === files[i].name) {
                // this.uploadPopToast('error', 'Upload File', 'File with name ' + files[i].name + ' already exists');
              this.toastrService.error('File with name ' + files[i].name + ' already exists','Upload File');
                // this.spinnerService.hide();
                // $('#fileNames').html('');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');
                const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
                $('#' + id).html(str);
                dup = true;
                break;
            }
        }
        if (dup) {
            this.fileIndex++;
            if (this.fileIndex === this.totalFiles) {
                this.spinnerService.hide();
                $('#fileNames').html('');
                this.uploadingFileEXP = false;
            }
            this.uploadExpfile(files, template, idArr, this.fileIndex);
            return;
        }
        if (filetype.length >= 100) {
            // this.uploadPopToast('error', 'Upload File', 'Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters.');
            this.toastrService.error( 'Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters.','Upload File')
            $('#' + id).css('width', '100%');
            $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
            $('#' + id).addClass('bg-danger');
            const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
            $('#' + id).html(str);
            this.fileIndex++;
            if (this.fileIndex === this.totalFiles) {
                this.spinnerService.hide();
                $('#fileNames').html('');
                this.uploadingFileEXP = false;
            }
            this.uploadExpfile(files, template, idArr, this.fileIndex);
            return;
        }
        filetype = filetype.split('.');
        filetype = filetype[filetype.length - 1];
        filetype = filetype.toLowerCase();
        let AssetType;
        if (this.typeAsset === 'Image') {
            if (filetype !== 'jpg' && filetype !== 'jpeg' && filetype !== 'png' && filetype !== 'gif') {
                // this.uploadPopToast('error', 'Upload File', 'Please select only image (jpg, jpeg, png, gif) file');
                this.toastrService.error( 'Please select only image (jpg, jpeg, png, gif) file','Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');
                const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
                $('#' + id).html(str);
                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    $('#fileNames').html('');
                    this.uploadingFileEXP = false;
                }
                this.uploadExpfile(files, template, idArr, this.fileIndex);
                return;
            } else {
                AssetType = 1;
            }
        } else if (this.typeAsset === 'Audio') {
            if (filetype !== 'mp3' && filetype !== 'ogg' && filetype !== 'm4a' && filetype !== 'wav') {
                // this.uploadPopToast('error', 'Upload File', 'Please select only audio (mp3, ogg, m4a, wav) file');
                this.toastrService.error('Please select only audio (mp3, ogg, m4a, wav) file','Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');
                const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
                $('#' + id).html(str);
                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    $('#fileNames').html('');
                    this.uploadingFileEXP = false;
                }
                this.uploadExpfile(files, template, idArr, this.fileIndex);
                return;
            } else {
                AssetType = 3;
            }
        } else if (this.typeAsset === 'Video') {
            if (filetype !== 'mp4' && filetype !== '3gp' && filetype !== 'avi') {
                // this.uploadPopToast('error', 'Upload File', 'Please select only video (mp4, 3gp, avi) file');
                this.toastrService.error('Please select only video (mp4, 3gp, avi) file','Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');
                const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
                $('#' + id).html(str);
                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    $('#fileNames').html('');
                    this.uploadingFileEXP = false;
                }
                this.uploadExpfile(files, template, idArr, this.fileIndex);
                return;
            } else {
                AssetType = 2;
            }
        } else if (this.typeAsset === '360Video') {
            if (filetype !== 'mp4' && filetype !== '3gp' && filetype !== 'avi') {
                // this.uploadPopToast('error', 'Upload File', 'Please select only video (mp4, 3gp, avi) file');
                this.toastrService.error('Please select only video (mp4, 3gp, avi) file', 'Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');
                const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
                $('#' + id).html(str);
                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    $('#fileNames').html('');
                    this.uploadingFileEXP = false;
                }
                this.uploadExpfile(files, template, idArr, this.fileIndex);
                return;
            } else {
                AssetType = 6;
            }
        } else if (this.typeAsset === '360Image') {
            if (filetype !== 'jpg' && filetype !== 'jpeg' && filetype !== 'png') {
                // this.uploadPopToast('error', 'Upload File', 'Please select only image (jpg, jpeg, png) file');
                this.toastrService.error('Please select only image (jpg, jpeg, png) file','Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');
                const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
                $('#' + id).html(str);
                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    $('#fileNames').html('');
                    this.uploadingFileEXP = false;
                }
                this.uploadExpfile(files, template, idArr, this.fileIndex);
                return;
            } else {
                AssetType = 5;
            }
        } else {
            // this.uploadPopToast('error', 'Upload File', 'Please select only media file');
            this.toastrService.error('Please select only media file','Upload File');
            $('#' + id).css('width', '100%');
            $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
            $('#' + id).addClass('bg-danger');
            const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-times" aria-hidden="true"></i>' + files[i].name + '</span>';
            $('#' + id).html(str);
            this.fileIndex++;
            if (this.fileIndex === this.totalFiles) {
                this.spinnerService.hide();
                $('#fileNames').html('');
                this.uploadingFileEXP = false;
            }
            this.uploadExpfile(files, template, idArr, this.fileIndex);
            return;
        }

        this.uploadFile(files, AssetType, i, idArr, template);
    }

    uploadFile(files:any, type:any, index:any, idArr:any, template: TemplateRef<any>) {
        const formdata: FormData = new FormData();
        formdata.append('UserId', this.userId);
        formdata.append('FolderName', '');
        formdata.append('AssetType', type);
        formdata.append('ParentFolder', this.parentFolder);
        formdata.append('name', files[index].name);
        const tempName = files[index].name;
        const id = idArr[tempName];
        formdata.append('file', files[index]);
        formdata.append('FileSize', files[index].size);
        this.apiService.uploadFile('asset/upload', formdata).subscribe(
            (data:any) => {
                if (data.type === HttpEventType.UploadProgress) {
                    // This is an upload progress event. Compute and show the % done:
                    // console.log(tempName);
                    // let id = tempName;
                    // id = id.split('.');
                    // id = id[0].replace(/[^a-zA-Z0-9]/g, '_');
                    const percentDone = Math.round(96 * data.loaded / data.total);
                    $('#' + id).css('width', percentDone + '%');
                } else if (data instanceof HttpResponse) {
                    this.fileIndex++;
                }
                if (data['body']) {
                    if (data['body']['status']) {
                        if ((this.totalFiles) > this.fileIndex) {
                            const filename = data['body']['FileName'];
                            // let id = filename;
                            // id = id.split('.');
                            // id = id[0].replace(/[^a-zA-Z0-9]/g, '_');
                            //const str = '<span class="text-overflow-file-upload">' + filename + '</span> <span class="pull-right">Completed <i class="fa fa-check"  aria-hidden="true"></i></span>';
                            $('#' + id).css('width', '100%');
                            $('#' + id).removeClass('progress-bar-animated progress-bar-striped');
                            const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-check"  aria-hidden="true"></i>' + filename + '</span>';
                            $('#' + id).html(str);
                            this.uploadExpfile(files, template, idArr, this.fileIndex);
                            // this.fileIndex++;
                            // this.fileUploadAfterCheck(files, template);
                        } else {
                            // this.uploadPopToast('success', 'Upload File', 'Phew! Uploaded! This asset is now ready to be used in your Experizer Experiences.');
                            this.toastrService.success('Phew! Uploaded! This asset is now ready to be used in your Experizer Experiences.', 'Upload File');
                            this.getPopupAssetData(this.parentFolder);
                            const filename = data['body']['FileName'];
                            // let id = filename;
                            // id = id.split('.');
                            // id = id[0].replace(/[^a-zA-Z0-9]/g, '_');
                            // const str = '<span class="text-overflow-file-upload">' + filename + '</span> <span class="pull-right">Completed <i class="fa fa-check"  aria-hidden="true"></i></span>';
                            $('#' + id).css('width', '100%');
                            $('#' + id).removeClass('progress-bar-animated progress-bar-striped');
                            const str = '<span class="text-overflow-file-upload pull-right text-black"><i class="fa fa-check"  aria-hidden="true"></i>' + filename + '</span>';
                            $('#' + id).html(str);
                            setTimeout(() => {
                                this.uploadingFileEXP = false;
                                $('#fileNames').html('');
                            }, 1000);
                            this.fileIndex = 0;
                            this.assetsId = data['body']['InsertedAssetId'];
                            this.spinnerService.hide();
                        }
                    } else {
                        // this.uploadPopToast('error', 'Upload File', 'Your storage is running out of space!!');
                        this.toastrService.error( 'Your storage is running out of space!!','Upload File');
                        this.spinnerService.hide();
                        setTimeout(() => {
                            this.uploadingFileEXP = false;
                            this.getPopupAssetData(this.parentFolder);
                            $('#fileNames').html('');
                        }, 1000);
                    }
                }
            },
            error => {
                console.error(error);
                $('#fileNames').html('Failed');
                setTimeout(() => {
                    this.uploadingFileEXP = false;
                    this.getPopupAssetData(this.parentFolder);
                    $('#fileNames').html('');
                }, 1000);
                // this.uploadPopToast('error', 'Upload File', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?','Upload File');
                this.spinnerService.hide();
            }
        );
    }
    addSidePadding() {
        if (this.sidePaddingCheck) {
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            let img:any;
            const classObject = this;
            img = new Image();
            img.onload = function () {
                canvasEl.height = this.height;
                canvasEl.width = this.height * 2;
                let width = this.height * 2;
                width = width - this.width;
                width = width / 2;
                this.cx = canvasEl.getContext('2d');
                this.cx.fillStyle = '#000000';
                this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                this.cx.drawImage(img, width, 0);
                const data = canvasEl.toDataURL();
                classObject.imageChangedEvent = data;
                classObject.sidePaddingImage = data;
            };
            img.src = this.imageChangedEvent;
        } else {
            if (this.topPaddingCheck) {
                const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
                let imgTop:any;
                const classObject = this;
                imgTop = new Image();
                imgTop.onload = function () {
                    canvasEl.width = this.width;
                    const height = this.height * 0.1;
                    canvasEl.height = this.height + (2 * height);
                    this.cx = canvasEl.getContext('2d');
                    this.cx.fillStyle = '#000000';
                    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                    this.cx.drawImage(imgTop, 0, height);
                    const data = canvasEl.toDataURL();
                    classObject.imageChangedEvent = data;
                    classObject.topPaddingImage = data;
                };
                imgTop.src = this.originalImage;
            } else {
                this.imageChangedEvent = this.originalImage;
            }
        }
    }

    addTopPadding() {
        if (this.topPaddingCheck) {
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            let img:any;
            const classObject = this;
            img = new Image();
            img.onload = function () {
                canvasEl.width = this.width;
                const height = this.height * 0.1;
                canvasEl.height = this.height + (2 * height);
                this.cx = canvasEl.getContext('2d');
                this.cx.fillStyle = '#000000';
                this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                this.cx.drawImage(img, 0, height);
                const data = canvasEl.toDataURL();
                classObject.imageChangedEvent = data;
                classObject.topPaddingImage = data;
            };
            img.src = this.imageChangedEvent;
        } else {
            if (this.sidePaddingCheck) {
                const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
                let imgSide:any;
                const classObject = this;
                imgSide = new Image();
                imgSide.onload = function () {
                    canvasEl.height = this.height;
                    canvasEl.width = this.height * 2;
                    let width = this.height * 2;
                    width = width - this.width;
                    width = width / 2;
                    this.cx = canvasEl.getContext('2d');
                    this.cx.fillStyle = '#000000';
                    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                    this.cx.drawImage(imgSide, width, 0);
                    const data = canvasEl.toDataURL();
                    classObject.imageChangedEvent = data;
                    classObject.sidePaddingImage = data;
                };
                imgSide.src = this.originalImage;
            } else {
                this.imageChangedEvent = this.originalImage;
            }
        }
    }
    setAssetsSrc(event:any, url:any, id:any) {
        var dataAssest;
       if(this.userAsset){
dataAssest=this.assetsData;
       } 
       else{
        dataAssest=this.assetsDataCommon;
       }
        for (let i = 0; i < dataAssest.length; i++) {
            const el = document.querySelector('#tr-' + i);
            if (el && el.classList.contains('clicked-table')) {
                el.classList.remove('clicked-table');
            }
            const elIcon = document.querySelector('#icon-' + i);
            if (elIcon && elIcon.classList.contains('clicked')) {
                elIcon.classList.remove('clicked');
            }
        }
        const ele = document.querySelector('#tr-' + id);
        if (ele) {
            ele.classList.add('clicked-table');
        }
        const elicon = document.querySelector('#icon-' + id);
        if (elicon) {
            elicon.classList.add('clicked');
        }
        this.assetsSrc = url;
    }
    selectThreeDAsset() {
        this.nextClickFlag = false;
        // this.spinnerService.show();
        this.threeAssetPopup.hide();
        // classObject.spinnerService.hide();
        var frameDoc = this.iframeElement1.contentDocument || this.iframeElement1.contentWindow.document;
       var object= frameDoc.getElementById("object-entity");
       var rotation=object.getAttribute("rotation");    
       var scale=object.getAttribute("scale");
       this.todayNumber=Date.now();
       var modelImageUrl=this.apiService.apiBaseUrl+"experience/"+this.experienceId+"/"+this.parentFolderName+ this.todayNumber+'.png';
       this.screenShotObjPreview(this.iframeElement,modelImageUrl);
       
        this.iframeElement.contentWindow.getThreeDAssetPath(this.mtlSrc, this.objSrc, this.gltfSrc, this.parentFolderName,rotation,scale,modelImageUrl);
        
    }
    selectAsset(template: TemplateRef<any>) {
        if (this.isSperical) {
            this.spinnerService.show();
            const classObject = this;
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            let name = this.assetsSrc.split('/');
            name = name[name.length - 1];
            let img:any;
            img = new Image();
            img.onload = function () {
                canvasEl.height = this.height;
                canvasEl.width = this.width;
                this.cx = canvasEl.getContext('2d');
                this.cx.fillStyle = '#000000';
                this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                this.cx.drawImage(img, 0, 0);
                const data = canvasEl.toDataURL();
                classObject.imageChangedEvent = data;
                classObject.originalImage = classObject.imageChangedEvent;
                const val = Math.floor(1000 + Math.random() * 9000);
                classObject.fileName = 'spherical_' + val + '_' + name;
                classObject.modalRef2 = classObject.modalService.show(template, {
                    class: 'modal-lg modal-lg-sphercal modal-content-radius',
                    ignoreBackdropClick: true
                });
                $('.modal-backdrop').addClass('second-model-backdrop');
                classObject.spinnerService.hide();
            };
            img.crossOrigin = 'anonymous';
            img.src = this.assetsSrc;
        } else {
            this.assetPopup.hide();
            this.iframeElement.contentWindow.getAssetPath(this.assetsSrc);
        }
    }
    enter(e:any) {
        const target = e.target;
        target.play();
    }
    leave(e:any) {
        const target = e.target;
        target.pause();
    }
    getPopupAssetData(folder:any) {
        // $('#loader').show();
        this.spinnerService.show();
        this.assetsSrc = '';
        this.cdr.detectChanges();
        const data = {
            'ParentFolder': folder,
            'UserId': this.userId
        };
        this.parentFolder = folder;
        this.apiService.postData('asset/getAssetsByDirectory/', data).subscribe(
            (resdata:any) => {
                this.assetsData = resdata['data'];
                const classObj = this;
                if (this.assetsId !== 0) {
                    this.assetsData.forEach(function (assets) {
                        if (assets.Id === classObj.assetsId) {
                            classObj.assetsSrc = classObj.baseURL + assets.FileUrl;
                        }
                    });
                }
                // $('#loader').hide();
                this.spinnerService.hide();
                this.cdr.detectChanges();
            },
            error => {
                console.error(error);
                this.assetsData = [];
                // $('#loader').hide();
                this.spinnerService.hide();
            }
        );
    }
    getPopupAssetDataCommon(folder:any) {
        // $('#loader').show();
        this.spinnerService.show();
        this.assetsSrc = '';
        this.cdr.detectChanges();
        const data = {
            'ParentFolder':folder
        };
        // this.parentFolder = folder;
        this.apiService.postData('asset/getAssetsByDirectoryforCommonFolder/', data).subscribe(
            (resdata:any) => {
                this.assetsDataCommon = resdata['data'];
                const classObj = this;
                if (this.assetsId !== 0) {
                    this.assetsDataCommon.forEach(function (assets) {
                        if (assets.Id === classObj.assetsId) {
                            classObj.assetsSrc = classObj.baseURL + assets.FileUrl;
                        }
                    });
                }
                // $('#loader').hide();
                this.spinnerService.hide();
                this.cdr.detectChanges();
            },
            error => {
                console.error(error);
                this.assetsData = [];
                // $('#loader').hide();
                this.spinnerService.hide();
            }
        );
    }
    public tableData: any[] = [];
    public tableDataUser: any[] = [];
    public tableDataCommon: any[] = [];
    getPopupThreeDAssetData() {
        $('#loader-three-d').show();
        this.assetsSrc = '';
        this.cdr.detectChanges();
        const data = {
            'UserId': this.userId,
            'ParentFolder': this.ThreeDParentFolder+"/3DModel"
        };
        this.apiService.postData('asset/3DAssetModels' , data).subscribe(
            (resdata:any) => {
                this.tableDataUser=[];
                this.assetsData = resdata['data'];
                this.assetsData.forEach(element => {
                    var ParentFolder = element.ParentFolder.split("/").pop();
                    this.tableDataUser.push({ "ParentFolder": ParentFolder, "mtl": element.mtl, "obj": element.obj, "gltf": element.gltf });
                });
                $('#loader-three-d').hide();
                this.cdr.detectChanges();
            },
            error => {
                console.error(error);
                this.assetsData = [];
                setTimeout(() => {
                    // $('#loader').hide();
                }, 1000);
            }
        );
    }
    getPopupThreeDAssetDataCommon() {
        $('#loader-three-d').show();
        this.assetsSrc = '';
        this.cdr.detectChanges();
        const data = {
            'UserId': "1031",
            'ParentFolder': "images/assets/cy8w0648/3DModel"
        };
        this.apiService.postData('asset/get3DAssetModelsCommonFolder',data).subscribe(
            (resdata:any) => {
                this.tableDataCommon=[];
                this.assetsData = resdata['data'];
                this.assetsData.forEach(element => {
                    var ParentFolder = element.ParentFolder.split("/").pop();
                    this.tableDataCommon.push({ "ParentFolder": ParentFolder, "mtl": element.mtl, "obj": element.obj, "gltf": element.gltf });
                });
                $('#loader-three-d').hide();
                this.cdr.detectChanges();
            },
            error => {
                console.error(error);
                this.assetsData = [];
                setTimeout(() => {
                    // $('#loader').hide();
                }, 1000);
            }
        );
    }
    breadcrumPushPopup(pushUrl:any, Name:any) {
        const temp = {
            name: Name,
            url: pushUrl,
            index: this.breadcrumArryPopup.length
        };
        this.breadcrumArryPopup.push(temp);
    }
    breadcrumpopPopup(index:any) {
        this.breadcrumArryPopup.splice(index + 1, this.breadcrumArryPopup.length - index);
        this.getPopupAssetData(this.breadcrumArryPopup[index].url);
    }
    breadcrumPushPopupCommon(pushUrl:any, Name:any) {
        const temp = {
            name: Name,
            url: pushUrl,
            index: this.breadcrumArryPopupCommon.length
        };
        this.breadcrumArryPopupCommon.push(temp);
    }
    breadcrumpopPopupCommon(index:any) {
        this.breadcrumArryPopupCommon.splice(index + 1, this.breadcrumArryPopupCommon.length - index);
        this.getPopupAssetDataCommon(this.breadcrumArryPopupCommon[index].url);
    }
    imageCropped(image:ImageCroppedEvent) {
        this.croppedImage = image.base64;
    }
    imageLoaded() {
        // show cropper
    }
    loadImageFailed() {
        // show message
    }

    toggleView(view:any) {
        if (view === 'icon') {
            this.viewToggle = false;
        } else {
            this.viewToggle = true;
        }
    }
    handler(type: string, $event: ModalDirective) {
        this.assetsId = 0;
        this.isSperical = false;
        this.assetsData = [];
        this.assetsDataCommon = [];
        this.breadcrumArryPopup = [];
        this.breadcrumArryPopupCommon = [];
        const temp = {
            name: 'Home',
            url: window.sessionStorage.getItem('ParentFolder'),
            index: 0
        };
        const temp1 = {
            name: 'Home',
            url: "images/assets/cy8w0648",
            index: 0
        };
        this.breadcrumArryPopup.push(temp);
        this.breadcrumArryPopupCommon.push(temp1);
    }

    //////////////////// create experiance end//////////
    createNewFolder(FolderNameForm:any) {
        const FolderName = FolderNameForm.value.newFolderName;
        this.spinnerService.show();
        if (FolderName === '' || FolderName === undefined || FolderName === null) {
            this.addNewFolderFlag = false;
            this.spinnerService.hide();
            return;
        }
        const formdata: FormData = new FormData();
        formdata.append('UserId', this.userId);
        formdata.append('FolderName', FolderName);
        formdata.append('FileSize', '0');
        formdata.append('ParentFolder', this.parentFolder);
        formdata.append('AssetType', '4');
        this.apiService.uploadFile('asset/upload', formdata).subscribe(
            (data:any) => {
                if (data['body']) {
                    if (data['body']['status']) {
                        FolderNameForm.reset();
                        // this.uploadPopToast('success', 'Create Folder', 'Done! You\'ve got a new folder now. Hope you put some awesome files in that.');
                        this.toastrService.success( 'Done! You\'ve got a new folder now. Hope you put some awesome files in that.', 'Create Folder');
                        this.getPopupAssetData(this.parentFolder);
                        $('#popoverClick').trigger('click');
                        this.spinnerService.hide();
                    } else {
                        // this.uploadPopToast('error', 'Create Folder', 'Folder already exist!');
                        this.toastrService.error( 'Folder already exist!', 'Create Folder');
                        this.spinnerService.hide();
                        this.uploadingFileEXP = false;
                    }
                }
            },
            error => {
                // this.uploadPopToast('error', 'Create Folder', 'Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again.');
                this.toastrService.error('Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again.', 'Create Folder');
                this.spinnerService.hide();
                this.uploadingFileEXP = false;
            }
        );
    }
    onPopOverHidden() {
        this.addNewFolderFlag = true;
    }

    onSaveAsPopOverHidden() {
        this.newExperienceName = '';
        this.changeExperienceNameFlag = true;
    }
    public dropped(event: NgxFileDropEntry[], thirdModal:any, type:any) {
        const allFile = event.length;
        // let fileCount = 0;
        if (type === '360Image' && this.isSperical) {
            if (allFile > 1) {
                // this.uploadPopToast('error', 'Upload File', 'Please drop single file while making it spherical');
                this.toastrService.error('Please drop single file while making it spherical', 'Upload File');
                return;
            }
        }
        const files:any = [];
        for (const droppedFile of event) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    // console.log(droppedFile.relativePath, file);
                    files.push(file);
                    if (allFile === files.length) {
                        this.uploadNewExpFile(files, thirdModal);
                    }
                    /**
                    // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)
                    // Headers
                    const headers = new HttpHeaders({
                      'security-token': 'mytoken'
                    })
                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                      // Sanitized logo returned from backend
                    })
                    **/
                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                // console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }
    clearThird() {
        this.uploadingFileEXP = false;
        $('#fileNames').html('');
    }

    resetVariables() {
        this.uploadAssetsInput.nativeElement.value = '';
        this.assetsData = [];
        this.assetsDataCommon = [];
    }
    focus() {
        this.inputFileClick = true;
        $('#uploadAssetsInput').val('');
    }
    blur() {
        // console.log('blur');
    }
    @HostListener('window:focus', ['$event'])
    onFocus(event: any): void {
        // Do something
        this.inputFileClick = false;
        // console.log(event);
    }


    goToEditName(template: TemplateRef<any>) {

        this.changeNameData = {
            "ExperienceId": this.experienceId,
            "ExperienceName": this.experienceTitle,
            "ExperienceTemplateId": this.experienceTemplateId,
            "IsSampleExperience": false,
            "UserId": parseInt(window.sessionStorage.getItem('userId') || '')
        }
        this.changeNameForm = new FormGroup({
            ExperienceName: new FormControl(this.experienceTitle, [Validators.required,Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9:_@!&? -]*$')]),

        });
        this.modalRef = this.modalService.show(template, { class: 'modal-content-radius' });
    }

    setThreeDAssetSrc(baseUrl:any, mtlUrl:any, objUrl:any, gltfUrl:any, parentFolder:any, id:any) {
        this.modelSelected = false;
        for (let i = 0; i < this.tableData.length; i++) {
            const el = document.querySelector('#tr-3d-' + i);
            if (el && el.classList.contains('clicked-table')) {
                el.classList.remove('clicked-table');
            }
            const elIcon = document.querySelector('#icon-' + i);
            if (elIcon && elIcon.classList.contains('clicked')) {
                elIcon.classList.remove('clicked');
            }
        }
        const ele = document.querySelector('#tr-3d-' + id);
        if (ele) {
            ele.classList.add('clicked-table');
        }
        const elicon = document.querySelector('#icon-' + id);
        if (elicon) {
            elicon.classList.add('clicked');
        }
        if (mtlUrl != null) {
            this.mtlSrc = baseUrl + mtlUrl;
            this.gltfSrc = "";
        }
        if (objUrl != null) {
            this.objSrc = baseUrl + objUrl;
        }
        if (gltfUrl != null) {
            this.gltfSrc = baseUrl + gltfUrl;
            this.mtlSrc = "";
            this.objSrc = "";
        }
        if (parentFolder != null) {
            this.parentFolderName = parentFolder;
        }
    }



    onSaveNameSubmit() {
        this.submitted = true;
        this.changeNameForm.value.ExperienceName = this.changeNameForm.value.ExperienceName.trim();
        if (this.changeNameForm.value.ExperienceName == '') {
            this.changeNameForm.controls['ExperienceName'].setErrors({ 'required': true });
            this.changeNameForm = new FormGroup({
                ExperienceName: new FormControl(this.changeNameForm.value.ExperienceName, [Validators.required, Validators.pattern('^[a-zA-Z0-9:_@!&? -]*$')]),
            });
        }

        if (this.changeNameForm.value.ExperienceName.length >100) {
            this.changeNameForm.controls['ExperienceName'].setErrors({ 'maxlength': true });
        }
        // stop here if form is invalid
        if (this.changeNameForm.invalid) {
            return;
        }
        else {
            let urlChkDuplicate = 'experience/checkExperienceName';

            if (this.changeNameForm.value.ExperienceName.indexOf('/') > -1 || this.changeNameForm.value.ExperienceName.indexOf('\\') > -1) {
                // this.popToast('error', "Special character '/' or '\\' is not allowed.");
                this.toastrService.error("Special character '/' or '\\' is not allowed.");
            } else {
                this.changeNameData.ExperienceName = this.changeNameForm.value.ExperienceName;
                if (this.changeNameData.ExperienceName == this.experienceTitle) {
                    this.modalRef.hide();
                    // this.popToast('success', "Experience name changed successfully.");
                    this.toastrService.success("Experience name changed successfully.");
                }
                else {

                    this.apiService.postData(urlChkDuplicate, this.changeNameData)
                        .subscribe(
                            (response:any) => {
                                if (response['status'] === true) {
                                    // this.popToast('error', 'Experience name already exists.');
                                    this.toastrService.error('Experience name already exists.');
                                } else {
                                    let data = {
                                        "ExperienceName": this.changeNameData.ExperienceName,
                                        "UserId": parseInt(window.sessionStorage.getItem('userId') || '')
                                    };
                                    // this.popToast('success','Create new experience.');
                                    this.apiService.putData('experience/renameExperience/' + this.changeNameData.ExperienceId, data)
                                        .subscribe(
                                            response => {
                                                this.experienceTitle = this.changeNameData.ExperienceName;
                                                this.modalRef.hide();
                                                // this.popToast('success', "Experience name changed successfully.");
                                                this.toastrService.success("Experience name changed successfully.");
                                            },
                                            error => {
                                                //this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                                               this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                                            }
                                        );
                                    this.modalRef.hide();
                                }

                            },
                            error => {
                                // console.log("Inside error log");
                                // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                                this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
                            }

                        );
                }
            }
        }
    }


    nextClick() {
        this.nextClickFlag = true;

    }

    loadModelPreview() {
        this.iframeElement1 = this.renderer2.selectRootElement('#id_description_iframe');
        if (this.iframeElement1.contentWindow.bindToIframe) {
            this.iframeElement1.contentWindow.bindToIframe(this.mtlSrc, this.objSrc, this.gltfSrc,this.model,this.modelScale,this.modelRotation);
        }
        //    this.iframeElement1.contentWindow.location.replace(this.apiService.getExperienceBaseUrl() + "v0.1/verbose/3DAssetLibrary/objectPreview.html");

    }
    previousClick() {
        this.modelSelected = true;
        this.nextClickFlag = false;
    }
    bindThreeDData(){
        if(this.userAssetId){        
        this.tableData=this.tableDataUser;
        }
        else{ 
        this.tableData=this.tableDataCommon; 
        }
    }

    screenShotObjPreview(iElement:any,modelImageUrl:any) {
        var modelFrame = this.iframeElement1.contentDocument.querySelector('a-scene');
        if (modelFrame != null || modelFrame != undefined) {
            const cancass = this.iframeElement1.contentDocument.querySelector('a-scene')['components'].screenshot.getCanvas('perspective');

            const canWidth = cancass.width/3 ;
            const canHeight = cancass.height/3;
            const cvs:any= document.createElement('canvas');
            cvs.width = canWidth;
            cvs.height = canHeight;
            const img = new Image();
            const obj = this;
            img.src = cancass.toDataURL();
            img.onload = () => {
                const ctx = cvs.getContext('2d').drawImage(img, 0, 0, canWidth, canHeight);
                const file = obj.dataURLtoFile(cvs.toDataURL(), obj.experienceId + '.png');
                const formdata: FormData = new FormData();
                formdata.append('experienceId', obj.experienceId.toString());
                formdata.append('file', file);
                formdata.append('UserId', this.userId);
                formdata.append('filename', this.parentFolderName+ this.todayNumber+ '.png');
                obj.apiService.uploadFile('asset/uploadObjectSnapshotPath', formdata).subscribe(
                    (data:any) => {
                        if (data['body']) {
                            if (data['body']['status']) {
                            iElement.contentWindow.objectImage(modelImageUrl);
                            }
                        }
                      
                        // objectImage
                    },
                    error => {
                        // console.log(error);
                    }
                );
            };
        }
    }
}
