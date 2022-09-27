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
    TemplateRef,
    ElementRef,
    ViewChild
} from '@angular/core';
import {
    BsModalService,
    ModalDirective
} from 'ngx-bootstrap/modal';
import {
    BsModalRef
} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {
    ToasterService,
    ToasterConfig
} from 'angular2-toaster';
import {
    ApiService
} from '../services/api.service';
import {
    NavbarService
} from '../services/navbar.service';
import {
    HttpResponse,
    HttpEventType
} from '@angular/common/http';
// import {
//     Ng4LoadingSpinnerService
// } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
    selector: 'app-assets-management',
    templateUrl: './assets-management.component.html',
    styleUrls: ['./assets-management.component.css']
})
export class AssetsManagementComponent implements OnInit {
    @ViewChild('canvas') public canvas !: ElementRef;
    @ViewChild('imageIsspherical') public imageIsspherical !: ElementRef;
    @ViewChild(ModalDirective) thirdModal !: ModalDirective;
    // private cx: CanvasRenderingContext2D;
    validFile!: boolean;
    uploadingFile: boolean;
    fileUploadFlag: boolean;
    fileIndex!: number;
    filesToUpload: Array<File> = [];
    totalFiles!: number;
    parentFolder: any;
    viewToggle!: boolean;
    userId: any;
    originalImage: any;
    deletetype!: string;
    addNewFolderFlag: boolean;
    uploadProgress: any;
    fileName: any;
    isSperical!: boolean;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    baseURL = this.serviceApi.apiBaseUrl;
    private toasterService: ToasterService;
    typeAsset: string;
    assetsSrc: any = '';
    breadcrumArry: any[] = [];
    breadcrumArryPopup: any[] = [];
    modalRef!: BsModalRef;
    modalRef2!: BsModalRef;
    public show!: boolean;
    tableData: any[] = [];
    deleteMulti: boolean;
    multipleDelete!: boolean;
    rowId: any;
    tooltipData!: any[];
    newFolderNameModel: string;
    uploadNewFileInputModel!: File;
    assetsType: any;
    sidePaddingImage: any = '';
    topPaddingImage: any = '';
    sidePaddingCheck!: boolean;
    topPaddingCheck!: boolean;
    UploadDone: boolean;
    constructor(private modalService: BsModalService, private toastrService:ToastrService,toasterService: ToasterService, private serviceApi: ApiService,
        private _elementRef: ElementRef, public nav: NavbarService, private spinnerService: NgxSpinnerService) { // private spinnerService: Ng4LoadingSpinnerService) 
        this.toasterService = toasterService;
        this.typeAsset = 'Image';
        this.deleteMulti = false;
        this.addNewFolderFlag = true;
        this.newFolderNameModel = '';
        this.fileUploadFlag = true;
        this.uploadingFile = false;
        this.UploadDone = false;
    }
    ngOnInit() {
        this.validFile = true;
        this.userId = window.sessionStorage.getItem('userId');
        this.parentFolder = window.sessionStorage.getItem('ParentFolder');
        this.fileIndex = 0;
        this.totalFiles = 0;
        this.viewToggle = false;
        this.show = false;
        this.nav.show();
        this.tooltipData = [{
            newFolder: 'Create Folder',
            uploadFile: 'Upload File',
            deleteSelecte: 'Delete',
            deleteFile: 'Delete',
            deleteFolder: 'Delete',
            download: 'Download',
            copy: 'Copy File',
            renameFolder: 'Rename Folder',
            renameFile: 'Rename File',
            selectAll: 'Check All'
        }];
        this.getAssetData(this.parentFolder);
        const temp = {
            name: 'Home',
            url: this.parentFolder,
            index: 0
        };
        this.breadcrumArry.push(temp);
    }
    openModal(template: TemplateRef<any>) {// open small modal
        this.modalRef = this.modalService.show(template, {
            class: 'modal-sm modal-sm-content-radius',
            ignoreBackdropClick: true
        });
    }
    lgModal(template: TemplateRef<any>) {// open other large modal
        this.modalRef = this.modalService.show(template, {
            class: 'modal-lg modal-content-radius',
            ignoreBackdropClick: true
        });
    }
    normalModal(template: TemplateRef<any>) {// open normal modal
        this.modalRef = this.modalService.show(template, {
            class: 'modal-content-radius',
            ignoreBackdropClick: true
        });
    }
    lgModal2(template: TemplateRef<any>) {// open large modal for spherical
        this.modalRef2 = this.modalService.show(template, {
            class: 'modal-lg modal-content-radius',
            ignoreBackdropClick: true
        });
    }
    getAssetData(folder: any) {// get all assets data from database
        this.spinnerService.show();
        const data = {
            'ParentFolder': folder,
            'UserId': this.userId
        };
        this.parentFolder = folder;
        this.serviceApi.postData('asset/getAssetsByDirectory/', data).subscribe(// api call to get data
            (resData: any) => {
                this.tableData = resData['data'];
                this.spinnerService.hide();
            },
            error => {
                this.spinnerService.hide();
                // this.popToastNew('error', 'Folder Data', error);
                this.toastrService.error(error,'Folder Data');
            });
    }
    breadcrumPush(pushUrl: any, Name: any) {// push in to breadcrum array
        if (this.breadcrumArry[this.breadcrumArry.length - 1].url !== pushUrl) {
            const temp = {
                name: Name,
                url: pushUrl,
                index: this.breadcrumArry.length
            };
            this.breadcrumArry.push(temp);
        } else {
        }
    }
    breadcrumpop(index: any) {// pop from breadcrum array
        this.breadcrumArry.splice(index + 1, this.breadcrumArry.length - index);
        this.getAssetData(this.breadcrumArry[index].url);
    }
    confirm(): void {
        this.modalRef.hide();
    }
    decline(): void {
        this.modalRef.hide();
    }
    toggle(event: any) {// select unselect row to delete
        const target = event.target;
        const idAttr = target.attributes.id.value;
        let id = idAttr.split('-');
        id = id[1];
        let j = 0;
        if (this.tableData[id].checked) {// toggle the selected row
            this.tableData[id].checked = false;
        } else {
            this.tableData[id].checked = true;
        }
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].checked) {
                j++;
            }
        }
        if (j > 0) {// hide show delete option in header
            this.deleteMulti = true;
        } else {
            this.deleteMulti = false;
        }
        if (this.tableData.length === j) {
            this.tooltipData[0].selectAll = 'Uncheck all';
        } else {
            this.tooltipData[0].selectAll = 'Check all';
        }
    }
    selectAll() {// select all checkbox
        let j = 0;
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].checked) {
                j++;
            }
        }
        if (this.tableData.length !== j) {// select all
            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].checked = true;
            }
            this.deleteMulti = true;
            this.tooltipData[0].selectAll = 'Uncheck all';
        } else {// unselect all
            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].checked = false;
            }
            this.deleteMulti = false;
            this.tooltipData[0].selectAll = 'Check all';
        }
    }
    deleteSelected() {// delete the file/files
        if (this.multipleDelete) {// delete multiple files
            const deleteArray = [];
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].checked) {
                    const temp = {
                        Id: this.tableData[i].Id,
                        FileSize: this.tableData[i].FileSize,
                        AssetType: this.tableData[i].AssetType
                    };
                    deleteArray.push(temp);
                }
            }
            const url = 'asset/deleteMultipleAsset/' + this.userId;
            this.serviceApi.deleteMultipleData(url, deleteArray).subscribe(// api call to delete
                (data:any) => {
                    if (data['status']) {
                        // this.popToast('success', 'Done! We have taken care of this files on your storage.');
                        this.toastrService.success('Done! We have taken care of this files on your storage.');
                        this.getAssetData(this.parentFolder);
                        this.multipleDelete = false;
                        this.deleteMulti = false;
                    } else {
                        // this.popToastNew('error', 'Delete File/Folder', 'Looks like this file/folder is in use in at least one of your Experizer Experiences. Please unlink this file/Folder from all your Experizer Experiences before you delete.');
                           this.toastrService.error('Looks like this file/folder is in use in at least one of your Experizer Experiences. Please unlink this file/Folder from all your Experizer Experiences before you delete.','Delete File/Folder', );
                    }
                },
                error => {
                    // this.popToastNew('error', 'Delete File/Folder', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                    this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?','Delete File/Folder');
                }
            );
        } else {
            if (this.tableData[this.rowId].AssetType === '4') {// delete single folder
                const url = 'asset/deleteAsset/' + this.userId + '/' + this.tableData[this.rowId].Id + '/' + this.tableData[this.rowId].FileSize +
                    '/' + this.tableData[this.rowId].AssetType;
                this.serviceApi.deleteData(url).subscribe(
                    (data:any) => {
                        if (data['status']) {
                            // this.popToast('success', 'Done! We have taken care of this file on your storage.');
                            this.toastrService.success( 'Done! We have taken care of this file on your storage.');
                            this.getAssetData(this.parentFolder);
                            this.deleteMulti = false;
                        } else {
                            // this.popToastNew('error', 'Delete Folder', 'Looks like this folder is in use in at least one of your Experizer Experiences. Please unlink this folder from all your Experizer Experiences before you delete.');
                            this.toastrService.error( 'Looks like this folder is in use in at least one of your Experizer Experiences. Please unlink this folder from all your Experizer Experiences before you delete.', 'Delete Folder');
                        }
                    },
                    error => {
                        // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                        this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                    }
                );
            } else {// delete singel file
                const url = 'asset/deleteAsset/' + this.userId + '/' + this.tableData[this.rowId].Id + '/' + this.tableData[this.rowId].FileSize + '/' + this.tableData[this.rowId].AssetType;
                this.serviceApi.deleteData(url).subscribe(
                    (data:any) => {
                        if (data['status']) {
                            // this.popToast('success', 'Done! We have taken care of this file on your storage.');
                            this.toastrService.success( 'Done! We have taken care of this file on your storage.');
                            this.getAssetData(this.parentFolder);
                            this.deleteMulti = false;
                        } else {
                            // this.popToast('error', 'Looks like this file is Looks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete.');
                            this.toastrService.error( 'Looks like this file is Looks like this file is in use in at least one of your Experizer Experiences. Please unlink this file from all your Experizer Experiences before you delete.');
                        }
                    },
                    error => {
                        // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                        this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                    }
                );
            }
        }
        this.modalRef.hide();
        this.multipleDelete = false;
        this.rowId = -1;
    }
    downloadFile(url: any) {// download file
        let name = url.split('/');
        var namefinal: any;
        name = name[name.length - 1];
        if (name.length >= 24) {
            namefinal = name.substring(0, 24);
            namefinal = namefinal + '...';
        } else {
            namefinal = name;
        }
        // this.popToast('info', 'Yey! File "' + namefinal + '" has started downloading.');
        this.toastrService.info( 'Yey! File "' + namefinal + '" has started downloading.');
        this.serviceApi.downloadFile(url).subscribe(// download api call
            (data:any) => {
                FileSaver.saveAs(data, name);
                // this.popToast('success', 'Yey! File "' + namefinal + '" downloaded successfully to your downloads folder.');
                this.toastrService.success('Yey! File "' + namefinal + '" downloaded successfully to your downloads folder.');
            },
            error => {
               // this.popToast('error', 'Oops! There was a problem downloading this file. The file does not exist OR you might want to try doing that again.');
               this.toastrService.error('Oops! There was a problem downloading this file. The file does not exist OR you might want to try doing that again.');
            }
        );
    }
    copyFile() {
        // this.popToast('success', 'File "' + this.tableData[this.rowId].FileName + '" successfully copied');
        this.toastrService.success('File "' + this.tableData[this.rowId].FileName + '" successfully copied');
        this.rowId = -1;
    }
    // popToast(massage:any, Body: any) {// 2 arg toast
    //     this.toasterService.pop(massage, Body);
    // }
    // popToastNew(massage: any, Title: any, Body: any) {// 3 arg toast
    //     this.toasterService.pop(massage, Title, Body);
    // }

    createNewFolder(FolderNameForm: any) {// create folder
        const FolderName = FolderNameForm.value.newFolderName.trim();
        this.spinnerService.show();
        if (FolderName === '' || FolderName === undefined || FolderName === null) {// check for empty folder name
            this.addNewFolderFlag = false;
            FolderNameForm.value.newFolderNameModel  ='';
            FolderNameForm.form.controls['newFolderName'].setErrors({'required': true});
            this.spinnerService.hide();
            return;
        }
        const formdata: FormData = new FormData();// create formdata
        formdata.append('UserId', this.userId);
        formdata.append('FolderName', FolderName);
        formdata.append('FileSize', '0');
        formdata.append('ParentFolder', this.parentFolder);
        formdata.append('AssetType', '4'); // assetstype 4 for folder
        this.serviceApi.uploadFile('asset/upload', formdata).subscribe(// create folder api call
            (data:any) => {
                if (data['body']) {
                    if (data['body']['status']) {
                        FolderNameForm.reset();
                        //this.popToast('success', 'Done! You\’ve got a new folder now. Hope you put some awesome files in that.');
                        this.toastrService.success( 'Done! You\’ve got a new folder now. Hope you put some awesome files in that.');
                        this.modalRef.hide();
                        this.getAssetData(this.parentFolder);
                        this.spinnerService.hide();
                    } else {
                        // this.popToastNew('error', 'Create Folder', 'Folder already exist!');
                        this.toastrService.error('Folder already exist!','Create Folder');
                        this.modalRef.hide();
                        this.uploadingFile = false;
                        this.spinnerService.hide();
                        FolderNameForm.reset();
                    }
                }
            },
            error => {
                // this.popToast('error', 'Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again.');
                this.toastrService.error('Oops! No Folder for you! Could not create a new Folder. Looks like you might have to try again.');
                this.spinnerService.hide();
                this.uploadingFile = false;
            }
        );
    }

    dataURLtoFile(dataurl: any, filename: any) {// convert dataURL to blob as 'file' does not work in edge
        const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const blob: any = new Blob([u8arr], {
            type: mime
        });
        blob['name'] = filename;
        blob['lastModifiedDate'] = new Date();
        return blob;
    }
    uploadBase64() {// upload cropped spherical image
        this.spinnerService.show();
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
        this.serviceApi.uploadFile('asset/upload', formdata).subscribe(
            (data:any) => {
                if (data['body']) {
                    if (data['body']['status']) {
                        // this.popToastNew('success', 'Asset Library', 'Phew! Uploaded! This assets is now ready to be use in your Experizer Experiences.');
                        this.toastrService.success('Phew! Uploaded! This assets is now ready to be use in your Experizer Experiences.','Asset Library');
                        this.modalRef2.hide();
                        this.getAssetData(this.parentFolder);
                        this.modalRef.hide();
                        this.uploadingFile = false;
                        $('#fileNamesAssets').html('');
                        this.spinnerService.hide();
                    } else {
                        $('#fileNamesAssets').html('');
                        // this.popToastNew('error', 'Upload File', 'Your storage is running out of space!!');
                        this.toastrService.error('Your storage is running out of space!!', 'Upload File');
                        this.spinnerService.hide();
                        this.uploadingFile = false;
                    }
                }
                this.fileUploadFlag = true;
                this.sidePaddingCheck = false;
                this.topPaddingCheck = false;
            },
            error => {
                console.error(error);
                $('#fileNamesAssets').html('');
                this.uploadingFile = false;
                // this.popToastNew('error', 'Upload File', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
                this.toastrService.error( 'Woooops! Looks like something is not right in here. Can you try doing that again?', 'Upload File');
                this.spinnerService.hide();
            }
        );
    }

    addSidePadding() {// add side padding while crop
        if (this.sidePaddingCheck) {// side padding checkbox checked
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            let img: any;
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
        } else {// side padding checkbox unckeked
            if (this.topPaddingCheck) {// top padding checkbox checked
                const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
                let imgTop: any;
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
            } else {// top padding checkbox unchecked
                this.imageChangedEvent = this.originalImage;
            }
        }
    }

    addTopPadding() {
        if (this.topPaddingCheck) {
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            let img: any;
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
                let imgSide: any;
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
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    uploadNewFile(filesFrom: any, files: any, type: any, thirdModal: TemplateRef<any>) {
        this.fileUploadFlag = false;
        this.fileIndex = 0;
        this.validFile = true;
        this.totalFiles = files.length;
        if (files.length === 0) {
            this.validFile = false;
            this.uploadingFile = false;
            this.spinnerService.hide();
            return;
        }
        $('#fileNamesAssets').html('');
        $('#fileNamesAssets').show();
        // const idArry = {};
        const idArry:{[key: string]: any[]} = {};
        for (let i = 0; i < this.totalFiles; i++) {
            let span = '';
            let id = files[i].name;
            id = id.split('.');
            id = id[0].replace(/[^a-zA-Z0-9]/g, '_');
            const val = Math.floor(1000 + Math.random() * 9000);
            id = id + '_' + val;
            idArry[files[i].name] = id;
            span = '<div class="progress mb-2"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" id="' + id + '"  style="width:2%"><span class="text-overflow-file-upload pull-right text-black">' + files[i].name + '</span></div></div>';
            $('#fileNamesAssets').append(span);

        }
        this.uploadFile(filesFrom, files, type, thirdModal, idArry);
    }
    uploadFile(filesFrom: any, files: any, type: any, thirdModal: TemplateRef<any>, idArry: any) {

        const id = idArry[files[this.fileIndex].name];
        let dup = false;
        let namefinal;
        for (let j = 0; j < this.tableData.length; j++) {
            if (this.tableData[j].FileName === files[this.fileIndex].name) {
                if (files[this.fileIndex].name.length >= 30) {

                    namefinal = files[this.fileIndex].name.substring(0, 30);
                    namefinal = namefinal + '...';
                } else {
                    namefinal = files[this.fileIndex].name;
                }

                //this.popToastNew('error', 'Upload File', 'File with name ' + namefinal + ' already exists');
                this.toastrService.error ( 'File with name ' + namefinal + ' already exists','Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');
                dup = true;
                break;
            }
        }
        if (dup) {
            this.fileIndex++;
            if (this.fileIndex === this.totalFiles) {
                this.spinnerService.hide();
                // $('#fileNamesAssets').html('');
                this.uploadingFile = false;
                this.fileUploadFlag = true;
                this.UploadDone = true;
                if (this.totalFiles === 1) {
                    const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptextbottom">File with name ' + namefinal + ' already exists</span></span>';
                    $('#' + id).html(str);
                } else {
                    const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptext">File with name ' + namefinal + ' already exists</span></span>';
                    $('#' + id).html(str);
                }
                filesFrom.reset();
                return;

            }
            const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex - 1].name + '<span class="tooltiptextbottom">File with name ' + namefinal + ' already exists</span></span>';
            $('#' + id).html(str);
            this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            return;
        }
        let filetype = files[this.fileIndex].name;
       var  fileNames= filetype.split('.').slice(0, -1).join('.');
        if (fileNames.length > 100) {
            // this.popToastNew('error', 'Upload File', 'Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters.');
           this.toastrService.error( 'Wooops! Your file name needs to be a bit shorter. Rename the file to keep the name within 100 characters.', 'Upload File');
            $('#' + id).css('width', '100%');
            $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
            $('#' + id).addClass('bg-danger');

            this.fileIndex++;
            if (this.fileIndex === this.totalFiles) {
                this.spinnerService.hide();
                // $('#fileNamesAssets').html('');
                this.uploadingFile = false;
                
                this.fileUploadFlag = true;
                this.UploadDone = true;
                if (this.totalFiles === 1) {
                    const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptextbottom">File name is too large</span></span>';
                    $('#' + id).html(str);
                } else {
                    const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptext">File name is too large</span></span>';
                    $('#' + id).html(str);
                }
                
                filesFrom.reset();
                return;
            }
            const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex - 1].name + '<span class="tooltiptextbottom">File name is too large</span></span>';
            $('#' + id).html(str);
            this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            return;
        }
        filetype = filetype.split('.');
        filetype = filetype[filetype.length - 1];
        filetype = filetype.toLowerCase();
        if (type === 'image') {
            if (filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png' || filetype === 'gif') {
                this.fileUploadService(filesFrom, files, type, this.fileIndex, idArry, thirdModal);
            } else {
                // this.popToastNew('error', 'Upload File', 'Please upload a valid image file');
                this.toastrService.error( 'Please upload a valid image file','Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');

                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    // $('#fileNamesAssets').html('');
                    this.uploadingFile = false;
                    this.fileUploadFlag = true;
                    this.UploadDone = true;
                    if (this.totalFiles === 1) {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex-1].name + ' is not a valid image file</span></span>';
                    $('#' + id).html(str);
                    } else {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptext">' + files[this.fileIndex-1].name + ' is not a valid image file</span></span>';
                    $('#' + id).html(str);
                    }
                    
                    filesFrom.reset();
                    return;
                }
                const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex - 1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex - 1].name + ' is not a valid image file</span></span>';
                $('#' + id).html(str);
                this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            }
        } else if (type === 'audio') {
            if (filetype === 'mp3' || filetype === 'ogg' || filetype === 'm4a' || filetype === 'wav') {
                this.fileUploadService(filesFrom, files, type, this.fileIndex, idArry, thirdModal);
            } else {
                // this.popToastNew('error', 'Upload File', 'Please upload a valid audio file');
                this.toastrService.error('Please upload a valid audio file','Upload File' );
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');

                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    // $('#fileNamesAssets').html('');
                    this.uploadingFile = false;
                    this.fileUploadFlag = true;
                    this.UploadDone = true;
                    if (this.totalFiles === 1) {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex-1].name + ' is not a valid audio file</span></span>';
                    $('#' + id).html(str);
                    } else {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptext">' + files[this.fileIndex-1].name + ' is not a valid audio file</span></span>';
                    $('#' + id).html(str);
                    }
                   
                    filesFrom.reset();
                    return;
                }
                const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex - 1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex - 1].name + ' is not a valid audio file</span></span>';
                $('#' + id).html(str);
                this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            }
        } else if (type === 'video') {
            if (filetype === 'mp4' || filetype === '3gp' || filetype === 'avi') {
                this.fileUploadService(filesFrom, files, type, this.fileIndex, idArry, thirdModal);
            } else {
                // this.popToastNew('error', 'Upload File', 'Please upload a valid video file');
                this.toastrService.error('Please upload a valid video file', 'Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');

                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    // $('#fileNamesAssets').html('');
                    this.uploadingFile = false;
                    this.fileUploadFlag = true;
                    this.UploadDone = true;
                    if (this.totalFiles === 1) {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex-1].name + ' is not a valid video file</span> </span>';
                    $('#' + id).html(str);
                    } else {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptext">' + files[this.fileIndex-1].name + ' is not a valid video file</span> </span>';
                    $('#' + id).html(str);
                    }
                    
                    filesFrom.reset();
                    return;
                }
                const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex - 1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex - 1].name + ' is not a valid video file</span> </span>';
                $('#' + id).html(str);
                this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            }
        } else if (type === '360image') {
            if (filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png' || filetype === 'gif') {
                if ($('#imageIssphericalId').is(':checked')) {
                    const myReader: FileReader = new FileReader();
                    myReader.onloadend = (e) => {
                        this.imageChangedEvent = myReader.result;
                        this.originalImage = this.imageChangedEvent;
                        this.fileName = files[0].name;
                        this.lgModal2(thirdModal);
                        this.spinnerService.hide();
                    };
                    myReader.readAsDataURL(files[0]);
                } else {
                    this.fileUploadService(filesFrom, files, type, this.fileIndex, idArry, thirdModal);
                }
            } else {
                // this.popToastNew('error', 'Upload File', 'Please upload a valid image file');
                this.toastrService.error( 'Please upload a valid image file','Upload File');
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');

                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    // $('#fileNamesAssets').html('');
                    this.uploadingFile = false;
                    this.fileUploadFlag = true;
                    this.UploadDone = true;
                    if (this.totalFiles === 1) {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex-1].name + ' is not a valid image file</span></span>';
                    $('#' + id).html(str);
                    } else {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptext">' + files[this.fileIndex-1].name + ' is not a valid image file</span></span>';
                    $('#' + id).html(str);
                    }
                    
                    filesFrom.reset();
                    return;
                }
                const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex - 1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex - 1].name + ' is not a valid image file</span></span>';
                $('#' + id).html(str);
                this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            }
        } else if (type === '360video') {
            if (filetype === 'mp4' || filetype === '3gp' || filetype === 'avi') {
                this.fileUploadService(filesFrom, files, type, this.fileIndex, idArry, thirdModal);
            } else {
                // this.popToastNew('error', 'Upload File', 'Please upload a valid video file');
                this.toastrService.error( 'Please upload a valid video file', 'Upload File')
                $('#' + id).css('width', '100%');
                $('#' + id).removeClass('progress-bar-animated progress-bar-striped bg-success');
                $('#' + id).addClass('bg-danger');

                this.fileIndex++;
                if (this.fileIndex === this.totalFiles) {
                    this.spinnerService.hide();
                    // $('#fileNamesAssets').html('');
                    this.uploadingFile = false;
                    this.fileUploadFlag = true;
                    this.UploadDone = true;
                    if (this.totalFiles === 1) {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex-1].name + ' is not a valid video file</span></span>';
                        $('#' + id).html(str);
                    } else {
                        const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex-1].name + '<span class="tooltiptext">' + files[this.fileIndex-1].name + ' is not a valid video file</span></span>';
                    $('#' + id).html(str);
                    }
                    
                    filesFrom.reset();
                    return;
                }
                const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-times" aria-hidden="true"></i>' + files[this.fileIndex - 1].name + '<span class="tooltiptextbottom">' + files[this.fileIndex - 1].name + ' is not a valid video file</span></span>';
                $('#' + id).html(str);
                this.uploadFile(filesFrom, files, type, thirdModal, idArry);
            }
        }
    }

    fileUploadService(filesFrom: any, files: any, type: any, fileIndex: any, idArry: any, thirdModal: TemplateRef<any>) {

        const formdata: FormData = new FormData();
        formdata.append('UserId', this.userId);
        formdata.append('FolderName', '');
        formdata.append('ParentFolder', this.parentFolder);
        formdata.append('file', files[fileIndex]);
        formdata.append('FileSize', files[fileIndex].size);
        formdata.append('name', files[fileIndex].name);
        const tempName = files[fileIndex].name;
        const id = idArry[tempName];
        if (type === 'image') {
            formdata.append('AssetType', '1');
        } else if (type === 'audio') {
            formdata.append('AssetType', '3');
        } else if (type === 'video') {
            formdata.append('AssetType', '2');
        } else if (type === '360image') {
            formdata.append('AssetType', '5');
        } else if (type === '360video') {
            formdata.append('AssetType', '6');
        }
        this.serviceApi.uploadFile('asset/upload', formdata).subscribe(
            (data:any) => {
                if (data.type === HttpEventType.UploadProgress) {
                    const percentDone = Math.round(96 * data.loaded / data.total);
                    this.uploadProgress = percentDone;
                    $('#' + id).css('width', percentDone + '%');
                } else if (data instanceof HttpResponse) {
                    this.fileIndex++;
                }
                if (data['body']) {
                    if (data['body']['status']) {
                        if ((this.totalFiles) > this.fileIndex) {
                            const filename = data['body']['FileName'];
                            $('#' + id).css('width', '100%');
                            $('#' + id).removeClass('progress-bar-animated progress-bar-striped');
                            const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-check"  aria-hidden="true"></i>' + filename + '<span class="tooltiptextbottom">File ' + filename + ' uploaded successfully</span></span>';
                            $('#' + id).html(str);
                            this.uploadFile(filesFrom, files, type, thirdModal, idArry);
                            this.getAssetData(this.parentFolder);
                        } else {
                            const filename = data['body']['FileName'];
                            this.fileIndex = 0;
                            $('#' + id).css('width', '100%');
                            $('#' + id).removeClass('progress-bar-animated progress-bar-striped');
                            const str = '<span class="text-overflow-file-upload pull-right text-black tooltipcus"><i class="fa fa-check"  aria-hidden="true"></i>' + filename + '<span class="tooltiptext">File ' + filename + ' uploaded successfully</span></span>';
                            $('#' + id).html(str);
                            // this.popToastNew('success', 'Asset Library', 'Phew! Uploaded! This assets is now ready to be use in your Experizer Experiences.');
                           this.toastrService.success('Phew! Uploaded! This assets is now ready to be use in your Experizer Experiences.', 'Asset Library')
                            // this.modalRef.hide();
                            this.getAssetData(this.parentFolder);
                            // this.uploadProgress = 0;
                            this.uploadingFile = false;
                            this.spinnerService.hide();
                            filesFrom.reset();
                            this.UploadDone = true;
                        }
                    } else {
                        // this.popToastNew('error', 'Asset Library', 'Your storage is running out of space!!');
                        this.toastrService.error ('Your storage is running out of space!!', 'Asset Library');
                        // $('#fileNamesAssets').html('');
                        this.uploadingFile = false;
                        this.getAssetData(this.parentFolder);
                        this.spinnerService.hide();
                        filesFrom.reset();
                        this.UploadDone = true;
                    }
                }
                this.fileUploadFlag = true;
            },
            error => {
                this.fileUploadFlag = true;
                // $('#fileNamesAssets').html('');
                this.getAssetData(this.parentFolder);
                this.uploadingFile = false;
                // this.popToastNew('error', 'Upload File', 'Woooops! Looks like something is not right in here. Can you try doing that again? ');
                this.toastrService.error ('Woooops! Looks like something is not right in here. Can you try doing that again? ', 'Upload File');
                this.spinnerService.hide();
                filesFrom.reset();
                this.UploadDone = true;
            }
        );
    }
    imageCropped(image: any) {
        this.croppedImage = image;
    }
    imageLoaded() {
        // show cropper
    }
    loadImageFailed() {
        // show message
    }
    validateFile(fileInput: any) {
        const files = <Array<File>>fileInput.target.files;
        if (files.length !== 0) {
            this.validFile = true;
        } else {
            this.validFile = false;
        }
    }
    clearThird() {
        this.uploadingFile = false;
        $('#fileNamesAssets').html('');
    }
}
