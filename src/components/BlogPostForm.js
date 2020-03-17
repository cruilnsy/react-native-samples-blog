import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BlogPostForm = ({ onSubmit, initalValue }) => {
    const [title, setTitle] = useState(initalValue.title);
    const [content, setContent] = useState(initalValue.content);

    return (
        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.inputStyle}
            />
            <Text style={styles.label}>Enter Content:</Text>
            <TextInput 
                value={content}
                onChangeText={text => setContent(text)}
                style={styles.inputStyle}
            />
            <Button 
                title="Save Blog Post" 
                onPress={() => onSubmit(title, content)}
            />
        </View>
    );
};

BlogPostForm.defaultProps = {
    initalValue: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    inputStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
});

export default BlogPostForm;