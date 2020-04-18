import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SitesService } from '../sites.service';
import { Site } from '../site';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-site-registry',
  templateUrl: './site-registry.component.html',
  styleUrls: ['./site-registry.component.css']
})
export class SiteRegistryComponent implements OnInit {

  registryForm = this.fb.group({
    name: [null, Validators.required],
    address: [null, Validators.required],
    phoneNumber: [null]
  });

  constructor(
    private fb: FormBuilder,
    private sitesService: SitesService,
    private dialogRef: MatDialogRef<SiteRegistryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Site
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.data.name = this.registryForm.value.name;
    this.data.address = this.registryForm.value.address;
    this.data.phoneNumber = this.registryForm.value.phoneNumber;

    this.sitesService.createSite(this.data).subscribe(
      response => {
        const location = response.headers.get('Location');

        if (location) {
          const locationParts = location.split('/');
          const id = locationParts[locationParts.length - 1];
          this.data.id = Number.parseInt(id);
        }
      }
    );
  }
}
