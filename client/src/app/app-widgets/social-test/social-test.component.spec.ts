import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {SocialTestComponent} from "./social-test.component";

describe('SocialTestComponent', () => {
  let component: SocialTestComponent;
  let fixture: ComponentFixture<SocialTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
