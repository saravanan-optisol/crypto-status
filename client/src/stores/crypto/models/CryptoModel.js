import { BaseModel } from "sjs-base-model";

export default class CryptoModel extends BaseModel {
  data = null; 
  constructor(data) {
    super();
    this.update(data);
  }

  update(data) {
    super.update(data);
    this.data = data;
  }
}
