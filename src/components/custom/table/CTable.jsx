// import React from 'react'
import {TableContainer,TableHead,TableBody,TableRow,Table , TablePagination} from '@mui/material'
import { StyledTableCell } from './CTableStyled'
import PropTypes from 'prop-types'

const CTable = (props) => {

    const renderRowData = () => {
        return props.dataList.map((value,valueIndex) => (
            <TableRow key={value.id}>
                {props.children.map(child => {
                    const fieldValue = child.props.body ? child.props.body(value, valueIndex) : value[child.props.field];
                    return (
                        <StyledTableCell key={child.props.id}>
                            {fieldValue || "-"}
                        </StyledTableCell>)
            })}
            </TableRow>
        ))
    }


  return (
    <>
        <TableContainer sx={{height: 400}}>
                <Table stickyHeader>
                    <TableHead>
                        {props.children.map(child => (
                                <StyledTableCell key={child.props.header}>
                                    {child.props.header}
                                </StyledTableCell>
                            ))}
                    </TableHead>
                    <TableBody>
                        {renderRowData()}
                    </TableBody>
                </Table>
        </TableContainer>
        <TablePagination 
        rowsPerPageOptions={props.rowPerPageOptions}
        component="div"
        count={props.totalData}
        rowsPerPage={props.rowPerPage}
        page={props.pageIndex}
        onPageChange={props.changePageFunc}
        onRowsPerPageChange={props.changeRowsPerPageFunc}
        />
    </>

  )
}

CTable.propTypes = {
    children: PropTypes.node.isRequired,
    dataList: PropTypes.array.isRequired,
    totalData: PropTypes.number,
    rowPerPage: PropTypes.number,
    pageIndex: PropTypes.number,
    changePageFunc: PropTypes.func,
    changeRowsPerPageFunc: PropTypes.func,
    rowPerPageOptions:PropTypes.array
}

CTable.defaultProps = {
    rowPerPageOptions:[5, 10, 25]
}

export default CTable
