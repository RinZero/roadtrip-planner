import { userReducer } from "./user/reducers";
import { uiReducer } from "./ui/reducers";
import { History } from "history";

export default () => ({
  user: userReducer,
  ui: uiReducer,
});
