import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  getMonths() {
    var months = [];
    for (var month = 1; month <= 12; month++) {
      months.push(month);
    }
    return months;
  }

  getYears(quantity: number) {
    var years = [new Date().getFullYear() - 1];
    for (var year = years[0] + 1; year < years[0] + quantity; year++) {
      years.push(year);
    }
    return years;
  }

}
