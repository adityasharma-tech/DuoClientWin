import React, {useEffect, useState} from 'react';
import TCPSocket from 'react-native-tcp-socket';
import {ConnectionOptions} from 'react-native-tcp-socket/lib/types/Socket';
import {Text, TextInput, TouchableOpacity, View} from 'react-native-windows';

export default function App() {
  const [hostnameInput, setHostnameInput] = useState('')

  const onTCPData = React.useCallback((data: string | Buffer<ArrayBufferLike>)=>{
    console.log('client.data', data.toString())
  }, [])

  const onTCPConnect = React.useCallback(()=>{
    console.log('client.connect')
  }, [])

  const onTCPErr = React.useCallback((data: Error)=>{
    console.log('client.err', data.toString())
  }, [])

  const connectTCP = React.useCallback(() => {
    const options: ConnectionOptions = {
      port: 8002,
      host: hostnameInput
    };
    const client = TCPSocket.createConnection(options, () => {
      console.log("Client connected successfully.")
    });
    client.on('data', onTCPData)
    client.on('connect',onTCPConnect)
    client.on('error', onTCPErr)
    return ()=>{
      client.off('data', onTCPData)
      client.off('connect', onTCPConnect)
      client.off('error', onTCPErr)
    }
  }, [TCPSocket, hostnameInput, onTCPData, onTCPConnect, onTCPErr]);

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#f4f2f5',
        height: '100%',
      }}>
      <View
        style={{
          width: 400,
          height: 'auto',
          paddingBottom: 15,
          borderRadius: 10,
          backgroundColor: '#ffffff',
          borderWidth: 0.5,
          borderColor: '#d7dbdd',
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
            marginBottom: 10,
          }}>
          Connect by address
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#979a9a',
          }}>
          IP Address or hostname
        </Text>
        <View
          style={{
            marginTop: 3,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="192.168.x.x"
            onChangeText={setHostnameInput}
            value={hostnameInput}
            style={{
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              borderWidth: 0.5,
              width: '72%',
              height: 35,
              paddingTop: 8,
              fontSize: 16,
            }}
            cursorColor={'#000'}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={connectTCP}
            disabled={hostnameInput.trim()==""}
            style={{
              justifyContent: 'center',
              backgroundColor: '#7d3c98',
              paddingHorizontal: 16,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: '#4a235a',
              height: 35,
              opacity: hostnameInput.trim()=="" ? 0.5 : 1
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
              }}>
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
