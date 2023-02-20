export interface Item {
    id: string;
    name: string;
    reasonForRemoval: string;
    photoUrl?: string;
    age: number;
    comments: string;
    dateRemoved?: Date;
    removalMethod: RemovalMethod;
  }
  
 export enum RemovalMethod {
    Donated = "donated",
    Recycled = "recycled",
    Sold = "sold",
    Trashed = "trashed",
  }
  