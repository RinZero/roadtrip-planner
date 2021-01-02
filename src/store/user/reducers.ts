import produce, { Draft } from "immer";
import { getType } from "typesafe-actions";
import { UserState } from "./types";

import { logIn, UserActionsType } from "./actions";

export const initialState: UserState = {
  userName: "Guest",
  email: "",
  isAdmin: false,
  roadtrips: [],
};

export const userReducer = produce(
  (draft: Draft<UserState> = initialState, action: UserActionsType) => {
    switch (action.type) {
      case getType(logIn): {
        const { userName } = action.payload;
        draft.userName = userName;
        return draft;
      }
      default:
        return draft;
    }
  }
);
