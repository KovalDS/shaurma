import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderEntryComponent } from './order-entry.component';
import { OrderEntryDetailComponent } from './order-entry-detail.component';
import { OrderEntryPopupComponent } from './order-entry-dialog.component';
import { OrderEntryDeletePopupComponent } from './order-entry-delete-dialog.component';

export const orderEntryRoute: Routes = [
    {
        path: 'order-entry',
        component: OrderEntryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.orderEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-entry/:id',
        component: OrderEntryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.orderEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderEntryPopupRoute: Routes = [
    {
        path: 'order-entry-new',
        component: OrderEntryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.orderEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-entry/:id/edit',
        component: OrderEntryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.orderEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-entry/:id/delete',
        component: OrderEntryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shaurmaStoreApp.orderEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
