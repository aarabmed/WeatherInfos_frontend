import React,{useState,useEffect} from 'react';
import Select from 'react-select'
import moment from 'moment'
import Spinner from '../spinner';
import {useQuery} from "@apollo/client"
import { GET_CITY, GET_CITY_WEATHER } from "graphql/query/weather"
import { CelsiusIcon,FarenHeitIcon,PressureIcon,HumidityIcon,WindSpeedIcon,WindDirectionIcon} from '../icons';

function Body() {
  const [location, setLocation] = useState('');
  const [seletedlocation, setSelectLocation] = useState('');
  
  const [options, setOptions] = useState([]);


  const { data, loading } = useQuery(
    GET_CITY_WEATHER,{
      variables: {
        city: seletedlocation,
      }
    }
  );

  const { data:cities, loading:loadingCity } = useQuery(
    GET_CITY,{
      variables: {
        city: location,
      }
    }
  );

  


  
  const getDay=(epoch)=>{
    const day = moment.unix(epoch).format('dddd')
    return day
  }

  useEffect(()=>{
    if(cities){
      console.log('cities:',cities)
      const sanitizeOptions=cities.city.map((option)=>({value:option.cityName,label:<>
                {option.cityName} - <span style={{color:'gray', fontSize:'12',fontWeight:"bold"}}>{option.country.countryName} {`(${option.country.native_name})`}  </span>
                <span><img src={option.country.flag} alt={option.country.countryName} style={{height:'12px'}}/></span>
              </>}))
      setOptions(sanitizeOptions)
    }
  },[data,cities])


  const onChangeLocation = (value) => {
    console.log('value:',value)
    if(value.length>2){
      console.log('value:',value)
      setLocation(value)
    }
  };

  const onSelectOption = ({value})=>{
    setSelectLocation(value);
  }

  
  const Content = ()=>{
    if(loading)return <><Spinner/></>
    if(data&&data.weather.status===200){
      const { day_chance_of_rain,wind_Speed_Mph,status,temp_Fahrenheit,temp_Celsius,wind_Speed_Kph, wind_direction,humidity,pressure_millibars,pressure_inHg,/* is_day_time,location_name,location_country */} =data.weather.data.current;
      const { forecast } = data.weather.data;
      return <>
        <div className="image-preview">
          <img src={status.icon} alt={status.description}/>
          <div className="rain-chance"><span>{day_chance_of_rain}%</span><img className="rain" src='/assets/images/water.png' alt="rain"/></div>
        </div>
        <div className="details">
            <h3>Today</h3>
            <ul className="current">
              <li><div className="grp">
                  <div className="item"><span>{temp_Celsius}</span><CelsiusIcon/></div>
                  <div className="item"><span>{temp_Fahrenheit}</span><FarenHeitIcon/></div>
                </div>
              </li> 
              <li><div className="grp">
                  <div className="item"><span>{wind_Speed_Kph} Kph</span><WindSpeedIcon/></div>
                  <div className="item"><span>{wind_Speed_Mph} Mph</span><WindSpeedIcon/></div>
                </div>
              </li>

              <li><div className="grp">
                  <div className="item"><span>{wind_direction}</span><WindDirectionIcon/></div>
                  <div className="item"><span>{humidity}%</span><HumidityIcon/></div>
                </div>
              </li> 
              <li><div className="grp">
                  <div className="item"><span>{pressure_millibars} Mbar</span><PressureIcon/></div>
                  <div className="item"><span>{pressure_inHg} inHg</span><PressureIcon/></div>
                </div>
              </li>              
  
    
            </ul> 
            <ul className="forecast">
                {forecast.map((day,index)=><div className="day" key={index}>
                      <span>{getDay(day.date_epoch)}</span>
                      <div className="temperature">
                        <div className="temp-c">
                            <span>{day.maxtemp_c} C°</span>
                            <span>{day.mintemp_c} C°</span>
                        </div>
                        <img src={day.status.icon} alt={day.status.description}/>
                        <div className="temp-f">
                            <span>{day.maxtemp_f} F°</span>
                            <span>{day.mintemp_f} F°</span>
                        </div>
                      </div>
                      <span>{day.daily_chance_of_rain}%</span>
                </div>)}
            </ul>
        </div>
      </>
    }
    return <>
        <span>Type a city to get the latest weather news update</span>
    </>
  }

  const colourStyles = {
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? '#27abfa85'
          : undefined,  
        /* ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? 'red'
              : 'yellow'
            : undefined,
        }, */
      };
    }
  }

  return (
    <div className="body-wrapper">
      <div className="header">
        <div className="search-input">
          <Select
            isSearchable
            options={options}
            placeholder="Search a City"
            onInputChange={onChangeLocation}
            onChange={onSelectOption}
            isLoading={loadingCity}
            styles={colourStyles}
          /> 

        </div>
      </div>
      <div className="content">
        <div className="content-wrapper">
          <Content/>
        </div>
      </div>
    </div>
  );
}

export default Body;


