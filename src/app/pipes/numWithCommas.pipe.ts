import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addCommas'
})
export class CommasPipe implements PipeTransform {
    transform(value: string | number): string {
        let val: string;
        if(typeof(value) === 'number'){
            val = value.toString();
        } else {
            val = value
        }
        let parts = val.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}