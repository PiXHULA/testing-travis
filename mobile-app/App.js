import React from 'react';
import {SafeAreaView} from 'react-native';
import CardList from './components/CardList';
import GeoLocation from "./components/GeoLocation";

const App = () => {
    return (
        <SafeAreaView style={{marginTop: 30, marginHorizontal: 10, flex: 1}}>
            <GeoLocation/>
            <CardList/>
        </SafeAreaView>
    );
}

export default App;
