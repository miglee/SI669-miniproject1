import { CheckItem } from './checkitem';
import { CheckList } from './checklist';

var nextListId: number =0;
var nextItemId: number =0;

export class Manager {

    public lists: Object = {}; 
    private newList: any;
    private newItem: any;
    private newItemList: {} = {};

    public constructor() {

    }

    public initFromBundle(Bundle: Object /*Hero[]*/) {
        console.log(Bundle);
        for (let i in Bundle) {
            let listTitle:string = Bundle[i]['listTitle'];
            let listId: number = parseInt(Bundle[i]['listId']);
            let listItems:any[] = Bundle[i]['items'];
            for (let i in listItems) {
                let itemTitle: string = listItems[i]['itemTitle'];
                let itemId: number = parseInt(listItems[i]['itemId']);
                let priority: string = listItems[i]['priority'];
                let completed: boolean = listItems[i]['completed'];
                let inListId: number = listItems[i]['inListId'];
                // console.log("itemTitle:",itemTitle);                
                this.newItem = this.createItemWithId(itemTitle, itemId, priority, completed, inListId);
                // console.log("newitem in loop:", JSON.stringify(this.newItem));
                this.newItemList[this.newItem.itemId] = this.newItem;
                // console.log("newitemlist in loop:", JSON.stringify(this.newItemList));
            }
            this.newList = this.createListWithId(listTitle, listId, this.newItemList);
            this.newItemList={};
            // for (let i in this.newList) {
            //     this.newList.items[this.newItem.itemId] = this.newItem;
            // }
        }
        // console.log("initfrombundle, lists(string):",JSON.stringify(this.lists));
    }

    // private createListWithId(title: string, id: number, items: any[] = []): CheckList {
    private createListWithId(title: string, id: number, items: {} ={}): CheckList {
        console.log("items:",items);
        let list = new CheckList(title, id, items);
        this.lists[id] = list;
        console.log("new list:", list, " new list ListId:",list.listId);
        console.log("this.lists created:",this.lists);
        return list;
    }

    private getNextListId(): number {
         let maxListId =0
        for (let key in this.lists){
            if (maxListId < this.lists[key].listId){
                maxListId = this.lists[key].listId;
            }}
        nextListId = maxListId+1;
        return nextListId
       
    }

    public createList(title: string, items: any[] = []): CheckList {
        let listId = this.getNextListId();
        return this.createListWithId(title, listId, items);
    }


    public removeList(list: CheckList) {
        delete this.lists[list.listId];
    }


// items

    private createItemWithId(title: string, id: number, priority:string, completed:boolean, inlistid:number,): CheckItem {
        let item = new CheckItem(title, id, priority,completed,inlistid);
        // this.lists[inlistid].items[id] = item;
        return item;
    }

    private getNextItemId(list:CheckList): number {
         let maxItemId =0
         if(list.items!={}){
        for (let key in list.items){
            if (maxItemId < list.items[key].itemId){
                maxItemId = list.items[key].itemId;
            }}
        nextListId = maxItemId+1;
        return nextItemId}

    }

    public createItem(list:CheckList,title: string, priority:string, completed:boolean,inlistid:number,): CheckItem {
        let itemId = this.getNextItemId(list);
        return this.createItemWithId(title, itemId, priority,completed,inlistid);
    }


    public removeItem(item: CheckItem) {
        delete this.lists[item.inListId][item.itemId];
    }


// 

public getListsArray(): CheckList[] {
        // console.log("getlist() started");
        let listsArray: CheckList[] = [];
        for (let key in this.lists) {
            // console.log("this.manager.lists:",this.manager.lists);
            // console.log("key:",key);
            // console.log("list:",this.manager.lists[key]);

            listsArray.push(this.lists[key]);
        };
        // console.log("for loop ended");
        // console.log("get listArray():",JSON.stringify(lists));
        // console.log("list title",lists[0].listTitle);
        return listsArray;
    }

public getItemsArray(list:CheckList): CheckItem[] {
        // console.log("getlist() started");
        let itemsArray: CheckItem[] = [];
        for (let key in list.items) {
            // console.log("this.manager.lists:",this.manager.lists);
            // console.log("key:",key);
            // console.log("list:",this.manager.lists[key]);

            itemsArray.push(list.items[key]);
        };
        // console.log("for loop ended");
        // console.log("get listArray():",JSON.stringify(lists));
        // console.log("list title",lists[0].listTitle);
        return itemsArray;
    }

}


