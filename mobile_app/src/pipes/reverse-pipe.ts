//import { NgModule }      from '@angular/core';

import { Pipe } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe {

  transform(value) {
    if (!value) return;

    return value.reverse();
  }
}