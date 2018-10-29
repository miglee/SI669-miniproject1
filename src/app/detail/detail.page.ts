import { Component } from '@angular/core';
import { ChecklistDataService } from '../checklist-data.service';
import { Manager } from '../model/manager';
import { CheckList } from '../model/checklist';
import { CheckItem } from '../model/checkitem';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {


  private lists: {}={};
  private listsArray: CheckList[]=[];
  private inputNewList: string;

  private list: CheckList;
  private listTitle: string;
  public listId: number;

  private items: {}={};
  private itemsArray: CheckItem[]=[];
  private inputNewItem: string;


  public constructor(private dataService: ChecklistDataService, 
  	private router: Router,
  	private route: ActivatedRoute) {

  	this.route.params.subscribe((params) => {
      this.listId = params["listId"];
    });

    this.dataService.getObservable().subscribe(() => {
    	console.log("subscribe in constructor start");
    	this.list = this.dataService.manager.lists[this.listId];
      this.listsArray = this.dataService.manager.getListsArray();
      console.log("listsArray:", this.listsArray);
      console.log("in Detail constructor, lists updated -string" + JSON.stringify(this.listsArray));  
      this.itemsArray = this.dataService.manager.getItemsArray(this.list);
      console.log("in Detail constructor, items updated " + this.items); 
    });

  }


  public ngOnInit() {
  	this.route.params.subscribe((params) => {
      this.listId = params["listId"];
    });

    this.dataService.getObservable().subscribe(() => {
      this.listsArray = this.dataService.manager.getListsArray();
      console.log("in Detail oninit, lists updated " + JSON.stringify(this.listsArray));  
      this.list = this.dataService.manager.lists[this.listId];
      this.itemsArray = this.dataService.manager.getItemsArray(this.list);
      console.log("in Detail oninit, items updated " + JSON.stringify(this.items)); 
    }); 
  }






    private removeItem(item: CheckItem): void {
    	console.log("remove function working");
    this.dataService.manager.removeItem(item);
    this.dataService.saveData();
  }

  // public cleanData(){
  // 	this.dataService.cleanData();
  // 	this.dataService.saveData();
  // }

    private saveNewItem() {
    this.dataService.manager.createItem(this.list,this.inputNewItem, "Medium", false,this.listId);
    this.dataService.saveData();

  }

  private goToDetail(id:number) {
  	this.router.navigate(['/detail', id]);

  }

}