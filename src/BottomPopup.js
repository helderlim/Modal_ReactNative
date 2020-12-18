import {Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList} from 'react-native';
import React from 'react';

const deviceHeight = Dimensions.get("window").height

export class BottomPopup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }

    show = () =>{
        this.setState({show: true})
    }

    close = () =>{
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch) {
             const view = <View style={{flex:1, width:'100%', }}/>

             if(!onTouch) return view

             return(
                 <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%', }}>
                     {view}
                 </TouchableWithoutFeedback>
             )
    }

    renderTitle = () =>{
        const {title} =this.props
        return(
            <View>
            <Text style={{
                color:'#182E44',
                fontSize: 20,
                fontWeight:'500',
                margin:15,

            }}>
                {/*UTILIZAR ESTE METODO PARA ADICIONAR IMAGENS E TEXTO COMO NOME ETC*/}
                {title}
            </Text>
        </View>
        )
    }


    renderContent = () =>{
        const {data} = this.props

        return(
            <View>
                <FlatList
                    style={{marginBottom:20}}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    contentContainerStyle={{
                        paddingBottom:40
                    }}
                />
            </View>
        )
    }

    renderItem = ({item}) =>{
        return(
            <View style={{ height:50, flex:1, alignItems:'flex-start'}}>
                <Text style={{fontSize:20, fontWeight:'normal'}}>{item.name}</Text>
            </View>
        )
    }

    renderSeparator = () =>(
        <View
        style={{
            opacity:0.1,
            backgroundColor: 'red',
            height:1,
        }}
        />

    )


    render(){
        let {show} = this.state
        const {onTouchOutside, title} = this.props

         return(
             <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
             >
                    <View style={{flex:1, backgroundColor:'#000000AA', justifyContent:'flex-end'}}>
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={{backgroundColor:'#FFFFFF', width:'100%', borderTopRightRadius:10,
                            borderTopLeftRadius:10,
                            paddingHorizontal:10,
                            maxHeight:deviceHeight* 0.4
                        }}>
                           
                            {this.renderTitle()}
                            {this.renderContent()}
                        </View>
                    </View>

             </Modal>
         )
    }
}