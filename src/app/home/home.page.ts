
import { Component } from '@angular/core';
import { ChecklistDataService } from '../checklist-data.service';
import { Manager } from '../model/manager';
import { CheckList } from '../model/checklist';
import { CheckItem } from '../model/checkitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private lists: {}={};
  private listsArray: CheckList[]=[];
  private inputNewList: string;
  
  public constructor(private dataService: ChecklistDataService, private router: Router) {
    this.dataService.getObservable().subscribe(() => {
      this.listsArray = this.dataService.manager.getListsArray();
      console.log("in HomePage constructor, lists updated " + this.lists);  
    })
  }
  
  public ngOnInit() {
    this.listsArray = this.dataService.manager.getListsArray();
    console.log("in HomePage ngOnInit, lists updated " + this.lists);   
  }

  private selectList(list: CheckList): void {
    this.router.navigate(['/detail', list.listId]);
  }

    private removeList(list: CheckList): void {
    	console.log("remove fintion working");
    this.dataService.manager.removeList(list);
    this.dataService.saveData();
  }

  //   private editList(list: CheckList): void {
  //   list.editing=true;
  // }

  //   private saveNewListTitle(list: CheckList,newtitle:string): void {
  //   this.lists[list.listId].listTitle = newtitle;
  // }


  public cleanData(){
  	this.dataService.cleanData();
  	this.dataService.saveData();
  }

    private saveNewList() {
    this.dataService.manager.createList(this.inputNewList, []);
    this.dataService.saveData();
    this.router.navigate(['/home']);
  }

  private goToDetail(id:number) {
  	this.router.navigate(['/detail', id]);

  }

}