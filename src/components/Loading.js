import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text
} from 'react-native';


import LottieView from 'lottie-react-native';

function Loading({
    visible = false,
    city= '',
    from = ''
}) {







    // console.log(this.props.cartItems.length)


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} >

            <Modal visible={visible}   animationType="slide"
        transparent={false} style={{ backgroundColor: 'rgba(255,255,255,0)', elevation: 0, shadowOpacity: 0,}}  >
               <LottieView
                    style={{ height: '64%', width: '70%' }}

                    autoPlay
                    source={require('../animations/bus_animation.json')}
                />
<Text style={{alignSelf:'center', fontSize:18, fontFamily:'OpenSans-Light', marginTop:-150}}  >Buscando rutas...</Text>
                {
                    from != '' ?
                   <View style={{marginTop:20}}>
                        
                    <Text style={{alignSelf:'center', fontSize:22, fontFamily:'OpenSans-Regular'}} >Desde:</Text>
                    <Text style={{alignSelf:'center', fontSize:35, fontFamily:'OpenSans-SemiBold', marginTop:3}}>{from}</Text>
                    <Text style={{alignSelf:'center', fontSize:22, fontFamily:'OpenSans-Regular', marginTop:19}}>Hacia:</Text>
                    <Text style={{alignSelf:'center', fontSize:35, fontFamily:'OpenSans-SemiBold', marginTop:3}}>{city}</Text>

                   </View>

                    :
                    <View style={{marginTop:20}}>
                        
                        <Text style={{alignSelf:'center', fontSize:18, fontFamily:'OpenSans-Regular', marginTop:19}}>Hacia:</Text>
                    <Text style={{alignSelf:'center', fontSize:27, fontFamily:'OpenSans-SemiBold', marginTop:3}}>{city}</Text>

                   </View>
                }


            </Modal>
        </View>
    );

};



export default Loading;
