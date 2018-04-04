import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderEntry } from './order-entry.model';
import { OrderEntryService } from './order-entry.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-order-entry',
    templateUrl: './order-entry.component.html'
})
export class OrderEntryComponent implements OnInit, OnDestroy {
orderEntries: OrderEntry[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderEntryService: OrderEntryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.orderEntryService.query().subscribe(
            (res: HttpResponse<OrderEntry[]>) => {
                this.orderEntries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderEntry) {
        return item.id;
    }
    registerChangeInOrderEntries() {
        this.eventSubscriber = this.eventManager.subscribe('orderEntryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
