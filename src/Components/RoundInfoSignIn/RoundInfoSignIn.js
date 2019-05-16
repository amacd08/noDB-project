import React, { Component } from 'react'
import './RoundInfoSignIn.css'

class RoundInfoSignIn extends Component {
    constructor() {
        super()
        this.state ={
            golfer: '',
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    signIn = () => {
        let signInObj = {
            golfer: this.state.golfer
        }
        this.props.signIn(signInObj)
    }

    

    
    render() {

        return(
            <div className="roundInfoBox">
                <div className="roundInfoColumn">
                    <div className="lineBox">
                        <div className="signInBox">
                        <h1>Golfer:</h1>
                        </div>
                        <div className="signInBox">
                            <input 
                            className="textBox"
                            name="golfer" 
                            value={this.state.golfer} 
                            onChange={this.handleInput}></input>
                        </div>
                    </div>
                </div>
                <div className="roundInfoColumn">
                    <div className="submitButton" onClick={this.signIn}>
                        <p>Find Golfer</p>
                    </div>
                </div>
            </div>

        )
    }
}

export default RoundInfoSignIn
