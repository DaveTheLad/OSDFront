import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MangasService } from '../mangas.service';

@Component({
  selector: 'app-edit-manga',
  templateUrl: './edit-manga.component.html',
  styleUrls: ['./edit-manga.component.css']
})
export class EditMangaComponent implements OnInit {

  addManga: any;
  id: any;
  updateSuccess: boolean = false; // Define updateSuccess variable
  noChanges: boolean = false; // Define noChanges variable

  constructor(private fb: FormBuilder,
              private routes: Router,
              private mangaservice: MangasService,
              private url: ActivatedRoute) {
    this.addManga = fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year_written: ['', Validators.required],
      NumberOfVolumes: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    console.log(this.id)
    this.mangaservice.singleManga(this.id).subscribe(data => {
      this.addManga.patchValue(data);
    });
  }

  onSubmit() {
    console.log(this.addManga.value);
    const formData = this.addManga.value;
    this.mangaservice.singleManga(this.id).subscribe((data: any) => {
      // Check if any field is different
      const isDifferent = Object.keys(formData).some(key => formData[key] !== data[key]);
      if (!isDifferent) {
        this.noChanges = true;
        setTimeout(() => {
          this.noChanges = false; // Reset noChanges after 3 seconds
        }, 3000); // Timer for 3 seconds
      } else {
        this.mangaservice.updateManga(this.id, formData).subscribe((data: any) => {
          console.log(data);
          this.updateSuccess = true; // Set updateSuccess to true
          setTimeout(() => {
            this.routes.navigate(['/list-manga']);
          }, 2000); // Redirect after 2 seconds
        });
      }
    });
  }
}
