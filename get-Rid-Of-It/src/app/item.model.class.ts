// Not being used - stays for future reference
// Was used as an alternative to add a new item (model) in item-formComponent.
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
  