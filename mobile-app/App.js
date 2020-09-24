import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from "react-native-elements";
import { packages } from "./data";

const App = () => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState(packages);
  const searchResult = (searchItem) => {
    const searchData = packages.filter(item => item.city.toLowerCase().startsWith(searchItem.toLowerCase()))
    setFilteredData(searchData);
  }
  return (
      <SafeAreaView style={{marginTop:30,marginHorizontal:10,flex:1}}>
          <Input
              style={{ height: 40 }}
              onChangeText={text => setText(text)}
              placeholder="Search"
          />
          <Button
              title="Search"
              onPress={() => searchResult(text)}
          />
          <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <View style={styles.packageContainer}>
                    <View style={styles.header}>
                      <View>
                        <Image source={{ uri: item.curatorPicture }} style={styles.headerImage}/>
                      </View>
                      <View style={{ marginBottom:5,flexDirection: 'column', flex: 1,justifyContent:'space-around', }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5}}>
                          <Text>{item.curator}</Text>
                          <Text style={[styles.headerDate]}>{item.date} </Text>
                        </View>
                        <Text style={styles.headerTitle}>{item.title} </Text>
                      </View>

                    </View>
                    <View>
                      <Text style={styles.description}>{item.description} </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.recApp}>RECOMMENDED APPLICATIONS </Text>
                      <FlatList
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          data={filteredData[index].usefulApplication}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({ item }) => {
                            return <TouchableOpacity onPress={() => console.log(item.link)}>
                              <Image source={{ uri: item.logo }} style={styles.logo}/>
                            </TouchableOpacity>
                          }}
                      />
                    </View>
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

export default App;
