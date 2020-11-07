import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteSongComponent } from './update-delete-song.component';

describe('UpdateDeleteSongComponent', () => {
  let component: UpdateDeleteSongComponent;
  let fixture: ComponentFixture<UpdateDeleteSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeleteSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeleteSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
