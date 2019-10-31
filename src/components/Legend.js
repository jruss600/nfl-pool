import React from 'react';

const Legend = () => {
    return(
        <div className="container">
            <h5><strong>Legend:</strong></h5>
            <div className="row" style={{margin: '2px 150px 20px 150px'}}>
                <div className="col-sm projWin"><span style={{verticalAlign: 'middle'}}>Projected Win</span></div>
                <div className="col-sm projLoss"><span style={{verticalAlign: 'middle'}}>Projected Loss</span></div>
                <div className="col-sm win"><span style={{verticalAlign: 'middle'}}>Win</span></div>
                <div className="col-sm loss"><div>Loss</div></div>
            </div>
        </div>
    );
}

export default Legend;