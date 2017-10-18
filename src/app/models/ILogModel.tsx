import {IRegularExpression} from "./RegularExpression";
export interface ILogModel {
  id : string
  name : string
  path : string
  regularExpressions : Array<IRegularExpression>
  typeRolling: string
  typeSpecial : string
  startLine : string
  endLine : string
}
