import { ActionType, createAction } from "typesafe-actions";

export const setProgressStep = createAction("ui/SET_PROGRESS_STEP")<{
  progressStep: "1" | "2" | "3";
}>();

export const UiActions = {
  setProgressStep,
};

export type UiActionsType = ActionType<typeof UiActions>;
