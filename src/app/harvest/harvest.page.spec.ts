import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HarvestPage } from './harvest.page';

describe('HarvestPage', () => {
  let component: HarvestPage;
  let fixture: ComponentFixture<HarvestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarvestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HarvestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
