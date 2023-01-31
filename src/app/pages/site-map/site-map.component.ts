import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {

  center = "";
  mouseOvered: boolean = false;
  mouseOvered1: boolean = false;
  mouseOvered2: boolean = false;
  mouseOvered3: boolean = false;
  mouseOvered4: boolean = false;
  mouseOvered5: boolean = false;
  mouseOvered6: boolean = false;
  mouseOvered7: boolean = false;
  mouseOvered8: boolean = false;
  aboutUs: any = {};
  modelUni: any = [
    { title: 'ม.เกษตรศาสตร์', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.จุฬาลงกรณ์', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.ขอนแก่น', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.มหิดล', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.เชียงใหม่', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.เทคโนโลยีมหานคร', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.เทคโนโลยีราชมงคลตะวันออก', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.มหาสารคาม', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.เทคโนโลยีราชมงคลศรีวิชัย', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.เวสเทิร์น', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.สงขลานครินทร์', link: this.serviceProviderService.urlweb + '' },
    { title: 'ม.วลัยลักษณ์', link: this.serviceProviderService.urlweb + '' },
  ]

  memberDataMoc: any = [
    { title: 'กรณีการต่ออายุ', link: this.serviceProviderService.urlweb + '/important-detail/20220118135431-385-717' },
    { title: 'ประกาศสำคัญ', link: this.serviceProviderService.urlweb + '/important' },
    { title: 'ช่องทางการชำระเงิน', link: this.serviceProviderService.urlweb + '/important' },
  ]

  dataMoc: any = [
    { title: 'สำนักงานสัตวแพทยสภา', link: this.serviceProviderService.urlweb + '/center' },
    { title: 'ศูนย์การศึกษาต่อเนื่องทางสัตวแพทย์ (CCE-VET)', link: this.serviceProviderService.urlweb + 'center?code=001' },
    { title: 'ศูนย์ประเมินความรู้ความสามารถขั้นพื้นฐานของการประกอบวิชาชีพการสัตวแพทย์ (CVCA)', link: this.serviceProviderService.urlweb + 'center?code=002' },
    { title: 'วิทยาลัยวิชาชีพการสัตวแพทย์ชำนาญการแห่งประเทศไทย', link: this.serviceProviderService.urlweb + 'center?code=003' },
    { title: 'มาตรฐานวิชาชีพการสัตวแพทย์', link: this.serviceProviderService.urlweb + 'center?code=004' },
    { title: 'จรรยาบรรณ', link: this.serviceProviderService.urlweb + 'center?code=005' },
    { title: 'หน่วยงานวิรัชกิจ', link: this.serviceProviderService.urlweb + 'center?code=006' },
  ];

  newsMoc: any = [
    { title: 'สำนักงานสัตวแพทยสภา', link: this.serviceProviderService.urlweb + '/news' },
    { title: 'ศูนย์การศึกษาต่อเนื่องทางสัตวแพทย์ (CCE-VET)', link: this.serviceProviderService.urlweb + '/news?center=001' },
    { title: 'ศูนย์ประเมินความรู้ความสามารถขั้นพื้นฐานของการประกอบวิชาชีพการสัตวแพทย์ (CVCA)', link: this.serviceProviderService.urlweb + '/news?center=002' },
    { title: 'วิทยาลัยวิชาชีพการสัตวแพทย์ชำนาญการแห่งประเทศไทย', link: this.serviceProviderService.urlweb + '/news?center=003' },
    { title: 'มาตรฐานวิชาชีพการสัตวแพทย์', link: this.serviceProviderService.urlweb + '/news?center=004' },
    { title: 'จรรยาบรรณ', link: this.serviceProviderService.urlweb + '/news?center=005' },
    { title: 'หน่วยงานวิรัชกิจ', link: this.serviceProviderService.urlweb + '/news?center=006' },
  ];

  imageEventMoc: any = [
    { title: 'สำนักงานสัตวแพทยสภา', link: this.serviceProviderService.urlweb + '/image-event' },
    { title: 'ศูนย์การศึกษาต่อเนื่องทางสัตวแพทย์ (CCE-VET)', link: this.serviceProviderService.urlweb + '/image-event?center=001' },
    { title: 'ศูนย์ประเมินความรู้ความสามารถขั้นพื้นฐานของการประกอบวิชาชีพการสัตวแพทย์ (CVCA)', link: this.serviceProviderService.urlweb + '/image-event?center=002' },
    { title: 'วิทยาลัยวิชาชีพการสัตวแพทย์ชำนาญการแห่งประเทศไทย', link: this.serviceProviderService.urlweb + '/image-event?center=003' },
    { title: 'มาตรฐานวิชาชีพการสัตวแพทย์', link: this.serviceProviderService.urlweb + '/image-event?center=004' },
    { title: 'จรรยาบรรณ', link: this.serviceProviderService.urlweb + '/image-event?center=005' },
    { title: 'หน่วยงานวิรัชกิจ', link: this.serviceProviderService.urlweb + '/image-event?center=006' },
  ];

  eventcalendarMoc: any = [
    { title: 'สำนักงานสัตวแพทยสภา', link: this.serviceProviderService.urlweb + '/eventcalendar' },
    { title: 'ศูนย์การศึกษาต่อเนื่องทางสัตวแพทย์ (CCE-VET)', link: this.serviceProviderService.urlweb + '/eventcalendar?center=001' },
    { title: 'ศูนย์ประเมินความรู้ความสามารถขั้นพื้นฐานของการประกอบวิชาชีพการสัตวแพทย์ (CVCA)', link: this.serviceProviderService.urlweb + '/eventcalendar?center=002' },
    { title: 'วิทยาลัยวิชาชีพการสัตวแพทย์ชำนาญการแห่งประเทศไทย', link: this.serviceProviderService.urlweb + '/eventcalendar?center=003' },
    { title: 'มาตรฐานวิชาชีพการสัตวแพทย์', link: this.serviceProviderService.urlweb + '/eventcalendar?center=004' },
    { title: 'จรรยาบรรณ', link: this.serviceProviderService.urlweb + '/eventcalendar?center=005' },
    { title: 'หน่วยงานวิรัชกิจ', link: this.serviceProviderService.urlweb + '/eventcalendar?center=006' },
  ];

  knowledgeMoc: any = [
    { title: 'สำนักงานสัตวแพทยสภา', link: this.serviceProviderService.urlweb + '/knowledge' },
    { title: 'ศูนย์การศึกษาต่อเนื่องทางสัตวแพทย์ (CCE-VET)', link: this.serviceProviderService.urlweb + '/knowledge?center=001' },
    { title: 'ศูนย์ประเมินความรู้ความสามารถขั้นพื้นฐานของการประกอบวิชาชีพการสัตวแพทย์ (CVCA)', link: this.serviceProviderService.urlweb + '/knowledge?center=002' },
    { title: 'วิทยาลัยวิชาชีพการสัตวแพทย์ชำนาญการแห่งประเทศไทย', link: this.serviceProviderService.urlweb + '/knowledge?center=003' },
    { title: 'มาตรฐานวิชาชีพการสัตวแพทย์', link: this.serviceProviderService.urlweb + '/knowledge?center=004' },
    { title: 'จรรยาบรรณ', link: this.serviceProviderService.urlweb + '/knowledge?center=005' },
    { title: 'หน่วยงานวิรัชกิจ', link: this.serviceProviderService.urlweb + '/knowledge?center=006' },
  ];

  journalMoc: any = [
    { title: 'เดือน ต.ค. - ธ.ค.', link: this.serviceProviderService.urlweb + '/knowledge-vet-detail/20220128113521-925-450' },
    { title: 'เดือน ก.ค. - ก.ย.', link: this.serviceProviderService.urlweb + '/knowledge-vet-detail/20220128114127-784-253' },
    { title: 'เดือน เม.ย. - มิ.ย.', link: this.serviceProviderService.urlweb + '/knowledge-vet-detail/20220128114720-360-212' },
    { title: 'เดือน ม.ค. - มี.ค.', link: this.serviceProviderService.urlweb + '/knowledge-vet-detail/20220201132050-216-268' },
    { title: 'ปีอื่นๆ', link: this.serviceProviderService.urlweb + '/knowledge-vet' },
  ];

  ENewsMoc: any = [
    { title: 'ปี 2565', link: this.serviceProviderService.urlweb + '/vet-enews' },
    { title: 'ปี 2564', link: this.serviceProviderService.urlweb + '/vet-enews' },
    { title: 'ปี 2563', link: this.serviceProviderService.urlweb + '/vet-enews' },
    { title: 'ปี 2562', link: this.serviceProviderService.urlweb + '/vet-enews' },
    { title: 'ปี 2561', link: this.serviceProviderService.urlweb + '/vet-enews' },
    { title: 'ปีอื่นๆ', link: this.serviceProviderService.urlweb + '/vet-enews' }
  ];

  loginMoc: any = [
    { title: 'E-Learning', link: this.serviceProviderService.urlweb + 'http://209.15.98.88/elearning/login/index.php' },
    { title: 'ตรวจงานคะแนนชั้น 1', link: this.serviceProviderService.urlweb + 'http://209.15.98.88/vet_member/index.php?b=login' },
    { title: 'ตรวจงานคะแนนชั้น 2', link: this.serviceProviderService.urlweb + 'http://209.15.98.88/vet_member/index.php?b=login2' },
    { title: 'สมัครสมาชิกสัตวแพทยสภา', link: this.serviceProviderService.urlweb + '/register' },
    { title: 'สำหรับเจ้าหน้าที่สัตวแพทยสภา', link: this.serviceProviderService.urlweb + 'http://209.15.98.88/vet_member/admin/login.php' },
    { title: 'สำหรับสถาบันหลัก/สถาบันสมทบ', link: this.serviceProviderService.urlweb + '/register' }
  ];

  executive: any = [
    { title: 'คณะกรรมการสัตวแพทยสภา', link: this.serviceProviderService.urlweb + '/personnel' },
    { title: 'โครงสร้างสำนักงาน', link: this.serviceProviderService.urlweb + '/personnel' },
    { title: 'บุคลากรเจ้าหน้าที่', link: this.serviceProviderService.urlweb + '/personnel' },
  ];

  contactus: any = [
    { title: 'การติดต่อ', link: this.serviceProviderService.urlweb + '/contact-us' },
    { title: 'หน่อยงานที่เกี่ยวข้อง', link: this.serviceProviderService.urlweb + '/contact-us' },
    { title: 'สอบถามเพิ่มเติม', link: this.serviceProviderService.urlweb + '/contact-us' },
    { title: 'แผนที่', link: this.serviceProviderService.urlweb + '/contact-us' },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.center = params.center;
    });
  }

  ngOnInit(): void {
    this.callRead();
  }


  callRead() {
    this.serviceProviderService.SendIPAddress("ContactUs " + this.center);
    this.serviceProviderService.post('aboutUs/read', { center: this.center }).subscribe(data => {
      let model: any = {};
      model = data;
      this.aboutUs = model.objectData[0];

    }, err => {
      console.log(' err Shop --> ', err);
    });
  }

}
