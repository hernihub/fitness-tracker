import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';
import * as Training from '../training/training.actions';
import * as fromTraining from '../training/training.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
  // an observable with an Exercise payload to pass to whoever is listening and make them know which
  // exercise was selected
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  // Whenever finishedExercises changes, this event is emitted
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  /**
   *
   * @param db
   * @param uiService
   */
  constructor(private db: AngularFirestore,
              private uiService: UIService,
              private store: Store<fromRoot.State>) { }

  fetchAvailableExercises() {
    // return this.availableExercises.slice(); // new array copy of the original - a way of inmutability
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges().pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          } as Exercise;
        });
      })).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.UpdateTrainings(exercises));
        // this.availableExercises = exercises;
        // Emit an event whenever new exercises come in, new copy of exercises for mutability reasons
        // this.exercisesChanged.next([...this.availableExercises]);
        // this.uiService.loadingStateChanged.next(false);
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar('Could not fetch exercises, please try again later', null, 3500);
        // this.uiService.loadingStateChanged.next(false);
        this.exercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));

    // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    // this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    // ID is no needed, is a read-only collection, so valueChanges() is a good fit
    // this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db.collection('finishedExercises')
               .valueChanges()
               .subscribe((exercises: Exercise[]) => {
        // this.finishedExercisesChanged.next(exercises);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new Training.UpdateFTrainings(exercises));
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
