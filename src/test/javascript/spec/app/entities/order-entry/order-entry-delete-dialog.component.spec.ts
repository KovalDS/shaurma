/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShaurmaStoreTestModule } from '../../../test.module';
import { OrderEntryDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/order-entry/order-entry-delete-dialog.component';
import { OrderEntryService } from '../../../../../../main/webapp/app/entities/order-entry/order-entry.service';

describe('Component Tests', () => {

    describe('OrderEntry Management Delete Component', () => {
        let comp: OrderEntryDeleteDialogComponent;
        let fixture: ComponentFixture<OrderEntryDeleteDialogComponent>;
        let service: OrderEntryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShaurmaStoreTestModule],
                declarations: [OrderEntryDeleteDialogComponent],
                providers: [
                    OrderEntryService
                ]
            })
            .overrideTemplate(OrderEntryDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
