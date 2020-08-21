import { Component, Inject } from '@angular/core';
import { CsvFileTypes, IgxCsvExporterOptions, IgxCsvExporterService } from "igniteui-angular";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Flash Cards CSV';
  erroMsg = ""
  successMsg = ""
  csvData = []

  form = new FormGroup({
    frente: new FormControl('', Validators.required),
    tras: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.erroMsg = ""
    if (this.form.invalid)
      return this.erroMsg = "Favor preencher todos os campos!"
    this._salvar()
  }

  private _salvar() {
    this.csvData.push({
      id: this._generateId(),
      frente: this.form.get('frente').value,
      tras: this.form.get('tras').value
    })
    this.storage.set("cards", this.csvData);
    this.successMsg = "Card salvo com sucesso!"
  }

  private _generateId() {
    if (this.csvData.length == 0)
      return 1;
    return this.csvData[this.csvData.length - 1].id + 1;
  }

  ExcluirItem(id: number) {
    this.csvData = this.csvData.filter(d => d.id != id)
  }

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private csvExportService: IgxCsvExporterService
  ) {
    this.csvData = this.storage.get("cards");
    if (this.csvData == undefined)
      this.csvData = []
  }

  private _formatCSV(csvData): string {
    var newArray = []
    csvData.forEach((item, index) => {
      newArray.push("\"" + item.frente + "\",\"" + item.tras + "\"")
    })
    return newArray.join("\n");
  }

  LimparLista() {
    this.csvData = []
  }

  public SaveFile() {
    const blob = new Blob([this._formatCSV(this.csvData)], { type: 'text/csv' });
    const dataURL = window.URL.createObjectURL(blob);

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    }

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'export file.csv';
    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(dataURL);
    }, 100);
  }

}
