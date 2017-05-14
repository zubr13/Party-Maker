import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiArticleComponent } from './wiki-article.component';

describe('WikiArticleComponent', () => {
  let component: WikiArticleComponent;
  let fixture: ComponentFixture<WikiArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
