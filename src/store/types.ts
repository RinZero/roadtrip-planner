import { UserState } from "./user/types";
import { UiState } from "./ui/types";

export type ReduxState = {
  user: UserState;
  ui: UiState;
};
