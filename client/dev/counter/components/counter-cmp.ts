import {
  Component,
  OnInit
} from "@angular/core";

import {
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";

import {
  CounterService
} from "../services/counter-service";

type Counter = {
  counterMessage: string;
  _id?: string;
};

@Component({
  selector: "counter-cmp",
  templateUrl: "counter/templates/counter.html",
  styleUrls: ["counter/styles/counter.css"]
})
export class CounterCmp implements OnInit {
  title: string = "ng2do";
  counter: Number;

  constructor(private _counterService: CounterService) {

  }

  ngOnInit() {
    this._getCounter();
  }

  private _getCounter(): void {
  this._counterService
    .getCounter()
    .subscribe((counter) => {
      this.counter = counter;
    });
  }


  private  _increaseCounter(): void {
    this._counterService.increaseCounter();
    this._getCounter();
  }


  // private _getAll(): void {
  //   this._counterService
  //       .getAll()
  //       .subscribe((counters) => {
  //         this.counters = counters;
  //       });
  // }
  //
  // add(message: string): void {
  //   this._counterService
  //       .add(message)
  //       .subscribe((m) => {
  //         this.counters.push(m);
  //         this.counterForm.counterMessage = "";
  //       });
  // }
  //
  // remove(id: string): void {
  //   this._counterService
  //     .remove(id)
  //     .subscribe(() => {
  //       this.counters.forEach((t, i) => {
  //         if (t._id === id)
  //           return this.counters.splice(i, 1);
  //       });
  //     });
  // }
}
