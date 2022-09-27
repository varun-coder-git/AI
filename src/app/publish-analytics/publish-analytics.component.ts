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
import { Component, OnInit,  TemplateRef, ElementRef, ViewChild } from '@angular/core';
import {BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ApiService} from '../services/api.service';
import { NavbarService } from '../services/navbar.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { listLocales } from 'ngx-bootstrap/chronos';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AnalyticsFilterDetail } from './../data-model/formData.component';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
//import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

declare var $ :any;

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 5,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false
  });
}

@Component({
  selector: 'app-publish-analytics',
  templateUrl: './publish-analytics.component.html',
  styleUrls: ['./publish-analytics.component.css'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})

export class PublishAnalyticsComponent implements OnInit {
    @ViewChild('canvas') public canvas!: ElementRef;
 
  private cx!: CanvasRenderingContext2D;
  private toasterService: ToasterService;
  timeSpentFilter!: string;
  daterangepickerModel!: Date[];
  AnalyticsFilterDetail: AnalyticsFilterDetail;
  JsonLang: any;
  RoomInfo!: any[];
  modalRef!: BsModalRef;
  localeService!: BsLocaleService;
  today: number = Date.now();
  datePickerConfig: Partial<BsDatepickerConfig>;
  tableData: any;
  SelectedStatusValue: string;
  SelectedModeValue: string;
  score: string;
  time: string;
  result: any;
  ImageData!: string;
  locales: any;
  userId: any;
  PatronInfo: any;
  getPatrontsArray: any;
  sendInviteShare: any;
  selectedAll: boolean;
  publishedExperienceId!: number;
  publishedTempExperienceName!: string;
  publishedExperienceName!: string;
  viewCount: any;
  invitedCount: any;
  publishedAgo: any;
  countData: any;
  radioValue: any;
  reportModalRoomId: any;
 AnalyticsVerboseData: any;
 ReportRoomName: any;
 imgData: any;
 registeredCount: any;
 logodataURI: any;
 tempData: any;
 totalTimeSpenMinute: any;
 avgTimeSpenMinute: any;
 TotalScore: any;
 AvgScore: any;
 MaxTimeSpent: any;
 tableDataFlag: any;
 AverageScore: any;
 IsScore: any;
 ComparisonFlag: any;
 filterTimeSpent: any;
 tableDataFlagFilter: any;
 experienceViewCount:any;
 PublishedExperienceRoomMappingId:any;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    showCloseButton: true,
    timeout: 2000
  });

  constructor(private apiService: ApiService, public nav: NavbarService, private modalService: BsModalService,
  public toastrService:ToastrService,public router: Router, private route: ActivatedRoute, toasterService: ToasterService) {
    this.toasterService = toasterService;
    this.selectedAll = false;
    this.JsonLang = require('./publishAnalytics.json');
    this.result = '';
    this.score = '';
    this.time = '';
    this.SelectedStatusValue = '';
    this.SelectedModeValue = '';
    this.getPatrontsArray = new Array();
    this.datePickerConfig = Object.assign({}, {showWeekNumbers: false, rangeInputFormat: 'YYYY/MM/DD'});
    this.tableData = '';
    this.tableDataFlag = 0;
    this.tableDataFlagFilter = 0;
    this.AnalyticsFilterDetail = new AnalyticsFilterDetail();
    this.ComparisonFlag = 0;
    this.AnalyticsFilterDetail.Comparison = 'Greater';
this.locales = listLocales();

   }

  ngOnInit() {
    this.logodataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAwCAYAAABUmTXqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAHVFJREFUeNrsXQmUXFWZvm+rvaq7urt6S68JW/CIyBaCQmQi4sI4IIujwwEURI56FAXlKMgM5wDioLgwqOiAQ5CZg2gQYRQRcwTBKCOyeNiydyfpvbq6a+uqett8/33vdao771VVJ5WApG7yuqpe3XeX//77/99bwluOXrmTMdaEy2T7WQQUXdd/XVK1D+Mtv2eaJpNliV/0XhRFfn/Llm2sUCgwp55XoWeozmGHLWfBYJBpmlalvoD6laciCiIrFUtM1VSMR+JjEiVcAj0rMl3XaDKM/hmGzgzT4PepjI6Osmw2t9e4aZx+v5/19izjz/K58jrUJv7SvO25SBL1YfA6pv0s4MYk1DHwXpFlNjI6xvw+H9rrYcVi0eqjyrwMg/rVWRKtHp8vsdNHR9hyzFFGn7o1SGaGY0xoaWMm5ihhTn6MpWiYLIyvh7EeVybHWN4eJ43rCNy/KdbC7uxKsFd9Movp+n4iCf6rOhPRZ8kwmIqx0rw1TWeKogBOVr8cVrgviYQ3BtNRl6BJa0VQMwA/VVVteMpscmqKxWIx1tTUxHHEWh53ePkA15mZWbZjxxDqx1jPMoJxgfcnoy1qX+DwBO7itYfVt3SyRnnDF4s4zbL3jeJWiEBmbQlSr5JugPWNUzjXLeOlOoiBpJQsiseCO68Fq43j/Q6Jsf/VDGN0zrSJxq5ftNs4lAmkUd68YoIB8ZlkI73B1QaDBXy+HyqG8QlHvZOhZvlFaS7kU6/xM3Z7wX7WQRAiKuEQJZMGgbxJpYYCGZCGjbGRdHYo5IaN8MfHYg9EROm8uTJbgogka+jB7nD4u7fE2wrThbkfybaN5cdjRejlJZPqSw0CaZS//0KSQoak6AxH2QSkg2YTQUxW1rZEm84rqqW9niEpwUA0x8Xbfpgr5H8GgkqR1FDwXbJUhEGtH5KwPBAEEm2g6OtbikBmvySx40AgScGyJ+jyS/IlBohAd7EruNcGRJIxDVYwzbNKunaviLt+khuQJrIoMXYImvK1EgixHLVG6T65gJsZpqPONsrBMz2YH+qVDOtcExzrwWS6wHoF06xoTZhYL8nnH1B0ha+miLZaII385Co2GwTiVb4O+N5WA3UQ/Evk0ydYkhpL8Q/y+zfKQVxUAH5CMJigatw9OQ34UwhFUYRxQbTiUV5FEgWWLhZHc5rGfFj0uGawFwI+tgttBBsE4lmmcM3Uxr3M+WCXosjzxGE2xMhBK22QAi+CMV0fltjZcwU2UCywLFSunCT9d1yWLijq6l5eKVodCmwScYV07ZH2UgkEwthjkSC7LxZiOggnhnaNBoG4lvACJcqLOJgVPQ4G/CAOaV7FapSDWwjyAYD9ab/Mtgai7OhMnrVMT7NEcvKhY1sSTyxral6TURdqzBSRDoCIJqeS12Yz2bFXY1H2h7YY+3M4wIK6wZpx6Yegp7c2AjGZ5faokupA3woyuBAT/64Ig0eSHZ1wXtoJdW3fzinZq0/zAEhX4vIkt3uB1HOiyJ5ojrIgiOW0iQl2TGbmXbFA6KchJpxfEmyPF65WCIdN+ewN1+Vmbg4nWlg+0cpVs3aoaTwWUkfiIGIUBevVzUB1Uk0Ww+tArX09JEhV4nCKKIhN6HS2sq0isFKptA8IXLmOLMsxSu8xDG3OK8eL59lYxaSgmZ2LtUqSpFV4oo+0DLzPoOoQOnxW08znrHywfSA6Cxso1+hIURSOBW8fQL9tuKmgjyLqTOHaBmbynG7q2xYvFuUoCUvsWCjrn4zqAObYXVJZ3h9gT/QPsO1qia0sli440hBP7RbEd4OQmgvMHJ5m5i+ejihbp+IDLBsMsJiu8ecMiqGwuhKHqGuaYuhGkXvTRGHBGgM3fFiPk3D3aEEUl6H7JpoVFoUyNEbx/Kuo9xdcGVLlJRs+nOhEcSkLNP/cAqLcJwIR2NX4c3ENvU4Ui6W/Bfz+jximMcFc/IIOEgwM9N0/OZm8OZPJLBjo4rp+v4+1tbad6lN83wZQZbeILtULBYPtqZnZB0B417e2xDdomh7yIGBJ1421JbU0jjb/WfEpVwN5j6dJOmMD8s4PXRCU53XD+IGu6XfWKlSI8DCfIAj2Cizav+D98YJNLM54yxeTPqPPjaZp3FtS1e87yJIvFPZgvMDeg7nfWoEgxxRZOlNVdd4/+n4vrvfjK8o3bIoYRihqmg9OwFLfqijv/a1hDEdMUwUCKEWYLWlRWAOC7OkzzHvMkno0UPVkUxDrJkeJXUiAvSTJpZSaWwsiKRKCh0JBZ/7HybJE8DoL1bvKEbcc+XldQZqGpvIrPH+nrutP0WpR4iIlHMbjzUzTuI0FfBW+4Lo+kKw+v//5zq6ui4kJARcIXuehj/cBFwAvgXwbQXyVr1WCdLIakhAVxcemp1OX5nK57u6urgvm5uZc9TACVnsicQzluebzuZsqqWPxePyU/v7eJ9PpDJ+YWxZtADZPLpdnwzt33tbX2wPRJJzsqZ8D+WdmpzW08+WmpqabKfPTIgx3cS5aOUs/METpElVTPwrC2+5JGOSgAHIqPt9HwfH+HcBeZjEmW5pUUBlkSVwNslmN/j6LsX0aK7whnU6zfD7Ps4SBAN2odoynKiDLx8zl51ihVPTFotH1aOMD5f0I1gxfiehGKMLYSZAKJ5ELmFCJkKAdayBg7AYzn8HH1bjeWk9VhjKoae1GR8e+qptGijydwUCAmIasKPLtgPEV5eNdDJ9Fn1uwjheGcKmavg5j/iTgU5icnGIdHQkmWslnK7zgRfgGmMb11AwtcA8Y+k9pzvOaSvm46wkEmjQoeHZ8fPzDExOTT1F6upeOl8lkWTgcunHlUUd9macwu+jny5cPrgIhPU3E4XASNwkDpE2/9tqmPgB8R0tLvEtVvVPiQRBJ1LsfSFRGHNW8cgalw5+M8b7o8ynHLLAhyoBKQTi/P/CtgM93H8a6zIoB1aaaGnY7gMVRmNPvYpHIJ+j+7pFRW6KxXJUmnkpnMpBa0jMglg8sXmz7Xcr2SPKF91G8hDyOC2MjVGe83ro+rbGqaRskWbqxAMaZmk7RoPpCodDfZEm+wg05a/KWKvJF4WDwBSB8O61nMjnNfD4Kb3onzRIBlYqlx0ulYjQajTyPsa0mxubSf6ruBAIkGmyJx4mbr8lls68Foc96TZwQSFGUm3uWdX8pGonMI5sfEqG9PXFSNBzeSERBg3cDEOX140XdtGnzKvSws6dnGWwbVauitrcGAoG1zn6Hmg1f4q6GGenr7d2IxUg4i15OtF1dnXcGA/4rrTiQ6Wl/eamUzrwwB5r/D5uaYudkczlGktgmEs8CDio2Nzc9FAlH3qaqKnsjFXL1m2RwJZPn0R4gkoqyIreCmT0LKBzltr7lBn2Zduq6Lmj6CMD+zxI4QzKZsvClir1qGHpnR0fHw+FQqLUSvOpKIDQZ2CClzs4OPvbXNm85pVRUp0hFMD28FbQZqLOz8+uY4FXzGNzScvyK5YMbofsLzqaYxc/R5hpC0C1bt72jUCy+CmBDnw1V3VBVBtQlz4/Ggn5DA/19jzY3N/PNOYlEgnV0trP+/r5LEm1tl5M+a7pyLYHPA9JoCH0/jTE8SzzFzbCk8dGGqoH+/vWJttbWHBBKcHZseXPoU8AwzrDtnzcMcViMCKw4NfNx0xRSBPdIJMqWDwz8FrBs80JOew7kSHnBgpe5VRAE17mRwyccCsKs7fsfYiQEL6mCwW6rWO/z+3xrVL65Sjg4BMKliKZztac90UYLPb15y5ZTTMPULG5vugICNgtJg2+AKM7r7+td0RSN/imbzYleahUYBY/Qb9227cxsNvt/dL+tra0m4vDiUJW4evn3tBggxOOaYtGLKeoMicmam5ojTbHY3WQcutEdEQEWZSOQYa2mawOYwzshZU4AYQ+CQXxnsXSgfvhc0BZUgO/Rq1GJzZYRVlVbuTZHWF32Bzm7ScEUnsBc/4ucys1gKt1dnZeBc7+dmONimDu7BjH/W2HzDUJtPRaDfic+HwbYr8XXzxG8yuFsM2YQXvi8eHPzKrJVzSq4bdr2YlXVsP4sg4m0uK2tLXzgAMzmLVu3rqFJE9d3IxJnoJFo9AFIgtdQT9ZdtnY6xOFDO9u2D10wO5t+jO5DtSDgsKWoFg43Qj8b0e73cH0T7+/H6CbEKu5V2pIbDoe/CaIW+PZOxq7E84Kbs4HGCyL+08Tk1Cmos4Hq0PZS2z7ZCVvsSszjysWShBMJ+gn4AxcQ3DC24doN4gWclvzppj3fPjLDaiCiUTITvS60kwGHJhd1RVuF5l4oFMkwP5f6j8WijqPkZs2Dc9O2V9hSl4NpfgkwGqKttlSX4AU82ZCcTh0HFe2vRHhu+AGV/kauIYApLwkXygRS2f34AUl3JyOZ3Hek9pDRBD36j9u2bT93xYrlP7fUB30vzk2T0ywEl9y4ue0K5HbHjqGhy1Kp1APzKllra03cwHEkkU6M+juhDX4Ur0/5FB9nXbq1aCFDEm+A4Xi1N4EYNJbWcDiyFlzwcTxzkdemVbRf0nR9Ne2bhnm0YHsreXZk9I1xfAd2x5k+n/I+t3lIsvhePLdpsTPDy0sHRvFzjPFeURJewtIDqQWfYagrgWQi4PfZKuhSwAA/wjw2fxDS0xjTmWzG51c2AnYdXmMiQoUKcynGnXRighjf6ficcJsnr6+qjwBeP6K96OSy5j5PO4ZLWia9L5bUk4JBk1ykymJGi7bfTXUhtcarbfJy3McY412QVMAnYRNgnQfsguh2JdTi02olkNsx0LtqilGZwmbOhAxwDOiaRCBUZmZn1w8ND38GevV/FGGoGUu0AWgi5M4d3rnr6qmp5PxYiCvR5RxsUK3IskhGcGZicvL4YDA4SXaLQ4uciwssPzk19cVQMBRriccvr6S2CQAghN3jWPTDTQ9XNZiBHg6Fv4F2wyZHCmEBsxYEUj0DKhar2RvRxA/gm+laYDSbTl+HLm8KBoJ7lsTkOVQ7bYS5rqoEAQwW0zs/2AIXwTk1M8NESTo/Fo2crHs4UOjAiWw+//TMzMzdRLRQFZ0DFt7vNU/7bivgdTsFbF2iaMCBGHWQI7iiPcWNiSqycjiIZZIfwODlLLGZMuZyMdZwnSwrTLBzEAg3BdPcoWnmr2tNNXkZTb5QazSdB93wd65QWDAYIPYdUBe6epZ1X0uemVppROD5XQE2MjJ68/j4xDcXOMQhpZZilBKSQO27Bgs1aVmBxNYEm1OR+mNAreHI9UkQxwVeiGtFfdkKLMhqgc/XcyGCiixeZVGh6Q0vDzenbYetxLuBSiaEzQlfBlxvIi6/ECZAWMnHw8LopVQToysbLrVHjAKqD8vkMkSw8UR720/NClIMUpFlMplzrBiPjGckK4AqC0dXtlnk1Rj76kqwYraLtwLin4hrshozKRQKv52bK6wTWIC7hk2b2IUyDUasEavitnRYii1CC7aXAQx99LqRkbHbgKB6rcQBlag0Mjr6td0jo9cuVr/IO1SresXVP00vYgHX0XEvARCd5dEyuAzXue5qcEmlWEjxoDft8ZjFMlrMameCOAFES492u6p61TrRRXfFKtbRQbdHwhGyW9ieLQeU6iLPM4Al2pPcG5Sfy7Op6SRLZ9OcwcTj8ftpA1Ul9zuY0BVY/0lue/oU7rghQsPnzkrjMGuAlVHleaxvH4g4XM1Ix/husyL5UNsKRebmKFy6kV4LkQjuXiHn88joyFVAykItuTNUBzphBsTxFbc2l5oUiceHIIJzimQZ+6QK0E0K8pEOrPhkzgFlRSaD8VWvtaD7GFsYdTsOfCq/0EoGY9VAo2H+XhD2SGwidtFe9H0ZISF0rjDHkqkUt7sobw0q6YfCweAZqofqSTCdnp7+Yyo1cyd3JVnP8DPIrDQKM3wgIWUHW9toKSupV2Qb4vUprpIpFgPhtvEiu2XpBCLMCyH3S1gwiPlBl6sQg4ODvwHgwrVwfho0Fqp1cKD/YaetxQS0NJ+8GTB0DdJC522Tp4iLfvvAMu4iJC5FXjTT9FfWPPlg9Fr63b9YAlPQRjV1OIt6wwK3FYT5uAvbZ/KwYE2qMFqzGIIgKrFodF0l9caW0udYrm3DWh8nUm+hxwHfUkK2ieBkQXrPbasiS1mfInPvKmeUzFLdyh+s1QYxyyVDTfEQIBipMGGIfNFGPnLDJhJtd8L4fY9rnlaFAF1ra+tZUHn+c+eu3ZeVEwn1I4pCzQsO4PVC6HThiVE6NZEjlDCfmshduKadmg7u8g7viDu/nwYxDVunRnr2+Rd8d6koiRIRnumuQs6rRB6liCGeUGV60xhvvtx8sLw++0Yc3KYB3MkjaXuFWCzafDdUz7Cn9ACSjU9MfAq2ygR5BhOtrSwSDsNuydnrBFj7pLRUIYsBt68HbhMzFPaqQ2siWyirVQ7wjeOb86tMMemGH4sXoVYvVnKpaZ2WqN/DZwnYHR3tn+toT1yez88tecEoRaGzs+PSUkndjkW4aR4rpme4oV5rARLRqL40m05/PgzR71ek+URCS0cWWHJ6mt73RGPRM73FNB7RjV1Y+A2yLLtyaVuK+kuq+qK1u1KykLcs1ZruUaxA4lxfcjX2bfv+iGr0L4n1O5bH8VhZ8SjyHgVOjUTCF2oeR4/SPFIzM8/A9vh+S3OcEYEQVyYCo/dFs8BKapGYwU5ZklZ5MR3D0IZAi89zRwMx1jIVWgKnp1AAEYdX4LlMYoa8OLq1LqY5VyjZR8zOu4h5Ymi5ZlNrujslzp1UI2xvxPCGRAr55/I8Sk4lGAicGW9u/jYhw76Ke3q2t7fnxpJaGoKO+xO6T+nylPgYiURq2mNCk/f5lCuBkBuAjA8vkHpcZxcI+EowGPyVHdH1BrJpbtE0fZPPZxpu6qptML61lM325HLaLuKmPiyA49gn+2BoaIjNzqbZ0Ucdxc/K1V2O1+FIIrBQFVWtrvklPA0I8LRUNZEi4A94edqsgKuxLZ3OrAoFg4xy8YiwHOLiuxX9AY63gPFTuHmeO1GSRiBcms/n1hGBELI6AV1OsNA6tm7bDkkWZSsGBtlcseDpfzf5ScWVeYCTlmPatqybtl6rBDnRvmrQxtg9II6hubnCPHH4/b7BI4444lFa38VBwkUuvj1pFh5qGxHB4MDAvaq6ZTibzT5pSZEUP4S4lkJAIW7Xnkj8EghwK/q9D52+RlIbo2rH6+mtLS3XY0GOcMsDKy8Yy2N21PZpSZZOdQ1+0YHIsnwHpMg/CVYgjDb/cEhpqsHUkkrEvVbxKddyhBL2Rj5N1R9B/We9MhHqXcrVK+ouFot+C0yjo0Tw8PKgGcbOrs6Oi2RJbplnVMIC1ZYFggEdmsBLUGN1SEtp75R22jIhnwYt4T2QXo+RB40CrKSC0nio3QCIBpL9W5qhvW2vwVheuwCk3AWg6c21pA5VS4asfyQdkosQYAacncRgKBSSe5Z1P0l6PnEkr0Fz33mxSGkfmyGaLzI8OBURDy3gYSsGN7zy6qYj8cxWSBNS37ixVS0fy3Ee0GmD0Ke/iH6+aFIKOEwkQWIJxxj2ImQHgdDGJtgUz5CABtf/tiIqrgRC7QAGHwQ3vAt9fRXPjDhIQ+oKJOLZis+3Hs8KXtwZfPsuSLZhdpCKyDcRadxN71d8KyPh0JV2So2nQiNL4hq8rOHeKpdDt6zzCkRi7l2Quj8OBJTLFqcTOfNva4k/CmK8GDC517lHWQ6AU7S/v/drIJpPu9lBjqMFGsYECKku+mbdc7EEOx1idHSMS5D2RNvjUK96vIjDiX6Gw6FdI6Njp23avOVitPEzCgx6IUyJtyVKhx+24mk8G+ER0VSKu+tqPafcLAs2YVTkFuyida62L8ER97BhPgl9mxUg5vF+Pcb0EjQzzzGDeD8Ogtwmy8rv8PnHQJZ7ce85MJEHyVxzyz2b31VnGPfBvug9aCfD8CzrAsfz5ubY+lq2Bjgbw2oomWwu9xWvzFzupoX+C5tnHZjKVkiP9bh9N2D1EOC3XZaUT3sFVAmPsA73QEKV8L7/DUkg4P5iMpnkBl53V9edTU1Na+Yq/A4IBZAgPndv2br9+Hw+z9nCrt0j58+kZ9dbrjd3JKX2AcCOw1Ys/wPdm5xMcjFcT0PVPQimUER5HaTW78nZQNJrYmKSDQ0Pn8V/40KWPYNfNF0s+D9g/JfguhAqxLFWUMw9RZ1gMzk19ak0bCzFJ3cfLOlB3JmYWzgcvAaIehTNqx6F5hkOBo8GY5kcG5+4Ye+I/57Ylm00Lwein4M6H8PrB/G5lWw0NwIh4qCM5+R06vPcvhMF8Q1HIPYhBToZzbAJPtvd3Xl5oVCoEh8QxmDcnTg1NTXhqDXT09OQQOPnQpI85BXnoHrkKo5Go8cO9Pc/TM/SlksQzQE7b5iMxkwm9+ehoeGLqW+6SJrRYoJYduzatXsNVGu9UmzGrOGkDpobEcf4xOR9Y2Pj36djlCAxD8qRVCBamSLnQLju5qbmW/R92EJQhQDFUDDAxsfH/22uMHcH9+xV2DxWvgXXM1eN2yoS/SDOmel0OkXOEH0p6RVVCKRuRELcc2oq+Vdw2cNXLF/+HfI6eaUjEPcIhYIT27bvOGEUZaHBZCH/Sy+/cjYQ/xGvrbtOvUSi7ay2trY7xscnIUVK6SrG2axhGr9ZagDP/mWjDelM+h0O13d88U474IxP5vL5t9JmqEUp1EsJcllqpKrdBoK7kOyq1pYWvsuwTsyu4rAAm0ypqNJmsPU8i8GoL13CtjDIy9XcFGPZTPYz0AQ+R90u6USSReoupd0DD87IZLOPU1Ik36BnVE35EGolkLodNm1FovVrYtHoJmfbqRsSEnGA807u3j1yQiaT2W147BEhNWpicvIfs9nsryttOSUi6e/r/RSk1r9C1UrLilysANQQgHcubKIPY3z5hRFnTy8Hhlu6AdJwLRZEX+wBKZ8Xxv0KOOMJmP8XyN0teNRdvFJOHSJe9PMuqJtX0UJ3dXY6vwMVqQL+Wn8prLcSwgEuGZ/f96FQMLiqSjBu33DEMAPUIu06JeLHGn93bq5wJPq6l9UCK/t72y6agUF+K6T3kVDjH6es7vb2hLMvqFpwrK8mInzLypUfw6uvTgSSFUQhDmRuxoSnvO0Onrb+S6hVI9U4OT+2PxZjywcHL9U0VfEy0ICctMlKAXL9KhQK/RWIGqoA5LcAoC/jwU4sEtkDZwHx324Fl/YYk2j3RVyPot17QCA7aX/9bDpDWcWu+1Wg7gGhO5iqqzw4ZlphlbPpOBnUPxHXYaz8lEqrJPH0S7puPIF+HgS1PEfpLqT3kwMg0dpmJ7CadErHGRXAn4WE+8lCwhP2jl8K7IP42+3lSYQF/QdZEg8HgXRrlIBVbzuOmevxZ4KyD8jJQW5uxo8XIuNcGoQWQjbH6bjocIxlbOG+FB1woC3LtF35UdhKDwInUhSnIZc0xYCbmpt4mzBB3sas01k83NjaGKT9L5x1JLuH3MmR8J5t2xyv8Prjunmw9uzSq4r05qKDuyoV4syof1elfmlStMChcLBf1/RqQbUQ+dPBvcagutyC1bmFNkDJktQDu0cGceUgCccwxBky9Qxmn2NVIzflP//J3bNkNprrAY/1fJsouBpaSJDnjTBFM3R+GBqoKK/aJ6wQ4pSrmtYPSvLPW+1rf8svveHIrDw0gb10QP1lghWULccB6wdTje0gytvw9W3kycK9bksSCD4KIaF+Et+POLEs6zxha13mkzSNea3lBfvar1J3g7ZWV2S9RTcnTDsKXcMv55q269XS7QWu0iVN2vnG5jcY7VF9zP0b1x69kaWAfilnceeT+Zj3wXleauoBw93X8cCHefVpj89nN+a/24l2my71zH3AvdfVzft6laX+TqvDrSU7buN2eMCB4JxLOSSiUV7/Ih6KxLGHSBjfzONkGzdKo7zpCGR/fuHbOSOX/4B9Axca5c2sYu0vkTgHnDVKozQIZB8dC43SIJBGaZRGaRBIozTKoUsgtcxJbix9o7BDFFEoTyBTpU6xsfSNUkv5fwEGAFkBTpyxFjDFAAAAAElFTkSuQmCC';
    window.scroll(0, 0);
    this.userId =  window.sessionStorage.getItem('userId');
    this.nav.show();
    this.route.params.subscribe(params => {
    this.publishedExperienceId = params['publishedExpId'];
    this.publishedTempExperienceName = params['publishedTempName'];
    this.publishedExperienceName = params['publishedExpName'];

    });
    this.getRoomData();
}


// yyyy-mm-dd
getRoomData() {
  const data = {
'RoomName': null,
'FromDate': null,
'ToDate': null,
'TimeSpent': null,
'Comparison': null
   };

  this.apiService.postData('analytics/published/' + this.userId + '/' + this.publishedExperienceId, data)
  .subscribe((apiresults) => {
    this.tableData = apiresults;

    this.countData = apiresults;
    this.tableData = this.tableData.data;
    if (this.tableData.length === 0) {
      this.tableDataFlag = 1;
    }
    const viewCount = this.countData.CountData[0];
    this.viewCount = viewCount[0].ViewCount;

     const invitedCount = this.countData.CountData[1];
    this.invitedCount = invitedCount[0].InvitedCount;

     const publishedAgo = this.countData.CountData[3];
    this.publishedAgo = publishedAgo[0].PublishedAgo;

     const registeredCount = this.countData.CountData[2];
    this.registeredCount = registeredCount[0].RegisteredCount;

    const AverageScore = this.countData.AverageScore[0];
    this.AverageScore = Math.round(AverageScore.AverageScore);
    this.IsScore= this.countData.IsScore;
    this.addTime();
    this.maxTime();
   },
    (err) => {});
}

selectedDropdownTimeValue(e:any) {
    const comparison = e.target.textContent;
     this.AnalyticsFilterDetail.Comparison = comparison.split(' ')[0];
    }

backToDashboard() {
  this.router.navigateByUrl('/dashboard/publishedexperience');
}

 formReseFiltert(analyticsFilterData:any) {
    //   document.getElementById('pstatus').hidden = true;
    this.AnalyticsFilterDetail.Comparison = null;
    analyticsFilterData.reset();
    //  this.tableDataFlag = 0;
     this.tableDataFlagFilter = 0;
    this.AnalyticsFilterDetail.Comparison = 'Greater';
    this.getRoomData();
  }

convert(str:any) {
    const date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day  = ('0' + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join('-');
}

analyticsFilterDisplayData(analyticsFilterData:any) {
  let filterData;
   if (this.AnalyticsFilterDetail.RoomName && this.AnalyticsFilterDetail.TimeSpent && this.AnalyticsFilterDetail.Comparison && this.AnalyticsFilterDetail.RangeDate ) {
            const comparison = this.AnalyticsFilterDetail.Comparison;
         this.AnalyticsFilterDetail.Comparison = comparison.split(' ')[0];
  var timetime = this.AnalyticsFilterDetail.TimeSpent;
     const tt = (timetime);
  const h = (tt / 60);
  const hh =  Math.floor(h);
  const m = (h - hh) * 60;
  const mm = Math.round(m);
    timetime =  hh + ':' + mm + ':00';
              const colTime = timetime.split(':');
              var tempTime = '';
              for (let i = 0; i < colTime.length; i++) {
              if (colTime[i].length === 1) {
                if (i != 2) {
                  tempTime = tempTime + '0' + colTime[i]  + ':';
                } else {
                  tempTime = tempTime + '0' + colTime[i];
                }
              } else {
                if ( i != 2) {
                tempTime = tempTime + colTime[i] + ':';
                } else {
                  tempTime = tempTime + colTime[i];
                }
              }
              }
              this.filterTimeSpent = tempTime;
              this.AnalyticsFilterDetail.FromDate = this.AnalyticsFilterDetail.RangeDate[0];
  this.AnalyticsFilterDetail.ToDate = this.AnalyticsFilterDetail.RangeDate[1];
  this.AnalyticsFilterDetail.FromDate = this.convert(this.AnalyticsFilterDetail.FromDate);
  this.AnalyticsFilterDetail.ToDate  = this.convert(this.AnalyticsFilterDetail.ToDate);
  filterData = {
     'RoomName': this.AnalyticsFilterDetail.RoomName,
     'FromDate': this.AnalyticsFilterDetail.FromDate + ' 00:00:00',
     'ToDate':  this.AnalyticsFilterDetail.ToDate + ' 23:59:59',
     'TimeSpent': this.filterTimeSpent,
     'Comparison': this.AnalyticsFilterDetail.Comparison
        };
        } else if (this.AnalyticsFilterDetail.RoomName && this.AnalyticsFilterDetail.TimeSpent && this.AnalyticsFilterDetail.Comparison) {
        const comparison = this.AnalyticsFilterDetail.Comparison;
  this.AnalyticsFilterDetail.Comparison = comparison.split(' ')[0];
  var timetime = this.AnalyticsFilterDetail.TimeSpent;
     const tt = (timetime);
  const h = (tt / 60);
  const hh =  Math.floor(h);
  const m = (h - hh) * 60;
  const mm = Math.round(m);
    timetime =  hh + ':' + mm + ':00';
              const colTime = timetime.split(':');
              var tempTime = '';
              for (let i = 0; i < colTime.length; i++) {
              if (colTime[i].length === 1) {
                if (i != 2) {
                  tempTime = tempTime + '0' + colTime[i]  + ':';
                } else {
                  tempTime = tempTime + '0' + colTime[i];
                }
              } else {
                if ( i != 2) {
                tempTime = tempTime + colTime[i] + ':';
                } else {
                  tempTime = tempTime + colTime[i];
                }
              }
              }
              this.filterTimeSpent = tempTime;
             filterData = {
     'RoomName': this.AnalyticsFilterDetail.RoomName,
     'FromDate': null,
     'ToDate': null,
     'TimeSpent': this.filterTimeSpent,
     'Comparison': this.AnalyticsFilterDetail.Comparison
        };
        } else if (this.AnalyticsFilterDetail.RoomName && this.AnalyticsFilterDetail.RangeDate) {
this.AnalyticsFilterDetail.FromDate = this.AnalyticsFilterDetail.RangeDate[0];
  this.AnalyticsFilterDetail.ToDate = this.AnalyticsFilterDetail.RangeDate[1];
  this.AnalyticsFilterDetail.FromDate = this.convert(this.AnalyticsFilterDetail.FromDate);
  this.AnalyticsFilterDetail.ToDate  = this.convert(this.AnalyticsFilterDetail.ToDate);
             filterData = {
     'RoomName': this.AnalyticsFilterDetail.RoomName,
     'FromDate': this.AnalyticsFilterDetail.FromDate + ' 00:00:00',
     'ToDate':  this.AnalyticsFilterDetail.ToDate + ' 23:59:59',
     'TimeSpent': null ,
     'Comparison': null
        };
        }  else if (this.AnalyticsFilterDetail.TimeSpent && this.AnalyticsFilterDetail.Comparison && this.AnalyticsFilterDetail.RangeDate ) {
 const comparison = this.AnalyticsFilterDetail.Comparison;
         this.AnalyticsFilterDetail.Comparison = comparison.split(' ')[0];
  var timetime = this.AnalyticsFilterDetail.TimeSpent;
   const tt = (timetime);
  const h = (tt / 60);
  const hh =  Math.floor(h);
  const m = (h - hh) * 60;
  const mm = Math.round(m);
    timetime =  hh + ':' + mm + ':00';
              const colTime = timetime.split(':');
              var tempTime = '';
              for (let i = 0; i < colTime.length; i++) {
              if (colTime[i].length === 1) {
                if (i != 2) {
                  tempTime = tempTime + '0' + colTime[i]  + ':';
                } else {
                  tempTime = tempTime + '0' + colTime[i];
                }
              } else {
                if ( i != 2) {
                tempTime = tempTime + colTime[i] + ':';
                } else {
                  tempTime = tempTime + colTime[i];
                }
              }
              }
              this.filterTimeSpent = tempTime;
  this.AnalyticsFilterDetail.FromDate = this.AnalyticsFilterDetail.RangeDate[0];
  this.AnalyticsFilterDetail.ToDate = this.AnalyticsFilterDetail.RangeDate[1];
  this.AnalyticsFilterDetail.FromDate = this.convert(this.AnalyticsFilterDetail.FromDate);
  this.AnalyticsFilterDetail.ToDate  = this.convert(this.AnalyticsFilterDetail.ToDate);
  filterData = {
     'RoomName': null,
     'FromDate': this.AnalyticsFilterDetail.FromDate + ' 00:00:00',
     'ToDate':  this.AnalyticsFilterDetail.ToDate + ' 23:59:59',
     'TimeSpent': this.filterTimeSpent,
     'Comparison': this.AnalyticsFilterDetail.Comparison
        };
        } else if (this.AnalyticsFilterDetail.RangeDate && this.AnalyticsFilterDetail.RoomName) {
this.AnalyticsFilterDetail.FromDate = this.AnalyticsFilterDetail.RangeDate[0];
  this.AnalyticsFilterDetail.ToDate = this.AnalyticsFilterDetail.RangeDate[1];
  this.AnalyticsFilterDetail.FromDate = this.convert(this.AnalyticsFilterDetail.FromDate);
  this.AnalyticsFilterDetail.ToDate  = this.convert(this.AnalyticsFilterDetail.ToDate);
  filterData = {
     'RoomName': this.AnalyticsFilterDetail.RoomName,
     'FromDate': this.AnalyticsFilterDetail.FromDate + ' 00:00:00',
     'ToDate':  this.AnalyticsFilterDetail.ToDate + ' 23:59:59',
     'TimeSpent': null,
     'Comparison': null
        };
        } else  if (this.AnalyticsFilterDetail.RoomName) {
       filterData = {
     'RoomName': this.AnalyticsFilterDetail.RoomName,
     'FromDate': null,
     'ToDate': null,
     'TimeSpent': null,
     'Comparison': null
        };
        } else if ( this.AnalyticsFilterDetail.TimeSpent && this.AnalyticsFilterDetail.Comparison) {
           const comparison = this.AnalyticsFilterDetail.Comparison;
  this.AnalyticsFilterDetail.Comparison = comparison.split(' ')[0];
  var timetime = this.AnalyticsFilterDetail.TimeSpent;
  const tt = (timetime);
  const h = (tt / 60);
  const hh =  Math.floor(h);
  const m = (h - hh) * 60;
  const mm = Math.round(m);
    timetime =  hh + ':' + mm + ':00';
              const colTime = timetime.split(':');
              var tempTime = '';
              for (let i = 0; i < colTime.length; i++) {
              if (colTime[i].length === 1) {
                if (i != 2) {
                  tempTime = tempTime + '0' + colTime[i]  + ':';
                } else {
                  tempTime = tempTime + '0' + colTime[i];
                }
              } else {
                if ( i != 2) {
                tempTime = tempTime + colTime[i] + ':';
                } else {
                  tempTime = tempTime + colTime[i];
                }
              }
              }
              this.filterTimeSpent = tempTime;
             filterData = {
     'RoomName': null,
     'FromDate': null,
     'ToDate': null,
     'TimeSpent': this.filterTimeSpent,
     'Comparison': this.AnalyticsFilterDetail.Comparison
        };
        } else if ( this.AnalyticsFilterDetail.RangeDate) {
  this.AnalyticsFilterDetail.FromDate = this.AnalyticsFilterDetail.RangeDate[0];
  this.AnalyticsFilterDetail.ToDate = this.AnalyticsFilterDetail.RangeDate[1];
  this.AnalyticsFilterDetail.FromDate = this.convert(this.AnalyticsFilterDetail.FromDate);
  this.AnalyticsFilterDetail.ToDate  = this.convert(this.AnalyticsFilterDetail.ToDate);
             filterData = {
     'RoomName': null,
     'FromDate': this.AnalyticsFilterDetail.FromDate + ' 00:00:00',
     'ToDate':  this.AnalyticsFilterDetail.ToDate + ' 23:59:59',
     'TimeSpent': null ,
     'Comparison': null
        };
        }
        // this.AnalyticsFilterDetail.Comparison = 'Greater than';
        this.apiService.postData('analytics/published/' + this.userId + '/' + this.publishedExperienceId, filterData)
  .subscribe((apiresults) => {
    this.tableData = apiresults;
    this.tableData = this.tableData.data;
        if (this.tableData.length === 0) {
      this.tableDataFlagFilter = 1;
    } else {
      this.tableDataFlagFilter = 0;
    }
   },
    (err) => {});
}

goToReport(template: TemplateRef<any>, reportRoomIdd: number, reportRoomName: string, PatronsCount: number, PublishedExperienceRoomMappingId: number) {
 this.reportModalRoomId = reportRoomIdd;
  this.ReportRoomName = reportRoomName;
  this.experienceViewCount = PatronsCount;
  this.PublishedExperienceRoomMappingId=PublishedExperienceRoomMappingId;
 const AnalyticsVerbose = this.apiService.getData('analytics/publishedDownload/' + this.userId + '/' + this.reportModalRoomId + '/' +  this.publishedExperienceId+ '/'+PublishedExperienceRoomMappingId);
    AnalyticsVerbose.subscribe(data => {
      this.AnalyticsVerboseData = data;
      if (this.AnalyticsVerboseData.data.PatronData.length === 0) {
        // this.popToast('error', 'Looks like your publish analytics report has no data to report yet.');
     this.toastrService.error('Looks like your publish analytics report has no data to report yet.');
      } else {
        this.modalRef = this.modalService.show(template, { class: 'modal-content-radius' });

      }
    },
      error => {
      });

 this.radioValue = 'PDF';
}


handleChange(event:any) {
  const value = event;
this.radioValue = value;
}

getReportDownload() {
let ReportData;
   ReportData = this.AnalyticsVerboseData;
  
   if (this.radioValue === 'PDF') {
  this.downloadPDF();
  } else {
         const data111 =  this.AnalyticsVerboseData.data.PatronData;
         const ele3 = 'Date';
         const ele4 = 'Score';
         const ele5 = 'IsScore';
         for (let i = 0; i < data111.length; i++) {
          data111[i][ele3] = new Date(data111[i][ele3]).toISOString().slice(0, 10);
          if (data111[i][ele5] == 0) {
            data111[i][ele4] = 'N/A';
          } else {
            data111[i][ele4] = data111[i][ele4] ;
          }
          delete data111[i][ele5];
        }
        this.tempData = data111;
        this.downloadCSV();
  }
   this.modalRef.hide();
}

downloadCSV () {
  const headers = ['Patron Name', 'Experience Name', 'Experience Viewed Date', 'Time Spent', 'Score', 'Result'];
  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    noDownload: true,
  };

new AngularCsv(this.tempData, 'Experizer_CSV_' + this.ReportRoomName, { headers: (headers) });
    // this.popToast('success', 'Yippiee! Your file has been downloaded. Check your downloads folder.');
  this.toastrService.success('Yippiee! Your file has been downloaded. Check your downloads folder.');
  }

downloadPDF () {
  const img = new Image();
  img.crossOrigin = '';
  const classOBJ:any = this;
  const PatronsCount = this.experienceViewCount;
  img.onload = function() {
    const canvasEl: HTMLCanvasElement = classOBJ.canvas.nativeElement;
    canvasEl.height = img.height;
    canvasEl.width = img.width;
    classOBJ.cx = canvasEl.getContext('2d');
    classOBJ.cx.fillStyle = '#ffffff';
    classOBJ.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    classOBJ.cx.drawImage(img, 0, 0);
            classOBJ.imgData = canvasEl.toDataURL();
    const col = ['Patron Name', 'Experience Name', 'Experience Viewed Date', 'Time Spent', 'Score','Result'];
    const rows:any = [];

    const RoomName = classOBJ.AnalyticsVerboseData.data.RoomData[0].RoomName;
    

    let CreatedOnDate = classOBJ.AnalyticsVerboseData.data.RoomData[0].CreatedOn;
    const roomCDate = new Date(CreatedOnDate).toISOString().slice(0, 10);
    CreatedOnDate = roomCDate;
    let UpdatedOnDate = classOBJ.AnalyticsVerboseData.data.RoomData[0].UpdatedOn;
    const roomMDate = new Date(UpdatedOnDate).toISOString().slice(0, 10);
    UpdatedOnDate = roomMDate;
    const TimeSpent = classOBJ.AnalyticsVerboseData.data.RoomData[0].TimeSpent;

    classOBJ.AnalyticsVerboseData.data.PatronData.forEach((element:any) => {
      const expCDate = new Date(element.Date).toISOString().slice(0, 10);
      // const expMDate = new Date(element.UpdatedOn).toISOString().slice(0, 10);
      element.Date = expCDate;
      if (element.IsScore == 0) {
        element.Score = 'N/A';
      } else {
        element.Score = element.Score;
      }
       const temp = [element.FIRST_USER, element.ExperienceName, element.Date, element.MinutesSpent, element.Score,element.Result];
      rows.push(temp);
  });
  const doc = new jsPDF.default('landscape');
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
        doc.setFontSize(12);
        doc.text(15, 30, 'Room Name: ');
        doc.text(43, 30, RoomName);

        doc.text(15, 38, 'Time Spent: ');
        doc.text(43, 38, TimeSpent);
        doc.text(200, 38, 'View Count: ');
        doc.text(228, 38, PatronsCount+'');

        doc.text(15, 46, 'Last Published Date: ');
        doc.text(58, 46, UpdatedOnDate);
        // doc.text(200, 46, 'Experience Modified On: ');
        // doc.text(250, 46, UpdatedOnDate);

        doc.setFontSize(10);
        doc.line(15, 50, 283, 50);
      };
    doc.setTextColor(233, 120, 91);
    doc.autoTable(col, rows, {
      theme: 'grid',
      margin: {top: 58},
      styles: {overflow: 'linebreak', cellWidth: 'wrap'},
      beforePageContent: header,
      afterPageContent: footer,
      });

        if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

    doc.save('Experizer_PDF_' + classOBJ.ReportRoomName + '.pdf' );
  };
  img.src = './assets/images/dashboard/pdf/experizerlogo_335.png';
  // this.popToast('success', 'Yippiee! Your file has been downloaded. Check your downloads folder.');
  this.toastrService.success('Yippiee! Your file has been downloaded. Check your downloads folder.');
}

addTime() {
        let hour = 0;
        let minute = 0;
        let second = 0;

  if (this.countData.data.length !== 0) {
this.countData.data.forEach( (time:any) => {
  const timespentadd = time.TimeSpent;
  if(timespentadd!=null){
  const splitTime = timespentadd.split(':');
   hour =hour+ parseInt(splitTime[0]);
   minute =minute+ parseInt(splitTime[1]);
   second = second + parseInt(splitTime[2]) ;
  }
});
if(second>60){
    minute = minute + (second / 60);
    second = second % 60;
}
if(minute>=60){
    hour = hour + (minute / 60);
    minute = minute % 60;
}
const totaltime =  + Math.round(hour) + ':' + Math.round(minute) + ':' + Math.round(second);
const splitMin = totaltime.split(':'); // split it at the colons
this.totalTimeSpenMinute = (+splitMin[0]) * 60 + (+splitMin[1]) + Math.round(+splitMin[2]/60);
// /avg
this.avgTimeSpenMinute = this.totalTimeSpenMinute / this.countData.data.length;
this.avgTimeSpenMinute = Math.round(this.avgTimeSpenMinute);
  } else {
    this.avgTimeSpenMinute = 0;
    this.totalTimeSpenMinute = 0;
  }
}

maxTime() {
  this.MaxTimeSpent = 0; 
   if (this.countData.data.length !== 0) {
     this.countData.data.forEach( (time:any) => {
      const maxTime = time.TimeSpent;
      if(maxTime!=null){
        const splitMin = maxTime.split(':');
         if(Math.round((+splitMin[0]) * 60 + (+splitMin[1])) > this.MaxTimeSpent)
            this.MaxTimeSpent = Math.round((+splitMin[0]) * 60 + (+splitMin[1]) + (Math.round((+splitMin[2])/60)));
      }
    });
    } 
}

totalScore() {
  let scoreAddition = 0;
const avgLen =  this.AnalyticsVerboseData.data.PatronData.length;
if (avgLen === 0) {
 this.AvgScore = 0;
} else {
 this.AnalyticsVerboseData.data.forEach( (score:any) => {
 scoreAddition = scoreAddition + score.PatronData;
});

this.TotalScore = scoreAddition;
if (this.TotalScore === 0) {
 this.AvgScore = 0;
} else {
this.AvgScore = this.TotalScore / avgLen;
}

}
}


 // Toaster popup
  // popToast(message:any, Body:any) {
  //   this.toasterService.pop(message, Body);
  // }

}
