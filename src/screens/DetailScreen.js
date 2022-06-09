import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";

const DetailScreen = ({ navigation, route }) => {
  const pokemon = route.params;
  const [isLoading, setLoading] = useState(true);
  const [pokemonInfo, setData] = useState([]);

  const getInfo = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.url.split("pokemon-species")[pokemon.pokemon_species.url.split("pokemon-species").length - 1].split("/")[1]}/`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={style.header}>
              <Icon
                name="arrow-back"
                size={28}
                onPress={() => navigation.goBack()}
              />
            </View>
            {/* Image */}
            <View style={style.imageContainer}>
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_species.url.split("pokemon-species")[pokemon.pokemon_species.url.split("pokemon-species").length - 1].split("/")[1]}.png`,
                }}
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: 200,
                  height: 200,
                }}
              />
            </View>
            {/* Pokemon Info */}
            <View style={style.detailsContainer}>
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {pokemonInfo.weight} kg
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {pokemonInfo.name}
                </Text>
                <View style={style.priceTag}>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: COLORS.white,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {pokemonInfo.height} dm
                  </Text>
                </View>
              </View>

              <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Habilidades
                </Text>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    marginTop: 20,
                  }}
                  data={pokemonInfo.moves}
                  renderItem={({ item }) => {
                    return (
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 16,
                          lineHeight: 22,
                          marginTop: 10,
                        }}
                      >
                        {item.move.name}
                      </Text>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default DetailScreen;
