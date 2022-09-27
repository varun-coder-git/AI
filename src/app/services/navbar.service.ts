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
import { Injectable } from '@angular/core';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible: boolean;
  Email:any;
  UserName:string|undefined;
  PlanName:string|undefined;

  constructor() { this.visible = false; }

  hide() { 
     Promise.resolve(null).then(() => this.visible = false);  
    $(".page-content").removeClass("unshrinked-body");
  }

  show() { 
    Promise.resolve(null).then(() => this.visible = true);
    if($("#sidebar").hasClass("shrinked"))
    {    
      $(".page-content").addClass("shrinked-body");
    }
    else
    {
      $(".page-content").addClass("unshrinked-body");
    }
  }

  toggle() { this.visible = !this.visible; }

 
}
