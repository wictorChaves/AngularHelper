import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {

  @Output() change = new EventEmitter<Event>();
  @Input() name:string = "";

  public fileName = "Selecione o arquivo";

  constructor() { }

  ngOnInit() {
  }

  uploadFile(){
    var element = document.querySelector('[type="file"]') as HTMLInputElement;
    element.click();
  }

  handleInputChange(event: Event) {
    var target = event.target as HTMLInputElement;
    if(target.files.length > 0)
      this.fileName = target.files[0].name;
    this.change.emit(event);
  }

}
