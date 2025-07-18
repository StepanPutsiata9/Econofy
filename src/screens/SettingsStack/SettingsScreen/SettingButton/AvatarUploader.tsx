import React, { useState } from 'react';
import {
  View,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {styles} from "./AvatarUploader.ts"
import EmptyAvatar from '../../../../components/SvgComponents/EmptyAvatar.tsx';
import MainButton from '../../../../components/ui/MainButton/MainButton.tsx';

const AvatarUploader: React.FC = () => {
  const [avatar, setAvatar] = useState<ImageSourcePropType | null>(null);

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Разрешение на использование камеры',
            message: 'Приложению нужно разрешение для доступа к вашей камере',
            buttonNeutral: 'Спросить позже',
            buttonNegative: 'Отмена',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    if (Platform.OS === 'ios') {
        return true;
    }
    return true;
  };

  const handleTakePhoto = async (): Promise<void> => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Ошибка', 'Необходимо разрешение для доступа к камере');
      return;
    }

    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: true,
      cameraType: 'front',
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source: ImageSourcePropType = {
          uri: response.assets[0].uri as string,
        };
        setAvatar(source);
      }
    });
  };

  const handleChooseFromLibrary = (): void => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source: ImageSourcePropType = {
          uri: response.assets[0].uri as string,
        };
        setAvatar(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={avatar} style={styles.avatar} />
        ) : (
          <EmptyAvatar />
        )}
      </View>
      <MainButton title="Сделать фотогарфию" onClick={handleTakePhoto} />
      <MainButton
        title="Выбрать из галереи"
        onClick={handleChooseFromLibrary}
      />
    </View>
  );
};


export default AvatarUploader;
