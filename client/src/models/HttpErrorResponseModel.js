import { v4 as uuid } from "uuid";

export default class HttpErrorResponseModel {
  id = uuid();
  status = 0;
  message = "";
  errors = [];
  url = "";
  raw = null;
}
