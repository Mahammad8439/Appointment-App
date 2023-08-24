// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, toggleButtonStar} = props
  const {title, dateFormatted, starred, id} = appointment

  const onStarredButton = () => {
    toggleButtonStar(id)
  }

  const isStar = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div>
        <p className="title">{title}</p>
        <p className="date">{dateFormatted}</p>
      </div>
      <button
        type="button"
        className="star-btn"
        onClick={onStarredButton}
        data-testId="star"
      >
        <img src={isStar} alt="star" className="img-star" />
      </button>
    </li>
  )
}

export default AppointmentItem
