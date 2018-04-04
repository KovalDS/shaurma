import { BaseEntity } from './../../shared';

export class OrderEntry implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public price?: number,
        public productOrder?: BaseEntity,
        public products?: BaseEntity[],
    ) {
    }
}
