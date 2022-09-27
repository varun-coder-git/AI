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
import { ApiService } from '../services/api.service';
//import { FormDataComponent,} from './../data-model/formData.component';

@Component({
  selector: 'app-pre-dashboard',
  templateUrl: './pre-dashboard.component.html',
  styleUrls: ['./pre-dashboard.component.css']
})
export class PreDashboardComponent implements OnInit {
 // FormDataComponent: FormDataComponent;
  panelData = [
    { id: 1, name: 'Training & Development', image: 'assets/images/preDashboard/dashboard2.jpg' },
    { id: 2, name: 'Human Resources', image: 'assets/images/preDashboard/dashboard5.jpg' },
    { id: 3, name: 'Marketing', image: 'assets/images/preDashboard/dashboard4.jpg' },
    { id: 4, name: 'Education', image: 'assets/images/preDashboard/dashboard1.jpg' },
    { id: 5, name: 'Corporate', image: 'assets/images/preDashboard/dashboard6.jpg' },
    { id: 6, name: 'Real Estate', image: 'assets/images/preDashboard/dashboard3.jpg' },
    { id: 7, name: 'Engineering', image: 'assets/images/preDashboard/dashboard7.jpg' },
  ];

  constructor(public nav: NavbarService,private serviceApi: ApiService,) {
  //  this.FormDataComponent = new FormDataComponent();
   }

  ngOnInit() {
    this.nav.hide();
  }


  addCategory(itemId:any){
    let userID=Number(window.sessionStorage.getItem('userId'));
    const categoryID=itemId;
    window.sessionStorage.setItem('PersonaId', categoryID);
    localStorage.setItem('PersonaId', categoryID);
    // // console.log("userID",userID);
    // // console.log("categoryID",categoryID);
    this.serviceApi.getData("predashboard/setUserCategorory/"+userID+"/"+categoryID)
    .subscribe(
      response => {

      },
      error => {
    
      }
      );
  }  
}
