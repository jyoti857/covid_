import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../../src/App.scss';
import Row from '../Row';

const Table = props => {

  const [states, setStates]  = useState(props.states);
  const [districts, setDistricts] = useState({});
  const [count, setCount] = useState(props.states.length);
  const [revealedStates, setRevealedStates] = useState({}); 
  // console.log("tables state983s", props.states);
  // setStates(props.states);
  let statePositiveCount = 0;

  useEffect(() => {
    if(props.states[0]){
      setRevealedStates(
        props.states.reduce((acc, item) => {
          return{...acc, [item.state]: false}
        }, {})
      );
    }
  }, [props.states]);

  // handle reveal
  const handleReveal = state => {
    setRevealedStates({
      ...revealedStates,
      [state]: !revealedStates[state], 
    });
  };


  useEffect(() => {
    setDistricts(props.stateDistrictWiseData)
  }, [props.stateDistrictWiseData])


  return (
    <React.Fragment>
      <h5 className = 'table-fineprint fadeInUp' style = {{animationDelay: '1.5s'}}>
        Complied from State Govt. numbers <Link to = '/faq'>Know more</Link> 
      </h5>
      <div  style ={{display: 'flex', justifyContent: "center"}}>
      <table style = {{width: props.width}}>
        <thead>
          <tr>
            <th>STATE</th>
            <th>CONFIRMED</th>
            <th>ACTIVE</th>
            <th>RECOVERED</th>
            <th>DECEASED</th>
          </tr>
        </thead>
        <tbody>
          {props.states.map((state, index) => {
            if(index !== 0 && state.confirmed > 0){
              statePositiveCount++;
              return(
                <Row key = {index} 
                 index = {index}
                 state = {state}
                 total = {false}
                 reveal = {revealedStates[state.state]}
                 districts = {state.state in districts ? districts[state.state].districtData: []}
                 handleReveal = {handleReveal}
                />
              )
            }
            return null;  
          })}
        </tbody>
        <tbody>
          {props.states.length > 1 
          // && props.summary === false
           &&(
            <Row key = {0} state = {props.states[0]} total={true} />
            
          )}
        </tbody>
      {/* </div> */}
        <div style = {{display: 'flex', flexDirection: 'row-reverse'}}>
          <div>
            <h5  style={{animationDelay: '1.5s', color: 'gray'}}>
              {statePositiveCount} States/UTS Affected
            </h5>
          </div>
        </div>  
      </table>
    </div>

    </React.Fragment>
  )
}

export default Table;