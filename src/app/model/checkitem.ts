export class CheckItem {

editing:boolean=false;
    public constructor(
                        public itemTitle: string, 
                        public itemId: number, 
                        public priority: string,
                        public completed: boolean,
                        public inListId: number) {

    }

    public setTitle(newTitle: string): void {
        this.itemTitle = newTitle;
    }

    public setPriority(newPriority: string): void {
        this.priority = newPriority;
    }

    public setCompleted(): void {
        this.completed = true;
    }

    public setIncomplete(): void {
    this.completed = false;
    }

    // public toString() : string {
    //     return this.itemId + ": " + this.itemTitle + ", priority:" + this.priority+ ", completed: " + this.completed;
    // }
}