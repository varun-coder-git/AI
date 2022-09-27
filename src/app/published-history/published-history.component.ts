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
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Http, ResponseContentType } from '../../../node_modules/@angular/http';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
declare var $ :any;

@Component({
  selector: 'app-published-history',
  templateUrl: './published-history.component.html',
  styleUrls: ['./published-history.component.css']
})
export class PublishedHistoryComponent implements OnInit {

  today: number = Date.now();
  datePickerConfig: Partial<BsDatepickerConfig>;
  MainHeader: string;
  MainHeaderExperience: string;
  SubHeader: string;
  SelectDate!: string;
  TimeSpent!: string;
  GreaterThan!: string;
  LessThan!: string;
  Score!: string;
  CompletionStatus!: string;
  Complete!: string;
  InComplete!: string;
  ViewLog: string;
  tableData!: any[];
  tableDataCount!:number;
  menuItemsFiterGreaterLesser: any[];
  menuItemsFiterStatus: any[];
  SelectedStatusValue: string;
  score: string;
  time: string;
  http!: Http;
  result: any;
  publishedExperienceId!:number;

  constructor(public nav: NavbarService,public router: Router,private route: ActivatedRoute,private ApiService:ApiService) {
    this.result = '';
    this.score = '';
    this.time = '';
    this.ViewLog = 'Published History';
    this.MainHeader = '';
    this.MainHeaderExperience = '';
    this.SubHeader = '';
    this.SelectedStatusValue = '';
    this.menuItemsFiterGreaterLesser = [{Menu: 'Greater Than'}, {Menu: 'Less Than'}];
    this.menuItemsFiterStatus = [{Menu: 'Complete'}, {Menu: 'Incomplete'}];
    this.datePickerConfig = Object.assign({}, {showWeekNumbers: false, dateInputFormat: 'MMM DD, YYYY'});
    
   }

  ngOnInit() {
    this.nav.show(); 
    $(".tabPointer").css("display","none");
    $("nav#sidebar li").removeClass("active");

    this.route.params.subscribe(params => {
      this.publishedExperienceId = params['publishedId'];
      this.SubHeader = params['templateName'];
      this.MainHeader = params['experienceName'];
      this.getPublishedHistory(); 
    });
    
  }

  getPublishedHistory()
  {
    let experienceTemplateData = this.ApiService.getData('experience/getPublishedHistory/'+this.publishedExperienceId);
      experienceTemplateData.subscribe((data:any) => {
        this.tableData = data['data'];
        this.tableDataCount = this.tableData.length;
      },
      error=>{
        // console.log(error);
      })
  }

  selectedDropdownScoreValue(e:any)
  {
    // console.log(e.target.textContent); 
  }
  selectedDropdownTimeValue(e:any) 
  {
     // console.log(e.target.textContent); 
  }
  selectedDropdownStatusValue(e:any) 
  {
    this.SelectedStatusValue =  e.target.textContent; 
  }

  backToDashboard()
  {
    this.router.navigateByUrl('/dashboard');
  }

    

}
