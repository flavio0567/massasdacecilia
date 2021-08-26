import React, { useEffect, useState, useCallback } from 'react';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Badge } from 'react-native-elements';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import ImgLogo from '../../../assets/logo_massas.png';

import api from '../../../../shared/service/api';

import {
  Container,
  Header,
  SelectionButton,
  CartIcon,
  StartusBarText,
  ProductList,
  FamilyProductText,
  ProductImage,
  ProductContainer,
} from './styles';

export interface Product {
  id: string;
  name: string;
  product_family: number;
  avatar_url: any;
}

const Order: React.FC = ({ cartSize }: any) => {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);

  const [familyProducts, setFamilyProducts] = useState<Product[]>([]);

  const productFamily = useCallback(async () => {
    setLoading(true);
    await api.get('products/family').then((response) => {
      const { product } = response.data;

      setFamilyProducts(product);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    productFamily();
  }, [productFamily]);

  const navigateToMenu = useCallback(
    (product_family: number, name: string) => {
      navigate('Menu', { product_family, name });
    },
    [navigate],
  );

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: hp('10%'),
        }}
      >
        <Header>
          <StartusBarText allowFontScaling={false}>Cardápio</StartusBarText>
          <SelectionButton onPress={() => navigate('Cart', { caller: 'Menu' })}>
            <Badge
              status="error"
              value={cartSize}
              containerStyle={{
                position: 'absolute',
                top: -2,
                right: 8,
                opacity: 0.8,
              }}
            />
            <CartIcon name="shopping-cart" size={22} />
          </SelectionButton>
        </Header>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            marginTop: 300,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#999" />
        </View>
      ) : (
        <ProductList
          data={familyProducts}
          numColumns={2}
          keyExtractor={(item) => `key${item.id}`}
          renderItem={({ item: familyProduct }) => (
            <ProductContainer
              style={{
                borderRadius: 8,
                shadowOpacity: 0.55,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowRadius: 3.84,
                elevation: 5,
                alignItems: 'center',
              }}
              onPress={() =>
                navigateToMenu(familyProduct.product_family, familyProduct.name)
              }
            >
              {familyProduct.avatar_url ? (
                <ProductImage
                  style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
                  source={{ uri: `${familyProduct.avatar_url}` }}
                />
              ) : (
                <ProductImage source={ImgLogo} />
              )}
              <FamilyProductText
                allowFontScaling={false}
                accessibilityLabel="Nome do produto"
              >
                {familyProduct.name}
              </FamilyProductText>
            </ProductContainer>
          )}
        />
      )}
    </Container>
  );
};

export default connect((state: any) => ({
  cartSize: state.cart.length,
}))(Order);