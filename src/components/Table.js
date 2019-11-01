import React, { Component } from 'react';
import Row from './Row';
import Results from './Results';
import LINES from '../data/lines';
import JOHNPICKS from '../data/johnPicks';

class Table extends Component {

    state = {
        teams: [],
        loaded: false
    };

    componentDidMount() {
        fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?limit=32')
        .then( response => response.json() )
        .then( json => {
            const teamData = json.sports[0].leagues[0].teams;
            let teams = [];
            teamData.map( ( team, i ) => {
                return(
                    teams.push( {
                    id: i,
                    team: team.team.abbreviation,
                    wins: team.team.record.items[0].stats[1].value,
                    gamesPlayed: team.team.record.items[0].stats[8].value,
                    logo: team.team.logos[0].href
                } )
                );
            } );
            this.setState( { teams, loaded: true } );
        } )
        .catch( error => {
            alert( 'Error: ', error )
        });
    }

    findWinner = () => {
        const { teams } = this.state;
        let justinProjWins = 0;
        let johnProjWins = 0;
        teams.forEach( team => {
            let projWins = Math.round(16 * ( team.wins / team.gamesPlayed ));
            let line = LINES[team.team];
            if ( (projWins > line && JOHNPICKS[team.team] === 'OVER') || (projWins < line && JOHNPICKS[team.team] === 'UNDER') ) {
                johnProjWins++
            } else if ((projWins < line && JOHNPICKS[team.team] === 'OVER') || (projWins > line && JOHNPICKS[team.team] === 'UNDER')){
                justinProjWins++
            }
        })
        return justinProjWins === johnProjWins ? `It's a draw` : (justinProjWins >= johnProjWins ? `John owes Justin $${5*(justinProjWins - johnProjWins)}` : `Justin owes John $${5*(johnProjWins - justinProjWins)}`);
    }

    render() {
        const { teams, loaded } = this.state;
        if( loaded ){
            return(
                <div className="container">
                    <Results result={this.findWinner()}/>
                    <table className="table fixed_header">
                        <thead style={{textAlign: 'center'}}>
                            <tr>
                                <th scope="col">Logo</th>
                                <th scope="col">Team</th>
                                <th scope="col">Line</th>
                                <th scope="col">Wins</th>
                                <th scope="col">Projected</th>
                                <th scope="col">John</th>
                                <th scope="col">Justin</th>
                            </tr>
                        </thead>
                        <tbody style={{overflowY: 'auto'}}>
                            { teams.map( team => 
                                <Row 
                                    key={ team.id } 
                                    team={ team } 
                                    line={ LINES[team.team] }
                                    johnPick={ JOHNPICKS[team.team] }
                                    justinPick={ JOHNPICKS[team.team] === 'OVER' ? 'UNDER' : 'OVER' }
                                />
                                )
                            }
                        </tbody>
                    </table> 
                </div>
            )
        } else {
            return(
                <div>Loading...</div>
            )
        }
    }
}

export default Table;