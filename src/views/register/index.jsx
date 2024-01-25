import { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Clipboard } from 'react-native'
import Api from '../../../api/service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';

import { ButtonSend, Container, Input, Label, RegisterButton, TextButton, TextRegister, Title, ViewInputs, ViewTitle } from './styled'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Register() {
    const navigation = useNavigation();
    
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [companies, setCompanies] = useState([])
    const [companySelect, setCompanySelect] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    
    function handleLogin() {
        navigation.navigate('Login');
    }

    async function handleRegister() {
        Alert.alert('Carregando', '', [
            { text: 'Retornar' },
        ]);
        if (name == '' || password == '' || companySelect == '') {
            Alert.alert('Preencha todos os campos!', '', [
                { text: 'Retornar' },
            ]);
            return
        }

        function copy(data) {
            Clipboard.setString(data.loginHash)
            navigation.navigate('Home')
        }

        function singin() {
            navigation.navigate('Home')
        }

        try {
            const { data } = await Api.post('user/create', { name, password, companyId: companySelect })
            await AsyncStorage.setItem('hash', JSON.stringify(data.loginHash));
            await AsyncStorage.setItem('user', JSON.stringify(data));
            setName('')
            setPassword('')
            setCompanySelect('')
            Alert.alert(`Chave de acesso criada com sucesso! ${data.loginHash}`, 'Copie e salve sua chave de acesso em um lugar seguro', [
                {
                    text: 'Copiar',
                    onPress: () => copy(data),
                    style: 'cancel',
                },
                {
                    text: 'Enviar ao whatsapp',
                    onPress: () => sendWhatsappMessage(data.loginHash, data),
                },
                {
                    text: 'Ok',
                    onPress: () => singin(),
                },
            ]);
        }
        catch (error) {
            Alert.alert('Erro ao gerar chave de acesso!', '', [
                { text: 'Retornar' },
            ]);
        }
    }
    async function sendWhatsappMessage(chave, data) {
        const message = `Sua chave de acesso é:  ${chave}`;

        try {
            const url = `whatsapp://send?phone=+55${whatsapp}&text=${encodeURIComponent(message)}`;
            const supported = await Linking.canOpenURL(url);

            if (!supported) {
                Alert.alert('Erro ao abrir whatsapp!', '', [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Home')
                        ,
                        style: 'cancel',
                    },
                ]);
                return;
            }
            await AsyncStorage.setItem('hash', JSON.stringify(chave));
            await AsyncStorage.setItem('user', JSON.stringify(data));
            navigation.navigate('Home')

            await Linking.openURL(url);
        } catch (error) {
            Alert.alert('Erro ao enviar chave de acesso ao whatsapp!', '', [
                { text: 'Retornar' },
            ]);
        }

    };

    async function getCompanies() {
        try {
            const { data } = await Api.get('/companies/recover')
            setCompanies(data)
        } catch {
            Alert.alert('Erro ao recuperar empresas!', '', [
                { text: 'Retornar' },
            ]);
        }
    }

    useEffect(() => {
        getCompanies()
    }, [])
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 100, y: 0 }}
            scrollEnabled={true}
        >
            <Container>
                <ViewTitle>
                    <Title>Criar chave de acesso</Title>
                </ViewTitle>
                <ViewInputs>
                    <Label>Nome</Label>
                    <Input onChangeText={setName} />
                    <Label>Senha</Label>
                    <Input onChangeText={setPassword} secureTextEntry={true} />
                    <Label>Empresa</Label>
                    <Picker
                        selectedValue={companies}
                        onValueChange={(itemValue, itemIndex) =>
                            setCompanySelect(itemValue )
                        }>

                        {companies.map((item) => {
                            return (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            )
                        })}
                    </Picker>

                    <Label>Enviar chave por whatsapp</Label>
                    <TextInputMask
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(85) ',
                        }}
                        value={whatsapp}
                        onChangeText={(text) => setWhatsapp(text)}
                        placeholder="Telefone"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                    />
                    <ButtonSend onPress={handleRegister}>
                        <TextButton>CRIAR</TextButton>
                    </ButtonSend>
                </ViewInputs>
                <RegisterButton onPress={handleLogin}>
                    <TextRegister>Acessar com chave de acesso</TextRegister>
                </RegisterButton>
            </Container>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
});