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
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ApiService } from '../services/api.service';
import { NavbarService } from '../services/navbar.service';
import { PatronFilterDetail, PatronAddDetail } from './../data-model/formData.component';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { DatePipe } from '@angular/common';
declare var require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
declare var $: any;
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-patron-management',
  templateUrl: './patron-management.component.html',
  styleUrls: ['./patron-management.component.css']
})
export class PatronManagementComponent implements OnInit {
  @ViewChild('canvas') public canvas!: ElementRef;
  private cx!: CanvasRenderingContext2D;
  PatronFilterDetail: PatronFilterDetail;
  PatronAddDetail: PatronAddDetail;
  private toasterService: ToasterService;
  tableData: any;
  tableData1: any;
  modalRef!: BsModalRef;
  result: any;
  tooltipData: any[];
  menuItemsFiterStatus: any[];
  dropdownSelectedStatusValue: string;
  totalNumberOfPatron: any;
  deletePatronById: any;
  deletePatronStatus: any;
  patronFilterActiveStatus: any;
  patronFilterInactiveStatus: any;
  patronFilterAllStatus: any;
  tableDataLengthCount: any;
  noDataDisplayFlag: any;
  cardTotalNumberOfPatron: any;
  cardInvitedNumberOfPatron: any;
  cardRegisteredNumberOfPatron: any;
  cardActiveNumberOfPatron: any;
  updateStatusId: any;
  changePatronStatus: any;
  patronAddResponse: any;
  invalidNameFlag: any;
  invalidNameId: any;
  editiedName: any;
  patronEditiedName: any;
  addPatronSubmitted: boolean;
  editNameFlag: boolean;
  alertMessage: string;
  addPatronDisabled: boolean;
  chkEmailResLength: any;
  editMode: any;
  added: boolean = false;
  csvFileName: any;
  reportModalPatronId!: number;
  PatronVerboseDataFlag: any;
  PatronReportForm: any;
  PatronVerboseData: any;
  reportModalPatronName!: string;
  radioValue: any;
  imgData: any;
  csvFileFlag: boolean;
  imgProfile: any;
  logodataURI: any;
  tempData: any;
  ExpDetailList: any;
  expTableDataLengthCount!: number;
  noExpDataDisplayFlag: any;
  activeCount: number;
  detailPatronId!: number;
  publishedExpDetailId!: number;
  publishedExpValue!: string;
  verboseDetailDownloadData: any;
  ProfileExpOpenList: any;
  patronStatusId: number;
  noFilterDataFlag: any;
  applyClick: string;
  importBulkPatronResponse: any;
  csvFileExtension: any;
  ProfileImageUrl: any;
  resultData:any;
  tempDataVerbose: any;
  // PatronFilterDetail.Status: any;
  totalRec!: number;
  page: number = 1;
  UserId!: number;

  verboseProfileData: any;
  verboseRoomInfo: any;
  constructor(private toastrService:ToastrService,private modalService: BsModalService, private patronService: ApiService, public nav: NavbarService,
    toasterService: ToasterService, private spinnerService:NgxSpinnerService, private serviceApi: ApiService) {
    this.toasterService = toasterService;
    this.result = '';
    this.dropdownSelectedStatusValue = '';
    this.totalNumberOfPatron = '';
    this.deletePatronStatus = '';
    this.patronFilterActiveStatus = '';
    this.patronFilterInactiveStatus = '';
    this.patronFilterAllStatus = '';
    this.tableDataLengthCount = '';
    this.noDataDisplayFlag = true;
    this.cardTotalNumberOfPatron = '';
    this.updateStatusId = '';
    this.changePatronStatus = '';
    this.patronAddResponse = '';
    this.invalidNameFlag = false;
    this.invalidNameId = '';
    this.editiedName = '';
    this.patronEditiedName = '';
    this.addPatronSubmitted = true;
    this.editNameFlag = false;
    this.alertMessage = 'Enter Name';
    this.addPatronDisabled = false;
    this.tableData1 = '';
    this.tooltipData = [{
      addPatron: 'Add New Patron',
      deletePatron: 'Remove this Patron from your account. Note that the Patron will immediately loose access to all your Published Experiences.',
      editPatron: 'Update Patron details',
      download: 'Download a summary of this Patron\'s activity with your Published Experiences',
      RevokeAcces: 'Revoke the access for this Patron for your Published Experiences',
      RestoreAccess: 'Restore the access for this Patron for your Published Experiences'
    }
    ];
    this.menuItemsFiterStatus = [
      { id: 1, name: 'All' },
      { id: 2, name: 'Active' },
      { id: 3, name: 'Inactive' }
    ];
    this.patronStatusId = this.menuItemsFiterStatus[0]['id'];
    this.PatronFilterDetail = new PatronFilterDetail();
    this.PatronAddDetail = new PatronAddDetail();

    this.editMode = -1;
    this.csvFileName = null;
    this.csvFileFlag = false;

    this.activeCount = 0;
    this.noFilterDataFlag = false;
    this.applyClick = '';
    //console.log('apply const ckick:', this.applyClick );
    this.importBulkPatronResponse = null;
    this.csvFileExtension = null;
    //PatronFilterDetail.Status = 1;
  }

  ngOnInit() {
    this.logodataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAwCAYAAABUmTXqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAHVFJREFUeNrsXQmUXFWZvm+rvaq7urt6S68JW/CIyBaCQmQi4sI4IIujwwEURI56FAXlKMgM5wDioLgwqOiAQ5CZg2gQYRQRcwTBKCOyeNiydyfpvbq6a+uqett8/33vdao771VVJ5WApG7yuqpe3XeX//77/99bwluOXrmTMdaEy2T7WQQUXdd/XVK1D+Mtv2eaJpNliV/0XhRFfn/Llm2sUCgwp55XoWeozmGHLWfBYJBpmlalvoD6laciCiIrFUtM1VSMR+JjEiVcAj0rMl3XaDKM/hmGzgzT4PepjI6Osmw2t9e4aZx+v5/19izjz/K58jrUJv7SvO25SBL1YfA6pv0s4MYk1DHwXpFlNjI6xvw+H9rrYcVi0eqjyrwMg/rVWRKtHp8vsdNHR9hyzFFGn7o1SGaGY0xoaWMm5ihhTn6MpWiYLIyvh7EeVybHWN4eJ43rCNy/KdbC7uxKsFd9Movp+n4iCf6rOhPRZ8kwmIqx0rw1TWeKogBOVr8cVrgviYQ3BtNRl6BJa0VQMwA/VVVteMpscmqKxWIx1tTUxHHEWh53ePkA15mZWbZjxxDqx1jPMoJxgfcnoy1qX+DwBO7itYfVt3SyRnnDF4s4zbL3jeJWiEBmbQlSr5JugPWNUzjXLeOlOoiBpJQsiseCO68Fq43j/Q6Jsf/VDGN0zrSJxq5ftNs4lAmkUd68YoIB8ZlkI73B1QaDBXy+HyqG8QlHvZOhZvlFaS7kU6/xM3Z7wX7WQRAiKuEQJZMGgbxJpYYCGZCGjbGRdHYo5IaN8MfHYg9EROm8uTJbgogka+jB7nD4u7fE2wrThbkfybaN5cdjRejlJZPqSw0CaZS//0KSQoak6AxH2QSkg2YTQUxW1rZEm84rqqW9niEpwUA0x8Xbfpgr5H8GgkqR1FDwXbJUhEGtH5KwPBAEEm2g6OtbikBmvySx40AgScGyJ+jyS/IlBohAd7EruNcGRJIxDVYwzbNKunaviLt+khuQJrIoMXYImvK1EgixHLVG6T65gJsZpqPONsrBMz2YH+qVDOtcExzrwWS6wHoF06xoTZhYL8nnH1B0ha+miLZaII385Co2GwTiVb4O+N5WA3UQ/Evk0ydYkhpL8Q/y+zfKQVxUAH5CMJigatw9OQ34UwhFUYRxQbTiUV5FEgWWLhZHc5rGfFj0uGawFwI+tgttBBsE4lmmcM3Uxr3M+WCXosjzxGE2xMhBK22QAi+CMV0fltjZcwU2UCywLFSunCT9d1yWLijq6l5eKVodCmwScYV07ZH2UgkEwthjkSC7LxZiOggnhnaNBoG4lvACJcqLOJgVPQ4G/CAOaV7FapSDWwjyAYD9ab/Mtgai7OhMnrVMT7NEcvKhY1sSTyxral6TURdqzBSRDoCIJqeS12Yz2bFXY1H2h7YY+3M4wIK6wZpx6Yegp7c2AjGZ5faokupA3woyuBAT/64Ig0eSHZ1wXtoJdW3fzinZq0/zAEhX4vIkt3uB1HOiyJ5ojrIgiOW0iQl2TGbmXbFA6KchJpxfEmyPF65WCIdN+ewN1+Vmbg4nWlg+0cpVs3aoaTwWUkfiIGIUBevVzUB1Uk0Ww+tArX09JEhV4nCKKIhN6HS2sq0isFKptA8IXLmOLMsxSu8xDG3OK8eL59lYxaSgmZ2LtUqSpFV4oo+0DLzPoOoQOnxW08znrHywfSA6Cxso1+hIURSOBW8fQL9tuKmgjyLqTOHaBmbynG7q2xYvFuUoCUvsWCjrn4zqAObYXVJZ3h9gT/QPsO1qia0sli440hBP7RbEd4OQmgvMHJ5m5i+ejihbp+IDLBsMsJiu8ecMiqGwuhKHqGuaYuhGkXvTRGHBGgM3fFiPk3D3aEEUl6H7JpoVFoUyNEbx/Kuo9xdcGVLlJRs+nOhEcSkLNP/cAqLcJwIR2NX4c3ENvU4Ui6W/Bfz+jximMcFc/IIOEgwM9N0/OZm8OZPJLBjo4rp+v4+1tbad6lN83wZQZbeILtULBYPtqZnZB0B417e2xDdomh7yIGBJ1421JbU0jjb/WfEpVwN5j6dJOmMD8s4PXRCU53XD+IGu6XfWKlSI8DCfIAj2Cizav+D98YJNLM54yxeTPqPPjaZp3FtS1e87yJIvFPZgvMDeg7nfWoEgxxRZOlNVdd4/+n4vrvfjK8o3bIoYRihqmg9OwFLfqijv/a1hDEdMUwUCKEWYLWlRWAOC7OkzzHvMkno0UPVkUxDrJkeJXUiAvSTJpZSaWwsiKRKCh0JBZ/7HybJE8DoL1bvKEbcc+XldQZqGpvIrPH+nrutP0WpR4iIlHMbjzUzTuI0FfBW+4Lo+kKw+v//5zq6ui4kJARcIXuehj/cBFwAvgXwbQXyVr1WCdLIakhAVxcemp1OX5nK57u6urgvm5uZc9TACVnsicQzluebzuZsqqWPxePyU/v7eJ9PpDJ+YWxZtADZPLpdnwzt33tbX2wPRJJzsqZ8D+WdmpzW08+WmpqabKfPTIgx3cS5aOUs/METpElVTPwrC2+5JGOSgAHIqPt9HwfH+HcBeZjEmW5pUUBlkSVwNslmN/j6LsX0aK7whnU6zfD7Ps4SBAN2odoynKiDLx8zl51ihVPTFotH1aOMD5f0I1gxfiehGKMLYSZAKJ5ELmFCJkKAdayBg7AYzn8HH1bjeWk9VhjKoae1GR8e+qptGijydwUCAmIasKPLtgPEV5eNdDJ9Fn1uwjheGcKmavg5j/iTgU5icnGIdHQkmWslnK7zgRfgGmMb11AwtcA8Y+k9pzvOaSvm46wkEmjQoeHZ8fPzDExOTT1F6upeOl8lkWTgcunHlUUd9macwu+jny5cPrgIhPU3E4XASNwkDpE2/9tqmPgB8R0tLvEtVvVPiQRBJ1LsfSFRGHNW8cgalw5+M8b7o8ynHLLAhyoBKQTi/P/CtgM93H8a6zIoB1aaaGnY7gMVRmNPvYpHIJ+j+7pFRW6KxXJUmnkpnMpBa0jMglg8sXmz7Xcr2SPKF91G8hDyOC2MjVGe83ro+rbGqaRskWbqxAMaZmk7RoPpCodDfZEm+wg05a/KWKvJF4WDwBSB8O61nMjnNfD4Kb3onzRIBlYqlx0ulYjQajTyPsa0mxubSf6ruBAIkGmyJx4mbr8lls68Foc96TZwQSFGUm3uWdX8pGonMI5sfEqG9PXFSNBzeSERBg3cDEOX140XdtGnzKvSws6dnGWwbVauitrcGAoG1zn6Hmg1f4q6GGenr7d2IxUg4i15OtF1dnXcGA/4rrTiQ6Wl/eamUzrwwB5r/D5uaYudkczlGktgmEs8CDio2Nzc9FAlH3qaqKnsjFXL1m2RwJZPn0R4gkoqyIreCmT0LKBzltr7lBn2Zduq6Lmj6CMD+zxI4QzKZsvClir1qGHpnR0fHw+FQqLUSvOpKIDQZ2CClzs4OPvbXNm85pVRUp0hFMD28FbQZqLOz8+uY4FXzGNzScvyK5YMbofsLzqaYxc/R5hpC0C1bt72jUCy+CmBDnw1V3VBVBtQlz4/Ggn5DA/19jzY3N/PNOYlEgnV0trP+/r5LEm1tl5M+a7pyLYHPA9JoCH0/jTE8SzzFzbCk8dGGqoH+/vWJttbWHBBKcHZseXPoU8AwzrDtnzcMcViMCKw4NfNx0xRSBPdIJMqWDwz8FrBs80JOew7kSHnBgpe5VRAE17mRwyccCsKs7fsfYiQEL6mCwW6rWO/z+3xrVL65Sjg4BMKliKZztac90UYLPb15y5ZTTMPULG5vugICNgtJg2+AKM7r7+td0RSN/imbzYleahUYBY/Qb9227cxsNvt/dL+tra0m4vDiUJW4evn3tBggxOOaYtGLKeoMicmam5ojTbHY3WQcutEdEQEWZSOQYa2mawOYwzshZU4AYQ+CQXxnsXSgfvhc0BZUgO/Rq1GJzZYRVlVbuTZHWF32Bzm7ScEUnsBc/4ucys1gKt1dnZeBc7+dmONimDu7BjH/W2HzDUJtPRaDfic+HwbYr8XXzxG8yuFsM2YQXvi8eHPzKrJVzSq4bdr2YlXVsP4sg4m0uK2tLXzgAMzmLVu3rqFJE9d3IxJnoJFo9AFIgtdQT9ZdtnY6xOFDO9u2D10wO5t+jO5DtSDgsKWoFg43Qj8b0e73cH0T7+/H6CbEKu5V2pIbDoe/CaIW+PZOxq7E84Kbs4HGCyL+08Tk1Cmos4Hq0PZS2z7ZCVvsSszjysWShBMJ+gn4AxcQ3DC24doN4gWclvzppj3fPjLDaiCiUTITvS60kwGHJhd1RVuF5l4oFMkwP5f6j8WijqPkZs2Dc9O2V9hSl4NpfgkwGqKttlSX4AU82ZCcTh0HFe2vRHhu+AGV/kauIYApLwkXygRS2f34AUl3JyOZ3Hek9pDRBD36j9u2bT93xYrlP7fUB30vzk2T0ywEl9y4ue0K5HbHjqGhy1Kp1APzKllra03cwHEkkU6M+juhDX4Ur0/5FB9nXbq1aCFDEm+A4Xi1N4EYNJbWcDiyFlzwcTxzkdemVbRf0nR9Ne2bhnm0YHsreXZk9I1xfAd2x5k+n/I+t3lIsvhePLdpsTPDy0sHRvFzjPFeURJewtIDqQWfYagrgWQi4PfZKuhSwAA/wjw2fxDS0xjTmWzG51c2AnYdXmMiQoUKcynGnXRighjf6ficcJsnr6+qjwBeP6K96OSy5j5PO4ZLWia9L5bUk4JBk1ykymJGi7bfTXUhtcarbfJy3McY412QVMAnYRNgnQfsguh2JdTi02olkNsx0LtqilGZwmbOhAxwDOiaRCBUZmZn1w8ND38GevV/FGGoGUu0AWgi5M4d3rnr6qmp5PxYiCvR5RxsUK3IskhGcGZicvL4YDA4SXaLQ4uciwssPzk19cVQMBRriccvr6S2CQAghN3jWPTDTQ9XNZiBHg6Fv4F2wyZHCmEBsxYEUj0DKhar2RvRxA/gm+laYDSbTl+HLm8KBoJ7lsTkOVQ7bYS5rqoEAQwW0zs/2AIXwTk1M8NESTo/Fo2crHs4UOjAiWw+//TMzMzdRLRQFZ0DFt7vNU/7bivgdTsFbF2iaMCBGHWQI7iiPcWNiSqycjiIZZIfwODlLLGZMuZyMdZwnSwrTLBzEAg3BdPcoWnmr2tNNXkZTb5QazSdB93wd65QWDAYIPYdUBe6epZ1X0uemVppROD5XQE2MjJ68/j4xDcXOMQhpZZilBKSQO27Bgs1aVmBxNYEm1OR+mNAreHI9UkQxwVeiGtFfdkKLMhqgc/XcyGCiixeZVGh6Q0vDzenbYetxLuBSiaEzQlfBlxvIi6/ECZAWMnHw8LopVQToysbLrVHjAKqD8vkMkSw8UR720/NClIMUpFlMplzrBiPjGckK4AqC0dXtlnk1Rj76kqwYraLtwLin4hrshozKRQKv52bK6wTWIC7hk2b2IUyDUasEavitnRYii1CC7aXAQx99LqRkbHbgKB6rcQBlag0Mjr6td0jo9cuVr/IO1SresXVP00vYgHX0XEvARCd5dEyuAzXue5qcEmlWEjxoDft8ZjFMlrMameCOAFES492u6p61TrRRXfFKtbRQbdHwhGyW9ieLQeU6iLPM4Al2pPcG5Sfy7Op6SRLZ9OcwcTj8ftpA1Ul9zuY0BVY/0lue/oU7rghQsPnzkrjMGuAlVHleaxvH4g4XM1Ix/husyL5UNsKRebmKFy6kV4LkQjuXiHn88joyFVAykItuTNUBzphBsTxFbc2l5oUiceHIIJzimQZ+6QK0E0K8pEOrPhkzgFlRSaD8VWvtaD7GFsYdTsOfCq/0EoGY9VAo2H+XhD2SGwidtFe9H0ZISF0rjDHkqkUt7sobw0q6YfCweAZqofqSTCdnp7+Yyo1cyd3JVnP8DPIrDQKM3wgIWUHW9toKSupV2Qb4vUprpIpFgPhtvEiu2XpBCLMCyH3S1gwiPlBl6sQg4ODvwHgwrVwfho0Fqp1cKD/YaetxQS0NJ+8GTB0DdJC522Tp4iLfvvAMu4iJC5FXjTT9FfWPPlg9Fr63b9YAlPQRjV1OIt6wwK3FYT5uAvbZ/KwYE2qMFqzGIIgKrFodF0l9caW0udYrm3DWh8nUm+hxwHfUkK2ieBkQXrPbasiS1mfInPvKmeUzFLdyh+s1QYxyyVDTfEQIBipMGGIfNFGPnLDJhJtd8L4fY9rnlaFAF1ra+tZUHn+c+eu3ZeVEwn1I4pCzQsO4PVC6HThiVE6NZEjlDCfmshduKadmg7u8g7viDu/nwYxDVunRnr2+Rd8d6koiRIRnumuQs6rRB6liCGeUGV60xhvvtx8sLw++0Yc3KYB3MkjaXuFWCzafDdUz7Cn9ACSjU9MfAq2ygR5BhOtrSwSDsNuydnrBFj7pLRUIYsBt68HbhMzFPaqQ2siWyirVQ7wjeOb86tMMemGH4sXoVYvVnKpaZ2WqN/DZwnYHR3tn+toT1yez88tecEoRaGzs+PSUkndjkW4aR4rpme4oV5rARLRqL40m05/PgzR71ek+URCS0cWWHJ6mt73RGPRM73FNB7RjV1Y+A2yLLtyaVuK+kuq+qK1u1KykLcs1ZruUaxA4lxfcjX2bfv+iGr0L4n1O5bH8VhZ8SjyHgVOjUTCF2oeR4/SPFIzM8/A9vh+S3OcEYEQVyYCo/dFs8BKapGYwU5ZklZ5MR3D0IZAi89zRwMx1jIVWgKnp1AAEYdX4LlMYoa8OLq1LqY5VyjZR8zOu4h5Ymi5ZlNrujslzp1UI2xvxPCGRAr55/I8Sk4lGAicGW9u/jYhw76Ke3q2t7fnxpJaGoKO+xO6T+nylPgYiURq2mNCk/f5lCuBkBuAjA8vkHpcZxcI+EowGPyVHdH1BrJpbtE0fZPPZxpu6qptML61lM325HLaLuKmPiyA49gn+2BoaIjNzqbZ0Ucdxc/K1V2O1+FIIrBQFVWtrvklPA0I8LRUNZEi4A94edqsgKuxLZ3OrAoFg4xy8YiwHOLiuxX9AY63gPFTuHmeO1GSRiBcms/n1hGBELI6AV1OsNA6tm7bDkkWZSsGBtlcseDpfzf5ScWVeYCTlmPatqybtl6rBDnRvmrQxtg9II6hubnCPHH4/b7BI4444lFa38VBwkUuvj1pFh5qGxHB4MDAvaq6ZTibzT5pSZEUP4S4lkJAIW7Xnkj8EghwK/q9D52+RlIbo2rH6+mtLS3XY0GOcMsDKy8Yy2N21PZpSZZOdQ1+0YHIsnwHpMg/CVYgjDb/cEhpqsHUkkrEvVbxKddyhBL2Rj5N1R9B/We9MhHqXcrVK+ouFot+C0yjo0Tw8PKgGcbOrs6Oi2RJbplnVMIC1ZYFggEdmsBLUGN1SEtp75R22jIhnwYt4T2QXo+RB40CrKSC0nio3QCIBpL9W5qhvW2vwVheuwCk3AWg6c21pA5VS4asfyQdkosQYAacncRgKBSSe5Z1P0l6PnEkr0Fz33mxSGkfmyGaLzI8OBURDy3gYSsGN7zy6qYj8cxWSBNS37ixVS0fy3Ee0GmD0Ke/iH6+aFIKOEwkQWIJxxj2ImQHgdDGJtgUz5CABtf/tiIqrgRC7QAGHwQ3vAt9fRXPjDhIQ+oKJOLZis+3Hs8KXtwZfPsuSLZhdpCKyDcRadxN71d8KyPh0JV2So2nQiNL4hq8rOHeKpdDt6zzCkRi7l2Quj8OBJTLFqcTOfNva4k/CmK8GDC517lHWQ6AU7S/v/drIJpPu9lBjqMFGsYECKku+mbdc7EEOx1idHSMS5D2RNvjUK96vIjDiX6Gw6FdI6Njp23avOVitPEzCgx6IUyJtyVKhx+24mk8G+ER0VSKu+tqPafcLAs2YVTkFuyida62L8ER97BhPgl9mxUg5vF+Pcb0EjQzzzGDeD8Ogtwmy8rv8PnHQJZ7ce85MJEHyVxzyz2b31VnGPfBvug9aCfD8CzrAsfz5ubY+lq2Bjgbw2oomWwu9xWvzFzupoX+C5tnHZjKVkiP9bh9N2D1EOC3XZaUT3sFVAmPsA73QEKV8L7/DUkg4P5iMpnkBl53V9edTU1Na+Yq/A4IBZAgPndv2br9+Hw+z9nCrt0j58+kZ9dbrjd3JKX2AcCOw1Ys/wPdm5xMcjFcT0PVPQimUER5HaTW78nZQNJrYmKSDQ0Pn8V/40KWPYNfNF0s+D9g/JfguhAqxLFWUMw9RZ1gMzk19ak0bCzFJ3cfLOlB3JmYWzgcvAaIehTNqx6F5hkOBo8GY5kcG5+4Ye+I/57Ylm00Lwein4M6H8PrB/G5lWw0NwIh4qCM5+R06vPcvhMF8Q1HIPYhBToZzbAJPtvd3Xl5oVCoEh8QxmDcnTg1NTXhqDXT09OQQOPnQpI85BXnoHrkKo5Go8cO9Pc/TM/SlksQzQE7b5iMxkwm9+ehoeGLqW+6SJrRYoJYduzatXsNVGu9UmzGrOGkDpobEcf4xOR9Y2Pj36djlCAxD8qRVCBamSLnQLju5qbmW/R92EJQhQDFUDDAxsfH/22uMHcH9+xV2DxWvgXXM1eN2yoS/SDOmel0OkXOEH0p6RVVCKRuRELcc2oq+Vdw2cNXLF/+HfI6eaUjEPcIhYIT27bvOGEUZaHBZCH/Sy+/cjYQ/xGvrbtOvUSi7ay2trY7xscnIUVK6SrG2axhGr9ZagDP/mWjDelM+h0O13d88U474IxP5vL5t9JmqEUp1EsJcllqpKrdBoK7kOyq1pYWvsuwTsyu4rAAm0ypqNJmsPU8i8GoL13CtjDIy9XcFGPZTPYz0AQ+R90u6USSReoupd0DD87IZLOPU1Ik36BnVE35EGolkLodNm1FovVrYtHoJmfbqRsSEnGA807u3j1yQiaT2W147BEhNWpicvIfs9nsryttOSUi6e/r/RSk1r9C1UrLilysANQQgHcubKIPY3z5hRFnTy8Hhlu6AdJwLRZEX+wBKZ8Xxv0KOOMJmP8XyN0teNRdvFJOHSJe9PMuqJtX0UJ3dXY6vwMVqQL+Wn8prLcSwgEuGZ/f96FQMLiqSjBu33DEMAPUIu06JeLHGn93bq5wJPq6l9UCK/t72y6agUF+K6T3kVDjH6es7vb2hLMvqFpwrK8mInzLypUfw6uvTgSSFUQhDmRuxoSnvO0Onrb+S6hVI9U4OT+2PxZjywcHL9U0VfEy0ICctMlKAXL9KhQK/RWIGqoA5LcAoC/jwU4sEtkDZwHx324Fl/YYk2j3RVyPot17QCA7aX/9bDpDWcWu+1Wg7gGhO5iqqzw4ZlphlbPpOBnUPxHXYaz8lEqrJPH0S7puPIF+HgS1PEfpLqT3kwMg0dpmJ7CadErHGRXAn4WE+8lCwhP2jl8K7IP42+3lSYQF/QdZEg8HgXRrlIBVbzuOmevxZ4KyD8jJQW5uxo8XIuNcGoQWQjbH6bjocIxlbOG+FB1woC3LtF35UdhKDwInUhSnIZc0xYCbmpt4mzBB3sas01k83NjaGKT9L5x1JLuH3MmR8J5t2xyv8Prjunmw9uzSq4r05qKDuyoV4syof1elfmlStMChcLBf1/RqQbUQ+dPBvcagutyC1bmFNkDJktQDu0cGceUgCccwxBky9Qxmn2NVIzflP//J3bNkNprrAY/1fJsouBpaSJDnjTBFM3R+GBqoKK/aJ6wQ4pSrmtYPSvLPW+1rf8svveHIrDw0gb10QP1lghWULccB6wdTje0gytvw9W3kycK9bksSCD4KIaF+Et+POLEs6zxha13mkzSNea3lBfvar1J3g7ZWV2S9RTcnTDsKXcMv55q269XS7QWu0iVN2vnG5jcY7VF9zP0b1x69kaWAfilnceeT+Zj3wXleauoBw93X8cCHefVpj89nN+a/24l2my71zH3AvdfVzft6laX+TqvDrSU7buN2eMCB4JxLOSSiUV7/Ih6KxLGHSBjfzONkGzdKo7zpCGR/fuHbOSOX/4B9Axca5c2sYu0vkTgHnDVKozQIZB8dC43SIJBGaZRGaRBIozTKoUsgtcxJbix9o7BDFFEoTyBTpU6xsfSNUkv5fwEGAFkBTpyxFjDFAAAAAElFTkSuQmCC';
    this.PatronReportForm = 1;
    window.scroll(0, 0);
    this.nav.show();
    this.UserId = parseInt(window.sessionStorage.getItem('userId') || '{}');
    this.getPatronList();
    // this.getOverallPatronCount();
    this.getAllInvitedPatronCount();
    // this.getAllRegisteredPatronCount();
    this.getAllActivePatronCount();
  }

  mouseEnter(div: string) {
    if(window.sessionStorage.getItem('needHelpFlag')==="true"){
    this.patronService.helpText = div;
    this.patronService.helpFlag = true;
    }
  }

  mouseLeave() {
    if(window.sessionStorage.getItem('needHelpFlag')==="true"){
    this.patronService.helpText = "This guide is mouse pointer sensitive. Point at a page item to view its help.";
    this.patronService.helpFlag = true;
  }
  }

  selectedDropdownStatusValue(e:any) {
    this.dropdownSelectedStatusValue = e.target.textContent;
    this.PatronFilterDetail.Status = e.target.textContent;
    // document.getElementById('pstatus').removeAttribute('hidden');
  }

  // getStatus(event) {
  //   const target = event.target;
  //   const idAttr = target.attributes.id;
  //  // console.log(idAttr);
  //  // console.log(target.attributes.class);
  //  if (event.target.classList.contains('patron-table-avtive-icon')) {
  //     event.target.classList.remove('patron-table-avtive-icon');
  //     event.target.classList.add('patron-table-inavtive-icon');
  //  }

  //  if (event.target.classList.contains('patron-table-inavtive-icon')) {
  //     event.target.classList.remove('patron-table-inavtive-icon');
  //     event.target.classList.add('patron-table-avtive-icon');
  //  }

  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg modal-content-radius' });
  }

  smModal(template: TemplateRef<any>, data:any) {
    // this.modalRef = this.modalService.show(template, {class: 'modal-sm modal-sm-content-radius'});
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-content-radius' });
    this.deletePatronById = data;
    // console.log('deleted patron', this.deletePatronById);
  }
  mdModal(template: TemplateRef<any>) {
   
          this.addPatronSubmitted = true;
          this.modalRef = this.modalService.show(template, { class: 'modal-md modal-content-radius' });
          // const url = 'subscription/getPlanDetailByUserId/' + this.UserId;
          // this.serviceApi.getData(url)
          //   .subscribe((apiresults) => {
          //      this.resultData = apiresults;
          //      if(this.resultData.planData[0].RemainingPatron){
          //       this.addPatronSubmitted = true;
          //       this.modalRef = this.modalService.show(template, { class: 'modal-md modal-content-radius' });
          //     }
          //     else{
          //       this.popToast('error', 'Patron count exceeds.');
          //     }
          //       this.spinnerService.hide();
          //     },
          //     error => {
          //       this.spinnerService.hide();
          //       this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
          //     }
          //   );  
}

  csvImportModel(template: TemplateRef<any>) {
    this.csvFileFlag = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-content-radius' });
  }

  openDetailDownloadPopup(template: TemplateRef<any>, patronId: number) {
    let userId: number;
    userId = Number(window.sessionStorage.getItem('userId'));
    this.detailPatronId = patronId;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg modal-content-radius' });
    this.patronService.getData('analytics/patron/publishlist/' + this.detailPatronId + '/' + userId)
      .subscribe((apiresults) => {
        this.ExpDetailList = apiresults;
        // console.log('detail exp', this.ExpDetailList );
        this.expTableDataLengthCount = this.ExpDetailList.data.length;
        // console.log(this.expTableDataLengthCount);
        if (this.expTableDataLengthCount > 0) {
          this.noExpDataDisplayFlag = true;
          // this.ExpDetailList = this.ExpDetailList.data;
        } else {
          this.noExpDataDisplayFlag = false;
        }
        if (this.ExpDetailList.PersonaData[0].ProfileImageUrl.length <= 13) {
          this.ProfileExpOpenList = false;
        } else {
          this.ProfileExpOpenList = true;
          this.ProfileImageUrl = this.patronService.apiBaseUrl + this.ExpDetailList.PersonaData[0].ProfileImageUrl;
        }

      },
      (err) => {
        // console.log('Error occured.');
      });
  }

  // Get table patron details function
  getPatronList() {

    this.spinnerService.show();
    let userId: number;
    userId = Number(window.sessionStorage.getItem('userId'));
    const data = {
      UserId: userId,
      UserName: null,
      Email: null,
      Status: [1, 2],
      top: null,
      skip: null
    };

    this.patronService.postData('user/patron', data)
      .subscribe((apiresults) => {
        this.tableData1 = apiresults;
        this.tableDataLengthCount = this.tableData1.data.length;
        this.totalRec = this.tableData1.data.length;
        this.cardTotalNumberOfPatron = this.tableData1.data;
        this.cardTotalNumberOfPatron = this.cardTotalNumberOfPatron.length;
        if (this.cardTotalNumberOfPatron <= 0) {
          this.cardTotalNumberOfPatron = 0;
        }
        if (this.tableDataLengthCount > 0) {
          this.noDataDisplayFlag = true;
          this.tableData1 = this.tableData1.data;
        } else {

          this.noDataDisplayFlag = false;
        }

        this.overallAnalyticCardData();
        this.getAllActivePatronCount();
        this.spinnerService.hide();
      },
      (err) => {
        // console.log('Error occured.');
      });

    if (!this.cardTotalNumberOfPatron) {
      this.cardTotalNumberOfPatron = 0;
    }

  }

  // Delete patron function

  deletePatron() {

    // console.log('Inside delete patron');
    const patronDeleteData = {
      PatronId: this.deletePatronById,
      AuthorId: Number(window.sessionStorage.getItem('userId')),
      Status: 5,
    };
    this.patronService.putData('user/patron/changestatus', patronDeleteData)
      .subscribe((apiresults) => {
        this.deletePatronStatus = apiresults;
        // this.popToast('success', 'Done! That Patron registration has been taken care of!');
        this.toastrService.success('Done! That Patron registration has been taken care of!');
        this.getPatronList();
        this.overallAnalyticCardData();
      },
      (err) => {
        // console.log('Error occured.');
        // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
        this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
      });

    //  this.getPatronList();
    //  this.overallAnalyticCardData();
  }


  // Filter Display Data
  patronFilterDisplayData(patronFilterData:any, patronClick:any) {
    this.applyClick = patronClick;
    //console.log('inside filter submit', this.patronStatusId);
    //console.log('apply ckick:', this.applyClick );





    if (this.patronStatusId == 2) {
      // console.log('Inside filter1 2');
      this.patronFilterActiveStatus = 1;
      let userId: number;

      userId = Number(window.sessionStorage.getItem('userId'));
      if (!this.PatronFilterDetail.Name && !this.PatronFilterDetail.Email) {
        // console.log('Inside filter 2');
        const filterData = {
          UserId: userId,
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterActiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {

              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      } else if (this.PatronFilterDetail.Name && !this.PatronFilterDetail.Email) {
        const filterData = {
          UserId: window.sessionStorage.getItem('userId'),
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterActiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {
              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      } else if (!this.PatronFilterDetail.Name && this.PatronFilterDetail.Email) {
        const filterData = {
          UserId: window.sessionStorage.getItem('userId'),
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterActiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {
              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      } else if (this.PatronFilterDetail.Name && this.PatronFilterDetail.Email) {
        const filterData = {
          UserId: window.sessionStorage.getItem('userId'),
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterActiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {
              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      }
    } else if (this.patronStatusId == 3) {
      this.patronFilterInactiveStatus = 2;
      let userId: number;
      userId = Number(window.sessionStorage.getItem('userId'));
      if (!this.PatronFilterDetail.Name && !this.PatronFilterDetail.Email) {
        const filterData = {
          UserId: userId,
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterInactiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {
              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      } else if (this.PatronFilterDetail.Name && !this.PatronFilterDetail.Email) {
        const filterData = {
          UserId: window.sessionStorage.getItem('userId'),
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterInactiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {
              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      } else if (!this.PatronFilterDetail.Name && this.PatronFilterDetail.Email) {
        const filterData = {
          UserId: window.sessionStorage.getItem('userId'),
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterInactiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {
              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      } else if (this.PatronFilterDetail.Name && this.PatronFilterDetail.Email) {
        const filterData = {
          UserId: window.sessionStorage.getItem('userId'),
          UserName: this.PatronFilterDetail.Name,
          Email: this.PatronFilterDetail.Email,
          Status: [this.patronFilterInactiveStatus],
          top: null,
          skip: null
        };
        this.patronService.postData('user/patron', filterData)
          .subscribe((apiresults) => {
            this.tableData1 = apiresults;
            this.tableDataLengthCount = this.tableData1.data.length;
            if (this.tableDataLengthCount > 0) {
              this.noDataDisplayFlag = true;
              this.noFilterDataFlag = false;
              this.tableData1 = this.tableData1.data;
            } else {
              this.noDataDisplayFlag = false;
              this.noFilterDataFlag = true;
            }
          },
          (err) => {
            // console.log('Error occured.');
          });
      }

    } else if (this.patronStatusId == 1) {

      let userId: number;
      userId = Number(window.sessionStorage.getItem('userId'));
      const filterData = {
        UserId: userId,
        UserName: this.PatronFilterDetail.Name,
        Email: this.PatronFilterDetail.Email,
        Status: [1, 2],
        top: null,
        skip: null
      };
      this.patronService.postData('user/patron', filterData)
        .subscribe((apiresults) => {
          this.tableData1 = apiresults;
          this.tableDataLengthCount = this.tableData1.data.length;
          if (this.tableDataLengthCount > 0) {
            this.noDataDisplayFlag = true;
            this.noFilterDataFlag = false;
            this.tableData1 = this.tableData1.data;
          } else {

            this.noDataDisplayFlag = false;
            this.noFilterDataFlag = true;
          }
        },
        (err) => {
          // console.log('Error occured.');
        });


    } else {
      //  console.log('No Data To Display');
    }

    if (this.PatronFilterDetail.Name && !this.patronStatusId) {
      let userId: number;

      userId = Number(window.sessionStorage.getItem('userId'));

      const filterData = {
        UserId: userId,
        UserName: this.PatronFilterDetail.Name,
        Email: null,
        Status: [1, 2],
        top: null,
        skip: null
      };
      this.patronService.postData('user/patron', filterData)
        .subscribe((apiresults) => {
          this.tableData1 = apiresults;
          this.tableDataLengthCount = this.tableData1.data.length;

          if (this.tableDataLengthCount > 0) {
            this.noDataDisplayFlag = true;
            this.noFilterDataFlag = false;
            this.tableData1 = this.tableData1.data;
          } else {

            this.noDataDisplayFlag = false;
            this.noFilterDataFlag = true;
          }
        },
        (err) => {
          // console.log('Error occured.');
        });
    }

    if (this.PatronFilterDetail.Email && !this.patronStatusId) {
      let userId: number;

      userId = Number(window.sessionStorage.getItem('userId'));

      const filterData = {
        UserId: userId,
        UserName: null,
        Email: this.PatronFilterDetail.Email,
        Status: [1, 2],
        top: null,
        skip: null
      };
      this.patronService.postData('user/patron', filterData)
        .subscribe((apiresults) => {
          this.tableData1 = apiresults;
          this.tableDataLengthCount = this.tableData1.data.length;

          if (this.tableDataLengthCount > 0) {
            this.noDataDisplayFlag = true;
            this.noFilterDataFlag = false;
            this.tableData1 = this.tableData1.data;

          } else {

            this.noDataDisplayFlag = false;
            this.noFilterDataFlag = true;
          }
        },
        (err) => {
          // console.log('Error occured.');
        });
    }
  }

  // filter clear data function
  formReseFiltert(patronFilterData:any) {
    //   document.getElementById('pstatus').hidden = true;

    //patronFilterData.reset();
    this.PatronFilterDetail.Name = '';
    this.PatronFilterDetail.Email = '';
    this.applyClick = '';
    //  console.log('apply not ckick:', this.applyClick );

    this.getPatronList();
    this.patronStatusId = this.menuItemsFiterStatus[0]['id'];
    //console.log('patron status id:', this.patronStatusId);
  }

  // Get overall patron count

  // // getOverallPatronCount() {


  //   let userId: number;
  //   userId = Number(window.sessionStorage.getItem('userId')); console.log(userId);


  // //   const datapatrontotal = {
  // //     UserId: userId,
  // //     UserName: null,
  // //     Email: null,
  // //     Status: [1, 2],
  // //     top: null,
  // //     skip: null
  // //   };

  //   this.patronService.postData('user/patron', datapatrontotal)
  //     .subscribe((apiresults) => {
  //       this.cardTotalNumberOfPatron = apiresults;
  //       this.cardTotalNumberOfPatron = this.cardTotalNumberOfPatron.data;
  //       this.cardTotalNumberOfPatron = this.cardTotalNumberOfPatron.length;
  //       if (this.cardTotalNumberOfPatron <= 0) {
  //         this.cardTotalNumberOfPatron = 0;
  //       }
  //     },
  //       (err) => {

  //       });

  // //   if (!this.cardTotalNumberOfPatron) {
  // //     this.cardTotalNumberOfPatron = 0;
  // //   }
  // // }

  // Get all registered patron count

  // // getAllRegisteredPatronCount() {


  //   let userId: number;
  //   userId = Number(window.sessionStorage.getItem('userId')); 


  // //   const datapatronRegistered = {
  // //     UserId: userId,
  // //     UserName: null,
  // //     Email: null,
  // //     Status: 0,
  // //     top: null,
  // //     skip: null
  // //   };

  //   this.patronService.postData('user/patron', datapatronRegistered)
  //     .subscribe((apiresults) => {
  //       this.cardRegisteredNumberOfPatron = apiresults;
  //       this.cardRegisteredNumberOfPatron = this.cardRegisteredNumberOfPatron.data;
  //       this.cardRegisteredNumberOfPatron = this.cardRegisteredNumberOfPatron.length;
  //       if (this.cardRegisteredNumberOfPatron <= 0) {
  //         this.cardRegisteredNumberOfPatron = 0;
  //       }


  //     },
  //       (err) => {

  //       });

  // //   if (!this.cardRegisteredNumberOfPatron) {
  // //     this.cardRegisteredNumberOfPatron = 0;
  // //   }
  // // }

  // Get all active patron count

  getAllActivePatronCount() {

    let userId: number;
    userId = Number(window.sessionStorage.getItem('userId'));

    const datapatronActive = {
      UserId: userId,
      UserName: null,
      Email: null,
      Status: [1],
      top: null,
      skip: null
    };

    this.patronService.postData('user/patron', datapatronActive)
      .subscribe((apiresults) => {
        this.cardActiveNumberOfPatron = apiresults;
        this.cardActiveNumberOfPatron = this.cardActiveNumberOfPatron.data;
        this.cardActiveNumberOfPatron = this.cardActiveNumberOfPatron.length;
        if (this.cardActiveNumberOfPatron <= 0) {
          this.cardActiveNumberOfPatron = 0;
        }
      },
      (err) => {

      });

    // if (!this.cardActiveNumberOfPatron) {
    //   this.cardActiveNumberOfPatron = 0;
    // }

  }

  // Get all invited patron count

  getAllInvitedPatronCount() {

    let userId: number;
    userId = Number(window.sessionStorage.getItem('userId'));
    const datapatronInvited = {
      UserId: userId,
      UserName: null,
      Email: null,
      Status: 0,
      top: null,
      skip: null
    };

    this.patronService.postData('user/patron', datapatronInvited)
      .subscribe((apiresults) => {
        this.cardInvitedNumberOfPatron = apiresults;
        this.cardInvitedNumberOfPatron = this.cardInvitedNumberOfPatron.InviteCount;
        this.cardRegisteredNumberOfPatron = apiresults;
        this.cardRegisteredNumberOfPatron = this.cardRegisteredNumberOfPatron.RegisteredCount;
        if (this.cardInvitedNumberOfPatron <= 0) {
          this.cardInvitedNumberOfPatron = 0;
          //this.cardRegisteredNumberOfPatron = 0;
        }
        if (this.cardRegisteredNumberOfPatron <= 0) {
          this.cardRegisteredNumberOfPatron = 0;
        }
      },
      (err) => {

      });

    if ((!this.cardInvitedNumberOfPatron)) {
      this.cardInvitedNumberOfPatron = 0;
      //  this.cardRegisteredNumberOfPatron = 0;
    }
    if ((!this.cardRegisteredNumberOfPatron)) {
      this.cardRegisteredNumberOfPatron = 0;
    }


  }

  // Update patron status active/inactive

  updatePatronStatus(patronId:any, statusId:any) {


    this.updateStatusId = statusId;

    if (statusId === 1) {
      this.updateStatusId = 2;

      const patronEditStatus = {
        PatronId: patronId,
        AuthorId: Number(window.sessionStorage.getItem('userId')),
        Status: this.updateStatusId,
      };

      this.patronService.putData('user/patron/changestatus', patronEditStatus)
        .subscribe((apiresults) => {
          this.changePatronStatus = apiresults;
          // this.popToast('success', 'Patron deactivated successfully.');
          this.toastrService.success('Patron deactivated successfully.');
          this.getPatronList();
        },
        (err) => {

        });

      // this.getPatronList();
    }

    if (statusId === 2) {
      this.updateStatusId = 1;
      const patronEditStatus = {
        PatronId: patronId,
        AuthorId: Number(window.sessionStorage.getItem('userId')),
        Status: this.updateStatusId,
      };

      this.patronService.putData('user/patron/changestatus', patronEditStatus)
        .subscribe((apiresults) => {
          this.changePatronStatus = apiresults;
          // this.popToast('success', 'Patron activated successfully.');
          this.toastrService.success('Patron activated successfully.');
          this.getPatronList();
        },
        (err) => {

        });

    }
    this.overallAnalyticCardData();
  }

  // Add new patron

  patronAddNewData(patronAddData:any) {
    if(this.PatronAddDetail.Username.trim()==''){
      this.PatronAddDetail.Username='';
      return;

    }
    if(this.PatronAddDetail.Email.trim()==''){
      this.PatronAddDetail.Email='';
      return;

    }
 
    this.chkEmailResLength = 0;
    this.addPatronSubmitted = false;

    if (patronAddData.valid) {
      this.spinnerService.show();
      this.addPatronDisabled = true;
      let userId: number;
      userId = Number(window.sessionStorage.getItem('userId'));

      const addPatronData = {
        UserId: userId,
        PatronObj: [{
          Name: this.PatronAddDetail.Username,
          Email: this.PatronAddDetail.Email,
          Status: 1,
          TempPassword: null
        }]
      };

      this.patronService.postData('user/patron/add', addPatronData)
        .subscribe((apiresults:any) => {
          if (apiresults['message'] === 'Patron already registered with this User.') {
            this.addPatronDisabled = false;
            this.chkEmailResLength = 0;
            this.spinnerService.hide();
            // this.popToast('error', 'This Patron was already registered on your account.');
            this.toastrService.error('This Patron was already registered on your account.');
          } else {
            this.addPatronSubmitted = true;
            this.addPatronDisabled = false;
            this.spinnerService.hide();
            this.modalRef.hide();
            // this.popToast('success', "Wow! Your new Patron is now ready!");
            this.toastrService.success( "Wow! Your new Patron is now ready!");
            this.overallAnalyticCardData();
            this.getPatronList();
            this.addPatronClearFormData(patronAddData);
          }
        },
        (err) => {
          // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
          this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
          console.log('Hmm...Strange! Something does not seem right. Could not add this Patron.');
        });
    }
  }

  // Edit patron name

  editName(i:any, e:any) {
    this.editiedName = e.target.value;
    if (!this.tableData1[i].inlineNameEdit) {
      this.tableData1[i].inlineNameEdit = true;
      this.editNameFlag = false;
    } else {
      if (this.editiedName !== '' && this.editiedName !== null) {
        this.tableData1[i].inlineNameEdit = false;
      }
    }

  }

  // Save edited name
  editNameSave(i:any, e:any, patronId:any) {
    this.editiedName = e.target.value;
    let patrn: string;
    patrn = '[A-Za-z]';

    if (this.editiedName && this.editiedName.match(patrn)) {
      this.editNameFlag = false;
      const patronEditName = {
        UserId: patronId,
        Name: this.editiedName,
        Address: null,
        ContactNumber: null,
        Status: null,
        ProfileImageUrl: null
      };
      this.patronService.putData('user/patron', patronEditName)
        .subscribe((apiresults) => {
          this.patronEditiedName = apiresults;
          this.getPatronList();
        },
        (err) => {
        });

      if (this.tableData1[i].inlineNameEdit) {
        this.tableData1[i].inlineNameEdit = false;
      } else {
        this.tableData1[i].inlineNameEdit = true;
      }

    } else {
      this.alertMessage = 'Enter valid name';
      this.editNameFlag = true;
    }

  }

  // Toaster popup
  // popToast(massage:any, Body:any) {
  //   this.toasterService.pop(massage, Body);
  // }

  // All function call's
  overallAnalyticCardData() {
    // this.getOverallPatronCount();
    this.getAllInvitedPatronCount();
    // this.getAllRegisteredPatronCount();
    this.getAllActivePatronCount();
  }

  // Patron clear form data
  addPatronClearFormData(patronAddData:any) {
    patronAddData.reset();
  }

  // Close add patron popup
  closeAddPatronPopup(patronAddData:any) {

    this.addPatronClearFormData(patronAddData);
    this.modalRef.hide();
  }

  editPatron(index:any) {
    for (let i = 0; i < this.tableData1.length; i++) {
      this.tableData1[i].added = false;
    }
    this.tableData1[index].added = true;

  }

  saveEditiedValue(index:any, PatronId:any, name:any, emailId:any) {

    this.editMode = -1;
    this.tableData1[index].added = false;

    let userId: number;
    userId = Number(window.sessionStorage.getItem('userId'));

    const patronEditData = {
      UserId: PatronId, // PatronId
      Name: name,
      Email: emailId,
      AuthorId: userId,  // UserId
      Address: null,
      ContactNumber: 0,
      Status: 0,
      ProfileImageUrl: null
    };

    this.patronService.putData('user/patron', patronEditData)
      .subscribe((apiresults:any) => {
        if (apiresults['status']) {
          //this.popToast('success', 'That’s it! Updated the Patron details successfully.');
          this.toastrService.success('That’s it! Updated the Patron details successfully.');
        } else {
          // this.popToast('error', apiresults['message']);
          this.toastrService.error(apiresults['message']);
        }
        this.getPatronList();
      },
      (err) => {
        // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
        this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
        this.getPatronList();

      });
  }

  SaveEditiedSubmit(editiedFormValue:any, i:any, PatronId:any, name:any, emailId:any) {

    
    if (editiedFormValue.valid === true) {
      this.saveEditiedValue(i, PatronId, name, emailId);
    } else {
      
    }
  }

  patronAddCSVData(patronAddCSVDetails:any, csvFile:any) {

     this.csvFileFlag = true;
    // if (patronAddCSVDetails.valid) {
    //   this.csvFileFlag = true;
    //   this.modalRef.hide();
    // }
    let userId: number;
    userId = Number(window.sessionStorage.getItem('userId'));

   // console.log('csv file name', csvFile.valueAccessor._elementRef.nativeElement.files['0']);
    let csvfile: any;
    csvfile = csvFile.valueAccessor._elementRef.nativeElement.files['0'];
    const reader: any = new FileReader();

    reader.onload = (e:any) => {
   //   console.log(reader.result);

      let lines: any;
      lines = reader.result.split('\r\n');

      const result:any = [];
      const userid:any = {};
      userid['UserId'] = userId;
     const myjsonarray:any = {};
     myjsonarray['UserId'] = userId;
      const headers = lines[0].split(',');

      for (let i = 1; i < lines.length-1; i++) {

        const obj:any = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      

      const jsonData = JSON.stringify(result); // JSON
      myjsonarray['PatronObj'] = result;
    //  console.log('JsonData', jsonData);
     // console.log('Overall json data', myjsonarray);
      if(this.csvFileExtension.toLowerCase() === 'csv'){
        this.patronService.postData('user/patronbulk/add', myjsonarray)
        .subscribe((apiresults) => {
          this.importBulkPatronResponse = apiresults;
          this.importBulkPatronResponse = this.importBulkPatronResponse.data;
      //    console.log('CSV data:', this.importBulkPatronResponse);
          this.importBulkPatronCSVData();
         // console.log('Successfully inserted bult data.', apiresults);
         this.getPatronList();
          // this.popToast('success', 'Thank you! Your Patrons were successfully imported in your account. Check the CSV to know the detail status of each import request.');
         this.toastrService.success( 'Thank you! Your Patrons were successfully imported in your account. Check the CSV to know the detail status of each import request.');
          this.modalRef.hide();

        },
          (err) => {
            // console.log('Inside bulk error');
            // this.popToast('error', 'Oops! No cookies for you. Could not import your file. Try again!');
            this.toastrService.error('Oops! No cookies for you. Could not import your file. Try again!');
          });
      } else {
        // this.popToast('error', 'Please select only csv file format.');
        this.toastrService.error('Please select only csv file format.');
      }
      
    };

    reader.readAsText(csvfile);
  //  this.modalRef.hide();



  }

  downloadSampleCSVFile() {
    this.serviceApi.downloadFile('assets/files/SampleCSVFile.csv').subscribe(
      (data:any) => {
        FileSaver.saveAs(data, 'SampleCSVFile.csv');
        // this.popToast('success', 'Yippiee! Your file has been downloaded. Check your downloads folder.');
        this.toastrService.success('Yippiee! Your file has been downloaded. Check your downloads folder.');
      },
      error => {
        // this.popToast('error', 'Oops! There was a problem downloading the file. Try downloading again.');
        this.toastrService.error('Oops! There was a problem downloading the file. Try downloading again.');
      }
    );

  }

  goToReport(template: TemplateRef<any>, reportPatronIdd: number, reportpatronName: string) {
      let userId: number;
     userId = Number(window.sessionStorage.getItem('userId'));
    this.reportModalPatronId = reportPatronIdd;
    this.reportModalPatronName = reportpatronName;
    const PatronVerbose = this.patronService.getData('analytics/patron/' + this.reportModalPatronId + '/' + userId);
    PatronVerbose.subscribe(data => {
      this.PatronVerboseDataFlag = data;
      if (this.PatronVerboseDataFlag.data.ViewData.length === 0) {
        // this.popToast('error', 'Looks like your patron report has no data to report yet.');
        this.toastrService.error('Looks like your patron report has no data to report yet.');
      } else {
        this.modalRef = this.modalService.show(template, { class: 'modal-content-radius' });

      }
    },
      error => {
      });
    this.radioValue = 'PDF';
  }

  downloadCSV() {
    const headers = [ 'Room Name', 'Experience Name', 'View Date', 'Time Spent', 'Score','Result'];
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      noDownload: true,
    };
    new AngularCsv(this.tempData, 'Experizer_' + this.reportModalPatronName, { headers: (headers) });
    // this.popToast('success', 'Yippiee! Your file has been downloaded. Check your downloads folder.');
    this.toastrService.success( 'Yippiee! Your file has been downloaded. Check your downloads folder.');
  }

  downloadPDF() {
    const img = new Image();
    img.crossOrigin = '';
    const classOBJ:any = this;
    img.onload = function () {
      const canvasEl: HTMLCanvasElement = classOBJ.canvas.nativeElement;
      canvasEl.height = img.height;
      canvasEl.width = img.width;
      classOBJ.cx = canvasEl.getContext('2d');
      classOBJ.cx.fillStyle = '#ffffff';
      classOBJ.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
      classOBJ.cx.drawImage(img, 0, 0);
      classOBJ.imgData = canvasEl.toDataURL();
      const canvasElProfile: HTMLCanvasElement = classOBJ.canvas.nativeElement;
      canvasElProfile.height = img.height * 0.2;

      canvasElProfile.width = img.width * 0.2;
      classOBJ.cx = canvasElProfile.getContext('2d');
      classOBJ.cx.fillStyle = '#ffffff';
      classOBJ.cx.fillRect(0, 0, canvasElProfile.width, canvasElProfile.height);
      classOBJ.cx.drawImage(img, 0, 0, canvasElProfile.width, canvasElProfile.height);
      classOBJ.imgProfile = canvasElProfile.toDataURL();

      const col =
        ['Experience Name', 'Room Name', 'View Date', 'Time Spent', 'Score', 'Result'];
      const rows:any = [];
      classOBJ.PatronVerboseData.data.ViewData.forEach((element:any) => {
        const expCDate = new Date(element.ViewDate).toISOString().slice(0, 10);
        // const expMDate = new Date(element.ExperienceLastModified).toISOString().slice(0, 10);
        element.ViewDate = expCDate;
        if (element.Score == 0) {
          if (element.IsScore == 0) {
            element.Score = 'N/A';
          } else {
            element.Score = '0';
          }
        } else {
          element.Score = element.Score;
        }
        // element.ExperienceLastModified = expMDate;

        const temp = [element.ExperienceName, element.RoomName, element.ViewDate, element.TimeSpent,
        element.Score, element.Result];
        rows.push(temp);
      });
      const patronName = classOBJ.PatronVerboseData.data.personaData[0].Name;
      const patronEmail = classOBJ.PatronVerboseData.data.personaData[0].Email;
      const doc = new jsPDF('landscape');
      const totalPagesExp = '{total_pages_count_string}';
      const footer = function (data:any) {
        let str = 'Page ' + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(260, 205, str);
      };

      const header = function () {
        doc.addImage(classOBJ.logodataURI, 'png', 15, 10, 48, 12);
        doc.addImage(classOBJ.imgProfile, 'png', 263, 10, 20, 20);
        doc.setFontSize(12);
        doc.text(15, 30, 'Patron Name: ');
        doc.text(43, 30, patronName);
        doc.text(15, 38, 'Patron Email: ');
        doc.text(43, 38, patronEmail);
        doc.setFontSize(10);
        doc.line(15, 42, 283, 42);
      };
      doc.setTextColor(233, 120, 91);
      doc.autoTable(col, rows, {
        theme: 'grid',
        margin: { top: 50 },
        styles: { overflow: 'linebreak', cellWidth: 'wrap' },
        beforePageContent: header,
        afterPageContent: footer,
      });
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }
      doc.save('Experizer_' + classOBJ.reportModalPatronName + '.pdf');
    };
    if (classOBJ.PatronVerboseData.data.personaData[0].ProfileImageUrl.length <= 13) {
      img.src = 'assets/images/avatar.png';
    } else {
      // img.src = 'assets/images/avatar.png';
      img.src = classOBJ.patronService.apiBaseUrl + classOBJ.PatronVerboseData.data.personaData[0].ProfileImageUrl;
    }

    // this.popToast('success', 'Yippiee! Your file has been downloaded. Check your downloads folder.');
  }


  handleChange(event:any) {
    const value = event;
    this.radioValue = value;
  }

  getPatronReportDownload() {
    let userId: number;
    userId = Number(window.sessionStorage.getItem('userId'));

    const rows = [];
    const PatronVerbose = this.patronService.getData('analytics/patron/' + this.reportModalPatronId + '/' + userId);
    PatronVerbose.subscribe(data => {
      this.PatronVerboseData = data;
      if (this.radioValue === 'PDF') {
        this.downloadPDF();
      } else {
        const data111 = this.PatronVerboseData.data.ViewData;
        const ele = 'ExperienceStatus';
        const ele1 = 'PublishedExperienceAuthorEmail';
        const ele2 = 'PublishedExperienceAuthorName';
        const ele3 = 'ViewDate';
        const ele4 = 'Score';
        const ele5 = 'IsScore';
        for (let i = 0; i < data111.length; i++) {
          data111[i][ele3] = new Date(data111[i][ele3]).toISOString().slice(0, 10);
          if (data111[i][ele4] === 0) {
            if (data111[i][ele5] === 0) {
              data111[i][ele4] = 'N/A';
            } else {
              data111[i][ele4] = '0';
            }
          } else {
            data111[i][ele4] = data111[i][ele4];
          }
          delete data111[i][ele];
          delete data111[i][ele1];
          delete data111[i][ele2];
          delete data111[i][ele5];
        }
        this.tempData = data111;
        this.downloadCSV();
      }

    },
      error => {
        // this.popToast('error', 'Oops! There was a problem downloading the file. Try downloading again.');
        this.toastrService.error( 'Oops! There was a problem downloading the file. Try downloading again.');
      });
    this.modalRef.hide();
  }

  downloadDetails(expdata: any, value: string) {
    this.publishedExpDetailId = expdata.PublishedExperienceRoomMappingId;
    this.publishedExpValue = value;
    this.verboseProfileData = this.ExpDetailList.PersonaData[0];
    this.verboseRoomInfo = expdata;

    // const PatronVerbose = this.patronService.getData('verbose/getDataByPublishedExperienceAndPatronId/' + this.publishedExpDetailId + '/' + this.detailPatronId);

    const PatronVerbose = this.patronService.getData('verbose/getDataByPublishedExperienceAndPatronId/' + this.publishedExpDetailId + '/' + this.detailPatronId);
    PatronVerbose.subscribe(data => {
      this.verboseDetailDownloadData = data;
      if (this.publishedExpValue === 'PDF') {
        this.downloadPDFForVerbose();
      } else {
        const data111 = this.verboseDetailDownloadData;
        // const ele = 'Sentence';
        const ele3 = 'createdAt';
        const ele1 = 'Actor';
        const ele2 = 'Object';
        const ele4 = 'PatronId';
        const ele5 = 'PublishedExperienceId';
        const ele6 = 'RoomId';
        const ele7 = 'UserId';
        const ele8 = 'Verb';
        const ele9 = 'updatedAt';
        const ele10 = '__v';
        const ele11 = '_id';
        for (let i = 0; i < data111.length; i++) {
          data111[i][ele3] = new Date(data111[i][ele3]).toISOString().slice(0, 10);

          delete data111[i][ele1];
          delete data111[i][ele2];
          delete data111[i][ele4];
          delete data111[i][ele5];
          delete data111[i][ele6];
          delete data111[i][ele7];
          delete data111[i][ele8];
          delete data111[i][ele9];
          delete data111[i][ele10];
          delete data111[i][ele11];
        }
        this.tempDataVerbose = data111;
        this.downloadCSVForVerbose();
      }
    },
      error => {
        // this.popToast('error', 'Oops! There was a problem downloading the file. Try downloading again.');
        this.toastrService.error(  'Oops! There was a problem downloading the file. Try downloading again.');
      });


  }

  downloadPDFForVerbose() {
    const img = new Image();
    img.crossOrigin = '';
    const classOBJ:any = this;
    img.onload = function () {
      const canvasEl: HTMLCanvasElement = classOBJ.canvas.nativeElement;
      canvasEl.height = img.height;
      canvasEl.width = img.width;
      classOBJ.cx = canvasEl.getContext('2d');
      classOBJ.cx.fillStyle = '#ffffff';
      classOBJ.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
      classOBJ.cx.drawImage(img, 0, 0);
      classOBJ.imgData = canvasEl.toDataURL();
      const canvasElProfile: HTMLCanvasElement = classOBJ.canvas.nativeElement;
      if (img.height >= 1024 || img.width >= 1024) {
        canvasElProfile.height = img.height * 0.2;
        canvasElProfile.width = img.width * 0.2;
      } else {
        canvasElProfile.height = img.height;
        canvasElProfile.width = img.width;
      }
      classOBJ.cx = canvasElProfile.getContext('2d');
      classOBJ.cx.fillStyle = '#ffffff';
      classOBJ.cx.fillRect(0, 0, canvasElProfile.width, canvasElProfile.height);
      classOBJ.cx.drawImage(img, 0, 0, canvasElProfile.width, canvasElProfile.height);
      classOBJ.imgProfile = canvasElProfile.toDataURL();

      const col =
        ['User Action', 'View Date'];
      const rows:any = [];
      classOBJ.verboseDetailDownloadData.forEach((element:any) => {
        // const expCDate = new Date(element.createdAt).toISOString().slice(0, 10);
        var datePipe = new DatePipe('en-US');
        const expCDate = datePipe.transform(element.createdAt, 'dd.MM.yyyy hh:mm');
        // const expMDate = new Date(element.ExperienceLastModified).toISOString().slice(0, 10);
        element.ViewDate = expCDate;
        // element.ExperienceLastModified = expMDate;

        const temp = [element.Sentence, element.ViewDate];
        rows.push(temp);
      });
      const patronName = classOBJ.verboseProfileData.Name;
      const patronEmail = classOBJ.verboseProfileData.Email;
      const doc = new jsPDF('landscape');
      const totalPagesExp = '{total_pages_count_string}';
      const footer = function (data:any) {
        let str = 'Page ' + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(260, 205, str);
      };

      const header = function () {
        doc.addImage(classOBJ.logodataURI, 'png', 15, 10, 48, 12);
        doc.addImage(classOBJ.imgProfile, 'png', 263, 10, 20, 20);
        doc.setFontSize(12);
        doc.text(15, 30, 'Room Name: ');
        doc.text(43, 30, classOBJ.verboseRoomInfo.RoomName);
        doc.text(15, 38, 'Experience Name: ');
        doc.text(52, 38, classOBJ.verboseRoomInfo.PublishedExperienceName);
        doc.text(15, 46, 'Patron Name: ');
        doc.text(43, 46, patronName);
        doc.text(15, 54, 'Patron Email: ');
        doc.text(43, 54, patronEmail);
        doc.setFontSize(10);
        doc.line(15, 58, 283, 58);
      };
      doc.setTextColor(233, 120, 91);
      doc.autoTable(col, rows, {
        theme: 'grid',
        margin: { top: 62 },
        styles: { overflow: 'linebreak', cellWidth: 'wrap' },
        columnStyles: { 0: { columnWidth: 230 }, 1: { columnWidth: 40 } },
        beforePageContent: header,
        afterPageContent: footer,
      });
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }
      doc.save('Experizer_PDF_' + classOBJ.verboseProfileData.Name + '.pdf');
    };
    if (classOBJ.verboseProfileData.ProfileImageUrl.length <= 13) {
      img.src = 'assets/images/avatar.png';
    } else {
      // img.src = 'assets/images/avatar.png';
      img.src = classOBJ.ProfileImageUrl = classOBJ.patronService.apiBaseUrl + classOBJ.ExpDetailList.PersonaData[0].ProfileImageUrl;
      // img.src = classOBJ.verboseProfileData.ProfileImageUrl;
    }

    // this.popToast('success', 'Yippiee! Your file has been downloaded. Check your downloads folder.');
   this.toastrService.success( 'Yippiee! Your file has been downloaded. Check your downloads folder.');
  }




  onChange(e:any, patronFilterData:any) {
    this.patronStatusId = e.target.value;
    //console.log('Drop down value', this.patronStatusId);
  }

  downloadCSVForVerbose() {
    const headers = ['User Action', 'View Date'];
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      noDownload: true,
    };
    new AngularCsv(this.tempDataVerbose, 'Experizer_CSV_' + this.reportModalPatronName, { headers: (headers) });
    // this.popToast('success', 'Yippiee! Your file has been downloaded. Check your downloads folder.');
    this.toastrService.success( 'Yippiee! Your file has been downloaded. Check your downloads folder.');
  }

  checkFileExtension(ipCsvFileName:any) {
    let csvfile1: any;
    csvfile1 = ipCsvFileName.valueAccessor._elementRef.nativeElement.files['0'];
    let fileNameArray: any;
    fileNameArray = csvfile1['name'].split('.');

    // console.log('File name:', csvfile1['name']);
    // console.log('After split', fileNameArray[1]);
    this.csvFileExtension = fileNameArray[1];

  }

  importBulkPatronCSVData() {
    const headers = ['Email', 'Status'];
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      noDownload: true,
    };
    new AngularCsv(this.importBulkPatronResponse, 'ExperizerImportBulkPatronStatus', { headers: (headers) });
    //this.popToast('success', 'Successfully downloaded');
  }
}
