import {memo} from 'react';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  initialSeconds: number;
  onTimeout: () => void;
};

export const Timer = memo(({initialSeconds, onTimeout}: Props) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(prev => prev - 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      onTimeout();
    }
  }, [onTimeout, seconds]);
  return <Text style={styles.timer}>{seconds}</Text>;
});

const styles = StyleSheet.create({
  timer: {
    textAlign: 'center',
    color: 'brown',
    fontSize: 30,
  },
});
