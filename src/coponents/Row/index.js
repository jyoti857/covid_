import React, {useState} from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

const Row = props => {

  const {state, index, total, reveal, districts} = props;

  // const [state, setState] = useState(props.state);
  // const [districts, setDistricts] = useState(props.districts);
  // console.log(" row state --->", props.districts);

  const [sortData, setSortData] = useState({
    sortColumn: localStorage.getItem('district.sortColumn') ? 
              localStorage.getItem('district.sortColumn') : 'confirmed',
    isAscending: localStorage.getItem('district.isAscending') ?
              localStorage.getItem('district.isAscending') === 'true' : 'false',
  });
  console.log("localStowrage -->", sortData);

  const [sortedDistricts, setSortedDistricts] = useState({});
  // setSortedDistricts(props.districts);
  // console.log("sorted districts -->", districts);

  const districts_ = districts && 
        Object.keys(districts).filter(dis => dis.toLowerCase() !== 'unknown');
          
  // console.log("fileter sss --->", districts);

  const handleReveal =  () => {
    props.handleReveal(props.state.state);
  }

  const handleSort = column => {
    const isAscending = sortData.sortColumn === column ? !sortData.isAscending 
              : sortData.column === 'district';
    setSortData({
      sortColumn: column, 
      isAscending
    });
    localStorage.setItem('district.sortColumn', column);
    localStorage.setItem('district.isAscending', isAscending);
  }
  return(
    <React.Fragment>
      <tr>
        <td style = {{fontWeight: 800, fontSize: 12}}>
          <div className = 'table__title-wrapper' style = {{display: 'flex', 
        flexDirection: 'row'}}>
            <span 
              className = {`dropdown ${reveal ? 'rotateRightDown': 'rotateDownRight'}`}
              onClick = {handleReveal}
            > 
              <Icon.ChevronDown size = {10}/>
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
            {state && state.deltaconfirmed > 0 && <Icon.ArrowUp size = {10} color='red'/>}
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

      {/* once  state arrow is pressed  */}
      {/* <tr className = {'state-last-update'} style = {{display: props.reveal && !props.total ? '': 'none'}}>
        <td colSpan = {2}>
          <div className = 'last-update'>
            <h6>Last updated about 20mins ago</h6>
          </div>
        </td>
      </tr> */}
      <tr className = {`district-heading`}  
          style= {{display: props.reveal && !props.total ? '' : 'none', 
           flexDirection: 'row'}}>
        <td onClick = {e => handleSort('district')}>
          <div className = 'heading-content'>
            <abbr title = 'District'>DISTRICT</abbr>
            <div style = {{display: sortData.sortColumn === 'district'? 'initial':'none'}}>
              {sortData.isAscending ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
            </div>
          </div>
        </td>
        <td onClick = {e => handleSort('confirmed')}>
          <div className = 'heading-content'>
            <abbr title = 'Confirmed'>CONFIRMED</abbr>
            <div style = {{display: sortData.sortColumn === 'confirmed' ? 'initial' : 'none'}}>
              {sortData.isAscending? <Icon.ChevronUp /> : <Icon.ChevronDown />}
            </div>
          </div>
        </td>
      </tr>
      {
        districts_ && districts_.map((district, i) => {
          if(district.toLocaleLowerCase() !== 'unknown') {
            return(
              <tr style = {{display: props.reveal && !props.total ? '' : 'none', 
                          background: i % 2 === 0 ? '#f8f9fa':'',}}
                  key = {i}
                  className = {`district`}  
                >
                <td style = {{fontWeight: 600, fontSize:10}}>{district}</td>
                <td style = {{display: 'flex', flexDirection: 'row-reverse'}}>
                  <div>
                    <span> {
                        districts[district] && districts[district].delta.confirmed > 0
                          && <Icon.ArrowUp size = {10} color =  'red'/>}</span>
                    <span style = {{fontSize: 10, color: 'red'}}>
                      {districts[district] && districts[district].delta.confirmed > 0
                        && districts[district].delta.confirmed}
                    </span>
                    <span>{districts[district] && districts[district].confirmed}</span>
                  </div>
                </td>
              </tr>
            )
          }
          return null;
        })
      }
    </React.Fragment>
  )
}
export default Row;
