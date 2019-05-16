import React, {Component} from 'react'
import './holeEmpty.css'
import '../RoundInfoEmpty/RoundInfoEmpty.css'
import Axios from 'axios';

class HoleEmpty extends Component {
    constructor () {
        super()
        this.state = {
            fairway: '',
            score: '',
            lostBall: '',
            gir: '',
            par: '',
            length: ''

        }
    }

    autoSelectPar = () => {
        if (+this.state.length < 230) {
            this.setState({
                par: 3
            })
        } else if (+this.state.length > 230 && +this.state.length < 450) {
            this.setState({
                par: 4
            })
        } else if (+this.state.length > 450) {
            this.setState({
                par: 5
            })
        }

    }

    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
        // setTimeout(this.autoSelectPar(), 5000)

    }

    holeInfo = () => {
        if (this.state.par && this.state.length) {
            // Axios.put(`/api/course/${this.props.course}`).then(res => {console.log(res.data)})
            let holeObj = {
                score: this.state.score,
                fairway: this.state.fairway,
                gir: this.state.gir,
                lostBall: this.state.lostBall,
                index: this.props.index,
                length: this.state.length,
                par: this.state.par
            }
            this.props.updateHoleInfo(holeObj)
            this.setState({
                fairway: '',
                score: '',
                gir: '',
                lostBall: '',
                length: '',
                par: ''
            })
        } else {
            let holeObj = {
                score: this.state.score,
                fairway: this.state.fairway,
                gir: this.state.gir,
                lostBall: this.state.lostBall,
                index: this.props.index,
                par: this.props.par,
                length: this.props.length,
            }
            this.props.updateHoleInfo(holeObj)
            this.setState({
                fairway: '',
                score: '',
                gir: '',
                lostBall: '',
                length: '',
                par: ''
            })
        }
          
        } 
        

    

    render() {

        let par=''
        if (+this.state.length < 230) {
            par = 3
        } else if (+this.state.length > 230 && +this.state.length < 450) {
            par = 4
        } else if (+this.state.length > 450) {
            par = 5
 
        }

        

        return(
            <div>
                <div className='holeNumberEmpty'>
                    <h3>{this.props.index}:</h3>
                </div>
                <div className="holeCardEmpty">
                    <div className="holeInfoColumnEmpty">
                        <div className="holeLineBoxEmpty">
                            <div className="box">
                            Length:
                            </div>
                            {this.props.length ? 
                                <h3>{this.props.length}</h3>
                            :
                                <div className="box">
                                   <input 
                                   name="length" 
                                   value={this.state.length} 
                                   onChange={this.handleInput}>
                                   </input>
                                </div>
                            }
                        </div>
                        <div className="holeLineBoxEmpty">
                            <div className="box">
                            par:
                            </div>
                            {this.props.par ? 
                                <h3>{this.props.par}</h3>
                            :
                                <div className="box">
                                   <input 
                                   name="par" 
                                   value={this.state.par} 
                                   onChange={this.handleInput}>
                                   </input>
                                </div>
                            }
                        </div>
                        <div className="holeLineBoxEmpty">
                            <div className="box">
                                Fairway:
                            </div>
                            <div className = "box">
                                <select 
                                name="fairway"  
                                onChange={this.handleInput} 
                                value={this.state.fairway} >
                                    <option value="select"></option>
                                    <option value='yes'> Yes</option>
                                    <option value='no'> No</option>
                                </select>
                            </div>
                        </div>
                        <div className="holeLineBoxEmpty">
                            <div className="box">
                                GIR:
                            </div>
                            <div className="box">
                               <select 
                                name="gir"  
                                onChange={this.handleInput} 
                                value={this.state.gir} >
                                    <option value="select"></option>
                                    <option value='yes'> Yes</option>
                                    <option value='no'> No</option>
                                </select>
                            </div>
                        </div>
                        <div className="holeLineBoxEmpty">
                            <div className="box">
                                lostBall:
                            </div>
                            <div className="box">
                            <select 
                                name="lostBall"  
                                onChange={this.handleInput} 
                                value={this.state.lostBall} >
                                    <option value="select"></option>
                                    <option value='yes'> Yes</option>
                                    <option value='no'> No</option>
                                </select>
                            </div>
                        </div>
                        <div className="holeLineBoxEmpty">
                            <div className="box">
                                Score:
                            </div>
                            <div className="box">
                                <select 
                                  name="score" 
                                  value={this.state.score} 
                                  onChange={this.handleInput}>
                                  <option value="">Select</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                  <option value={9}>9</option>
                                  <option value={10}>10</option>
                                  <option value={11}>11></option>
                                  <option value={12}>12</option>
                                </select>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className="holeInfoColumnEmpty">
                        <div className="holeSubmitButton" 
                            onClick={this.holeInfo}
                            >
                            <p>Update Info</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default HoleEmpty
    
 





