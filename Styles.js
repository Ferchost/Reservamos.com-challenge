import { StyleSheet, Dimensions,} from 'react-native';
const { width, height } = Dimensions.get('window');

export default Styles = StyleSheet.create({
//General
pageView:{ backgroundColor: '#f9f9f9', flex: 1 },
//Home
backgroundTop:{ width: '100%', height: 200, resizeMode: 'cover', position: 'absolute', },
logo:{ width: 180, height: 40, resizeMode: 'contain', marginTop: 65, marginLeft: '3%' },
titleHome:{ fontFamily: 'OpenSans-SemiBold', fontSize: 22, marginLeft: '3%', marginTop: 12, color: "#232323" },
subTitleHome:{ fontFamily: 'OpenSans-Light', fontSize: 12, marginLeft: '3%', marginTop: 2 },
searchView:{
    backgroundColor: '#fff', height: 140, width: '94%', alignSelf: 'center', color: "#232323", marginTop: 20, borderRadius: 7, shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
},
firstSearchView:{ flexDirection: 'row', height: '50%', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: 'gray', flex:1 },
secondSearchView:{ flexDirection: 'row', height: '50%', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: 'gray' },
buttonRuta:{
    backgroundColor: '#b73c81', height: 60, width: '94%', alignSelf: 'center', marginTop: 23, borderRadius: 7, alignItems: 'center', justifyContent: 'center', shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
},
textButtonRuta:{ fontFamily: 'OpenSans-SemiBold', fontSize: 18, color: "#fff" },
//Results
header:{ flexDirection: 'row', height: 70, width: '100%', backgroundColor: 'white', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, justifyContent: 'space-between', marginTop:-18 },
headerViewText:{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginRight: '3%' },
item: {
    flexDirection: 'row',
    backgroundColor: '#fff',

    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
},
itemBottom: {
    flexDirection: 'row',
    backgroundColor: '#fff',

    marginVertical: 1,
    marginHorizontal: 9,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
},
title: {
    fontSize: 20,
    fontFamily: 'OpenSans-SemiBold',
    color: '#232323'
},
subTitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#232323'
},
coordinates: {
    fontSize: 12,
    fontFamily: 'OpenSans-Light',
    color: 'gray'
}
});
