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
import { Component } from '@angular/core';

export class FormDataComponent {
  public user: user;
  public IntialExperience: IntialExperience;
  public CloneExperience: CloneExperience;
  // public SetCallback: SetCallback;
  public Room: Room;     
  public ExperienceSaveAs: ExperienceSaveAs;   
  constructor() {
    this.user = new user();
    this.IntialExperience = new IntialExperience();
    this.CloneExperience = new CloneExperience();
    this.Room = new Room();
    this.ExperienceSaveAs = new ExperienceSaveAs();
  }
}

export class LoginFormDataComponent {
  public login_details:LoginDetail;    
  constructor() {
    this.login_details = new LoginDetail();
  }
}

export class IntialExperience{
   public UserId: any;
  public ExperienceTemplateId: any;
  public ExperienceId: any;
  public ExperienceName: any;
  public IsSampleExperience: any;
  constructor() { }
}

export class SetCallback{
   public UserId: any;
  public RequestTypeId: any;
  public TimeZone: any;
  constructor() { }
}

export class CloneExperience{
  public Id: any;
  public ExperienceName: any;
  public IsSampleExperience: any;
  public UserId: any;
  constructor() { }
}

export class Room{
  public UserId: any;
  public StatusId: any;
  public RoomName: any;
  public TotalViews: any;
  public IsAlwaysActive: any;
  public IsPublic: any;
  public StartDate: any;
  public EndDate:any;
  public EnablexAPI: any;
  public LRSProfileId:any;
  constructor() { }
}

export class UserDetail {
  public UserId: any;
  public Name: any;
  public Email: any;
  public Address: any;
  public ContactNumber: any;
  public OrganizationName: any;
  constructor() { }
}

export class LoginDetail {
  public UserName: any;
  public Password: any;
  public LoginMode: any;
  public LoginType: any;
  public IpAddress: any;
  constructor() { }
}

export class SocialLoginDetail {
  public name: any;
  public email: any;
  public token: any;
  public LoginMode: any;
  public OrganizationName: any;
  public profileImageSrc:any;
  public ContactNumber: any;
  constructor() { }
}

export class user {
  public UserDetail: UserDetail;
  public UserName: any;
  public Password: any;
  public StatusId: any;
  public RoleId: any;
  public IsOrganisation: any;
  constructor() { 
    this.UserDetail = new UserDetail();
  }
}

export class ForgotPasswordDetail {
  public UserName: any;
  public Password: any;
  public OTP: any;
  constructor() { }
}

export class PatronFilterDetail {
  public Name: any;
  public Email: any;
  public Status: any;
  constructor() {}
}

export class PatronAddDetail {
  public Username: any;
  public Email: any;
  constructor() {}
}

export class ExperienceSaveAs {
  public ExperienceTemplateId: any;
  public UserId: any;
  public ThumbnailImagePath: any;
  public ExperienceJSON: any;
  public IsSampleExperience: any;
  public ExperienceName: any;
  constructor() {}
}

export class XapiSingleProfileData {
  public UserId: any;
  public RoomId: any;
  public ProfileName: any;
  public EndPointUrl: any;
  public AuthUserKey: any;
  public AuthSecretKey: any;
  constructor() {}
}

export class AnalyticsFilterDetail {
  public RangeDate: any;
  public FromDate: any;
  public ToDate: any;
  public RoomName: any;
  public TimeSpent: any;
  public Comparison: any;
  constructor() {}
}

export class threeDAssetFolderDetails {
  public UserId: any;
  public ParentFolder: any;
  public FolderName: any;
  constructor() {}
}

export class threeDAssetFolderRenameDetails {
  public  Id: any;
  public UserId: any;
  public ParentFolder: any;
  public oldFolderName: any;
  public renameFolderName: any;
  constructor() {}
}
