import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilities } from './utilities';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  // ng build --base-href "/uat/" --prod
  // server: string = 'http://localhost:5300/';
  // server: string = 'http://122.155.223.63/td-vet-api/';
  // server: string = 'https://vet.we-builds.com/vet-api/';
  server: string = 'http://mangcoo.com/mangcoo-api/';

  // serverReport: string = 'http://localhost:5300/';
  // serverReport: string = 'http://122.155.223.63/td-vet-report/';
  serverReport: string = 'https://vet.we-builds.com/vet-api/';

  //serverPayment: string = 'https://core148.we-builds.com/payment-gateway.php';
  serverPayment: string = 'https://suksapanonline.com/payment-gateway.php';

  urlweb: string = 'https://www.vetcouncil.or.th/';
  urlcms: string ='https://www.vetcouncil.or.th/cms/';
  constructor(
    private http: HttpClient,
    private utilities: Utilities,
  ) { }

  lang: string = localStorage.getItem('lang') ?? 'th';

  post(url, param) {

    param.profileCode = this.utilities.getUserLocalStorage().profileCode;
    param.organization = [];
    param.permission = 'all';

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST');

    // let options = new RequestOptions();
    // options.headers = headers;
    // param.organization = JSON.parse(localStorage.getItem('organization'));
    return this.http.post(this.server + url, param, { headers: headers });
  }

  getUrlServer(url) {
    // console.log('url >>', url);
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET');
    return this.http.get(this.server + url, { headers: headers });
  }

  getUrl(url) {
    // console.log('url >>', url);
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET');
    return this.http.get(url, { headers: headers });
  }

  get(url) {
    // console.log('url >>', url);
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET');

    return this.http.get(url);
  }

  postList(url, param) {

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.server + url, param, { headers: headers });
  }

  getIP() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  postReport(url, param) {

    param.profileCode = this.utilities.getUserLocalStorage().profileCode;
    param.organization = [];
    param.permission = 'all';

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST');

    // let options = new RequestOptions();
    // options.headers = headers;
    // param.organization = JSON.parse(localStorage.getItem('organization'));
    return this.http.post(this.serverReport + url, param, {
      headers: headers, responseType: "arraybuffer",
    });
  }

  SendIPAddress(page) {
    // this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
    //   this.post('ip/create', {
    //     ipAddress: res.ip,
    //     page: page,
    //     userName: this.utilities.getUserLocalStorage().username ?? "",
    //   }).subscribe();
    // });
  }


  langModel: any = {
    logo: { th: 'Mangcoo.com', en: 'Mangcoo.com' },


    vet: { th: 'สำนักงานสัตวแพทยสภา', en: 'Office of the Veterinary Council' },
    login: { th: 'เข้าสู่ระบบ', en: 'Login' },
    welcome: { th: 'ยินดีต้อนรับ', en: 'Welcome' },
    news: { th: 'ข่าวประชาสัมพันธ์', en: 'News' },
    seminar: { th: 'สัมมนา', en: 'Seminar' },
    event: { th: 'ปฎิทินกิจกรรม', en: 'Event Calendar' },
    knowledge: { th: 'คลังเอกสาร', en: 'Document' },
    contactus: { th: 'ติดต่อเรา', en: 'Contact us' },
    executive: { th: 'โครงสร้างผู้บริหาร', en: 'Executive structure' },
    th: { th: 'ไทย', en: 'TH' },
    en: { th: 'อังกฤษ', en: 'EN' },
    search: { th: 'ค้นหาใน สัตวแพทยสภา', en: 'Search in Vetcouncil' },
    searchVet: { th: 'ค้นหารายชื่อผู้ประกอบวิชาชีพการสัตวแพทย์', en: 'Find a list of veterinary practitioners.' },
    article: { th: 'สัตวแพทยสภา ยึดมั่นมาตรฐาน สานความร่วมมือ ยึดถือประโยชน์สังคม', en: 'The Veterinary Council adheres to standards. cooperation uphold the benefits of society' },
    article2: { th: 'ปณิธาน สัตวแพทยสภา', en: 'Panithan Veterinary Council' },
    important: { th: 'ข้อมูลสำคัญสำหรับสมาชิก', en: 'Important Information For Members' },
    viewall: { th: 'ดูทั้งหมด', en: 'View All' },
    imageEvent: { th: 'ภาพกิจกรรม', en: 'Event Image' },
    vetsubstances: { th: 'สารสัตวแพทยสภา', en: 'Vet Council Substances' },
    vetsubstancesLike: { th: 'สารสัตวแพทยสภาที่น่าสนใจ', en: 'Vet Council Substances Like' },
    vetenews: { th: 'สัตวแพทยสภาอีนิวส์', en: 'Vet Council Enew' },
    partner: { th: 'ผู้สนับสนุน', en: 'Partner' },
    apptitle: { th: 'Application สัตวแพทยสภา', en: 'Application Vet Council' },
    appdes: { th: 'แอพพลิเคชันสำหรับติดตามข่าวสาร', en: 'Application for follow the news' },
    appdes2: { th: 'สำหรับบุคคลทั่วไปและผู้สนใจข่าวสารต่างๆและฟีเจอร์ต่างๆ', en: 'For the general public and those interested in news and features' },
    contact: { th: 'การติดต่อ', en: 'Contact' },
    agency: { th: 'หน่วยงานที่เกี่ยวข้อง', en: 'Related Agencies' },
    sitemap: { th: 'ผังเว็บไซต์', en: 'Sitemap' },
    askmore: { th: 'สอบถามเพิ่มเติม', en: 'Ask More' },
    earlierThisYear: { th: 'ปีก่อนหน้านี้', en: 'Earlier This Year' },
    evnt: { th: 'กิจกรรม', en: 'Event' },
    law: { th: 'กฎหมาย', en: 'Law' },
    category: { th: 'หมวดหมู่', en: 'Category' },
    mainPage: { th: 'หน้าหลัก', en: 'MainPage' },
    pillar: { th: 'เสาหลัก', en: 'Pillar'},
    term: { th: 'วาระ', en: 'Term'},
    year: { th: 'ปี', en: 'Year'},
    all: { th: 'ทั้งหมด', en: 'All'},
    notFound: { th: 'ไม่พบข้อมูล', en: 'Not Found'},
    trainingInstitute: { th: 'สถาบันฝึกอบรม', en: 'Training Institute'},
    expertBranch: { th: 'ตรวจสอบรายชื่อผู้ได้รับอนุมัติบัตรและวุฒิบัตร', en: 'Expert Branch'},
    verifyApprovedUser: { th: 'ตรวจสอบรายชื่อผู้ได้รับอนุมัติบัตรและวุฒิบัตร', en: 'Verify Approved User'},
    latest:{th:"ล่าสุด",en:'Latest'},
    register:{th:"สมัครสมาชิก",en:'Register'},
    downloadLicenseForm:{th:"ดาวน์โหลดไฟล์ขอรับใบอนุญาต",en:'Download license form'},
    applyRegisterVet:{th:'คำขอสมัครเป็นสมาชิกและขอขึ้นทะเบียนรับใบอนุญาตเป็นผู้ประกอบวิชาชีพการสัตวแพทย์',en:'Applying for and registering a license to be a veterinary'},
    pleaseEnter:{th:"กรุณากรอก",en:'Please enter'},
    notValid:{th:"ไม่ถูกต้อง",en:'Not valid'},
    personalInformation:{th:"ข้อมูลส่วนตัว",en:'Personal Information'},
    IDNumber:{th:"เลขประจำตัวประชาชน",en:'ID Number'},
    phoneNumber:{th:"เบอร์ติดต่อ",en:'Phone Number'},
    nameSurname:{th:"ชื่อ - นามสกุล",en:'Name - Family Name'},
    rank:{th:"ยศ",en:'Rank'},
    name:{th:"ชื่อ",en:'Name'},
    familyName:{th:"นามสกุล",en:'Family Name'},
    prefixName:{th:"คำนำหน้า",en:'prefix name'},
    oldNameSurname:{th:"ชื่อ - นามสกุล เดิม",en:'Old Name - Family Name'},
    dateOfBirth:{th:"วันเดือนปีเกิด",en:'Date of birth'},
    day:{th:"วัน",en:'Day'},
    month:{th:"เดือน",en:'Month'},
    age:{th:"อายุ",en:'Age'},
    nationality:{th:"สัญชาติ",en:'nationality'},
    race:{th:"เชื้อสัญชาติ",en:'race'},
    religion:{th:"ศาสนา",en:'religion'},
    homeAddress:{th:"ที่อยู่ตามทะเบียนบ้าน",en:'Home Address'},
    addressHouse:{th:"เลขที่ และ หมู่ที่",en:'House No / Village No.'},
    houseNumber:{th:"เลขที่",en:'house number'},
    moo:{th:"หมู่",en:'Village No'},
    villageBuilding:{th:"อาคาร / หมู่บ้าน",en:'Village / Building'},
    lane:{th:"ซอย",en:'Lane'},
    road:{th:"ถนน",en:'Road'},
    subDistrictSubArea:{th:"แขวง / ตำบล",en:'Sub-district/ Sub-area'},
    districtArea:{th:"เขต / อำเภอ",en:'District/ Area'},
    province:{th:"จังหวัด",en:'Province'},
    postalCode:{th:"รหัสไปรษณีย์",en:'Postal Code'},
    workAddress:{th:"ที่อยู่ที่ทำงาน",en:'Work Address'},
    sameHomeAddress:{th:"เหมือนที่อยู่ตามทะเบียนบ้าน",en:'Same As Home Address'},
    careers:{th:"ประเภทหน่วยงาน",en:'Careers'},
    office:{th:"บริษัท",en:'Office'},
    civilServant:{th:"รับราชการ",en:'Civil Servant'},
    clinicVeterinary:{th:'คลินิก/โรงพยาบาลสัตว์',en:'veterinary'},
    farm:{th:"เจ้าของฟาร์มเลี้ยงสัตว์",en:'Farm'},
    professor:{th:"อาจารย์",en:'Professor'},
    other:{th:"อื่น ๆ",en:'Other'},
    mailingAddress:{th:"ที่อยู่ที่ติดต่อได้",en:'Mailing Address'},
    sameWorkAddress:{th:"เหมือนที่อยู่ที่ทำงาน",en:'Same As Work Address'},
    education:{th:"การศึกษา",en:'Education'},
    highestEducation:{th:"การศึกษาสูงสุด",en:'Highest Education'},
    completeBachelorVeterinary:{th:"จบการศึกษาสัตวแพทยศาสตรบัณฑิตปีการศึกษา",en:'Graduated with a bachelor\'s degree Veterinary Medicine, academic year'},
    otherProfessionalCertificate:{th:"ได้รับปริญญาหรือประกาศนียบัตรในวิชาชีพอื่นคือ",en:'degree or other professional certificate'},
    highestLevelOfEducation:{th:"โดยกรอกการศึกษาสูงสุดนอกเหนือจากสัตวแพทยศาสตรบัณฑิต",en:'The highest level of education besides a bachelor\'s degree in veterinary medicine.'},
    noteForOfficers:{th:"หมายเหตุ (สำหรับเจ้าหน้าที่)",en:'note (for officers)'},
    eventAbroad:{th:"กิจกรรมต่างประเทศ",en:"Event Abroad"},
    oldweb:{th:"เว็บไซต์เก่า",en:"Old Website"},
    editInformation:{th:"แก้ไขข้อมูล",en:"Edit Information"},
    editInformationPA:{th:"แก้ไขข้อมูล (รออนุมัติ)",en:"Edit Information (pending approval)"},

  }
}

