import React, { Component } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { Header } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
//axios is a web service.

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData();
  }

//async is used for Data-fetching.
//Creating a constant and assigning it the URL.
//Then, using axios, we get the reponse. Otherwise, an error is displayed. 
  getData = async () => {
    const url = "http://localhost:5000/";
    axios
      .get(url)
      .then(response => {
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  renderItems = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("Star", { name: item.name });
      }}
    >
      <Card
        image={require("../assets/card_bg.png")}
        imageStyle={{ marginTop: RFValue(30) }}
        featuredTitle={item.name}
        featuredTitleStyle={styles.cardTitle}
        containerStyle={styles.cardContainer}
      ></Card>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            centerComponent={{
              text: "Stars",
              style: styles.headerTitle
            }}
            backgroundColor={"#3A61FF"}
          />
        </View>
        //boolean starts
        {data.length > 0 ? (
          <View style={styles.upperContainer}>
          //Data, renderItem and keyExtractor are the 3 imp properties of FlatList.
            <FlatList
              data={data}
              renderItem={this.renderItems}
              keyExtractor={this.keyExtractor}
            />
          </View>
        ) : null} //if nothing works, return null
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 0.12,
    backgroundColor: "#1A2D5F"
  },
  headerTitle: {
    color: "#fff",
    fontSize: RFValue(28),
    fontWeight: "bold"
  },
  upperContainer: {
    flex: 0.88,
    backgroundColor: "#1A2D5F"
  },
  cardTitle: {
    fontSize: RFValue(25),
    textAlign: "center"
  },
  cardContainer: {
    backgroundColor: "#1A2D5F",
    borderWidth: 0
  }
});
