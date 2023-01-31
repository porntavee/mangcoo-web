import { ElementRef, EventEmitter, HostListener, KeyValueDiffer, KeyValueDiffers, ViewChild } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { debug } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-center-personnel-structure',
  templateUrl: './d-center-personnel-structure.component.html',
  styleUrls: ['./d-center-personnel-structure.component.css']
})
export class DCenterPersonnelStructureComponent implements OnInit {
  @Input() messageInput: any = [];
  watchModelDiffer: KeyValueDiffer<string, any>;
  categoryList: any = [];
  categoryList2: any = [];
  categoryListItem: any = [];
  categorySelected: any = {};
  categorySelected2: any = {};
  categorySelectedItem: any = {};
  showCenter: boolean = false;
  showCategory: boolean = false;
  showCategoryItem: boolean = false;
  showYear: boolean = false;
  personnelStructureList: any = [];
  personnelStructureListEN: any = [];
  constructor(
    public serviceProviderService: ServiceProviderService,
    private differs: KeyValueDiffers,
    private toastr: ToastrService,

  ) { }

  @ViewChild('droppedCenter') droppedCenter: ElementRef;
  // @ViewChild('droppedCategory') droppedCategory: ElementRef;
  @ViewChild('droppedYear') droppedYear: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).className != 'div-dropdown') {
      if (!this.droppedCenter.nativeElement.contains(event.target)) this.showCenter = false;
      // if (!this.droppedCategory.nativeElement.contains(event.target)) this.showCategory = false;
    }
    if ((event.target as Element).className != 'div-dropdown-year')
      if (!this.droppedYear.nativeElement.contains(event.target)) this.showYear = false;
  }

  model: any = [];
  yearSelected: any = { 'code': '0', 'title': '2564 - 2567', 'startDate': 2564, 'endDate': 2567 };
  yearList = [{ 'code': '0', 'title': '2564 - 2567', 'startDate': 2564, 'endDate': 2567 },
  { 'code': '1', 'title': '2561 - 2564', 'startDate': 2561, 'endDate': 2564 },
  { 'code': '2', 'title': '2558 - 2561', 'startDate': 2558, 'endDate': 2561 },
  { 'code': '3', 'title': '2555 - 2558', 'startDate': 2555, 'endDate': 2558 },
  { 'code': '4', 'title': '2551 - 2554', 'startDate': 2551, 'endDate': 2555 },
  { 'code': '5', 'title': '2548 - 2551', 'startDate': 2548, 'endDate': 2551 },
  { 'code': '6', 'title': '2545 - 2548', 'startDate': 2545, 'endDate': 2548 },
  ];


  ngOnInit(): void {
    this.watchModelDiffer = this.differs.find(this.messageInput).create();
  }


  callRead() {
    this.serviceProviderService.post('personnelStructure/read',
      {
        "center": this.messageInput.reference,
        'category': this.categorySelected.code ?? "",
        'category2': this.categorySelected2.code ?? "",
        'categoryitem': this.categorySelectedItem.code ?? "",
        // 'startTerm': this.yearSelected.startDate,
        // 'endTerm': this.yearSelected.endDate,
      }).subscribe(res => {
        let model: any = [];
        let tempPersonelList : any = [];
        model = res;
        let tempModel = model.objectData.sort((n1, n2) => n1.row - n2.row).sort((n1, n2) => n1.sequence - n2.sequence);
        if (this.serviceProviderService.lang == 'th') {
          this.personnelStructureList = this.groupPosition(tempModel);
          for (let index = 0; index < this.personnelStructureList.length; index++) {
            let tempObj = this.personnelStructureList[index].model;
            this.personnelStructureList[index].personnelRow = this.groupRow(tempObj);
          }
        }
        if (this.serviceProviderService.lang == 'en') {
          this.personnelStructureListEN = this.groupPositionEN(tempModel);
          for (let index = 0; index < this.personnelStructureListEN.length; index++) {
            let tempObj = this.personnelStructureListEN[index].model;
            this.personnelStructureListEN[index].personnelRowEN = this.groupRow(tempObj);
          }
        }

        // this.model.push(model.objectData[1]);
        // this.model.push(model.objectData[2]);
        // this.model.push(model.objectData[3]);
        // this.model.push(model.objectData[1]);
        // this.model.push(model.objectData[2]);
        // this.model.push(model.objectData[3]);
      }, err => {
        console.log(' err Shop --> ', err);
      })
  }

  async readCategory() {
    try {
      let data = await this.serviceProviderService.post('personnelStructure/currentCategory/read', {
        "center": this.messageInput.reference,
        category2: this.categorySelected2.code,
        categoryItem: this.categorySelectedItem.code,
      }).toPromise();
      let model: any = data;
      this.categoryList = model.objectData;
      if (this.categoryList.length > 0)
        this.categorySelected = this.categoryList[0];
      else
      this.categorySelected = {};
    } catch (err) {
      console.log(err); // you might not actually want to eat this exception.
    }
  }

  async readCategory2() {
    try {
      let data = await this.serviceProviderService.post('personnelStructure/category2/readWeb', { "center": this.messageInput.reference }).toPromise();
      let model: any = data;
      this.categoryList2 = model.objectData;
      if (this.categoryList2.length > 0)
        this.categorySelected2 = this.categoryList2[0];
    } catch (err) {
      console.log(err); // you might not actually want to eat this exception.
    }
  }

  groupPosition(param) {
    var groups = param.reduce((acc, item) => {
      acc[item.position] = (acc[item.position] || []);
      acc[item.position].push(item);
      return acc;
    }, {});

    var position = Object.keys(groups).map(function (key) {
      return { position: groups[key][0]['position'], model: groups[key] };
    });

    return position;
  }

  groupRow(param) {
    var groupRow = param.reduce((acc, item) => {
      acc[item.row] = (acc[item.row] || []);
      acc[item.row].push(item);
      return acc;
    }, {});

    var row = Object.keys(groupRow).map(function (key) {
      return { row: groupRow[key][0]['row'], model: groupRow[key] };
    });
    return row;
  }

  groupPositionEN(param) {
    var groups = param.reduce((acc, item) => {
      acc[item.positionEN] = (acc[item.positionEN] || []);
      acc[item.positionEN].push(item);
      return acc;
    }, {});

    var position = Object.keys(groups).map(function (key) {
      return { positionEN: groups[key][0]['positionEN'], model: groups[key] };
    });

    return position;
  }

  copyMessage(param,menu) {
    var val = param.firstName+ ' ' + param.lastName;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy", false, 'copy');
    document.body.removeChild(selBox);
    this.toastr.success('COPIED !', '', { timeOut: 600 });
  }

  copyMessageEN(param) {
    var val = param.firstNameEN + ' ' + param.lastNameEN;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy", false, 'copy');
    document.body.removeChild(selBox);
    this.toastr.success('COPIED !', '', { timeOut: 600 });
  }


  changeYear(param: any) {
    this.categorySelected = param;
    this.callRead();
  }

  async ngDoCheck(): Promise<void> {

    const changes = this.watchModelDiffer.diff(this.messageInput);
    if (changes) {
      // console.log('helloooooooo');
      await this.readCategory2();
      await this.readCategory();
      this.callRead();
    }
  }

  checkColor(param) {
    if ((param % 2) != 0)
      return "#e3f0fa";
    else
      return "#FFFFFF"
  }


  async changeCategory(param: any) {
    this.categorySelected2 = param;
    this.categoryListItem = param.items || [];
    this.categorySelectedItem = '';
    await this.readCategory();
    this.callRead();
  }

  async changeCategoryItem(hparam, param: any) {
    this.categorySelected2 = hparam;
    this.categorySelectedItem = param;
    this.categorySelected = param;
    await this.readCategory();
    this.callRead();
  }

  changeNameitem(param) {
    if (this.serviceProviderService.lang == 'th')
      return param ?? 'ทั้งหมด'
    else
      return param ?? 'All'
  }

  showHamburger(param) {
    switch (param) {
      case 'center':
        this.showCenter = !this.showCenter;
        if (this.showCenter) {
          this.showCategory = false;
          this.showCategoryItem = false;
          this.showYear = false;
        }
        break;
      case 'category':
        this.showCategory = !this.showCategory;
        if (this.showCategory) {
          this.showCenter = false;
          this.showCategoryItem = false;
          this.showYear = false;
        }
        break;
      case 'categoryItem':
        this.showCategoryItem = !this.showCategoryItem;
        if (this.showCategoryItem) {
          this.showCenter = false;
          this.showCategory = false;
          this.showYear = false;
        }
        break;
      case 'year':
        this.showYear = !this.showYear;
        if (this.showYear) {
          this.showCenter = false;
          this.showCategory = false;
          this.showCategoryItem = false;
        }
        break;

      default:
        this.showYear = false;
        this.showCenter = false;
        this.showCategoryItem = false;
        this.showCategory = false;
        break;
    }
  }

}
