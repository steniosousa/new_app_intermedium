
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ButtonPicture, ButtonRePicture, Buttons, ImagemPicture, ViewPicture } from './styled';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNCamera } from 'react-native-camera';
import { Ionicons } from '@expo/vector-icons';
export default function Cam({ route }) {
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigation = useNavigation()
  const { param } = route.params;

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.3, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data.uri);
    }
  };


  async function saveImage() {
    const evidenceStorage = {
      [param.data]: {
        evidence: capturedImage
      }
    }
    try {
      await AsyncStorage.mergeItem(param.id, JSON.stringify(evidenceStorage))
      Alert.alert('Sucess', 'Salvo com sucesso', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch {
      await AsyncStorage.setItem(param.id, JSON.stringify(evidenceStorage))
      Alert.alert('Sucess', 'Criada a memória e salva com sucesso', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    }
  };

  async function trashImage() {
    setCapturedImage(null)
  }


  return (
    <View style={styles.container}>
      {capturedImage && (
        <ViewPicture >
          <ImagemPicture source={{ uri: capturedImage }} />
          <ButtonRePicture >
            <ButtonPicture onPress={trashImage}>
              <Feather name="trash" size={30} color="white" />
            </ButtonPicture>
            <ButtonPicture onPress={() => saveImage()}>
              <AntDesign name="save" size={40} color="white" />
            </ButtonPicture>
            <Text style={styles.text}></Text>
          </ButtonRePicture>
        </ViewPicture>
      )}
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      />
      <Buttons >
        <Text style={styles.text}></Text>
        <ButtonPicture onPress={takePicture}>
          <Ionicons name="camera-outline" size={40} color="white" />
        </ButtonPicture>
        <Text style={styles.text}></Text>
      </Buttons>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  previewContainer: {
    height: '50%'
  },
  previewImage: {
    height: '50%'
  }
});
