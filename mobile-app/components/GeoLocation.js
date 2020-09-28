import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import  {Location, Constants, Permissions, IntentLauncherAndroid} from 'expo';
import * as Location from 'expo-location'

export default function GeoLocation() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState(null);
    const [street, setStreet] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let {status} = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');

                }
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                const {latitude, longitude} = location.coords;


                Location.reverseGeocodeAsync({latitude,longitude}).then((resp) => {
                    const [{region, street}] = resp;

                    setRegion(region)
                    setStreet(street)
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
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        //text = JSON.stringify(location);
        text = region + " \n" + street;
    }
    console.log("render")
    console.log(text)

    return (
        <></>
    );
}

