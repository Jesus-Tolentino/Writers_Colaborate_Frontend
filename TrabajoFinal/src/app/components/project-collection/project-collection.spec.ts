import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCollection } from './project-collection';

describe('ProjectCollection', () => {
  let component: ProjectCollection;
  let fixture: ComponentFixture<ProjectCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCollection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
