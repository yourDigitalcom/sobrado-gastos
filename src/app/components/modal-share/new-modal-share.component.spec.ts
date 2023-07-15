import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ComponentRef, SimpleChanges, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBodyShareComponent } from './new-body-share.component';
import { NewModalShareComponent } from './new-modal-share.component';

describe('NewModalShareComponent', () => {
  let component: NewModalShareComponent;
  let fixture: ComponentFixture<NewModalShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewModalShareComponent,
        NewBodyShareComponent
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModalShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NewModalShareComponent', () => {
    expect(component).toBeTruthy();
  });
  
  it('should be toClose', () => {
    component.toClose();
  });
  
  it('should be open modal', () => {
    component.open = true;
    expect(component.open).toBeTruthy();
  });

  it('should be toClose', () => {
    const openMock: SimpleChange = new SimpleChange(true, true, true)
    const mockChanges: SimpleChanges = { open: openMock };
    component.ngOnChanges(mockChanges);
  });

});
