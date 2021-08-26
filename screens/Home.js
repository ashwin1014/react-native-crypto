import React, {useCallback} from 'react';
import {
    View,
    Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native"

import MainLayout from './MainLayout';
import {BalanceInfo, IconTextButton, Chart} from '../components';
import {SIZES, COLORS, FONTS, dummyData, icons } from '../constants';

import { getCoinMarket, getHoldings } from '../stores/market/marketActions';

const WalletInfoSection = ({totalWallet, changePct}) => {

  return (
    <View style={{
      paddingHorizontal: SIZES.padding,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      backgroundColor: COLORS.gray
    }}>
      {/* Balance Info */}
      <BalanceInfo title="Your Wallet" displayAmount={totalWallet} changePct={changePct} containerStyle={{ marginTop: 50 }} />
      <View style={{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: -15,
        paddingHorizontal: SIZES.radius
      }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          containerStyle={{
            flex: 1,
            height: 40,
            marginRight: SIZES.radius
          }}
          // onPress={}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            flex: 1,
            height: 40
          }}
          // onPress={}
        />
      </View>
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

  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
  const changePct = valueChange / (totalWallet - valueChange) * 100;


    return (
        <MainLayout>
          <View style={{
            flex: 1,
            backgroundColor: COLORS.black
           }}>
            {/* Header */}
            {/* Wallet */}
            <WalletInfoSection totalWallet={totalWallet} changePct={changePct} />
            <Chart
              containerStyle={{
                marginTop: SIZES.padding * 2
              }}
              chartPrices={coins[0]?.sparkline_in_7d?.price}
            />
          </View>
       </MainLayout>
    )
}

export default Home;