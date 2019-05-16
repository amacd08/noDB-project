import React from 'react'

const OldRound = (props) => {
    let {fairway, score, gir, lostBall, hole} = props.holeInfo
    console.log(props.hole)
    return(
            <div className='holeCard'
            style={
                {
      'background':hole % 2 === 0 ? '#454955': '#F3EFF5'  
                }}>
            <header className="holedHeader">
                    <div className='holeNumber'>
                        <h2>{hole }</h2>
                    </div>
                    <div className='headerScore'>
                        <div className="holeScore">
                            <h2>{`Par ${props.course.par}`}</h2>
                        </div>
                        <div className="holeScore">
                             <h2>{`Score ${score}`}</h2>
                        </div>
                    </div>
            </header>

            <div className="holeInfoBox">
                <div className="holeInfoColumn"
                  style={
                      {
                          'color': hole %2 === 0 ? 'white' : 'black' 
                      }
                  }>
                   <div className="holeLineBox">
                        <h3>{`${props.course.yard} Yard`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Fairway: ${fairway}`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`GIR: ${gir}`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Score: ${score}`}</h3>
                    </div>
                </div>
                <div className="holeInfoColumn"
                  style={
                    {
                        'color':hole %2 === 0 ? 'white' : 'black'  
                    }
                  }>
                   <div className="holeLineBox">
                        <h3>{`Lost Ball:${lostBall} `}</h3>
                    </div>

                </div>

            </div>
        </div>
    )    

}

export default OldRound

