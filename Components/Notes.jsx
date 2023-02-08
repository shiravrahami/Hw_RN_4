import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView, Modal } from "react-native";
import Note from "./Note";
import { Icon } from '@rneui/themed';


export default function Notes(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', text: '' });
    const addNote = () => {
        setModalVisible(true)
    }

    const cancelNote = () => {
        setModalVisible(false);
        setNewNote({ title: '', text: '' })
    }

    const createNote = () => {
        if (newNote.title === '' || newNote.text === '') {
            Alert.alert("Error", 'Please fill all');
            return;
        }
        if (props.notes.length === 0) {
            newNote.id = 1;
        }
        else {
            newNote.id = props.notes[props.notes.length - 1].id + 1;
        }
        props.onAdd(newNote, props.categoryID);
        setModalVisible(false);
        setNewNote({ title: '', text: '' });
    }

    const deleteNote = (id) => {
        props.onDelete(id, props.categoryID)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButtonContainer} onPress={props.backToAllNotes}>
                    <Icon name="arrow-back" size={40} color="#409EDB" />
                  
                </TouchableOpacity>
                <Text>{props.category} (Number of notes: {props.notes.length})</Text>
            </View>

            <View style={styles.itemList}>
                <ScrollView>
                    {props.notes.map((note) => (
                        <Note note={note} title={note.title} key={note.id} onDelete={deleteNote} />
                    ))}
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.addNoteButtonContainer} onPress={addNote}>
                <Icon name="add" size={40} color="white" />
            </TouchableOpacity>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>New Note</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <TextInput style={styles.modalTextInput} placeholder="Note Title" onChangeText={(text) => setNewNote({ ...newNote, title: text })} value={newNote.title} />
                        <TextInput style={styles.modalTextInput} placeholder="Note Text" onChangeText={(text) => setNewNote({ ...newNote, text: text })} value={newNote.text} />
                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.saveButtonContainer} onPress={createNote}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButtonContainer} onPress={cancelNote}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    itemList: {
        flex: 5,
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNoteButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#409EDB',
        justifyContent: 'center',
    },
    addNoteButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
    },
    modalHeaderText: {
        fontSize: 25,
        marginTop: 50,
        color: '#409EDB',
    },
    modalBody: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
    },
    modalTextInput: {
        borderRadius: 10,
        width: '100%',
        height: 50,
        padding: 10,
        borderWidth: 1,
        paddingVertical: 10,
        marginVertical: 10,
    
    },
    modalFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 100,
    },
    cancelButtonContainer: {
        backgroundColor: '#409EDB',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    cancelButtonText: {
        color: 'white',
    },
    saveButtonText: {
        color: 'white',
    },
    saveButtonContainer: {
        backgroundColor: '#409EDB',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },

});


