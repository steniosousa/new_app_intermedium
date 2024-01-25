import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ButtonSend, Container, Input, Label, Title, ViewInputs, TextButton, ViewTitle, Forgot, TextForgot, RegisterButton, TextRegister, ViewModal, Close } from './styled';
import { Alert, Clipboard, Linking, Modal } from 'react-native'
import Api from '../../../api/service';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

export default function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [key, setKey] = useState('')
    const navigation = useNavigation();
    
    function handleRegiser() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Register' }],
        });
    }


    const handleResetNavigation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };


    async function enterInHome() {
        const hash = await AsyncStorage.getItem('hash');
        if (hash) {
            handleResetNavigation()
        }
    }



    async function handleLogin() {
        if (key == '') {
            Alert.alert('Preencha o campo de senha!', '', [
                { text: 'Retornar' },
            ]);
            return
        }
        try {
            const { data } = await Api.get('user/find', { params: { key } })
            await AsyncStorage.removeItem('hash');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('hash', JSON.stringify(data.loginHash));
            await AsyncStorage.setItem('user', JSON.stringify(data));
            Alert.alert('Usuário logado com sucesso!', '', [
                {
                    text: 'Ok',
                    onPress: () => handleResetNavigation()
                    ,
                    style: 'cancel',
                },
            ]);
        } catch {
            Alert.alert('Chave de acesso não reconhecida!', '', [
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
    function singin() {
        navigation.navigate('Home')
    }

    function copy(data) {
        Clipboard.setString(data.loginHash)
        navigation.navigate('Home')
    }

    async function handleRecuper() {
        try {
            const { data } = await Api.get('/user/recuper', { params: { password, name } })
            await AsyncStorage.removeItem('hash');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('hash', JSON.stringify(data.loginHash));
            await AsyncStorage.setItem('user', JSON.stringify(data));
            Alert.alert(`Chave de acesso recuperada com sucesso! ${data.loginHash}`, 'Copie e salve sua chave de acesso em um lugar seguro', [
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
        } catch (error) {
            Alert.alert('Erro ao recuperar chave de acesso!', '', [
                { text: 'Retornar' },
            ]);
        }
    }


    useEffect(() => { enterInHome() }, [])

    return (
        <>
            <Container>
                <ViewTitle>
                    <Title>Digite sua chave de acesso</Title>
                </ViewTitle>
                <ViewInputs>
                    <Label>Chave de acesso</Label>
                    <Input onChangeText={setKey} />
                    <ButtonSend onPress={handleLogin}>
                        <TextButton>ENTRAR</TextButton>
                    </ButtonSend>
                    <Forgot onPress={() => setIsModalVisible(true)}>
                        <TextForgot >Esqueci a chave de acesso</TextForgot>
                    </Forgot>
                </ViewInputs>
            </Container>
            <RegisterButton onPress={handleRegiser}>
                <TextRegister>Criar chave de acesso</TextRegister>
            </RegisterButton>
            <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <ViewModal >

                    <Close onPress={() => setIsModalVisible(false)}>
                        <AntDesign name="closesquareo" size={30} color="black" />
                    </Close>
                    <Container>
                        <ViewTitle>
                            <Title>Recuperar chave de acesso</Title>
                        </ViewTitle>
                        <ViewInputs>
                            <Label>Nome</Label>
                            <Input onChangeText={setName} />
                            <Label>Senha</Label>
                            <Input onChangeText={setPassword} secureTextEntry={true} />
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
                            <ButtonSend onPress={handleRecuper}>
                                <TextButton>Recuperar</TextButton>
                            </ButtonSend>
                        </ViewInputs>
                    </Container>
                </ViewModal>
            </Modal>
        </>
    )
}