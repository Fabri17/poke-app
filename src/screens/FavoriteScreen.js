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
import COLORS from "../consts/colors";
import VectorIcon from "react-native-vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("screen").width / 2 - 30;

const FavoriteScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const getInfo = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const getFavorites = async () => {
    let result = await SecureStore.getItemAsync("favorites");
    if (result) {
      let favs = result.split(",");
      let pokemons = []
      for (let i = 0; i < favs.length; i++) {
        const element = favs[i];
        let info = await getInfo(element);
        pokemons.push(info);
      }
      setData(pokemons);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const Card = ({ pokemon }) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={style.card}>
          {/*Image*/}
          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
              }}
              style={{ flex: 1, resizeMode: "contain", width: 100, height: 50 }}
            />
          </View>

          {/*Pokemon details*/}
          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {pokemon.name}
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
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Tus</Text>
          <Text
            style={{ fontSize: 38, fontWeight: "bold", color: COLORS.green }}
          >
            Favoritos
          </Text>
        </View>
        <VectorIcon
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
        />
      </View>
      {/* Pokemons cards*/}
      <View>
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

export default FavoriteScreen;
