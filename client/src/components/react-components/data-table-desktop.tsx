import * as React from 'react';
import { DashboardData } from '../../models/data-table';
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowSpacingParams,
  GridToolbar,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { displayDate } from '../../helpers/date-helper';
import { Box } from '@mui/material';

export default function DataTableDesktopComponent({ dataRows }: { dataRows: DashboardData[] }) {
  const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const columns: GridColDef<DashboardData>[] = [
    {
      field: 'id',
      flex: 1.5,
      headerName: 'id',
    },
    {
      field: 'isbn',
      flex: 1,
      headerName: 'ISBN',
    },
    {
      field: 'author',
      flex: 1,
      headerName: 'Author',
    },
    {
      field: 'price',
      flex: 1,
      headerName: 'Price',
      valueGetter: (value, row) => `$${row.price}`
    },
    {
      field: 'timestamp',
      flex: 1.5,
      headerName: 'Timestamp',
      valueGetter: (value, row) => displayDate(row.timestamp)
    },
  ];

  return (
    <DataGrid
      rows={dataRows}
      columns={columns}
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
        filter: {
          filterModel: {
            items: [],
            quickFilterValues: [''],
          },
        },
      }}
      pageSizeOptions={[5]}
      getRowSpacing={getRowSpacing}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
        },
      }}
      sx={{
        [`& .${gridClasses.row}`]: {
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? grey[200] : grey[800],
        },
      }}
    />
  );
};
