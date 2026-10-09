import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmMakeList } from './film-make-list';

describe('FilmMakeList', () => {
  let component: FilmMakeList;
  let fixture: ComponentFixture<FilmMakeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmMakeList],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmMakeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
