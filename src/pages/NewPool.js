import classes from './newPool.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Popover,PopoverHeader, PopoverBody } from 'reactstrap';





export default function  NewPool () {
    

  // missing useState for popover

   


    return (
    <div className="content-area">
      <div className="container">
        <form className="form-horizontal">
          <div className="poolRegister">
            <div className="step">
            <h1>Set up your New Pool</h1>
            <div className='settings'>
              <label className='col-sm-2' htmlFor='pool_name'>Pool Name</label>
              <span id="poolNameHelp" tabIndex="0">
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
            </div>
            </div>
          </div>

        </form>

      </div>
      
     
    </div>
  );
}