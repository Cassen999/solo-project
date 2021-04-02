import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './BarberAptView.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export function BarberAptView(props) {

  const [heading, setHeading] = useState('Appointment Details');
  // Research how to set the state using the input for client notes
  const [note, setNote] = useState();

  const appointment = props.store.aptDetails

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      background: 'white'
    },
  }));

  // This converts the date into a readable format
  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  // This converts the phone number into a readable format
  const handlePhone = (phone) => {
    const p = phone
    return(
      `+1 (${p[0]}${p[1]}${p[2]})-${p[3]}${p[4]}${p[5]}-${p[6]}${p[7]}${p[8]}${p[9]}`
    )
  }
  
  const handleInputChange = (e) => {
    // Need to set state of note
  }

  const classes = useStyles();

  const renderDetails = (appointment) => {
    return(
      <div>
        <div className="container">
          <div className="panel">
            <div className="scrim">
              <div className="grid">
                <div className="grid-col grid-col_8">
                  {appointment.map((apt, i) => {
                    return(
                      <div>
                        <h4>
                          {apt.first_name} {apt.last_name}
                        </h4>
                        <h4>
                          {handlePhone(apt.phone_number)}
                        </h4>
                        <h4>
                          {handleDate(apt.date)} At {apt.start_time}
                        </h4>
                        <TextField
                          id="outlined-multiline-static"
                          className={classes.root}
                          label="Client Notes"
                          multiline
                          rows={4}
                          defaultValue={apt.notes}
                          variant="filled"
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>{heading}</h2>
      {renderDetails(appointment)}
    </div>
  );
}

export default connect(mapStoreToProps)(BarberAptView);