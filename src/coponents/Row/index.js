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
        <td style = {{fontWeight: 800}}>
          <div className = 'table__title-wrapper'>
            <span 
              className = {`dropdown ${reveal ? 'rotateRightDown': 'rotateDownRight'}`}
            >
              <Icon.ChevronDown/>
            </span>
          {state ? state.state: "no state"}
          {state && state.state === 'West Bengal' && (
          <Link to = '/faq'><Icon.HelpCircle className ='height-22' /></Link>
          )}
          </div>
        </td>
        <td>
          <span> 
            {state && state.deltaconfirmed > 0 && <Icon.ChevronUp/>}
            {state && state.deltaconfirmed > 0 ? `${state && state.deltaconfirmed}`: ''}
          </span>
          <span>
            {state && state.confirmed && parseInt(state.confirmed) === 0 ? "-" : state  && state.confirmed}
          </span>
        </td>
        <td>
          <span>
            {state && parseInt(state.active) === 0 ? '-': state && state.active}
          </span>
        </td>
        <td>
          <span>
            {state && state.deltarecovered > 0 && <Icon.ArrowUp/>}
            {state && state.deltarecovered > 0 ? `${state.deltarecovered}` : ''}
          </span>
          <span>
            {state && parseInt(state.recovered) === 0 ? '-': state && state.recovered}
          </span>
        </td>
        <td> 
          <span> 
            {state && state.deltadeaths > 0 && <Icon.ArrowUp/>}
            {state && state.deltadeaths > 0 ? `${state.deltadeaths}`: ''}
          </span>
          <span>
            {state && parseInt(state.deaths) === 0 ? '-': state && state.deaths}
          </span>
        </td>
      </tr>

    </React.Fragment>
  )
}
export default Row;
