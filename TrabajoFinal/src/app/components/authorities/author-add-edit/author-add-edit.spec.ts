import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAddEdit } from './author-add-edit';

describe('AuthorAddEdit', () => {
  let component: AuthorAddEdit;
  let fixture: ComponentFixture<AuthorAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
