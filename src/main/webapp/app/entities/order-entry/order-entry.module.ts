import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShaurmaStoreSharedModule } from '../../shared';
import {
    OrderEntryService,
    OrderEntryPopupService,
    OrderEntryComponent,
    OrderEntryDetailComponent,
    OrderEntryDialogComponent,
    OrderEntryPopupComponent,
    OrderEntryDeletePopupComponent,
    OrderEntryDeleteDialogComponent,
    orderEntryRoute,
    orderEntryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderEntryRoute,
    ...orderEntryPopupRoute,
];

@NgModule({
    imports: [
        ShaurmaStoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderEntryComponent,
        OrderEntryDetailComponent,
        OrderEntryDialogComponent,
        OrderEntryDeleteDialogComponent,
        OrderEntryPopupComponent,
        OrderEntryDeletePopupComponent,
    ],
    entryComponents: [
        OrderEntryComponent,
        OrderEntryDialogComponent,
        OrderEntryPopupComponent,
        OrderEntryDeleteDialogComponent,
        OrderEntryDeletePopupComponent,
    ],
    providers: [
        OrderEntryService,
        OrderEntryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShaurmaStoreOrderEntryModule {}
