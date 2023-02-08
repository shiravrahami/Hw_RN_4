import React from "react";
import { StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Icon } from '@rneui/themed';

export default function Note(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Card containerStyle={styles.container} >
                <Card.Title>
                    <Text>{props.note.title}</Text>

                </Card.Title>
                <TouchableOpacity onPress={() => { props.onDelete(props.note.id) }}>
                    <Icon name="delete" />
                </TouchableOpacity>
                <Card.Divider />
                <Text>{props.note.text}</Text>
            </Card>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width * 0.8,
        padding: 20,
        alignItems: 'center',
        borderRadius: 10,
    }
})

