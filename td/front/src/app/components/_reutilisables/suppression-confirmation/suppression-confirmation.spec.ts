import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuppressionConfirmation } from './suppression-confirmation';

describe('SuppressionConfirmation', () => {
  let component: SuppressionConfirmation;
  let fixture: ComponentFixture<SuppressionConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppressionConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(SuppressionConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
