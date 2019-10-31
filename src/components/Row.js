import React from 'react';
import PropTypes from 'prop-types';

const Row = ( { team, line, johnPick, justinPick } ) => {
    const { logo, wins, gamesPlayed } = team;
    const projectedWins = Math.round( 16 * ( wins / gamesPlayed ) );

    const applyHighlighting = ( pick ) => {
        const projWin = { backgroundColor: 'rgba(0, 255, 0, 0.1)' };
        const projLoss = { backgroundColor: 'rgba(255, 0, 0, 0.1)' };
        const lockWin = { backgroundColor: 'rgba(0, 255, 0, 0.4)' };
        const lockLoss = { backgroundColor: 'rgba(255, 0, 0, 0.4)' };
        if( wins > line ) { return pick === 'OVER' ? lockWin : lockLoss }
        if( wins + ( 16 - gamesPlayed ) < line ) { return pick ==='UNDER' ? lockWin : lockLoss }
        if( projectedWins > line ) { return pick === 'OVER' ? projWin : projLoss }
        if (projectedWins < line ) { return pick === 'UNDER' ? projWin : projLoss }
    }

    return(
        <tr style={{textAlign: 'center'}}>
            <th scope="row"><img src={ logo } style={ { width: '30px', height: '30px' } } alt={team.team}/></th>
            <td>{team.team }</td>
            <td>{ line }</td>
            <td>{ wins }</td>
            <td>{ projectedWins }</td>
            <td id="john" style={ applyHighlighting( johnPick ) }>{ johnPick }</td>
            <td id="justin" style={ applyHighlighting( justinPick ) }>{ justinPick }</td>
        </tr>
    )
}

Row.propTypes = {
    team: PropTypes.object.isRequired,
    line: PropTypes.number.isRequired,
    johnPick: PropTypes.string.isRequired,
    justinPick: PropTypes.string.isRequired
}

export default Row;
