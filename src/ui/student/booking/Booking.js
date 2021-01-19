import React, { Component } from 'react';
import {CheckBox} from "native-base"
import DatePicker from 'react-native-datepicker'
import {

StyleSheet,

Text,

View,

TextInput,

TouchableOpacity

} from 'react-native';


export default class Logo extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2021-01-01"}
  }
  state={
    selectedLang:0
  }

render(){

return(

<View style={styles.container}>

<Text style={styles.header}>Selamat Datang </Text>
<Text style={styles.header}>Silahkan Isi Formulir</Text>

<TextInput style={styles.inputBox}

underlineColorAndroid='rgba(0,0,0,0)'

placeholder="Kepentingan"

placeholderTextColor = "#364f6b"

selectionColor="black"

keyboardType="email-address"

onSubmitEditing={()=> this.password.focus()}

/>

<TextInput style={styles.inputBox}

underlineColorAndroid='rgba(0,0,0,0)'

placeholder="Bertemu Siapa"

placeholderTextColor = "#364f6b"

selectionColor="black"

keyboardType="email-address"

onSubmitEditing={()=> this.password.focus()}

/>

<TextInput style={styles.inputBox}

underlineColorAndroid='rgba(0,0,0,0)'

placeholder="Tanggal Kunjungan"

placeholderTextColor = "#364f6b"

selectionColor="black"

keyboardType=""

onSubmitEditing={()=> this.password.focus()}

/>

<DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2021-01-01"
        maxDate="2021-12-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

<Text style={styles.leader}>Waktu Berkunjung</Text>

<View style={styles.item} >
            <CheckBox checked={this.state.selectedLang===1} color="#fc5185" onPress={()=>this.setState({selectedLang:1})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedLang===1?"#fc5185":"gray",
                fontWeight:this.state.selectedLang===1? "bold" :"normal"
              }}
              >Pagi(08:30-12:00 Wita</Text>
        </View>
        <View style={styles.item}>
            <CheckBox checked={this.state.selectedLang===2} color="#fc5185" onPress={()=>this.setState({selectedLang:2})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedLang===2?"#fc5185":"gray",
                fontWeight:this.state.selectedLang===2? "bold" :"normal"
              }}
              >Siang(08:30-12:00 Wita</Text>
        </View>

<TouchableOpacity style={styles.button}>

<Text style={styles.buttonText}>{this.props.type}Kuota 48</Text>

</TouchableOpacity>



</View>

)

}

}



const styles = StyleSheet.create({

container : {

backgroundColor: 'pink',

flexGrow: 1,

justifyContent:'center',

alignItems: 'center'

},

 item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:5,
    marginBottom:5,
    flexDirection:"row",
  },
  checkBoxTxt:{
    marginLeft:20
  },

inputBox: {

width:300,

backgroundColor:'rgba(255, 255,255,0.2)',

borderRadius: 25,

paddingHorizontal:16,

fontSize:16,

color:'black',

marginVertical: 10

},

header:{
  fontSize:25,
  fontWeight:"bold",
  color:"black",
  marginBottom:40
},

leader:{
  fontSize:15,
  fontWeight:"bold",
  color:"black",
  marginBottom:20,
  marginTop:30
},

button: {

width:300,

backgroundColor:'#1c313a',

borderRadius: 25,

marginTop:50,

marginVertical: 10,

paddingVertical: 13

},

buttonText: {

fontSize:16,

fontWeight:'500',

color:'white',

textAlign:'center'

}



});