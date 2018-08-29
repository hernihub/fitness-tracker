import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const UPDATE_TRAININGS =  '[Training] update available trainings';
export const UPDATE_F_TRAININGS =  '[Training] update finished trainings';
export const START_ACTIVE_TRAINING =  '[Training] start training';
export const STOP_ACTIVE_TRAINING =  '[Training] stop training';

export class UpdateTrainings implements Action {
  readonly type = UPDATE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class UpdateFTrainings implements Action {
  readonly type = UPDATE_F_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_ACTIVE_TRAINING;
  constructor(public payload: string) {}
}

// Do not need a payload: the active training is stored on NgRx store
export class StopTraining implements Action {
  readonly type = STOP_ACTIVE_TRAINING;
}

export type TrainingActions = UpdateTrainings | UpdateFTrainings | StartTraining | StopTraining;
