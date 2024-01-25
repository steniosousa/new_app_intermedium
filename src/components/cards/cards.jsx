import { Text, View } from "react-native";
import { Container, Date, Status, Title, ViewConted } from "./styled";
import { format, parseISO } from "date-fns";
import { MaterialIcons } from '@expo/vector-icons';


export default function Card({ data, navigation }) {
    function handleCamera() {
        navigation.navigate('Details', { param: data });
    }
    const parsedDate = parseISO(data.createdAt);
    const formattedDate = format(parsedDate, 'dd/MM/yyyy - HH:mm');

    return (
        <Container onPress={handleCamera}>
            <ViewConted>
                <View>
                    <Title>Ambiente: {data.Place.name}</Title>
                    <Date>Data: {formattedDate} hrs</Date>
                    <Status>Status:  {data.status}</Status>
                </View>
                <MaterialIcons name="clean-hands" size={40} color="white" />
            </ViewConted>
        </Container>
    )
}