import React, {useEffect, useState} from 'react';
import {ProgressBarAndroid, SafeAreaView} from 'react-native';
import CardList from './components/CardList';
// import GeoLocation from "./components/GeoLocation";
import * as Location from "expo-location";

const App = () => {
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [region, setRegion] = useState('');
const [isLoaded, setIsLoaded] = useState('false')

useEffect(() => {

    (async () => {

        try {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setRegion('');
                setErrorMsg('Permission to access location was denied');
            }
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            const {latitude, longitude} = location.coords;


            setIsLoaded(() => Location.hasServicesEnabledAsync())


            Location.reverseGeocodeAsync({latitude,longitude}).then((resp) => {
                const [{region}] = resp;
                setRegion(region)
            });

        } catch (error) {
            let status = Location.getProviderStatusAsync()
            if (!await status.hasServicesEnabledAsync) {
                //Customer prompted to change permission or let customer continue to application
            }
        }
    })();
}, []);
    let text = 'Waiting..';
    if(isLoaded){
        console.log("Service enabled")
    } else {
        console.log("Service not enabled")
    }
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        //text = JSON.stringify(location);
        text = region;
    }
    console.log(text);
    return (
        <SafeAreaView style={{marginTop: 30, marginHorizontal: 10, flex: 1}}>

            <CardList location={region}/>

        </SafeAreaView>
    );
}
export default App;