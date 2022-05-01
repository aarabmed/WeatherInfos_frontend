import {gql} from "@apollo/client"

export const GET_CITY_WEATHER = gql`
        query ($city:String!){
            weather(cityName:$city) {   
                ...on weatherResponse{
                    data{
                        forecast {
                            date_epoch
                            maxtemp_c
                            maxtemp_f
                            mintemp_c
                            mintemp_f
                            daily_chance_of_rain
                            status {
                              description
                              icon
                            }
                          }
               
                          current {
                            day_chance_of_rain
                            localTime
                            temp_Celsius
                            temp_Fahrenheit
                            is_day_time
                            status {
                              description
                              icon
                            }
                            wind_Speed_Kph
                            wind_Speed_Mph
                            wind_direction
                            humidity
                            pressure_millibars
                            pressure_inHg
                            last_updated
                            location_name
                            location_country
                          }
                    }
                    status
                }
                ... on notFoundResponse{	
                    status
                } 
            }
        }
`


export const GET_CITY = gql`
    query($city:String!){
        city(cityName:$city) {
            cityName
            country {
              countryName
              native_name
              flag
            }
        }
    }
`

