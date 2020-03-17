import React, { useContext } from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(BlogContext);
    
    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'));

    return (
        <View>
            <Text>{ blogPost.title }</Text>
            <Text>{ blogPost.content }</Text>
        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
            <Feather name='edit-2' size={35} />
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({});

export default ShowScreen;