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

import { Component, OnInit , OnDestroy} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
declare var $: any;
@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit ,OnDestroy {
  id!: number;
  code!: string;
  private sub: any;
  public isVisible:any = -1;
  public successMsg:any = -1;
  public RoleId!:number;
  constructor(private serviceApi: ApiService,public nav: NavbarService,
    private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.nav.hide();
        this.route.params.subscribe(params => {
          this.id = params['id'];
          this.code = params['code'];

          this.verifyUser();
      }); 
       this.isVisible = 1;   
  }

   verifyUser() {
    this.serviceApi.getData('user/activateUser/'+ this.id+'/'+this.code)
      .subscribe((results:any) => {        
        if(results['status'] == true)
        {
            this.RoleId = results['data']['RoleId'];
            this.isVisible = 0;
            this.successMsg = 1;
        }
      }, (error) =>{
        this.successMsg = 0;
        this.isVisible = 0;
      });
  }

  ngOnDestroy() {
   
  }

}
