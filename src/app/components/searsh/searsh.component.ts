import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, Message ,MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-searsh',
  templateUrl: './searsh.component.html',
  styleUrls: ['./searsh.component.css'],
})
export class SearshComponent implements OnInit {
  messages: Message[] = []

  ngOnInit() {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Message Content' }];
  }

}


