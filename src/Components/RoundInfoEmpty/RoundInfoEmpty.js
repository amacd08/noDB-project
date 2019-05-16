import React, {Component} from 'react'
import './RoundInfoEmpty.css'
import axios from 'axios';
class RoundInfoEmpty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: '',
            courseList: '',
            numOfHoles: '',
            scoringGoal: '' 
        }
    }

    componentDidMount() {
        axios.get('api/course').then(res => {
            this.setState({courseList:res.data})  
         })}
   
    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    courseList = () => {
        if (this.state.courseList.length > 0) {
            let singleCourse = this.state.courseList.map((course,i) => {
            return (
                <option 
                key={i} 
                value={course}>
                     {course}
                </option>
                )
            })
            return singleCourse
        }

    } 
    

    roundInfo = () => {
        let obj = {
            course: this.state.course,
            numOfHoles: this.state.numOfHoles,
            scoringGoal: this.state.scoringGoal,
        }
        this.props.updateRoundInfo(obj)
    }


    render() {
        return(
            <div className="roundInfoBox">
                <div className="roundInfoColumn">
                    <div className="lineBox">
                        <div className="box">
                            <h1>Course:</h1>
                        </div>
                            <select 
                                className="holeInput"
                                name="course"  
                                onChange={this.handleInput} value={this.state.course}>
                                    <option value={false} disabled>Select Round</option>
                                    {this.courseList()}
                                    <option value={9999} >
                                    New Course</option>
                            </select>
                    </div>
                    <div className="lineBox">
                        <div className="box">
                        <h1>Holes:</h1>
                        </div>
                        <div className = "box">
                            <select 
                            className="inputBox"
                            name="numOfHoles"  
                            onChange={this.handleInput} value={this.state.numOfHoles} >
                                <option value="select">How many holes</option>
                                <option value='9'> 9 Holes</option>
                                <option value='18'> 18 Holes</option>
                            </select>
                        </div>
                    </div>
                    <div className="lineBox">
                        <div className="box">
                            <h1> Goal:</h1>
                        </div>
                        <div className="box">
                            <input 
                            className="inputBox"
                            name="scoringGoal" 
                            value={this.state.scoringGoal} 
                            onChange={this.handleInput}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className="roundInfoColumn">
                    <div className="submitInfoButton" onClick={this.roundInfo}>
                        <p>Update Info</p>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default RoundInfoEmpty