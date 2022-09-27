import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginValidationComponent } from './login-validation/login-validation.component';
import { LoginComponent } from './login/login.component';
import { StorageSubscriptionManagementComponent } from './storage-subscription-management/storage-subscription-management.component';
import { ThreeDAssetManagementComponent } from './three-d-asset-management/three-d-asset-management.component';
import { PatronManagementComponent } from './patron-management/patron-management.component';
import { NeedHelpComponent } from './need-help/need-help.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { MobileappComponent } from './mobileapp/mobileapp.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { TermsComponent } from './terms/terms.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CreateExperienceComponent } from './create-experience/create-experience.component';
import { PublishAnalyticsComponent } from './publish-analytics/publish-analytics.component';
import { PublishedHistoryComponent } from './published-history/published-history.component';
import { RoomReportComponent } from './room-report/room-report.component';
import { PreDashboardComponent } from './pre-dashboard/pre-dashboard.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'LoginValidation', component: LoginValidationComponent, canActivate: [AuthGuard] },
{ path: 'roomreport/:roomId/:roomName', component: RoomReportComponent , canActivate: [AuthGuard]},
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'preDashboard', component: PreDashboardComponent, canActivate: [AuthGuard] },
{ path: '3dassetmanagement', component:ThreeDAssetManagementComponent},
{ path: 'subscription', component: StorageSubscriptionManagementComponent},
{ path: 'dashboard/myexperience', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'dashboard/publishedexperience', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'dashboard/createexperience', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'userverification/:id/:code', component: UserVerificationComponent},
{ path: 'dashboard/rooms', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'patron', component: PatronManagementComponent, canActivate: [AuthGuard] },
{ path: 'needhelp', component: NeedHelpComponent},
{ path: 'topics', component: CreateaccountComponent},
{ path: 'topics/create', component: CreateaccountComponent},
{ path: 'topics/vrexperience', component: CreateaccountComponent},
{ path: 'topics/assignroom', component: CreateaccountComponent},
{ path: 'topics/newroom', component: CreateaccountComponent},
{ path: 'topics/trackxapi', component: CreateaccountComponent},
{ path: 'topics/mywork', component: CreateaccountComponent},
{ path: 'mobileapp', component: MobileappComponent},
{ path: 'faqs', component: MyaccountComponent},
{ path: 'copyright', component: CopyrightComponent},
{ path: 'assetsmanagement', component:AssetsManagementComponent, canActivate: [AuthGuard] },
{ path: 'getstarted', component: GetstartedComponent},
{ path: 'personalinfo', component: PersonalInfoComponent, canActivate: [AuthGuard] },
{ path: 'term', component: TermsComponent},
{ path: 'privacypolicy', component: TermsComponent},
{ path: 'publishedhistory/:publishedId/:templateName/:experienceName', component: PublishedHistoryComponent, canActivate: [AuthGuard] },
{ path: 'publishanalytics/:publishedExpId/:publishedTempName/:publishedExpName', component: PublishAnalyticsComponent, canActivate: [AuthGuard] },
{ path: 'createexperience/:experienceId/:templateName/:experienceName', component: CreateExperienceComponent, canActivate: [AuthGuard],canDeactivate: [AuthGuard] },
{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [
  NeedHelpComponent
]
