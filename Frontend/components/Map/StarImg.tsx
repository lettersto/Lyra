import React from 'react';
import {Image} from 'react-native';

function StarCnt(chatCnt: number) {
  let ImgURI;
  if (chatCnt < 4) {
    ImgURI = require('../../assets/image/threestars.png');
  } else if (chatCnt == 4 || (chatCnt > 4 && chatCnt < 8)) {
    ImgURI = require('../../assets/image/fourstars.png');
  } else if (chatCnt == 8 || (chatCnt > 8 && chatCnt < 16)) {
    ImgURI = require('../../assets/image/fivestars.png');
  } else if (chatCnt == 16 || (chatCnt > 16 && chatCnt < 32)) {
    ImgURI = require('../../assets/image/fourstars.png');
  } else if (chatCnt == 32 || (chatCnt > 32 && chatCnt < 64)) {
    ImgURI = require('../../assets/image/fivestars.png');
  } else {
    ImgURI = require('../../assets/image/sixstars.png');
  }
  return ImgURI;
}

const StarImg = ({chatCnt}: {chatCnt: number}) => {
  return (
    <>
      <Image source={StarCnt(chatCnt)} />
    </>
  );
};

export default StarImg;
