import { CheckItem } from './checkitem';

export class CheckList {


    public constructor(public listTitle: string, 
                        public listId: number, 
                        public items: {} = {},
                        public editing:boolean=false) {

    }

    public setTitle(newTitle: string): void {
        this.listTitle = newTitle;
    }

    // public toString() : string {
    //     return this.listId + ": " + this.listTitle + ", items:" + this.items.toString();
    // }
}