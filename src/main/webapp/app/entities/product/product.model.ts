import { BaseEntity } from './../../shared';

export const enum ProductType {
    'MEAT',
    'VEGETABLE',
    'SAUCE',
    'SUPPLEMENT'
}

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public isMandatory?: boolean,
        public imageContentType?: string,
        public image?: any,
        public price?: number,
        public type?: ProductType,
        public orderEntry?: BaseEntity,
    ) {
        this.isMandatory = false;
    }
}
