import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import * as React from 'react';
import DataTableComponent from './react-components/data-table/data-table';
import { createRoot, Root } from 'react-dom/client';
import { DashboardData } from '../models/data-table';

const containerElementName = 'myReactComponentContainer';

@Component({
  selector: 'data-table-wrapper',
  template: `<span id="${containerElementName}"></span>`,
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class DataTableWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() dataRows: DashboardData[] = [];
  private root: Root|undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataRows']) {
      this.render();
    }
  }

  ngAfterViewInit() {
    const container = document.getElementById(containerElementName);
    this.root = createRoot(container!);
    this.render();
  }

  ngOnDestroy() {
    this.root?.unmount();
  }

  private render() {
    this.root?.render(
      <div className={'i-am-classy'}>
        Rendering react component (wrapper)
        <DataTableComponent rows={this.dataRows}/>
      </div>);
  }
}
