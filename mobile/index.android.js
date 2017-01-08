import React, {Component} from "react";
import {AsyncStorage, AppRegistry, Button, StyleSheet, Text, View, Image, TextInput, Navigator, WebView, ToastAndroid} from "react-native";
import {STYLES} from "./components/globals"
import Survey from "./components/Survey";
var PushNotification = require('react-native-push-notification');
var moment = require('moment');
import * as _ from "lodash";

var CONFIG = {
    apiBaseUrl: 'https://miklosdanka.com/psychapp/api',
}

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    // senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    // },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});


// PushNotification.localNotification({
//     /* Android Only Properties */
//     id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
//     ticker: "My Notification Ticker", // (optional)
//     autoCancel: true, // (optional) default: true
//     largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
//     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
//     bigText: "This is a mobile notification. Do you like it?", // (optional) default: "message" prop
//     subText: "<3", // (optional) default: none
//     color: "red", // (optional) default: system default
//     vibrate: true, // (optional) default: true
//     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//     tag: 'some_tag', // (optional) add tag to message
//     group: "group", // (optional) add group to message
//     ongoing: false, // (optional) set whether this is an "ongoing" notification
//
//     /* iOS only properties */
// //     alertAction: // (optional) default: view
// //     category: // (optional) default: null
// // userInfo: // (optional) default: null (object containing additional notification data)
//
//     /* iOS and Android properties */
//     title: "Hi Maťko!", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
//     message: "This is a mobile notification. Do you like it?", // (required)
//     playSound: false, // (optional) default: true
//     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//     number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
//     repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
//     actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
// });





export default class PsychApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meditations: [],
            text: 'not updated',
            meditationLastAnswerDate: null,
            nickname: '',
        };

        this.STORAGE = {}
        this.STORAGE.PREFIX = '@PsychAppStorage:'
        this.STORAGE.KEY_MEDITATION_LAST_ANSWER_DATE = this.STORAGE.PREFIX + 'MEDITATION_LAST_ANSWER_DATE'
        this.STORAGE.KEY_NICKNAME = this.STORAGE.PREFIX + 'NICKNAME'

        setTimeout(() => {
            this._fetchFromServerAllMeditations();
            // this._saveMeditationAnswer();
        }, 1000);
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            const storageAnswer = await AsyncStorage.multiGet([
                this.STORAGE.KEY_MEDITATION_LAST_ANSWER_DATE,
                this.STORAGE.KEY_NICKNAME
            ]);
            const meditationLastAnswerDate = storageAnswer[0][1]
            const nickname = storageAnswer[1][1]

            if (meditationLastAnswerDate !== null){
                this.setState({
                    meditationLastAnswerDate: meditationLastAnswerDate
                });
            } else {
                this.setState({
                    meditationLastAnswerDate: '2000-01-01T00:00:00.000Z'
                });
            }

            if (nickname !== null){
                this.setState({
                    nickname: nickname
                });
            } else {
                this.setState({
                    nickname: ''
                });
            }
        } catch (error) {
            ToastAndroid.show('Failed to load settings - please restart app', ToastAndroid.SHORT);
            console.error('AsyncStorage error: ' + error.message);
        }
    };

    _fetchFromServerAllMeditations = async () => {
        try {
            const response = await fetch(CONFIG.apiBaseUrl + '/meditations')
            const responseJson = await response.json()
            this.setState({
                meditations: responseJson.data[0].nickname,
                text: 'updated'
            })
        } catch (error) {
            console.error(error)
            ToastAndroid.show('Failed to retrieve meditation data - are you connected to the internet?', ToastAndroid.LONG);
        }
        return fetch(CONFIG.apiBaseUrl + '/meditations')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    meditations: responseJson.data[0].nickname,
//                meditations: ["asd"],
                    text: 'updated'
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _saveToServerMeditationAnswer = async (answer, timeString, nickname) => {
        const response = await fetch(CONFIG.apiBaseUrl + '/meditations', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: nickname,
                answer: answer,
                date: timeString,
            })
        })
    }

    _onAnswerSubmitted = async (answer) => {
        try {
            // Preconditions
            if (_.isEmpty(this.state.nickname)) {
                ToastAndroid.show('Please enter a nickname first', ToastAndroid.LONG);
                return
            }
            // Collect data
            const currentTime = moment()
            const currentTimeFullString = currentTime.format()
            const nickname = this.state.nickname
            // Save to server
            await this._saveToServerMeditationAnswer(answer, currentTimeFullString, nickname)
            // Persist to storage
            await AsyncStorage.setItem(this.STORAGE.KEY_MEDITATION_LAST_ANSWER_DATE, currentTimeFullString);
            // Inform user
            ToastAndroid.show('Answer submitted', ToastAndroid.SHORT);
        } catch (error) {
            console.error(error)
            ToastAndroid.show('Failed to save answer - are you connected to the internet?', ToastAndroid.LONG);
        }
    }

    _onNicknameChanged = async (nickname) => {
        this.setState({nickname})
        try {
            await AsyncStorage.setItem(this.STORAGE.KEY_NICKNAME, nickname);
        } catch (error) {
            console.error(error)
            ToastAndroid.show('Failed to save nickname', ToastAndroid.LONG);
        }
    }

    render() {
        return (
            <View style={STYLES.appContainer}>
                <TextInput
                    style={{height: 50}}
                    onChangeText={(text) => this._onNicknameChanged(text)}
                    value={this.state.nickname}
                    placeholder='Please enter a nickname here'
                />
                <Text style={STYLES.adviceText}>
                    Important: please don't change your nickname once set - it is used in our analysis
                </Text>
                <Text style={STYLES.instructions}>
                    {this.state.meditations}{'\n'}
                    {this.state.text}{'\n'}
                    {this.state.meditationLastAnswerDate}{'\n'}
                </Text>
                <Survey
                    questionText="Have you meditated today?"
                    option1Text="Yes"
                    option2Text="No"
                    thankYouText="Thanks for your response!"
                    onOption1Clicked={() => this._onAnswerSubmitted('yes')}
                    onOption2Clicked={() => this._onAnswerSubmitted('no')}
                    isAnswered={false}
                />
            </View>
        );
    }
}



AppRegistry.registerComponent('PsychApp', () => PsychApp);