import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmetFormComponent } from './investmet-form.component';

describe('InvestmetFormComponent', () => {
  let component: InvestmetFormComponent;
  let fixture: ComponentFixture<InvestmetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
