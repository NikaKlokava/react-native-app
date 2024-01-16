import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {RandomNumber} from './RandomNumber';
import {Timer} from './Timer';
import {shuffle} from 'lodash';

type Props = {
  randomNumberCount: number;
  initialSeconds: number;
};
enum GameStatus {
  win = 'WIN',
  playing = 'PLAYING',
  lost = 'LOST',
}

export const Game = ({randomNumberCount, initialSeconds}: Props) => {
  const [selectedNumIndexes, setSelectedNumIndexes] = useState<Array<number>>(
    [],
  );

  const [arrayOfNums, setArrayOfNums] = useState<Array<number>>([]);

  const [gameStatus, setGameStatus] = useState<GameStatus>();

  const [target, setTarget] = useState<number>();

  useEffect(() => {
    const arrOfNums = Array.from(
      {length: randomNumberCount},
      () => 1 + Math.floor(10 * Math.random()),
    );

    const totalSum = arrOfNums
      .slice(0, randomNumberCount - 2)
      .reduce((accum, curr) => {
        return accum + curr;
      }, 0);

    setTarget(totalSum);

    const shuffledArray = shuffle(arrOfNums);
    setArrayOfNums(shuffledArray);
  }, [randomNumberCount]);

  const isNumberSelected = (numIndex: number) => {
    return selectedNumIndexes.indexOf(numIndex) >= 0;
  };

  const selectNumber = (selestedIndex: number) => {
    setSelectedNumIndexes(prev => [...prev, selestedIndex]);
  };

  useEffect(() => {
    const sum = selectedNumIndexes.reduce((accum, curr) => {
      return accum + arrayOfNums[curr];
    }, 0);

    if (sum === target) {
      return setGameStatus(GameStatus.win);
    }
    if (target && sum > target) {
      return setGameStatus(GameStatus.lost);
    }
    return setGameStatus(GameStatus.playing);
  }, [arrayOfNums, selectedNumIndexes, target]);

  return (
    <View style={styles.container}>
      <Text
        style={[styles.target, gameStatus && styles[`STATUS_${gameStatus}`]]}>
        {target}
      </Text>
      {gameStatus === GameStatus.playing && (
        <Timer
          initialSeconds={initialSeconds}
          onTimeout={() => setGameStatus(GameStatus.lost)}
        />
      )}
      <View style={styles.num_container}>
        {arrayOfNums.map((randomNum, index) => (
          <RandomNumber
            key={index}
            id={index}
            num={randomNum}
            isSelected={
              isNumberSelected(index) || gameStatus !== GameStatus.playing
            }
            onPress={selectNumber}
          />
        ))}
      </View>
      <View style={styles.button}>
        <Button
          title="Play Again"
          color={'red'}
          onPress={() => setGameStatus(GameStatus.playing)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    rowGap: 50,
    paddingTop: 80,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },
  num_container: {
    flex: 1,
    flexDirection: 'row',
    rowGap: 70,
    columnGap: 50,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_WIN: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa',
  },
  button: {
    flex: 1,
  },
});
