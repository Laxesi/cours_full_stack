import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmFormulaire } from './film-formulaire';

describe('FilmFormulaire', () => {
  let component: FilmFormulaire;
  let fixture: ComponentFixture<FilmFormulaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmFormulaire],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmFormulaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
