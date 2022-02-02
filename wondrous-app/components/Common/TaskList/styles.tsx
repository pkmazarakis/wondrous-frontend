import styled from 'styled-components';
import { TableContainer, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';

export const StyledTableContainer = styled(TableContainer)``

export const StyledTableHead = styled(TableHead)`

    th {
        color: #CCBBFF;
        border: none;
    }

    th:first-child {
        width: 92px;
    }

    th:nth-child(2) {
        width: 57px;
    }

    th:nth-child(3) {
        width: calc(632px - 92px - 57px);
    }
`

export const StyledTableHeadCell = styled(TableCell)`
`

export const StyledTableBody = styled(TableBody)`
    tr:first-child > td {
        border-top: 1px solid #232323;
    }

    tr:first-child > td:first-child {
        border-top-left-radius: 3px;
    }

    tr:first-child > td:last-child {
        border-top-right-radius: 3px;
    }

    tr:last-child > td:first-child {
        border-bottom-left-radius: 3px;
    }

    tr:last-child > td:last-child {
        border-bottom-right-radius: 3px;
    }

`

export const StyledTableRow = styled(TableRow)`
    td:last-child {
        border-right: 1px solid #232323;
    }
`

export const StyledTableCell = styled(TableCell)`
    && {
        background: #0F0F0F;
        border-bottom: 1px solid #232323;
        border-left: 1px solid #232323;
        padding: 16px 13px;
        vertical-align: top;
    }
`

export const TableCellWrapper = styled.div`
    && {
        background: #0F0F0F;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        /* TODO: fix the height */
    }
`

export const TaskTitle = styled(Typography)`
    && {
        font-weight: 700;
        font-size: 16px;
        color: #FFFFFF
    }
`

export const TaskDescription = styled(Typography)`
    && {
        color: #C4C4C4;
        font-size: 14px;
        line-height: 1.5;
        margin-top: 12px;
    }
`

export const LoadMore = styled.div`
  height: 50px;
  display: ${(props) => (props.hasMore ? 'block' : 'none')};
`