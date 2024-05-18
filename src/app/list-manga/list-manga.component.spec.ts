import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMangaComponent } from './list-manga.component';
import { MangasService } from '../mangas.service';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListMangaComponent', () => {
  let component: ListMangaComponent;
  let fixture: ComponentFixture<ListMangaComponent>;
  let mangasServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    mangasServiceMock = jasmine.createSpyObj('MangasService', ['listManga', 'deleteManga']);
    authServiceMock = {
      user$: of({ email: 's00212387@atu.ie' })
    };

    await TestBed.configureTestingModule({
      declarations: [ListMangaComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: MangasService, useValue: mangasServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should delete manga and update the list', () => {
    const mangaToDelete = { _id: '1', title: 'Naruto', canDelete: true };
    component.mangas = [mangaToDelete];
    component.filteredMangas = [mangaToDelete];

    mangasServiceMock.deleteManga.and.returnValue(of({ success: true }));

    component.delManga(mangaToDelete);

    expect(mangasServiceMock.deleteManga).toHaveBeenCalledWith(mangaToDelete._id);
    expect(component.mangas).not.toContain(mangaToDelete);
    expect(component.filteredMangas).not.toContain(mangaToDelete);
    expect(component.deleteSuccessMessage).toBe('Manga successfully deleted!');
  });

  it('should not delete manga if user is not authorized', () => {
    const mangaToDelete = { _id: '1', title: 'Naruto', canDelete: false };
    component.mangas = [mangaToDelete];
    component.filteredMangas = [mangaToDelete];

    component.delManga(mangaToDelete);

    expect(mangasServiceMock.deleteManga).not.toHaveBeenCalled();
    expect(component.mangas).toContain(mangaToDelete);
    expect(component.filteredMangas).toContain(mangaToDelete);
    expect(component.deleteSuccessMessage).toBe('');
  });
});
