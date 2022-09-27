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

import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
//
import { ToastrService } from 'ngx-toastr';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-room-report',
  templateUrl: './room-report.component.html',
  styleUrls: ['./room-report.component.css']
})
export class RoomReportComponent implements OnInit {

  roomId!: number;
  roomName!: string;
  noDataDisplayFlag!: boolean;
  responseTableData: any = [];
  viewedObjectFlag!: boolean;
  userTableDataFlag!: boolean;
  experinceId!: number;
  private toasterService: ToasterService;
  public toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade',
    showCloseButton: true,
    timeout: 3000
  });

  totalRec!: number;
  totalRecExperince!: number;
  page : number = 1;
  p : number = 1;

  private responseViewed: any;
  public responseUserData: any;
  public responsePublishExperinceData: any;

  public barChartOptionsPatron:any = {};
  public barChartOptionsUser:any = {};
  public barChartOptionsObject:any = {};
  public barChartLabels:string[] = [];
  public barChartType:ChartType = 'bar';
  public barChartLegend:boolean = true;
  public publishExperinceDataFlag:boolean = false;
 
  public barChartData:any[] = [];
  public barChartDataViewedObject:any[] = [];
  public barChartDataUser:any[] = [];
  public barChartDataUserGraph:any[] = [];

  viewPatronFlag:boolean = false;
   
  graphLabel = [
  { id: 1, name: 'ViewCountNone', title: 'Minimum Views'},
  { id: 2, name: 'ViewCountOne', title: 'Average Views'},
  { id: 3, name: 'ViewCountMultiple', title: 'Maximum Views'}
  ];

  constructor(
    public toastrService: ToastrService,
    public nav: NavbarService,
              public router: Router,
              private route: ActivatedRoute,
              private serviceApi: ApiService,
              toasterService: ToasterService,
              private spinnerService: NgxSpinnerService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.nav.show();
    this.route.params.subscribe(params => {
      this.roomId = params['roomId'];
      this.roomName = params['roomName'];
    });
    this.noDataDisplayFlag = false;
    this.viewedObjectFlag = false;
    //let url = 'analytics/room/34534';
    let url = 'analytics/room/' + this.roomId;
    this.getRoomData(url);
    //let urlViewedObject = 'verbose/roomAnalytics/1';    //verbose/roomAnalytics/:RoomId
    let urlViewedObject = 'verbose/roomAnalytics/' + this.roomId;    //verbose/roomAnalytics/:RoomId
    this.getViewedObjectData(urlViewedObject);
  }

  // popToast(messageType:any, message:any) {
  //   this.toasterService.pop(messageType, message);
  // }

  /*This function is used to show active Tab which is selected and call appropriate function to show data*/ 
  onTabClicked(number:any) {
    $(".tabset-header").removeClass("active");
    $(".tab-content").removeClass("active");

    $(".tab"+number).addClass("active");
    $("#tab"+number).addClass("active");

    this.page = 1;
    this.p = 1;
    if(number == 1) {
      let url = 'analytics/room/' + this.roomId;
      this.getRoomData(url);

      //let urlViewedObject = 'verbose/roomAnalytics/1';    //verbose/roomAnalytics/:RoomId
      let urlViewedObject = 'verbose/roomAnalytics/' + this.roomId;    //verbose/roomAnalytics/:RoomId
      this.getViewedObjectData(urlViewedObject);

    }
    else if(number == 2) {
      
      //let urlUserTableData = 'analytics/roompublishexperiencelist/1';    //analytics/roompublishexperiencelist/:RoomId
      let urlUserTableData = 'analytics/roompublishexperiencelist/' + this.roomId;    //analytics/roompublishexperiencelist/:RoomId
      this.getUserTableData(urlUserTableData);
      
    }
  }

  getRoomData(url:any) {
    this.spinnerService.show();
    
    this.serviceApi.getData(url)
      .subscribe(
        (responseData:any) => {
          let maxBarChartValue = Math.max( responseData['data']['ViewCountOne'], responseData['data']['ViewCountMultiple'], responseData['data']['ViewCountNone']);
          let maxChartValue = maxBarChartValue  > 10 ? maxBarChartValue : 10;
          this.barChartOptionsPatron= {
            scaleShowVerticalLines: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    categorySpacing: 55,
                    scaleLabel: {
                      display: true,
                      labelString: 'Views',
                    },
                    categoryPercentage: 1.0
                }],
                yAxes: [{ 
                  ticks: {
                    min: 0,
                    max: maxChartValue
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Count',
                  }
                }]
            },
            legend:false,
            title: {
              display: true,
              margin: {
                left: 2
              },
              text: 'Patron View Analysis',              
              fontSize: 24,
              fontWeight: 700,
              fontColor: '#31A38D',
              fontFamily: 'Open-Sans-Regular',

            },
            tooltips: { enabled: true}
          };
          if ( (responseData['data']['ViewCountOne'] >= 1) || (responseData['data']['ViewCountMultiple'] >= 1) || (responseData['data']['ViewCountNone'] >= 1) ) {
            this.viewPatronFlag = true;
            let maxBarChart = Math.max(responseData['data']['ViewCountNone'], responseData['data']['ViewCountOne'], responseData['data']['ViewCountMultiple']);
            let minBarChart = Math.min(responseData['data']['ViewCountNone'], responseData['data']['ViewCountOne'], responseData['data']['ViewCountMultiple']);
            let avgBarChart = Math.round((parseInt(responseData['data']['ViewCountNone']) + parseInt(responseData['data']['ViewCountOne']) + parseInt(responseData['data']['ViewCountMultiple'])) / 3);
            this.barChartData = [
              {data: [ minBarChart ], label: this.graphLabel['0'].title},
              {data: [ avgBarChart ], label: this.graphLabel['1'].title},
              {data: [ maxBarChart ], label: this.graphLabel['2'].title}
            ];
          } else {
            this.viewPatronFlag = false;
          }
          if ( (responseData !== null) && (responseData !== undefined) && (responseData['data']['PatronData'].length > 0) ) {
            
            this.responseTableData = responseData['data']['PatronData'];
            this.noDataDisplayFlag = true;
            this.barChartDataUser =[];
            var mins;
            var timeArr = [];
            var timeToNum = 0;
            this.totalRec = this.responseTableData.length;
            let responseTableDataForChart = responseData['data']['PatronTimeSpentData'];
            for (var i = 0; i < responseTableDataForChart.length; i++) {
              mins = responseTableDataForChart[i].TimeSpent;
              timeArr = mins.split(":");
              if (parseInt(timeArr[0]) > 0) {
                timeToNum = parseInt(timeArr[0]) * 60 * 60;
              }
              if (parseInt(timeArr[1]) > 0) {
                timeToNum = timeToNum + (parseInt(timeArr[1]) * 60);
              }
              if (parseInt(timeArr[2]) > 0) {
                timeToNum = timeToNum + parseInt(timeArr[2]) ;
              }
              this.barChartDataUser.push({data:[timeToNum], label: responseTableDataForChart[i].Name}); 
              timeToNum = 0;             
            }
            this.barChartDataUserGraph = [];
            var userLength = this.barChartDataUser.length > 10 ? 10 : this.barChartDataUser.length;
            for (var j = 0; j < userLength; j++) {
              this.barChartDataUserGraph.push(this.barChartDataUser[j]);
            }
            var barChartDataUser1 = this.barChartDataUserGraph;
            this.barChartOptionsUser = {
              scaleShowVerticalLines: false,
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  xAxes: [{
                      categorySpacing: 55,
                      scaleLabel: {
                        display: true,
                        labelString: 'User'
                      },
                      categoryPercentage: 1.0
                  }],
                  yAxes: [{ ticks: { min:0, 
                  callback: function(label:any, index:any, labels:any) {
                          var date = new Date (0);
                          date.setSeconds(label); // specify value for SECONDS here
                          var result = date.toISOString().substr(11, 8);
                              return result;
                          }},
                        scaleLabel: {
                          function (tooltipItem:any,barChartDataUser1:any) {
                            var temp = tooltipItem.yLabel;
                            var date = new Date(0);
                            date.setSeconds(tooltipItem.yLabel); // specify value for SECONDS here
                            var result = date.toISOString().substr(11, 8);
                            var label = result;
                                return label;
                          },
                          display: true,
                          labelString: 'Time'
                        }
                  }]
              },
              legend:false,
              title: {
                display: true,
                text: 'Top 20 User Timespents',         
                fontSize: 24,
                fontWeight: 700,
                fontColor: '#31A38D',
                fontFamily: 'Open-Sans-Regular',
              },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem:any, barChartDataUser1:any) {
                      var label = barChartDataUser1.datasets[tooltipItem.datasetIndex].label;
                      if (label) {
                          label += ': ';
                      }
                      var date = new Date(0);
                      date.setSeconds(tooltipItem.yLabel); // specify value for SECONDS here
                      var result = date.toISOString().substr(11, 8);
                      label += result;
                      return label;
                    },
                    title: ()=>{}
                  }
                }
              };

          } else {
            this.noDataDisplayFlag = false;
          }
          this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
          // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
          this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
           //console.log('Inside error');
        }
      );
  }

  getUserTableData(url:any) {
    this.spinnerService.show();
    
    this.responseUserData = [];
    this.serviceApi.getData(url)
      .subscribe(
        (responseDataUser:any) => {
          if ( (responseDataUser !== null) && (responseDataUser !== undefined) ) {

            this.responseUserData = responseDataUser['data'];
            if(this.responseUserData.length > 0) {
              this.userTableDataFlag = true;
              this.experinceId = this.responseUserData['0'].Id;
              //let urlPublishExperince = 'verbose/getDataByPublishedExperienceAndRoomId/228/7';    //getDataByPublishedExperienceAndRoomId/:ExperienceId/:RoomId
              let urlPublishExperince = 'verbose/getDataByPublishedExperienceAndRoomId/' + this.experinceId + '/' + this.roomId;    //getDataByPublishedExperienceAndRoomId/:ExperienceId/:RoomId
              this.getPublishExperinceData(urlPublishExperince);
            } else {
              this.userTableDataFlag = false;
            }
            
          }
          this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
          // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
          this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
           //console.log('Inside error');
        }
      );
  }

  getViewedObjectData(url:any) {
    this.spinnerService.show();
    
    this.serviceApi.getData(url)
      .subscribe(
        responseDataViewed => {
          this.responseViewed = responseDataViewed;
          var barchartD =[];

          if ( (this.responseViewed !== null) && (this.responseViewed !== undefined) && (this.responseViewed.length > 0) ) {
            for (var i = 0; i < this.responseViewed.length; i++) {
              barchartD.push({data:[this.responseViewed[i].ViewCount], label: this.responseViewed[i].ObjectName});              
            }
            let barChartObjectVal = barchartD.map(function (barchartDValue) {
              return barchartDValue.data[0]
            });
            let maxBarChartObjectValue = Math.max.apply(null,barChartObjectVal);
            let maxChartObjectValue = maxBarChartObjectValue  > 10 ? maxBarChartObjectValue : 10;
            this.barChartOptionsObject = {
              scaleShowVerticalLines: false,
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  xAxes: [{
                      categorySpacing: 55,
                      categoryPercentage: 1.0,
                      scaleLabel: {
                        display: true,
                        labelString: 'Object'
                      }
                  }],
                  yAxes: [{ 
                    ticks: { min: 0, max: maxChartObjectValue },
                    scaleLabel: {
                      display: true,
                      labelString: 'Count'
                    }
                  }]
              },
              legend:false,
              title: {
                display: true,
                text: 'Top 20 Object View Count',
                fontSize: 24,
                fontWeight: 700,
                fontColor: '#31A38D',
                fontFamily: 'Open-Sans-Regular',
              }
            };
            this.barChartDataViewedObject = barchartD;
            this.viewedObjectFlag = true;
          } else {
            this.viewedObjectFlag = false;
          }
          this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
          // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
          //Commenting out because shows redunatant message 
          // this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
           //console.log('Inside error');
        }
      );
  }

  backToDashboard() {
    this.router.navigateByUrl('/dashboard/rooms');
  }

  
  // events
  public chartClicked(e:any):void { }
 
  public chartHovered(e:any):void { }
  
  onChangeExperince(e:any) {
    this.experinceId = e['target']['value'];
    //let urlPublishExperince = 'verbose/getDataByPublishedExperienceAndRoomId/228/7';    //getDataByPublishedExperienceAndRoomId/:ExperienceId/:RoomId
    let urlPublishExperince = 'verbose/getDataByPublishedExperienceAndRoomId/' + this.experinceId + '/' + this.roomId;    //getDataByPublishedExperienceAndRoomId/:ExperienceId/:RoomId
    this.getPublishExperinceData(urlPublishExperince);
  }

  getPublishExperinceData(url:any) {
    this.spinnerService.show();
    
    this.serviceApi.getData(url)
      .subscribe(
        responsePublishExperince => {
          this.responsePublishExperinceData = responsePublishExperince;
          if ( (this.responsePublishExperinceData !== null) && (this.responsePublishExperinceData !== undefined) && (this.responsePublishExperinceData.length > 0) ) {
            this.publishExperinceDataFlag = true;
            this.totalRecExperince = this.responsePublishExperinceData.length;
          } else {
            this.publishExperinceDataFlag = false;
          }
          this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
          // this.popToast('error', 'Woooops! Looks like something is not right in here. Can you try doing that again?');
          this.toastrService.error('Woooops! Looks like something is not right in here. Can you try doing that again?');
           //console.log('Inside error');
        }
      );
  }
}
