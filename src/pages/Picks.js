import React, { useEffect, useState } from 'react';
import ProgressCircle from "../components/ProgressCircle";
import '@fortawesome/fontawesome-free/css/all.css';
import classes from './picks.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import TeamData from './TeamData';

const Picks = () => {
    const [matchData, setMatchData] = useState([])

    useEffect(() => {
        TeamData(10).then(data => {
            setMatchData(data)
        })

    }, [])

    console.log(matchData);


    

    return (
        <div className="content-area">
            <div className="container">
                <div className="wholeWrapper">
                    <div className="stickyLeftWrapper">
                        <h1>POOL MEMBERS' PICKS FOR WEEK 10 </h1>
                        <div className="header row">
                            <ProgressCircle 
                                progress={100} 
                                gradientColor={'gray'} 
                                id={'gray'}
                                title={"Active Entries"}
                                action={"View all members"}
                                value={2}
                            ></ProgressCircle>
                            <ProgressCircle 
                                progress={50} 
                                gradientColor={'green'} 
                                id={'green'}
                                title={"Week 11 Picks in"}
                                action={"View members with picks"}
                                value={1}
                            ></ProgressCircle>
                            <ProgressCircle 
                                progress={50} 
                                gradientColor={'red'} 
                                id={'red'}
                                title={"Week 11 Picks not in"}
                                action={"View members without picks"}
                                value={1}
                            ></ProgressCircle>
                            <div className="col-12 col-md-4 noprint form-horizontal">
                                <div style={{marginBottom: '14px',textAlign:'right'}} className="noprint">
                                    <a className="btn btn-outline-danger btn-sm">
                                        <FontAwesomeIcon icon={faPrint} />
                                        &nbsp;&nbsp;Printable Version
                                    </a>
                                    &nbsp;&nbsp;    
                                    <a className="btn btn-outline-danger btn-sm">
                                        <FontAwesomeIcon icon={faFileExcel} />
                                        &nbsp;&nbsp;Export to CSV
                                    </a>
                                </div>
                                <form className='row'>
                                    <label htmlFor="week" className='col-sm-4 col-form-label'>Select a week:</label>
                                    <div className="col-md-8" style={{marginBottom: '10px'}}>
                                        <select className="form-select" name="week" id="week">
                                            <option value="1">Week 1</option>
                                            <option value="2">Week 2</option>
                                            <option value="3">Week 3</option>
                                            <option value="4">Week 4</option>
                                            <option value="5">Week 5</option>
                                            <option value="6">Week 6</option>
                                            <option value="7">Week 7</option>
                                            <option value="8">Week 8</option>
                                            <option value="9">Week 9</option>
                                            <option value="10">Week 10</option>
                                            <option value="11">Week 11</option>
                                            <option value="12">Week 12</option>
                                            <option value="13">Week 13</option>
                                            <option value="14">Week 14</option>
                                            <option value="15">Week 15</option>
                                            <option value="16">Week 16</option>
                                            <option value="17">Week 17</option>
                                            <option value="18">Week 18</option>

                                        </select>
                                    </div>
                                </form>
                                <form className='row'>
                                    <label htmlFor="week" className='col-sm-4 col-form-label'>Select a week:</label>
                                    <div className="col-md-8" style={{marginBottom: '10px'}}>
                                        <select className="form-select" name="sort" id="sort">
                                            <option value="1">Entry Name</option>
                                            <option value="2">YTD Standings</option>
                                            <option value="3">Weekly Standing</option>
                                            

                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="well noprint">
                        <strong>Note:</strong>
                            All picks will appear in the grid below after the pick deadline passes 
                            (usually Sunday at 1:00 pm ET). Earlier game picks will show up once the 
                            game has started and picks for that game can't be added or changed.
                    </div>
                    <div className="table-responsive">
                        <table border='0' cellPadding='0' cellSpacing='0' id='picksTable'>
                            <thead>
                                <tr>
                                    <td className="sticky headcell" width='100' >
                                        <span className="n">
                                            <b>ENTRY NAME</b>
                                        </span>
                                        <span className="pts">Weekly Points</span>
                                    </td>
                                    <td className="sticky headcell" width='40' align='center' valign='bottom'>
                                        <strong>
                                            CIN
                                            <br />
                                            at
                                            <br />
                                            BAL
                                        </strong>
                                    </td>
                                </tr>
                                <tr>
                                    
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Picks;
