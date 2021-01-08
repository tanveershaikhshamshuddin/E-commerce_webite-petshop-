import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { Avatar, TextField } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { deleteProduct, searchProduct } from '../../../actions/productActions';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'p_image', numeric: false, disablePadding: true, label: 'Image' },
  { id: 'p_name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'p_price', numeric: true, disablePadding: true, label: 'Price' },
  { id: 'p_quantity', numeric: true, disablePadding: true, label: 'Quantity' },
  { id: 'p_pet_type', numeric: false, disablePadding: true, label: 'PetType' },
  { id: 'p_category', numeric: false, disablePadding: true, label: 'Category' },
  { id: 'p_manf_date', numeric: false, disablePadding: true, label: 'Manf Date' },
  { id: 'p_exp_date', numeric: false, disablePadding: true, label: 'Exp Date' },
  {id:'actions',numeric:false,disabledPadding:true,label:'Actions'}
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow >
        <TableCell style={{backgroundColor:"purple"}}  padding="checkbox" className="text-light">
          <Checkbox
          style={{backgroundColor:"purple"}}
            className="text-light"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
          style={{backgroundColor:"purple"}}
            className="text-light"
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
            style={{backgroundColor:"purple"}}
              className="text-light"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} component="div">
          <h3 style={{fontFamily:"'Times New Roman', Times, serif",color:"purple",padding:"1rem"}}>All Products</h3><br/>
        </Typography>

      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%'
  },
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 700,
    maxHeight:100
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 0.5,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 5,
    width: 1,
  },
}));

export default function MuiTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n) => n.p_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  const dispatch=useDispatch();

  
  const [data,setData]=useState([]);
  const [query,setQuery]=useState('');
  const [searchColumn,setSearchColumn]=useState([]);
  const regex=new RegExp(`${query}`,'gi');


function Search(rows){
  const columns=rows[0] && Object.keys(rows[0]);
  console.log(columns);
  return rows.filter(
    (row)=> 
   row.p_name.toString().match(regex)||
   row.p_price.toString().match(regex) ||
   row.p_quantity.toString().match(regex) ||
   row.p_pet_type.toString().match(regex)||
   row.p_category.toString().match(regex)||
   props.customDateFn(row.p_manf_date).toString().match(regex) ||
   props.customDateFn(row.p_exp_date).toString().match(regex)
  )
}
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className="m-1"><center><TextField type="text" color="secondary" label="Search Item from list here"value={query} variant="outlined" className="col-8" onChange={(e)=>setQuery(e.target.value)}/></center></div>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader aria-label="sticky table"
            
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              className="text text-dark"
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.data.length}
            />
            <TableBody>
              {stableSort(query?Search(props.data):props.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.p_name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                    
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.p_name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.p_name}
                      selected={isItemSelected}
                    >
                      <TableCell  padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />

                      </TableCell>
                      <TableCell>
                      <Avatar src={row.p_image}/>
                      </TableCell>

                      <TableCell>{row.p_name}</TableCell>
                      <TableCell>{row.p_price}</TableCell>
                      <TableCell>{row.p_quantity}</TableCell>
                      <TableCell>{row.p_pet_type}</TableCell>
                      <TableCell>{row.p_category}</TableCell>
                      {
                        row.p_category=="medicines" || row.p_category==="foods"
                        ?
                        <>
                        <TableCell>{props.customDateFn(row.p_manf_date).toString()}</TableCell>
                        <TableCell>{props.customDateFn(row.p_exp_date).toString()}</TableCell>
                        </>:
                        <>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        </>
                      }
                      
                      <TableCell><IconButton onClick={()=>dispatch(searchProduct({item_name:row.p_name}))}><EditIcon/></IconButton>
                      <IconButton onClick={()=>dispatch(deleteProduct(row._id))} ><DeleteIcon/></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
