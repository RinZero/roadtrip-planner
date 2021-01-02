import produce, { Draft } from "immer";
import { getType } from "typesafe-actions";
import { UiState } from "./types";

import { setProgressStep, UiActionsType } from "./actions";

export const initialState: UiState = {
  progressStep: "1",
  roadtripStops: 2,
  isEditOpen: false,
  isAddPlace: false,
  isLoginActive: false,
};

export const uiReducer = produce(
  (draft: Draft<UiState> = initialState, action: UiActionsType) => {
    switch (action.type) {
      case getType(setProgressStep): {
        const { progressStep } = action.payload;
        draft.progressStep = progressStep;
        return draft;
      }
      default:
        return draft;
    }
  }
);
