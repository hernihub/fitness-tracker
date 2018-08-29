import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
         MatNativeDateModule, MatCheckboxModule, MatCardModule, MatSidenavModule, MatToolbarModule,
         MatListModule, MatTabsModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule,
         MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// Module used to manage all the material package imports and exports
// The entire app can access the imports this file is declaring, which is the purpose of having a exports
// array
@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
              MatNativeDateModule, MatCheckboxModule, ReactiveFormsModule, MatCardModule, MatSidenavModule,
              MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule,
              MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule,
              MatPaginatorModule, AngularFirestoreModule, AngularFireAuthModule, MatSnackBarModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
              MatNativeDateModule, MatCheckboxModule, ReactiveFormsModule, MatCardModule, MatSidenavModule,
              MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule,
              MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule,
              MatPaginatorModule, AngularFireModule, AngularFirestoreModule, AngularFireAuthModule,
              MatSnackBarModule]
})
export class MaterialModule {}
