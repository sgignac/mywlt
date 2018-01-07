import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Icurrency } from '../../interfaces/icurrency';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @select() wallet$: Observable<Icurrency[]>;
  @select() exchangeRate$: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.drawChart();
    this.wallet$.subscribe(data =>{
      console.log('here', data);
      this.calculate(data);
    })
  }

  networth = 6755.33;
  invested = 0;
  pl = 4322.44;

  calculate(data:Icurrency[]){
    let netW = 0;
    let pl = 0;
    let inv = 0;
    data.forEach(crypto => {
      netW += (crypto.amount * crypto.value);
      inv += crypto.invested;
    });
    this.networth = netW;
    this.invested = inv;
    console.log('invested', inv);

  }


  drawChart() {
    var canvas = <HTMLCanvasElement>document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = 330,
		height = canvas.height = 115;

    var stats = [40, 65, 72, 67, 77, 87, 110, 105];

    context.translate(0, height);
    context.scale(1, -1);

    context.fillStyle = 'transparent';
    context.fillRect(0, 0, width, height);

    var left = 0,
        prev_stat = stats[0],
        move_left_by = width / stats.length;

    for(let stat in stats) {
      let the_stat = stats[stat];

      context.beginPath();
      context.moveTo(left, prev_stat);
      context.lineTo(left+move_left_by, the_stat);
      context.lineWidth = 3;
      context.lineCap = 'round';
      context.strokeStyle = '#ffffff'

      context.stroke();

      prev_stat = the_stat;
      left += move_left_by;

    }
  }

}
