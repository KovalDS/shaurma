import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductOrderComponent } from './product-order.component';
import { ProductOrderDetailComponent } from './product-order-detail.component';
import { ProductOrderPopupComponent } from './product-order-dialog.component';
import { ProductOrderDeletePopupComponent } from './product-order-delete-dialog.component';

export const productOrderRoute: Routes = [
    {
        path: 'product-order',
        component: ProductOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-order/:id',
        component: ProductOrderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productOrderPopupRoute: Routes = [
    {
        path: 'product-order-new',
        component: ProductOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-order/:id/edit',
        component: ProductOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-order/:id/delete',
        component: ProductOrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
