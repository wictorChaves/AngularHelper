import { Component, OnInit, Input } from '@angular/core';
import { DynamicForm } from 'src/app/helper/form/dynamic-form';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css']
})
export class FormErrorsComponent implements OnInit {

  @Input() formulario: DynamicForm;

  constructor() { }

  ngOnInit() {
  }

}
