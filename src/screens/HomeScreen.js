import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";

import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../consts/colors";
import VectorIcon from "react-native-vector-icons/FontAwesome";

const width = Dimensions.get("screen").width / 2 - 30;

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
      const json = await response.json();
      setData(json.pokemon_entries);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const Card = ({ pokemon }) => {
    console.log(pokemon)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", pokemon)}
      >
        <View style={style.card}>
          {/*Heart icon*/}
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: false
                  ? "rgba(245, 42, 42,0.2)"
                  : "rgba(0,0,0,0.2) ",
              }}
            >
              <VectorIcon
                name="heart"
                size={18}
                color={false ? COLORS.red : COLORS.black}
              />
            </View>
          </View>

          {/*Image*/}
          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_species.url.split("pokemon-species")[pokemon.pokemon_species.url.split("pokemon-species").length - 1].split("/")[1]}.png`,
              }}
              style={{ flex: 1, resizeMode: "contain", width: 100, height: 50 }}
            />
          </View>

          {/*Pokemon details*/}
          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {pokemon.pokemon_species.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      {/* Header*/}
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Bienvenido a tu
          </Text>
          <Text
            style={{ fontSize: 38, fontWeight: "bold", color: COLORS.green }}
          >
            Pokedex Kanto
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Favorites")}
        >
          <VectorIcon name="heart" size={25} />
        </TouchableOpacity>
      </View>

      {/* Search and filter*/}
      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <View style={style.searchContainer}>
          <VectorIcon
            name="search"
            size={20}
            style={{ marginLeft: 20, marginRight: 10 }}
          />
          <TextInput placeholder="Search" style={style.input} />
        </View>
        <View style={style.filterBtn}>
          <VectorIcon name="filter" size={25} color={COLORS.white} />
        </View>
      </View>

      {/* Pokemons cards*/}
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 20,
              paddingBottom: 250,
            }}
            numColumns={2}
            data={data}
            renderItem={({ item }) => {
              return <Card pokemon={item} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  filterBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  card: {
    width,
    backgroundColor: COLORS.light,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});

export default HomeScreen;
