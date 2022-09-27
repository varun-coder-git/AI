import { Component, OnInit, ViewChild, ElementRef, TemplateRef,Renderer2,Inject} from "@angular/core";

import { ModalDirective, BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToasterService } from "angular2-toaster";
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from "../services/navbar.service";
//import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ApiService } from "../services/api.service";
import * as FileSaver from "file-saver";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { threeDAssetFolderDetails, threeDAssetFolderRenameDetails } from "./../data-model/formData.component";
import { DOCUMENT, Location } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";

// import * as iframeData from '../../assets/3DAssetLibrary/iframe.js';

declare var $: any;

@Component( {
        selector: "app-three-d-asset-management",
        templateUrl: "./three-d-asset-management.component.html",
        styleUrls: ["./three-d-asset-management.component.css"]
    }

) export class ThreeDAssetManagementComponent implements OnInit {
    threeDObjectId: any;
    isRenameObj: boolean;
    prevFolderName!: string;
    showProgressDiv!: boolean;
    threeDAssestDataFolder: any;
    previewModelParent: any;
    threeDAssetData: any[]=[];
    threeDAssetChildData: any[]=[];
    @ViewChild("canvas") public canvas!: ElementRef;
    @ViewChild("imageIsspherical") public imageIsspherical!: ElementRef;
    @ViewChild(ModalDirective) thirdModal!: ModalDirective;
    isObjectCreated: boolean;
    threeDAssetFolderDetails: threeDAssetFolderDetails;
    threeDAssetFolderRenameDetails: threeDAssetFolderRenameDetails;
    isEdit!: boolean;
    private cx!: CanvasRenderingContext2D;
    validFile!: boolean;
    uploadingFile: boolean;
    fileUploadFlag: boolean;
    fileIndex!: number;
    viewModelData: any;
    objectFolder: any;
    filesToUpload: Array<File>=[];
    totalFiles!: number;
    parentFolder!: string;
    parent3DModelFolder!: string;
    viewToggle!: boolean;
    userId: any;
    isChildFolder: boolean=false;
    originalImage: any;
    childFolderName: any="";
    deletetype!: string;
    addNewFolderFlag: boolean;
    addNewFolderInFolderFlag: boolean;
    addNewFolderInModelFlag!: boolean;
    uploadProgress: any;
    experienceCustomizerURL: any;
    folderInModelName: any="";
    fileName: any;
    isSperical!: boolean;
    imageChangedEvent: any="";
    croppedImage: any="";
    baseURL=this.serviceApi.apiBaseUrl;
    private toasterService: ToasterService;
    typeAsset: string;
    assetsSrc: any="";
    breadcrumArry: any[]=[];
    breadcrumArryPopup: any[]=[];
    modalRef!: BsModalRef;
    breadcrumNew: any[]=[];
    modalRef2!: BsModalRef;
    public show!: boolean;
    tableData: any[]=[];
    deleteMulti: boolean;
    multipleDelete!: boolean;
    rowId: any;
    iframeElement: any;
    tooltipData!: any[];
    newFolderNameModel: string;
    uploadNewFileInputModel!: File;
    assetsType!: string;
    sidePaddingImage: any="";
    topPaddingImage: any="";
    sidePaddingCheck!: boolean;
    topPaddingCheck!: boolean;
    UploadDone: boolean;
    flag!: boolean;

    constructor(private sanitizer: DomSanitizer,
        private modalService: BsModalService,
        toasterService: ToasterService,
        public toastrService:ToastrService,
        private renderer2: Renderer2,
        private serviceApi: ApiService,
        private _elementRef: ElementRef,
        public nav: NavbarService,
        private spinnerService: NgxSpinnerService,
        @Inject(DOCUMENT) document:any) {
        this.threeDAssetFolderDetails=new threeDAssetFolderDetails();
        this.threeDAssetFolderRenameDetails=new threeDAssetFolderRenameDetails();
        this.experienceCustomizerURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.serviceApi.getExperienceBaseUrl()+"v0.1/verbose/3DAssetLibrary/objectPreview.html"
        );

        this.toasterService=toasterService;
        this.typeAsset="Image";
        this.deleteMulti=false;
        this.addNewFolderFlag=true;
        this.addNewFolderInFolderFlag=true;
        this.newFolderNameModel="";
        this.fileUploadFlag=true;
        this.uploadingFile=false;
        this.UploadDone=false;
        this.isObjectCreated=false;
        this.isRenameObj=false;
    }

    ngOnInit() {
        this.validFile=true;
        this.userId=window.sessionStorage.getItem("userId");
        this.parentFolder=window.sessionStorage.getItem("ParentFolder")||'{}';
        this.parent3DModelFolder=this.parentFolder+"/3DModel";
        this.fileIndex=0;
        this.totalFiles=0;
        this.isEdit=false;
        this.viewToggle=false;
        this.show=false;
        this.nav.show();

        this.tooltipData=[ {
            newFolder: "Create Folder",
                uploadFile: "Upload File",
                deleteSelecte: "Delete",
                deleteFile: "Delete",
                deleteFolder: "Delete",
                download: "Download",
                copy: "Copy File",
                renameFolder: "Rename Folder",
                renameFile: "Rename File",
                selectAll: "Check All",
                preview: "Preview",
                edit: "Edit"
        }

        ];
        this.getAssetData(this.parent3DModelFolder);

        const temp= {
            name: "Home",
                url: this.parentFolder,
                index: 0
        }

        ;
        this.breadcrumArry.push(temp);
    }

    getThreeDObjectDetails(object:any) {
        this.breadcrumNew=[];
        this.newFolderNameModel=object.FileName;
        this.prevFolderName=object.FileName;
        this.threeDObjectId=object.Id;
        this.threeDAssestDataFolder=object.FileUrl;
        this.getAssetDataBy3DObjectName(object.FileUrl);
        this.objectFolder=object.FileUrl;

        const temp= {
            name: object.FileName
        }

        ;
        this.breadcrumNew.push(temp);
    }

    openModal(template: TemplateRef<any>) {

        // open small modal
        this.modalRef=this.modalService.show(template, {
                class: "modal-sm modal-sm-content-radius",
                ignoreBackdropClick: true
            }

        );
    }

    //to be removed
    lgModal(template: TemplateRef<any>) {

        // open other large modal
        this.modalRef=this.modalService.show(template, {
                class: "modal-lg modal-content-radius",
                ignoreBackdropClick: true
            }

        );
    }

    //to be removed
    normalModal(template: TemplateRef<any>) {
        // open normal modal

        this.modalRef=this.modalService.show(template, {
                class: "modal-content-radius",
                ignoreBackdropClick: true
            }

        );
    }

    lgModal2(template: TemplateRef<any>) {

        // open large modal for spherical
        this.modalRef2=this.modalService.show(template, {
                class: "modal-lg modal-content-radius",
                ignoreBackdropClick: true
            }

        );
    }

    getAssetData(folder:any) {
        // get all assets data from database
        this.spinnerService.show();

        const data= {
            ParentFolder: folder,
                UserId: this.userId
        }

        ;
        // this.parentFolder = folder;
        this.serviceApi.postData("asset/getAssetsByDirectory/", data).subscribe( // api call to get data

            (resData:any)=> {
                this.tableData=resData["data"];
                this.spinnerService.hide();
            }

            ,
            error=> {
                this.spinnerService.hide();
                // this.popToastNew("error", "Folder Data", error);
                this.toastrService.error( "Folder Data",error);
            }

        );
    }

    getAssetDataBy3DObjectName(folder:any) {
        // get all assets data from database
        this.spinnerService.show();

        const data= {
            ParentFolder: folder,
                UserId: this.userId
        }

        ;
        // this.parentFolder = folder;
        this.serviceApi.postData("asset/get3DAssetsByDirectory/", data).subscribe( // api call to get data

            (resData:any)=> {
                this.threeDAssetData=resData["data"];

                if (this.threeDAssetData.length > 0) {
                    this.UploadDone=true;
                }

                else {
                    this.UploadDone=false;
                }

                this.spinnerService.hide();
            }

            ,
            error=> {
                this.spinnerService.hide();

                if (this.threeDAssetData.length > 0) {
                    this.UploadDone=true;
                }

                else {
                    this.UploadDone=false;
                }

                // this.popToastNew("error", "Folder Data", error);
                this.toastrService.error( "Folder Data",error);
            }

        );
    }

    breadcrumPush(pushUrl:any, Name:any) {

        // push in to breadcrum array
        if (this.breadcrumArry[this.breadcrumArry.length - 1].url !==pushUrl) {
            const temp= {
                name: Name,
                    url: pushUrl,
                    index: this.breadcrumArry.length
            }

            ;
            this.breadcrumArry.push(temp);
        }

        else {}
    }

    breadcrumpop(index:any) {
        // pop from breadcrum array
        this.breadcrumArry.splice(index + 1, this.breadcrumArry.length - index);
        this.getAssetData(this.breadcrumArry[index].url);
    }

    confirm(): void {
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }

    toggle(event:any) {
        // select unselect row to delete
        const target=event.target;
        const idAttr=target.attributes.id.value;
        let id=idAttr.split("-");
        id=id[1];
        let j=0;

        if (this.tableData[id].checked) {
            // toggle the selected row
            this.tableData[id].checked=false;
        }

        else {
            this.tableData[id].checked=true;
        }

        for (let i=0; i < this.tableData.length; i++) {
            if (this.tableData[i].checked) {
                j++;
            }
        }

        if (j > 0) {
            // hide show delete option in header
            this.deleteMulti=true;
        }

        else {
            this.deleteMulti=false;
        }

        if (this.tableData.length===j) {
            this.tooltipData[0].selectAll="Uncheck all";
        }

        else {
            this.tooltipData[0].selectAll="Check all";
        }
    }

    selectAll() {
        // select all checkbox
        let j=0;

        for (let i=0; i < this.tableData.length; i++) {
            if (this.tableData[i].checked) {
                j++;
            }
        }

        if (this.tableData.length !==j) {

            // select all
            for (let i=0; i < this.tableData.length; i++) {
                this.tableData[i].checked=true;
            }

            this.deleteMulti=true;
            this.tooltipData[0].selectAll="Uncheck all";
        }

        else {

            // unselect all
            for (let i=0; i < this.tableData.length; i++) {
                this.tableData[i].checked=false;
            }

            this.deleteMulti=false;
            this.tooltipData[0].selectAll="Check all";
        }
    }

    deleteSelected() {
        // delete the file/files
        this.spinnerService.show();

        if (this.multipleDelete) {
            // delete multiple files
            const deleteArray=[];

            for (let i=0; i < this.tableData.length; i++) {
                if (this.tableData[i].checked) {
                    // const temp= {
                    //     Id: this.tableData[i].Id,
                    //         FileSize: this.tableData[i].FileSize,
                    //         AssetType: this.tableData[i].AssetType
                    // }

                    var temp= {
                        ParentFolder: this.tableData[i].ParentFolder,
                            FolderName: this.tableData[i].FileName,
                            id: this.tableData[i].Id,
                            FileSize: this.tableData[i].FileSize,
                            AssetType: this.tableData[i].AssetType
                    }

                    ;
                    deleteArray.push(temp);
                }
            }

            // const url="asset/deleteMultipleAsset/"+this.userId;
            const url="asset/deleteMultipleAssetFor3DLibrary/"+this.userId;


            this.serviceApi.deleteMultipleData(url, deleteArray).subscribe( // api call to delete

                data=> {
                    if (data["status"]) {
                        this.spinnerService.hide();
                        // this.popToast("success","Done! We have taken care of this files on your storage.");
                        this.toastrService.success("Done! We have taken care of this files on your storage."); 
                        this.getAssetData(this.parent3DModelFolder);
                        this.multipleDelete=false;
                        this.deleteMulti=false;
                    }

                    else {
                        this.spinnerService.hide();
                        // this.popToastNew("error",
                        //     "Delete File/Folder",
                        //     "Looks like this file/folder is in use in at least one of your Experizer Experiences. Please unlink this file/Folder from all your Experizer Experiences before you delete."
                        // );
                        this.toastrService.error( 'Looks like this file/folder is in use in at least one of your Experizer Experiences. Please unlink this file/Folder from all your Experizer Experiences before you delete.',"Delete File/Folder");
                    }
                }

                ,
                error=> {
                    this.spinnerService.hide();
                    // this.popToastNew("error",
                    //     "Delete File/Folder",
                    //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?',"Delete File/Folder");
                }

            );
        }

        else {
            if (this.tableData[this.rowId].AssetType==="4") {
                // delete single folder
                // const url = 'asset/deleteAsset/' + this.userId + '/' + this.tableData[this.rowId].Id + '/' + this.tableData[this.rowId].FileSize +
                //   '/' + this.tableData[this.rowId].AssetType;
                var parentFolderFullName=this.tableData[ this.rowId].ParentFolder.split("/")[2];
                this.parent3DModelFolder=this.tableData[this.rowId].ParentFolder;
                // const url = 'asset/delete3DAssetFolder/' + this.userId + '/' + this.tableData[this.rowId].Id + '/' + this.tableData[this.rowId].FileSize + '/' + parentFolderFullName +
                //   '/' + this.tableData[this.rowId].FileName;
                const url="asset/delete3DAssetFolder/"+this.userId;

                var data= {
                    ParentFolder: this.tableData[this.rowId].ParentFolder,
                        FolderName: this.tableData[this.rowId].FileName,
                        id: this.tableData[this.rowId].Id,
                        FileSize: this.tableData[this.rowId].FileSize
                }

                ;
                console.log("delete Selected folder", this.tableData[this.rowId]);

                this.serviceApi.putData(url, data).subscribe(data=> {
                        if (data["status"]) {
                            this.spinnerService.hide();
                            // this.popToast("success",
                            //     "Done! We have taken care of this file on your storage."
                            // );
                            this.toastrService.success('Done! We have taken care of this file on your storage.'); 
                            this.getAssetData(this.parent3DModelFolder);
                            this.deleteMulti=false;
                        }

                        else {
                            this.spinnerService.hide();
                            // this.popToastNew("error",
                            //     "Delete Folder",
                            //     "Looks like this folder is in use in at least one of your Experizer Experiences. Please unlink this folder from all your Experizer Experiences before you delete."
                            // );
                            this.toastrService.error( 'Looks like this folder is in use in at least one of your Experizer Experiences. Please unlink this folder from all your Experizer Experiences before you delete.',"Delete Folder");
                        }
                    }

                    ,
                    error=> {
                        this.spinnerService.hide();
                        // this.popToast("error",
                        //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                        // );
                        this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
                    }

                );
            }

            else {
                // delete singel file
                // const url = 'asset/deleteAsset/' + this.userId + '/' + this.tableData[this.rowId].Id + '/' + this.tableData[this.rowId].FileSize + '/' + this.tableData[this.rowId].AssetType;

                // const url = 'asset/delete3DAssetFolder/' + this.userId + '/' + this.tableData[this.rowId].Id + '/' + this.tableData[this.rowId].FileSize + '/' + this.tableData[this.rowId].ParentFolder +
                //   '/' + this.tableData[this.rowId].FileName;
                const url="asset/delete3DAssetFolder/"+this.userId;

                var data= {
                    ParentFolder: this.tableData[this.rowId].ParentFolder,
                        FolderName: this.tableData[this.rowId].FileName,
                        id: this.tableData[this.rowId].Id,
                        FileSize: this.tableData[this.rowId].FileSize
                }

                ;

                this.serviceApi.putData(url, data).subscribe(data=> {
                        if (data["status"]) {
                            this.spinnerService.hide();
                            // this.popToast("success",
                            //     "Done! We have taken care of this file on your storage."
                            // );
                            this.toastrService.success('Done! We have taken care of this file on your storage.'); 
                            this.getAssetData(this.parent3DModelFolder);
                            this.deleteMulti=false;
                        }

                        else {
                            this.spinnerService.hide();
                            // this.popToast("error",
                            //     "Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete."
                            // );
                            this.toastrService.error( 'Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete.');
                        }
                    }

                    ,
                    error=> {
                        this.spinnerService.hide();
                        // this.popToast("error",
                        //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                        // );
                        this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                    }

                );
            }
        }

        this.modalRef.hide();
        this.multipleDelete=false;
        this.rowId=-1;
    }

    //not required
    downloadFile(url:any) {
        // download file
        let name=url.split("/");
        var namefinal:any;
        name=name[name.length - 1];

        if (name.length >=24) {
            namefinal=name.substring(0, 24);
            namefinal=namefinal+"...";
        }

        else {
            namefinal=name;
        }

        // this.popToast("info",
        //     'Yey! File "'+ namefinal + '" has started downloading.'
        // );
        this.toastrService.info( 'Yey! File "'+ namefinal + '" has started downloading.');
        this.serviceApi.downloadFile(url).subscribe( // download api call

            (data:any)=> {
                FileSaver.saveAs(data, name);
                // this.popToast("success",
                //     'Yey! File "'+ namefinal + '" downloaded successfully to your downloads folder.'
                // );
                this.toastrService.success( 'Yey! File "'+ namefinal + '" downloaded successfully to your downloads folder.');
            }

            ,
            error=> {
                // this.popToast("error",
                //     "Oops! There was a problem downloading this file. The file does not exist OR you might want to try doing that again."
                // );
                this.toastrService.error("Oops! There was a problem downloading this file. The file does not exist OR you might want to try doing that again.")
            }

        );
    }

    copyFile() {
        // this.popToast("success",
        //     'File "'+ this.tableData[this.rowId].FileName + '" successfully copied'
        // );
        this.toastrService.success( 'File "'+ this.tableData[this.rowId].FileName + '" successfully copied');

        this.rowId=-1;
    }

    // popToast(massage:any, Body:any) {
    //     // 2 arg toast
    //     this.toasterService.pop(massage, Body);
    // }

    // popToastNew(massage:any, Title:any, Body:any) {
    //     // 3 arg toast
    //     this.toasterService.pop(massage, Title, Body);
    // }

    createNewFolder(FolderNameForm:any) {
        // create folder
        this.breadcrumNew=[];
        this.threeDAssetData=[];
        const FolderName=FolderNameForm.value.newFolderName.trim();
        this.spinnerService.show();

        if (FolderName===""|| FolderName===undefined || FolderName===null) {
            // check for empty folder name
            FolderNameForm.form.controls['newFolderName'].setErrors({'required': true});
            this.addNewFolderFlag=false;
            this.spinnerService.hide();
            return;
        }

        this.threeDAssetFolderDetails.UserId=this.userId;
        this.threeDAssetFolderDetails.FolderName=FolderName;
        this.threeDAssetFolderDetails.ParentFolder=this.parentFolder;

        if (this.isEdit==true) {
            this.UploadDone=true;
            this.isObjectCreated=true;
            this.threeDAssestDataFolder=this.parent3DModelFolder+"/"+FolderName;
            this.getAssetData(this.parent3DModelFolder);
            this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);

            // this.spinnerService.hide();
            if (this.isRenameObj==true) {
                this.threeDAssetFolderRenameDetails.Id=this.threeDObjectId;
                this.threeDAssetFolderRenameDetails.UserId=this.userId;
                this.threeDAssetFolderRenameDetails.ParentFolder=this.parentFolder;
                this.threeDAssetFolderRenameDetails.oldFolderName=this.prevFolderName;
                this.threeDAssetFolderRenameDetails.renameFolderName=FolderName;

                this.serviceApi .putData("asset/rename3DAssetFolder/"+ this.userId,
                    this.threeDAssetFolderRenameDetails) .subscribe( // create folder api call

                    (data:any)=> {
                        if (data["status"]) {
                            this.threeDAssestDataFolder=data["data"];
                            this.prevFolderName=this.threeDAssestDataFolder.split("3DModel/"
                            )[1];
                            // this.threeDAssestDataFolder = this.prevFolderName;
                            // this.popToast("success",
                            //     "Done! Your changes are saved successfully."
                            // );
                            this.toastrService.success("Done! Your changes are saved successfully.");

                            this.isEdit=true;
                            this.getAssetData(this.parent3DModelFolder);
                            this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);
                            this.spinnerService.hide();
                            this.isObjectCreated=true;
                            this.isRenameObj=false;
                        }

                        else {
                            // this.popToastNew("error",
                            //     "Rename 3D object",
                            //     "Unable to rename!"
                            // );
                            this.toastrService.error("Unable to rename!","Rename 3D object");
                            this.uploadingFile=false;
                            this.spinnerService.hide();
                            this.isObjectCreated=false;
                            this.isEdit=true;
                        }
                    }

                    ,
                    error=> {
                        // this.popToast("error",
                        //     "Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again."
                        // );
                        this.toastrService.error("Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again.");
                        this.spinnerService.hide();
                        this.uploadingFile=false;
                        this.isObjectCreated=false;
                        this.isEdit=true;
                    }

                );
            }

            const temp= {
                name: FolderName
            }

            ;
            this.breadcrumNew.push(temp);
        }

        else {
            this.serviceApi .postData("asset/Upload3DAssetsByUserId/"+ this.userId,
                this.threeDAssetFolderDetails) .subscribe( // create folder api call

                (data:any)=> {

                    // if (data['body']) {
                    if (data["status"]) {
                        const temp= {
                            name: FolderName
                        }

                        ;
                        this.breadcrumNew.push(temp);
                        var responseData=data["data"];
                        var splitData=responseData.split("@");
                        var objectFolderName=splitData[0];
                        // var objectFolderName = objectFolderNamePath.split("/")[4];
                        var objectFolderId=splitData[1];

                        this.threeDAssestDataFolder=objectFolderName;
                        this.prevFolderName=FolderName;
                        this.threeDObjectId=parseInt(objectFolderId);
                        // this.threeDAssestDataFolder = data['data'];

                        // this.popToast("success",
                        //     "Done! You’ve got a new folder now. Hope you put some awesome files in that."
                        // );
                        this.toastrService.success("Done! You’ve got a new folder now. Hope you put some awesome files in that.");

                        // this.modalRef.hide();

                        this.isEdit=true;
                        this.getAssetData(this.parent3DModelFolder);
                        this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);
                        this.spinnerService.hide();
                        this.isObjectCreated=true;
                        this.isRenameObj=false;
                    }

                    else {
                        // this.popToastNew("error",
                        //     "Create Folder",
                        //     "Folder already exist!"
                        // );
                        this.toastrService.error( "Folder already exist!","Create Folder");
                        // this.modalRef.hide();
                        this.uploadingFile=false;
                        this.spinnerService.hide();
                        this.isObjectCreated=false;
                        this.isEdit=false;
                        // FolderNameForm.reset();
                    }

                    // }
                }

                ,
                error=> {
                    // this.popToast("error",
                    //     "Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again."
                    // );
                    this.toastrService.error( "Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again.");
                    this.spinnerService.hide();
                    this.uploadingFile=false;
                    this.isObjectCreated=false;
                    this.isEdit=false;
                }

            );
        }
        this.deleteMulti=false;
    }

    createNewFolderInModel(FolderNameForm:any) {
        const FolderName=FolderNameForm.value.newFolderInModelName.trim();
        this.spinnerService.show();

        if (FolderName===""|| FolderName===undefined || FolderName===null) {
            // check for empty folder name
            FolderNameForm.form.controls['newFolderInModelName'].setErrors({'required': true});
            this.addNewFolderInFolderFlag=false;
            this.spinnerService.hide();
            return;
        }

        // if (this.folderInModelName != '' || this.folderInModelName != null)
        else {
            const FolderName=this.folderInModelName;

            if (FolderName===""|| FolderName===undefined || FolderName===null) {
                FolderNameForm.form.controls['folderInModelName'].setErrors({'required': true});
                // check for empty folder name
                this.addNewFolderInModelFlag=false;
                this.spinnerService.hide();
                return;
            }

            const formdata: FormData=new FormData(); // create formdata
            formdata.append("UserId", this.userId);
            formdata.append("FolderName", FolderName);
            formdata.append("FileSize", "0");
            formdata.append("ParentFolder", this.threeDAssestDataFolder);
            formdata.append("AssetType", "4"); // assetstype 4 for folder

            this.serviceApi.uploadFile("asset/upload", formdata).subscribe((data:any)=> {
                    // if (data['body']) {

                    if (data["body"]) {
                        if (data["body"]["status"]) {
                            FolderNameForm.reset();
                            // this.popToast("success",
                            //     "Done! You’ve got a new folder now. Hope you put some awesome files in that."
                            // );
                            this.toastrService.success("Done! You’ve got a new folder now. Hope you put some awesome files in that."); 
                            this.getAssetData(this.parent3DModelFolder);
                            this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);
                            $("#popoverClick").trigger("click");
                            this.spinnerService.hide();
                        }

                        else {
                            // this.popToastNew("error",
                            //     "Create Folder",
                            //     "Folder already exist!"
                            // );
                            this.toastrService.error("Folder already exist!","Create Folder");
                            this.spinnerService.hide();
                        }
                    }
                }

                ,
                error=> {
                    // this.popToast("error",
                    //     "Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again."
                    // );
                    this.toastrService.error("Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again.");
                    this.spinnerService.hide();
                }

            );
        }
    }

    objectNameChange(newValue:any) {
        this.newFolderNameModel=newValue;

        if (this.prevFolderName !=newValue) {
            this.isRenameObj=true;
        }

        else {
            this.isRenameObj=false;
        }
    }

    bindModelOnPreviewClick(parentfolder:any) {
        // console.log("parentFolder",parentfolder);
        this.previewModelParent=parentfolder;
        this.experienceCustomizerURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.serviceApi.getExperienceBaseUrl()+"v0.1/verbose/3DAssetLibrary/objectPreview.html?"+Date.now());
        // this.iframeElement = this.renderer2.selectRootElement('iframe');
        // this.iframeElement.contentWindow.location.replace( this.serviceApi.getExperienceBaseUrl() + "v0.1/verbose/3DAssetLibrary/objectPreview.html?"+Date.now());
    }

    bindModel() {
        if (this.threeDAssetData[0] !=""&& this.threeDAssetData[0] !=undefined) {
            this.previewModelParent=this.threeDAssetData[0].ParentFolder;
            this.experienceCustomizerURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.serviceApi.getExperienceBaseUrl()+"v0.1/verbose/3DAssetLibrary/objectPreview.html?"+Date.now());
        }

        // this.iframeElement = this.renderer2.selectRootElement('iframe');
        // this.iframeElement.contentWindow.location.replace( this.serviceApi.getExperienceBaseUrl() + "v0.1/verbose/3DAssetLibrary/objectPreview.html?"+Date.now());
        // const dataToUpdate = {
        //   'parentFolder': this.threeDAssetData[0].ParentFolder
        // };
        // const experienceUpdateData = this.serviceApi.putData('asset/3dAssestModelPreivew', dataToUpdate);
        // experienceUpdateData.subscribe(data => {
        //   this.viewModelData = data;
        //   this.iframeElement.contentWindow.bindModelToIframe(data, this.serviceApi.apiBaseUrl);
        // },
        //   error => {
        //     this.spinnerService.hide();
        //     this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
        //     console.error(error);
        //   });
    }

    dataURLtoFile(dataurl:any, filename:any) {
        // convert dataURL to blob as 'file' does not work in edge
        const arr=dataurl.split(","),
        mime=arr[0].match(/:(.*?); /)[1],
        bstr=atob(arr[1]);
        let n=bstr.length;
        const u8arr=new Uint8Array(n);

        while (n--) {
            u8arr[n]=bstr.charCodeAt(n);
        }

        const blob:any=new Blob([u8arr], {
                type: mime
            }

        );
        blob["name"]=filename;
        blob["lastModifiedDate"]=new Date();
        return blob;
    }

    uploadBase64() {
        // upload cropped spherical image
        this.spinnerService.show();
        const newfile=this.dataURLtoFile(this.croppedImage, this.fileName);
        const formdata: FormData=new FormData();
        formdata.append("UserId", this.userId);
        formdata.append("FolderName", "");
        formdata.append("ParentFolder", this.parentFolder);
        formdata.append("file", newfile);
        const size=newfile.size;
        formdata.append("FileSize", size.toString());
        formdata.append("AssetType", "5");
        formdata.append("name", newfile["name"]);

        this.serviceApi.uploadFile("asset/upload", formdata).subscribe((data:any)=> {
                if (data["body"]) {
                    if (data["body"]["status"]) {
                        // this.popToastNew("success",
                        //     "Asset Library",
                        //     " Uploaded! Ensure you upload all the supporting files for your 3D Object. !"
                        // );
                        this.toastrService.success(" Uploaded! Ensure you upload all the supporting files for your 3D Object. !","Asset Library"); 
                        this.modalRef2.hide();
                        this.getAssetData(this.parent3DModelFolder);
                        this.modalRef.hide();
                        this.uploadingFile=false;
                        $("#fileNamesAssets").html("");
                        this.spinnerService.hide();
                    }

                    else {
                        $("#fileNamesAssets").html("");
                        // this.popToastNew("error",
                        //     "Upload File",
                        //     "Your storage is running out of space!!"
                        // );
                        this.toastrService.error("Your storage is running out of space!!","Upload File")
                        this.spinnerService.hide();
                        this.uploadingFile=false;
                    }
                }

                this.fileUploadFlag=true;
                this.sidePaddingCheck=false;
                this.topPaddingCheck=false;
            }

            ,
            error=> {
                console.error(error);
                $("#fileNamesAssets").html("");
                this.uploadingFile=false;
                // this.popToastNew("error",
                //     "Upload File",
                //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                // );
                this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?","Upload File")
                this.spinnerService.hide();
            }

        );
    }

    addSidePadding() {

        // add side padding while crop
        if (this.sidePaddingCheck) {
            // side padding checkbox checked
            const canvasEl: HTMLCanvasElement=this.canvas.nativeElement;
            let img:any;
            const classObject=this;
            img=new Image();

            img.onload=function() {
                canvasEl.height=this.height;
                canvasEl.width=this.height * 2;
                let width=this.height * 2;
                width=width - this.width;
                width=width / 2;
                this.cx=canvasEl.getContext("2d");
                this.cx.fillStyle="#000000";
                this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                this.cx.drawImage(img, width, 0);
                const data=canvasEl.toDataURL();
                classObject.imageChangedEvent=data;
                classObject.sidePaddingImage=data;
            }

            ;
            img.src=this.imageChangedEvent;
        }

        else {

            // side padding checkbox unckeked
            if (this.topPaddingCheck) {
                // top padding checkbox checked
                const canvasEl: HTMLCanvasElement=this.canvas.nativeElement;
                let imgTop:any;
                const classObject=this;
                imgTop=new Image();

                imgTop.onload=function() {
                    canvasEl.width=this.width;
                    const height=this.height * 0.1;
                    canvasEl.height=this.height+2 * height;
                    this.cx=canvasEl.getContext("2d");
                    this.cx.fillStyle="#000000";
                    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                    this.cx.drawImage(imgTop, 0, height);
                    const data=canvasEl.toDataURL();
                    classObject.imageChangedEvent=data;
                    classObject.topPaddingImage=data;
                }

                ;
                imgTop.src=this.originalImage;
            }

            else {
                // top padding checkbox unchecked
                this.imageChangedEvent=this.originalImage;
            }
        }
    }

    addTopPadding() {
        if (this.topPaddingCheck) {
            const canvasEl: HTMLCanvasElement=this.canvas.nativeElement;
            let img:any;
            const classObject=this;
            img=new Image();

            img.onload=function() {
                canvasEl.width=this.width;
                const height=this.height * 0.1;
                canvasEl.height=this.height+2 * height;
                this.cx=canvasEl.getContext("2d");
                this.cx.fillStyle="#000000";
                this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                this.cx.drawImage(img, 0, height);
                const data=canvasEl.toDataURL();
                classObject.imageChangedEvent=data;
                classObject.topPaddingImage=data;
            }

            ;
            img.src=this.imageChangedEvent;
        }

        else {
            if (this.sidePaddingCheck) {
                const canvasEl: HTMLCanvasElement=this.canvas.nativeElement;
                let imgSide:any;
                const classObject=this;
                imgSide=new Image();

                imgSide.onload=function() {
                    canvasEl.height=this.height;
                    canvasEl.width=this.height * 2;
                    let width=this.height * 2;
                    width=width - this.width;
                    width=width / 2;
                    this.cx=canvasEl.getContext("2d");
                    this.cx.fillStyle="#000000";
                    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                    this.cx.drawImage(imgSide, width, 0);
                    const data=canvasEl.toDataURL();
                    classObject.imageChangedEvent=data;
                    classObject.sidePaddingImage=data;
                }

                ;
                imgSide.src=this.originalImage;
            }

            else {
                this.imageChangedEvent=this.originalImage;
            }
        }
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload=<Array<File>>fileInput.target.files;
        this.UploadDone=false;
        this.showProgressDiv=true;
    }

    uploadNewFile(filesFrom:any, files:any, type:any, thirdModal: TemplateRef<any>) {
        this.fileUploadFlag=false;
        this.fileIndex=0;
        this.validFile=true;
        this.totalFiles=files.length;

        if (files.length===0) {
            this.validFile=false;
            this.uploadingFile=false;
            this.spinnerService.hide();
            return;
        }

        $("#fileNamesAssets").html("");
        $("#fileNamesAssets").show();

        const idArry:any= {}

        ;

        for (let i=0; i < this.totalFiles; i++) {
            let span="";
            let id=files[i].name;
            id=id.split(".");
            id=id[0].replace(/[^a-zA-Z0-9]/g, "_");
            const val=Math.floor(1000 + Math.random() * 9000);
            id=id+"_"+val;
            idArry[files[i].name]=id;
            span='<div class="progress mb-2"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" id="'+id+'"  style="width:2%"><span class="text-overflow-file-upload pull-right text-black">'+files[i].name+"</span></div></div>";
            $("#fileNamesAssets").append(span);
        }

        this.uploadFile(filesFrom, files, type, thirdModal, idArry);
    }

    uploadFile(filesFrom:any, files:any, type:any, thirdModal: TemplateRef<any>, idArry:any) {
        const id=idArry[files[this.fileIndex].name];
        let dup=false;
        let namefinal;

        for (let j=0; j < this.tableData.length; j++) {
            if (this.tableData[j].FileName===files[this.fileIndex].name) {
                if (files[this.fileIndex].name.length >=30) {
                    namefinal=files[this.fileIndex].name.substring(0, 30);
                    namefinal=namefinal+"...";
                }

                else {
                    namefinal=files[this.fileIndex].name;
                }

                // this.popToastNew("error",
                //     "Upload File",
                //     "File with name "+ namefinal + " already exists"
                // );
                this.toastrService.error("File with name "+ namefinal + " already exists","Upload File")
                $("#"+ id).css("width", "100%");
                $("#"+ id).removeClass("progress-bar-animated progress-bar-striped bg-success"
                );
                $("#"+ id).addClass("bg-danger");
                dup=true;
                break;
            }
        }

        if (dup) {
            this.fileIndex++;

            if (this.fileIndex===this.totalFiles) {
                this.spinnerService.hide();
                // $('#fileNamesAssets').html('');
                this.uploadingFile=false;
                this.fileUploadFlag=true;
                this.UploadDone=true;

                if (this.totalFiles===1) {
                    const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptextbottom">File with name '+namefinal+" already exists</span></span>";
                    $("#"+ id).html(str);
                }

                else {
                    const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptext">File with name '+namefinal+" already exists</span></span>";
                    $("#"+ id).html(str);
                }

                filesFrom.reset();
                return;
            }

            const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptextbottom">File with name '+namefinal+" already exists</span></span>";
            $("#"+ id).html(str);
            this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            return;
        }

        let filetype=files[this.fileIndex].name;

        if (filetype.length >=100) {
            // this.popToastNew("error",
            //     "Upload File",
            //     "Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters."
            // );
            this.toastrService.error("Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters.","Upload File")
            $("#"+ id).css("width", "100%");
            $("#"+ id).removeClass("progress-bar-animated progress-bar-striped bg-success"
            );
            $("#"+ id).addClass("bg-danger");

            this.fileIndex++;

            if (this.fileIndex===this.totalFiles) {
                this.spinnerService.hide();
                // $('#fileNamesAssets').html('');
                this.uploadingFile=false;

                this.fileUploadFlag=true;
                this.UploadDone=true;

                if (this.totalFiles===1) {
                    const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptextbottom">File name is too large</span></span>';
                    $("#"+ id).html(str);
                }

                else {
                    const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptext">File name is too large</span></span>';
                    $("#"+ id).html(str);
                }

                filesFrom.reset();
                return;
            }

            const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptextbottom">File name is too large</span></span>';
            $("#"+ id).html(str);
            this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            return;
        }

        filetype=filetype.split(".");
        filetype=filetype[filetype.length - 1];
        filetype=filetype.toLowerCase();
        if(filetype=="glb"){
            filetype="gltf"
        }
        filetype
        if (type==="3DObjectFile") {
            if (filetype==="jpg"|| filetype==="jpeg"|| filetype==="png"|| filetype==="gif"|| filetype==="gltf"|| filetype==="mtl"|| filetype==="obj"|| filetype==="bin" || filetype==="exr" 

            ) {
                this.fileUploadService(filesFrom,
                    files,
                    type,
                    this.fileIndex,
                    idArry,
                    thirdModal,
                    filetype);
            }

            else {
                // this.popToastNew("error",
                //     "Upload File",
                //     "Please upload a valid image file"
                // );
                this.toastrService.error("Please upload a valid image file","Upload File")
                $("#"+ id).css("width", "100%");
                $("#"+ id).removeClass("progress-bar-animated progress-bar-striped bg-success"
                );
                $("#"+ id).addClass("bg-danger");

                this.fileIndex++;

                if (this.fileIndex===this.totalFiles) {
                    this.spinnerService.hide();
                    // $('#fileNamesAssets').html('');
                    this.uploadingFile=false;
                    this.fileUploadFlag=true;
                    this.UploadDone=true;

                    if (this.totalFiles===1) {
                        const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptextbottom">'+files[this.fileIndex - 1].name+" is not a valid image file</span></span>";
                        $("#"+ id).html(str);
                    }

                    else {
                        const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptext">'+files[this.fileIndex - 1].name+" is not a valid image file</span></span>";
                        $("#"+ id).html(str);
                    }

                    // filesFrom.reset();
                    return;
                }

                const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>'+files[this.fileIndex - 1].name+'<span class="tooltiptextbottom">'+files[this.fileIndex - 1].name+" is not a valid image file</span></span>";
                $("#"+ id).html(str);
                this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            }
        }
    }

    fileUploadService(filesFrom:any,
        files:any,
        type:any,
        fileIndex:any,
        idArry:any,
        thirdModal: TemplateRef<any>,
        filetype:any) {
        const formdata: FormData=new FormData();
        formdata.append("UserId", this.userId);
        formdata.append("FolderName", "");

        // formdata.append('ParentFolder', this.parentFolder);this.threeDAssestDataFolder
        if (this.isChildFolder) {
            formdata.append("ParentFolder",
                this.threeDAssestDataFolder + "/"+ this.childFolderName);
        }

        else {
            formdata.append("ParentFolder", this.threeDAssestDataFolder);
        }

        formdata.append("file", files[fileIndex]);
        formdata.append("FileSize", files[fileIndex].size);
        formdata.append("name", files[fileIndex].name);
        const tempName=files[fileIndex].name;
        const id=idArry[tempName];
        /* if (type === 'image') {
       formdata.append('AssetType', '1');
     } else if (type === 'audio') {
       formdata.append('AssetType', '3');
     } else if (type === 'video') {
       formdata.append('AssetType', '2');
     } else if (type === '360image') {
       formdata.append('AssetType', '5');
     } else if (type === '360video') {
       formdata.append('AssetType', '6');
     }*/

        if (filetype==="jpg"|| filetype==="jpeg"|| filetype==="png"|| filetype==="gif"

        ) {
            formdata.append("AssetType", "1");
        }

        else if (filetype==="obj") {
            formdata.append("AssetType", "7");
        }

        else if (filetype==="mtl") {
            formdata.append("AssetType", "8");
        }

        else if (filetype==="gltf") {
            formdata.append("AssetType", "9");
        }

        else {
            formdata.append("AssetType", "11");
        }

        this.serviceApi.uploadFile("asset/upload", formdata).subscribe((data:any)=> {
                if (data.type===HttpEventType.UploadProgress) {
                    const percentDone=Math.round((96 * data.loaded) / data.total);
                    this.uploadProgress=percentDone;
                    $("#"+ id).css("width", percentDone + "%");
                }

                else if (data instanceof HttpResponse) {
                    this.fileIndex++;
                }

                if (data["body"]) {
                    if (data["body"]["status"]) {
                        if (this.totalFiles > this.fileIndex) {
                            const filename=data["body"]["FileName"];
                            $("#"+ id).css("width", "100%");
                            $("#"+ id).removeClass("progress-bar-animated progress-bar-striped"
                            );
                            const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-check"  aria-hidden="true"></i>'+ filename + '<span class="tooltiptextbottom">File '+ filename + " uploaded successfully</span></span>";
                            $("#"+ id).html(str);
                            this.uploadFile(filesFrom, files, type, thirdModal, idArry);

                            if (this.isChildFolder) {
                                this.getChildFolderData();
                            }

                            else {
                                this.getAssetData(this.parent3DModelFolder);
                                this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);
                            }
                        }

                        else {
                            const filename=data["body"]["FileName"];
                            this.fileIndex=0;
                            $("#"+ id).css("width", "100%");
                            $("#"+ id).removeClass("progress-bar-animated progress-bar-striped"
                            );
                            const str='<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-check"  aria-hidden="true"></i>'+ filename + '<span class="tooltiptext">File '+ filename + " uploaded successfully</span></span>";
                            $("#"+ id).html(str);
                            // this.popToastNew("success",
                            //     "Asset Library",
                            //     "Uploaded! Ensure you upload all the supporting files for your 3D Object."
                            // );
                            this.toastrService.success("Uploaded! Ensure you upload all the supporting files for your 3D Object.","Asset Library",)

                            // this.modalRef.hide();
                            if (this.isChildFolder) {
                                this.getChildFolderData();
                            }

                            else {
                                this.getAssetData(this.parent3DModelFolder);
                                this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);
                            }

                            // this.uploadProgress = 0;
                            this.uploadingFile=false;
                            this.spinnerService.hide();
                            filesFrom.reset();
                            this.UploadDone=true;
                            this.showProgressDiv=false;
                        }
                    }

                    else {
                        // this.popToastNew("error",
                        //     "Asset Library",
                        //     "Your storage is running out of space!!"
                        // );
                        this.toastrService.error("Your storage is running out of space!!","Asset Library")
                        // $('#fileNamesAssets').html('');
                        this.uploadingFile=false;
                        this.getAssetData(this.parent3DModelFolder);
                        this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);
                        this.spinnerService.hide();
                        filesFrom.reset();
                        this.UploadDone=true;
                        this.showProgressDiv=false;
                    }
                }

                this.fileUploadFlag=true;
            }

            ,
            error=> {
                this.fileUploadFlag=true;
                // $('#fileNamesAssets').html('');
                this.getAssetData(this.parent3DModelFolder);
                this.uploadingFile=false;
                // this.popToastNew("error",
                //     "Upload File",
                //     "Woooops! Looks like something is not right in here. Can you try doing that again? "
                // );
                this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again? ","Upload File")
                this.spinnerService.hide();
                filesFrom.reset();
                this.UploadDone=true;
                this.showProgressDiv=false;
            }

        );
    }

    imageCropped(image: any) {
        this.croppedImage=image;
    }

    imageLoaded() {
        // show cropper
    }

    loadImageFailed() {
        // show message
    }

    validateFile(fileInput: any) {
        const files=<Array<File>>fileInput.target.files;

        if (files.length !==0) {
            this.validFile=true;
        }

        else {
            this.validFile=false;
        }
    }

    clearThird() {
        this.uploadingFile=false;
        $("#fileNamesAssets").html("");
    }

    doubleClickDelete() {
        this.spinnerService.show();

        // this.popToastNew('success', 'Asset Library', 'Phew! Deleted');
        if (this.threeDAssetChildData[this.rowId].AssetType==="4") {
            // delete single folder
            var parentFolderFullName=this.threeDAssetChildData[ this.rowId].ParentFolder.split("/")[2];
            this.parent3DModelFolder=this.threeDAssetChildData[ this.rowId].ParentFolder;
            // const url = 'asset/delete3DAssetFolder/' + this.userId + '/' + this.threeDAssetChildData[this.rowId].Id + '/' + this.threeDAssetData[this.rowId].FileSize + '/' + parentFolderFullName +
            //   '/' + this.threeDAssetChildData[this.rowId].FileName;

            console.log("child folder", this.threeDAssetChildData[this.rowId]);
            const url="asset/delete3DAssetFolder/"+this.userId;

            var data= {
                ParentFolder: this.threeDAssetChildData[this.rowId].FileUrl,
                    FolderName: this.threeDAssetChildData[this.rowId].FileName,
                    id: this.threeDAssetChildData[this.rowId].Id,
                    FileSize: this.threeDAssetChildData[this.rowId].FileSize
            }

            ;

            this.serviceApi.putData(url, data).subscribe(data=> {
                    if (data["status"]) {
                        this.spinnerService.hide();
                        // this.popToast("success",
                        //     "Done! We have taken care of this file on your storage."
                        // );
                        this.toastrService.success("Done! We have taken care of this file on your storage.")
                        // this.getAssetData(this.parent3DModelFolder);
                        this.getChildFolderData();
                        this.deleteMulti=false;
                    }

                    else {
                        this.spinnerService.hide();
                        // this.popToast("error",
                        //     "Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete."
                        // );
                        this.toastrService.error("Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete.")
                    }
                }

                ,
                error=> {
                    this.spinnerService.hide();
                    // this.popToast("error",
                    //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?")

                }

            );
        }

        else {
            // delete singel file
            const url="asset/deleteAsset/"+this.userId+"/"+this.threeDAssetChildData[this.rowId].Id+"/"+this.threeDAssetChildData[this.rowId].FileSize+"/"+this.threeDAssetChildData[this.rowId].AssetType;

            this.serviceApi.deleteData(url).subscribe(data=> {
                    if (data["status"]) {
                        this.spinnerService.hide();
                        // this.popToast("success",
                        //     "Done! We have taken care of this file on your storage."
                        // );
                        this.toastrService.success("Done! We have taken care of this file on your storage.")
                        // this.getAssetData(this.parent3DModelFolder);
                        this.getChildFolderData();
                        this.deleteMulti=false;
                    }

                    else {
                        this.spinnerService.hide();
                        // this.popToast("error",
                        //     "Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete."
                        // );
                        this.toastrService.error("Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete.")

                    }
                }

                ,
                error=> {
                    this.spinnerService.hide();
                    // this.popToast("error",
                    //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?")

                }

            );
        }
    }

    openChildFolder(Name:any) {
        this.childFolderName=Name;
        this.isChildFolder=true;

        const temp= {
            name: Name
        }

        ;
        this.breadcrumNew.push(temp);
        // this.parentFolder = folder;
        this.getChildFolderData();
    }

    breadcrumClick(index:any) {
        this.breadcrumNew.splice(1, 2);
        this.isChildFolder=false;
    }

    getChildFolderData() {
        this.spinnerService.show();

        const data= {
            ParentFolder: this.threeDAssestDataFolder + "/"+ this.childFolderName,
                UserId: this.userId
        }

        ;
        this.serviceApi.postData("asset/get3DAssetsByDirectory/", data).subscribe( // api call to get data

           ( resData:any)=> {
                this.threeDAssetChildData=resData["data"];
                this.spinnerService.hide();
            }

            ,
            error=> {
                this.spinnerService.hide();
                // this.popToastNew("error", "Folder Data", error);
                this.toastrService.error("Folder Data", error);
            }

        );
    }

    assetDelete() {
        if (this.threeDAssetData[this.rowId].AssetType==="4") {
            // delete single folder

            var folderPath=this.threeDAssetData[this.rowId].FileUrl.replace("images/assets/",
                ""
            );

            const url="asset/delete3DAssetFolder/"+this.userId;

            var data= {
                ParentFolder: this.threeDAssetData[this.rowId].ParentFolder,
                    FolderName: this.threeDAssetData[this.rowId].FileName,
                    id: this.threeDAssetData[this.rowId].Id,
                    FileSize: this.threeDAssetData[this.rowId].FileSize
            }

            ;
            console.log("child folder", this.threeDAssetData[this.rowId]);

            this.serviceApi.putData(url, data).subscribe(data=> {
                    if (data["status"]) {
                        // this.popToast("success",
                        //     "Done! We have taken care of this file on your storage."
                        // );
                        this.toastrService.success("Done! We have taken care of this file on your storage.")
                        // this.getAssetData(this.parent3DModelFolder);
                        this.getAssetDataBy3DObjectName(this.threeDAssetData[this.rowId].ParentFolder);
                        this.deleteMulti=false;
                    }

                    else {
                        // this.popToastNew("error",
                        //     "Delete Folder",
                        //     "Looks like this folder is in use in at least one of your Experizer Experiences. Please unlink this folder from all your Experizer Experiences before you delete."
                        // );
                        this.toastrService.error("Looks like this folder is in use in at least one of your Experizer Experiences. Please unlink this folder from all your Experizer Experiences before you delete.","Delete Folder")
                    }
                }

                ,
                error=> {
                    // this.popToast("error",
                    //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?")

                }

            );
        }

        else {
            // delete singel file
            const url="asset/deleteAsset/"+this.userId+"/"+this.threeDAssetData[this.rowId].Id+"/"+this.threeDAssetData[this.rowId].FileSize+"/"+this.threeDAssetData[this.rowId].AssetType;

            this.serviceApi.deleteData(url).subscribe(data=> {
                    if (data["status"]) {
                        // this.popToast("success",
                        //     "Done! We have taken care of this file on your storage."
                        // );
                        this.toastrService.success("Done! We have taken care of this file on your storage.")

                        // this.getAssetData(this.parent3DModelFolder);
                        this.getAssetDataBy3DObjectName(this.threeDAssestDataFolder);
                        this.deleteMulti=false;
                    }

                    else {
                        // this.popToast("error",
                        //     "Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete."
                        // );
                        this.toastrService.error("Looks like this file isLooks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete.")
                    }
                }

                ,
                error=> {
                    // this.popToast("error",
                    //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?")
                }

            );
        }
    }

    previewModel() {
        this.iframeElement=this.renderer2.selectRootElement("#viewModel");

        if (this.previewModelParent !=""&& this.previewModelParent !=undefined) {
            const dataToUpdate= {
                parentFolder: this.previewModelParent
            }

            ;

            const experienceUpdateData=this.serviceApi.putData("asset/3dAssestModelPreivew",
                dataToUpdate);

            experienceUpdateData.subscribe(data=> {
                    this.viewModelData=data;
                    this.iframeElement.contentWindow.bindModelToIframe(data,
                        this.serviceApi.apiBaseUrl);
                }

                ,
                error=> {
                    this.spinnerService.hide();
                    // this.popToast("error",
                    //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?")
                    console.error(error);
                }

            );
        }
    }

    previewModelFromWizard() {
        this.iframeElement=this.renderer2.selectRootElement("#id_description_iframe"
        );

        if (this.previewModelParent !=""&& this.previewModelParent !=undefined) {
            const dataToUpdate= {
                parentFolder: this.previewModelParent
            }

            ;
            const experienceUpdateData=this.serviceApi.putData("asset/3dAssestModelPreivew",
                dataToUpdate);

            experienceUpdateData.subscribe(data=> {
                    this.viewModelData=data;
                    this.iframeElement.contentWindow.bindModelToIframe(data,
                        this.serviceApi.apiBaseUrl);
                }

                ,
                error=> {
                    this.spinnerService.hide();
                    // this.popToast("error",
                    //     "Woooops! Looks like something is not right in here. Can you try doing that again?"
                    // );
                    this.toastrService.error("Woooops! Looks like something is not right in here. Can you try doing that again?")
                    console.error(error);
                }

            );
        }
    }

    onPopOverHidden() {
        this.addNewFolderFlag=true;
        this.folderInModelName="";
    }
}