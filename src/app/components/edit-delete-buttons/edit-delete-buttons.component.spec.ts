import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteButtonsInlineComponent } from './edit-delete-buttons.component';

describe('EditDeleteButtonsComponent', () => {
  let component: EditDeleteButtonsInlineComponent;
  let fixture: ComponentFixture<EditDeleteButtonsInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeleteButtonsInlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteButtonsInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
