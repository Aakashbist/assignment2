import React, { Fragment, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, DatePickerAndroid, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getGooglePlaceAutocomplete, getGooglePlaceDetails } from '../../services/mapService';
import styles from '../../resources/styles';
import colors from '../../resources/colors';


const AddNotes = (props) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [destination, setDestination] = useState('');
    const [address, setAddress] = useState([]);
    const [imageFileName, setImageFileName] = useState();
    const [imageUri, setImageUri] = useState();
    const [description, setDescription] = useState();
    const [error, setError] = useState();
    const [editMode, setEditMode] = useState(false);
    const [mapView, setMapView] = useState(false);
    const [predictions, setPrediction] = useState([]);
    const [canAddNotes, setCanAddNotes] = useState('');


    useEffect(() => {
        let _canAddNotes = description !== null && imageUri !== null;
        if (canAddNotes !== _canAddNotes) {
            setCanAddNotes(_canAddNotes);
        }
    }, [imageUri, description]);

    onPredictionSelected = place => {
        setDestination(place.description);
        //setPlaceID(place.place_id);
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


    var view = null;

    view = <View>
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


                    {
                        imageUri &&
                        <Image source={{ uri: imageUri }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                    }
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
                                //  onPress={this.selectImage}
                                style={{ justifyContent: 'flex-start', flexDirection: 'row', alignContent: 'center', margin: 10 }} >
                                <Text style={{ color: colors.primary, fontSize: 18 }}>Add a photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[canAddNotes ? styles.button : styles.buttonDisabled, { alignSelf: 'center' }]}
                                // onPress={this.handleAddProperty}
                                disabled={!canAddNotes}
                            >
                                <Text style={canAddNotes ? styles.buttonText : styles.buttonTextDisabled}>Add Notes </Text>
                            </TouchableOpacity>
                        </Fragment>
                    }

                </View>
            </View> : null
        }
    </View >





    return (
        <ScrollView keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'} >
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    {view}
                </View >
            </SafeAreaView>
        </ScrollView >
    );
}
export default AddNotes