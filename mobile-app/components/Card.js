import {FlatList, Image, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import React from "react";
import CardList from "./CardList";

const Card = ({item,index,filteredData,styles}) => {
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
                data={filteredData[index].usefulApplication}
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

export default Card;
