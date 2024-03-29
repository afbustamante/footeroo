import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';

import { MatchRegistryComponent } from './match-registry/match-registry.component';
import { MatchSearchComponent } from './match-search/match-search.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchJoinConfirmationComponent } from './match-join-confirmation/match-join-confirmation.component';
import { MatchJoinWithCarComponent } from './match-join-with-car/match-join-with-car.component';
import { MatchJoinWithoutCarComponent } from './match-join-without-car/match-join-without-car.component';
import { MatchViewDialogComponent } from './match-view-dialog/match-view-dialog.component';
import { MatchCarpoolComponent } from './match-carpool/match-carpool.component';
import { MatchAbandonConfirmationComponent } from './match-abandon-confirmation/match-abandon-confirmation.component';
import { MatchCancelConfirmationComponent } from './match-cancel-confirmation/match-cancel-confirmation.component';

@NgModule({
    declarations: [
        MatchRegistryComponent,
        MatchSearchComponent,
        MatchListComponent,
        MatchDetailComponent,
        MatchJoinConfirmationComponent,
        MatchJoinWithCarComponent,
        MatchJoinWithoutCarComponent,
        MatchViewDialogComponent,
        MatchCarpoolComponent,
        MatchAbandonConfirmationComponent,
        MatchCancelConfirmationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatListModule,
        MatNativeDateModule,
        MatGridListModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSnackBarModule,
        MatRadioModule,
        MatExpansionModule,
        MatStepperModule,
        ReactiveFormsModule
    ]
})
export class MatchesModule { }
