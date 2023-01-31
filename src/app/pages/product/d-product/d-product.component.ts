import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Utilities } from 'src/app/shares/utilities';
import { ToastrService } from 'ngx-toastr';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-d-product',
  templateUrl: './d-product.component.html',
  styleUrls: ['./d-product.component.css']
})

export class DProductComponent implements OnInit {
  menuActive: string = 'd';
  goodsInventoryCode: string = '';
  code: string = '';
  reference: string = '';
  model: any = [];
  modelCartCount: any = [];
  modelInventory: any = [];
  modelShop: any = [];
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
  modelGoodsSellGood: any = [];
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
  menuSubActive: string = 'all';
  limit: number = 10;
  hiddenGallary: boolean = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  selectedState: any = {};
  cartNumber: number = 0;

  constructor
    (
      private serviceProviderService: ServiceProviderService,
      public dialog: MatDialog,
      private activetedRoute: ActivatedRoute,
      private utilities: Utilities,
      private router: Router,
      private toastr: ToastrService,
  ) {
    this.activetedRoute.queryParams.subscribe(params => {
      // let model: any = this.activetedRoute.snapshot.params;
      this.code = params.code;
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.readGoods();
    this.readInventory();
    this.readGoodsSellGood();

    this.galleryOptions = [
      {
        width: '450px',
        height: '450px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: NgxGalleryImageSize.Contain,
        previewCloseOnClick:true,
        previewCloseOnEsc:true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

  }

  readGoods() {
    this.serviceProviderService.post('m/goods/read', { code: this.code }).subscribe(data => {
      let model: any = [];
      model = data;
      this.model = model.objectData[0];
      console.log(this.model);
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
      this.galleryRead();
    })
  }

  resetGallery() {
    this.goodsInventoryCode = '';
    this.menuActive = 'd';
    this.selectedState = undefined;
  }

  onChange($event) {
    console.log($event.value);
    this.selectedState = $event.value;
    console.log('selectedState ==>', this.selectedState);

  }

  galleryRead() {
    this.serviceProviderService.post('m/goods/gallery/read', { code: this.code }).subscribe(data => {
      let model: any = {};
      this.model.gallery = [];
      model = data;
      console.log("model", model);
      if (model.objectData.length > 0) {
        this.hiddenGallary = false
        model.objectData.forEach(c => {
          this.model.gallery.push({
            // ...c,
            small: c.imageUrl,
            medium: c.imageUrl,
            big: c.imageUrl,
          })
        });
        this.model.gallery = [{
          small: this.model.imageUrl,
          medium: this.model.imageUrl,
          big: this.model.imageUrl,
        }
          , ...this.model.gallery];
        console.log("gallery", this.model.gallery);
        this.galleryImages = this.model.gallery;
      }
    }, err => {
    });
  }


  readGoodsShop() {
    this.serviceProviderService.post('m/goods/shop/read', { referenceShopCode: this.model.referenceShopCode }).subscribe(data => {
      let modelGoodsShop: any = [];
      modelGoodsShop = data;
      this.modelGoodsShop = modelGoodsShop.objectData;
      this.goodsShopLength = modelGoodsShop.totalData;
      console.log("this.modelGoodsShop=>", this.modelGoodsShop);
    })
  }

  readInventory() {
    this.serviceProviderService.post('m/goods/inventory/read', { reference: this.code }).subscribe(data => {
      let modelInventory: any = [];
      modelInventory = data;
      this.modelInventory = modelInventory.objectData;
      console.log(this.modelInventory);
      this.getRemainingTotal();
    }, err => {
      // this.spinner.hide();
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  readShop() {
    this.serviceProviderService.post('m/shop/read', { code: this.model.referenceShopCode }).subscribe(data => {
      let modelShop: any = [];
      modelShop = data;
      this.modelShop = modelShop.objectData[0];
      console.log("modelShop", this.modelShop);
      console.log("modelShop.createDate", this.modelShop.createDate);
    }, err => {
    });
  }

  readAllCommentGoods() {
    this.serviceProviderService.post('m/goods/comment/all/read', { code: this.code }).subscribe(data => {
      let modelAllCommentGoods: any = [];
      modelAllCommentGoods = data;
      this.modelAllCommentGoods = modelAllCommentGoods.objectData;
      console.log(this.modelAllCommentGoods);
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
      console.log("this.modelCommentGoods", this.modelCommentGoods);
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
      console.log("this.modelGoodsShop=>" + this.modelGoodsShop);
      console.log("this.goodsShopLength=>" + this.goodsShopLength);
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

  readGoodsSellGood() {
    this.serviceProviderService.post('m/goods/read', { 'limit': 5 }).subscribe(data => {
      let modelGoodsSellGood: any = {};
      modelGoodsSellGood = data;
      this.modelGoodsSellGood = modelGoodsSellGood.objectData;
      console.log('modelGoodsSellGood=>', this.modelGoodsSellGood);

    });
  }

  getSellOrderTotal() {
    console.log("this.modelSellOrder", this.modelSellOrder);

    let numbers: number = 0;
    for (let i = 0; i < this.sellOrderLength; i++) {
      numbers = numbers + this.modelSellOrder[i].qty;
      console.log("numbers=>" + numbers);
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
    this.router.navigate(['/cart']);
  }

  createBuy() {
    // console.log("this.goodsInventoryCode");
    // console.log(this.goodsInventoryCode);
    if (this.utilities.getUserLocalStorage().profileCode == '' || this.utilities.getUserLocalStorage().profileCode == null) {
      return this.router.navigate(['/login']);
    }
    let qtyCheck: any = {};
    let isValid = false;

    if (this.goodsInventoryCode == '' || this.goodsInventoryCode == 'd') {
      this.toastr.warning('กรุณาเลือกลักษณะสินค้า', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.goodsInventoryCode != '') {
      qtyCheck = this.modelInventory.find(mi => mi.code == this.menuActive);
      qtyCheck = qtyCheck['qty'];
      console.log(qtyCheck);
      if (qtyCheck < 1) {
        this.toastr.warning('สินค้าที่ท่านต้องการหมด', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
      if (isValid)
        return;
    }

    if (isValid)
      return;

    this.serviceProviderService.post('m/cart/create', {
      code: this.goodsInventoryCode,
      status: "N",
      qty: this.qty,
      discountReference: this.model.discountReference,
      referenceShopCode: this.model.referenceShopCode,
      codegoods: this.model.code,
    }).subscribe(data => {
      console.log('buy ==> ', data);
      this.navigateToPageCart();
      // this.readInventory();
      // this.goodsInventoryCode = '';
      // this.menuActive = 'd';
    }, err => { });
  }

  createCart() {
    // console.log("this.goodsInventoryCode");
    // console.log(this.goodsInventoryCode);

    if (this.utilities.getUserLocalStorage().profileCode == '' || this.utilities.getUserLocalStorage().profileCode == null) {
      return this.router.navigate(['/login']);
    }
    let qtyCheck: any = {};
    let isValid = false;

    if (this.goodsInventoryCode == '' || this.goodsInventoryCode == 'd') {
      this.toastr.warning('กรุณาเลือกลักษณะสินค้า', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.goodsInventoryCode != '') {
      qtyCheck = this.modelInventory.find(mi => mi.code == this.menuActive);
      qtyCheck = qtyCheck['qty'];
      console.log(qtyCheck);
      if (qtyCheck < 1) {
        this.toastr.warning('สินค้าที่ท่านต้องการหมด', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
      if (isValid)
        return;
    }

    if (isValid)
      return;
    this.serviceProviderService.post('m/cart/create', {
      code: this.goodsInventoryCode,
      status: "N",
      qty: this.qty,
      discountReference: this.model.discountReference,
      referenceShopCode: this.model.referenceShopCode,
      codegoods: this.model.code,
    }).subscribe(data => {
    console.log('cart ==> ', data);
      this.toastr.success('เพิ่มสินค้าลงตะกร้าเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
    this.readInventory();
    this.readGoods();
    this.readCartCount();
    }, err => {});
    this.goodsInventoryCode = '';
    this.menuActive = 'd';
  }
  readCartCount() {
    this.serviceProviderService.post('m/cart/count', {}).subscribe(data => {
      let model: any = [];
      model = data;
      this.cartNumber = model.objectData.count;
    })
  }

  itemGoodsInventory(param) {
    this.goodsInventoryCode = this.modelInventory.find(mi => mi.code == param);
    this.goodsInventoryCode = this.goodsInventoryCode['code'];
    this.menuActive = this.goodsInventoryCode;
    this.qty = 1;
    console.log("this.menuActive : " + this.menuActive);
    this.getRemaining();
    this.getNetPrice();
    this.getPrice();
    this.getImageUrl();
  }

  itemPlus() {
    let remaining: any = {};
    let isValid = false;

    if (this.menuActive == this.goodsInventoryCode) {
      remaining = this.modelInventory.find(mi => mi.code == this.menuActive);
      remaining = remaining['qty'];
    }

    if (this.qty >= remaining) {
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
    this.router.navigate(['shop/' + shop]);
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
    console.log("scrolled down!!");
    this.limit += 10;
    this.readGoodsShop();
  }

  fromModal(param) {
    if (param != null && param != '') {
      // this.code = param
      this.router.navigate(['product'], { queryParams: { code: param } }).then(page => { window.location.reload() });
    }
  }
}
