import {  useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView } from 'react-native';
import { Container, Finalized, Info, PhotoArea, ReturnStatus, Space, TextFinalized, TextOptional, TextPhoto, TextReturnStatus, Title, TitleInfo, ViewInfos, ViewPhoto, ViewTitle } from './styled';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AWS from 'aws-sdk';
import Spinner from 'react-native-loading-spinner-overlay';
import {  useFocusEffect, useNavigation } from '@react-navigation/native';
import Api from '../../../api/service';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Details({ route }) {
    const user = AsyncStorage.getItem('user');

    const navigation = useNavigation();

    const { param } = route.params;
    const [evidenceSaved, setEvidenceSaved] = useState({})
    const [datas, setDatas] = useState({ name: 'null', status: "null", Place: { "name": '' }, ObjectOfCleaning: [{ "object": { "companyId": "ccba3a19-e37c-4713-ba55-4ccf37c9b560", "id": "323fca44-5ef7-4b68-8a6a-cb3f88978202", "name": "Mesa" } }] })
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('')
    const [evidences, setEvidences] = useState([])

    const verifyPhotos = async () => {
        try {
            const AsyncStorageSave = await AsyncStorage.getItem(param.id)
            if (!AsyncStorageSave) return
            setEvidenceSaved(JSON.parse(AsyncStorageSave))
        } catch (error) {
            setEvidenceSaved([])
        }
    };

    async function deleteFilesInIntermediumFolder() {
        try {
            await AsyncStorage.removeItem(param.id)
        } catch (error) {
            console.error('Erro ao excluir os arquivos:', error);
        }
    };

    async function sandToS3(name, buffer) {
        const decodedBuffer = base64.toByteArray(buffer);;
        const s3 = new AWS.S3({
            accessKeyId: 'AKIAT4VTFBSLUAR335WF',
            secretAccessKey: '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',
            region: 'us-east-2',
        });

        const datas = {
            Bucket: 'intermedium-connect',
            Key: name + Date.now() + '.jpeg',
            Body: decodedBuffer,
        };
        try {
            const response = await s3.upload(datas).promise();
            return response.Location
        } catch (error) {
            Alert.alert('Não foi possível gravar imagem!', '', [
                { text: 'Retornar' },
            ]);
        }
    }
    async function TakesCleaning() {
        if (status === 'PENDENTE') {
            setIsLoading(true)
            const objSand = {
                id: param.id, status: "ASSUMIDO", userId: user.id
            }

            try {
                const { data } = await Api.post('/cleaning/update', objSand);
                setDatas(data)
                setIsLoading(false)


            } catch (error) {
                setIsLoading(false)

                Alert.alert('Não foi possível assumir a solicitação', '', [
                    { text: 'Retornar' },
                ]);
            }

        }
        else {
            if (!evidenceSaved["ENTRANCE"] || !evidenceSaved["EXIT"]) {
                Alert.alert('Por favor, gravar as principais evidências!', '', [
                    { text: 'Retornar' },
                ]);
                return
            }

            const locations = ['ENTRANCE', 'EXIT', 'OBSERVATION', 'OBSERVATION1', 'OBSERVATION2']
            const { id } = param
            const keys = await AsyncStorage.getItem(id)
            if (!keys) return
            locations.map(async (item) => {
                if (JSON.parse(keys)[`${item}`].evidence == undefined) return
                const evidence64 = await FileSystem.readAsStringAsync(JSON.parse(keys)[`${item}`].evidence, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                const urlS3 = await sandToS3(JSON.parse(keys)[`${item}`].evidence, evidence64)
                const obj = { id, type: item , evidenceUrl: urlS3  };
                setEvidences((old) => [...old, obj]);
            })
            try {
                console.log(evidences)
                await Api.post('/cleaning/update', { body: { Evidences: evidences } });
                setIsLoading(false)
                deleteFilesInIntermediumFolder()
               

                navigation.navigate("Home")
            } catch (error) {
                console.log(error)
                verifyPhotos()
                setIsLoading(false)
                Alert.alert('Não foi possível atualizar solicitação!', '', [
                    { text: 'Retornar' },
                ]);
            }



        }
    }

    function handleExist() {
        Alert.alert('Não permitido criar evidência!', '', [
            { text: 'Ok!' },
        ]);

    }

    function handleCam(data) {
        const { id } = param
        if (datas.status == "PENDENTE") {
            Alert.alert('Evidência não assumida!', '', [
                { text: 'Ok!' },
            ]);
            return
        }
        navigation.navigate('Cam', { param: { data, id } });
    }

    async function returnStatus() {

        Alert.alert('Deseja regredir o status da solicitação para PENDENTE?', 'Ao confirmar perderá as evidências já registradas', [
            {
                text: 'Cancelar',
                onPress: () => { return },
            },
            {
                text: 'Confirmar',
                onPress: () => confirmReturnStatus()
            },

        ]);
    }

    async function confirmReturnStatus() {
        await AsyncStorage.removeItem(param.id)

        const objSand = {
            id: param.id, status: "PENDENTE", userId: user.id
        }



        try {
            const { data } = await Api.post('/cleaning/update', objSand);
            setEvidenceSaved([])
            setDatas(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            Alert.alert('Não foi possível retornar a solicitação', '', [
                { text: 'Retornar' },
            ]);
        }
    }


    useFocusEffect(
        useCallback(() => {
            setEvidenceSaved([])
            verifyPhotos()
        }, [])
    );
    useEffect(() => {
        setDatas(param)
    }, [])

    useEffect(() => {
        setStatus(datas.status)
    }, [datas])
    return (
        <ScrollView>
            <Container>
                <ViewTitle>
                    <Title>Informações da solicitação</Title>
                </ViewTitle>
                <Space>
                    <ViewInfos>
                        <TitleInfo>Espaço</TitleInfo>
                        <Info>{!datas.Place ? 'Espaço de limpeza' : datas.Place.name}</Info>
                    </ViewInfos>

                    <ViewInfos>
                        <TitleInfo>Higienizar</TitleInfo>
                        <FlatList
                            data={datas.ObjectOfCleaning}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <Info>{item.object.name}</Info>
                            )}
                            keyExtractor={(item) => item.object.id}
                        />
                    </ViewInfos>
                </Space>
            </Container>
            <ViewPhoto>
                {evidenceSaved && evidenceSaved["ENTRANCE"] ? (
                    <PhotoArea onPress={() => handleExist()}>
                        <Feather name="camera-off" size={30} color="#191970" />
                        <TextPhoto>Já registrado</TextPhoto>
                    </PhotoArea>

                ) : (
                    <PhotoArea onPress={() => handleCam('ENTRANCE')}>
                        <FontAwesome name="camera-retro" size={30} color="#191970" />
                        <TextPhoto>Evidenciar entrada</TextPhoto>
                    </PhotoArea>
                )}

                {evidenceSaved && evidenceSaved["EXIT"] ? (
                    <PhotoArea onPress={() => handleExist()}>
                        <Feather name="camera-off" size={30} color="#191970" />
                        <TextPhoto>Já registrado</TextPhoto>
                    </PhotoArea>
                ) : evidenceSaved && !evidenceSaved["ENTRANCE"] ? (
                    <PhotoArea onPress={() => handleExist()}>
                        <Feather name="camera-off" size={30} color="#191970" />
                        <TextPhoto>Registre a entrada</TextPhoto>
                    </PhotoArea>
                ) : (
                    <PhotoArea onPress={() => handleCam('EXIT')}>
                        <FontAwesome name="camera-retro" size={30} color="#191970" />
                        <TextPhoto>Evidenciar saída</TextPhoto>
                    </PhotoArea>
                )}




            </ViewPhoto>
            <TextOptional>Evidencias opcionais</TextOptional>
            <ViewPhoto>
                {evidenceSaved && evidenceSaved["OBSERVATION"] ? (
                    <PhotoArea onPress={() => handleExist()}>
                        <Feather name="camera-off" size={30} color="#191970" />
                        <TextPhoto>Já registrado</TextPhoto>
                    </PhotoArea>

                ) : (
                    <PhotoArea onPress={() => handleCam('OBSERVATION')}>
                        <FontAwesome name="camera-retro" size={30} color="#191970" />
                        <TextPhoto>Primeira observação</TextPhoto>
                    </PhotoArea>
                )}
                {evidenceSaved && evidenceSaved["OBSERVATION1"] ? (
                    <PhotoArea onPress={() => handleExist()}>
                        <Feather name="camera-off" size={30} color="#191970" />
                        <TextPhoto>Já registrado</TextPhoto>
                    </PhotoArea>

                ) : (
                    <PhotoArea onPress={() => handleCam('OBSERVATION1')}>
                        <FontAwesome name="camera-retro" size={30} color="#191970" />
                        <TextPhoto>Segunda observação</TextPhoto>
                    </PhotoArea>
                )}
            </ViewPhoto>
            <ViewPhoto>
                {evidenceSaved && evidenceSaved["OBSERVATION2"] ? (
                    <PhotoArea onPress={() => handleExist()}>
                        <Feather name="camera-off" size={30} color="#191970" />
                        <TextPhoto>Já registrado</TextPhoto>
                    </PhotoArea>

                ) : (
                    <PhotoArea onPress={() => handleCam('OBSERVATION2')}>
                        <FontAwesome name="camera-retro" size={30} color="#191970" />
                        <TextPhoto>Terceira observação</TextPhoto>
                    </PhotoArea>
                )}

            </ViewPhoto>
            <Finalized onPress={() => TakesCleaning()}>
                {status == 'ASSUMIDO' && evidenceSaved && evidenceSaved["ENTRANCE"] && evidenceSaved["EXIT"] ? (
                    <TextFinalized>CONCLUIR</TextFinalized>

                ) : (
                    <TextFinalized>{status}</TextFinalized>
                )}

            </Finalized>
            {status == 'ASSUMIDO' ? (
                <ReturnStatus onPress={() => returnStatus()}>
                    <TextReturnStatus >Retornar Status para Pendente</TextReturnStatus>
                </ReturnStatus>

            ) : null}
            <Spinner
                visible={isLoading}
                textContent={'Carregando...'}
                textStyle={{ color: '#FFF' }}
            />
        </ScrollView>
    )
}