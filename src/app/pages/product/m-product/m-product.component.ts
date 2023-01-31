import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-product',
  templateUrl: './m-product.component.html',
  styleUrls: ['./m-product.component.scss']
})
export class MProductComponent implements OnInit {
  menuActive: string = 'd';
  goodsInventoryCode: string = '';
  code: string = '';
  reference: string = '';
  showModal: boolean = false;
  model: any = [];
  modelInventory: any = [];
  modelShop: any = [{ 'title': '', 'imageUrl': '' }];
  modelAllCommentGoods: any = [];
  modelCommentGoods: any = [];
  modelCommentGoodsRating5: any = [];
  modelCommentGoodsRating4: any = [];
  modelCommentGoodsRating3: any = [];
  modelCommentGoodsRating2: any = [];
  modelCommentGoodsRating1: any = [];
  modelCommentGoodsRatingLength: any = {};
  modelCommentGoodsRating5Length: any = {};
  modelCommentGoodsRating4Length: any = {};
  modelCommentGoodsRating3Length: any = {};
  modelCommentGoodsRating2Length: any = {};
  modelCommentGoodsRating1Length: any = {};
  modelGoodsShop: any = [];
  modelSellOrder: any = [];
  modelCart: any = [];
  params: any = {};
  qty: number = 1;
  remainingTotal: any = {};
  ratingTotal: any = {};
  ratingStar: any = '';
  ratingLength: any = {};
  ratingCheck: number = 0;
  goodsShopLength: any = {};
  sellOrderLength: any = {};
  sellOrderTotal: any = {};
  textButton: string = '';
  menuSubActive: string = 'all';
  limit: number = 10;
  width: number = 300;

  itemOption: any = {};
  cartNumber: number = 0;


  constructor
    (
      private serviceProviderService: ServiceProviderService,
      public dialog: MatDialog,
      private activetedRoute: ActivatedRoute,
      private utilities: Utilities,
      private router: Router,
      private toastr: ToastrService,
      private _location: Location
    ) {
    this.activetedRoute.queryParams.subscribe(params => {
      // let model: any = this.activetedRoute.snapshot.params;
      this.code = params.code;
    });
  }

  @ViewChild('myIdentifier')
  myIdentifier: ElementRef;

  ngOnInit(): void {
    this.width = 300;
    window.scroll(0, 0);
    this.readGoods();
    this.readInventory();
    this.readCartCount();
  }

  ngAfterViewInit() {
    this.width = this.myIdentifier.nativeElement.offsetWidth;
    // var height = this.myIdentifier.nativeElement.offsetHeight;

    // console.log('Width:' + width);
  }

  backClicked() {
    this._location.back();
  }

  readCartCount() {
    this.serviceProviderService.post('m/cart/count', {}).subscribe(data => {
      let model: any = [];
      model = data;
      this.cartNumber = model.objectData.count;
    })
  }

  readGoods() {
    this.serviceProviderService.post('m/goods/read', { code: this.code }).subscribe(data => {
      let model: any = [];
      model = data;
      this.model = model.objectData[0];
      console.log('this.model --> ', this.model);
      this.getRating();
      this.readShop();
      this.readGoodsShop();
      this.readAllCommentGoods();
      this.readSellOrder();
      this.readCommentGoods();
      this.readCommentGoodRating5();
      this.readCommentGoodRating4();
      this.readCommentGoodRating3();
      this.readCommentGoodRating2();
      this.readCommentGoodRating1();
    })
  }

  readGoodsShop() {
    this.serviceProviderService.post('m/goods/shop/read', { referenceShopCode: this.model.referenceShopCode }).subscribe(data => {
      let modelGoodsShop: any = [];
      modelGoodsShop = data;
      this.modelGoodsShop = modelGoodsShop.objectData;
      this.goodsShopLength = modelGoodsShop.totalData;

    })
  }

  readInventory() {
    this.serviceProviderService.post('m/goods/inventory/read', { reference: this.code }).subscribe(data => {
      let modelInventory: any = [];
      modelInventory = data;
      this.modelInventory = modelInventory.objectData;
      console.log('model inventory --> ', this.modelInventory);

      this.itemOption = this.modelInventory[0];
      this.getRemainingTotal();
    }, err => {
      // this.spinner.hide();
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  readShop() {
    this.serviceProviderService.post('m/shop/read', { code: this.model.referenceShopCode }).subscribe(data => {
      let modelShop: any = [{ 'title': '', 'imageUrl': '' }];
      modelShop = data;
      this.modelShop = modelShop.objectData;
      console.log('shop --> ,', this.modelShop);

    }, err => {
    });
  }

  readAllCommentGoods() {
    this.serviceProviderService.post('m/goods/comment/all/read', { code: this.code }).subscribe(data => {
      let modelAllCommentGoods: any = [];
      modelAllCommentGoods = data;
      this.modelAllCommentGoods = modelAllCommentGoods.objectData;
      this.getRatingTotal();
    }, err => {
    });
  }

  readCommentGoods() {
    this.serviceProviderService.post('m/goods/comment/read', { code: this.code }).subscribe(data => {
      let modelCommentGoods: any = [];
      modelCommentGoods = data;
      this.modelCommentGoods = modelCommentGoods.objectData;
      this.modelCommentGoodsRatingLength = this.modelCommentGoods.length;
    }, err => {
    });
  }

  readCommentGoodRating5() {
    this.serviceProviderService.post('m/goods/comment/read', { code: this.code, rating: '5' }).subscribe(data => {
      let modelCommentGoodsRating5: any = [];
      modelCommentGoodsRating5 = data;
      this.modelCommentGoodsRating5 = modelCommentGoodsRating5.objectData;
      this.modelCommentGoodsRating5Length = this.modelCommentGoodsRating5.length;
    }, err => {
    });
  }

  readCommentGoodRating4() {
    this.serviceProviderService.post('m/goods/comment/read', { code: this.code, rating: '4' }).subscribe(data => {
      let modelCommentGoodsRating4: any = [];
      modelCommentGoodsRating4 = data;
      this.modelCommentGoodsRating4 = modelCommentGoodsRating4.objectData;
      this.modelCommentGoodsRating4Length = this.modelCommentGoodsRating4.length;
    }, err => {
    });
  }

  readCommentGoodRating3() {
    this.serviceProviderService.post('m/goods/comment/read', { code: this.code, rating: '3' }).subscribe(data => {
      let modelCommentGoodsRating3: any = [];
      modelCommentGoodsRating3 = data;
      this.modelCommentGoodsRating3 = modelCommentGoodsRating3.objectData;
      this.modelCommentGoodsRating3Length = this.modelCommentGoodsRating3.length;
    }, err => {
    });
  }

  readCommentGoodRating2() {
    this.serviceProviderService.post('m/goods/comment/read', { code: this.code, rating: '2' }).subscribe(data => {
      let modelCommentGoodsRating2: any = [];
      modelCommentGoodsRating2 = data;
      this.modelCommentGoodsRating2 = modelCommentGoodsRating2.objectData;
      this.modelCommentGoodsRating2Length = this.modelCommentGoodsRating2.length;
    }, err => {
    });
  }

  readCommentGoodRating1() {
    this.serviceProviderService.post('m/goods/comment/read', { code: this.code, rating: '1' }).subscribe(data => {
      let modelCommentGoodsRating1: any = [];
      modelCommentGoodsRating1 = data;
      this.modelCommentGoodsRating1 = modelCommentGoodsRating1.objectData;
      this.modelCommentGoodsRating1Length = this.modelCommentGoodsRating1.length;
    }, err => {
    });
  }

  readCart() {
    this.serviceProviderService.post('m/goods/shop/read', { referenceShopCode: this.model.referenceShopCode }).subscribe(data => {
      let modelGoodsShop: any = [];
      modelGoodsShop = data;
      this.modelGoodsShop = modelGoodsShop.objectData;
      this.goodsShopLength = modelGoodsShop.totalData;
    })
  }

  readSellOrder() {
    this.serviceProviderService.post('m/cart/sellorder/read', { codegoods: this.code }).subscribe(data => {
      let modelSellOrder: any = [];
      modelSellOrder = data;
      this.modelSellOrder = modelSellOrder.objectData;
      this.sellOrderLength = modelSellOrder.totalData;
      this.getSellOrderTotal();
    });
  }

  getSellOrderTotal() {
    let numbers: number = 0;
    for (let i = 0; i < this.sellOrderLength; i++) {
      numbers = numbers + this.modelSellOrder[i].qty;
    }

    this.sellOrderTotal = numbers;
  }

  getRemainingTotal() {
    let numberlength = this.modelInventory;
    // let total: any = {};
    let numbers: number = 0;

    for (let i = 0; i < numberlength.length; i++) {
      numbers = numbers + this.modelInventory[i]['qty'];
    }

    this.remainingTotal = numbers;
  }

  getRatingTotal() {
    let numberlength = this.modelAllCommentGoods;
    // let total: any = {};
    let numbers: number = 0;

    for (let i = 0; i < numberlength.length; i++) {
      numbers = numbers + this.modelAllCommentGoods[i]['rating'];
    }
    if (numbers >= 1000) {
      numbers = numbers / 1000;
      this.ratingCheck = 1000
    }

    this.ratingTotal = numbers;
    this.ratingLength = numberlength.length;
  }

  async navigateToPageCart() {
    this.router.navigate(['m/cart']);
  }

  createBuy() {
    if (this.utilities.getUserLocalStorage().profileCode == '' || this.utilities.getUserLocalStorage().profileCode == null) {
      return this.router.navigate(['m/login']);
    }

    if (this.itemOption.qty < 1) {
      this.toastr.warning('สินค้าที่ท่านต้องการหมด', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      return;
    }

    this.serviceProviderService.post('m/cart/create', {
      code: this.itemOption.code,
      status: "N",
      qty: this.qty,
      discountReference: this.model.discountReference,
      referenceShopCode: this.model.referenceShopCode,
      codegoods: this.model.code,
    }).subscribe(data => {
      this.navigateToPageCart();
    }, err => { });
  }

  createCart() {
    if (this.utilities.getUserLocalStorage().profileCode == '' || this.utilities.getUserLocalStorage().profileCode == null) {
      return this.router.navigate(['m/login']);
    }

    if (this.itemOption.qty < 1) {
      this.toastr.warning('สินค้าที่ท่านต้องการหมด', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      return;
    }

    this.serviceProviderService.post('m/cart/create', {
      code: this.itemOption.code,
      status: "N",
      qty: this.qty,
      discountReference: this.model.discountReference,
      referenceShopCode: this.model.referenceShopCode,
      codegoods: this.model.code,
    }).subscribe(data => {
      this.toastr.success('เพิ่มสินค้าลงตะกร้าเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      this.readInventory();
      this.readGoods();
      this.readCartCount();
    }, err => { });
    this.goodsInventoryCode = '';
    this.menuActive = 'd';
  }

  itemGoodsInventory(param) {
    this.goodsInventoryCode = this.modelInventory.find(mi => mi.code == param);
    this.goodsInventoryCode = this.goodsInventoryCode['code'];
    this.menuActive = this.goodsInventoryCode;
    this.qty = 1;
    this.getRemaining();
    this.getNetPrice();
    this.getPrice();
    this.getImageUrl();
  }

  itemPlus() {
    let remaining: any = {};
    let isValid = false;


    // if (this.itemOption.code == this.goodsInventoryCode) {
    //   remaining = this.modelInventory.find(mi => mi.code == this.menuActive);
    //   remaining = remaining['qty'];
    // }

    if (this.qty >= this.itemOption.remaining) {
      this.toastr.warning('ไม่สามารถเพิ่มจำนวนสินค้าได้ เนื่องจากคุณเพิ่มสินค้าถึงจำนวนที่กำหนดแล้ว', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }
    if (isValid)
      return;
    else {
      this.qty = this.qty + 1;
    }
  }

  itemMinus() {
    let isValid = false;

    if (this.qty >= 2) {
      this.qty = this.qty - 1;
    }
    else {
      this.qty = 1;
      this.toastr.warning('ไม่สามารถลดจำนวนสินค้าได้', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }
    if (isValid)
      return;
  }

  getDisCountUnit() {
    let disCountUnit: any = {};
    if (this.model.disCountUnit === 'P') {
      disCountUnit = '% ส่วนลด';
    }
    if (this.model.disCountUnit === 'C') {
      disCountUnit = 'บาท ส่วนลด';
    }
    return disCountUnit;
  }

  getRemaining() {
    let remaining: any = {};
    remaining = this.modelInventory.find(mi => mi.code == this.menuActive);
    remaining = remaining.qty;
    return remaining;
  }

  getNetPrice() {
    let netPrice: any = {};
    netPrice = this.modelInventory.find(mi => mi.code == this.menuActive);
    netPrice = netPrice['netPrice'];
    return netPrice;
  }

  getPrice() {
    let price: any = {};
    price = this.modelInventory.find(mi => mi.code == this.menuActive);
    price = price['price'];
    return price;
  }

  getImageUrl() {
    let imageUrl: any = {};
    imageUrl = this.modelInventory.find(mi => mi.code == this.menuActive);
    imageUrl = imageUrl['imageUrl'];
    return imageUrl;
  }

  getRating() {
    let rating: any = this.model.rating;
    if (rating == 0) {
      this.ratingStar = '0star';
    }
    if (rating > 0 && rating <= 0.5) {
      this.ratingStar = '0.5star';
    }
    if (rating > 0.5 && rating <= 1) {
      this.ratingStar = '1star';
    }
    if (rating > 1 && rating <= 1.5) {
      this.ratingStar = '1.5star';
    }
    if (rating > 1.5 && rating <= 2) {
      this.ratingStar = '2star';
    }
    if (rating > 2 && rating <= 2.5) {
      this.ratingStar = '2.5star';
    }
    if (rating > 2.5 && rating <= 3) {
      this.ratingStar = '3star';
    }
    if (rating > 3 && rating <= 3.5) {
      this.ratingStar = '3.5star';
    }
    if (rating > 3.5 && rating <= 4) {
      this.ratingStar = '4star';
    }
    if (rating > 4.5 && rating < 5) {
      this.ratingStar = '4.5star';
    }
    if (rating == 5) {
      this.ratingStar = '5star';
    }
  }

  navTo(shop) {
    this.router.navigate(['m/shop/' + shop]);
  }

  goToall() {
    this.menuSubActive = 'all';
  }

  goToRatingStar5() {
    this.menuSubActive = 'ratingstar5';
  }

  goToRatingStar4() {
    this.menuSubActive = 'ratingstar4';
  }

  goToRatingStar3() {
    this.menuSubActive = 'ratingstar3';
  }

  goToRatingStar2() {
    this.menuSubActive = 'ratingstar2';
  }

  goToRatingStar1() {
    this.menuSubActive = 'ratingstar1';
  }

  onScrollDown() {
    this.limit += 10;
    this.readGoodsShop();
  }

  fromModal(param) {
    if (param != null && param != '') {
      // this.code = param
      this.router.navigate(['product'], { queryParams: { code: param } }).then(page => { window.location.reload() });
    }
  }

  formatPrice(param) {
    return this.utilities.cf(param);
  }

  closeModal() {
    this.showModal = false;
  }

  buy() {
    this.textButton = 'ชื้อ';
    this.showModal = true;
    // this.serviceProviderService.post('m/cart/create', {
    //   code: this.goodsInventoryCode,
    //   status: "N",
    //   qty: this.qty,
    //   discountReference: this.model.discountReference,
    //   referenceShopCode: this.model.referenceShopCode,
    //   codegoods: this.model.code,
    // }).subscribe(data => {
    //   console.log('buy ==> ', data);
    //   this.navigateToPageCart();
    // }, err => { });

  }

  addCart() {
    this.textButton = 'เพิ่มไปยังรถเข็น';
    this.showModal = true;
  }

  confirmModal() {
    if (this.textButton == 'เพิ่มไปยังรถเข็น') {
      this.createCart();
    } else {
      this.createBuy();
    }
  }

  selectedOption(item) {
    this.qty = 1;
    this.itemOption = item;
  }
}
