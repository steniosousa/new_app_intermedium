import styled from 'styled-components/native';

export const Container = styled.View`
    height:auto;
    width:90%;
    background:white;
    align-self:center;
    margin-top:5%;
`

export const ViewTitle = styled.View`
    justify-content:center;
    border-bottom-width: 1px;
    border-bottom-color: #D3D3D3	;
    border-left-width: 0px;
    border-left-color: black;
    border-right-width: 0px;
    border-right-color: gray;
    height: 50;
`
export const Title = styled.Text`
    font-weight: bold;
    align-items:center;
    padding-left:10;
    margin-left:5 ;
    margin-right:5;

    `

export const ViewInputs = styled.View`
    justify-content:center;
    width: 70%;
    align-self:center;
    margin-top:50;
  
`

export const Label = styled.Text`
    font-weight: bold;
    margin-bottom:5;
`
export const Input = styled.TextInput`
    border: 1px solid #191970;
    padding-left:10;
    height: 40;
    border-radius:5px;
`

export const ButtonSend = styled.TouchableOpacity`
    background:#191970 ;
    margin-top:20;
    align-items:center;
    height: 30;
    justify-content:center;
    border-radius:10px;
`

export const TextButton = styled.Text`
    color:white;
    font-weight:bold;
`

export const Forgot = styled.TouchableOpacity`
    align-items:center;
    margin-top:40;
    margin-bottom:40;
   
`

export const TextForgot = styled.Text`
    color:#191970;
    text-decoration: underline;
    text-decoration-color: #191970;
`

export const RegisterButton = styled.TouchableOpacity`
align-self:center;
margin-top:10;
`

export const TextRegister = styled.Text`
color:grey;
`


export const ViewModal = styled.SafeAreaView`
    height: 90%;
    margin:10px;
`

export const InfosView = styled.View`
    justify-content:center;
    margin: 10px;
    margin-left:20px;
    height: 100;

`

export const ViewCloseAndInfo = styled.View`
    `

export const Close = styled.TouchableOpacity`
    position:absolute;
    right: 20;
    z-index:9;
    top:20;
`




