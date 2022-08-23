import { createBrowserHistory } from "history";
import environment from "environment";

export const history = createBrowserHistory({
  basename: environment.route.baseRoute
});
