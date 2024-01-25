import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/views/login';
import Register from './src/views/register';
import Details from './src/views/details';
import Cam from './src/components/camera';
import Perfil from './src/views/perfil';
import ImageCarousel from './src/components/ModalImages';
import Home from './src/views/home';
import { TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { styled } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const HeaderTitle = styled.Text`
font-size: 20px;
color: white;
font-weight: bold;
`;

const RoundedHeader = styled.View`
background-color: transparent;
padding: 10px;
text-align:left;

`;
function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator
        initialRouteName={'Login'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({ 
            headerTitle: () => (
              <RoundedHeader>
                <HeaderTitle>Home</HeaderTitle>
              </RoundedHeader>
            ),
            headerStyle: {
              backgroundColor: '#191970',
              borderBottomWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 110,
            },
            headerTintColor: '#FFFFFF',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Perfil');
                }}
                style={{ marginRight: 20, marginTop: 5 }}
              >
                <AntDesign name="user" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => (
              <RoundedHeader>
                <HeaderTitle>Inserir chave de acesso</HeaderTitle>
              </RoundedHeader>
            ),
            headerStyle: {
              backgroundColor: '#191970',
              borderBottomWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 110
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => (
              <RoundedHeader>
                <HeaderTitle>Criar chave de acesso</HeaderTitle>
              </RoundedHeader>
            ),
            headerStyle: {
              backgroundColor: '#191970',
              borderBottomWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 110
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTitle: () => (
              <RoundedHeader>
                <HeaderTitle>Solicitação</HeaderTitle>
              </RoundedHeader>
            ),
            headerStyle: {
              backgroundColor: '#191970',
              borderBottomWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 110
            },
            headerTintColor: '#FFFFFF',
          }}
        />


        <Stack.Screen
          name="Cam"
          component={Cam}
          options={{
            headerTitle: () => (
              <RoundedHeader>
                <HeaderTitle>Câmera</HeaderTitle>
              </RoundedHeader>
            ),
            headerStyle: {
              backgroundColor: '#191970',
              borderBottomWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 110
            },
            headerTintColor: '#FFFFFF',
          }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={({ navigation }) => ({ 
            headerTitle: () => (
              <RoundedHeader>
                <HeaderTitle>Perfil</HeaderTitle>
              </RoundedHeader>
            ),
            headerStyle: {
              backgroundColor: '#191970',
              borderBottomWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 110,
            },
            headerTintColor: '#FFFFFF',
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem('hash');
                  await AsyncStorage.removeItem('user');
                  navigation.navigate('Login');
                }}
                style={{ marginRight: 20, marginTop: 5 }}
              >
                <SimpleLineIcons name="logout" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="ImageCarousel"
          component={ImageCarousel}
          options={() => ({ // Pass the navigation object as a parameter
            headerTitle: () => (
              <RoundedHeader>
                <HeaderTitle>Evidencias</HeaderTitle>
              </RoundedHeader>
            ),
            headerStyle: {
              backgroundColor: '#191970',
              borderBottomWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 110,
            },
            headerTintColor: '#FFFFFF',
          })}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
