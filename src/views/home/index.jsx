import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, Text } from "react-native";
import Api from "../../../api/service";
import Card from "../../components/cards/cards";
import { Clean, ClearView, Layout, RequestPermission } from "./styled";
import * as MediaLibrary from 'expo-media-library';
// import { Camera } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
    const [cleaningProps, setCleaning] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);


    useEffect(() => {
        // (async () => {
        //     const cameraStatus = await Camera.requestCameraPermissionsAsync();
        //     setHasCameraPermission(cameraStatus.status === 'granted');
        // })();

        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(status === 'granted');
        })();
        (async () => {

            // const getPermissionCam = async () => {
            //     const { status } = await Camera.requestCameraPermissionsAsync();
            //     setHasCameraPermission(status === 'granted');
            // };

            const getPermission = async () => {
                const { status } = await MediaLibrary.requestPermissionsAsync();
                setHasMediaLibraryPermission(status === 'granted');
            };

            if (hasCameraPermission === false) {
                return (
                    <RequestPermission onPress={getPermissionCam}>
                        <Text style={{ textAlign: 'center' }}>Nós precisamos de permissão para a câmera</Text>
                        <Text>Permitir</Text>
                    </RequestPermission>
                );
            }
            if (hasMediaLibraryPermission === false) {
                return (
                    <RequestPermission onPress={getPermission}>
                        <Text style={{ textAlign: 'center' }}>Nós precisamos de permissão para salvar imagem</Text>
                        <Text>Permitir</Text>
                    </RequestPermission>
                );
            }
        })()
    }, []);


    async function findCleaning() {
        const user = await AsyncStorage.getItem('user')
        const { id } = JSON.parse(user)
        if (!user) {
            Alert.alert('Usuário não encontrado!', '', [
                {
                    text: 'Retornar',
                    onPress: () => navigation.navigate('Login'),
                    style: 'cancel',
                },
            ]);
            return
        }

        try {
            const { data } = await Api.get('cleaning/recover/app', { params: { userId: id } })
            setCleaning(data)
        }
        catch (error) {
            Alert.alert('Não foi possível recuperar trabalhos!', '', [
                { text: 'Retornar' },
            ]);
        }
    }

    useFocusEffect(
        useCallback(() => {
            findCleaning();
        }, [])
    );



    const onRefresh = () => {
        findCleaning()
    };
    return (
        <Layout
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >

            {cleaningProps.length == 0 ? (
                <ClearView>
                    <Clean>Não há solicitações vigentes no momento</Clean>

                </ClearView>
            ) : (
                <ScrollView style={{ width: '100%' }}>
                    {cleaningProps && cleaningProps.map((item) => {
                        return (
                            <Card key={item.id} data={item} navigation={navigation} />
                        )
                    })}

                </ScrollView>

            )}
        </Layout>
    )
}