import { userReducer } from "./user/reducers";
import { History } from "history";

export default (history: History) => ({
  user: userReducer,
});
