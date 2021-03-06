import React, {Component} from "react";
import {ActivityIndicator, AsyncStorage, AppRegistry, Button, StyleSheet, Text, View, Image, TextInput, Navigator, WebView, ToastAndroid} from "react-native";
import {STYLES, SELECTED_STRINGS} from "./components/globals"
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


const dateNow = moment();
const dateToday = moment().hours(20).minutes(0).seconds(0);
// const dateToday = moment().hours(23).minutes(52).seconds(0);
const dateTomorrow = dateToday.add(1, 'days');
const scheduleMoment = dateToday.isBefore(dateNow) ? dateTomorrow : dateToday;
const scheduleDate = scheduleMoment.toDate();
// PushNotification.cancelAllLocalNotifications();
PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    // ticker: "My Notification Ticker", // (optional)
    // autoCancel: true, // (optional) default: true
    // largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: SELECTED_STRINGS.haveYouMeditatedTodayClickToReply, // (optional) default: "message" prop
    // subText: "This is a subText", // (optional) default: none
    // color: "red", // (optional) default: system default
    // vibrate: true, // (optional) default: true
    // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    // tag: 'some_tag', // (optional) add tag to message
    // group: "group", // (optional) add group to message
    // ongoing: false, // (optional) set whether this is an "ongoing" notification

    /* iOS only properties */
    // alertAction: // (optional) default: view
    // category: // (optional) default: null
    // userInfo: // (optional) default: null (object containing additional notification data)

    /* iOS and Android properties */
    // title: "Have you meditated today?", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    message: SELECTED_STRINGS.haveYouMeditatedToday, // (required)
    // playSound: false, // (optional) default: true
    // soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
    // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more

    date: scheduleDate,
});



export default class PsychApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meditationLastAnswerDate: null,
            nickname: '',
            termsAndConditionsAnswer: null,
            isLoading: true,
        };

        this.STORAGE = {}
        this.STORAGE.PREFIX = '@PsychAppStorage:'
        this.STORAGE.KEY_MEDITATION_LAST_ANSWER_DATE = this.STORAGE.PREFIX + 'MEDITATION_LAST_ANSWER_DATE'
        this.STORAGE.KEY_NICKNAME = this.STORAGE.PREFIX + 'NICKNAME'
        this.STORAGE.KEY_TERMS_AND_CONDITIONS = this.STORAGE.PREFIX + 'TERMS_AND_CONDITIONS'
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            const storageAnswer = await AsyncStorage.multiGet([
                this.STORAGE.KEY_MEDITATION_LAST_ANSWER_DATE,
                this.STORAGE.KEY_NICKNAME,
                this.STORAGE.KEY_TERMS_AND_CONDITIONS
            ]);
            const meditationLastAnswerDate = storageAnswer[0][1]
            const nickname = storageAnswer[1][1]
            const termsAndConditionsAnswer = storageAnswer[2][1]

            const meditationLastAnswerDateValue = meditationLastAnswerDate !== null ? meditationLastAnswerDate : '2000-01-01T00:00:00.000Z';
            const nicknameValue = nickname !== null ? nickname : '';
            const termsAndConditionsAnswerValue = termsAndConditionsAnswer;

            this.setState({
                meditationLastAnswerDate: meditationLastAnswerDateValue,
                nickname: nicknameValue,
                termsAndConditionsAnswer: termsAndConditionsAnswerValue,
                isLoading: false,
            })
        } catch (error) {
            ToastAndroid.show(SELECTED_STRINGS.errorFailedToLoadSettings, ToastAndroid.SHORT);
            console.error('AsyncStorage error: ' + error.message);
        }
    };

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
                ToastAndroid.show(SELECTED_STRINGS.errorPleaseEnterNicknameFirst, ToastAndroid.LONG);
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
            this.setState({
                meditationLastAnswerDate: currentTimeFullString
            })
            // Inform user
            ToastAndroid.show(SELECTED_STRINGS.messageAnswerSubmitted, ToastAndroid.SHORT);
        } catch (error) {
            console.error(error)
            ToastAndroid.show(SELECTED_STRINGS.errorFailedToSaveAnswer, ToastAndroid.LONG);
        }
    }

    _onNicknameChanged = async (nickname) => {
        this.setState({nickname})
        try {
            await AsyncStorage.setItem(this.STORAGE.KEY_NICKNAME, nickname);
        } catch (error) {
            console.error(error)
            ToastAndroid.show(SELECTED_STRINGS.errorFailedToSaveNickname, ToastAndroid.LONG);
        }
    }

    _onTermsAndConditionsAnswered = async (termsAndConditionsAnswer) => {
        this.setState({termsAndConditionsAnswer})
        // We only save the answer permanently if it was yes, so we can give
        // another chance to answer once the app is restarted
        if (termsAndConditionsAnswer === 'no') {
            return;
        }
        try {
            await AsyncStorage.setItem(this.STORAGE.KEY_TERMS_AND_CONDITIONS, termsAndConditionsAnswer);
        } catch (error) {
            console.error(error)
            ToastAndroid.show(SELECTED_STRINGS.errorFailedToSaveData, ToastAndroid.LONG);
        }
    }

    _renderTermsAndConditions = () => {
        const showDeclineMessage = this.state.termsAndConditionsAnswer === 'no';
        return (
            <View style={STYLES.appContainer}>
                <Survey
                    questionText={SELECTED_STRINGS.termsAndConditionsText}
                    option1Text={SELECTED_STRINGS.termsAndConditionsAccept}
                    option2Text={SELECTED_STRINGS.termsAndConditionsDecline}
                    thankYouText={SELECTED_STRINGS.termsAndConditionsDeclineText}
                    onOption1Clicked={() => this._onTermsAndConditionsAnswered('yes')}
                    onOption2Clicked={() => this._onTermsAndConditionsAnswered('no')}
                    isAnswered={showDeclineMessage}
                />
            </View>
        );
    }

    _renderLoadingScreen = () => {
        return (
            <ActivityIndicator
                animating={true}
                style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 500}}
                size="large"
            />
        );
    }

    _renderSurvey = () => {
        const todayDay = moment().format('YYYY-MM-DD')
        const lastAnswerDay = moment(this.state.meditationLastAnswerDate).format('YYYY-MM-DD')
        const isAnsweredToday = todayDay === lastAnswerDay

        return (
            <View style={STYLES.appContainer}>
                <TextInput
                    style={{height: 50}}
                    onChangeText={(text) => this._onNicknameChanged(text)}
                    value={this.state.nickname}
                    placeholder={SELECTED_STRINGS.pleaseEnterANickname}
                />
                <Text style={STYLES.adviceText}>
                    {SELECTED_STRINGS.dontChangeYourNickname}
                </Text>
                <Survey
                    questionText={SELECTED_STRINGS.haveYouMeditatedToday}
                    option1Text={SELECTED_STRINGS.yes}
                    option2Text={SELECTED_STRINGS.no}
                    thankYouText={SELECTED_STRINGS.thanksForYourResponse}
                    onOption1Clicked={() => this._onAnswerSubmitted('yes')}
                    onOption2Clicked={() => this._onAnswerSubmitted('no')}
                    isAnswered={isAnsweredToday}
                />
            </View>
        );
    }

    render() {
        const isLoading = this.state.isLoading;
        const isTermsAndConditionsAccepted = this.state.termsAndConditionsAnswer === 'yes';
        if (isLoading) {
            return this._renderLoadingScreen();
        }
        if (isTermsAndConditionsAccepted) {
            return this._renderSurvey();
        }
        return this._renderTermsAndConditions();
    }
}



AppRegistry.registerComponent('PsychApp', () => PsychApp);