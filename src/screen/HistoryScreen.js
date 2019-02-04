import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  CardItem,
  Text,
  Body,
  Label,
  Input,
} from 'native-base';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import { auth, database } from '../firebase';
import Stor from '../store/Stor';
import { storage } from 'firebase';

const dummyMovieData = {
  movieImage: 'assets/p14939602_v_v5_aa.jpg',
  movie: 'Spider-Man: Into the Spider-Verse',
};

const arr = [];
for (var i = 0; i < 500; i++) {
  arr.push(i);
}
export default class HistoryScreen extends Component {
  constructor(screenProps) {
    super(screenProps);

    this.state = {
      movies: [
        {
          movie: 'Spider-Man: Into the Spider-Verse',
          movieImage: 'assets/p14939602_v_v5_aa.jpg',
          review: 'family fun!',
          rating: '☆☆☆☆☆',
        },
        {
          movie: 'Glass',
          movieImage: 'assets/p14087450_v_v6_aa.jpg',
          review: 'absolutely terrifying. no thank you.',
          rating: '☆',
        },
      ],
      selectedMovie: '',
    };
    this.animatedValue = [];
    this.state.movies.forEach(value => {
      this.animatedValue[value.movie] = new Animated.Value(0);
    });
  }

  // async componentDidMount () {
  //   const userId = this.props.screenProps
  //   await database.ref(`users/${userId}`).on('value', snapshot => {
  //     console.log(snapshot.val())
  //       this.setState({
  //         movies: this.state.movies.push(Object.values(snapshot.val().pastMovies))
  //       })
  //   })
  // }

  componentDidMount() {
    this.animate();
  }

  animate() {
    i = 0.01;
    const animations = arr.map(item => {
      return Animated.timing(this.animatedValue[item.movieImage], {
        toValue: {
          x: Math.random(),
          y: Math.random(),
          z: i,
        },
        duration: 4000,
      });
    });
    Animated.stagger(5, animations).start();
    i--;
  }
  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  render() {
    console.log('what are my movies', this.state.movies);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 10 }}>
          {/* <Header style={styles.header}> */}
          <Title style={{ marginRight: 20, alignSelf: 'center' }}>
            🍿MY MOVIES
          </Title>
          {/* </Header> */}
          <Content padder>
            {this.state.movies.map(movie => (
              <Card
                key={movie.movie}
                style={{
                  alignSelf: 'center',
                  width: this.vw(75),
                  height: this.vh(50),
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: 'red',
                  elevation: 4,
                }}
              >
                <Card.Content>
                  <Title
                    numberOfLines={1}
                    style={{
                      alignSelf: 'center',
                      color: 'darkred',
                      width: this.vw(70),
                    }}
                    ellipsizeMode="tail"
                    onPress={e => {
                      this.props.navigation.navigate('SingleMovie', {
                        history: true,
                        movie: dummyMovieData.movie,
                        image: dummyMovieData.movieImage,
                      });
                    }}
                  >
                    Spider-Man: Into the Spider-Verse
                  </Title>
                  <Card.Cover
                    source={{
                      uri:
                        'http://developer.tmsimg.com/' +
                        'assets/p14939602_v_v5_aa.jpg' +
                        '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                    }}
                  />

                  {/*  <Image
                      source={{
                        uri:
                        'http://developer.tmsimg.com/' +
                        'assets/p14939602_v_v5_aa.jpg' +
                        '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
                      }}
                      style={{ width: '45%', height: '65%' }}
                    /> */}
                  <View style={{ display: 'flex' }}>
                    <Label style={{ fontSize: 12 }}>Your Review:</Label>
                    {/* <Input /> */}
                    <View style={{ flexDirection: 'row' }}>
                      <Label style={{ fontSize: 12 }}>Your Rating: {}</Label>
                      <Text>☆☆☆☆☆</Text>
                    </View>
                    <Paragraph
                      style={{
                        fontSize: 10,
                        color: 'darkred',
                      }}
                    >
                      AMC 600 North Michigan 9{'\n'}
                      15:00 on Wed Jan 30 2019
                    </Paragraph>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </Content>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    margin: -30,
    padding: -30,
  },
});
