import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPlaylistComponent } from './view-my-playlist.component';

describe('ViewMyPlaylistComponent', () => {
  let component: ViewMyPlaylistComponent;
  let fixture: ComponentFixture<ViewMyPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
