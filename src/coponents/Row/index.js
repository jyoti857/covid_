import React, {useState} from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

const Row = props => {

  const {state, index, total, reveal, districts} = props;

  // const [state, setState] = useState(props.state);
  // const [districts, setDistricts] = useState(props.districts);
  console.log(" row state --->", state);
  return(
    <React.Fragment>
      <tr>
        <td style = {{fontWeight: 800, fontSize: 12}}>
          <div className = 'table__title-wrapper' style = {{display: 'flex', 
        flexDirection: 'row'}}>
            <span 
              className = {`dropdown ${reveal ? 'rotateRightDown': 'rotateDownRight'}`}
            >
              <Icon.ChevronRight size = {10}/>
            </span>
            <div>
              {state ? state.state: "no state"}
              {state && state.state === 'West Bengal' && (
              <Link to = '/faq'><Icon.HelpCircle className ='height-22' size = {9}/></Link>
              )}
            </div>
          </div>
        </td>
        <td style = {{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <span style = {{fontSize:10, color: 'red', margin: 2,}}> 
            {state && state.deltaconfirmed > 0 && <Icon.ChevronUp size = {10} color='red'/>}
            {state && state.deltaconfirmed > 0 ? `${state && state.deltaconfirmed}`: ''}
          </span>
          <span style = {{ display: 'flex', justifyContent: 'flex-end', marginRight: 4}}>
            {state && state.confirmed && parseInt(state.confirmed) === 0 ? "-" : state  && state.confirmed}
          </span>
        </td>
        <td>
          <div style = {{display: 'flex', flexDirection:'row-reverse'}}>
            <span>
              {state && parseInt(state.active) === 0 ? '-': state && state.active}
            </span>
          </div>
        </td>
        <td style = {{display: 'flex', justifyContent: 'flex-end'}}>
          <span style = {{fontSize: 10, margin:2, color: '#24d81d'}}>
            {state && state.deltarecovered > 0 && <Icon.ArrowUp size={10} color = '#24d81d'/>}
            {state && state.deltarecovered > 0 ? `${state.deltarecovered}` : ''}
          </span>
          <span>
            {state && parseInt(state.recovered) === 0 ? '-': state && state.recovered}
          </span>
        </td>
        <td>
        <div style = {{display: 'flex', justifyContent : 'flex-end'}}> 
          <span style = {{fontSize: 10, margin : 2}}> 
            {state && state.deltadeaths > 0 && <Icon.ArrowUp size={10} color = 'grey'/>}
            {state && state.deltadeaths > 0 ? `${state.deltadeaths}`: ''}
          </span>
          <span>
            {state && parseInt(state.deaths) === 0 ? '-': state && state.deaths}
          </span>
        </div>
        </td>
      </tr>

    </React.Fragment>
  )
}
export default Row;
