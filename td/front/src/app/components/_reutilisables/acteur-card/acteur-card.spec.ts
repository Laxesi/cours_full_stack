import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActeurCard } from './acteur-card';

describe('ActeurCard', () => {
  let component: ActeurCard;
  let fixture: ComponentFixture<ActeurCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActeurCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ActeurCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
