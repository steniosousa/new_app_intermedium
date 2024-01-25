import { styled } from "styled-components/native";

export const Layout = styled.ScrollView`
   flex:1;
`

export const Clean = styled.Text`
    font-size:18;
    text-transform: uppercase;
    color: black;
    text-align:center;
    width: 70%;

`
export const ClearView = styled.View`
    height: 100%;
    width: 100%;
    align-items:center;
    justify-content:center;
`

export const RequestPermission = styled.TouchableOpacity`
    flex:1;
    justify-content:center;
    align-items:center;
    background:white;
`