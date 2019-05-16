import React, { Component } from 'react'
import '../RoundInfoSignIn/RoundInfoSignIn.css'

class CreateCourse extends Component {
    constructor() {
        super()
        this.state ={
            courseName: '',
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    createCourse = () => {
        let courseName = this.state.courseName
        this.props.createNewCourse(courseName)
    }

    render() {
        return(
            <div className="roundInfoBox">
                <div className="roundInfoColumn">
                    <div className="lineBox">
                        <div className="signInBox">
                        <h1>Course:</h1>
                        </div>
                        <div className="signInBox">
                            <input 
                            className="textBox"
                            name="courseName" 
                            value={this.state.courseName} 
                            onChange={this.handleInput}></input>
                        </div>
                    </div>
                </div>
                <div className="roundInfoColumn">
                    <div className="submitButton" onClick={this.createCourse}>
                        <p>Course</p>
                    </div>
                </div>
            </div>

        )
    }
}

export default CreateCourse