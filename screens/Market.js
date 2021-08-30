import React, {useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native";

import MainLayout from './MainLayout';
import {HeaderBar} from '../components';
import {SIZES, COLORS, FONTS, dummyData, icons } from '../constants';

import { getCoinMarket } from '../stores/market/marketActions';

const Market = () => {
  const dispatch = useDispatch();

  const coins = useSelector(state => state.marketReducer.coins);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCoinMarket())
    }, [])
  );

    return (
       <MainLayout>
          <View style={{
            flex: 1,
            backgroundColor: COLORS.black
           }}>
            {/* Header */}
            <HeaderBar title="Market" />
          </View>
       </MainLayout>
    )
}

export default Market;