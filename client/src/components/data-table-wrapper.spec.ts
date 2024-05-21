import { TestBed } from '@angular/core/testing';
import { DataTableWrapperComponent } from './data-table-wrapper';

describe('DataTableWrapperComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableWrapperComponent],
    }).compileComponents();
  });

  it('should create the data-table-wrapper', () => {
    const fixture = TestBed.createComponent(DataTableWrapperComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
