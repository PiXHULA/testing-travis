import React, {useEffect, useState} from "react";
import {packages} from "../data/data";
import {FlatList, SafeAreaView, StyleSheet, View, Modal, Text, TouchableHighlight} from "react-native";
import {Button, Input} from "react-native-elements";
import Card from "./Card";
import * as Alert from "react-native-web";

const CardList = ({location}) => {
    const [filteredData, setFilteredData] = useState(packages);
    const [modalVisible, setModalVisible] = useState(false)
    if (!location) setModalVisible(true);

    const [text, setText] = useState(location);
    useEffect(() => {
        const filter = packages.filter(item => item.city.toLowerCase().startsWith(location.toLowerCase().trim()))
        setFilteredData(filter);
    }, [])
    const searchResult = (searchItem) => {
        const searchData = packages.filter(item => item.city.toLowerCase().startsWith(searchItem.toLowerCase().trim()))
        setFilteredData(searchData);
    }
    //     return (
    //     <View style={styles.centeredView}>
    //         <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => {
    //                 Alert.alert('Modal has been closed.');
    //             }}>
    //             <View style={styles.centeredView}>
    //                 <View style={styles.modalView}>
    //                     <Text style={styles.modalText}>Hello World!</Text>
    //
    //                     <TouchableHighlight
    //                         style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
    //                         onPress={() => {
    //                             setModalVisible(!modalVisible);
    //                         }}>
    //                         <Text style={styles.textStyle}>Hide Modal</Text>
    //                     </TouchableHighlight>
    //                 </View>
    //             </View>
    //         </Modal>
    //
    //         <TouchableHighlight
    //             style={styles.openButton}
    //             onPress={() => {
    //                 setModalVisible(true);
    //                 setText('Stockholms län')
    //             }}>
    //             <Text style={styles.textStyle}>Stockholm</Text>
    //         </TouchableHighlight>
    //         <TouchableHighlight
    //             style={styles.openButton}
    //             onPress={() => {
    //                 setModalVisible(true);
    //                 setText('Göteborg');
    //             }}>
    //             <Text style={styles.textStyle}>Göteborg</Text>
    //         </TouchableHighlight>
    //         <TouchableHighlight
    //             style={styles.openButton}
    //             onPress={() => {
    //                 setModalVisible(true);
    //             }}>
    //             <Text style={styles.textStyle}>Malmö</Text>
    //         </TouchableHighlight>
    //     </View>
    // );
    return (
        <SafeAreaView style={{flex: 1}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>

                        <TouchableHighlight
                            style={{...styles.openButton, backgroundColor: '#2196F3'}}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default CardList;

