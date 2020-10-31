import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SizePage } from './size.page';

describe('SizePage', () => {
  let component: SizePage;
  let fixture: ComponentFixture<SizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
