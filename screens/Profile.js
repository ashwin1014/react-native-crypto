import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Switch
} from 'react-native';

import MainLayout from './MainLayout';
import {HeaderBar} from '../components';
import {SIZES, COLORS, FONTS, constants, icons, dummyData } from '../constants';

const SectionTitle = ({ title }) => (
  <View style={{
    marginTop: SIZES.padding
  }}>
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
  </View>
);

const Setting = ({title, value, type, onPress}) => {

  if (type === 'button') {
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>{title}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: SIZES.radius, color: COLORS.lightGray3, ...FONTS.h3 }}>{value}</Text>
          <Image style={{ height: 15, width: 15, tintColor: COLORS.white  }} source={icons.rightArrow} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{
      flexDirection: 'row',
      height: 50,
      alignItems: 'center'
    }}>
      <Text style={{
        flex: 1, color: COLORS.white, ...FONTS.h3
      }}>{title}</Text>
      <Switch value={value} onValueChange={(val) => onPress(val)} />
    </View>
  )
};

const Profile = () => {

  const [faceID, setFaceID] = useState(true);

    return (
     <MainLayout>
        <View style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black
        }}>
         <HeaderBar
           title="Profile"
         />
         <ScrollView>
           <View style={{
             flexDirection: 'row',
             marginTop: SIZES.radius
            }}>
              {/* Email */}
              <View style={{
                flex: 1
              }}>
                <Text style={{
                  color: COLORS.white,
                  ...FONTS.h3
                }}>{dummyData.profile.email}</Text>
                <Text style={{
                  color: COLORS.lightGray3,
                  ...FONTS.body4
                }}>{dummyData.profile.email}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                  <Image source={icons.verified} style={{ height: 25, width: 25 }} />
              </View>
           </View>

              <SectionTitle title='App' />

              <Setting title="Launch Screen" value="Home" type="button" />
              <Setting title="Appearance" value="Dark" type="button" />

              <SectionTitle title='Account' />

              <Setting title="Payment Currency" value="USD" type="button" />
              <Setting title="Language" value="English" type="button" />

              <SectionTitle title='Security' />
              <Setting title="FaceID" value={faceID} type="switch" onPress={setFaceID} />

              <Setting title="Password Settings" value="" type="button" />
              <Setting title="Change Password" value="" type="button" />
              <Setting title="2FA" value="" type="button" />

         </ScrollView>
        </View>
     </MainLayout>
    )
}

export default Profile;