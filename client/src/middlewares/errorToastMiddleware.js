import ToastStatusEnum from "../constants/ToastStatusEnum";
import ToastsAction from "../stores/toasts/ToastsAction";

const errorToastMiddleware = () => store => next => action => {
  if (action.error && action?.payload?.message) {
    const errorAction = action;
    ToastsAction.add(errorAction.payload.message, ToastStatusEnum.Error, next);
    // next(ToastsAction.add(errorAction.payload.message, ToastStatusEnum.Error));
  }

  next(action);
};

export default errorToastMiddleware;
