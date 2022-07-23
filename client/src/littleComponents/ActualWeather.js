import styled from "styled-components";

import { format, compareAsc, parseISO } from "date-fns";
import { frCA } from "date-fns/locale";

const ActualWeather = ({ localWeatherGotten, dateNum }) => {
    console.log(localWeatherGotten[dateNum]);
    const dateHere = format(new Date(), "yyyy-MM-dd", {locale : frCA});

    const differenceInDay = compareAsc(parseISO(localWeatherGotten[0].valid_date), parseISO(dateHere));

    // 1 means it's already tomorrow overthere, -1 still yesterday, 0 same day

    if (differenceInDay === 1) { dateNum-- };
    if (differenceInDay === - 1) { dateNum++ };
    
    return (
        <Wrapper>
            <div>Min : {localWeatherGotten[dateNum].min_temp}°C</div>
            <div>Max : {localWeatherGotten[dateNum].max_temp}°C</div>
            <div>{localWeatherGotten[dateNum].weather.description}</div>
            {
                localWeatherGotten[dateNum].precip > 0 &&
                <div>Précipitations : {(localWeatherGotten[dateNum].precip).toFixed(1)} mm</div>
            }
            <div> Vents : {localWeatherGotten[dateNum].wind_cdir}, {parseInt(localWeatherGotten[dateNum].wind_spd * 3.6)} km/h, rafales à {parseInt(localWeatherGotten[dateNum].wind_gust_spd * 3.6)} km/h</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
`

export default ActualWeather;