import React, {useEffect} from 'react';
import TCPSocket from 'react-native-tcp-socket';
import {ConnectionOptions} from 'react-native-tcp-socket/lib/types/Socket';
import {Text, TextInput, TouchableOpacity, View} from 'react-native-windows';

export default function App() {
  React.useCallback(() => {
    const options: ConnectionOptions = {
      port: 8002,
    };
    const client = TCPSocket.createConnection(options, () => {
      client.destroy();
    });
  }, []);

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
            onFocus={() => null}
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
            style={{
              justifyContent: 'center',
              backgroundColor: '#7d3c98',
              paddingHorizontal: 16,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: '#4a235a',
              height: 35,
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
