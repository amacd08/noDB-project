import React from 'react'
import './RoundInfo.css'
const RoundInfo = (props) => {
        return(
            <div className="roundInfoBox">
                <div className="completedRoundInfoColumn">
                    <div className="lineBox">
                        <div className="box">
                            <h2>{props.name}</h2>
                        </div>
                    </div>
                    <div className="lineBox">
                        <div className="box">
                            <h2>{props.courseName}</h2>
                        </div>
                    </div>
                    <div className="lineBox">
                        <div className = "box">
                            <h2>{`${props.numOfHoles} Holes`}</h2>
                        </div>
                    </div>
                    <div className="lineBox">
                        <div className="box">
                            <h2>{`Goal: ${props.scoringGoal}`}</h2>
                        </div>
                    </div>
                </div>
                <div className="roundTotal">
                    <h2>Total:92</h2>
                </div>


            </div>
        )
    
}

export default RoundInfo