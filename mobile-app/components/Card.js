import {FlatList, Image, Text, TouchableOpacity, View, SafeAreaView, StyleSheet} from "react-native";
import React from "react";

const Card = ({item,index,filteredData}) => {
    return (
        <SafeAreaView>
        <View style={styles.header}>
            <View>
                <Image source={{uri: item.curatorPicture}} style={styles.headerImage}/>
            </View>
            <View style={{
                marginBottom: 5,
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-around',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5
                }}>
                    <Text>{item.curator}</Text>
                    <Text style={[styles.headerDate]}>{item.date} </Text>
                </View>
                <Text style={styles.headerTitle}>{item.title} </Text>
            </View>
        </View>
        <View>
        <Text style={styles.description}>{item.description} </Text>
        </View>
        <View style={{flex: 1}}>
            <Text style={styles.recApp}>RECOMMENDED APPLICATIONS </Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={filteredData  [index].usefulApplication}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => console.log(item.link)}>
                        <Image source={{uri: item.logo}} style={styles.logo}/>
                    </TouchableOpacity>
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    headerImage: {
        marginTop: 10,
        width: 55,
        height: 55,
        borderRadius: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
})

export default Card;
