import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})export class CalendarService {
    monthlyTotalDays = Array();
    spaceTable = Array();
    calendar = Array(31);
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    days = [];
    months = [];
    monthName = '';
    countBefore = 0;
    countAfter = 0;
    daysWeekName = [];
    mon = this.month - 1; // months in JS are 0..11, not 1..12
    d = new Date(this.year, this.mon);
    daysOfTheWeek = Array();
    constructor(private http : HttpClient) {}


    getDays() {
        this.http.get<any[]>('/assets/json/days.json').subscribe(resp => {
            if (resp) {
                this.days = resp;
                console.log(this.days);
            } else {
                console.log('Error clubes roles');
            }
        });
    }
    getMonths() {
        this.http.get<any[]>('/assets/json/months.json').subscribe(resp => {
            if (resp) {
                this.months = resp;
                console.log(this.months);
            } else {
                console.log('Error clubes roles');
            }
        });
    }


    nextMonth() {
  if (this.month == 12) {
            this.year ++;
            this.month = 0;
            this.createCalendar(this.year, 1);
        } else {
            this.month ++;
            this.createCalendar(this.year, this.month);
        }
        console.log('next', this.month, this.year);
    }
    lastMonth() {
      if (this.month == 1) {
            this.year --;
            this.month = 12;
            this.createCalendar(this.year, 12);
        } else {
            this.month --;
            this.createCalendar(this.year, this.month);
        }

    }
    createCalendar(year, month) {

        this.months.forEach(item => {
            if (item.id === month) {
                this.monthName = item.name;
            }
        });
        // spaces for the first row
        // from Monday till the first day of the month
        // * * * 1  2  3  4
        this.countBefore = 0;
        for (let i = 0; i < this.getDay(this.d); i++) {

            this.countBefore = i + 1;

        }
        // alert(  this.countBefore)
        this.daysOfTheWeek = Array(this.countBefore);
        // <td> with actual dates
        while (this.d.getMonth() === this.mon) {
            this.monthlyTotalDays = Array(this.d.getDate());
            this.d.setDate(this.d.getDate() + 1);
        }
        // add spaces after last days of month for the last row
        // 29 30 31 * * * *
        this.countAfter = 0;
        if (this.getDay(this.d) != 0) {
            for (let i = this.getDay(this.d); i < 7; i++) {
                console.log('i', i, 'i++', i++, 'function', this.getDay(this.d));
                this.countAfter += i + 1;
            }
            this.spaceTable = Array(this.countAfter);
        }
    }
    getDay(date) { // get day number from 0 (monday) to 6 (sunday)
        let day = date.getDay();
        if (day === 0) {
            day = 7;
        } // make Sunday (0) the last day
        return day - 1;
    }


}
