import classes from './newPool.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Popover,PopoverHeader, PopoverBody } from 'reactstrap';
import { useState } from 'react';





export default function  NewPool () {
    

  // missing useState for popover
  const [popoverOpen, setPopoverOpen] = useState(false)

  const toggle = () => {
    setPopoverOpen(!popoverOpen)
  }

   


    return (
    <div className="content-area">
      <div className="container">
        <form className="form-horizontal">
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
                  isOpen={popoverOpen}
                  target="poolNameHelp"
                  toggle={toggle}
                  trigger="focus"
                >
                  <PopoverHeader>Pool Name</PopoverHeader>
                  <PopoverBody>A title for your pool</PopoverBody>
                </Popover>
                <input type="text" name="pool_name" id='pool_name' className='form-control'></input>
                
                <div>
                <label className='col-sm-2' htmlFor='pool_name'>Pool Format</label>
                <span className="fa-help" id="poolFormatHelp" tabIndex="0">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{ color: '#5d6268' }}
                  />
                </span> 
                <Popover
                  
                  placement="right"
                  isOpen={popoverOpen}
                  target="poolFormatHelp"
                  toggle={toggle}
                  trigger="focus"
                >
                  <PopoverHeader>Pool Format</PopoverHeader>
                  <PopoverBody>A title for your pool</PopoverBody>
                </Popover>
                <select name="formatId" id="formatId" className="form-select form-control">
		
                  <option value="1">Standard Pick 'em</option>
                  <option value="2">Pick 'em with Best Bets</option>
                  <option value="3">Pick 'em with Confidence Points</option>
  
                </select>
                </div>
            </div>
            </div>
          </div>

        </form>

      </div>
      
     
    </div>
  );
}