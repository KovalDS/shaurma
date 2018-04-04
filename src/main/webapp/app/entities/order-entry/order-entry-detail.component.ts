import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderEntry } from './order-entry.model';
import { OrderEntryService } from './order-entry.service';

@Component({
    selector: 'jhi-order-entry-detail',
    templateUrl: './order-entry-detail.component.html'
})
export class OrderEntryDetailComponent implements OnInit, OnDestroy {

    orderEntry: OrderEntry;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderEntryService: OrderEntryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderEntries();
    }

    load(id) {
        this.orderEntryService.find(id)
            .subscribe((orderEntryResponse: HttpResponse<OrderEntry>) => {
                this.orderEntry = orderEntryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderEntries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderEntryListModification',
            (response) => this.load(this.orderEntry.id)
        );
    }
}
