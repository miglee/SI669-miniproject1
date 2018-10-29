import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Manager } from './model/manager';
import { CheckList } from './model/checklist';
import { CheckItem } from './model/checkitem';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistDataService {


  public manager: Manager;

  private testing: boolean = true;
  private DATA_KEY: string = 'data';
  // 
  private bundle: CheckList[];
  private theObservable: Observable<Object>;
  private theObserver: Observer<Object>;

  constructor(private storage: Storage) { 
    this.manager = new Manager();
    
    this.storage.get(this.DATA_KEY).then(data => {
      this.bundle = data;
      // console.log("Retrieved bundle: " + this.bundle);
      if(this.bundle === null) {
        // this.loadDefaultData();
        this.bundle = [];
      } else {
        this.manager.initFromBundle(this.bundle);
      }
      this.updateObservers();
    });

  }

  private loadDefaultData() : void {
	this.manager.initFromBundle([{
		"listTitle":"List A",
		"listId":1, 
		"items":[{
			"itemTitle":"item a-1",
			"itemId":1,
			"priority":"High",
			"completed":false,
			"inListId":1
		},
		{
			"itemTitle":"item a-2",
			"itemId":2,
			"priority":"High",
			"completed":false,
			"inListId":1
		}]
	},{"listTitle":"List B",
		"listId":2, 
		"items":[{
			"itemTitle":"item b-1",
			"itemId":3,
			"priority":"High",
			"completed":false,
			"inListId":2
		},
		{
			"itemTitle":"item b-2",
			"itemId":4,
			"priority":"High",
			"completed":false,
			"inListId":2
		}]

	}]);
  }


  // public getHeroes(): Hero[] {
  //   return this.heroManager.getHeroes();
  // }




  // public getHeroById(id: number): Hero {
  //   return this.heroManager.getHeroById(id);
  // }

  public saveData(): void {
    this.bundle = this.manager.getListsArray();
    this.storage.set(this.DATA_KEY, this.bundle);

    this.updateObservers();
    console.log("Saved bundle(lists): " + this.bundle);
  }


   public cleanData(): void {
    this.storage.clear();
    console.log("data cleaned. empty data:", this.storage.get(this.DATA_KEY));
  }

  public getObservable(): Observable<Object> {
    if (this.theObservable === undefined) {
      this.theObservable = Observable.create(observer =>
        this.theObserver = observer);
    }
    return this.theObservable;
    
  }

  private updateObservers() {
    if (this.theObserver) {
      this.theObserver.next(true);
    }
  }
}
