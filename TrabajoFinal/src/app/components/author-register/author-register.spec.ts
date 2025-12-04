import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorRegister } from './author-register';

describe('AuthorRegister', () => {
  let component: AuthorRegister;
  let fixture: ComponentFixture<AuthorRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
