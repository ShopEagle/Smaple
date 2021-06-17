/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';

 import {
   Button,
   StyleSheet,
   TouchableOpacity,
   View,
   Text
 } from 'react-native';
 import RNPgReactNativeSdk from 'react-native-pg-react-native-sdk';

 var env = 'TEST'
 
 const App = ({children, title}) => {
  var map = {
          'orderId': 'orderId',
          'orderAmount': "1",
          'appId': '76295b1ea16f1a4855c5b7bba59267',
          'tokenData': 'cfToken',
          'orderCurrency': 'INR',
          'orderNote': 'asdasdasd',
          'notifyUrl': 'https://test.gocashfree.com/notify',
          'customerName': 'Cashfree User',
          'verifyExpiry': '100',
          'customerPhone': '9999999999',
          'customerEmail': 'cashfree@cashfree.com'
        }


         async function _createOrderWithToken() {
          let orderId;
          let tokenUrl;
      
          if (env === 'TEST') {
            tokenUrl = 'https://test.cashfree.com/api/v2/cftoken/order'; //for TEST
          } else {
            tokenUrl = 'https://api.cashfree.com/api/v2/cftoken/order'; //for PROD
          }
      
          orderId = 'Order' + parseInt(100000000 * Math.random(), 10);
          let orderApiMap = {
            orderId: orderId,
            orderAmount: '1',
            orderCurrency: 'INR',
          };
      
          const postParams = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-client-id': '76295b1ea16f1a4855c5b7bba59267',
              'x-client-secret': '490345c82b41b6d7bbdbb2258e9863c87848b29e',
            },
            body: JSON.stringify(orderApiMap),
          };
          return new Promise((resolve, reject) => {
            let cfToken;
            fetch(tokenUrl, postParams)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // console.log("data" + data);
                if (data.status === 'ERROR') {
                  console.log(
                    `Error (code: ${data.subCode}, message: ${data.message})`,
                  );
                  console.log(
                    'Please check the apiKey and apiSecret credentials and the environment',
                  );
                  return;
                }
                try {
                  cfToken = data.cftoken;
                  console.log('Token is : ' + data.cftoken);
                  // console.log('data is : ' + JSON.stringify(data));
                  let map = {
                    orderId: orderId,
                    orderAmount: '1',
                    tokenData: cfToken,
                    orderCurrency: 'INR',
                  };
                  return resolve(map);
                } catch (error) {
                  console.log('THE ERROR IS ' + data);
                  return reject(data);
                }
              });
          });
        }
const payupupi = async () => {
  let map = await _createOrderWithToken();
  let checkoutMap = {
    orderId: map.orderId,
    orderAmount: map.orderAmount,
    appId: '76295b1ea16f1a4855c5b7bba59267',
    tokenData: map.tokenData,
    orderCurrency: map.orderCurrency,
    orderNote: 'Test Note',
    customerName: 'Cashfree User',
    customerPhone: '9999999999',
    customerEmail: 'cashfree@cashfree.com',
    hideOrderId: true,
    color1: '#6002EE',
    color2: '#ffff1f',
  };
  RNPgReactNativeSdk.startPaymentUPI(checkoutMap, env, (result) => 
  {
    console.log(result);
                var obj = JSON.parse(result, function (key, value) 
            {
              console.log(key + "::" + value);
                // Do something with the result
            })
  });
  }
const payupweb = async () => {
    let map = await _createOrderWithToken();
    let checkoutMap = {
      orderId: map.orderId,
      orderAmount: map.orderAmount,
      appId: '76295b1ea16f1a4855c5b7bba59267',
      tokenData: map.tokenData,
      orderCurrency: map.orderCurrency,
      orderNote: 'Test Note',
      customerName: 'Cashfree User',
      customerPhone: '9999999999',
      customerEmail: 'cashfree@cashfree.com',
      hideOrderId: true,
      color1: '#6002EE',
      color2: '#ffff1f',
    };
    RNPgReactNativeSdk.startPaymentWEB(checkoutMap , env, (result) => 
  {
  console.log(result);
          		var obj = JSON.parse(result, function (key, value) 
          {
            console.log(key + "::" + value);
          		// Do something with the result
          })
  });
}

   return (
    <React.Fragment>
      <View style={{display : 'flex',justifyContent : 'center',alignItems : 'center',flex : 1}}>
      <TouchableOpacity onPress={payupweb} style={styles.btn}>
        <Text style={styles.txt}>Buy Now Web checkout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={payupupi} style={styles.btn}>
      <Text style={styles.txt}>Buy Now UPI</Text>
        </TouchableOpacity>
    </View>
   </React.Fragment>
   ); 
 };
 
 
 const styles = StyleSheet.create({
   btn : {
    paddingVertical : 15,
    paddingHorizontal : 10,
    marginBottom : 15,
    minWidth : 200,
    borderRadius : 5,
    textAlign : 'center',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#21c2e9'
   },
   txt : {
    color : '#fff',
    fontSize : 16, 
   }
 });
 
 export default App;
 