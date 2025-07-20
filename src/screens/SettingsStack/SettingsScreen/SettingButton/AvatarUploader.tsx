import React from 'react';
import { View, Image, PermissionsAndroid, Platform, Alert } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { styles } from './AvatarUploader.ts';
import EmptyAvatar from '../../../../components/SvgComponents/EmptyAvatar.tsx';
import MainButton from '../../../../components/ui/MainButton/MainButton.tsx';
import { RootState, useAppDispatch } from '../../../../store/store.ts';
import { setAva } from '../../../../store/slices/AuthSlice/Auth.slice.ts';
import { useSelector } from 'react-redux';
import api from '../../../../store/slices/AuthSlice/api.ts';

const AvatarUploader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ava } = useSelector((state: RootState) => state.auth);
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
        const source = response.assets[0].uri as string;
        const setAvatarFunc = async () => {
          const { data } = await api.post('setAvatar', { uri: source });
          console.log(data);
          if (data) {
            dispatch(setAva(source));
          }
        };
        setAvatarFunc();
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
        const source = response.assets[0].uri as string;
        const setAvatarFunc = async () => {
          const { data } = await api.post('setAvatar', { uri: source });

          if (data) {
            dispatch(setAva(source));
          }
        };
        setAvatarFunc();
      }
    });
  };
  const delPhoto = async (): Promise<void> => {
    const { data } = await api.post('delAvatar');
    console.log("null avatar ",data);
    
    if (data) {
      dispatch(setAva(null));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {(ava!=="empty")&&ava ? (
          <Image source={{ uri: ava }} style={styles.avatar} />
        ) : (
          <EmptyAvatar />
        )}
      </View>
      <MainButton title="Сделать фотогарфию" onClick={handleTakePhoto} />
      <MainButton
        title="Выбрать из галереи"
        onClick={handleChooseFromLibrary}
      />
      {(ava!=="empty")&&ava && <MainButton title="Удалить аватарку" onClick={delPhoto} />}
    </View>
  );
};

export default AvatarUploader;
