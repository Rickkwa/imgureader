import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'range' })
export class RangePipe implements PipeTransform {
    transform(value: number) {
        // Return an array of [0, 1, .., value - 1]
        return Object.keys(new Array(value).fill(1)).map(val => parseInt(val));
    }
}
