import {Transaction} from "./transaction";
export interface Account {
  balance:Number;
  transactions:Transaction[];
}
