import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { AntDesign, Entypo } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts} = useContext (Context);

  useEffect (() => {
// -- the very first rendering
    getBlogPosts ();
// -- anytime this screen is focused
    const listener       = navigation.addListener ('didFocus', () => {
      getBlogPosts ()
    });

    return () => {
      listener.remove ();
    };
  }, []);



  return (
    <View style={styles.container}>
      <FlatList
        data = {state}
        keyExtractor = {(blogPost) => blogPost.title}
        renderItem = {({ item }) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate ('Show', { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title} {item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost (item.id)}>
                  <AntDesign name="delete" style={styles.icon} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate ('Create')}>
        <Entypo name="plus" size={24} color="black" />
      </TouchableOpacity>
                           )
  };
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth:1,
    borderColor:'gray'
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
});

export default IndexScreen;