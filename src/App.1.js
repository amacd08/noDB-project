import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Nav from './Components/Nav/Nav'
import RoundInfoSignIn from './Components/RoundInfoSignIn/RoundInfoSignIn'
import RoundInfoChoice from './Components/RoundInfoChoice/RoundInfoChoice'
import RoundInfo from './Components/RoundInfo/RoundInfo'
import RoundInfoEmpty from './Components/RoundInfoEmpty/RoundInfoEmpty'
import CreateCourse from './Components/CreateCourse/CreateCourse'
import Hole from './Components/Hole/Hole'
import HoleEmpty from './Components/HoleEmpty/HoleEmpty'


class App extends Component {
  constructor() {
    super()
    this.state = {
      golfer: {},
      golferIndex: '',
      course: '',
      signIn: false,
      courseSelect: false,
      newGolfer: false,
      newCourse: false,
      roundId: '',
      hole: 0,
      startRound: false,
      roundInfo: {
        numOfHoles: 18,
        scoringGoal: '',
      }
    }
  }


  signIn = (obj) => {
    let { golfer} = obj
    axios.get(`/api/golfer/${golfer}`).then(res => {
      let {todaysGolfer, index,newGolfer} = res.data
      if (newGolfer) {
        this.setState ({
          golfer:todaysGolfer,
          golferIndex: +index,
          signIn: true,
          newGolfer:newGolfer,
          courseSelect: true
        })
      } else {
        this.setState ({
          golfer:todaysGolfer,
          golferIndex: +index,
          signIn: true,
        })
      }
    })
  }

  createNewCourse = (newCourse) => {
     axios.post(`/api/course/${newCourse}`).then(res => {
       console.log('stuff isnt happening')
      this.setState = ({
        course: newCourse,
        startRound: true
      })

     })
     console.log("Im trying to do stuff")    
     console.log(this.state.startRound)

  }

  courseSelect = () => {
    this.setState({
      courseSelect: true

    })
  }



getCourse = () => {  
  let courseArray = []
  axios.get('/api/course/parkway').then(res => {
      this.setState({
        course: res.data
      })
    })
  }

  updateRoundInfo = (obj) => {
    let {numOfHoles, course, scoringGoal} = obj
    this.setState({
      roundInfo: {
        numOfHoles,
        scoringGoal,
        },
      course,
      courseSelect: false,
    })
    let copyHole = this.state.hole
    this.setState({
      hole: copyHole++
    })
  
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
  //This is where the info box is decided 
  //1- Sign in component triggers signin does API call to see if this is a new user. If it is a new user, skips the roundInfoChoice screen (views old rounds) and goes straight to course select screen.
  //2-Course select screen lets users select existing course or choose to enter information and create a new course. They also enter goals. Hitting submit creates a new round for the user in the server.
  //3-Once a new round is created   user is using the RoundInfo card and generating holes as they go until complete!
    
  renderContent = () => {
            if (!this.state.signIn) {
                  return <RoundInfoSignIn 
                          signIn={this.signIn}/>
            } else if (this.state.startRound) {
              return <RoundInfo
              course={this.state.roundInfo.course}
              numOfHoles={this.state.roundInfo.numOfHoles}
              scoringGoal={this.state.roundInfo.scoringGoal}
              name={this.state.golfer.name}
              totalScore={this.state.scores.reduce((total,num) => total+ num)}/>
             } else if (!this.state.newGolfer && !this.state.courseSelect && !this.state.startRound) {
                  return <RoundInfoChoice
                          golfer={this.state.golfer}
                          golferIndex={this.state.golferIndex}
                          newUser={this.state.courseSelect}
                          courseSelect={this.courseSelect}/>
            } else if (this.state.courseSelect) {
                return <RoundInfoEmpty
                       updateRoundInfo={this.updateRoundInfo} 
                       courseList={this.state.courseList}/>
            } else if (this.state.course == 9999) {
                return <CreateCourse
                        createNewCourse={this.createNewCourse} />
            } 
        }  

  render() {
    console.log(this.state.startRound)
    console.log(this.state.course)

    // console.log(this.state.golfer)
    // // let holes = this.state.scorecard.map((hole,i) => {
    //   return (
    //     <div
    //     key={i}
    //     >
    //   {hole.holePlayed ?
    //       <Hole 
    //         length={hole.length}
    //         fairway={hole.fairway}
    //         par={hole.par}
    //         score={hole.score}
    //         index={hole.index}/>
    //   :
    //     <HoleEmpty
    //       index={hole.index}
    //       updateHoleInfo={this.updateHoleInfo}/>
          
    //   }
    //   </div>
    //   )
          
    // })

  return (
    <main>
        <div className="App">
             <Nav />
             { this.renderContent() }
             {/* {holes} */}
        </div>
    </main>
    );
  }
}

export default App;
