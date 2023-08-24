// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], titleInput: '', dateInput: ''}

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  submitAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const dateFormatted = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      dateFormatted,
      starred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleButtonStar = id => {
    this.setState(preveState => ({
      appointmentList: preveState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            starred: !eachItem.starred,
          }
        }
        return eachItem
      }),
    }))
  }

  starredFilter = () => {
    this.setState(preveState => ({
      appointmentList: preveState.appointmentList.filter(
        eachOb => eachOb.starred,
      ),
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentList} = this.state
    console.log(this.state)
    return (
      <div className="app-container">
        <div className="appointment-card-container">
          <div className="add-appointment">
            <div>
              <h1 className="appointment-main-heading">Add Appointment</h1>
              <form onSubmit={this.submitAppointment}>
                <label htmlFor="titleInput">
                  TITLE <br />
                  <input
                    type="text"
                    id="titleInput"
                    className="input"
                    placeholder="TITLE"
                    value={titleInput}
                    onChange={this.onChangeTitle}
                  />
                </label>
                <br />
                <label htmlFor="dateInput">
                  DATE <br />
                  <input
                    type="date"
                    id="dateInput"
                    className="input"
                    onChange={this.onChangeDate}
                    value={dateInput}
                  />
                </label>
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr className="separator" />
          <div className="appointment-item">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className="start-button"
              onClick={this.starredFilter}
            >
              Starred
            </button>
          </div>
          <ul className="list-item-container">
            {appointmentList.length >= 1 &&
              appointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointment={eachAppointment}
                  toggleButtonStar={this.toggleButtonStar}
                />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
