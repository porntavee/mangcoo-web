import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-category-content',
  templateUrl: './d-category-content.component.html',
  styleUrls: ['./d-category-content.component.css']
})
export class DCategoryContentComponent implements OnInit {
  code: string = '';
  page_prev = 1;
  page_next = 100;
  limit: number = 10;
  listCategoryLv1: any = [];
  category: string = 'lv1';
  lv1: string = '';
  lv2: string = '';

  isMousePrice = false;
  start1 = false;
  start2 = false;
  start3 = false;
  start4 = false;
  start5 = false;;
  model: any;
  images = [
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(88).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(121).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg'},
  ]

  isBannerAvailable = false;

  r_product_Model = [
    { imageUrl: './assets/img/cc_olay.png', title: 'OLAY' },
    { imageUrl: './assets/img/cc_zara.png', title: 'ZARA' },
    { imageUrl: './assets/img/cc_gq.png', title: 'GQ' },
    { imageUrl: './assets/img/cc_balenciaga.png', title: 'Balenciaga' },
    { imageUrl: './assets/img/cc_fred_perry.png', title: 'Fred Perry' },
    { imageUrl: './assets/img/cc_supreme.png', title: 'Supreme' }
  ];

  top_picks_Model = [
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212339320.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212544969.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212610370.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212339320.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212544969.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212610370.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212339320.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212544969.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212610370.png', title: 'Top goal items' },
    { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items' },
  ];

  top_trending_Model = [
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212741543.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212801943.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212818837.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212741543.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212801943.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212818837.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212741543.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212801943.png', title: 'Top goal items' },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212818837.png', title: 'Top goal items' },
  ];

  category_all_Model = [];

  detailed_search_Model = [];
  detailed_search_Model2 = [
    { imageUrl: './assets/img/cc_olay.png', title: 'ต่างประเทศ', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'ภายในประเทศ', isActive: false },
    { imageUrl: './assets/img/cc_gq.png', title: 'กรุงเทพและปริมณฑล', isActive: false },
    { imageUrl: './assets/img/cc_balenciaga.png', title: 'ภาคกลาง', isActive: false },
    { imageUrl: './assets/img/cc_fred_perry.png', title: 'ภาคตะวันออกเฉียงเหนือ', isActive: false },
    { imageUrl: './assets/img/cc_supreme.png', title: 'ภาคใต้', isActive: false },
    { imageUrl: './assets/img/cc_balenciaga.png', title: 'ภาคเหนือ', isActive: false },
    { imageUrl: './assets/img/cc_fred_perry.png', title: 'ภาคตะวันออก', isActive: false },
    { imageUrl: './assets/img/cc_supreme.png', title: 'ภาคตะวันตก', isActive: false },
  ];

  type_all_Model = [
    { imageUrl: './assets/img/cc_olay.png', title: 'SUKSAPAN Mall', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'ร้านแนะนำ', isActive: false },
  ];

  brand_Model = [
    { imageUrl: './assets/img/cc_olay.png', title: 'Brand 1', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'Brand 2', isActive: false },
    { imageUrl: './assets/img/cc_olay.png', title: 'Brand 3', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'Brand 4', isActive: false },
  ];

  condition_product_Model = [
    { imageUrl: './assets/img/cc_olay.png', title: 'ใหม่', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'ของมือสอง', isActive: false },
  ];

  payment_method_Model = [
    { imageUrl: './assets/img/cc_olay.png', title: 'เก็บเงินปลายทาง', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'บัตรเครดิต', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'QR Code', isActive: false },
  ];

  promotion_Model = [];
  promotion_Model2 = [
    { imageUrl: './assets/img/cc_olay.png', title: 'พร้อมส่วนลด', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'รับเงินคืน 10%', isActive: false },
    { imageUrl: './assets/img/cc_olay.png', title: 'ส่งฟรี 99 บาท', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'ฟรีค่าจัดส่ง', isActive: false },
    { imageUrl: './assets/img/cc_olay.png', title: 'ยืนยันราคาถูกที่สุด', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'ขายส่ง', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'มีวีดีโอ', isActive: false },
    { imageUrl: './assets/img/cc_olay.png', title: 'สินค้าพร้อมส่ง', isActive: false },
    { imageUrl: './assets/img/cc_zara.png', title: 'พร้อมติดตั้ง', isActive: false },
  ];

  products_Model = [
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212339320.png', title: 'Top goal items1', number_of_pieces: '13', province: "จังหวัดกรุงเทพมหานคร", money_start: "25", money_end: "250" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212544969.png', title: 'Top goal items2', number_of_pieces: '19', province: "จังหวัดสิงบุรี", money_start: "100", money_end: "0" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212610370.png', title: 'Top goal items3', number_of_pieces: '123', province: "จังหวัดจันทบุรี", money_start: "250", },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items4', number_of_pieces: '111', province: "จังหวัดนนทบุรี", money_start: "15", money_end: "150" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212339320.png', title: 'Top goal items5', number_of_pieces: '157', province: "จังหวัดยโสธร", money_start: "30", money_end: "300" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212544969.png', title: 'Top goal items6', number_of_pieces: '113', province: "จังหวัดมุกดาหาร", money_start: "250", money_end: "0" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212610370.png', title: 'Top goal items7', number_of_pieces: '132', province: "จังหวัดภูเก็ต", money_start: "100", money_end: "0" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items8', number_of_pieces: '12', province: "จังหวัดยะลา", money_start: "500", money_end: undefined },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212339320.png', title: 'Top goal items9', number_of_pieces: '16', province: "จังหวัดระยอง", money_start: "300", money_end: null },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212544969.png', title: 'Top goal items10', number_of_pieces: '143', province: "จังหวัดเชียงใหม่", money_start: "123", money_end: "456" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212610370.png', title: 'Top goal items11', number_of_pieces: '23', province: "ต่างประเทศ", money_start: "77", money_end: "777" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items12', number_of_pieces: '1', province: "จังหวัดตราด", money_start: "553", money_end: "999" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items8', number_of_pieces: '12', province: "จังหวัดยะลา", money_start: "500", money_end: undefined },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212339320.png', title: 'Top goal items9', number_of_pieces: '16', province: "จังหวัดระยอง", money_start: "300", money_end: null },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212544969.png', title: 'Top goal items10', number_of_pieces: '143', province: "จังหวัดเชียงใหม่", money_start: "123", money_end: "456" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212610370.png', title: 'Top goal items11', number_of_pieces: '23', province: "ต่างประเทศ", money_start: "77", money_end: "777" },
    // { imageUrl: 'http://122.155.223.63/td-doc/images/privilege/privilege_212628401.png', title: 'Top goal items12', number_of_pieces: '1', province: "จังหวัดตราด", money_start: "553", money_end: "999" },
  ];

  constructor(
    private serviceProviderService: ServiceProviderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params.code;
    });
    this.readBanner();
  }



  ngOnInit(): void {
    var size = 4;
    this.detailed_search_Model = this.detailed_search_Model2.slice(0, size);
    this.promotion_Model = this.promotion_Model2.slice(0, size);
    this.callReadMart()
    this.callReadTopPick();
    this.callReadTopTrending();
    this.callReadCategoryLv1();

  }

  onScrollDown() {

    this.limit += 10;
    if (this.limit > 10) {
      this.callRead();
    }
  }

  chkMousePriceIn() {
    this.isMousePrice = true;
  }

  chkMousePriceOut() {
    this.isMousePrice = false;
  }

  readBanner() {
    this.serviceProviderService.post('m/banner/main/read', {}).subscribe(data => {
      this.model = data;

      //วน 2 รอบ ถ้ารูปน้อยจะเป้นสีขาว Bug
      this.model.objectData.forEach(element => {
        this.images.push({ path: element.imageUrl });
      });
      this.model.objectData.forEach(element => {
        this.images.push({ path: element.imageUrl });
      });

      this.isBannerAvailable = true;

      // this.toastr.success('ลบรายการเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      // this.messageInput.splice(idx, 1);
    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  categoryCheckIsActive(param) {
    this.category_all_Model.map(m => m.isActive = false);
    this.category_all_Model[this.category_all_Model.indexOf(param)].isActive = true;
    this.lv2 = this.category_all_Model[this.category_all_Model.indexOf(param)].code;
    this.limit = 10;
    this.callRead();
  }

  category_more(category) {
    if (category === "detailed_search_Model")
      this.detailed_search_Model = this.detailed_search_Model2;
    else if (category === "promotion_Model")
      this.promotion_Model = this.promotion_Model2;
  }

  category_delete_isactive() {
    this.detailed_search_Model.map(f => f.isActive = false);
    this.type_all_Model.map(f => f.isActive = false);
    this.brand_Model.map(f => f.isActive = false);
    this.condition_product_Model.map(f => f.isActive = false);
    this.payment_method_Model.map(f => f.isActive = false);
    this.promotion_Model.map(f => f.isActive = false);
  }

  callRead() {
    let criteria = {};
    if (this.lv2 != '') {
      criteria = { 'lv2Shop': this.lv2, 'limit': this.limit };
    } else {
      criteria = { 'lv1Shop': this.code, 'limit': this.limit };
    }
    this.serviceProviderService.post('m/goods/read', criteria).subscribe(data => {
      let model: any = [];
      model = data;
      if (model.objectData.length > 0) {
        // if (this.lv2 == model.objectData[0].lv2Shop) this.products_Model = model.objectData;
        this.products_Model = model.objectData;
      } else
        this.products_Model = [];
    }, err => {
      // this.spinner.hide();
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }


  callReadCategoryLv1() {
    console.log('start ---> ');

    this.serviceProviderService.post('m/mCategory/read', { category: 'lv1', lv1: this.code }).subscribe(res => {
      let data: any = {};
      data = res;
      this.category_all_Model = [{
        category: "lv1",
        code: "",
        imageUrl: "",
        isActive: true,
        isHighlight: false,
        lv1: this.code,
        lv2: "",
        title: "ทั้งหมด"
      }, ...data.objectData];
      this.category_all_Model.map(m => m.isActive = false);
      this.category_all_Model[0].isActive = true;
      this.lv2 = this.category_all_Model[0].code;
      console.log('category [0]', this.category_all_Model[0]);

      this.callRead();
    });
  }

  callReadTopPick() {
    this.serviceProviderService.post('m/mCategory/read', { category: this.category }).subscribe(res => {
      let data: any = {};
      data = res;
      this.top_picks_Model = data.objectData;
    });
  }

  callReadTopTrending() {
    this.serviceProviderService.post('m/mCategory/read', { category: this.category }).subscribe(res => {
      let data: any = {};
      data = res;
      this.top_trending_Model = data.objectData;
    });
  }

  callReadMart() {
    this.serviceProviderService.post('m/shop/read', {}).subscribe(res => {
      let data: any = {};
      data = res;
      this.r_product_Model = data.objectData;
    });
  }

  checkstart(index) {
    if (index === 1) {
      this.start1 = true;
      this.start2 = false;
      this.start3 = false;
      this.start4 = false;
      this.start5 = false;
    }
    else if (index === 2) {
      this.start1 = false;
      this.start2 = true;
      this.start3 = false;
      this.start4 = false;
      this.start5 = false;
    }
    else if (index === 3) {
      this.start1 = false;
      this.start2 = false;
      this.start3 = true;
      this.start4 = false;
      this.start5 = false;
    }
    else if (index === 4) {
      this.start1 = false;
      this.start2 = false;
      this.start3 = false;
      this.start4 = true;
      this.start5 = false;
    }
    else if (index === 5) {
      this.start1 = false;
      this.start2 = false;
      this.start3 = false;
      this.start4 = false;
      this.start5 = true;
    }
  }

  onSelectionChanged(param) {
    if (this.detailed_search_Model.indexOf(param) >= 0)
      this.detailed_search_Model[this.detailed_search_Model.indexOf(param)].isActive = !this.detailed_search_Model[this.detailed_search_Model.indexOf(param)].isActive;
    else if (this.type_all_Model.indexOf(param) >= 0)
      this.type_all_Model[this.type_all_Model.indexOf(param)].isActive = !this.type_all_Model[this.type_all_Model.indexOf(param)].isActive;
    else if (this.brand_Model.indexOf(param) >= 0)
      this.brand_Model[this.brand_Model.indexOf(param)].isActive = !this.brand_Model[this.brand_Model.indexOf(param)].isActive;
    else if (this.condition_product_Model.indexOf(param) >= 0)
      this.condition_product_Model[this.condition_product_Model.indexOf(param)].isActive = !this.condition_product_Model[this.condition_product_Model.indexOf(param)].isActive;
    else if (this.payment_method_Model.indexOf(param) >= 0)
      this.payment_method_Model[this.payment_method_Model.indexOf(param)].isActive = !this.payment_method_Model[this.payment_method_Model.indexOf(param)].isActive;
    else if (this.promotion_Model.indexOf(param) >= 0)
      this.promotion_Model[this.promotion_Model.indexOf(param)].isActive = !this.promotion_Model[this.promotion_Model.indexOf(param)].isActive;
  }

  btn_prev() {
    if (this.page_prev > 1)
      this.page_prev--
  }

  btn_next() {
    if (this.page_prev < this.page_next)
      this.page_prev++
  }

  selectedCategory(param) {
    // this.router.navigate(['category'], { queryParams: { code: param } }).then(page => { window.location.reload() });
    this.router.navigate(['product'], { queryParams: { code: param } }).then(page => { window.location.reload() });
  }

  selectedMall(param) {
    console.log('param', param);

    this.router.navigate(['shop/' + param]);
  }

  navTo(param) {
    this.router.navigate([param]);
  }
}
