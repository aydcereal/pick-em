import classes from './dashboard.css'


export default function  Dashboard () {
    


   


    return (
    <div className="container">
      <div className='content'>
        <div className='components_content'>
          <div className='headingcontainer'>
              <h1 className='heading'>Dashboard</h1>
              <span class="MediaQuery__DesktopAndTablet-sc-fq8rbh-1 ctrAiT">
                <div class="components__Actions-sc-1vzvvyw-0 kLOosM">
                  <span class="MediaQuery__DesktopAndTablet-sc-fq8rbh-1 ctrAiT">
                    <div class="components__PrimaryActionsContainer-sc-z2kgx9-5 iDXZYX">
                      <a data-test-id="dashboardStartAPoolButton" 
                         class="sc-ispOId dEelEV" 
                        href="/pools/start">Start A Pool
                      </a>
                    </div>
                  </span>
                </div>
              </span>
          </div>
          
        </div>
      </div>
      
     
    </div>
  );
}