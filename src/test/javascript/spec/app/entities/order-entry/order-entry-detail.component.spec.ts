/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShaurmaStoreTestModule } from '../../../test.module';
import { OrderEntryDetailComponent } from '../../../../../../main/webapp/app/entities/order-entry/order-entry-detail.component';
import { OrderEntryService } from '../../../../../../main/webapp/app/entities/order-entry/order-entry.service';
import { OrderEntry } from '../../../../../../main/webapp/app/entities/order-entry/order-entry.model';

describe('Component Tests', () => {

    describe('OrderEntry Management Detail Component', () => {
        let comp: OrderEntryDetailComponent;
        let fixture: ComponentFixture<OrderEntryDetailComponent>;
        let service: OrderEntryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShaurmaStoreTestModule],
                declarations: [OrderEntryDetailComponent],
                providers: [
                    OrderEntryService
                ]
            })
            .overrideTemplate(OrderEntryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderEntry(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderEntry).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
