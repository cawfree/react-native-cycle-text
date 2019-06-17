import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import PropTypes from 'prop-types';

const styles = StyleSheet.create(
  {
    messageStyle: {
      textAlign: 'justify',
      color: '#FFFFFFAA',
    },
  },
);

class TextCycler extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.state = ({
      animOpacity: null,
      message: nextProps.nextMessage(),
    });
    this.__cycle = this.__cycle.bind(this);
    this.__getMessageLinkText = this.__getMessageLinkText.bind(this);
  }
  componentDidMount() {
    const {
      disabled,
    } = this.props;
    if (!disabled) {
      this.__startCycle();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.disabled && this.props.disabled) {
      this.__startCycle();
    }
  }
  componentWillUnmount() {
    this.setState({
      animOpacity: null,
    });
  }
  __startCycle() {
    const {
      disabled,
    } = this.props;
    const {
      animOpacity,
    } = this.state;
    if (!animOpacity && !disabled) {
      this.setState(
        {
          animOpacity: new Animated.Value(0),
        },
        this.__cycle,
      );
    }
  }
  __cycle() {
    const {
      nextMessage,
      duration,
    } = this.props;
    const {
      animOpacity,
    } = this.state;
    if (animOpacity) {
      Animated.sequence(
        [
          Animated.timing(
            animOpacity,
            {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            },
          ),
          Animated.timing(
            animOpacity,
            {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }
          ),
          Animated.timing(
            animOpacity,
            {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            },
          ),
        ],
      ).start(() => setTimeout(
        () => {
          this.setState(
            {
              message: nextMessage(),
            },
            this.__cycle,
          );
        },
        300,
      ));
    }
  }
  __getMessageLinkText() {
    const {
      message,
    } = this.state;
    return message[1];
  }
  render() {
    const {
      style,
      linkStyle,
      duration,
      disabled,
      onPress,
      messageStyle,
    } = this.props;
    const {
      animOpacity,
      message,
    } = this.state;
    return (
      <Animated.View
        style={[
          style,
          {
            opacity: (animOpacity || 0),
          },
        ]}
      >
        <Hyperlink
          onPress={onPress}
          linkStyle={linkStyle}
          linkText={this.__getMessageLinkText}
        >
          <Text
            style={messageStyle}
          >
            {message[0]}
          </Text>
        </Hyperlink>
      </Animated.View>
    );
  }
}

TextCycler.propTypes = {
  style: PropTypes.shape({}),
  linkStyle: PropTypes.shape({}),
  duration: PropTypes.number,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  messageStyle: PropTypes.shape({}).isRequired,
};

TextCycler.defaultProps = {
  style: {},
  linkStyle: styles.linkStyle,
  duration: 3000,
  disabled: false,
  onPress: e => null,
  messageStyle: styles.messageStyle,
};

export default TextCycler;
