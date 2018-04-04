import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShaurmaStoreSharedModule } from '../../shared';
import {
    ProductOrderService,
    ProductOrderPopupService,
    ProductOrderComponent,
    ProductOrderDetailComponent,
    ProductOrderDialogComponent,
    ProductOrderPopupComponent,
    ProductOrderDeletePopupComponent,
    ProductOrderDeleteDialogComponent,
    productOrderRoute,
    productOrderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productOrderRoute,
    ...productOrderPopupRoute,
];

@NgModule({
    imports: [
        ShaurmaStoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductOrderComponent,
        ProductOrderDetailComponent,
        ProductOrderDialogComponent,
        ProductOrderDeleteDialogComponent,
        ProductOrderPopupComponent,
        ProductOrderDeletePopupComponent,
    ],
    entryComponents: [
        ProductOrderComponent,
        ProductOrderDialogComponent,
        ProductOrderPopupComponent,
        ProductOrderDeleteDialogComponent,
        ProductOrderDeletePopupComponent,
    ],
    providers: [
        ProductOrderService,
        ProductOrderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShaurmaStoreProductOrderModule {}
