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
      course: [],
      courseInfo: [],
      signIn: false,
      golferInfo: false,
      roundInfoUpdate: false,
      newGolfer: false,
      newCourse: false,
      startRound: false,
      roundIndex: '',
      hole: 0,
      roundTracker: [],
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
          golferInfo: true
        })
      } else {
        this.setState ({
          golfer:todaysGolfer,
          golferIndex: +index,
          signIn: true,
          golferInfo: true

        })
      }
    })
  }

  createNewCourse = (newCourse) => {
     axios.post(`/api/course/${newCourse}`).then(res => {
      let copyRoundTracker = this.state.roundTracker
      let copyHole = this.state.hole
      copyHole++
       let newHole = {
        yard: '',
        par: '', 
        fairway: '',
        score: '',
        index: copyHole,
        lostBall: '',
        gir: '',
        holePlayed: false
      }
       copyRoundTracker.push(newHole)
      this.setState({
        course: newCourse,
        hole: copyHole,
        startRound: true,
        roundInfoUpdate: false,
        // roundTracker: copyRoundTracker

       
      })
      
     })
     axios.post(`/api/round/${this.state.golferIndex}/${newCourse}`).then(res => {
      this.setState({
        roundIndex: res.data.newRoundIndex
      })
    })
  }

  courseSelect = () => {
    this.setState({
      roundInfoUpdate: true,
      golferInfo: false

    })
  }



getCourse = (course) => {  
  let courseArray = []
  axios.get(`/api/course/${course}`).then(res => {
    return res.data

  })
}

  updateRoundInfo = (obj) => {

            let {numOfHoles, course, scoringGoal} = obj
            let newCourse = false
            if (Number(course) === 9999) {
             newCourse = true
            }

            axios.get(`/api/course/${course}`).then(res => {
              let copyCourseInfo = this.state.courseInfo
              copyCourseInfo= res.data

            this.setState({
              roundInfo: {
                numOfHoles,
                scoringGoal,
                },
              courseInfo: copyCourseInfo,
              roundInfoUpdate: false,
              startRound: true
                })
 
        
            
              this.setState({
                course:course,
              })
              if (newCourse) {

                return
              }

              this.addHole()
              
            })
            axios.post(`/api/round/${this.state.golferIndex}/${course}`).then(res => {
              this.setState({
                roundIndex: res.data.newRoundIndex
              })
            })

            }

          
          
          

    

  addHole = () => {
    if (this.state.startRound && this.state.course !==9999){      
        let yard = ''
        let par = ''
        let copyHole = this.state.hole 
        if (this.state.courseInfo[copyHole]) {
            yard = this.state.courseInfo[copyHole].yard
            par = this.state.courseInfo[copyHole].par
        }
        copyHole++
        // let par = this.state.courseInfo[this.state.hole].par
    
        let holeNumber = {
          yard, 
          par,
          fairway: '',
          score: '',
          index: copyHole,
          lostBall: '',
          gir: '',
          holePlayed: false
        }
        let copyRoundTracker = this.state.roundTracker
        copyRoundTracker.push(holeNumber)  
        this.setState({
           roundTracker: copyRoundTracker,
           hole: copyHole
        })
      }
    }
  
  updateHoleInfo = (holeResults) => {

    let { fairway, gir, score,index, lostBall,length,par} = holeResults

    let updatedHole = {
      fairway,
      score,
      index,
      gir,
      lostBall,
      holePlayed: true,
      length,
      par
    }
  
    
    axios.put(`/api/round/${this.state.golferIndex}/${this.state.course}/${Number(this.state.roundIndex)}`, {
      'index': index,
      fairway,
      gir,
      score,
      lostBall}).then(res => {
      console.log(res.data)
    })
    
    if (this.state.newCourse) {
      console.log('hitting newCourse to push distance')
        axios.put(`/api/course/${this.state.course}`,{
          length,
          par
        }).then(res => {(console.log(res.data))})
    }

    

    let copyRoundTracker = this.state.roundTracker
    copyRoundTracker[index -1] = updatedHole
    let copyHole = this.state.hole 
    this.setState({
       roundTracker: copyRoundTracker,
       hole: copyHole++,
    })

    if (Number(this.state.roundTracker.length) === Number(this.state.roundInfo.numOfHoles)) {
      console.log('round should end')
      this.setState({
        golferInfo: true,
        startRound: false,
        roundInfoUpdate: false,
        newCourse: false
      })
      // axios.put(`/api/round/${this.state.golferIndex}` +`/${this.state.course}`)
      return
    }
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
             } else if (this.state.golferInfo) {
                  return <RoundInfoChoice
                          golfer={this.state.golfer}
                          golferIndex={this.state.golferIndex}
                          newUser={this.state.courseSelect}
                          courseSelect={this.courseSelect}/>
            } else if (this.state.roundInfoUpdate && !this.state.newCourse) {
                return <RoundInfoEmpty
                       updateRoundInfo={this.updateRoundInfo} 
                       />
            } else if (this.state.course == 9999) {
                return <CreateCourse
                        createNewCourse={this.createNewCourse}/>
            } else if (this.state.startRound) {
              return <RoundInfo
              course={this.state.roundInfo.course}
              numOfHoles={this.state.roundInfo.numOfHoles}
              scoringGoal={this.state.roundInfo.scoringGoal}
              name={this.state.golfer.name}/>
              // totalScore={this.state.scores.reduce((total,num) => total+ num)}/>
        }
  }  

  render() {
    console.log(`${this.state.roundIndex}`)

    let updatedHoleInfo = {}
    
    let holes = this.state.roundTracker.map((hole,i) => {


      return (
        <div
        key={i}
        >
      {hole.holePlayed ?
          <Hole 
            fairway={hole.fairway}
            score={hole.score}
            index={hole.index}
            gir={hole.gir}
            lostBall={hole.lostBall}
            length={hole.length}
            par={hole.par}/>
            
      :
        <HoleEmpty
          index={hole.index}
          length={hole.yard}
          par={hole.par}
          updateHoleInfo={this.updateHoleInfo}
          updateHoleInfoNewCourse={this.updateHoleInfoNewCourse}
          course={this.state.course}/>
          
      }
      </div>
      )
          
    })

  return (
    <main>
        <div className="App">
             <Nav />
             { this.renderContent() }
             { holes }
        </div>
    </main>
    );
  }
}

export default App;
