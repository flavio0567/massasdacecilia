import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
`;

export const ButtonContainer = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-self: flex-end;
  margin-top: ${Platform.OS === 'ios' ? 0 : -40}px;
  top: ${hp('75%')}px;
`;

export const ButtonSelection = styled.TouchableOpacity`
  width: 40%;
  height: 50px;
  background: transparent;
  border: 1px;
  border-color: #fd9e63;
  border-radius: 4px;
  margin: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  /* color: #fd9e63; */
  color: #ff9000;
  font-size: 22px;
`;

export const GuestSelection = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px 0 ${44 + getBottomSpace()}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const GuestText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fd9e63;
  font-size: 18px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
`;