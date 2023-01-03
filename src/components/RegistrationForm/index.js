import {Component} from 'react'
import './index.css'

export default class RegistrationForm extends Component {
  state = {
    firstName: '',
    secondName: '',
    showFirstNameErrorMsg: false,
    showLastNameErrorMsg: false,
    className1: '',
    className2: '',
    isSubmitted: false,
  }

  onChangeFirstName = event => {
    const {firstName} = this.state
    this.setState({
      firstName: event.target.value,
    })

    if (firstName !== '') {
      this.setState({
        className1: '',
        showFirstNameErrorMsg: false,
      })
    }
  }

  onChangeLastName = event => {
    const {secondName} = this.state
    this.setState({
      secondName: event.target.value,
    })

    if (secondName !== '') {
      this.setState({
        className2: '',
        showLastNameErrorMsg: false,
      })
    }
  }

  onBlurEvent1 = () => {
    const {firstName} = this.state

    if (firstName === '') {
      this.setState({
        showFirstNameErrorMsg: true,
        className1: 'additional-blur-styling1',
      })
    }
  }

  onBlurEvent2 = () => {
    const {secondName} = this.state

    if (secondName === '') {
      this.setState({
        showLastNameErrorMsg: true,
        className2: 'additional-blur-styling2',
      })
    }
  }

  formSubmission = event => {
    const {firstName, secondName} = this.state
    event.preventDefault()

    if (firstName === '' && secondName !== '') {
      this.setState({
        showFirstNameErrorMsg: true,
        className1: 'additional-blur-styling1',
      })
    } else if (firstName !== '' && secondName === '') {
      this.setState({
        showLastNameErrorMsg: true,
        className2: 'additional-blur-styling2',
      })
    } else if (firstName === '' && secondName === '') {
      this.setState({
        showFirstNameErrorMsg: true,
        className1: 'additional-blur-styling1',
        showLastNameErrorMsg: true,
        className2: 'additional-blur-styling2',
      })
    } else if (firstName !== '' && secondName !== '') {
      this.setState(prevState => ({
        isSubmitted: !prevState.isSubmitted,
        firstName: '',
        secondName: '',
      }))
    }
  }

  submitAnotherResponse = () => {
    this.setState({
      isSubmitted: false,
    })
  }

  render() {
    const {
      firstName,
      secondName,
      showFirstNameErrorMsg,
      showLastNameErrorMsg,
      className1,
      className2,
      isSubmitted,
    } = this.state

    const showErrorMsg1 = showFirstNameErrorMsg ? '*Required' : ''
    const showErrorMsg2 = showLastNameErrorMsg ? '*Required' : ''

    this.submitSuccess = () => (
      <div className="submitted-container">
        <img
          className="right-image"
          alt="success"
          src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        />
        <p>Submitted Successfully</p>
        <button
          onClick={this.submitAnotherResponse}
          className="second-button"
          type="button"
        >
          Submit Another Response
        </button>
      </div>
    )

    this.formContainer = () => (
      <>
        <form onSubmit={this.formSubmission} className="form-container">
          <div className="first-name-container">
            <label htmlFor="first-name">FIRST NAME</label>
            <input
              onBlur={this.onBlurEvent1}
              onChange={this.onChangeFirstName}
              value={firstName}
              placeholder="Fist name"
              className={`input-element ${className1}`}
              id="first-name"
              type="text"
            />
            <p className="error-msg">{showErrorMsg1}</p>
          </div>
          <div className="last-name-container">
            <label htmlFor="last-name">LAST NAME</label>
            <input
              onBlur={this.onBlurEvent2}
              onChange={this.onChangeLastName}
              value={secondName}
              placeholder="Last name"
              className={`input-element ${className2}`}
              id="last-name"
              type="text"
            />
            <p className="error-msg">{showErrorMsg2}</p>
          </div>
          <button className="button-styling" type="submit">
            Submit
          </button>
        </form>
      </>
    )

    return (
      <>
        <div className="bg-container">
          <h1 className="heading">Registration</h1>

          {isSubmitted ? this.submitSuccess() : this.formContainer()}
        </div>
      </>
    )
  }
}
