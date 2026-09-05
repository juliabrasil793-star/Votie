import { useEffect, useRef } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import { cores, espacamento } from '../design-system';

export default function Apresentacao(props) {
  const movimento = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(movimento, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(movimento, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/fundo.png')}
        style={styles.fundo}
        resizeMode="cover"
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ translateY: movimento }],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.meio}>

        <Text style={styles.slogan}>
          Não consegue escolher? Deixa o Votie decidir.
        </Text>

        <TouchableOpacity
          onPress={props.irParaCriarVotacao}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/botao.png')}
            style={styles.botao}
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: cores.fundo,
  },

  fundo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  logoContainer: {
    marginTop: 0,
  },

  logo: {
    width: 300,
    height: 240,
  },

  meio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: espacamento.grande,
  },

  slogan: {
    color: '#8c8c8c',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },

  botao: {
    width: 220,
    height: 90,
  },
});