import * as React from 'react';
import {
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DataTableMobileComponent from '../data-table-mobile';
import DataTableDesktopComponent from '../data-table-desktop';
import { DashboardDataMobile, DashboardDataProps, DashboardData } from '../../../models/data-table';

export default function DataTableComponent(props: DashboardDataProps) {
  const { rows: dataRows } = props;
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        height: isSmScreen ? 570 : 460,
        width: '100%',
        display: 'table',
        tableLayout: 'fixed'
      }}
    >
      {isSmScreen
        ? <DataTableMobileComponent dataRows={dataRows?.map((row: DashboardData) => (
          {
            info: { ...row }
          })
        ) as DashboardDataMobile[]} />
        :  <DataTableDesktopComponent dataRows={dataRows!} />}
    </Box>
  );
};
