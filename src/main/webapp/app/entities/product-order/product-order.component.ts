import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductOrder } from './product-order.model';
import { ProductOrderService } from './product-order.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-order',
    templateUrl: './product-order.component.html'
})
export class ProductOrderComponent implements OnInit, OnDestroy {
productOrders: ProductOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productOrderService: ProductOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productOrderService.query().subscribe(
            (res: HttpResponse<ProductOrder[]>) => {
                this.productOrders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductOrder) {
        return item.id;
    }
    registerChangeInProductOrders() {
        this.eventSubscriber = this.eventManager.subscribe('productOrderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
