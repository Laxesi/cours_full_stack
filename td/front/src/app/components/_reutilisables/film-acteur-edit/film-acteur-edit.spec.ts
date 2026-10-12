import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmActeurEdit } from './film-acteur-edit';

describe('FilmActeurEdit', () => {
  let component: FilmActeurEdit;
  let fixture: ComponentFixture<FilmActeurEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmActeurEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmActeurEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
