import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShaurmaStoreClientModule } from './client/client.module';
import { ShaurmaStoreProductOrderModule } from './product-order/product-order.module';
import { ShaurmaStoreOrderEntryModule } from './order-entry/order-entry.module';
import { ShaurmaStoreProductModule } from './product/product.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ShaurmaStoreClientModule,
        ShaurmaStoreProductOrderModule,
        ShaurmaStoreOrderEntryModule,
        ShaurmaStoreProductModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShaurmaStoreEntityModule {}
