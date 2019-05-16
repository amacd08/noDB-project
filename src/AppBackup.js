import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Nav from './Components/Nav/Nav'
import RoundInfoSignIn from './Components/RoundInfoSignIn/RoundInfoSignIn'
import RoundInfo from './Components/RoundInfo/RoundInfo'
import RoundInfoEmpty from './Components/RoundInfoEmpty/RoundInfoEmpty'
import Hole from './Components/Hole/Hole'
import HoleEmpty from './Components/HoleEmpty/HoleEmpty'


class App extends Component {
  constructor() {
    super()
    this.state = {
      golfer: '',
      golferIndex: '',
      signIn: false,
      course: '',
      newCourse: false,
      roundId: '',
      hole: 1,
      roundInfo: {
        numOfHoles: 18,
        scoringGoal: '',
      }
    }
  }

  signIn = (obj) => {
    let { golfer} = obj
    axios.get(`/api/golfer/${golfer}`).then(res => {
      let {todaysGolfer, index} = res.data
      this.setState ({
        golfer:golfer,
        golferIndex: +index,
        signIn: true
      })
    })
  }

  addHole = () => {
    let hole = this.state.hole

    let holeNumber = {
      length: '',
      fairway: '',
      par: '',
      score: '',
      holePlayed: false,
      index: hole
    }

    let copyScoreCard = this.state.scorecard
    copyScoreCard.unshift(holeNumber)
    let copyHole = this.state.hole + 1
    this.setState({
      scorecard: copyScoreCard,
      hole:  copyHole
    })

  }
  


//   addRound = () => {
//     let {copyName, copyRoundInfo,   }
//     axios.post('/api/round', {

//   }
// }

getCourse = () => {  
  let courseArray = []
  axios.get('/api/course/parkway').then(res => {
      this.setState({
        course: res.data
      })
    })
  }

  updateRoundInfo = (obj) => {
    let {numOfHoles, courseName, scoringGoal,name} = obj
    this.getCourse()
    this.setState({
      roundInfo: {
        numOfHoles:numOfHoles,
        courseName: courseName,
        scoringGoal: scoringGoal,
        name: name    
        },
      courseInfoFilled: true,
    })
    let copyHole = this.state.hole
    this.setState({
      hole: copyHole++
    })
    this.addHole()
    // this.addRound()
    }
  
  updateHoleInfo = (obj) => {
    let {length, fairway, par, score,index} = obj
    let copyScoreCard = this.state.scorecard
    let updatedHole = {
      length,
      fairway,
      par,
      score,
      index,
      holePlayed: true,
    }
    let holeToUpdate = copyScoreCard.findIndex(elem => {
      return elem.index  === updatedHole.index
    })
    copyScoreCard[holeToUpdate] = updatedHole
    this.setState({
       scorecard:copyScoreCard
    })

    this.addHole()
    
  }
  

  render() {
    console.log(this.state.course)
    let holes = this.state.scorecard.map((hole,i) => {
      return (
        <div
        key={i}
        >
      {hole.holePlayed ?
          <Hole 
            length={hole.length}
            fairway={hole.fairway}
            par={hole.par}
            score={hole.score}
            index={hole.index}/>
        
      :
        <HoleEmpty
          index={hole.index}
          updateHoleInfo={this.updateHoleInfo}/>
          
      }
      </div>
      )
          
    })

  return (
    <main>
        <div className="App">
             <Nav />
             {this.state.signIn ?
               <RoundInfoSignIn
               <RoundInfo
                 courseName={this.state.roundInfo.courseName}
                 numOfHoles={this.state.roundInfo.numOfHoles}
                 scoringGoal={this.state.roundInfo.scoringGoal}
                 name={this.state.roundInfo.name}
                 totalScore={this.state.scores.reduce((total,num) =>   total + num)}/>
             :
               <RoundInfoEmpty 
                 updateRoundInfo ={this.updateRoundInfo}/>
             }
             {holes}
        </div>
    </main>
    );
  }
}

export default App;
