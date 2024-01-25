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


export const ViewModal = styled.SafeAreaView`
    height: 100%;
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
    top:20;
`

export const TextInfo = styled.Text``

export const ViewImges = styled.View`
   width: 100%;
   height: 100%;
`

export const ImageTouch = styled.TouchableOpacity``

export const ImageEvidence = styled.Image`
    height: 90%;
    width:100%;
    border-bottom-left-radius: 5;
    border-bottom-right-radius: 5;
    border-top-left-radius: 5;
    border-top-right-radius: 5;
    margin-bottom:0;
`
export const ViewButton = styled.View`
    display: flex;
    flex-direction:row;
    justify-content:space-around;
    height: 40;
`

export const ButtonExit = styled.TouchableOpacity`
    background: blue;
    justify-content:center;
    align-items:center;
    padding-left:15;
    border-bottom-left-radius: 5;
    border-bottom-right-radius: 5;
    border-top-left-radius: 5;
    border-top-right-radius: 5;
    padding-right:15;
    `

export const TextButton = styled.Text`
    color:white;
`

export const TitleImage = styled.Text`
    align-self:center;
    background: #20B2AA;
    text-transform: capitalize; 
    padding-top:15;
    padding-bottom:15;
    color:white;
    width: 100%;
    text-align:center;
    margin-top:5;
    font-size:18;
` 