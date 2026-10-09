import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActeurMakeList } from './acteur-make-list';

describe('ActeurMakeList', () => {
  let component: ActeurMakeList;
  let fixture: ComponentFixture<ActeurMakeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActeurMakeList],
    }).compileComponents();

    fixture = TestBed.createComponent(ActeurMakeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
