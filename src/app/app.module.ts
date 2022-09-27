import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {ToasterModule} from 'angular2-toaster';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule, } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { OrderModule } from 'ngx-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LoginValidationComponent } from './login-validation/login-validation.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { PatronManagementComponent } from './patron-management/patron-management.component';
import { NeedHelpComponent } from './need-help/need-help.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { ClipboardModule } from 'ngx-clipboard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateAgoPipe,FilterPipe, SortByPipe, FileSizePipe,CustomFileSizePipe } from './services/pipes.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ThreeDAssetManagementComponent } from './three-d-asset-management/three-d-asset-management.component';
import { StorageSubscriptionManagementComponent } from './storage-subscription-management/storage-subscription-management.component';
import { ChartsModule } from 'ng2-charts';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { MobileappComponent } from './mobileapp/mobileapp.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { TermsComponent } from './terms/terms.component';
import { CreateExperienceComponent } from './create-experience/create-experience.component';
import { NgxFileDropComponent, NgxFileDropModule } from 'ngx-file-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { PublishAnalyticsComponent } from './publish-analytics/publish-analytics.component';
import { PublishedHistoryComponent } from './published-history/published-history.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RoomReportComponent } from './room-report/room-report.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { PreDashboardComponent } from './pre-dashboard/pre-dashboard.component';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ArchwizardModule } from 'angular-archwizard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoginValidationComponent,
    ThreeDAssetManagementComponent,
    PatronManagementComponent,
    NeedHelpComponent,
    CreateaccountComponent,
   AssetsManagementComponent,
   GetstartedComponent,
   CreateExperienceComponent,
PublishAnalyticsComponent,
PublishedHistoryComponent,
    DateAgoPipe,
   StorageSubscriptionManagementComponent,
    FilterPipe, SortByPipe, FileSizePipe,CustomFileSizePipe,
    MobileappComponent,
    MyaccountComponent ,
    CopyrightComponent,
    PersonalInfoComponent,
    TermsComponent,
   RoomReportComponent,
   UserVerificationComponent,
   PreDashboardComponent,
  //  BsDropdownModule
 
  ],
  imports: [
    BrowserModule,
    FormsModule,ArchwizardModule,NgxQRCodeModule,
    ChartsModule,TabsModule,
    // BsModalService ,
    HttpClientModule,ModalModule.forRoot(),TooltipModule.forRoot(),
    ToasterModule,OrderModule,
    // Ng4LoadingSpinnerModule,
    NgxSpinnerModule,
    NgbModule, ReactiveFormsModule,
    BsDatepickerModule,

    // ModalModule,
    // TimezonePickerModule ,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
   ClipboardModule,
   NgxPaginationModule,
   NgxFileDropModule,
   AngularDraggableModule,DragDropModule,
   TabsModule,
   BsDropdownModule,
   ImageCropperModule,
   ToastrModule.forRoot({
    positionClass :'toast-top-center'
  }),
 
    HttpModule
  ],
  // providers: [  {
  //   provide: AuthServiceConfig,
  //   useFactory: getAuthServiceConfigs
  // }],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('508934892904302')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// export function getAuthServiceConfigs() {
//   const config = new AuthServiceConfig(
//       [
//         {
//           id: FacebookLoginProvider.PROVIDER_ID,
//           provider: new FacebookLoginProvider('508934892904302')
//         },
//         {
//           id: GoogleLoginProvider.PROVIDER_ID,
//           provider: new GoogleLoginProvider('227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com')
//         },
//       ]
//   );
//   return config;
// }
