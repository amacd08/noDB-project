let golfCourse = require('./dataFolder/courses')
let golferList= require('./dataFolder/golfer')

let golfers = golferList.slice()

let id = 1  

module.exports = {
    getAllCourses: (req,res) => {
        let courseList = Object.keys(golfCourse)
        res.send(courseList)    },

    getCourse: (req,res) => {
        courseID = req.params.id
        let courseList = Object.keys(golfCourse)
        let  course = courseList.filter(courseName => {
            return courseID === courseName            
        })
        return res.send(golfCourse[courseID])
        // axios.get(`/api/course/${courseName}`).then(res => {
    },

    getHole: (req,res) => {
        let courseID = req.params.id
        let holeID = +req.params.hole -1
        res.send(golfCourse[courseID][holeID])
    },
    getGolfer:(req,res) => {
        golferID = req.params.id
        index = 0
        todaysGolfer = golfers.find((golfer,i) => {
            if (golfer.name === golferID) {
                index = i
                return golfer
            }
        })
        if (todaysGolfer) {
            let newGolfer=false
            res.send({todaysGolfer,index,newGolfer})
        } else {
            todaysGolfer = {
                name: golferID,
                rounds: {},
            }
            let newGolfer = true
            golfers = [...golfers, todaysGolfer]
            res.send({todaysGolfer, index, newGolfer})

        }
    },
    getGolferRound: (req,res) => {
        index = req.params.index
        golferID = req.params.id
        golferRound = req.params.round
        let roundIndex = 0
        golfer = golfers[index]

        chosenRound = golfer.rounds.find((round, i) => {
            if (round.course === golferRound) {
                roundIndex = i
                return round
            }
        })
        if (chosenRound) {
            res.send({chosenRound, roundIndex})
        } else {
            res.send('failed')
        }
    },

    addCourse: (req,res) => {
        course = req.params.id
        golfCourse[course] = []
        res.status(200).send(course)
        },

    
    addRound: (req,res) => {
        today = new Date()
        day = today.getDate()
        month = today.getMonth()
        date = month.toString()+ day.toString() 
        golferIndex = req.params.golfer
        courseID = req.params.course
            newRoundID =  golfers[golferIndex].roundID++
            golfers[golferIndex].rounds.push(
                {
                    'course': courseID,
                    'id': newRoundID,
                    'date': date
                })
            newRoundIndex = golfers[golferIndex].rounds.length 
            // golfers[index].rounds[newRoundIndex]['date'] = date
            // golfers[index].rounds[newRoundIndex]['id'] = newRoundID
            golfers[golferIndex].rounds[newRoundIndex -1][courseID] = []
            res.send({ newRoundIndex,})
    },

    addHoleToRound: (req,res) => {
        console.log(golfers[0].rounds)
        golferIndex = req.params.golfer
        courseID = req.params.course
        roundIndex = Number(req.params.roundIndex)
        console.log(roundIndex)
        score = req.body
        golfers[golferIndex].rounds[newRoundIndex - 1][courseID].push(req.body)
        console.log(golfers[golferIndex].rounds[newRoundIndex - 1])

    },

    addHole: (req,res) => {
        let courseID = req.params.id
        let par = req.body.par
        let yard = req.body.yard
        console.log(golfCourse)
        golfCourse[courseID].push({
            par,
            yard
        })
        res.send(golfCourse[courseID])
    },
        
    updateRound: (req,res) => { 
        fairway = req.body.fairway,
        gir = req.body.gir,
        lostBall = req.body.lostBall,
        score = req.body.score,
        index = req.params.index
        roundIndex = req.params.round
        course = req.params.course
        hole = req.params.hole
        golfers[index].rounds[roundIndex][course].push({
            hole,
            score,
            fairway,
            gir,
            lostBall,
        })

        res.send(golfers[index].rounds[roundIndex][course])
    }

}

