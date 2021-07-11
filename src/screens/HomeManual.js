import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios'
import Loading from '../components/Loading'
import Styles from '../../Styles'
import { NavigationContext } from '@react-navigation/native'
import RBSheet from "react-native-raw-bottom-sheet";


class HomeScreen extends React.Component {
    static contextType = NavigationContext;


    state = {
        origen: '',
        destino: '',
        datos: [],
        cities:[]
    }


    getCities =()=>{
        const that = this
        var config = {
            method: 'get',
            url:  'https://search.reservamos.mx/api/v2/places',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                that.setState({ cities: response.data })


                //  console.log(JSON.stringify(datos));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getData = () => {
        if (this.state.destino !== '') {
            const that = this
            const origenB = this.state.origen.replace(/\s/g, '-')
            const destinoB = this.state.destino.replace(/\s/g, '-')

            var config = {
                method: 'get',
                url: (origenB != '' ? `https://search.reservamos.mx/api/v2/places?q=${destinoB.toLowerCase()}&from=${origenB.toLowerCase()}` : `https://search.reservamos.mx/api/v2/places?q=${destinoB.toLowerCase()}`),
                headers: {}
            };

            axios(config)
                .then(function (response) {
                    console.log(response.data);
                    that.setState({ datos: response.data })


                    //  console.log(JSON.stringify(datos));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            Alert.alert('Ingresa un destino')
        }
    }



    navigate = () => {
        const navigation = this.context
        this.getData()


        setTimeout(() => {
            navigation.navigate('Results', {
                data: this.state.datos,
                city: this.state.destino,
                origen: this.state.origen
            });
        }, 1000);
    }

    render() {

        return (
            <View style={Styles.pageView} >
                <Image source={require('../assets/fondo.png')} style={Styles.backgroundTop} />
                <Image source={require('../assets/logo.png')} style={Styles.logo} />


                <Text style={Styles.titleHome} >Verificador de rutas</Text>
                <Text style={Styles.subTitleHome} >Descubre si hay rutas disponibles para{'\n'}tu próxima aventura</Text>

                <View style={Styles.searchView}>

                    <View style={Styles.firstSearchView} >

                        <Icon name="map-marker" size={30} color="#232323" style={{ width: '10%', marginLeft: '4%' }} />
                        <View style={{ width: 320, marginRight: 12 }}>
                            <TextInput placeholderTextColor='gray' value={this.state.destino} onChangeText={text => this.setState({ destino: text })} placeholder='Viajar a...' style={{ fontFamily: 'OpenSans-Light', fontSize: 18 }} />
                        </View>

                    </View>
                    <View style={Styles.secondSearchView} >

                        <Icon name="map-marker" size={30} color="#232323" style={{ width: '10%', marginLeft: '4%' }} />
                        <View style={{ width: 320, marginRight: 12 }}>
                            <TextInput placeholderTextColor='gray' value={this.state.origen} onChangeText={text => this.setState({ origen: text })} placeholder='Desde... (opcional)' style={{ fontFamily: 'OpenSans-Light', fontSize: 18 }} />
                        </View>

                    </View>

                </View>

                <TouchableOpacity onPress={() => this.navigate()} style={Styles.buttonRuta} >
                    <Text style={Styles.textButtonRuta} >Buscar Rutas</Text>

                </TouchableOpacity>
                <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} />
                <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={450}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius:12, borderTopLeftRadius:12
            }
          }}
        >

        </RBSheet>



                {/* <Loading visible={true} city={'Cancun'} from={'Guadalajara'}/> */}
            </View>
        );
    }
}



export default HomeScreen;