import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'register-preview',
  templateUrl: './register-preview.component.html',
  styleUrls: ['./register-preview.component.css']
})
export class RegisterPreviewComponent implements OnInit {

  @Output() callback = new EventEmitter<any>();
  @Input() model: any = {};

  constructor(
    ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.callback.emit(false); // false == cancel, true == confirm.
  }

  submit() {
      this.callback.emit(true);
  }
}
