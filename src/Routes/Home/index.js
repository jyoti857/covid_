import React, {useState, useEffect} from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import Status from '../../coponents/Status';
import Table from '../../coponents/Table';
import axios from 'axios';

const Home  = props => {

  // console.log(props);

  const [states, setStates] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [lastUpdated, setLastUpdated] = useState([]);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [activityLog, setActivityLog] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if(fetched === false){
      getStates();
    }
  }, [fetched]);

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
      // console.log("response --->", response);
    }catch(err){
      console.log(err);
    }
  }
  // console.log("state ", states, timeSeries, lastUpdated, stateDistrictWiseData);
  return (
    <div>
      {/* <NavLink to='/' activeStyle = {{fontWeight: 'bold', color: 'blue'}} >Ho22me</NavLink> */}
      <div style = {{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
      <div style = {{marginTop: 80, marginLeft: 320}}>
        <div style = {{fontWeight: 'bold', color: '#000'}}>INDIA COVID-19 TRACKER</div>
        <div style = {{fontSize: 10, color: 'grey'}}>A CROWDSOURCED INITIATIVE</div>
      </div>
      <div style = {{marginRight: 330, marginTop: 83, fontSize: 10}}>
        <div style = {{color: '#78ff33', fontWeight: 800}}>LAST UPDATED</div>
        <div style = {{color: '#33ff70'}}>26 MINUTES AGO</div>
        <div style = {{color: '#33ff70'}}>07 APR, 20:45 IST</div>
      </div>
      </div>
      <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          width: '50%', marginLeft: 250, marginTop: 20
        }}>
        <Status statusColor = 'red' statusName='CONFIRMED' newCount = '[+537]' totalCount = '5330'/>
        <Status statusColor = 'blue' statusName='ACTIVE' newCount = '' totalCount = '4730'/>
        <Status statusColor = '#33ff70' statusName='RECOVERED' newCount = '[+537]' totalCount = '5330'/>
        <Status statusColor = 'grey' statusName='DECEASED' newCount = '[+20]' totalCount = '150'/>
      </div>
      <Table states = {states || ['sds', 'dsds']} />
    </div>
  )
}

export default Home;