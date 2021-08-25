import React, {useCallback} from 'react';
import {
    View,
    Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native"

import MainLayout from './MainLayout';
import BalanceInfo from './BalanceInfo';
import {SIZES, COLORS, FONTS, dummyData, icons } from '../constants';

import { getCoinMarket, getHoldings } from '../stores/market/marketActions';

const WalletInfoSection = () => {

  return (
    <View style={{
      paddingHorizontal: SIZES.padding,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      backgroundColor: COLORS.gray
    }}>
      {/* Balance Info */}
      <BalanceInfo title="Your Wallet" displayAmount="45,000" changePct="2.30" containerStyle={{ marginTop: 50 }} />
    </View>
  );
}

const Home = () => {
  const dispatch = useDispatch();


  const myHoldings = useSelector(state => state.marketReducer.myHoldings);
  const coins = useSelector(state => state.marketReducer.coins);

  console.log("myHoldings", myHoldings);
  console.log("coins", coins);

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings(dummyData.holdings))
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
            {/* Wallet */}
            <WalletInfoSection />
          </View>
       </MainLayout>
    )
}

export default Home;