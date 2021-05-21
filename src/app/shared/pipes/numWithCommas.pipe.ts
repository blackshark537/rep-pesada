import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addCommas'
})
export class CommasPipe implements PipeTransform {
    transform(value: string | number): string {
        return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}