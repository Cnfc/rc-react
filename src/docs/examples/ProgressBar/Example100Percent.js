import React from 'react';
import ProgressBar from 'ps-react/ProgressBar';

/** 100% Progress && height:20px */
export default function Example10Percent() {
  return <ProgressBar percent={100} width={150} height={20} />
}