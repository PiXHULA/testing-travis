import React from 'react';
import {SafeAreaView} from 'react-native';
import CardList from './components/CardList';

const App = () => {
    return (
        <SafeAreaView style={{marginTop: 30, marginHorizontal: 10, flex: 1}}>
            <CardList/>
        </SafeAreaView>
    );
}

export default App;
