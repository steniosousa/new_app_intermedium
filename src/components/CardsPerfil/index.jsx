import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Container, Date, Status, Title, ViewConted } from "./styled";
import { format, parseISO } from "date-fns";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function CardPerfil({ data }) {
    const [objects, setObects] = useState()
    const navigation = useNavigation()
    function handleCamera() {
        navigation.navigate('ImageCarousel', { param: { data } });
    }


    const parsedDate = parseISO(data.createdAt);
    const formattedDate = format(parsedDate, 'dd/MM/yyyy - HH:mm');



    useEffect(() => {
        const objects = data.ObjectOfCleaning.map((object) => object.object.name).join(', ');
        setObects(objects)
    }, [])

    return (
        <>
            <Container onPress={handleCamera}>
                <ViewConted>
                    <View>
                        <Title>Ambiente: {data.Place.name || 'Aguardando...'}</Title>
                        <Date>Data: {formattedDate} hrs</Date>
                        <Status>Objetos:  {objects}</Status>
                    </View>
                    <MaterialIcons name="clean-hands" size={40} color="white" />
                </ViewConted>
            </Container>
        </>
    );
}
