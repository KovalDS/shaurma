/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShaurmaStoreTestModule } from '../../../test.module';
import { OrderEntryComponent } from '../../../../../../main/webapp/app/entities/order-entry/order-entry.component';
import { OrderEntryService } from '../../../../../../main/webapp/app/entities/order-entry/order-entry.service';
import { OrderEntry } from '../../../../../../main/webapp/app/entities/order-entry/order-entry.model';

describe('Component Tests', () => {

    describe('OrderEntry Management Component', () => {
        let comp: OrderEntryComponent;
        let fixture: ComponentFixture<OrderEntryComponent>;
        let service: OrderEntryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShaurmaStoreTestModule],
                declarations: [OrderEntryComponent],
                providers: [
                    OrderEntryService
                ]
            })
            .overrideTemplate(OrderEntryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderEntry(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderEntries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
