import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { BoxInfo, ImageEvidence, SUbTitle, TextCentral, Title, ViewInfos } from './styled';

const ImageCarousel = ({ route }) => {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [ambiente, setAmbiente] = useState('')
    const { param } = route.params;

    async function startModal() {
        const userJson = await AsyncStorage.getItem('user')
        const user = JSON.parse(userJson)
        setAmbiente(param.data.Place.name)
        setName(user.name)

        const parsedDate = parseISO(param.data.createdAt);
        const formattedDateStart = format(parsedDate, 'dd/MM/yyyy - HH:mm');

        const parsedDateFinish = parseISO(param.data.updatedAt);
        const formattedDateFinish = format(parsedDateFinish, 'dd/MM/yyyy - HH:mm');
        setStartDate(formattedDateStart)
        setFinishDate(formattedDateFinish)


    }


    useEffect(() => {
        startModal()

    }, [])
    return (
        <Swiper style={styles.wrapper} showsButtons={true}>
            <ViewInfos>
                <BoxInfo>
                    <Title>Nome:</Title>
                    <SUbTitle>{name || 'Aguardando...'}</SUbTitle>
                </BoxInfo>
                <BoxInfo>
                    <Title>Ambiente:</Title>
                    <SUbTitle>{ambiente || 'Aguardando...'}</SUbTitle>
                </BoxInfo>
                <BoxInfo>
                    <Title>Criado em:</Title>
                    <SUbTitle>{startDate || 'Aguardando...'}</SUbTitle>
                </BoxInfo>
                <BoxInfo>
                    <Title>Finalizado em:</Title>
                    <SUbTitle>{finishDate || 'Aguardando...'}</SUbTitle>
                </BoxInfo>
                <TextCentral>Verifique a autenticidade de suas evidências</TextCentral>
                <ImageEvidence source={{ uri: param.data.evidences[0].evidenceUrl }} />
                <ImageEvidence source={{ uri: param.data.evidences[1].evidenceUrl }} />
            </ViewInfos>


            <View style={styles.slide}>
                <Image
                    source={{ uri: param.data.evidences[0].evidenceUrl } }
                    style={styles.image}
                />
            </View>

            <View style={styles.slide}>
                <Image
                    source={{ uri: param.data.evidences[1].evidenceUrl }}
                    style={styles.image}
                />
            </View>

            <View style={styles.slide}>
                <Image
                    source={{ uri: param.data.evidences[2]?.evidenceUrl ? param.data.evidences[2].evidenceUrl : '' } }
                    style={styles.image}
                />
            </View>
            <View style={styles.slide}>
                <Image
                    source={{ uri: param.data.evidences[3]?.evidenceUrl ? param.data.evidences[2].evidenceUrl : '' }}
                    style={styles.image}
                />
            </View>
            <View style={styles.slide}>
                <Image
                    source={{ uri: param.data.evidences[4]?.evidenceUrl ? param.data.evidences[2].evidenceUrl : '' } }
                    style={styles.image}
                />
            </View>
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImageCarousel;
