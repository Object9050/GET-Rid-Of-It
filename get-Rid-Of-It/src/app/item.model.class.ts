// Bot being used - can be deleted (with testing)
export class ItemClass {
    
  constructor(
    public id: string,
    public name: string,
    public reasonForRemoval: string,
    public age: number,
    public comments: string,
    public removalMethod: string,
    public photoUrl?: string,
    public dateRemoved?: Date,
    ) { }
    
  }
  
//  export enum RemovalMethod {
//     Donated = "donated",
//     Recycled = "recycled",
//     Sold = "sold",
//     Trashed = "trashed",
//   }
  