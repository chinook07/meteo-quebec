import { createContext, useState, useEffect } from "react";
import { startOfToday } from "date-fns";

export const CityContext = createContext();

const CityContextProvider = ({ children }) => {

    const [localWeather, setLocalWeather] = useState({})
    const [location, setLocation] = useState({});
    const [todayDate, setTodayDate] = useState();
    const [dateFromSelected, setDateFromSelected] = useState("");
    const [dateToSelected, setDateToSelected] = useState("");
    const [allDatesAvailable, setAllDatesAvailable] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const today = (new Date());
        setTodayDate(startOfToday(today));
        // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=45.45&lon=-73.6&appid=c77a7a4b3db833e991269e38c96f8d5d&units=metric&lang=fr`)
        //     .then(res => res.json())
        //     .then(data => console.log(data))
    }, [])

    return (
        <CityContext.Provider
            value={{
                localWeather,
                setLocalWeather,
                location,
                setLocation,
                todayDate,
                setTodayDate,
                dateFromSelected,
                setDateFromSelected,
                dateToSelected,
                setDateToSelected,
                allDatesAvailable,
                setAllDatesAvailable,
                ready,
                setReady
            }}
        >
            {children}
        </CityContext.Provider>
    )
}

export default CityContextProvider;