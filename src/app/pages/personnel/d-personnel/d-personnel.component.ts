import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-personnel',
  templateUrl: './d-personnel.component.html',
  styleUrls: ['./d-personnel.component.css']
})
export class DPersonnelComponent implements OnInit {
  menuSelected: number = 0;
  yearSelected: any = { 'code': '0', 'title': '2564 - 2567', 'startDate': 2564, 'endDate': 2567 };
  yearList: any = [{ 'code': '0', 'title': '2564 - 2567', 'startDate': 2564, 'endDate': 2567 },
  { 'code': '1', 'title': '2561 - 2564', 'startDate': 2561, 'endDate': 2564 },
  { 'code': '2', 'title': '2558 - 2561', 'startDate': 2558, 'endDate': 2561 },
  { 'code': '3', 'title': '2555 - 2558', 'startDate': 2555, 'endDate': 2558 },
  { 'code': '4', 'title': '2551 - 2554', 'startDate': 2551, 'endDate': 2555 },
  { 'code': '5', 'title': '2548 - 2551', 'startDate': 2548, 'endDate': 2551 },
  { 'code': '6', 'title': '2545 - 2548', 'startDate': 2545, 'endDate': 2548 },
  ];
  personnelList: any = [];
  personnelListHead: any = [];
  personnelListEN: any = [];
  personnelListRow: any = [];
  personnelListRowEN: any = [];
  personnelStructureList: any = [];
  personnelStructureListEN: any = [];
  categoryList: any = [];
  categoryList2: any = [];
  categorySelected: any = {};
  categorySelected2: any = {};
  centerSelected: any = { code: '', title: 'คลังเอกสาร', titleEN: 'Document' };
  showCenter: boolean = false;
  showCategory: boolean = false;
  showYear: boolean = false;
  constructor(
    public serviceProviderService: ServiceProviderService,
    private toastr: ToastrService,

  ) { }

  @ViewChild('droppedYear') droppedYear: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).className != 'div-dropdown-year')
      if (!this.droppedYear.nativeElement.contains(event.target)) this.showYear = false;
  }

  ngOnInit(): void {
    this.callRead();

  }

  async callRead() {
    await this.readCategory2();
    await this.readCategory();
    this.callReadPersonnel();
    this.callReadPersonnelStructure();

  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("go-top").style.display = "block";
    } else {
      document.getElementById("go-top").style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  callReadPersonnel() {
    this.serviceProviderService.post('personnel/read',
      {
      }).subscribe(res => {
        let model: any = [];
        let tempPersonelList: any = [];
        model = res;
        let tempModel = model.objectData.sort((n1, n2) => n1.sequence - n2.sequence).sort((n1, n2) => n1.row - n2.row);
        this.personnelListHead = tempModel[0];
        this.personnelList = this.groupPosition(tempModel);
        for (let index = 0; index < this.personnelList.length; index++) {
          let tempObj = this.personnelList[index].model;
          this.personnelList[index].personnelListRow = this.groupRow(tempObj);
        }
        // if (this.serviceProviderService.lang == 'th') {
        //   this.personnelList = this.groupPosition(tempModel);
        //   for (let index = 0; index < this.personnelList.length; index++) {
        //     let tempObj = this.personnelList[index].model;
        //     this.personnelList[index].personnelListRow = this.groupRow(tempObj);
        //   }
        // }
        // if (this.serviceProviderService.lang == 'en') {
        //   this.personnelListEN = this.groupPositionEN(tempModel);
        //   for (let index = 0; index < this.personnelListEN.length; index++) {
        //     let tempObj = this.personnelListEN[index].model;
        //     this.personnelListEN[index].personnelListRowEN = this.groupRow(tempObj);
        //   }
        // }
      }, err => {
        console.log(' err Shop --> ', err);
      })
  }

  async readCategory() {
    try {
      let data = await this.serviceProviderService.post('personnelStructure/currentCategory/read',
        {
          "center": "",
          category2: this.categorySelected2.code,
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
      let data = await this.serviceProviderService.post('personnelStructure/category2/readWeb', { "center": "000" }).toPromise();
      let model: any = data;
      this.categoryList2 = model.objectData;
      if (this.categoryList2.length > 0)
        this.categorySelected2 = this.categoryList2[0];
    } catch (err) {
      console.log(err); // you might not actually want to eat this exception.
    }
  }


  callReadPersonnelStructure() {
    this.serviceProviderService.post('personnelStructure/read',
      {
        'center': '000',
        'category': (this.categorySelected.code ?? ""),
        'category2': (this.categorySelected2.code ?? ""),
        // 'startTerm': this.yearSelected.startDate,
        // 'endTerm': this.yearSelected.endDate,
      }).subscribe(res => {
        let model: any = [];
        let tempPersonelList: any = [];
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


      }, err => {
        console.log(' err Shop --> ', err);
      })
  }

  groupPosition(param) {
    var groups = param.reduce((acc, item) => {
      acc[item.position] = (acc[item.position] || []);
      acc[item.position].push(item);
      return acc;
    }, {});

    var position = Object.keys(groups).map(function (key) {
      return { idex: key, position: groups[key][0]['position'], model: groups[key] };
    });
    return position;
  }

  groupPositionEN(param) {
    var groups = param.reduce((acc, item) => {
      acc[item.positionEN] = (acc[item.positionEN] || []);
      acc[item.positionEN].push(item);
      return acc;
    }, {});

    var position = Object.keys(groups).map(function (key) {
      return { idex: key, positionEN: groups[key][0]['positionEN'], model: groups[key] };
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

  checkColor(param) {
    if ((param % 2) != 0)
      return "#e3f0fa";
    else
      return "#FFFFFF"
  }

  copyMessage(param, menu) {
    var val = menu == '2' ? param.prefixName + param.firstName + param.lastName : param.firstName + param.lastName;
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

  copyMessageEN(param, menu) {
    var val = menu == '2' ? param.prefixNameEN + param.firstNameEN + param.lastNameEN : param.firstNameEN + param.lastNameEN;
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


  changeMenu = (param: number) => this.menuSelected = param;
  changeYear(param: any) {
    this.categorySelected = param;
    this.callReadPersonnelStructure();
  }

  async changeCategory(param: any) {
    this.categorySelected2 = param;
    await this.readCategory();
    this.callReadPersonnelStructure();
  }

  showHamburger(param) {
    switch (param) {
      case 'center':
        this.showCenter = !this.showCenter;
        if (this.showCenter) {
          this.showCategory = false;
          this.showYear = false;
        }
        break;
      case 'category':
        this.showCategory = !this.showCategory;
        if (this.showCategory) {
          this.showCenter = false;
          this.showYear = false;
        }
        break;
      case 'year':
        this.showYear = !this.showYear;
        if (this.showYear) {
          this.showCenter = false;
          this.showCategory = false;
        }
        break;

      default:
        this.showCenter = false;
        this.showCenter = false;
        this.showCategory = false;
        break;
    }
  }

}
