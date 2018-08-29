import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[]; // Exercise model have an ID, which is not returned by valueChanges
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  /**
   *
   * @param trainingService
   * @param uiService
   * @param store
   */
  constructor(private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) {}


  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // Suscribe to the subject event of new exercises
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => this.exercises = exercises);
    // Always call for possible new exercises when navigating to new training
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
