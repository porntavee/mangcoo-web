import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-search',
  templateUrl: './d-search.component.html',
  styleUrls: ['./d-search.component.css']
})
export class DSearchComponent implements OnInit {
  model: any = [
  ];
  name: any = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public serviceProviderService: ServiceProviderService,
  ) {

  }

  chkValidate() {
    if (this.name == '') {
      Swal.fire({
        icon: 'warning',
        title: 'แจ้งเตือน',
        text: 'กรุณากรอกชื่อ หรือ นามสกุล',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Close',
      })
    }
    else
    {
      this.nav('search-result');
    }
  }

  nav(nav: string) {


    switch (nav) {
      case 'search-result':
        this.router.navigate(['search-result'], { queryParams: { code: this.name } });
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }

  ngOnInit(): void {
  }

}
