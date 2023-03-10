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


    vet: { th: '?????????????????????????????????????????????????????????', en: 'Office of the Veterinary Council' },
    login: { th: '?????????????????????????????????', en: 'Login' },
    welcome: { th: '????????????????????????????????????', en: 'Welcome' },
    news: { th: '???????????????????????????????????????????????????', en: 'News' },
    seminar: { th: '??????????????????', en: 'Seminar' },
    event: { th: '???????????????????????????????????????', en: 'Event Calendar' },
    knowledge: { th: '??????????????????????????????', en: 'Document' },
    contactus: { th: '???????????????????????????', en: 'Contact us' },
    executive: { th: '??????????????????????????????????????????????????????', en: 'Executive structure' },
    th: { th: '?????????', en: 'TH' },
    en: { th: '??????????????????', en: 'EN' },
    search: { th: '????????????????????? ?????????????????????????????????', en: 'Search in Vetcouncil' },
    searchVet: { th: '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????', en: 'Find a list of veterinary practitioners.' },
    article: { th: '????????????????????????????????? ?????????????????????????????????????????? ?????????????????????????????????????????? ?????????????????????????????????????????????????????????', en: 'The Veterinary Council adheres to standards. cooperation uphold the benefits of society' },
    article2: { th: '?????????????????? ?????????????????????????????????', en: 'Panithan Veterinary Council' },
    important: { th: '?????????????????????????????????????????????????????????????????????', en: 'Important Information For Members' },
    viewall: { th: '???????????????????????????', en: 'View All' },
    imageEvent: { th: '??????????????????????????????', en: 'Event Image' },
    vetsubstances: { th: '??????????????????????????????????????????', en: 'Vet Council Substances' },
    vetsubstancesLike: { th: '????????????????????????????????????????????????????????????????????????', en: 'Vet Council Substances Like' },
    vetenews: { th: '??????????????????????????????????????????????????????', en: 'Vet Council Enew' },
    partner: { th: '?????????????????????????????????', en: 'Partner' },
    apptitle: { th: 'Application ?????????????????????????????????', en: 'Application Vet Council' },
    appdes: { th: '??????????????????????????????????????????????????????????????????????????????????????????', en: 'Application for follow the news' },
    appdes2: { th: '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????', en: 'For the general public and those interested in news and features' },
    contact: { th: '???????????????????????????', en: 'Contact' },
    agency: { th: '???????????????????????????????????????????????????????????????', en: 'Related Agencies' },
    sitemap: { th: '?????????????????????????????????', en: 'Sitemap' },
    askmore: { th: '?????????????????????????????????????????????', en: 'Ask More' },
    earlierThisYear: { th: '???????????????????????????????????????', en: 'Earlier This Year' },
    evnt: { th: '?????????????????????', en: 'Event' },
    law: { th: '??????????????????', en: 'Law' },
    category: { th: '????????????????????????', en: 'Category' },
    mainPage: { th: '????????????????????????', en: 'MainPage' },
    pillar: { th: '?????????????????????', en: 'Pillar'},
    term: { th: '????????????', en: 'Term'},
    year: { th: '??????', en: 'Year'},
    all: { th: '?????????????????????', en: 'All'},
    notFound: { th: '?????????????????????????????????', en: 'Not Found'},
    trainingInstitute: { th: '???????????????????????????????????????', en: 'Training Institute'},
    expertBranch: { th: '???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????', en: 'Expert Branch'},
    verifyApprovedUser: { th: '???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????', en: 'Verify Approved User'},
    latest:{th:"??????????????????",en:'Latest'},
    register:{th:"?????????????????????????????????",en:'Register'},
    downloadLicenseForm:{th:"??????????????????????????????????????????????????????????????????????????????",en:'Download license form'},
    applyRegisterVet:{th:'??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',en:'Applying for and registering a license to be a veterinary'},
    pleaseEnter:{th:"???????????????????????????",en:'Please enter'},
    notValid:{th:"??????????????????????????????",en:'Not valid'},
    personalInformation:{th:"???????????????????????????????????????",en:'Personal Information'},
    IDNumber:{th:"??????????????????????????????????????????????????????",en:'ID Number'},
    phoneNumber:{th:"?????????????????????????????????",en:'Phone Number'},
    nameSurname:{th:"???????????? - ?????????????????????",en:'Name - Family Name'},
    rank:{th:"??????",en:'Rank'},
    name:{th:"????????????",en:'Name'},
    familyName:{th:"?????????????????????",en:'Family Name'},
    prefixName:{th:"????????????????????????",en:'prefix name'},
    oldNameSurname:{th:"???????????? - ????????????????????? ????????????",en:'Old Name - Family Name'},
    dateOfBirth:{th:"??????????????????????????????????????????",en:'Date of birth'},
    day:{th:"?????????",en:'Day'},
    month:{th:"???????????????",en:'Month'},
    age:{th:"????????????",en:'Age'},
    nationality:{th:"?????????????????????",en:'nationality'},
    race:{th:"????????????????????????????????????",en:'race'},
    religion:{th:"???????????????",en:'religion'},
    homeAddress:{th:"???????????????????????????????????????????????????????????????",en:'Home Address'},
    addressHouse:{th:"?????????????????? ????????? ?????????????????????",en:'House No / Village No.'},
    houseNumber:{th:"??????????????????",en:'house number'},
    moo:{th:"????????????",en:'Village No'},
    villageBuilding:{th:"??????????????? / ????????????????????????",en:'Village / Building'},
    lane:{th:"?????????",en:'Lane'},
    road:{th:"?????????",en:'Road'},
    subDistrictSubArea:{th:"???????????? / ????????????",en:'Sub-district/ Sub-area'},
    districtArea:{th:"????????? / ???????????????",en:'District/ Area'},
    province:{th:"?????????????????????",en:'Province'},
    postalCode:{th:"????????????????????????????????????",en:'Postal Code'},
    workAddress:{th:"?????????????????????????????????????????????",en:'Work Address'},
    sameHomeAddress:{th:"?????????????????????????????????????????????????????????????????????????????????",en:'Same As Home Address'},
    careers:{th:"??????????????????????????????????????????",en:'Careers'},
    office:{th:"??????????????????",en:'Office'},
    civilServant:{th:"???????????????????????????",en:'Civil Servant'},
    clinicVeterinary:{th:'??????????????????/??????????????????????????????????????????',en:'veterinary'},
    farm:{th:"?????????????????????????????????????????????????????????????????????",en:'Farm'},
    professor:{th:"?????????????????????",en:'Professor'},
    other:{th:"???????????? ???",en:'Other'},
    mailingAddress:{th:"?????????????????????????????????????????????????????????",en:'Mailing Address'},
    sameWorkAddress:{th:"???????????????????????????????????????????????????????????????",en:'Same As Work Address'},
    education:{th:"????????????????????????",en:'Education'},
    highestEducation:{th:"??????????????????????????????????????????",en:'Highest Education'},
    completeBachelorVeterinary:{th:"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",en:'Graduated with a bachelor\'s degree Veterinary Medicine, academic year'},
    otherProfessionalCertificate:{th:"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",en:'degree or other professional certificate'},
    highestLevelOfEducation:{th:"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",en:'The highest level of education besides a bachelor\'s degree in veterinary medicine.'},
    noteForOfficers:{th:"???????????????????????? (???????????????????????????????????????????????????)",en:'note (for officers)'},
    eventAbroad:{th:"???????????????????????????????????????????????????",en:"Event Abroad"},
    oldweb:{th:"????????????????????????????????????",en:"Old Website"},
    editInformation:{th:"?????????????????????????????????",en:"Edit Information"},
    editInformationPA:{th:"????????????????????????????????? (???????????????????????????)",en:"Edit Information (pending approval)"},

  }
}

