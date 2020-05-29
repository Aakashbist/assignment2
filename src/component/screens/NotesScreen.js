
import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList } from 'react-native';
import { Icon, Card, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { getNotes, getNoteById } from '../../services/NoteService';
import axios from 'axios';
import { getCurrentUser } from '../../config/Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Notes = (props) => {


    const [notes, setNotes] = useState([]);

    const currentUser = getCurrentUser().uid;

    setNotesInState = (notesList) => {
        setNotes(notesList);
    }



    useEffect(() => {
        getNotes().then((notes) => {
            data = notes.filter((note) => note.userId == currentUser)
            setNotesInState(data)
        }).catch(error => alert(error));
    }, [])


    deleteNotes = (noteId) => {
        Alert.alert(
            'Delete Address',
            'Are you sure want to delete this address ?',
            [
                { text: 'Cancel' },
                {
                    text: 'OK'
                        // onPress: () => deleteNotesWithId(noteId)
                        .catch(error => {
                            //  errorMessage = parseFirebaseError(error);
                            // Alert.alert(errorMessage);
                        })
                },
            ],
            { cancelable: false }
        )
    }


    let view = notes == null ? <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text style={{ fontSize: 28 }}> Notes </Text>
        <Text style={{ fontSize: 18, marginTop: 16 }}> No available  Notes </Text>
    </View> :
        <React.Fragment>
            <FlatList
                style={[styles.cardContainer, {}]}
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card
                        image={{ uri: item.imageUrl }}>
                        <View style={styles.containerFlexRow}>
                            <Text style={{ flex: 1, fontSize: 16 }}>{item.address}</Text>
                            <TouchableOpacity
                                style={{ marginHorizontal: 4 }}
                                onPress={() => props.navigation.navigate(AppRoute.AddNotes,
                                    {
                                        key: item.id,
                                        mode: 'EDIT'
                                    })}
                            >
                                <Icon name='create' type='material' size={20} color={colors.primaryDark} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginHorizontal: 4 }}
                                disabled={item.leased}>
                                <Icon name='delete' type='material' size={20} color={item.leased ? colors.darkWhite2 : colors.danger} />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.containerFlexRow}>
                            <TouchableOpacity
                                style={{ marginHorizontal: 4 }}
                                disabled={item.leased}>
                                <Icon name='delete' type='material' size={20} color={item.leased ? colors.darkWhite2 : colors.danger} />
                            </TouchableOpacity>
                        </View>
                    </Card>
                )}
            />
        </React.Fragment>


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }}
            keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <SafeAreaView>
                <View style={[styles.containerLeft, { paddingBottom: 16, flexDirection: 'column' }]} >
                    {view}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}


Notes.navigationOptions = (props) => ({
    title: 'Notes',
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerRight: () => (
        <Icon
            name='add'
            type='material'
            size={36}
            color={colors.white}
            onPress={() => props.navigation.navigate(AppRoute.AddNotes)} />
    ),
    headerLeftContainerStyle: {
        marginHorizontal: 16
    }
});
export default Notes