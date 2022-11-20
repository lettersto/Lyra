import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextStyle,
} from 'react-native';

import {GiftedChatContext} from 'react-native-gifted-chat/lib/GiftedChatContext';
import {
  Avatar,
  BubbleProps,
  MessageTextProps,
  StylePropType,
  MessageText,
} from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import {IMessage} from '../../constants/types';

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 15,
      borderBottomLeftRadius: 0,
      backgroundColor: '#f0f0f0',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#0084ff',
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  }),
  content: StyleSheet.create({
    username: {
      top: -3,
      left: 0,
      fontSize: 15,
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      color: 'black',
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 3,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    donation: {
      color: 'white',
    },
    bubbleContainer: {
      margin: 10,
    },
    donationContainer: {
      borderRadius: 15,
      borderBottomLeftRadius: 0,
    },
    donationFont: {
      top: -3,
      left: 0,
      fontSize: 15,
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      color: 'white',
    },
  }),
};

const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel'];

export type RenderMessageTextProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageTextProps<TMessage>;

interface CustomBubbleProps<TMessage extends IMessage>
  extends BubbleProps<TMessage> {}

export default class CustomBubble<
  TMessage extends IMessage = IMessage,
> extends React.Component<CustomBubbleProps<TMessage>> {
  static contextType = GiftedChatContext;

  static defaultProps = {
    touchableProps: {},
    onPress: null,
    onLongPress: null,
    renderMessageText: null,
    renderCustomView: null,
    renderUsername: null,
    position: 'left',
    optionTitles: DEFAULT_OPTION_TITLES,
    currentMessage: {
      text: null,
      createdAt: null,
      image: null,
    },
    containerStyle: {},
    wrapperStyle: {},
    bottomContainerStyle: {},
    tickStyle: {},
    usernameStyle: {},
    containerToNextStyle: {},
    containerToPreviousStyle: {},
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    touchableProps: PropTypes.object,
    onLongPress: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderCustomView: PropTypes.func,
    isCustomViewBottom: PropTypes.bool,
    renderUsernameOnMessage: PropTypes.bool,
    renderUsername: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    optionTitles: PropTypes.arrayOf(PropTypes.string),
    currentMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
    wrapperStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
    bottomContainerStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
    tickStyle: StylePropType,
    usernameStyle: StylePropType,
    containerToNextStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
    containerToPreviousStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
  };

  renderMessageText() {
    if (this.props.currentMessage && this.props.currentMessage.text) {
      const {containerStyle, wrapperStyle, optionTitles, ...messageTextProps} =
        this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return <MessageText {...messageTextProps} />;
    }
    return null;
  }

  renderUsername() {
    const {currentMessage, user} = this.props;
    if (this.props.renderUsernameOnMessage && currentMessage) {
      if (user && currentMessage.user._id === user._id) {
        return null;
      }
      return (
        <View style={styles.content.usernameView}>
          <Text
            style={
              this.props.currentMessage!.donation
                ? ([
                    styles.content.username,
                    this.props.usernameStyle,
                    styles.content.donation,
                  ] as TextStyle)
                : ([
                    styles.content.username,
                    this.props.usernameStyle,
                  ] as TextStyle)
            }>
            {currentMessage.user.name}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return null;
  }

  renderBubbleContent() {
    return this.props.isCustomViewBottom ? (
      <View>
        {this.renderMessageText()}
        {this.renderCustomView()}
      </View>
    ) : (
      <View>
        {this.renderCustomView()}
        {this.renderMessageText()}
      </View>
    );
  }
  renderAvatar() {
    const {user, currentMessage} = this.props;

    if (
      user &&
      user._id &&
      currentMessage &&
      currentMessage.user &&
      user._id === currentMessage.user._id
    ) {
      return null;
    }

    if (
      currentMessage &&
      currentMessage.user &&
      currentMessage.user.avatar === null
    ) {
      return null;
    }

    const {...props} = this.props;
    return <Avatar {...props} />;
  }
  render() {
    const {position, containerStyle, wrapperStyle, bottomContainerStyle} =
      this.props;
    return (
      <View
        style={[
          styles[position].container,
          containerStyle && containerStyle[position],
        ]}>
        <View
          style={[
            styles[position].wrapper,
            wrapperStyle && wrapperStyle[position],
          ]}>
          <TouchableWithoutFeedback
            accessibilityRole="text"
            {...this.props.touchableProps}>
            {this.props.currentMessage!.donation ? (
              <LinearGradient
                start={{x: 0.25, y: 0}}
                end={{x: 1, y: 0.75}}
                colors={[Colors.pink300, Colors.purple300]}
                style={styles.content.donationContainer}>
                <View style={styles.content.bubbleContainer}>
                  <View
                    style={[
                      styles[position].bottom,
                      bottomContainerStyle && bottomContainerStyle[position],
                      styles.content.userInfo,
                      {justifyContent: 'space-around'},
                    ]}>
                    <View style={styles.content.userInfo}>
                      {this.renderAvatar()}
                      {this.renderUsername()}
                    </View>
                    <View style={{marginLeft: '30%'}}>
                      <Text style={styles.content.donationFont}>
                        ${this.props.currentMessage!.donation}
                      </Text>
                    </View>
                  </View>
                  {this.renderBubbleContent()}
                </View>
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles[position].bottom,
                  bottomContainerStyle && bottomContainerStyle[position],
                  styles.content.userInfo,
                  styles.content.bubbleContainer,
                ]}>
                {this.renderAvatar()}
                {this.renderUsername()}
                {this.renderBubbleContent()}
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
