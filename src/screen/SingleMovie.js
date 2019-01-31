import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Text, Title, Button, Card } from 'react-native-paper';
import { EventCard } from '../component';

class SingleEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTime: '',

      ticketURI: '',
    };

    this.handlePress = this.handlePress.bind(this);
  }
  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }

  async fetchImage() {
    const image = this.props.navigation.getParam('movie');
  }
  handlePress(selectedTime) {
    const movieShowtime = this.props.navigation
      .getParam('movie', null)
      .showtimes.filter(movie => movie.dateTime.includes(selectedTime));
    console.log('AFTER PRESSING TIME', movieShowtime);
    this.setState({ selectedTime, ticketURI: movieShowtime[0].ticketURI });
  }
  render() {
    const { navigation } = this.props;
    const theatre = this.props.navigation.getParam('theatre');

    const movie = navigation.getParam('movie', null);

    const showtimes = movie.showtimes.map(show => show.dateTime.split('T')[1]);

    if (!movie.shortDescription) {
      return <Text>...Loading</Text>;
    } else {
      return (
        <ImageBackground
          resizeMode="cover"
          source={{
            uri:
              'http://developer.tmsimg.com/' +
              movie.preferredImage.uri +
              '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-bottom',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 2 }}>
              <EventCard
                title={movie.title}
                genres={movie.genres}
                rating={movie.ratings[0].code}
                shortDescription={movie.shortDescription}
                uri={movie.preferredImage.uri}
                theatre={theatre}
              />
            </View>
            <View style={{ flex: 1.75, alignContent: 'center', marginTop: 20 }}>
              <Card
                style={{
                  backgroundColor: 'white',
                  width: this.vw(75),
                  height: this.vh(30),
                }}
                elevation={2}
              >
                <Card.Content>
                  <View
                    style={{
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {!this.state.selectedTime ? (
                      <View>
                        <Title style={{ alignSelf: 'center', marginTop: 10 }}>
                          Show Times
                        </Title>
                        <FlatList
                          numColumns={2}
                          data={showtimes}
                          renderItem={({ item }) => (
                            <Button
                              mode="outlined"
                              style={{
                                flexDirection: 'center',
                                height: 40,
                                width: 110,
                                margin: 10,
                                marginEnd: 10,
                              }}
                              key={item}
                              accessibilityLabel={item}
                              onPress={() => this.handlePress(item)}
                            >
                              {item}
                            </Button>
                          )}
                        />
                      </View>
                    ) : (
                      <View style={{}}>
                        <Button
                          onPress={() => this.setState({ selectedTime: '' })}
                        >
                          All Showtimes
                        </Button>
                        <Card
                          style={{
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            width: this.vw(40),
                            height: this.vh(15),
                            /*  alignItems: 'center', */
                            margin: 10,
                          }}
                          elevation={8}
                        >
                          <Card.Content
                            style={{ alignContent: 'space-around' }}
                          >
                            <Button
                              mode="outlined"
                              icon="info"
                              onPress={() =>
                                navigation.navigate('Chat', {
                                  state: this.state,
                                })
                              }
                            >
                              Chat!
                            </Button>
                            <Button
                              mode="outlined"
                              icon="info"
                              onPress={() =>
                                navigation.navigate('Chat', {
                                  movie: movie.tittle,
                                  showtime: this.state.selectedTime,
                                  theatre,
                                })
                              }
                            >
                              Play Trivia!
                            </Button>
                          </Card.Content>
                        </Card>
                        <Button
                          onPress={() =>
                            Alert.alert(
                              'Choose from one of our partners',
                              'options below',
                              [
                                {
                                  text: 'Fandango',
                                  icon: 'movie',

                                  onPress: () =>
                                    Linking.openURL(this.state.ticketURI),
                                },
                                {
                                  text: 'Atom',
                                  icon: 'react',
                                  onPress: () => Linking.openURL('google.com'),
                                },
                                {
                                  text: 'Friendship',
                                  icon: 'paw',
                                  onPress: () =>
                                    navigation.navigate('Home', {
                                      movie: this.state.movie,
                                    }),
                                },
                              ],
                              { cancelable: true }
                            )
                          }
                        >
                          Purchase Tickets!
                        </Button>
                      </View>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </View>
          </View>
        </ImageBackground>
      );
    }
  }
}

export default SingleEvent;