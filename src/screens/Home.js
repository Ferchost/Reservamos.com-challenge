import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios'
import Loading from '../components/Loading'
import Styles from '../../Styles'
import { NavigationContext } from '@react-navigation/native'
import RBSheet from "react-native-raw-bottom-sheet";
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import { createFilter } from 'react-native-search-filter';


const KEYS_TO_FILTERS = ['display'];

import _ from 'lodash'


class HomeScreen extends React.Component {
    static contextType = NavigationContext;
    componentDidMount(){
        this.getCities()
       setTimeout(() => {
        const filter = _.filter(this.state.cities, function (item) { return item.result_type == "city"; });
        this.setState({cities:filter})
       }, 2000);
    }

    state = {
        origen: '',
        destino: '',
        origen_slug:'',
        destino_slug:'',
        datos: [],
        cities:[],
        search:''
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
               // console.log(response.data);
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
          

            var config = {
                method: 'get',
                url:  `https://search.reservamos.mx/api/v2/places?q=${this.state.destino_slug}&from=${this.state.origen_slug}` ,
                headers: {}
            };

            axios(config)
                .then(function (response) {
                    //console.log(response.data);
                    that.setState({ datos:response.data})


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
        const filter_city = this.state.cities.filter(createFilter(this.state.search, KEYS_TO_FILTERS))


        return (
            <View style={Styles.pageView} >
                <Image source={require('../assets/fondo.png')} style={Styles.backgroundTop} />
                <Image source={require('../assets/logo.png')} style={Styles.logo} />


                <Text style={Styles.titleHome} >Verificador de rutas</Text>
                <Text style={Styles.subTitleHome} >Descubre si hay rutas disponibles para{'\n'}tu próxima aventura</Text>

                <View style={Styles.searchView}>

                    <TouchableOpacity onPress={()=>this.destino.open()} style={Styles.firstSearchView} >

                        <Icon name="map-marker" size={30} color="#232323" style={{ width: '10%', marginLeft: '4%' }} />
                        <View style={{ width: 320, marginRight: 12 }}>
                            <TextInput editable={false} value={this.state.destino} onChangeText={text => this.setState({ destino: text })} placeholder='Viajar a...' placeholderTextColor='gray' style={{ fontFamily: 'OpenSans-Light', fontSize: 18,color:"#232323" }} />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.origen.open()} style={Styles.secondSearchView} >

                        <Icon name="map-marker" size={30} color="#232323" style={{ width: '10%', marginLeft: '4%' }} />
                        <View style={{ width: 320, marginRight: 12 }}>
                            <TextInput editable={false} value={this.state.origen} onChangeText={text => this.setState({ origen: text })} placeholder='Desde...' placeholderTextColor='gray' style={{ fontFamily: 'OpenSans-Light', fontSize: 18, color:"#232323" }} />
                        </View>

                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={() => this.navigate()} style={Styles.buttonRuta} >
                    <Text style={Styles.textButtonRuta} >Buscar Rutas</Text>

                </TouchableOpacity>
               
                <RBSheet
          ref={ref => {
            this.destino = ref;
          }}
          height={450}
          openDuration={250}
          customStyles={{
            container: {
                backgroundColor:'#f9f9f9',
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius:12, borderTopLeftRadius:12
            }
          }}
        >
            <ScrollView style={{width:'100%'}}>
            <View style={{ width: '100%', height: 52, backgroundColor: '#f9f9f9', borderRadius: 7, fontSize: 16, marginLeft: '3%', flexDirection: 'row', alignItems: 'center', marginRight:'3%' }} >
            <SimpleLine size={25} name="magnifier" color={'#646464'} style={{ marginLeft: 10, marginRight: 10 }} />
            <TextInput style={{ fontSize: 18, color: '#646464', width: '80%', height: '100%' }} clearButtonMode='always' placeholder='Buscar destino' placeholderTextColor='#646464' value={this.state.search} onChangeText={(text) => this.setState({ search: text })} />

          </View>

                {
                    filter_city.map((ciudad, index)=>(
                        <TouchableOpacity onPress={()=>{
                            this.setState({
                                destino:ciudad.display,
                                destino_slug: ciudad.city_slug,
                                search:''
                            })
                            this.destino.close()
                        }} key={index} style={{marginBottom:10}}>
                            <View style={Styles.itemBottom}>
        <View style={{ paddingTop: 10, paddingBottom: 10, marginLeft: 15 }}>
            <Text style={Styles.title}>{ciudad.display}</Text>
            <Text style={Styles.subTitle}>{ciudad.state}, {ciudad.country} </Text>
            <Text style={Styles.coordinates}>{ciudad.lat}, {ciudad.long}</Text>
        </View>
    </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

        </RBSheet>

        <RBSheet
          ref={ref => {
            this.origen = ref;
          }}
          height={450}
          openDuration={250}
          customStyles={{
            container: {
                backgroundColor:'#f9f9f9',
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius:12, borderTopLeftRadius:12
            }
          }}
        >
            <ScrollView style={{width:'100%'}}>
            <View style={{ width: '100%', height: 52, backgroundColor: '#f9f9f9', borderRadius: 7, fontSize: 16, marginLeft: '3%', flexDirection: 'row', alignItems: 'center', marginRight:'3%' }} >
            <SimpleLine size={25} name="magnifier" color={'#646464'} style={{ marginLeft: 10, marginRight: 10 }} />
            <TextInput style={{ fontSize: 18, color: '#646464', width: '80%', height: '100%' }} clearButtonMode='always' placeholder='Buscar destino' placeholderTextColor='#646464' value={this.state.search} onChangeText={(text) => this.setState({ search: text })} />

          </View>

                {
                    filter_city.map((ciudad, index)=>(
                        <TouchableOpacity onPress={()=>{
                            this.setState({
                                origen:ciudad.display,
                                origen_slug: ciudad.city_slug,
                                search:''
                            })
                            this.origen.close()
                        }} key={index} style={{marginBottom:10}}>
                            <View style={Styles.itemBottom}>
        <View style={{ paddingTop: 10, paddingBottom: 10, marginLeft: 15 }}>
            <Text style={Styles.title}>{ciudad.display}</Text>
            <Text style={Styles.subTitle}>{ciudad.state}, {ciudad.country} </Text>
            <Text style={Styles.coordinates}>{ciudad.lat}, {ciudad.long}</Text>
        </View>
    </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

        </RBSheet>



                {/* <Loading visible={true} city={'Cancun'} from={'Guadalajara'}/> */}
            </View>
        );
    }
}



export default HomeScreen;