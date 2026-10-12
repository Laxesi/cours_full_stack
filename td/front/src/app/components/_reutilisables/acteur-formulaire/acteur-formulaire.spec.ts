import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActeurFormulaire } from './acteur-formulaire';

describe('ActeurFormulaire', () => {
  let component: ActeurFormulaire;
  let fixture: ComponentFixture<ActeurFormulaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActeurFormulaire],
    }).compileComponents();

    fixture = TestBed.createComponent(ActeurFormulaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
