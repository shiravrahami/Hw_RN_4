import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, Modal, Dimensions, TextInput, TouchableOpacity } from "react-native";
import Notes from "./Notes";
import { Icon } from '@rneui/themed';


const categoryArr = [
    {
        id: 1,
        catName: 'Work',
        notes: [
            {
                id: 1,
                title: 'note1',
                text: 'text1 text1 text1 text1 text1'
            },
            {
                id: 2,
                title: 'note2',
                text: 'text2 text2 text2 text2 text2'
            }]
    },
    {
        id: 2,
        catName: 'Personal',
        notes: [
            {
                id: 1,
                title: 'note1',
                text: 'text1 text1 text1 text1 text1'
            },
            {
                id: 2,
                title: 'note2',
                text: 'text2 text2 text2 text2 text2'
            }]
    },
]
export default function AllNotes() {

    const [categories, setCategories] = useState(categoryArr);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState(null);
    const [categoriesVisible, setCategoriesVisible] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const cancelNewCategory = () => {
        setModalVisible(false);
        setNewCategoryName('');
    }
    const showNotes = (category) => {
        setActiveCategory(category);
        setCategoriesVisible(false);
    }
    const viewAll = () => {
        setActiveCategory(null);
        setCategoriesVisible(true);
    }
    const deleteNote = (noteID, categoryID) => {
        const newCategories = categories.map(categoryA => {
            if (categoryA.id === categoryID) {
                categoryA.notes = categoryA.notes.filter(note => note.id !== noteID)
            }
            return categoryA;
        });
        setCategories(newCategories);
    }
    const addNewNote = (note, categoryID) => {

        const newCategories = categories.map(categoryA => {
            if (categoryA.id === categoryID) {
                categoryA.notes.push(note)
            }
            return categoryA;
        });
        setCategories(newCategories);
    }
    const addNewCategory = () => {
        const newCategory = {
            id: categories.length + 1,
            catName: newCategoryName,
            notes: []
        }
        setCategories([...categories, newCategory])
        setNewCategoryName(null)
        setModalVisible(false);
        setCategoriesVisible(true);
    }
    return (
        <SafeAreaView>
            <View style={styles.notes && { display: categoriesVisible ? 'flex' : 'none' }}>
                <Text style={styles.headerOfTheApp}>Notes</Text>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoriesItemes} onPress={() => showNotes(item)}>
                            <Text>
                                {item.catName} - {item.notes.length}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
                <View>
                    <TouchableOpacity style={styles.btnAdd} onPress={() => { { cancelNewCategory } { setModalVisible(true) } { setCategoriesVisible(false) } }}>
                        <Icon name="add" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>New Category</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <TextInput style={styles.modalTextInput} placeholder=" New Category" onChangeText={(text) => setNewCategoryName(text)} value={newCategoryName} />

                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.saveButtonContainer} onPress={addNewCategory}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => { { setNewCategoryName('') } { setModalVisible(false) } { setCategoriesVisible(true) } }}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.activeCategoryList && { display: activeCategory != null ? 'flex' : 'none' }}>
                {activeCategory && <Notes onAdd={addNewNote} onDelete={deleteNote} backToAllNotes={viewAll} notes={activeCategory.notes} category={activeCategory.name} categoryID={activeCategory.id} />}
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    headerOfTheApp: {
        marginBottom: 15,
        fontSize: 40,
        textAlign: 'center',
        color: '#409EDB'
    },
    btnAdd: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#409EDB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeCategoryList: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    categoriesItemesTxt: {
        fontSize: 20,

        textAlign: 'center',
        color: 'red',
    },
    categoriesItemes: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        width: Dimensions.get('window').width * 0.8,
        alignSelf: 'center',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    notes: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
