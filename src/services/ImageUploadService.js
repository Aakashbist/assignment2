import { Firebase } from '../config/Firebase';
import ImagePicker from 'react-native-image-picker';

const collection = "Documents"
export async function getDownloadUrl(uri, fileName) {
    const documentUri = getUriBasedOnOS(uri)
    const response = await fetch(documentUri);
    const blob = await response.blob();
    var storageRef = Firebase.storage().ref().child(`${collection}/${fileName}`);

    let task = storageRef.put(blob);
    return new Promise((resolve, reject) => {
        task.on('state_changed', () => { },
            (error) => { reject(error) },
            () => {
                task.snapshot.ref.getDownloadURL()
                    .then((downloadUrl) => {
                        resolve(downloadUrl)
                    })
                    .catch((error) => reject(error))
            }
        )
    });
}

function getUriBasedOnOS(uri) {
    const documentUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    return documentUri;
}

export function openDocumentPicker() {
    return new Promise((resolve, reject) => {
        try {

            ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
                resolve(response)
            });
        } catch (err) {

            reject(err);
        }

    })
}
