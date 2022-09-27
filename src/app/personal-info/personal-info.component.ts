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
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
declare var $ :any;

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit() {
     this.nav.show();
    $(".tabPointer").css("display","none");
    $("nav#sidebar li").removeClass("active");
  }

  editUserInfo()
  {
    
      $(".content-value").addClass("hidden");
      $(".content-value-input-hidden").addClass("content-value-input");
      $(".content-value-input").removeClass("content-value-input-hidden");
      $(".user-info-action-div").removeClass("hidden");
    
  }

  cancelEditing()
  {
    $(".content-value").removeClass("hidden");
      $(".content-value-input").addClass("content-value-input-hidden");
      $(".content-value-input-hidden").removeClass("content-value-input");
      $(".user-info-action-div").addClass("hidden");
  }
}
