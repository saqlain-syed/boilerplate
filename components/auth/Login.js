import * as React from 'react';
import { View, StyleSheet, Image,  SafeAreaView, Animated } from 'react-native';
import { Provider as PaperProvider, TextInput, Button,  Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import themeCustom from '../../utils/themeCustom';

const LoginScreen = () => {

  const navigation = useNavigation();

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = data => {
    console.log( errors);
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const gotoLogin = () => {
    // Perform login logic here
    navigation.navigate('Signup')

  };

  const errorOpacity = new Animated.Value(0);

  const animateError = (show) => {
    Animated.timing(errorOpacity, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    if (errors.email || errors.password) {
      animateError(true);
    } else {
      animateError(false);
    }
  }, [errors]);

  console.log('errors', errors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo/qist_black_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            label="Email"
            style={styles.input}
            onBlur={onBlur}
            mode="outlined"
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ 
        required: "Email is required", 
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Please enter a valid email',
      },
       }}
      />
      <Animated.Text style={[styles.errorText, { opacity: errorOpacity }]}>
           {errors.email?.message }
        </Animated.Text>

      
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            label="Password"
            onBlur={onBlur}
            mode="outlined"
            secureTextEntry
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: "Password is required" }}
      />
      <Animated.Text style={[styles.errorText, { opacity: errorOpacity }]}>
        {errors.password?.message}
      </Animated.Text>

      <View style={styles.button}>
        <Button mode="contained" style={themeCustom.primaryButton} onPress={handleSubmit(onSubmit)} >Login</Button>
      </View>
      <Text style={styles.signupText}>
          Don't have any account?{' '}
          <Text style={themeCustom.linkColor} onPress={gotoLogin}>
            Signup
          </Text>
        </Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    padding: 16,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    maxWidth: "90%",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop:30
  },
  
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,

  },
  signupText: {
    marginTop: 16,
    textAlign: 'center',
  },
  errorText:{
    color:"red",
    marginTop: -10,
    marginBottom:15
  }
});


export default LoginScreen