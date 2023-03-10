import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-d-office',
  templateUrl: './d-office.component.html',
  styleUrls: ['./d-office.component.css']
})
export class DOfficeComponent implements OnInit {
  categoryList: any = [
    { 'code': '', 'title': 'เรียน ท่านสมาชิกสัตวแพทยสภาทุกท่าน นับตั้งแต่คณะกรรมการสัตวแพทยสภาที่ ได้รับการเลือกตั้งตามมาตรา 16(3) เข้ารับหน้าที่เมื่อวันที่ 9 กันยายน 2545 เป็นต้นมา ทำให้คณะกรรมการสัตวแพทยสภา ที่มีองค์ประกอบเต็มคณะชุดแรกสามารถปฏิบัติหน้าที่ตามพระราชบัญญัติวิชาชีพ การสัตวแพทย์ พ.ศ.2545 ได้ทันที แต่เนื่องด้วยมาตรา 24(4) ของพระราชบัญญัติฉบับนี้ได้กำหนดอำนาจหน้าที่ของคณะกรรมการให้ออกข้อบังคับ สัตวแพทยสภาในเบื้องต้น รวม 15 ข้อบังคับ (ก)-(ฒ) ในจำนวนนี้มีถึง 0 ข้อบังคับที่เกี่ยวข้องโดยตรงกับตัวท่านสมาชิกโดยเฉพาะข้อบังคับที่ว่าด้วย การออกใบอนุญาตและการต่ออายุใบอนุญาต (ญ) ซึ่งคณะกรรมการได้เร่งรัดดำเนินการในเรื่องเหล่านี้มาเป็นลำดับ และเพื่อให้คณะกรรมการสามารถพิจารณาได้อย่างรวดเร็ว จึงได้แต่งตั้งคณะอนุกรรมการยกร่างข้อบังคับต่างๆ ขึ้น 5 คณะ ข้อบังคับที่คณะอนุกรรมการได้ยกร่างและนำเสนอต่อที่ประชุมคณะกรรมการแล้วรวม 17 ข้อบังคับ คณะกรรมการได้ประชุมพิจารณาร่างข้อบังคับดังกล่าวไปแล้ว รวม 8 ครั้ง ขณะนี้มีข้อบังคับผ่านการพิจารณาของคณะกรรมการเรียบร้อยแล้ว รวม 14 ข้อบังคับ และกฎกระทรวง 1 ฉบับ ได้แก่ - ข้อบังคับสัตวแพทยสภา ว่าด้วยการเลือกตั้งและการเลือกกรรมการสัตวแพทยสภา พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยการเป็นสมาชิกสัตวแพทยสภา พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยโรคต้องห้ามการเป็นสมาชิกสัตวแพทยสภา พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยการกำหนดค่าขึ้นทะเบียนสมาชิก ค่าบำรุง และค่าธรรมเนียมอื่นๆ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยหลักเกณฑ์การขึ้นทะเบียนและการออกใบอนุญาต เป็นผู้ประกอบการวิชาชีพการสัตวแพทย์ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยข้อจำกัดและเงื่อนไขการประกอบวิชาชีพการสัตวแพทย์ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยการประชุมคณะกรรมการ คณะอนุกรรมการและคณะที่ปรึกษา พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยตราของสัตวแพทยสภา พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยแบบและประเภทใบอนุญาตเป็นผู้ประกอบการวิชาชีพการสัตวแพทย์ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยจรรยาบรรณแห่งวิชาชีพสัตวแพทย์ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยหนังสือรับรองการเป็นสมาชิกและบัตรประจำตัวสมาชิก พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยการสอบความรู้ผู้ประกอบวิชาชีพการสัตวแพทย์ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยการต่อใบอนุญาตเป็นผู้ประกอบการวิชาชีพการสัตวแพทย์ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยหลักเกณฑ์การสืบสวน หรือสอบสวนในกรณีที่มีการกล่าวหา หรือกล่าวโทษผู้ประกอบวิชาชีพการสัตวแพทย์ พ.ศ.2545และกฎกระทรวงว่าด้วยการกำหนดค่าธรรมเนียม โดยที่การออกข้อบังคับที่จะมีผลบังคับใช้ได้นั้น ต้องผ่า่นความเห็นชอบจากสภานายกพิเศษก่อน (ตามมาตรา 28) นอกจากนั้นข้อบังคับ 11 ข้อบังคับ เมื่อสภานายกพิเศษให้ความเห็นชอบแล้ว ต้องประกาศในราชกิจจานุเบกษาก่อนจึงจะใช้บังคับได้ (ตามมาตรา 24 วรรคท้าย) ซึ่งขณะนี้มีข้อบังคับจำนวน 5 ข้อบังคับอยู่ระหว่างรอการประกาศในราชกิจจานุเบกษา ได้แก่ - ข้อบังคับสัตวแพทยสภา ว่าด้วยการเป็นสมาชิกสัตวแพทยสภา พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยโรคต้องห้ามการเป็นสมาชิกสัตวแพทยสภา พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยการกำหนดค่าขึ้นทะเบียนสมาชิก ค่าบำรุงและค่าธรรมเนียมอื่นๆ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยหลักเกณฑ์ การขึ้นทะเบียนและการออกใบอนุญาตเป็นผู้ประกอบวิชาชีพการสัตวแพทย์ พ.ศ.2545 - ข้อบังคับสัตวแพทยสภา ว่าด้วยข้อจำกัดและเงื่อนไขการประกอบวิชาชีพการสัตวแพทย์ พ.ศ.2545 จะเห็นได้ว่า โดยขั้นตอนที่กำหนดไว้ในกฎหมายนั้น ทำให้ในระยะเริ่มแรกนี้คณะกรรมการไม่สามารถดำเนินการเรื่องต่างๆ ได้เบ็ดเสร็จรวดเร็วสมความตั้งใจของท่านสมาชิก จึงขอได้โปรดรับทราบผลการชี้แจงเบื้องต้นในครั้งนี้ด้วย ในส่วนที่ท่านสมาชิกต้องการต่อใบอนุญาตนั้น ขอให้ยื่นเรื่องขอต่อใบอนุญาตไว้ที่สำนักงานสัตวแพทยสภา ชั้น 5 ตึกวิจิตรพาหนการ กรมปศุสัตว์ ถนนพญาไท กรุงเทพฯ ซึ่งคณะกรรมการ่จะพิจารณาให้โดยเร็วที่สุดต่อไป ในระหว่างนี้ถ้าท่่านสมาชิกยังมีข้อสงสัยเกี่ยวกับการดำเนินงานของสัตวแพทย สภา กรุณาสอบถามจากคณะกรรมการสัตวแพทสภาทุกท่าน หรือสอบถามโดยตรงที่ สพ.ญ.คนึงนิจ รังสิธนานนท์ และสพ.ญ.สุวรรณี ท้วมแสง ซึ่งกรุณาช่วยเป็นฝ่ายเลขานุการของสัตวแพทยสภา เนื่องจากขณะนี้สัตวแพทยสภายังไม่มีเจ้าหน้าที่ประจำ จึงขออภัยในความไม่สะดวกในระยะเริ่มต้นมา ณ ที่นี้ด้วย จึงเรียนมาเพื่อโปรดทราบ ขอแสดงความนับถือ (รองศาสตราจารย์นายสัตวแพทย์สงคราม เหลืองทองคำ) นายกสัตวแพทยสภา' },
    { 'code': 'เกี่ยวกับเรา', 'title': '' },
    { 'code': 'วัตถุประสงค์ วิสัยทัศน์ พันธกิจ', 'title': '' },
    { 'code': 'โครงสร้างบุคลากร', 'title': '' },
    { 'code': 'โครงสร้างสำนักงาน', 'title': '' },
    { 'code': 'กฎหมาย', 'title': '' },
  ];
  categorySelected: any = {};

  constructor() { }

  ngOnInit(): void {
    this.categorySelected = this.categoryList[0];
  }

  selectedCategory(param) {
    var result = this.categoryList.find(o => param == o.code);
    this.categorySelected = result;
  }
}
