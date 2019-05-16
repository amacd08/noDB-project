import React from 'react'
import './hole.css'

const Hole = (props) => {
    return(
            <div className='holeCard'
            style={
                {
      'background':props.index % 2 === 0 ? '#F3EFF5' : '#454955'
                }}>
            <header className="holedHeader">
                    <div className='holeNumber'>
                        <h2>{props.index}</h2>
                    </div>
                    <div className='headerScore'>
                        <div className="holeScore">
                            <h2>{`Par ${props.par}`}</h2>
                        </div>
                        <div className="holeScore">
                             <h2>{`Score ${props.score}`}</h2>
                        </div>
                    </div>
            </header>

            <div className="holeInfoBox">
                <div className="holeInfoColumn"
                  style={
                      {
                          'color':props.index %2 === 0 ? 'black' : 'white'
                      }
                  }>
                   <div className="holeLineBox">
                        <h3>{`${props.length} Yards`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Fairway: ${props.fairway}`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Par ${props.par}`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Score ${props.score}`}</h3>
                    </div>
                </div>
                <div className="holeInfoColumn"
                  style={
                    {
                        'color':props.index %2 === 0 ? 'black' : 'white'
                    }
                  }>
                   <div className="holeLineBox">
                        <h3>{`${props.length} Yards`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Fairway: ${props.fairway}`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Par ${props.par}`}</h3>
                    </div>
                    <div className="holeLineBox">
                        <h3>{`Score ${props.score}`}</h3>
                    </div>
                </div>

            </div>
        </div>
    )    

}

export default Hole
    
 





