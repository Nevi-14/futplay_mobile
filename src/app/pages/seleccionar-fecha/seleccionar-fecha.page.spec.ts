import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionarFechaPage } from './seleccionar-fecha.page';

describe('SeleccionarFechaPage', () => {
  let component: SeleccionarFechaPage;
  let fixture: ComponentFixture<SeleccionarFechaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarFechaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionarFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
