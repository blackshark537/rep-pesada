export class Timer{

    private time: number;

    constructor(date: Date | string){
        this.time = typeof(date) == 'string'? new Date(date).getTime() : date.getTime();
    }

    /**
     * add one day by default
     * @param days number default 1
     * @returns Timer Object
     */
    add_days(days?: number): Timer{
        if(!days){
            days = 1;
        }
        this.time += (24*days*60*60*1000);
        return this;
    }

    /**
     * remove one day by default
     * @param days number default 1
     * @returns Timer Object
     */
    rem_days(days?: number): Timer{
        if(!days){
            days = 1;
        }
        this.time -= (24*days*60*60*1000);
        return this;
    }

    /**
     * add one day by default
     * @param weeks number default 1
     * @returns Timer Object
     */
    add_weeks(weeks?: number): Timer{
        if(!weeks){
            weeks = 1;
        }
        this.time += ((24*7*60*60*1000)*weeks);
        return this;
    }

    /**
     * remove one day by default
     * @param weeks number default 1
     * @returns Timer Object
     */
    rem_weeks(weeks?: number): Timer{
        if(!weeks){
            weeks = 1;
        }
        this.time -= ((24*7*60*60*1000)*weeks);
        return this;
    }

    /**
     * 
     * @returns Date object
     */
    date(): Date{
        return new Date(this.time);
    }

    /**
     * add one year 365 days by default
     * @param years number default 1
     * @returns Timer Object
     */
    add_years(years?: number): Timer{
        if(!years){
            years = 1;
        }
        this.time += ((24*365*60*60*1000)*years);
        return this;
    }
}