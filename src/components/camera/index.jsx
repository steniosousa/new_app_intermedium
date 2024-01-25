
import {  useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ButtonPicture, ButtonRePicture, Buttons, ImagemPicture, ViewPicture } from './styled';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cam({ route }) {
 
  const [capturedImage, setCapturedImage] = useState(null);

  const navigation = useNavigation()
  const { param } = route.params;



  // function toggleCameraType() {
  //   setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  // }

  // const takePicture = async () => {
  //   if (!cameraRef.current) return
  //   try {
  //     const { uri } = await cameraRef.current.takePictureAsync({
  //       quality: 0.3
  //     });
  //     setCapturedImage(uri);
  //   } catch (error) {
  //     Alert.alert('Erro', "Erro ao capturar evidência", [
  //       { text: 'OK' }
  //     ])
  //   }

  // };

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

    </View >
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
