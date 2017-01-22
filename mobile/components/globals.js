import {StyleSheet} from "react-native";

const backgroundColor = '#E1F5FE'

export const STYLES = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: backgroundColor,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    adviceText: {
        fontStyle: 'italic',
        textAlign: 'center',
    },
    surveyContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: backgroundColor,
    },
    surveyOptionsLayout: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    surveyQuestion: {
        color: '#263238',
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    }
});

const ALL_STRINGS = {
    english: {
        appName: 'PsychoSoap',
        haveYouMeditatedToday: 'Have you meditated today?',
        yes: 'Yes',
        no: 'No',
        thanksForYourResponse: 'Thanks for your response!',
        youHaveSubmittedAnAnswer: 'You have submitted an answer today.',
        pleaseEnterANickname: 'Please enter a nickname here',
        dontChangeYourNickname: 'Important: please don’t change your nickname once set, because it is used in our analysis',

        errorFailedToLoadSettings: 'Failed to load settings - please restart app',
        errorPleaseEnterNicknameFirst: 'Please enter a nickname first',
        messageAnswerSubmitted: 'Answer submitted',
        errorFailedToSaveAnswer: 'Failed to save answer - are you connected to the internet?'
        errorFailedToSaveNickname: 'Failed to save nickname',
    },
    czech: {
        appName: 'Psychomejdlo',
        haveYouMeditatedToday: 'Už jsi dnes meditoval/a?',
        yes: 'Ano',
        no: 'Ne',
        thanksForYourResponse: 'Díky za Tvou odpověď!',
        youHaveSubmittedAnAnswer: 'Dnes jsi odpověděl na otázku.',
        pleaseEnterANickname: 'Napište prosím svou přezdívku zde',
        dontChangeYourNickname: 'Důležité: prosíme, neměňte svou přezdívku, usnadní nám analýzu',

        errorFailedToLoadSettings: 'Načítání nastavení selhalo, prosím, restartujte aplikaci',
        errorPleaseEnterNicknameFirst: 'Vložte prosím nejdříve svou přezdívku',
        messageAnswerSubmitted: 'Odpověď zaznamenána',
        errorFailedToSaveAnswer: 'Selhalo zaznamenání odpovědi, jste připojen/a k internetu?'
        errorFailedToSaveNickname: 'Ukládání přezdívky selhalo',
    }
}

const SELECTED_LANGUAGE = 'czech'

export const SELECTED_STRINGS = ALL_STRINGS[SELECTED_LANGUAGE]