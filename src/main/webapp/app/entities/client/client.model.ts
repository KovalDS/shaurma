import { BaseEntity, User } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public phone?: string,
        public numberOfPoints?: number,
        public user?: User,
        public orders?: BaseEntity[],
    ) {
    }
}
