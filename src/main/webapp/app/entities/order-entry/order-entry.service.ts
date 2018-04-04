import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderEntry } from './order-entry.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderEntry>;

@Injectable()
export class OrderEntryService {

    private resourceUrl =  SERVER_API_URL + 'api/order-entries';

    constructor(private http: HttpClient) { }

    create(orderEntry: OrderEntry): Observable<EntityResponseType> {
        const copy = this.convert(orderEntry);
        return this.http.post<OrderEntry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderEntry: OrderEntry): Observable<EntityResponseType> {
        const copy = this.convert(orderEntry);
        return this.http.put<OrderEntry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderEntry>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderEntry[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderEntry[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderEntry = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderEntry[]>): HttpResponse<OrderEntry[]> {
        const jsonResponse: OrderEntry[] = res.body;
        const body: OrderEntry[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderEntry.
     */
    private convertItemFromServer(orderEntry: OrderEntry): OrderEntry {
        const copy: OrderEntry = Object.assign({}, orderEntry);
        return copy;
    }

    /**
     * Convert a OrderEntry to a JSON which can be sent to the server.
     */
    private convert(orderEntry: OrderEntry): OrderEntry {
        const copy: OrderEntry = Object.assign({}, orderEntry);
        return copy;
    }
}
