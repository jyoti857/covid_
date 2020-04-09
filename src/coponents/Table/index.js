import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../../../src/App.scss';
import Row from '../Row';

const Table = props => {

  const [states, setStates]  = useState([]);
  const [districts, setDistricts] = useState({});
  const [count, setCount] = useState(0);
  console.log("tables state983s", props.states[0]);
  // setStates(props.states);
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
              return(
                <Row key = {index} 
                 index = {index}
                 state = {state}
                 total = {false}
                 reveal = {() => {}}
                 districts = {state.state in districts ? districts[state.state].districtData: []}
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
          <Row key = {0} state = {props.states[0]} total={true} />
        </tbody>
        <h5 className="table-fineprint fadeInUp" style={{animationDelay: '1.5s'}}>
        {count} States/UTS Affected
      </h5>
      </table>
      </div>

    </React.Fragment>
  )
}

export default Table;