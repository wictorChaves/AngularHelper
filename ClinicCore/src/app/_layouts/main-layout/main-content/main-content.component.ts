import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { VariableHelper }    from 'src/app/helper/variable-helper';

@Component({
  selector   : 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls  : ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  public breadcrumbItems = []

  constructor(router: Router) {
    router.events.subscribe((val) => {
      if (VariableHelper.HasValue(val['url'])) {
        var splitUrl             = val['url'].split("/").filter(n => n != "")
            this.breadcrumbItems = [];
        splitUrl.forEach((name: string, index: number) => {
          this.breadcrumbItems.push({
            name: this._jsUcfirst(name),
            url : this.GenerateUrl(splitUrl, index).toString()
          })
        });
      }
    });
  }

  _jsUcfirst(valor: string) {
    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }

  GetLast(breadcrumbItems: any[]): string {
    if (breadcrumbItems.length <= 0)
      return "";
    return breadcrumbItems[breadcrumbItems.length - 1].name;
  }

  GetFirst(breadcrumbItems: any[]) {
    if (breadcrumbItems[0] != undefined)
      return breadcrumbItems[0].name;
    return "";
  }

  GenerateUrl(breadcrumbItems: string[], index: number): string {
    var temp        = [...breadcrumbItems]
        temp.length = (temp.length - (temp.length - index)) + 1;
    return "/" + temp.join("/");
  }

  ngOnInit() {

  }

}
