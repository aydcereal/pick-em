import classes from './newPool.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Popover,PopoverHeader, PopoverBody, } from 'reactstrap';
import { useState } from 'react';
import { app } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const database = app.database();





export default function  NewPool () {
    


  const [namePopoverOpen, setNamePopoverOpen] = useState(false)
  const [formatPopoverOpen, setFormatPopoverOpen] = useState(false)
  const [pointsPopoverOpen, setPointsPopoverOpen] = useState(false)
  const [startingWeekPopoverOpen, setStartingWeekPopoverOpen] = useState(false)
  const [visibilityPopoverOpen, setVisibilityPopoverOpen] = useState(false)
  const [lockIcon, setLockIcon] = useState(faLock)
  const [privatePool, setPrivatePool] = useState(true)

  const [poolName, setPoolName] = useState('');
  const [poolFormat, setPoolFormat] = useState(0);
  const [pointSpreads, setPointSpreads] = useState(0);
  const [startingWeek, setStartingWeek] = useState(1);
  const [poolVisibility, setPoolVisibility] = useState('');


  

  



  const handleSubmit = (event) =>{
    event.preventDefault();

   

    database.ref('pools').push(
      {
        poolName: poolName,
        poolFormat: poolFormat,
        pointSpreads: pointSpreads,
        startingWeek: startingWeek,
        poolVisibility: poolVisibility
      }
    )
  }



  const nameToggle = () => {
    
    setNamePopoverOpen(!namePopoverOpen)
  }

  const formatToggle = () => {
    setFormatPopoverOpen(!formatPopoverOpen)
  }

  const pointsToggle = () => {
    setPointsPopoverOpen(!pointsPopoverOpen)
  }

  const startingWeekToggle = () => {
    setStartingWeekPopoverOpen(!startingWeekPopoverOpen)
  }

  const visibilityToggle = () => {
    setVisibilityPopoverOpen(!visibilityPopoverOpen)
  }


  

  const handlePoolVisibilityChange = (event) => {
    if (lockIcon === faLock){
     setLockIcon(faLockOpen)
     setPrivatePool(false)
     
    }else {
      setLockIcon(faLock)
      setPrivatePool(true)
    }
    setPoolVisibility(event.target.value)
    
  }

   


    return (
    <div className="content-area">
      <div className="container">
        <form onSubmit={handleSubmit} className="form-horizontal">
          <div className="poolRegister">
            <div className="step">
            <h1>Set up your New Pool</h1>
            <div className='settings'>
              <label className='col-sm-2' htmlFor='pool_name'>Pool Name</label>
              <span className="fa-help" id="poolNameHelp" tabIndex="0">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{ color: '#5d6268' }}
                  />
                </span> 
                <Popover
                  
                  placement="right"
                  isOpen={namePopoverOpen}
                  target="poolNameHelp"
                  toggle={nameToggle}
                  trigger="focus"
                >
                  <PopoverHeader>Pool Name</PopoverHeader>
                  <PopoverBody>A title for your pool</PopoverBody>
                </Popover>
                <input value={poolName} onChange={(event) => setPoolName(event.target.value)} type="text" name="pool_name" id='pool_name' className='form-control'></input>
                
                <div>
                <label className='col-sm-2' htmlFor='pool_format'>Pool Format</label>
                <span className="fa-help" id="poolFormatHelp" tabIndex="0">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{ color: '#5d6268' }}
                  />

                 
                </span> 
                <Popover
                  
                  placement="right"
                  isOpen={formatPopoverOpen}
                  target="poolFormatHelp"
                  toggle={formatToggle}
                  trigger="focus"
                >
                  <PopoverHeader><b>Pool Format</b></PopoverHeader>
                  <PopoverBody>
                  <strong style={{ fontWeight: 'bold', fontSize: '14px' }}>Standard Pick 'em: </strong>  Simply pick winners
                  </PopoverBody>
                  <PopoverBody>
                  <strong style={{ fontWeight: 'bold', fontSize: '14px' }}>Pick 'em with Best Bets: </strong>  Pick winners and select one or more of your picks as a 'Best Bet' that is worth a set number of points (configurable later).
                  </PopoverBody>
                  <PopoverBody>
                  <strong style={{ fontWeight: 'bold', fontSize: '14px' }}>Pick 'em with Confidence Points: </strong>  Pick winners and rank your picks from 16-1 based on your level of confidence. Receive those points for each win.
                  </PopoverBody>
                  
                </Popover>
                <select value={poolFormat} onChange={(event) => setPoolFormat(event.target.value)} name="formatId" id="formatId" className="form-select form-control">
		
                  <option value="1">Standard Pick 'em</option>
                  <option value="2">Pick 'em with Best Bets</option>
                  <option value="3">Pick 'em with Confidence Points</option>
  
                </select>
                </div>

                <div>
                <label className='col-sm-2' htmlFor='pool_points'>Point Spreads</label>
                <span className="fa-help" id="poolPointsHelp" tabIndex="0">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{ color: '#5d6268' }}
                  />
                </span> 
                <Popover
                  
                  placement="right"
                  isOpen={pointsPopoverOpen}
                  target="poolPointsHelp"
                  toggle={pointsToggle}
                  trigger="focus"
                >
                  <PopoverHeader>Pick Objective</PopoverHeader>
                  <PopoverBody>
                  Pick'em pools can be setup to include or ignore the games' point spreads when calculating results.
                  </PopoverBody>
                  
                  
                </Popover>
                <select value={pointSpreads} onChange={(event) => setPointSpreads(event.target.value)} name="spread_option" class="form-select">
                    <option value="0">Not used in making picks</option>
                    <option value="2">Used in making picks, set by RunYourPool</option>
                    <option value="1">Used in making picks, manually set by Commish</option>
                </select>
                </div>

                <div>
                <label className='col-sm-2' htmlFor='pwd'>Starting Week</label>
                <span className="fa-help" id="startingWeekHelp" tabIndex="0">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{ color: '#5d6268' }}
                  />
                </span> 
                <Popover
                  
                  placement="right"
                  isOpen={startingWeekPopoverOpen}
                  target="startingWeekHelp"
                  toggle={startingWeekToggle}
                  trigger="focus"
                >
                  <PopoverHeader>Starting Week</PopoverHeader>
                  <PopoverBody>
                  This is the week that standings will start being calculated for your pool. <em style={{fontStyle:'italic' }}>Note:</em>  This setting can no longer be changed once picks have been made.
                  </PopoverBody>
                  
                  
                </Popover>
                <select value={startingWeek} onChange={(event) => setStartingWeek(event.target.value)} name="starting_week" class="form-select">
        	
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

                <div className='visibility'>
                <label className='col-sm-2' htmlFor='pool_visibility'>Pool Visibility</label>
                <span className="fa-help" id="poolVisibilityHelp" tabIndex="0">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{ color: '#5d6268' }}
                  />
                </span> 
                <Popover
                  
                  placement="right"
                  isOpen={visibilityPopoverOpen}
                  target="poolVisibilityHelp"
                  toggle={visibilityToggle}
                  trigger="focus"
                >
                  <PopoverHeader>Pool visibility</PopoverHeader>
                  <PopoverBody>
                  This controls who can see your pool and who is allowed to join it.
                  </PopoverBody>
                  
                  
                </Popover>
                <div>
                  <FontAwesomeIcon
                      className='fas'
                      icon={lockIcon}
                      style={{ color: 'black' }}
                    />

                  <select 
                    value={poolVisibility} 
                    class="form-select" id="selectVisibility" 
                    name="visibility" 
                    onChange={handlePoolVisibilityChange}>
                      
                      <option value="0">Private</option>
                      <option value="1">Public</option>
                  </select>
                </div>
                
                </div>
                <button type="submit" class="btn btn-danger btn-lg" >
                  Create a Pool
                </button>
                {privatePool ? <div id="txtPrivate" >
                  <div class="small-text">Private pools</div>
                  <ul class="small-text text-ul">
                    <li>Users may only join from your direct invite </li>
                    <li>You must accept any user that asks to join via your invite link</li>
                    <li>Your pool will not automatically be visible to your connections</li>
                  </ul>
              </div>:(
                  <div id="txtPublic" class="small-text">
                  <div class="small-text">Public pools</div>
                  <ul class="small-text small-text text-ul">
                    <li>Visible to your connections and 1st connections of pool members</li>
                    <li>Option to promote to other RunYourPool members</li>
                    <li>You must accept any user that asks to join.</li>
                  </ul>
                </div>
              ) }
                
            </div>
            </div>
          </div>

        </form>

      </div>
      
     
    </div>
  );
}