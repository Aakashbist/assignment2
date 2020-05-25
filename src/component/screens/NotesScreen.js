
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import AppRoute from '../../resources/appRoute';
import colors from '../../resources/colors';
import styles from '../../resources/styles';

const Notes = (props) => {


    const [notes, setNotes] = useState([]);

    //  const currentUser = getCurrentUser().uid;

    setNotesInState = (notesList) => {
        setNotes(notesList);
    }

    // getListOfNotes = () => {
    //     if (currentUser !== null) {
    //        propertyReference(currentUser, setPropertiesInState)
    //     }
    // };

    // useEffect(() => {
    //     getListOfProperties();
    // }, [])


    // deleteNotes = (noteId) => {
    //     Alert.alert(
    //         'Delete Address',
    //         'Are you sure want to delete this address ?',
    //         [
    //             { text: 'Cancel' },
    //             {
    //                 text: 'OK', onPress: () => deleteNotesWithId(noteId)
    //                     .catch(error => {
    //                         errorMessage = parseFirebaseError(error);
    //                         Alert.alert(errorMessage);
    //                     })
    //             },
    //         ],
    //         { cancelable: false }
    //     )
    // }


    // let view = properties == null ? <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
    //     <Text style={{ fontSize: 28 }}> Notes </Text>
    //     <Text style={{ fontSize: 18, marginTop: 16 }}> No available  Notes </Text>
    // </View> :
    //     <React.Fragment>
    //         <FlatList
    //             style={[styles.cardContainer, {}]}
    //             data={properties}
    //             keyExtractor={(item) => item.id}
    //             renderItem={({ item }) => (
    //                 <Card
    //                     image={{ uri: item.imageUrl }}>
    //                     <View style={styles.containerFlexRow}>
    //                         <Text style={{ flex: 1, fontSize: 16 }}>{item.address}</Text>
    //                         <TouchableOpacity
    //                             style={{ marginHorizontal: 4 }}
    //                             onPress={this.openDocumentPicker}
    //                             onPress={() => props.navigation.navigate(AppRoute.AddNotes,
    //                                 {
    //                                     key: item.id,
    //                                     mode: 'EDIT'
    //                                 })}
    //                         >
    //                             <Icon name='edit' type='entypo' size={20} color={colors.primaryDark} />
    //                         </TouchableOpacity>

    //                         <TouchableOpacity
    //                             style={{ marginHorizontal: 4 }}
    //                             onPress={() => this.deleteNotes(item.id)}
    //                             disabled={item.leased}>
    //                             <Icon name='trash' type='entypo' size={20} color={item.leased ? colors.darkWhite2 : colors.danger} />
    //                         </TouchableOpacity>

    //                     </View>
    //                 </Card>
    //             )}
    //         />
    //     </React.Fragment>


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }}
            keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <SafeAreaView>
                <View style={[styles.containerLeft, { paddingBottom: 16, flexDirection: 'column' }]} >
                    {/* {view} */}
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
            name='plus'
            type='entypo'
            color={colors.white}
            onPress={() => props.navigation.navigate(AppRoute.AddNotes)} />
    ),
    headerLeftContainerStyle: {
        marginHorizontal: 16
    }
});
export default Notes