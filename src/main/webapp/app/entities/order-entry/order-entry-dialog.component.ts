import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderEntry } from './order-entry.model';
import { OrderEntryPopupService } from './order-entry-popup.service';
import { OrderEntryService } from './order-entry.service';
import { ProductOrder, ProductOrderService } from '../product-order';

@Component({
    selector: 'jhi-order-entry-dialog',
    templateUrl: './order-entry-dialog.component.html'
})
export class OrderEntryDialogComponent implements OnInit {

    orderEntry: OrderEntry;
    isSaving: boolean;

    productorders: ProductOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderEntryService: OrderEntryService,
        private productOrderService: ProductOrderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productOrderService.query()
            .subscribe((res: HttpResponse<ProductOrder[]>) => { this.productorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderEntry.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderEntryService.update(this.orderEntry));
        } else {
            this.subscribeToSaveResponse(
                this.orderEntryService.create(this.orderEntry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderEntry>>) {
        result.subscribe((res: HttpResponse<OrderEntry>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderEntry) {
        this.eventManager.broadcast({ name: 'orderEntryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductOrderById(index: number, item: ProductOrder) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-entry-popup',
    template: ''
})
export class OrderEntryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderEntryPopupService: OrderEntryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderEntryPopupService
                    .open(OrderEntryDialogComponent as Component, params['id']);
            } else {
                this.orderEntryPopupService
                    .open(OrderEntryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
