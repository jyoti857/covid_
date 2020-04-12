import React, {useState, useEffect} from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import Status from '../../coponents/Status';
import Table from '../../coponents/Table';
import axios from 'axios';
import Chart from '../../coponents/Practice/Chart/StatusChart';

const fullDate = new Date().toString().split(' ');
const day = fullDate[0];
const date = fullDate[2];
const month = fullDate[1];
const time = fullDate[4];

const Home  = props => {

  // console.log(props);

  const [states, setStates] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [lastUpdated, setLastUpdated] = useState([]);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [activityLog, setActivityLog] = useState([]);
  const [fetched, setFetched] = useState(false);

  // useEffect(() => {
  //   if(fetched === false){
  //     getStates();
  //   }
  // }, [fetched]);

  useEffect(() => {
    getStates();
    console.log("dsskdls");
  }, []);


  const getStates = async() => {
    try{
      const [response, stateDistrictWiseResponse, updateLogResponse
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/updatelog/log.json')
      ]);

      setStates(response.data.statewise);
      setTimeSeries(response.data.cases_time_series); // validateCTS
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setActivityLog(updateLogResponse.data);
      setFetched(true);
    }catch(err){
      console.log(err);
    }
  }
  // console.log("response --->", stateDistrictWiseData);
  // console.log("state ", states, timeSeries, lastUpdated, stateDistrictWiseData);
  return (
    <div>
      {/* <Chart /> */}
      {/* <NavLink to='/' activeStyle = {{fontWeight: 'bold', color: 'blue'}} >Ho22me</NavLink> */}
      <div style = {{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
      <div style= {{marginTop:30, marginRight:10}}>
        <div style = {{fontWeight: 'bold', color: '#000'}}>INDIA COVID-19 TRACKER</div>
        <div style = {{fontSize: 10, color: 'grey'}}>A CROWDSOURCED*jy INITIATIVE</div>
      </div>
      <div style = {{ marginTop:30, marginLeft:20, fontSize: 10, display: 'flex',
              flexDirection: 'column', justifyContent: 'flex-end'}}>
        <div style = {{color: '#18ca12', fontWeight: 800}}>LAST UPDATED</div>
        <div style = {{color: '#18ca12'}}>ABOUT 26 MINUTES AGO</div>
        <div style = {{color: '#18ca12', fontWeight: 700}}>{`${date} ${month}, ${time}  IST`}</div>
      </div>
      </div>
      <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center',
           marginTop: 20, alignSelf: 'center', 
        }}>
        <Status statusColor = 'red' statusName='CONFIRMED' newCount = {`[+${states[0] && states[0].deltaconfirmed}]`} 
              totalCount = {states[0] && states[0].confirmed}
              />
        <Status statusColor = 'blue' statusName='ACTIVE' newCount = '' 
          totalCount = {states[0] && states[0].active}/>
        <Status statusColor = '#33ff70' statusName='RECOVERED' 
          newCount = {`+[${states[0] && states[0].deltarecovered}]`}
          totalCount = {states[0] && states[0].recovered}/>
        <Status statusColor = 'grey' statusName='DECEASED' 
          newCount = {`+[${states[0] && states[0].deltadeaths}]`} 
          totalCount = {states[0] && states[0].deaths}/>
      </div>
      <div>
        <Table states = {states || ['sds', 'dsds']} 
        stateDistrictWiseData = {stateDistrictWiseData}  
        width={200} />
      </div>
    </div>
  )
}

export default Home;