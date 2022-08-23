import ActionUtility from "../../utilities/ActionUtility";
import { v4 as uuid } from "uuid";

export default class ToastsAction {
  static ADD_TOAST = "ToastsAction.ADD_TOAST";
  static REMOVE_TOAST = "ToastsAction.REMOVE_TOAST";

  static add(message, type, dispatch = () => {}) {
    const id = uuid();
    dispatch(
      ActionUtility.createAction(ToastsAction.ADD_TOAST, {
        message,
        type,
        id: id
      })
    );

    setTimeout(() => {
      dispatch(ToastsAction.removeById(id));
    }, 1500);
  }

  static removeById(toastId) {
    return ActionUtility.createAction(ToastsAction.REMOVE_TOAST, toastId);
  }
}
