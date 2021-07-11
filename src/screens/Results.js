import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Loading from '../components/Loading'
import _ from 'lodash'
import Styles from '../../Styles'
const Item = ({ ciudad, estado, pais, lat, long }) => (
    <View style={Styles.item}>
        <Image style={{ height: '100%', width: '30%' }} source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=10&size=400x400&key=AIzaSyAcZzpwZ7WkhqfdrN5q-whKGgsBO94TBx0` }} />
        <View style={{ paddingTop: 25, paddingBottom: 25, marginLeft: 15 }}>
            <Text style={Styles.title}>{ciudad}</Text>
            <Text style={Styles.subTitle}>{estado}, {pais} </Text>
            <Text style={Styles.coordinates}>{lat}, {long}</Text>
        </View>
    </View>
);
function Results({ navigation, route }) {
    const { city, origen, data } = route.params;
    const [loading, setLoading] = useState(true)
    const [dataD, setData] = useState([])

    useEffect(() => {

        setTimeout(() => {
            setLoading(false)
        }, 3000);

        //console.log(data);
        const citiesArray = _.filter(data, function (item) { return item.result_type == "city"; });
       
        setData(citiesArray)

        
       if(citiesArray.length== 0){
           Alert.alert('Sin rutas', 'Por el momento no encontramos una ruta que se relacione a tu busqueda',[{
               text:'Intentar con otra(s) ciudad(es)',
               onPress:()=>navigation.goBack(),
               
           }])
       }
    

        // console.log(citiesArray);

    }, [1]);




    const renderItem = ({ item }) => (
        <Item ciudad={item.display} estado={item.state} pais={item.country} lat={item.lat} long={item.long} />
    );


    return (
        <View style={Styles.pageView} >
            <View style={Styles.header}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Icon name="chevron-thin-left" size={25} color="#232323" style={{ marginLeft: '3%' }} />
                </TouchableOpacity>

                <View style={Styles.headerViewText} >
                    <Text style={{ fontFamily: 'OpenSans-Light', fontSize: 15 }}  >Resultados de:</Text>
                    {
                        origen != '' ?
                            <Text style={{ fontSize: 18, fontFamily: 'OpenSans-SemiBold' }}>{origen.charAt(0).toUpperCase() + origen.slice(1)} - {city.charAt(0).toUpperCase() + city.slice(1)}</Text>
                            :
                            <Text style={{ fontSize: 18, fontFamily: 'OpenSans-SemiBold' }} >{city.charAt(0).toUpperCase() + city.slice(1)}</Text>
                    }

                </View>

            </View>

            <FlatList
                data={dataD}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            


            <Loading visible={loading} city={city.charAt(0).toUpperCase() + city.slice(1)} from={origen.charAt(0).toUpperCase() + origen.slice(1)} />
        </View>
    );
}




export default Results;