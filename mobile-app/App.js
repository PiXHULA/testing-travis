import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import CardList from './components/CardList';
// import GeoLocation from "./components/GeoLocation";
import * as Location from "expo-location";
import {packages} from "./data/data";
import {Button, Input} from "react-native-elements";

const App = () => {
    const [data, setData] = useState(packages);
    const [text, setText] = useState('');

    const filter = (city) => {
        const newData = packages.filter(item => item.city.toLowerCase().startsWith(city.toLowerCase().trim()))
        setData(newData)
    };

    useEffect(() => {(async () => {
            try {
                const location = await Location.getCurrentPositionAsync({});
                const {latitude, longitude} = location.coords;
                Location.reverseGeocodeAsync({latitude, longitude}).then((resp) => {
                    const [{region}] = resp;
                    filter(region)
                });
            } catch (error) {
                let status = Location.getProviderStatusAsync()
                if (!await status.hasServicesEnabledAsync) {
                    //Customer prompted to change permission or let customer continue to application
                }
            }
        })();
    }, []);

    return (
        <SafeAreaView style={{marginTop: 30, marginHorizontal: 10, flex: 1}}>
            <Input
                style={{height: 40}}
                onChangeText={text => setText(text)}
                placeholder="Search"
            />
            <Button
                title="Search"
                onPress={() => {
                    filter(text)
                }}
            />
            <CardList data={data}/>
        </SafeAreaView>
    );
}
export default App;
