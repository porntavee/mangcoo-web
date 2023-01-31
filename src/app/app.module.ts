import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { PopoverModule } from 'ngx-smart-popover';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DHomeComponent } from './pages/home/d-home/d-home.component';
import { MHomeComponent } from './pages/home/m-home/m-home.component';
import { DownloadDialogComponent } from './popups/download-dialog/download-dialog.component';
import { DProductComponent } from './pages/product/d-product/d-product.component';
import { MProductComponent } from './pages/product/m-product/m-product.component';
import { DT1HeaderComponent } from './headers/d-t1-header/d-t1-header.component';
import { MT1HeaderComponent } from './headers/m-t1-header/m-t1-header.component';
import { MainDialogComponent } from './popups/main-dialog/main-dialog.component';
import { DNotificationComponent } from './pages/notification/d-notification/d-notification.component';
import { MNotificationComponent } from './pages/notification/m-notification/m-notification.component';
import { DMypurchaseComponent } from './pages/mypurchase/d-mypurchase/d-mypurchase.component';
import { MMypurchaseComponent } from './pages/mypurchase/m-mypurchase/m-mypurchase.component';
import { DLoginComponent } from './pages/login/d-login/d-login.component';
import { MLoginComponent } from './pages/login/m-login/m-login.component';
import { MRegisterComponent } from './pages/register/m-register/m-register.component';
import { DRegisterComponent } from './pages/register/d-register/d-register.component';
import { DCartComponent } from './pages/cart/d-cart/d-cart.component';
import { MCartComponent } from './pages/cart/m-cart/m-cart.component';
import { DCategoryContentComponent } from './pages/category-content/d-category-content/d-category-content.component';
import { MCategoryContentComponent } from './pages/category-content/m-category-content/m-category-content.component';
import { DPaymentSuccessComponent } from './pages/payment-success/d-payment-success/d-payment-success.component';
import { MPaymentSuccessComponent } from './pages/payment-success/m-payment-success/m-payment-success.component';
import { DConfirmOrderComponent } from './pages/confirm-order/d-confirm-order/d-confirm-order.component';
import { MConfirmOrderComponent } from './pages/confirm-order/m-confirm-order/m-confirm-order.component';
import { DProfileComponent } from './pages/profile/d-profile/d-profile.component';
import { MProfileComponent } from './pages/profile/m-profile/m-profile.component';
import { DPaymentComponent } from './pages/payment/d-payment/d-payment.component';
import { MPaymentComponent } from './pages/payment/m-payment/m-payment.component';
import { DUserComponent } from './pages/user/d-user/d-user.component';
import { MUserComponent } from './pages/user/m-user/m-user.component';
import { DAddressComponent } from './pages/address/d-address/d-address.component';
import { MAddressComponent } from './pages/address/m-address/m-address.component';
import { DPasswordComponent } from './pages/password/d-password/d-password.component';
import { MPasswordComponent } from './pages/password/m-password/m-password.component';
import { DT1FooterComponent } from './footer/d-t1-footer/d-t1-footer.component';

import { AddressComponent } from './popups/address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DShopComponent } from './pages/shop/d-shop/d-shop.component';
import { MShopComponent } from './pages/shop/m-shop/m-shop.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { ShopInfoComponent } from './component/shop-info/shop-info.component';
import { DiscountComponent } from './component/discount/discount.component';
import { ProductCircleComponent } from './component/product-circle/product-circle.component';
import { DSearchComponent } from './pages/search/d-search/d-search.component';
import { CategoryShopComponent } from './component/category-shop/category-shop.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DAllShopsComponent } from './pages/all-shops/d-all-shops/d-all-shops.component';
import { MAllShopsComponent } from './pages/all-shops/m-all-shops/m-all-shops.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { DQrPaymentComponent } from './pages/qr-payment/d-qr-payment/d-qr-payment.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { GoodsShopCardComponent } from './component/goodsshop-card/goodsshop-card.component';
import { DateFormatPipe } from './date-format.pipe';
import { DatetimeFormatPipe } from './datetime-format.pipe';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { GoodsSellGoodComponent } from './component/goodssellgood-card/goodssellgood-card.component';
import { ShopAllCardComponent } from './component/shopall-card/shopall-card.component';
import { DMySellComponent } from './pages/my-sell/d-my-sell/d-my-sell.component';
import { RoutingObjectComponent } from './pages/routing-object/routing-object.component';
import { DTestPaymentQrComponent } from './pages/test-payment-qr/d-test-payment-qr/d-test-payment-qr.component';
import { DReportComponent } from './report/report/d-report/d-report.component';
import { MReportComponent } from './report/report/m-report/m-report.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DOfficeComponent } from './pages/office/d-office/d-office.component';
import { MOfficeComponent } from './pages/office/m-office/m-office.component';
import { DNewsComponent } from './pages/news/d-news/d-news.component';
import { PartnerComponent } from './component/partner/partner.component';
import { FooterComponent } from './component/footer/footer.component';
import { DEventCalendarComponent } from './pages/eventcalendar/d-eventcalendar/d-eventcalendar.component';
import { MNewsComponent } from './pages/news/m-news/m-news.component';
import { DContactUsComponent } from './pages/contact-us/d-contact-us/d-contact-us.component';
import { MContactUsComponent } from './pages/contact-us/m-contact-us/m-contact-us.component';
import { DKnowledgeComponent } from './pages/knowledge/d-knowledge/d-knowledge.component';
import { DKnowledgeVetComponent } from './pages/knowledge-vet/d-knowledge-vet/d-knowledge-vet.component';
import { DEventCalendarDetailComponent } from './pages/eventcalendar-detail/d-eventcalendar-detail/d-eventcalendar-detail.component';
import { DSearchResultComponent } from './pages/search-result/d-search-result/d-search-result.component';
import { DLoginELearningComponent } from './pages/login-e-learning/d-login-e-learning/d-login-e-learning.component';
import { MKnowledgeComponent } from './pages/knowledge/m-knowledge/m-knowledge.component';
import { DKnowledgeDetailComponent } from './pages/knowledge-detail/d-knowledge-detail/d-knowledge-detail.component';
import { DKnowledgeVetDetailComponent } from './pages/knowledge-vet-detail/d-knowledge-vet-detail/d-knowledge-vet-detail.component';
import { DPersonnelComponent } from './pages/personnel/d-personnel/d-personnel.component';
import { LangThPipe } from './lang-th.pipe';
import { LangEnPipe } from './lang-en.pipe';
import { DSearchContentComponent } from './pages/search-content/d-search-content/d-search-content.component';
import { DNewsDetailComponent } from './pages/news-detail/d-news-detail/d-news-detail.component';
import { MNewsDetailComponent } from './pages/news-detail/m-news-detail/m-news-detail.component';
import { DCenterComponent } from './standard/center/d-center/d-center.component';
import { DCenterMainComponent } from './standard/center-main/d-center-main/d-center-main.component';
import { DCenterMainTabComponent } from './standard/center-main-tab/d-center-main-tab/d-center-main-tab.component';
import { DCenterPersonnelStructureComponent } from './standard/center-personnel-structure/d-center-personnel-structure/d-center-personnel-structure.component';
import { DCenterContactComponent } from './standard/center-contact/d-center-contact/d-center-contact.component';
import { DateFormatLLPipe } from './date-format-LL.pipe';
import { DCooperativeFormComponent } from './pages/cooperative-form/d-cooperative-form/d-cooperative-form.component';
import { DCooperativeFormDetailComponent } from './pages/cooperative-form-detail/d-cooperative-form-detail/d-cooperative-form-detail.component';
import { DCenterELearningComponent } from './standard/center-e-learning/d-center-e-learning/d-center-e-learning.component';
import { DVetEnewsComponent } from './pages/vet-enews/d-vet-enews/d-vet-enews.component';
import { DBannerDetailComponent } from './pages/banner-detail/d-banner-detail/d-banner-detail.component';
import { DImageEventComponent } from './pages/image-event/d-image-event/d-image-event.component';
import { DImageEventDetailComponent } from './pages/image-event-detail/d-image-event-detail/d-image-event-detail.component';
import { DImportantComponent } from './pages/important/d-important/d-important.component';
import { DImportantDetailComponent } from './pages/important-detail/d-important-detail/d-important-detail.component';
import { MT1FooterComponent } from './footer/m-t1-footer/m-t1-footer.component';
import { DAddressSheetComponent } from './pages/address-sheet/d-address-sheet/d-address-sheet.component';
import { DVetEnewsDetailComponent } from './pages/vet-enews-detail/d-vet-enews-detail/d-vet-enews-detail.component';
import { MImportantComponent } from './pages/important/m-important/m-important.component';
import { MCenterComponent } from './standard/center/m-center/m-center.component';
import { VideoComponent } from './popups/video/video.component';
import { MEventCalendarDetailComponent } from './pages/eventcalendar-detail/m-eventcalendar-detail/m-eventcalendar-detail.component';
import { MImageEventDetailComponent } from './pages/image-event-detail/m-image-event-detail/m-image-event-detail.component';
import { MVetEnewsDetailComponent } from './pages/vet-enews-detail/m-vet-enews-detail/m-vet-enews-detail.component';
import { MKnowledgeVetDetailComponent } from './pages/knowledge-vet-detail/m-knowledge-vet-detail/m-knowledge-vet-detail.component';
import { MImportantDetailComponent } from './pages/important-detail/m-important-detail/m-important-detail.component';
import { MainPopupDetailComponent } from './pages/main-popup-detail/main-popup-detail.component';
import { LawComponent } from './pages/law/law.component';
import { SiteMapComponent } from './pages/site-map/site-map.component';
import { LawDetailComponent } from './pages/law-detail/law-detail.component';
import { TrainingInstituteComponent } from './pages/training-institute/training-institute.component';
import { TrainingInstituteDetailComponent } from './pages/training-institute-detail/training-institute-detail.component';
import { ExpertBranchComponent } from './pages/expert-branch/expert-branch.component';
import { ExpertBranchDetailComponent } from './pages/expert-branch-detail/expert-branch-detail.component';
import { VerifyApprovedUserComponent } from './pages/verify-approved-user/verify-approved-user.component';
import { VerifyApprovedUserDetailComponent } from './pages/verify-approved-user-detail/verify-approved-user-detail.component';
import { SafeHtml } from './safe-html.pipe';
import { RegisterPreviewComponent } from './popups/register-preview/register-preview.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SingleDropZoneComponent } from './component/single-drop-zone/single-drop-zone.component';
import { SeminarComponent } from './pages/seminar/seminar.component';
import { SeminarDetailComponent } from './pages/seminar-detail/seminar-detail.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';
import { DEventAbroadComponent } from './pages/event-abroad/d-event-abroad/d-event-abroad.component';
import { DEventAbroadDetailComponent } from './pages/event-abroad-detail/d-event-abroad-detail/d-event-abroad-detail.component';
var config = {
  apiKey: "AIzaSyANRhtzfr5853RYYr-4VrmTKFT3dJBtF1c",
  authDomain: "we-mart-324106.firebaseapp.com",
  projectId: "we-mart-324106",
  storageBucket: "we-mart-324106.appspot.com",
  messagingSenderId: "844740746751",
  appId: "1:844740746751:web:703233c0cad54d50d81bca",
  measurementId: "G-B348DXZWCQ"
};
@NgModule({
  declarations: [
    AppComponent,
    DHomeComponent,
    MHomeComponent,
    DownloadDialogComponent,
    DProductComponent,
    MProductComponent,
    DT1HeaderComponent,
    MT1HeaderComponent,
    MainDialogComponent,
    DNotificationComponent,
    MNotificationComponent,
    DMypurchaseComponent,
    MMypurchaseComponent,
    DLoginComponent,
    MLoginComponent,
    MRegisterComponent,
    DRegisterComponent,
    DCartComponent,
    MCartComponent,
    DCategoryContentComponent,
    MCategoryContentComponent,
    DPaymentSuccessComponent,
    MPaymentSuccessComponent,
    DConfirmOrderComponent,
    MConfirmOrderComponent,
    DProfileComponent,
    MProfileComponent,
    DPaymentComponent,
    MPaymentComponent,
    DUserComponent,
    MUserComponent,
    DAddressComponent,
    MAddressComponent,
    DPasswordComponent,
    MPasswordComponent,
    AddressComponent,
    DShopComponent,
    MShopComponent,
    ProductCardComponent,
    ShopInfoComponent,
    DiscountComponent,
    ProductCircleComponent,
    DSearchComponent,
    CategoryShopComponent,
    DAllShopsComponent,
    MAllShopsComponent,
    DQrPaymentComponent,
    GoodsShopCardComponent,
    DateFormatPipe,
    DatetimeFormatPipe,
    DateFormatLLPipe,
    LangThPipe,
    LangEnPipe,
    GoodsSellGoodComponent,
    ShopAllCardComponent,
    DMySellComponent,
    RoutingObjectComponent,
    DTestPaymentQrComponent,
    DReportComponent,
    MReportComponent,
    DOfficeComponent,
    MOfficeComponent,
    DNewsComponent,
    PartnerComponent,
    FooterComponent,
    DT1FooterComponent,
    MT1FooterComponent,
    DEventCalendarComponent,
    DKnowledgeComponent,
    MNewsComponent,
    DContactUsComponent,
    MContactUsComponent,
    DEventCalendarDetailComponent,
    MEventCalendarDetailComponent,
    DSearchResultComponent,
    DLoginELearningComponent,
    MKnowledgeComponent,
    DKnowledgeDetailComponent,
    DKnowledgeVetDetailComponent,
    MKnowledgeVetDetailComponent,
    DPersonnelComponent,
    DSearchContentComponent,
    DNewsDetailComponent,
    MNewsDetailComponent,
    DCenterComponent,
    MCenterComponent,
    DCenterMainComponent,
    DCenterMainTabComponent,
    DCenterPersonnelStructureComponent,
    DCenterContactComponent,
    DKnowledgeVetComponent,
    DCooperativeFormComponent,
    DCooperativeFormDetailComponent,
    DCenterELearningComponent,
    DVetEnewsComponent,
    DBannerDetailComponent,
    DImageEventComponent,
    DImageEventDetailComponent,
    MImageEventDetailComponent,
    DImportantComponent,
    MImportantComponent,
    DImportantDetailComponent,
    MImportantDetailComponent,
    DAddressSheetComponent,
    DVetEnewsDetailComponent,
    MVetEnewsDetailComponent,
    VideoComponent,
    MainPopupDetailComponent,
    LawComponent,
    SiteMapComponent,
    LawDetailComponent,
    TrainingInstituteComponent,
    TrainingInstituteDetailComponent,
    ExpertBranchComponent,
    ExpertBranchDetailComponent,
    VerifyApprovedUserComponent,
    VerifyApprovedUserDetailComponent,
    SafeHtml,
    RegisterPreviewComponent,
    SingleDropZoneComponent,
    SeminarComponent,
    SeminarDetailComponent,
    DatepickerComponent,
    DEventAbroadComponent,
    DEventAbroadDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    PopoverModule,
    IvyCarouselModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonToggleModule,
    NgxQRCodeModule,
    NgxDropzoneModule,
    InfiniteScrollModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(config),
    MatMomentDateModule,
    NgxGalleryModule,
    NgxBarcodeModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
