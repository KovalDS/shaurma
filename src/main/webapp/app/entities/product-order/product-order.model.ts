import { BaseEntity } from './../../shared';

export const enum Status {
    'COMPLETED',
    'IN_PROGRESS',
    'CANCELLED'
}

export class ProductOrder implements BaseEntity {
    constructor(
        public id?: number,
        public totalPrice?: number,
        public date?: any,
        public status?: Status,
        public client?: BaseEntity,
        public orderEntries?: BaseEntity[],
    ) {
    }
}
