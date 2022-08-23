import { BaseModel } from "sjs-base-model";

export default class LogoutModel extends BaseModel {
  constructor(data) {
    super();

    this.update(data);
  }
}
