import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliverPage } from './deliver.page';

describe('DeliverPage', () => {
  let component: DeliverPage;
  let fixture: ComponentFixture<DeliverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
