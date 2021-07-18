import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import { Button, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from 'react-router-dom';

function createData(description, name, price, unit, tax, rate, final) {
  return { description, name, price, unit, tax, rate, final };
}

const rows1 = [
  createData('Freight', 'Freight', 1781.8, 'Per Container', '-', 1.00, 2000),
  createData('Free In', 'Free In', 160 ,'Per Container', '-', 1.00, 2000),
  createData('BI Free', 'BI Free', 175, 'Per BI', '18%', 1.00, 2000),
  createData('Temporary', 'Temporary Accept', 140 ,'Per Container', '18%' , 70.79, 2000),
];

const headCells = [
  { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
  {},
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'unit', numeric: false, disablePadding: false, label: 'Unit' },
  { id: 'tax', numeric: true, disablePadding: false, label: 'Tax' },
  { id: 'rate', numeric: true, disablePadding: false, label: 'Exchange Rate' },
  { id: 'final', numeric: true, disablePadding: false, label: 'Final Payment' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, id } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
            disabled={ id ==='A' ? false : true}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          ><b>{headCell.label}</b>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
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
    flex: '1 1 80%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, rows, selected, id } = props;

  const checkUngroup = rows.some(item => { return (item.description === selected[0] && item.arr && item.arr.length> 0)})
  
  return (
    <div>
    <h2>Manage Charges</h2>
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          <Button onClick={props.handleGroupItems} variant="contained" color="primary" disabled={ numSelected>1 && id === 'A'? false : true } style={{ marginRight:'5px'}}>Group</Button>
          <Button variant="contained" color="default" disabled={ numSelected>0  && checkUngroup && id === 'A'? false : true } onClick={props.handleUngroup} >Ungroup</Button>
        </Typography>
        
        <Typography>Profit margin: </Typography><span><Typography style={{ color:'darkblue'}}><b> INR 301.63 (16%)</b></Typography></span>
        
    </Toolbar>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const { id } = useParams();

  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState('');
  const [textFlag, setTextFlag] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [textInput, setTextInput] = React.useState('');
  const [rows, setRows] = React.useState(rows1);
  const [render, setRender] = React.useState(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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

  const handleGroupItems = () => {
    console.log(selected);
    setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
      setTextInput('');
      setNewLabel('');
      setTextFlag(false)
  }

  const handleLabelChange = (value) => {
      if(value === 'Others'){
          setTextFlag(true)
      }else{
        setNewLabel(value);
      }
  }

  const handleInputLabel = (e) => {
    let val = e.target.value;
    setTextInput(val)
    setNewLabel(val)
  }

  const handleSubmit = ()=> {
    let arr = [], arr1 = [], amount = 0
    rows1.forEach(item => {
        if(selected.includes(item.name)){
            arr.push(item)
            amount += parseInt(item.final)
        }else{
            arr1.push(item)
        }
    })
    let newArr = [{'description': newLabel, 'final' : amount, 'name' : newLabel,  arr}, ...arr1];
    
    setRows(newArr)
    console.log(arr, newArr)
    setOpen(false)
    setTextInput('');
    setNewLabel('');
    setSelected([])
    setTextFlag(false)
  }

  const handleExpandRows = ()=> {
    setExpand(!expand);
  }

  const handleUngroup = (e, item) => {
    console.log(rows, selected, item);
    let newRows = rows
    if(item && selected.length > 0){
      newRows.forEach((row, index) => {
        if((selected[0] === row.description) && row.arr && row.arr.length > 0){
          if(row.arr && row.arr.length> 0){
          row.arr.forEach((e, i) => {
            if(e.description === item.description){
              row.arr.splice(i, 1)
              row.final = parseInt(row.final) - parseInt(item.final)
              if(row.arr.length <1){
                newRows.splice(index, 1);
                setSelected([])
                setExpand(false)
              }
            }
          })
        }
        }
      })
    
    newRows.push(item)
    setRows(newRows)
    setRender(!render)
    console.log(newRows)
  }
  else if( selected.length> 0){
    let arr1 = []
    newRows.forEach((row, index) => {
      if(selected[0] === row.description && row.arr.length > 0){
        arr1 = row.arr
        newRows.splice(index, 1)
        setSelected([])
        setExpand(false)
      }
    })
    newRows = [...newRows, ...arr1]
    setRows(newRows)
    setRender(!render)
  }

  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar rows={rows} id={id} selected={selected} numSelected={selected.length} handleGroupItems={handleGroupItems} handleUngroup={handleUngroup}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              id={id}
            />

                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableBody>
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.name)}
                          disabled={ id ==='A' ? false : true}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.arr && row.arr.length > 0 && !expand ? <KeyboardArrowRightIcon style={{ fontSize: '18px' }} onClick={handleExpandRows}/> : 
                        row.arr && row.arr.length > 0 && expand ? <ExpandMoreIcon style={{ fontSize: '18px' }} onClick={handleExpandRows}/> : ''}
                        {row.description}
                      </TableCell>
                      <TableCell align="left">{ isItemSelected ? <CreateIcon disabled={ id ==='A' ? false : true}/> : ''}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right">{row.unit === 'Per BI'? 'TI' : row.unit === 'Per Container' ? 'USD' : ''} {row.price}</TableCell>
                      <TableCell align="left">{row.unit}</TableCell>
                      <TableCell align="right">{row.tax }</TableCell>
                      <TableCell align="right">{row.rate}</TableCell>
                      <TableCell align="right">{row.final ?'INR' : ''} {row.final}</TableCell>
                    </TableRow>
                    {row.arr && row.arr.length> 0 && expand &&
                      row.arr.map(item => {
                        return(<TableRow style={{width: '100%'}}>
                        <TableCell><SettingsBackupRestoreIcon onClick={(e)=> handleUngroup(e, item)} /></TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">{item.description}</TableCell>
                        <TableCell align="left">{ isItemSelected ? <CreateIcon/> : ''}</TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="right">{item.unit === 'Per BI'? 'TI' : 'USD' } {item.price}</TableCell>
                        <TableCell align="left">{item.unit}</TableCell>
                        <TableCell align="right">{item.tax}</TableCell>
                        <TableCell align="right">{item.rate}</TableCell>
                        <TableCell align="right">INR {item.final}</TableCell>
                        </TableRow>
                        
                    )})}
                    </TableBody>
                  );
                })}

          </Table>
        </TableContainer>
      </Paper>
      
      <Toolbar>
      <Typography style={{ flex: '1 1 80%'}} variant="h6" id="tableTitle" component="div">
        <FormControlLabel
            control={<AddIcon />}
            label="More Changes"
            style={{color:'blue'}}
        />
        </Typography>
        
        <Button variant="outlined" color="primary" style={{ marginRight:'5px'}}>Cancel</Button>
        <Button variant="contained" color="primary">Submit</Button>
        
    </Toolbar>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><DoubleArrowIcon color="primary" style={{ fontSize:'18px' }}/>Label Row As</DialogTitle>
        <DialogContent>
          {
            selected.map(item=> 
                <MenuItem value={item} onClick={(e) => handleLabelChange(item)}>{item}</MenuItem>
            )
          }
          <MenuItem value="Others" onClick={(e) => handleLabelChange('Others')}>Others</MenuItem>
          {textFlag &&
            <TextField 
                variant="outlined"
                value={textInput}
                onChange = {(e)=>handleInputLabel(e)}
            />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
