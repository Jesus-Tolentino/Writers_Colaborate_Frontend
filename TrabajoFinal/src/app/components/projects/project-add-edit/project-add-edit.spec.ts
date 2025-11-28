import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddEdit } from './project-add-edit';

describe('ProjectAddEdit', () => {
  let component: ProjectAddEdit;
  let fixture: ComponentFixture<ProjectAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
