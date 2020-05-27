import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { Notes } from '../../models/Notes';
import { getDownloadUrl, openDocumentPicker } from '../../services/ImageUploadService';
import { getGooglePlaceAutocomplete, getGooglePlaceDetails } from '../../services/mapService';
import parseFirebaseError from '../errorParser/firebaseErrorParser';
import parseMapApiError from '../errorParser/mapApiErrorParser';
import { createNotes } from '../../services/NoteService';



const AddNotes = (props) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [destination, setDestination] = useState('');
    const [address, setAddress] = useState([]);
    const [description, setDescription] = useState();
    const [error, setError] = useState();
    const [editMode, setEditMode] = useState(false);
    const [mapView, setMapView] = useState(false);
    const [predictions, setPrediction] = useState([]);
    const [canAddNotes, setCanAddNotes] = useState('');
    const [imageFileName, setImageFileName] = useState();
    const [imageUri, setImageUri] = useState();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {

    }, []);

    onPredictionSelected = place => {
        setDestination(place.description);
        setAddress(place.description);
        setPrediction([]);
        loadCoordinatesByPlaceId(place.place_id);
    };

    onDestinationQueryChange = (destination) => {
        setDestination(destination);
        getGooglePlaceAutocomplete(destination)
            .then((json) => {
                if (json.status === "OK") {
                    setPrediction(json.predictions);
                } else {
                    let errorMessage = parseMapApiError(json);
                    Alert.alert(errorMessage);
                }
            })
            .catch(error => setError(error));
    };


    loadCoordinatesByPlaceId = (placeId) => {
        getGooglePlaceDetails(placeId)
            .then((json) => {
                if (json.status === "OK") {
                    setLatitude(json.result.geometry.location.lat);
                    setLongitude(json.result.geometry.location.lng);
                    setMapView(true);
                } else {
                    let errorMessage = parseMapApiError(json);
                    Alert.alert(errorMessage);
                }
            })
            .catch(error => setError(error));
    };

    chooseDocument = () => {
        openDocumentPicker().then((response) => {
            alert(JSON.stringify(response))
            setImageFileName(response.name);
            setImageUri(response.uri)

        })
            .catch(error => (alert(error)))
    }

    handleAddNotes = () => {
        let notes;
        getDownloadUrl(imageUri, imageFileName)
            .then((uploadPercent) => {
                setIsUploading(true)
                setUploadProgress(uploadPercent)
            })
            .then((url) => {
                alert(url);
                notes = new Notes(address, description, url, latitude, longitude);
                return createNotes(notes)
            })
            .catch(error => {
                let errorMessage = parseFirebaseError(error);
                setError(errorMessage);
            })
            .finally(() => {
                setIsUploading(false)
            })
    }

    const suggestionView = predictions.map(item =>
        <TouchableOpacity
            style={styles.suggestion}
            onPress={() => onPredictionSelected(item)}>
            <Icon name='location' type='evilicon' size={36} color={colors.green} />
            <Text key={item.id} style={{ fontSize: 16 }}> {item.description}</Text>
        </TouchableOpacity >
    );

    var searchBarAndSuggestions = <View>
        <SearchBar
            placeholder="Type Here..."
            onChangeText={destination => onDestinationQueryChange(destination)}
            value={destination}
            lightTheme={true}
            platform="android"
        />
        {suggestionView}
    </View>;
    let errorView = error ? <Text style={{ color: colors.textColorError }}>{error}</Text> : null;


    var view = <View>
        {!editMode ? searchBarAndSuggestions : null}
        {mapView ?
            <View>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    showsUserLocation={true}
                    showsCompass={true} >
                    <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
                </MapView>

                <View style={[styles.containerLeft, { paddingHorizontal: 16 }]}>
                    <View style={{ marginVertical: 32, alignSelf: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Icon name='location' type='evilicon' size={36} color={colors.secondary} iconStyle={{ marginEnd: 16 }} />
                        <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{address}</Text>
                    </View>
                    <TextInput
                        style={styles.inputBoxFull}
                        multiline={true}
                        value={description}
                        onChangeText={(description) => setDescription(description)}
                        placeholder='Description'
                        autoCapitalize='none'

                    />
                    {isUploading ?

                        <View>
                            <Text>Image Uploading {uploadProgress}% please wait</Text>
                        </View> : null}

                    {
                        imageUri &&
                        <Image source={{ uri: imageUri }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                    }
                    {errorView}
                    {editMode ?
                        <Fragment>
                            <TouchableOpacity
                                style={[styles.button, { alignSelf: 'center' }]}
                            // onPress={this.handleUpdateProperty}
                            >
                                <Text style={styles.buttonText}>Update Notes </Text>
                            </TouchableOpacity>
                        </Fragment> :
                        <Fragment>
                            <TouchableOpacity
                                onPress={() => this.chooseDocument()}
                                style={{ justifyContent: 'flex-start', flexDirection: 'row', alignContent: 'center', margin: 10 }} >
                                <Text style={{ color: colors.primary, fontSize: 18 }}>Add a photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { alignSelf: 'center' }]}
                                onPress={() => this.handleAddNotes()}
                            >
                                <Text style={styles.buttonText}>Add Notes </Text>
                            </TouchableOpacity>
                        </Fragment>
                    }

                </View>
            </View> : null
        }
    </View >






    return (
        <ScrollView >
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    {view}

                </View >
            </SafeAreaView>
        </ScrollView >
    );
}

AddNotes.navigationOptions = ({ navigation }) => ({
    title: "Add Notes",
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,

});


export default AddNotes