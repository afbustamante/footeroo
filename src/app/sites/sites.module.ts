import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog'; 

import { SiteRegistryComponent } from './site-registry/site-registry.component';

@NgModule({
  declarations: [SiteRegistryComponent],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class SitesModule { }
