import * as React from 'react';
import { DashboardDataMobile } from '../../models/data-table';
import { Typography, } from '@mui/material';
import { DataGrid, gridClasses, GridColDef, GridRowSpacingParams, GridToolbar } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { displayDate } from '../../helpers/date-helper';

export default function DataTableMobileComponent( { dataRows }: { dataRows: DashboardDataMobile[] }) {
  const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const columnsMobile: GridColDef<DashboardDataMobile>[] = [
    {
      field: 'info',
      headerName: 'Data',
      flex: 1,
      renderCell: (params) => (
        <div style={{ padding: 4 }}>
          <Typography>ID: {params.row.info.id}</Typography>
          <Typography>ISBN: {params.row.info.isbn}</Typography>
          <Typography>Author: {params.row.info.author}</Typography>
          <Typography>Price: ${`${params.row.info.price}`}</Typography>
          <Typography>Timestamp: {displayDate(params.row.info.timestamp)}</Typography>
        </div>
      )
    }
  ];

  return (
    <DataGrid
      rows={dataRows}
      columns={columnsMobile}
      getRowId={(row) => row.info.id}
      getRowHeight={() => 'auto'}
      disableRowSelectionOnClick
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 3,
          },
        },
        filter: {
          filterModel: {
            items: [],
            quickFilterValues: [''],
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
        },
      }}
      pageSizeOptions={[3]}
      getRowSpacing={getRowSpacing}
      sx={{
        [`& .${gridClasses.row}`]: {
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? grey[200] : grey[800],
        },
      }}
    />
  );
};
