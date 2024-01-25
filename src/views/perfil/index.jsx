import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback,  useState } from "react";
import { Alert, RefreshControl, ScrollView } from "react-native";
import Api from "../../../api/service";
import CardPerfil from "../../components/CardsPerfil";
import { CleanHistory, Container, Infos, SubTitle, Title, ViewInfos } from "./styled";
import { useFocusEffect } from "@react-navigation/native";


export default function Perfil() {
    const [history, setHistory] = useState([])
    const [userDatas, setUserDatas] = useState({})
    const [refreshing, setRefreshing] = useState(false);


    async function getUser() {
        const user = await AsyncStorage.getItem('user')
        const userId = JSON.parse(user)
        setUserDatas(userId)
        try {
            const { data } = await Api.get('histories/recover', { params: { userId: userId.id } })
            setHistory(data)
        }
        catch (error) {
            Alert.alert('Não foi possível recuperar histórico!', '', [
                { text: 'Retornar' },
            ]);

        }
    }
    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );

    const onRefresh = () => {
        getUser()
    };
    return (
        <Container>
            <Infos>
                <ViewInfos>
                    <Title>Usuário:</Title>
                    <SubTitle>{userDatas.name}</SubTitle>
                </ViewInfos>

                <ViewInfos>
                    <Title>Chave de acesso:</Title>
                    <SubTitle>{userDatas.loginHash}</SubTitle>
                </ViewInfos>
            </Infos>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {history.length == 0 ? (
                    <CleanHistory>Sem histórico para ser exibido</CleanHistory>
                ) : null}
                {history && history.map((item) => {
                    return (
                        <CardPerfil data={item} />
                    )
                })}

            </ScrollView>
        </Container>
    )
}