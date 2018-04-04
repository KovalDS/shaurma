import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductOrder } from './product-order.model';
import { ProductOrderPopupService } from './product-order-popup.service';
import { ProductOrderService } from './product-order.service';
import { Client, ClientService } from '../client';

@Component({
    selector: 'jhi-product-order-dialog',
    templateUrl: './product-order-dialog.component.html'
})
export class ProductOrderDialogComponent implements OnInit {

    productOrder: ProductOrder;
    isSaving: boolean;

    clients: Client[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productOrderService: ProductOrderService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productOrder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productOrderService.update(this.productOrder));
        } else {
            this.subscribeToSaveResponse(
                this.productOrderService.create(this.productOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductOrder>>) {
        result.subscribe((res: HttpResponse<ProductOrder>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductOrder) {
        this.eventManager.broadcast({ name: 'productOrderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-order-popup',
    template: ''
})
export class ProductOrderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productOrderPopupService: ProductOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productOrderPopupService
                    .open(ProductOrderDialogComponent as Component, params['id']);
            } else {
                this.productOrderPopupService
                    .open(ProductOrderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
