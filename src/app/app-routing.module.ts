import { SeminarDetailComponent } from './pages/seminar-detail/seminar-detail.component';
import { SeminarComponent } from './pages/seminar/seminar.component';
import { MainPopupDetailComponent } from './pages/main-popup-detail/main-popup-detail.component';
import { DImportantDetailComponent } from './pages/important-detail/d-important-detail/d-important-detail.component';
import { DImportantComponent } from './pages/important/d-important/d-important.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Scroll } from '@angular/router';
import { DCartComponent } from './pages/cart/d-cart/d-cart.component';
import { MCartComponent } from './pages/cart/m-cart/m-cart.component';
import { DConfirmOrderComponent } from './pages/confirm-order/d-confirm-order/d-confirm-order.component';
import { MConfirmOrderComponent } from './pages/confirm-order/m-confirm-order/m-confirm-order.component';
import { DHomeComponent } from './pages/home/d-home/d-home.component';
import { MHomeComponent } from './pages/home/m-home/m-home.component';
import { DLoginComponent } from './pages/login/d-login/d-login.component';
import { MLoginComponent } from './pages/login/m-login/m-login.component';
import { DMypurchaseComponent } from './pages/mypurchase/d-mypurchase/d-mypurchase.component';
import { MMypurchaseComponent } from './pages/mypurchase/m-mypurchase/m-mypurchase.component';
import { DNotificationComponent } from './pages/notification/d-notification/d-notification.component';
import { MNotificationComponent } from './pages/notification/m-notification/m-notification.component';
import { DPaymentSuccessComponent } from './pages/payment-success/d-payment-success/d-payment-success.component';
import { MPaymentSuccessComponent } from './pages/payment-success/m-payment-success/m-payment-success.component';
import { DProductComponent } from './pages/product/d-product/d-product.component';
import { MProductComponent } from './pages/product/m-product/m-product.component';
import { DRegisterComponent } from './pages/register/d-register/d-register.component';
import { MRegisterComponent } from './pages/register/m-register/m-register.component';
import { DCategoryContentComponent } from './pages/category-content/d-category-content/d-category-content.component';
import { MCategoryContentComponent } from './pages/category-content/m-category-content/m-category-content.component';
import { DProfileComponent } from './pages/profile/d-profile/d-profile.component';
import { MProfileComponent } from './pages/profile/m-profile/m-profile.component';
import { MPaymentComponent } from './pages/payment/m-payment/m-payment.component';
import { DPaymentComponent } from './pages/payment/d-payment/d-payment.component';
import { DUserComponent } from './pages/user/d-user/d-user.component';
import { DAddressComponent } from './pages/address/d-address/d-address.component';
import { MAddressComponent } from './pages/address/m-address/m-address.component';
import { DPasswordComponent } from './pages/password/d-password/d-password.component';
import { MPasswordComponent } from './pages/password/m-password/m-password.component';
import { DShopComponent } from './pages/shop/d-shop/d-shop.component';
import { DSearchComponent } from './pages/search/d-search/d-search.component';
import { DAllShopsComponent } from './pages/all-shops/d-all-shops/d-all-shops.component';
import { DQrPaymentComponent } from './pages/qr-payment/d-qr-payment/d-qr-payment.component';
import { MShopComponent } from './pages/shop/m-shop/m-shop.component';
import { DMySellComponent } from './pages/my-sell/d-my-sell/d-my-sell.component';
import { RoutingObjectComponent } from './pages/routing-object/routing-object.component';
import { MAllShopsComponent } from './pages/all-shops/m-all-shops/m-all-shops.component';
import { DTestPaymentQrComponent } from './pages/test-payment-qr/d-test-payment-qr/d-test-payment-qr.component';
import { DReportComponent } from './report/report/d-report/d-report.component';
import { MReportComponent } from './report/report/m-report/m-report.component';
import { DOfficeComponent } from './pages/office/d-office/d-office.component';
import { MOfficeComponent } from './pages/office/m-office/m-office.component';
import { DNewsComponent } from './pages/news/d-news/d-news.component';
import { DEventCalendarComponent } from './pages/eventcalendar/d-eventcalendar/d-eventcalendar.component';
import { DKnowledgeComponent } from './pages/knowledge/d-knowledge/d-knowledge.component';
import { DKnowledgeVetComponent } from './pages/knowledge-vet/d-knowledge-vet/d-knowledge-vet.component';
import { DContactUsComponent } from './pages/contact-us/d-contact-us/d-contact-us.component';
import { MContactUsComponent } from './pages/contact-us/m-contact-us/m-contact-us.component';
import { DEventCalendarDetailComponent } from './pages/eventcalendar-detail/d-eventcalendar-detail/d-eventcalendar-detail.component';
import { DSearchResultComponent } from './pages/search-result/d-search-result/d-search-result.component';
import { DLoginELearningComponent } from './pages/login-e-learning/d-login-e-learning/d-login-e-learning.component';
import { MKnowledgeComponent } from './pages/knowledge/m-knowledge/m-knowledge.component';
import { DKnowledgeDetailComponent } from './pages/knowledge-detail/d-knowledge-detail/d-knowledge-detail.component';
import { DKnowledgeVetDetailComponent } from './pages/knowledge-vet-detail/d-knowledge-vet-detail/d-knowledge-vet-detail.component';
import { DPersonnelComponent } from './pages/personnel/d-personnel/d-personnel.component';
import { DSearchContentComponent } from './pages/search-content/d-search-content/d-search-content.component';
import { DNewsDetailComponent } from './pages/news-detail/d-news-detail/d-news-detail.component';
import { DCenterComponent } from './standard/center/d-center/d-center.component';
import { DCooperativeFormComponent } from './pages/cooperative-form/d-cooperative-form/d-cooperative-form.component';
import { DCooperativeFormDetailComponent } from './pages/cooperative-form-detail/d-cooperative-form-detail/d-cooperative-form-detail.component';
import { DVetEnewsComponent } from './pages/vet-enews/d-vet-enews/d-vet-enews.component';
import { DBannerDetailComponent } from './pages/banner-detail/d-banner-detail/d-banner-detail.component';
import { DImageEventComponent } from './pages/image-event/d-image-event/d-image-event.component';
import { DImageEventDetailComponent } from './pages/image-event-detail/d-image-event-detail/d-image-event-detail.component';
import { DAddressSheetComponent } from './pages/address-sheet/d-address-sheet/d-address-sheet.component';
import { DVetEnewsDetailComponent } from './pages/vet-enews-detail/d-vet-enews-detail/d-vet-enews-detail.component';
import { MImportantComponent } from './pages/important/m-important/m-important.component';
import { MCenterComponent } from './standard/center/m-center/m-center.component';
import { MNewsComponent } from './pages/news/m-news/m-news.component';
import { MNewsDetailComponent } from './pages/news-detail/m-news-detail/m-news-detail.component';
import { MEventCalendarDetailComponent } from './pages/eventcalendar-detail/m-eventcalendar-detail/m-eventcalendar-detail.component';
import { MImageEventDetailComponent } from './pages/image-event-detail/m-image-event-detail/m-image-event-detail.component';
import { MVetEnewsDetailComponent } from './pages/vet-enews-detail/m-vet-enews-detail/m-vet-enews-detail.component';
import { MKnowledgeVetDetailComponent } from './pages/knowledge-vet-detail/m-knowledge-vet-detail/m-knowledge-vet-detail.component';
import { MImportantDetailComponent } from './pages/important-detail/m-important-detail/m-important-detail.component';
import { ViewportScroller } from '@angular/common';

import { filter } from 'rxjs/operators';
import { LawComponent } from './pages/law/law.component';
import { SiteMapComponent } from './pages/site-map/site-map.component';
import { LawDetailComponent } from './pages/law-detail/law-detail.component';
import { TrainingInstituteComponent } from './pages/training-institute/training-institute.component';
import { TrainingInstituteDetailComponent } from './pages/training-institute-detail/training-institute-detail.component';
import { ExpertBranchComponent } from './pages/expert-branch/expert-branch.component';
import { ExpertBranchDetailComponent } from './pages/expert-branch-detail/expert-branch-detail.component';
import { VerifyApprovedUserComponent } from './pages/verify-approved-user/verify-approved-user.component';
import { VerifyApprovedUserDetailComponent } from './pages/verify-approved-user-detail/verify-approved-user-detail.component';
import { DEventAbroadComponent } from './pages/event-abroad/d-event-abroad/d-event-abroad.component';
import { DEventAbroadDetailComponent } from './pages/event-abroad-detail/d-event-abroad-detail/d-event-abroad-detail.component';
// , canActivate: [AuthGuard]
const routes: Routes = [
  { path: '', component: DHomeComponent },
  { path: 'm', component: MHomeComponent },
  { path: 'demo-routing-object', component: RoutingObjectComponent },
  { path: 'test-payment-qr', component: DTestPaymentQrComponent },
  { path: 'product', component: DProductComponent },
  { path: 'm/product', component: MProductComponent },
  { path: 'notification', component: DNotificationComponent },
  { path: 'm/notification', component: MNotificationComponent },
  { path: 'mypurchase', component: DMypurchaseComponent },
  { path: 'm/mypurchase', component: MMypurchaseComponent },
  { path: 'login', component: DLoginComponent },
  { path: 'm/login', component: MLoginComponent },
  { path: 'register', component: DRegisterComponent },
  { path: 'm/register', component: MRegisterComponent },
  { path: 'cart', component: DCartComponent },
  { path: 'm/cart', component: MCartComponent },
  { path: 'category', component: DCategoryContentComponent },
  { path: 'm/category', component: MCategoryContentComponent },
  { path: 'payment-success', component: DPaymentSuccessComponent },
  { path: 'm/payment-success', component: MPaymentSuccessComponent },
  { path: 'confirm-order', component: DConfirmOrderComponent },
  { path: 'm/confirm-order', component: MConfirmOrderComponent },
  { path: 'profile', component: DProfileComponent },
  { path: 'm/profile', component: MProfileComponent },
  { path: 'payment', component: DPaymentComponent },
  { path: 'm/payment', component: MPaymentComponent },
  { path: 'address', component: DAddressComponent },
  { path: 'm/address', component: MAddressComponent },
  { path: 'password', component: DPasswordComponent },
  { path: 'm/password', component: MPasswordComponent },
  { path: 'shop/:code', component: DShopComponent },
  { path: 'all/shop', component: DAllShopsComponent },
  { path: 'm/all/shop', component: MAllShopsComponent },
  { path: 'qr-payment', component: DQrPaymentComponent },
  { path: 'my-sell', component: DMySellComponent },
  { path: 'office', component: DOfficeComponent },
  { path: 'm/office', component: MOfficeComponent },
  { path: 'news', component: DNewsComponent },
  { path: 'm/news', component: MNewsComponent },
  { path: 'news-detail/:code', component: DNewsDetailComponent },
  { path: 'm/news-detail/:code', component: MNewsDetailComponent },
  { path: 'search', component: DSearchComponent },
  { path: 'search-result', component: DSearchResultComponent },
  { path: 'login-e-learning', component: DLoginELearningComponent },
  { path: 'eventcalendar', component: DEventCalendarComponent },
  { path: 'knowledge', component: DKnowledgeComponent },
  { path: 'knowledge-vet', component: DKnowledgeVetComponent },
  { path: 'm/knowledge', component: MKnowledgeComponent },
  { path: 'knowledge-detail/:code', component: DKnowledgeDetailComponent },
  { path: 'knowledge-vet-detail/:code', component: DKnowledgeVetDetailComponent },
  { path: 'm/knowledge-vet-detail/:code', component: MKnowledgeVetDetailComponent },
  { path: 'contact-us', component: DContactUsComponent },
  { path: 'm/contact-us', component: MContactUsComponent },
  { path: 'report', component: DReportComponent },
  { path: 'm/report', component: MReportComponent },
  { path: 'eventcalendar-detail/:code', component: DEventCalendarDetailComponent },
  { path: 'm/eventcalendar-detail/:code', component: MEventCalendarDetailComponent },
  { path: 'personnel', component: DPersonnelComponent },
  { path: 'search-content', component: DSearchContentComponent },
  { path: 'center', component: DCenterComponent },
  { path: 'm/center', component: MCenterComponent },
  { path: 'cooperative-form', component: DCooperativeFormComponent },
  { path: 'cooperative-form-detail/:code', component: DCooperativeFormDetailComponent },
  { path: 'vet-enews', component: DVetEnewsComponent },
  { path: 'banner-detail/:code', component: DBannerDetailComponent },
  { path: 'image-event', component: DImageEventComponent },
  { path: 'image-event-detail/:code', component: DImageEventDetailComponent },
  { path: 'm/image-event-detail/:code', component: MImageEventDetailComponent },
  { path: 'important', component: DImportantComponent },
  { path: 'm/important', component: MImportantComponent },
  { path: 'important-detail/:code', component: DImportantDetailComponent },
  { path: 'm/important-detail/:code', component: MImportantDetailComponent },
  { path: 'address-sheet', component: DAddressSheetComponent },
  { path: 'vet-enews-detail/:code', component: DVetEnewsDetailComponent },
  { path: 'm/vet-enews-detail/:code', component: MVetEnewsDetailComponent },
  { path: 'main-popup-detail/:code', component: MainPopupDetailComponent },
  { path: 'law', component: LawComponent },
  { path: 'site-map' , component: SiteMapComponent },
  { path: 'law-detail/:code', component: LawDetailComponent },
  { path: 'trainingInstitute', component: TrainingInstituteComponent },
  { path: 'trainingInstitute-detail/:code', component: TrainingInstituteDetailComponent },
  { path: 'expert-branch', component: ExpertBranchComponent },
  { path: 'expert-branch-detail/:code', component: ExpertBranchDetailComponent },
  { path: 'verify-approved-user', component: VerifyApprovedUserComponent },
  { path: 'verify-approved-user-detail/:code', component: VerifyApprovedUserDetailComponent },
  { path: 'seminar', component: SeminarComponent },
  { path: 'seminar-detail/:code', component: SeminarDetailComponent },
  { path: 'event-abroad', component: DEventAbroadComponent },
  { path: 'event-abroad-detail/:code', component: DEventAbroadDetailComponent },
];
// imports: [RouterModule.forRoot(routes, { useHash: true })],
@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  scroll = 0;
  constructor(router: Router, viewportScroller: ViewportScroller) {
    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
          window.scrollTo({ top: this.scroll, behavior: 'auto' });
        } else if (e.anchor) {
          // anchor navigation
          viewportScroller.scrollToAnchor(e.anchor);
          window.scrollTo({ top: this.scroll, behavior: 'auto' });
        } else {
          // forward navigation
          window.scrollTo({ top: this.scroll, behavior: 'auto' });
        }
      });

    window.onscroll = (e: Event) => {
      this.scroll = window.scrollY;
    };
  }
}
