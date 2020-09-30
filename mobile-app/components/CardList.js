import {FlatList, SafeAreaView, StyleSheet, View} from "react-native";
import Card from "./Card";
import React from "react";

const CardList = ({data}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return <View style={styles.packageContainer}>
                        <Card item={item} index={index} filteredData={data}/>
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
})

export default CardList;

