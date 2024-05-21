import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { DashboardData } from '../models/data-table';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly URL = 'ws://localhost:3000';
  private webSocketSubject = webSocket<DashboardData>(this.URL);
  public webSocket$ = this.webSocketSubject.asObservable();
}
