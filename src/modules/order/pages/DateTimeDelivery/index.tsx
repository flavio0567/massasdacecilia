import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useDispatch, connect } from 'react-redux';
import { View, StatusBar, Alert, Platform } from 'react-native';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import api from '../../../../shared/service/api';

import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../../../shared/hooks/auth';
import { useDeliveryDateTime } from '../../../../shared/hooks/deliveryDateTime';

import * as CartActions from '../../../../store/modules/cart/actions';

import {
  Container,
  SelectButton,
  Header,
  DeliveryInfo,
  DeliveryUserView,
  DeliveryUserInputView,
  DeliveryUserInput,
  DeliveryMobileInput,
  DeliveryUserLabelText,
  ChevronIcon,
  ContentDateTime,
  Calendar,
  DateTimeSection,
  OpenDataPickerButton,
  OpenDataPickerButtonText,
  ConfirmButton,
  StartusBarText,
  Schedule,
  InfoLabelText,
  HourLabelText,
  InfoHourText,
  Section,
  SectionContent,
  Hour,
  HourText,
} from './styles';

type TimeFrameProps = Array<{
  hour: string;
  weekday: string;
  available: boolean;
}>

const DateTimeDelivery: React.FC = () => {
  const { reset, navigate, goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  const { user, deliveryData } = useAuth();
  const [deliveryUser, setDeliveryUser] = useState<string>();
  const [deliveryUserMobile, setDeliveryUserMobile] = useState<string>();

  const { setDateTime } = useDeliveryDateTime();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const [status, setStatus] = useState(false);
  const [timeFrameRange, setTimeFrameRange] = useState<TimeFrameProps>([]);
  const [selectedHour, setSelectedHour] = useState('00:00');

  useEffect(() => {
    if (user) {
      setDeliveryUser(user.name);
      setDeliveryUserMobile(String(user.mobile));
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const handleCallApi = async () => {
      const weekday = format(deliveryDate, 'E', { locale: ptBR });
  
      await api.get(`timeframes/${weekday}/${deliveryDate}`)
        .then(response => {
          if (!isCancelled) {
            setTimeFrameRange(response.data.timeframe);
          };
      });
    }
    handleCallApi();

    return () => {
      isCancelled = true;
    }
  }, [deliveryDate]);

  const deliveryAvailability = useMemo(() => {
    return timeFrameRange
      .map(({ hour, available }) => {
        return {
          hour,
          available,
        };
    });
  }, [timeFrameRange]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
      if (date) {
        setDeliveryDate(date);
      }
    },
    [],
  );

  const handleConfirmDateTime = useCallback(async () => {
    if (!deliveryUser || !deliveryUserMobile) {
      Alert.alert(
        'Informe os dados do pedido:',
        'Para prosseguir informe o nome e número do celular.',
      );
      setDeliveryDate(new Date());

      return;
    }

    if (!selectedHour || selectedHour === '00:00') {
      Alert.alert(
        'Selecione data e horário para delivery/retirada:',
        'Para prosseguir escolha data/hora para delivery/retirada.',
      );
      setDeliveryDate(new Date());

      return;
    }

    await deliveryData(deliveryUserMobile, deliveryUser);

    let deliveryDateTime;

    try {
      deliveryDateTime = {
        deliveryDate,
        deliveryTime: selectedHour,
      };
    } catch (err) {
      Alert.alert(
        'Erro ao criar o agendamento:',
        `Ocorreu um erro ao tentar criar o agendamento, tente novamente.${err}`,
      );
    }

    dispatch({
      type: '@order/ADD_DATE_TIME',
      deliveryDateTime,
    });

    await AsyncStorage.removeItem('@Massas:deliveryDateTime');

    AsyncStorage.setItem(
      '@Massas:deliveryDateTime',
      JSON.stringify(deliveryDateTime),
    );

    setDateTime(deliveryDateTime);

    reset({
      index: 0,
      routes: [{ name: 'MainStack' }],
    });

    navigate('MainStack');
  }, [
    reset,
    dispatch,
    navigate,
    setDateTime,
    deliveryDate,
    selectedHour,
    deliveryUser,
    deliveryUserMobile,
    deliveryData,
  ]);

  const handleSelectHour = useCallback((hour: string) => {
    setSelectedHour(hour);
  }, []);

  const handleUser = useCallback(
    async (userName: string) => {
      setDeliveryUser(userName);
      await deliveryData(deliveryUserMobile, userName);
    },
    [deliveryData, deliveryUserMobile],
  );

  return (
    <Container accessible>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: hp('10%'),
        }}
      >
        <Header>
          <SelectButton onPress={() => goBack()} accessibilityLabel="goback button">
            <ChevronIcon name="chevron-left" size={22} />
          </SelectButton>

          <StatusBar backgroundColor="#FD9E63" />
          <StartusBarText
            allowFontScaling={false}
            accessibilityLabel="Horário de entrega"
          >
            Horário da entrega
          </StartusBarText>
        </Header>
      </View>

      <DeliveryInfo>
        <DeliveryUserView>
          <InfoLabelText
            allowFontScaling={false}
            accessibilityLabel="Informações do pedido"
          >
            Informações do pedido
          </InfoLabelText>

          <Form ref={formRef} onSubmit={handleUser}>
            <DeliveryUserInputView>
              <DeliveryUserLabelText
                allowFontScaling={false}
                accessibilityLabel="Nome"
              >
                <Icon name="user" color="#fff" /> Nome:{' '}
              </DeliveryUserLabelText>
              <DeliveryUserInput
                allowFontScaling={false}
                onChangeText={(userName: string) => setDeliveryUser(userName)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
              >
                {deliveryUser}
              </DeliveryUserInput>
            </DeliveryUserInputView>
            <DeliveryUserInputView>
              <DeliveryUserLabelText
                allowFontScaling={false}
                accessibilityLabel="Celular"
              >
                <Icon name="phone" color="#fff" /> Celular:{' '}
              </DeliveryUserLabelText>
              <DeliveryMobileInput
                allowFontScaling={false}
                type="cel-phone"
                keyboardType="numeric"
                placeholder="(99) 99999-9999"
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                value={deliveryUserMobile}
                onChangeText={(userMobile: string) =>
                  setDeliveryUserMobile(userMobile)
                }
                returnKeyType="done"
              />
            </DeliveryUserInputView>
          </Form>
        </DeliveryUserView>
      </DeliveryInfo>

      <ContentDateTime>
        <Calendar>
          <OpenDataPickerButton onPress={handleToggleDatePicker}>
            <OpenDataPickerButtonText
              allowFontScaling={false}
              accessibilityLabel="Escolha a data"
            >
              Escolha a data
            </OpenDataPickerButtonText>
          </OpenDataPickerButton>

          {showDatePicker && (
            <DateTimeSection>
              <View>
                <DateTimePicker
                  locale="pt-BR"
                  mode="date"
                  display="spinner"
                  onChange={handleDateChanged}
                  textColor="#FD9E63"
                  value={deliveryDate}
                  minimumDate={new Date()}
                  accessibilityLabel="Date Time Picker Selection"
                />
              </View>
            </DateTimeSection>
          )}
        </Calendar>

        <Schedule>
          <HourLabelText
            allowFontScaling={false}
            accessibilityLabel="Escolha o horário"
          >
            Escolha o horário
            <InfoHourText>
              {'   '}
              arraste para mais horários ➢
            </InfoHourText>
          </HourLabelText>
          <Section>
            <SectionContent>
              {deliveryAvailability.map(
                ({ hour, available }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour}
                    available={available}
                    key={hour}
                    onPress={() => {
                      handleSelectHour(hour);
                    }}
                  >
                    <HourText
                      allowFontScaling={false}
                      selected={selectedHour === hour}
                      accessibilityLabel="button"
                    >
                      {hour}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>
        <ConfirmButton onPress={handleConfirmDateTime}>
          <OpenDataPickerButtonText
            allowFontScaling={false}
            accessibilityLabel="Confirmar"
          >
            Confirmar
          </OpenDataPickerButtonText>
        </ConfirmButton>
      </ContentDateTime>
    </Container>
  );
};

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(DateTimeDelivery);
