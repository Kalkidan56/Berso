import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  SectionList,
  Modal,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import tw from "twrnc";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ParallaxScrollView from "../assets/Components/ParallaxScrollView";
const { width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import MarketCard from "../assets/Components/marketCard";
import { dummyRestaurantsData } from "../assets/Data/restaurantsData";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../util/Util";

const Profile = ({ dummyRestaurantsData }) => {
  const navigation = useNavigation();
const [modalVisible, setModalVisible] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);

 const { isLoading, userToken } = useContext(AuthContext); 
 const [_username, setUserName] = useState("");
 const [_bio, setBio] = useState("");
 const [errors, setErrors] = useState("");
 const [profilePic, setProfilePic] = useState(null);
 const handleSwipe = (index) => {
   setCurrentIndex(index);
 };

   useEffect(() => {
     fetchUserData();
   }, []);
const fetchUserData = async () => {
  const userId = await AsyncStorage.getItem("userId");
  console.log(typeof userId);
  console.log("this is the userId inside fetch data: " + userId);
  await api
    .post("user/user-profile-data", { userId })
    .then((res) => {
      if (res.data.success === true) {
        const { user } = res.data;

        console.log("this is the user " + user);
        console.log(user.name);
        const { username, bio, profilepic } = user;
        
        setUserName(username);
        setBio(bio);
        setProfilePic(profilepic);
      } else {
        Alert.alert(res.data.message);
      }
    })
    .catch((err) => {
      if (err) {
        console.log("Error in fetch Data: ", err.message);
      }
    });
};
  //  const renderItem: ListRenderItem<any> = ({ item, index }) => (
  //   <Link href={{ pathname: '/modalFood', params: { id: id, itemId: item.id } }} asChild>
  //     <TouchableOpacity
  //       className={`${styles.itemContainer} ${
  //         count >= 1 && foundMeals?.id === item.id ? styles.greenBorder : ''
  //       }`}>
  //       <View className="flex flex-1 justify-center my-6 mr-8 ml-6">
  //         <View className="flex flex-row items-center">
  //           {count >= 1 && foundMeals?.id === item.id && (
  //             <View className="bg-[#34BB78] items-center w-6 h-7 rounded-md mr-2">
  //               <Text className="text-lg text-white font-semibold">{count}</Text>
  //             </View>
  //           )}
  //           <Text className="text-base">{item.name}</Text>
  //         </View>
  //         <Text className="text-sm text-[#6e6d72]">{item.info}</Text>
  //         <Text className="">{item.price} €</Text>
  //       </View>
  //       <Image
  //         source={{ uri: item.img }}
  //         width={100}
  //         height={100}
  //         className={styles.foodImage}
  //         resizeMode="contain"
  //       />
  //     </TouchableOpacity>
  //   </Link>
  // );

  // console.log("the fuck is happening", data);
  return (
    <View className="flex-1 bg-white">
      {isLoading ? (
        <>
          <View>
            <Text>Loading...</Text>
          </View>
        </>
      ) : userToken ? (
        <>
          <ParallaxScrollView
            className="flex-1"
            // styles={{ flex: 1 }}
            backgroundColor="white"
            parallaxHeaderHeight={300}
            renderBackground={() => <View className="bg-black top-8"></View>}
            stickyHeaderHeight={90}
            contentBackgroundColor="#F2E8DE"
            // renderStickyHeader={() => (
            //   <View className="flex justify-between top-4">
            //     <View className="ml-4">
            //       <Text className=" text-orange-400 text-lg font-semibold">
            //         My Reviews and Photos
            //       </Text>
            //     </View>
            //     <View className="flex flex-row items-center justify-between py-3 divide-x-2 divide-gray-200">
            //       <View className="items-center w-1/2 ">
            //         <Text className=" text-black text-lg font-semibold mx-3">
            //           Reviews
            //         </Text>
            //       </View>
            //       <View className="items-center w-1/2">
            //         <Text className="  text-black text-lg font-semibold mx-3">
            //           Photos
            //         </Text>
            //       </View>
            //     </View>
            //   </View>
            // )}
            renderForeground={() => (
              <SafeAreaView className="flex  bg-white">
                <View className="flex-row-reverse ml-2 mt-2">
                  <TouchableOpacity
                    className="px-2"
                    onPress={() => {
                      navigation.navigate("EditUserProfile");
                    }}
                  >
                    <Feather name="share" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="px-2"
                    onPress={() => {
                      navigation.navigate("EditUserProfile");
                    }}
                  >
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View className="flex items-center justify-between mt-9">
                  {/* <FontAwesome name="user-circle-o" size={60} color="black" />
                   */}
                  <View className="items-center justify-between">
                    <Image
                      source={require("../assets/Images/defaultprofile.png")}
                      style={tw`w-20 h-20 rounded-full border border-orange-300`}
                    />
                    <Text className="mt-1 text-lg">{_username}</Text>
                  </View>
                  <View className="flex-row mt-2 justify-between items-center">
                    <View className="items-center flex-row mx-1">
                      <Feather name="users" size={12} color="lightgray" />
                      <Text className="text-sm  text-neutral-400">45</Text>
                    </View>
                    <View className="items-center flex-row mx-1">
                      <FontAwesome name="photo" size={12} color="lightgray" />
                      <Text className="text-sm text-neutral-400">12</Text>
                    </View>
                    <View className="items-center flex-row mx-1">
                      <Foundation name="comments" size={12} color="lightgray" />
                      <Text className="text-sm  text-neutral-400">18</Text>
                    </View>
                  </View>
                  <View className="flex-row my-7 justify-between items-center">
                    <TouchableOpacity
                      onPress={() => navigation.navigate("AddReview")}
                    >
                      <View className="items-center mx-4">
                        <MaterialCommunityIcons
                          name="comment-edit-outline"
                          size={22}
                          color="black"
                        />
                        <Text className="text-base">Add Review</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("UploadPhoto")}
                    >
                     
                      <View className="items-center  mx-4">
                        <Feather name="camera" size={22} color="black" />

                        <Text className="text-base">Add Photo</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // navigation.navigate("AddBusiness");
                        setModalVisible(true);
                      }}
                    >
                      <View className="items-center mx-4">
                        <AntDesign name="isv" size={22} color="black" />
                        <Text className="text-base">Add Business</Text>
                      </View>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View
                        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
                      >
                        <View style={tw`bg-white p-8 rounded-md w-80`}>
                          <View className="p-2">
                            <Text style={tw`text-base text-center`}>
                              What is your relationship with the business you'd
                              like to add?
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={tw`border border-gray-200 py-2 my-1`}
                            onPress={() => {
                              setModalVisible(false);
                              navigation.navigate("AddBusiness");
                            }}
                          >
                            <Text style={tw`text-base text-center `}>
                              I'm a Customer
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={tw`py-2 border border-gray-200 my-1`}
                            onPress={() => {
                              navigation.navigate("AddBusiness");
                              setModalVisible(false);
                            }}
                          >
                            <Text style={tw`text-base text-center `}>
                              I work at the business
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={tw`py-2`}
                            onPress={() => {
                              setModalVisible(!modalVisible);
                            }}
                          >
                            <Text
                              style={tw`text-base text-center text-orange-300`}
                            >
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
              </SafeAreaView>
            )}
          >
            {/* <ScrollView className="bg-orange-50"> */}
            {/* <FlatList
        className="flex-1 mt-4"
        data={dummyRestaurantsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <View className="bg-white px-1 rounded-t-xl flex-col divide-y divide-gray-100 ">
              <Text className=" text-orange-400 text-lg font-semibold">
                My Reviews
              </Text>
            </View>
            {/* </Link> 
          </>
      //   )}
      //   renderItem={({ item }) => (
      //     <View className="bg-white px-9 r-0">
      //       <MarketCard restaurantData={item} />
      //     </View>
      //   )}
      // /> */}

            <View className="flex bg-white mt-2 rounded-t-2xl">
              <View>
                {/* <SectionList
            sections={data}
            scrollEnabled={false}
            keyExtractor={(item, index) => `${item.id + index}`}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View className="border-[0.5px] border-slate-300" />
            )}
            // SectionSeparatorComponent={() => <View className="border-[0.5px] border-slate-300" />}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text className="text-2xl font-bold text-[#2e303d] my-2 ml-6">
                {title}
              </Text>
            )}
          /> */}
              </View>
            </View>

            {/* </ScrollView> */}
          </ParallaxScrollView>
        </>
      ) : (
        <>
          <SafeAreaView className="flex items-center justify-between">
            <Image
              source={require("../assets/Images/VectorSignin.jpg")}
              style={tw`w-full h-100 `}
            />
            <Text className="text-xl">Sign in to continue</Text>
            <TouchableOpacity
              className="bg-orange-100 px-4 py-1 rounded-xl"
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text className="text-xl font-semibold">Login</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};


export default Profile;
// headerContainer: 'justify-end ml-28 h-16',
//   headerText: 'text-xl font-bold',
//   namesContainer: 'flex rounded-2xl -mt-12 bg-white',
//   titleContainerRow: 'flex flex-row items-center justify-between',
//   restaurantName: 'text-2xl font-bold text-[#2e303d]',
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   SectionList,
//   ListRenderItem,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import ParallaxScrollView from '../components/ParallaxScrollView.js';
// import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
// import { Link, useGlobalSearchParams, useNavigation } from 'expo-router';
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// import { useAppContext } from 'context/appContext';

// const RestaurantDetails = ({ post }) => {
//   const { id } = useGlobalSearchParams();

//   const { foundMeals, count, totalPrice } = useAppContext();

//   const navigation = useNavigation();

//   const [headerIconColor, setHeaderIconColor] = useState('white');
//   const [activeButtonIndex, setActiveButtonIndex] = useState(0);
//   const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
//   const [showButton, setShowButton] = useState(false);

//   const opacity = useSharedValue(0);
//   const animatedStyles = useAnimatedStyle(() => ({
//     opacity: opacity.value,
//   }));

//   const handleScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.y;

//     data.forEach((category, index) => {
//       const sectionTop = index * 260;
//       const sectionBotoom = (index + 1) * 260;

//       if (scrollPosition >= sectionTop && scrollPosition < sectionBotoom) {
//         setActiveCategoryIndex(index);
//       }
//     });

//     setActiveButtonIndex(activeCategoryIndex);

//     if (scrollPosition > 80) {
//       setHeaderIconColor('black');
//       opacity.value = withTiming(1);
//     } else {
//       setHeaderIconColor('white');
//       opacity.value = withTiming(0);
//     }
//   };

//   const selectCategory = (index: Number) => {
//     setActiveButtonIndex(index);
//   };

//   const ratingStyle = {
//     color: post.rating < 4.5 ? 'black' : '#FF8C00',
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTransparent: true,
//       headerTitle: '',
//       headerTintColor: 'white',
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack()} className={styles.roundButton}>
//           <Ionicons name="arrow-back" size={24} color={headerIconColor} />
//         </TouchableOpacity>
//       ),
//       headerRight: () => (
//         <View className={styles.rightContainer}>
//           <TouchableOpacity className={styles.roundButton}>
//             <Ionicons name="share-outline" size={24} color={headerIconColor} />
//           </TouchableOpacity>
//           <TouchableOpacity className={styles.roundButton}>
//             <Ionicons name="search-outline" size={24} color={headerIconColor} />
//           </TouchableOpacity>
//         </View>
//       ),
//     });
//   }, [headerIconColor]);

//   useEffect(() => {
//     setShowButton(totalPrice > 0);
//   }, [totalPrice]);

//  

  

//   return (

//       <ParallaxScrollView
//         styles={{ flex: 1 }}
//         backgroundColor="white"
//         parallaxHeaderHeight={200}
//         renderBackground={() => (
//           <Image
//             className="w-full h-full"
//             style={{ backgroundColor: 'white' }}
//             source={{ uri: post.profileImage }}
//             resizeMode="cover"
//           />
//         )}
//         stickyHeaderHeight={80}
//         contentBackgroundColor="#ecedef"
//         renderStickyHeader={() => (
//           <View className={styles.headerContainer}>
//             <Text className={styles.headerText}>{post.name}</Text>
//           </View>
//         )}
//         scrollEvent={handleScroll}>
//         <View className={styles.namesContainer}>
//           <View className="m-6">
//             <View className={styles.titleContainerRow}>
//               <Text className={styles.restaurantName}>{post.name}</Text>
//               <View className={styles.ratingContainerRow}>
//                 <FontAwesome name="star" size={17} color={ratingStyle.color} />
//                 <Text className={styles.rating}>{post.rating}</Text>
//               </View>
//             </View>

//             <View className={styles.deliveryTextsContainer}>
//               <Ionicons name="bicycle" size={18} color={'black'} />
//               <Text className={styles.deliveryTexts}>Delivery</Text>
//               <Text>・</Text>
//               <FontAwesome5 name="walking" size={15} color="black" />
//               <Text className={styles.deliveryTexts}>Pickup</Text>
//               <Text>・</Text>

//               <Text className={styles.deliveryTextMoreInfo}>More Info</Text>
//               <AntDesign
//                 name="right"
//                 size={14}
//                 color="black"
//                 className={styles.deliveryTextMoreInfo}
//               />
//             </View>
//             <View className={styles.separator} />
//             <Text className={styles.deliveryAbout}>{post.about}</Text>
//           </View>
//         </View>

//         <View className={styles.itemsContainer}>
//           <View>
//             <SectionList
//               sections={data}
//               scrollEnabled={false}
//               keyExtractor={(item, index) => `${item.id + index}`}
//               renderItem={renderItem}
//               ItemSeparatorComponent={() => <View className="border-[0.5px] border-slate-300" />}
//               // SectionSeparatorComponent={() => <View className="border-[0.5px] border-slate-300" />}
//               renderSectionHeader={({ section: { title, index } }) => (
//                 <Text className="text-2xl font-bold text-[#2e303d] my-2 ml-6">{title}</Text>
//               )}
//             />
//           </View>
//         </View>
//       </ParallaxScrollView>

//       <Animated.View style={[cStyles.stickySegments, animatedStyles]}>
//         <View className="justify-center pt-2 bg-white">
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingHorizontal: 15,
//               alignItems: 'center',
//               gap: 10,
//             }}>
//             {post.food.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => selectCategory(index)}
//                 className={
//                   activeButtonIndex === index ? styles.stickyButtonActive : styles.styckyButton
//                 }>
//                 <Text
//                   className={
//                     activeButtonIndex === index
//                       ? styles.stickyButtonTextActive
//                       : styles.styckyTextButton
//                   }>
//                   {item.category}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </Animated.View>

//       {showButton && (
//         <Link href={'/basketScreen'} asChild>
//           <TouchableOpacity className="pt-4 pb-8 bg-white border-t border-gray-200">
//             <View className="bg-[#34BB78] py-3 mx-7 rounded-full font-bold items-center">
//               <Text className="text-white font-bold text-lg">View basket {totalPrice} €</Text>
//             </View>
//           </TouchableOpacity>
//         </Link>
//       )}
//     </>
//   );
// };

// const styles = {
//   headerContainer: 'justify-end ml-28 h-16',
//   headerText: 'text-xl font-bold',
//   namesContainer: 'flex rounded-2xl -mt-12 bg-white',
//   titleContainerRow: 'flex flex-row items-center justify-between',
//   restaurantName: 'text-2xl font-bold text-[#2e303d]',
//   ratingContainerRow: 'flex flex-row items-center',
//   rating: 'ml-1 font-bold text-base',
//   roundButton: 'w-10 h-10 bg-transparen rounded-full justify-center items-center',
//   rightContainer: 'flex flex-row justify-center items-center gap-2',
//   deliveryTextsContainer: 'flex flex-row items-center',
//   deliveryTexts: 'text-sm ml-1 text-[#2e303d]',
//   deliveryTextMoreInfo: 'text-sm font-bold',
//   separator: 'h-[0.5px] bg-slate-300 my-4',
//   deliveryAbout: 'text-sm ml-1 text-[#2e303d]',
//   itemsContainer: '',
//   itemContainer: 'flex flex-row justify-between items-center',
//   greenBorder: 'border-l-8 border-[#34BB78]',
//   foodImage: 'w-28 h-27 rounded-sm',
//   stickyButtonActive: 'px-2 py-1',
//   styckyButton: 'px-2 py-1',
//   stickyButtonTextActive: 'font-bold text-base',
//   styckyTextButton: 'text-base',
// };

// const cStyles = StyleSheet.create({
//   stickySegments: {
//     position: 'absolute',
//     height: 50,
//     left: 0,
//     right: 0,
//     top: 80,
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     paddingBottom: 4,
//   },
// });

// export default RestaurantDetails;
