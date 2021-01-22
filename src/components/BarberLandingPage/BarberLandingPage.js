import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import LogoutButtonStyled from '../LogOutButtonStyled/LogOutButtonStyled';
import './BarberLandingPage.css';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      margin: theme.spacing.unit * 1.5,
      width: 200,
      color: 'white'
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
  });

  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

class BarberLandingPage extends Component {

  state = {
    date: ''
  }

  handleSelectDate = (event) => {
    this.setState({
      date: event.target.value,
    });
    this.props.dispatch({type: 'FETCH_BARBER_APT', 
      payload: {id: this.props.store.user.id, date: event.target.value}})
    console.log('in SelectDate id then date', this.props.store.user.id, event.target.value)
  }

  handleDelete = (appt_id, id, date) => {
    this.props.dispatch({type: 'DELETE', payload: {aptId: appt_id, userId: id, date: date, 
      barberId: this.props.store.user.id}})
    console.log('handle delete event', appt_id)
  }
    
  render() {
    const isDateAfterToday = (date) => {
      return new Date(date.toDateString()) >= new Date(new Date().toDateString());
    };
    const { classes } = this.props;
    return (
      <div>
        <h2 className="welcome">Welcome {this.props.store.user.first_name}</h2>
        <h3 className="chooseDate">Choose a date to view schedule</h3>
        <form onSubmit={this.selectDate} className={classes.container} noValidate>
          <div className="schedPicker">
            <Paper className={classes.root}>
              <TextField
                id="date"
                label="Choose a Date"
                type="date"
                onChange={this.handleSelectDate}
                value={this.state.date}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                />
              </Paper>
          </div>
        </form>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Appointment Date</TableCell>
                        <TableCell align="right">Appointment Time</TableCell>
                        <TableCell align="right">Client Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.store.barberApt.map((apt, i) => {
                      return( 
                        <TableRow key={i}>
                          <TableCell align="right">{handleDate(apt.date)}</TableCell>
                          <TableCell align="right">{apt.start_time}</TableCell>
                          <TableCell align="right">{apt.first_name}</TableCell>
                          <TableCell className="deleteBtn" value={apt.appt_id}>
                          {isDateAfterToday(new Date(apt.date)) ? 
                            <Button
                              align="center"
                              color="secondary"
                              variant="contained" 
                              size="large" 
                              onClick={() => this.handleDelete(apt.appt_id, apt.id, apt.date)}
                              className={classes.button}>
                                <DeleteIcon className={classes.rightIcon} />
                                delete</Button> : null}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
            </Table>
        </Paper>
        <div className="logoutBtn">
          <LogoutButtonStyled />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(BarberLandingPage));