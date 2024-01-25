import { styled } from "styled-components/native";

export const Container = styled.TouchableOpacity`
    margin: 10px;
    margin-top:10px;
    background-color: #191970;
    height: 100;
    border-bottom-left-radius: 10;
    border-bottom-right-radius: 10;
    border-top-left-radius: 10;
    border-top-right-radius: 10;
    justify-content:center;
`

export const ViewConted = styled.View`
margin-left:20;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
`

export const Title = styled.Text`
    color: #20B2AA;
    text-transform: capitalize;
    font-size:18;
`
export const Date = styled.Text`
color: white;


`
export const Status = styled.Text`
color: white;
text-transform: capitalize;
`