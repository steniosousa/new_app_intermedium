import { styled } from "styled-components/native";

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
    margin-bottom:10;
`
export const Title = styled.Text`
    font-weight: bold;
    align-items:center;
    padding-left:10;
    margin-left:5 ;
    margin-right:5;
    font-size:18;
    `
export const ViewInfos = styled.View``
export const TitleInfo = styled.Text`
    color:black;
 font-weight: bold;
 margin-left:10px;
 
`

export const Info = styled.Text`
color:#696969;
 margin:10px;
 text-transform: uppercase;
 `

export const Space = styled.View`
display:flex;

`
export const ViewPhoto = styled.View`
display:flex;
flex-direction:row;
justify-content:space-around;
margin-top:20;
`
export const PhotoArea = styled.TouchableOpacity`   
    align-items:center;
    justify-content:center;
    height: 80;
    width: 150;
    background: white;
    border-bottom-left-radius: 10;
    border-bottom-right-radius: 10;
    border-top-left-radius: 10;
    border-top-right-radius: 10;
`

export const TextPhoto = styled.Text`
    color:#191970	;
`

export const Finalized = styled.TouchableOpacity`
    width: 80%;
    height: 30;
    background: #191970 ;
    align-items:center; 
    align-self:center;
    justify-content:center;
    border-bottom-left-radius: 5;
    border-bottom-right-radius: 5;
    border-top-left-radius: 5;
    border-top-right-radius: 5;
    margin-top:100;
`

export const TextFinalized = styled.Text`
color:white;
text-transform: uppercase;
font-weight:bold;
`

export const TextOptional = styled.Text`
align-self:center;
color:grey;
margin-top:10px;
`

export const ReturnStatus = styled.TouchableOpacity`
align-self:center;
margin-top:10;
`

export const TextReturnStatus = styled.Text`
font-weight:200;
`