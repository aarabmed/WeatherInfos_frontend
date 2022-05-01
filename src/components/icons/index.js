import React from 'react';
import  CelsiusSVG  from "./components/celcius"
import  FarenHeitSVG  from "./components/fahrenheit"
import  HumiditySVG  from "./components/humidity"
import  PressureSVG  from "./components/pressure"
import  WindSpeedSVG  from "./components/windSpeed"
import  LocationSVG  from "./components/location"
import WindDirectionSVG from "./components/windDirection"
import Icon from "@ant-design/icons"

const CustomIcon=(icon)=> <Icon component={icon}/>
const CelsiusIcon =()=> CustomIcon(CelsiusSVG)
const FarenHeitIcon =()=> CustomIcon(FarenHeitSVG)
const HumidityIcon =()=> CustomIcon(HumiditySVG)
const PressureIcon =()=> CustomIcon(PressureSVG)
const WindSpeedIcon =()=> CustomIcon(WindSpeedSVG)
const LocationIcon =()=> CustomIcon(LocationSVG)
const WindDirectionIcon =()=> CustomIcon(WindDirectionSVG)

export {
    CelsiusIcon,
    FarenHeitIcon,
    HumidityIcon,
    PressureIcon,
    WindSpeedIcon,
    LocationIcon,
    WindDirectionIcon
}