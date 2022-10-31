import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {
  MessageTextProps,
  User,
  IMessage,
  LeftRightStyle,
  Reply,
  Omit,
  Bubble,
  Avatar,
} from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#f0f0f0',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
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
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  }),
  content: StyleSheet.create({
    tick: {
      fontSize: 10,
      backgroundColor: 'transparent',
      color: '#fff',
    },
    tickView: {
      flexDirection: 'row',
      marginRight: 10,
    },
    username: {
      top: -3,
      left: 0,
      fontSize: 12,
      backgroundColor: 'transparent',
      color: 'white',
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
  }),
};

export type RenderMessageTextProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageTextProps<TMessage>;

export interface BubbleProps<TMessage extends IMessage> {
  user?: User;
  touchableProps?: object;
  renderUsernameOnMessage?: boolean;
  isCustomViewBottom?: boolean;
  inverted?: boolean;
  position: 'left' | 'right';
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  optionTitles?: string[];
  containerStyle?: LeftRightStyle<ViewStyle>;
  wrapperStyle?: LeftRightStyle<ViewStyle>;
  textStyle?: LeftRightStyle<TextStyle>;
  bottomContainerStyle?: LeftRightStyle<ViewStyle>;
  tickStyle?: StyleProp<TextStyle>;
  containerToNextStyle?: LeftRightStyle<ViewStyle>;
  containerToPreviousStyle?: LeftRightStyle<ViewStyle>;
  usernameStyle?: TextStyle;
  quickReplyStyle?: StyleProp<ViewStyle>;
  quickReplyTextStyle?: StyleProp<TextStyle>;
  onPress?(context?: any, message?: any): void;
  onLongPress?(context?: any, message?: any): void;
  onQuickReply?(replies: Reply[]): void;
  renderMessageText?(props: RenderMessageTextProps<TMessage>): React.ReactNode;
  renderCustomView?(bubbleProps: BubbleProps<TMessage>): React.ReactNode;
  renderUsername?(): React.ReactNode;
}

export default class CustomBubble extends Bubble {
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
              [styles.content.username, this.props.usernameStyle] as TextStyle
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
        {this.renderMessageImage()}
        {this.renderMessageVideo()}
        {this.renderMessageAudio()}
        {this.renderMessageText()}
        {this.renderCustomView()}
      </View>
    ) : (
      <View>
        {this.renderCustomView()}
        {this.renderMessageImage()}
        {this.renderMessageVideo()}
        {this.renderMessageAudio()}
        {this.renderMessageText()}
      </View>
    );
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
            this.styledBubbleToNext(),
            this.styledBubbleToPrevious(),
            wrapperStyle && wrapperStyle[position],
          ]}>
          <TouchableWithoutFeedback
            onPress={this.onPress}
            onLongPress={this.onLongPress}
            accessibilityRole="text"
            {...this.props.touchableProps}>
            <LinearGradient
              start={{x: 0.25, y: 0}}
              end={{x: 1, y: 0.75}}
              colors={[Colors.pink300, Colors.purple300]}
              style={{borderRadius: 10}}>
              <View>
                <Avatar />
                {this.renderBubbleContent()}
                <View
                  style={[
                    styles[position].bottom,
                    bottomContainerStyle && bottomContainerStyle[position],
                  ]}>
                  {this.renderUsername()}
                  {this.renderTime()}
                  {this.renderTicks()}
                </View>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
        {this.renderQuickReplies()}
      </View>
    );
  }
}
