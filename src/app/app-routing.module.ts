import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard] // rare exception, normally providers are in the app.module.ts, but since
                           // it is only used here, the exception is made
})
export class AppRoutingModule {}
