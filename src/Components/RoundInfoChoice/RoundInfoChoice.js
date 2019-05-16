import React, { Component } from 'react'
import './RoundInfoChoice.css'
import axios from 'axios'
import OldRound from './OldRounds/OldRounds'

class RoundInfoChoice extends Component {
    constructor(props) {
        super(props)
        this.state ={
            viewOldRoundList:false,
            viewOldRound:false,
            oldRounds: props.golfer.rounds,
            oldCourseIndex: '',
            roundToView: [],
            oldCourse:[]

        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    //kick off course select for new round, leaves RoundInfoChoice page and brings up courseselect page.
    newRound = () => {
        this.props.courseSelect()
    }
    

    // Old Round List Fills a select box w/ old rounds for an existing user.
    oldRoundList = () => {
        if (this.state.oldRounds.length > 0) {
            let singleRound = this.state.oldRounds.map((round,i) => {
            return (
                <option 
                key={i} 
                value={i}>
                     {`${round.course} on ${round.date}`}
                </option>
                )
            })
            return singleRound 
        } else {
                return (
                    <option 
                    value={false}>
                         No Rounds Available
                    </option>
            )}
        } 

    //DisplayOldRound is invoked when a user selects to see an old round and clicks the viewOldRound div. This will call the api to get course info (yardage and par), then set the viewOldRound flag to true.

    displayOldRound = () => {
       this.setState({
           viewOldround: false
       })
       if (this.state.oldCourseIndex) {
        let course = this.state.oldRounds[this.state.oldCourseIndex].course
            axios.get(`api/course/${course}`).then(res => {
                console.log(res.data)
                this.setState({
                    oldCourse:res.data,
                    viewOldRound: true
                 })
            })
        }
    }

    //Once the viewOldRound flag has been set it will trigger this renderOldRound function (conditionally invoked under render/return)
    renderOldRound = () => {
        let holeCompiled =[]
        let individualHole =[]
        if (this.state.viewOldRound) {
            let rounds =  this.state.oldRounds
            let roundIndex = this.state.oldCourseIndex
            let thisCourse = rounds[roundIndex].course
            let round = rounds[roundIndex][thisCourse]
            let holeCompiled = []
                // let hole = rounds[roundIndex][thisCourse].map((hole,i) => {
            for (let i = 0; i < round.length ; i++) {
                let hole = {
                    score: round[i].score,
                    fairway: round[i].fairway,
                    lostBall: round[i].lostBall,
                    gir: round[i].gir,
                    hole: i + 1 
                }
                holeCompiled.push(hole)
            }
        if (holeCompiled) {
            individualHole = holeCompiled.map((hole, i) => {
                return( 
                <OldRound
                key={i}
                holeInfo={hole}
                course={this.state.oldCourse[i]}/>
                )
        })
        }
        return individualHole
     } 
    }



    
    render() {
    console.log(this.state.oldCourse)
        return(
            <div>
                <div className="roundInfoBox">
                    <div className="choiceColumn">
                            <select 
                            className="inputBox"
                            name="oldCourseIndex"  
                            onChange={this.handleInput} value={this.state.oldCourseIndex}>
                                <option value={false} disabled>Select Round</option>
                                {this.oldRoundList()}
                            </select>
                    </div>
                    <div className="choiceColumn">
                        <div className="submitChoiceButton" 
                        onClick={this.displayOldRound}>
                            <p>View  Round</p>
                        </div>
                    </div>
                    <div className="choiceColumn">
                        <div className="submitChoiceButton" onClick={this.newRound}>
                            <p>New Round</p>
                        </div>
                    </div>
                </div>
                {this.renderOldRound()}
            </div>

        )
    }
}

export default RoundInfoChoice
