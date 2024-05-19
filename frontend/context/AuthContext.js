import React,{createContext,useState, useEffect} from 'react';
import {View,ScrollView, RefreshControl,Alert} from "react-native" 
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../util/Util';




export const AuthContext=createContext();

const AuthProvider=({children})=>{

 
const [isLoading, setIsLoading]=useState(false);
const [userToken,setUserToken]=useState(null)
const [_userId,_setUserId]=useState('')
const [businessOwnerToken,setBusinessOwnerToken]=useState(null)
const [_businessOwnerId,_setbusinessOwnerId]=useState('')



useEffect(()=>{
    isLoggedIn();
},[]);

// const handleLogin=()=>{
// navigation.navigate('Login')

// }


///this could potentially be a bug in the code



const UserLogin=async(credential,password)=>{

    await AsyncStorage.removeItem('businessOwnerToken')
await api.post('user/signin',{credential,password})
.then((res)=>{
    
    setIsLoading(true)
    console.log(res.data)
    if(res.data.success===true){
const token=res.data.userToken
    const userId=res.data.userId
    console.log("this is the userId "+ userId)
    AsyncStorage.setItem('userToken',token)
    AsyncStorage.setItem('userId',userId)
    _setUserId(userId)
    setUserToken(token);
    console.log("this is the token in login: "+token )

    }else{
        Alert.alert(res.data.message)
    }
     // const email= await AsyncStorage.setItem('userEmail',JSON.stringify(userInfo))
    setIsLoading(false);
}).catch((error)=>{

    if(error){
        console.log('error in login authContext: ',error.message)
    }
})
}



const BusinessOwnerLogin=async(credential,password)=>{

    await AsyncStorage.removeItem('businessOwnerToken')
await api.post('businessOwner/signin',{credential,password})
.then((res)=>{
    
    setIsLoading(true)
    console.log(res.data)
    if(res.data.success===true){
const token=res.data.businessOwnerToken
    const businessOwnerId=res.data.businessOwnerId
    console.log("this is the businessOwnerId "+ businessOwnerId)
    AsyncStorage.setItem('businessOwnerToken',token)
    AsyncStorage.setItem('businessOwnerId',businessOwnerId)
    _setBusinessOwnerId(businessOwnerId)
    setBusinessOwnerToken(token);
    console.log("this is the businessOwnertoken in login: "+token )

    }else{
        Alert.alert(res.data.message)
    }
     // const email= await AsyncStorage.setItem('userEmail',JSON.stringify(userInfo))
    setIsLoading(false);
}).catch((error)=>{

    if(error){
        console.log('error in businessOwnerlogin authContext: ',error.message)
    }
})
}



const UserLogout=async()=>{
    // setRefreshing(true)
    setIsLoading(true);
    setUserToken(null)
    await AsyncStorage.removeItem('userToken')
    await AsyncStorage.removeItem('userId')
    setIsLoading(false);
    // setRefreshing(false)

}



const BusinessOwnerLogout=async()=>{
    // setRefreshing(true)
    setIsLoading(true);
    setBusinessOwnerToken(null)
    await AsyncStorage.removeItem('businessOwnerToken')
    await AsyncStorage.removeItem('businessOwnerId')
    setIsLoading(false);
    // setRefreshing(false)

}

const isLoggedIn=async function(){
    try {
    setIsLoading(true)
    // const email=await AsyncStorage.getItem('email')
    // const password=await AsyncStorage.getItem('email')
    
    const _userToken=await AsyncStorage.getItem('userToken')
    const _businessOwnertoken=await AsyncStorage.getItem('businessOwnerToken')
    const userId=await AsyncStorage.getItem('userId')
    const businessOwnerId=await AsyncStorage.getItem('businessOwnerId')

    if(_userToken){
        setUserToken(_userToken)
        _setUserId(userId) 
        await AsyncStorage.removeItem('businessOwnerToken')
    }

    else if (_businessOwnertoken){
        setBusinessOwnerToken(_businessOwnertoken)
        _setbusinessOwnerId(businessOwnerId)
        await AsyncStorage.removeItem('userToken')
    
    }

    setIsLoading(false)
        
    } catch (error) {
        if(error){
            console.log('the error:',error.message)
        }
        
    }
    


}

return(

//     <View>

// <ScrollView
//    refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={logout}
//           />}>



    <AuthContext.Provider value={{UserLogin,UserLogout,BusinessOwnerLogin,BusinessOwnerLogout,isLoading,userToken,businessOwnerToken}}>
        {children}
    </AuthContext.Provider>
    
    // </ScrollView>
    // </View>
)
}

export default AuthProvider; 