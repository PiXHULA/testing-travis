import React, {useState} from "react";
import {packages} from "../data/data";
import {FlatList, SafeAreaView, StyleSheet, View} from "react-native";
import {Button, Input} from "react-native-elements";
import Card from "./Card";

const CardList = ({location}) => {
    console.log(location)
    const [text, setText] = useState(location);
    const [filteredData, setFilteredData] = useState( () =>
            packages.filter(item => item.city.toLowerCase().startsWith(location.toLowerCase())));
    const searchResult = (searchItem) => {
       const searchData = packages.filter(item => item.city.toLowerCase().startsWith(searchItem.toLowerCase().trim()))
       setFilteredData(searchData);
    }
        return (
            <SafeAreaView style={{flex: 1}}>
                <Input
                    style={{height: 40}}
                    onChangeText={text => setText(text)}
                    placeholder="Search"
                />
                <Button
                    title="Search"
                    onPress={() => {
                        searchResult(text)
                    }}
                />
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                        return <View style={styles.packageContainer}>
                                <Card item={item} index={index} filteredData={filteredData} styles={styles}/>
                        </View>
                    }}
                />
            </SafeAreaView>
        );
    }
    const styles = StyleSheet.create({
        packageContainer: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop: 10,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 10,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        headerDate: {
            fontSize: 14,
            fontWeight: '700',
            color: 'orange',
            textTransform: 'uppercase',
            alignSelf: 'flex-end'
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            alignSelf: 'center',
        },
        headerImage: {
            marginTop: 10,
            width: 55,
            height: 55,
            borderRadius: 10
        },
        description: {
            paddingHorizontal: 5,
            fontSize: 14,
        },
        logo: {
            marginHorizontal: 10,
            width: 55,
            height: 55,
            borderRadius: 10
        },
        recApp: {
            marginVertical: 5,
            paddingLeft: 10,
            fontSize: 13,
            color: 'orange',
            textTransform: 'uppercase',
        },
    })

export default CardList;

