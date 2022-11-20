import PropTypes from 'prop-types';
import React from 'react';
import {View, StyleSheet, ViewStyle, LayoutChangeEvent} from 'react-native';

import {
  Avatar,
  AvatarProps,
  SystemMessageProps,
  DayProps,
  StylePropType,
  User,
  LeftRightStyle,
} from 'react-native-gifted-chat';
import {IMessage} from '../../constants/types';
import CustomBubble from './CustomBubble';

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
  }),
};

export interface MessageProps<TMessage extends IMessage> {
  key: any;
  showUserAvatar?: boolean;
  position: 'left' | 'right';
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  user: User;
  inverted?: boolean;
  containerStyle?: LeftRightStyle<ViewStyle>;
  renderBubble?(props: CustomBubble['props']): React.ReactNode;
  renderDay?(props: DayProps<TMessage>): React.ReactNode;
  renderSystemMessage?(props: SystemMessageProps<TMessage>): React.ReactNode;
  renderAvatar?(props: AvatarProps<TMessage>): React.ReactNode;
  shouldUpdateMessage?(
    props: MessageProps<IMessage>,
    nextProps: MessageProps<IMessage>,
  ): boolean;
  onMessageLayout?(event: LayoutChangeEvent): void;
}

export default class CustomMessage<
  TMessage extends IMessage = IMessage,
> extends React.Component<MessageProps<TMessage>> {
  static defaultProps = {
    renderAvatar: undefined,
    renderBubble: null,
    renderDay: null,
    renderSystemMessage: null,
    position: 'left',
    currentMessage: {},
    nextMessage: {},
    previousMessage: {},
    user: {},
    containerStyle: {},
    showUserAvatar: false,
    inverted: true,
    shouldUpdateMessage: undefined,
    onMessageLayout: undefined,
  };

  static propTypes = {
    renderAvatar: PropTypes.func,
    showUserAvatar: PropTypes.bool,
    renderBubble: PropTypes.func,
    renderDay: PropTypes.func,
    renderSystemMessage: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    user: PropTypes.object,
    inverted: PropTypes.bool,
    containerStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
    shouldUpdateMessage: PropTypes.func,
    onMessageLayout: PropTypes.func,
  };

  renderBubble() {
    const {...props} = this.props;
    if (this.props.renderBubble) {
      return this.props.renderBubble(props);
    }
    // @ts-ignore
    return <CustomBubble {...props} renderAvatar={renderAvatar()} />;
  }

  renderAvatar() {
    const {user, currentMessage, showUserAvatar} = this.props;

    if (
      user &&
      user._id &&
      currentMessage &&
      currentMessage.user &&
      user._id === currentMessage.user._id &&
      !showUserAvatar
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
    const {currentMessage, onMessageLayout, position, containerStyle} =
      this.props;
    if (currentMessage) {
      return (
        <View
          onLayout={onMessageLayout}
          style={[
            styles[position].container,
            // {marginVertical: 5},
            !this.props.inverted && {marginBottom: 3},
            containerStyle && containerStyle[position],
          ]}>
          {this.renderBubble()}
        </View>
      );
    }
    return null;
  }
}
