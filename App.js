/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, {
  Component
} from 'react';

import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Content,
  Text
} from 'native-base';

import {
  ViroARSceneNavigator
} from 'react-viro';

var sharedProps = {
  apiKey:"255370FA-342A-4DA4-8286-2E08116B6073",
}

var InitialARScene = require('./js/HelloWorldSceneAR');
var InitialPosterScene = require('./js/ARPosterDemo');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";
var POSTER_NAVIGATOR_TYPE = "POSTER";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {

  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == POSTER_NAVIGATOR_TYPE) {
      return this._getPosterNavigator();
    }
  }
  _getExperienceSelector() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Demo</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{flex:1,justifyContent: 'center'}} >
          <Button full warning onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}>
            <Text>Hello World!</Text>
          </Button>
          <Button full warning onPress={this._getExperienceButtonOnPress(POSTER_NAVIGATOR_TYPE)}>
            <Text>AR Poster</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  
    _getARNavigator() {
      return (
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} />
      );
    }

    _getPosterNavigator() {
      return (
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: InitialPosterScene}} />
      );
    }

  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

module.exports = ViroSample
