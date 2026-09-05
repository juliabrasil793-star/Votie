import { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { cores, espacamento, bordas } from '../design-system';

export default function CriarVotacao(props) {
  const [pergunta, setPergunta] = useState('');
  const [foto1, setFoto1] = useState(null);
  const [texto1, setTexto1] = useState('');
  const [foto2, setFoto2] = useState(null);
  const [texto2, setTexto2] = useState('');
  const [resultado, setResultado] = useState(null);

  const movimento = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0)).current;

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

  async function escolherFoto(lado) {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;

      if (lado === 1) {
        setFoto1(uri);
      } else {
        setFoto2(uri);
      }
    }
  }

  function fazerVotacao() {
  const opcao1Vazia = !foto1 && !texto1.trim();
  const opcao2Vazia = !foto2 && !texto2.trim();

  if (opcao1Vazia || opcao2Vazia) {
    Alert.alert(
      'Calma!',
      'Cada opção precisa ter uma foto ou um texto.'
    );
    return;
  }

  const vencedor = Math.random() < 0.5 ? 1 : 2;

  setResultado(vencedor);

  escala.setValue(0);

  Animated.spring(escala, {
    toValue: 1,
    friction: 4,
    tension: 60,
    useNativeDriver: true,
  }).start();
}

  function votarDeNovo() {
    setResultado(null);
    setPergunta('');
    setFoto1(null);
    setTexto1('');
    setFoto2(null);
    setTexto2('');
  }

  if (resultado) {
    const fotoVencedora = resultado === 1 ? foto1 : foto2;
    const textoVencedor = resultado === 1 ? texto1 : texto2;

    return (
      <View style={styles.containerResultado}>

        <Image
          source={require('../assets/fundo2.png')}
          style={styles.fundo}
          resizeMode="cover"
        />

        <Animated.View
          style={[
            styles.logoContainerResultado,
            {
              transform: [{ translateY: movimento }],
            },
          ]}
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoResultado}
            resizeMode="contain"
          />
        </Animated.View>

        <TouchableOpacity
          style={styles.voltar}
          onPress={props.voltar}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/voltar.png')}
            style={styles.botaoVoltar}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.resultadoConteudo}>

          {pergunta ? (
            <Text style={styles.perguntaResultado}>
              {pergunta}
            </Text>
          ) : null}

          <Text style={styles.tituloVencedor}>
            Vencedor
          </Text>

          <Animated.View
            style={{
              transform: [{ scale: escala }],
            }}
          >
            {fotoVencedora ? (
              <Image
                source={{ uri: fotoVencedora }}
                style={styles.fotoGrande}
              />
            ) : (
              <View style={styles.fotoGrande} />
            )}
          </Animated.View>

          <Text style={styles.nomeVencedor}>
            {textoVencedor}
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={votarDeNovo}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>
              Votar de Novo
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

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

      <TouchableOpacity
        style={styles.voltar}
        onPress={props.voltar}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/voltar.png')}
          style={styles.botaoVoltar}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TextInput
        style={styles.perguntaInput}
        placeholder="Sua pergunta!"
        placeholderTextColor="#a2a2a2"
        value={pergunta}
        onChangeText={setPergunta}
      />

      <View style={styles.linha}>

        <View style={styles.opcao}>

          <TouchableOpacity
            style={styles.molduraContainer}
            onPress={() => escolherFoto(1)}
            activeOpacity={0.8}
          >

            {foto1 ? (
              <Image
                source={{ uri: foto1 }}
                style={styles.fotoDentro}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.textoFoto}>
              ✭
              </Text>
            )}

            <Image
              source={require('../assets/moldura.png')}
              style={styles.moldura}
              resizeMode="stretch"
            />

          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Opção 1"
            placeholderTextColor="#a2a2a2"
            value={texto1}
            onChangeText={setTexto1}
          />

        </View>

        <View style={styles.opcao}>

          <TouchableOpacity
            style={styles.molduraContainer}
            onPress={() => escolherFoto(2)}
            activeOpacity={0.8}
          >

            {foto2 ? (
              <Image
                source={{ uri: foto2 }}
                style={styles.fotoDentro}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.textoFoto}>
                ✭
              </Text>
            )}

            <Image
              source={require('../assets/moldura.png')}
              style={styles.moldura}
              resizeMode="stretch"
            />

          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Opção 2"
            placeholderTextColor="#a2a2a2"
            value={texto2}
            onChangeText={setTexto2}
          />

        </View>

      </View>

      <TouchableOpacity
        onPress={fazerVotacao}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/fazer-votacao.png')}
          style={styles.botaoFazerVotacao}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },

  fundo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  logoContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 200,
  },

  voltar: {
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 5,
  },

  botaoVoltar: {
    width: 90,
    height: 50,
  },

  perguntaInput: {
    position: 'absolute',
    top: 190,
    width: '80%',
    height: 50,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',

  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 80,
    marginBottom: espacamento.grande,
  },

  opcao: {
    width: 180,
    alignItems: 'center',
  },

  molduraContainer: {
    width: 160,
    height: 202,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  fotoDentro: {
    position: 'absolute',
    top: 30,
    left: 17,
    width: 126,
    height: 130,
  },

  moldura: {
    position: 'absolute',
    width: 160,
    height: 202,
    top: 0,
    left: 0,
  },

  textoFoto: {
    position: 'absolute',
    top: 70,
    color: cores.textoSecundario,
    fontSize: 14,
    zIndex: 1,
  },

  input: {
    width: 125,
    height: 40,
    marginTop: 2,
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  botaoFazerVotacao: {
    width: 250,
    height: 80,
  },

  containerResultado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },

  logoContainerResultado: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },

  logoResultado: {
    width: 200,
    height: 150,
  },

  resultadoConteudo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  perguntaResultado: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  tituloVencedor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: espacamento.medio,
  },

  fotoGrande: {
    width: 220,
    height: 220,
    borderRadius: bordas.card,
    backgroundColor: cores.cardBorda,
  },

  nomeVencedor: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: espacamento.grande,
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: cores.destaque,
    paddingVertical: 14,
    paddingHorizontal: espacamento.grande,
    borderRadius: bordas.pilula,
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});