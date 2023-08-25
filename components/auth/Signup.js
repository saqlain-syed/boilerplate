import * as React from 'react';
import { View, StyleSheet, Image,  SafeAreaView, Animated, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Provider as PaperProvider, TextInput, Button,  Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import themeCustom from '../../utils/themeCustom';
import SelectDropdown from 'react-native-select-dropdown'


const LoginScreen = () => {

  const navigation = useNavigation();

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({});
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
    navigation.navigate('Login')

  };

  const errorOpacity = new Animated.Value(0);

  const animateError = (show) => {
    Animated.timing(errorOpacity, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const countries = ["Egypt", "Canada", "Australia", "Ireland"]


  React.useEffect(() => {
    if (errors.email || errors.password) {
      animateError(true);
    } else {
      animateError(false);
    }
  }, [errors]);

  console.log('errors', errors);

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Behavior to adjust for iOS and Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Offset to adjust for Android keyboard height
      >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/logo/qist_black_logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
          </View>
          <View style={styles.formContainer}>

              {/* input starts here */}
            <Controller control={control}
              render={({field: { onChange, onBlur, value }}) => (
                <TextInput label="Name" style={styles.input} onBlur={onBlur} mode="outlined" onChangeText={value => onChange(value)} value={value}/>
              )}
              name="name" rules={{  required: "Name is required" }}
            />
            <Animated.Text style={[styles.errorText, { opacity: errorOpacity }]}> {errors.name?.message } </Animated.Text>
              {/* input ends here */}

              {/* input starts here */}
            <Controller control={control}
              render={({field: { onChange, onBlur, value }}) => (
                <TextInput label="Email" style={styles.input} onBlur={onBlur} mode="outlined" onChangeText={value => onChange(value)} value={value}/>
              )}
              name="email" rules={{ 
              required: "Email is required", 
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
            },
            }}
            />
            <Animated.Text style={[styles.errorText, { opacity: errorOpacity }]}> {errors.email?.message } </Animated.Text>
              {/* input ends here */}

              {/* input starts here */}
              <Controller control={control}
              render={({field: { onChange, onBlur, value }}) => (
                <TextInput label="Phone Number" keyboardAppearance='numeric-pad' style={styles.input} onBlur={onBlur} mode="outlined" onChangeText={value => onChange(value)} value={value}/>
              )}
              name="phone" rules={{  required: "Phone Number is required" }}
            />
            <Animated.Text style={[styles.errorText, { opacity: errorOpacity }]}> {errors.phone?.message } </Animated.Text>
              {/* input ends here */}

              {/* input starts here */}
              <Controller control={control}
              render={({field: { onChange, onBlur, value }}) => (
                  <SelectDropdown
                    data={countries}
                    search={true}
                    buttonStyle={styles.cityButton}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item
                    }}
                  />
              )}
              name="city" rules={{  required: "City is required" }}
            />
            <Animated.Text style={[styles.errorText, { opacity: errorOpacity }]}> {errors.city?.message } </Animated.Text>
              {/* input ends here */}

              
              
            
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
              <Button mode="contained" style={themeCustom.primaryButton} onPress={handleSubmit(onSubmit)} >Signup</Button>
            </View>
            <Text style={styles.signupText}>
                Already have any account s?{' '}
                <Text style={themeCustom.linkColor} onPress={gotoLogin}>
                  Login
                </Text>
              </Text>
          </View> 
          
          
      </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer:{
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    maxWidth: "90%",
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
  cityButton:{
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "left"
    
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