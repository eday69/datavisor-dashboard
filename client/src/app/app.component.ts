import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { catchError, retry, Subscription, throwError } from 'rxjs';
import { ButtonModule } from 'primeng/button';

import { WebSocketService } from '../services/web-sockect.service';
import { DataTableWrapperComponent } from '../components/data-table-wrapper';
import { DashboardData } from '../models/data-table';

@Component({
  standalone: true,
  imports: [FormsModule, ButtonModule, DataTableWrapperComponent, AsyncPipe],
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  public socket: Subscription|undefined = undefined;
  public data: DashboardData[] = [];
  public shouldReceive = false;

  constructor(
    private ws: WebSocketService,
  ) {}

  ngOnDestroy() {
    this.socketUnsubscribe();
  }

  public startReceiving(): void {
    this.shouldReceive = true;
    this.socket = this.ws.webSocket$
      .pipe(
        catchError((error) => {
          this.socketUnsubscribe();
          return throwError(() => new Error(error));
        }),
        retry({ delay: 5_000 })
      )
      .subscribe({
        next: (data: DashboardData) => {
          this.data = [...this.data, data];
        }
      });
  }

  public reset(): void {
    this.shouldReceive = false;
    this.data = [];
    this.socketUnsubscribe();
  }

  public stopReceiving(): void {
    this.shouldReceive = false;
    this.socketUnsubscribe();
  }

  private socketUnsubscribe() {
    this.socket?.unsubscribe();
  }
}
