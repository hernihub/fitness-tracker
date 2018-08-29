import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { TrainingActions, UPDATE_TRAININGS, UPDATE_F_TRAININGS, START_ACTIVE_TRAINING, STOP_ACTIVE_TRAINING } from './training.actions';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

// TrainingState knows about application state, but not the other way around
// Whenever the training module is loaded lazily, Angular merges the state of the training module
// behind the scenes. NgRx merges this state.
export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case UPDATE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case UPDATE_F_TRAININGS:
      return {
        ...state, // pull out the old properties and set what is needed
        finishedExercises: action.payload
      };
    case START_ACTIVE_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };
    case STOP_ACTIVE_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const availableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const finishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const activeTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
