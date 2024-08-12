import { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import Row from './components/Row';
import handler, {
  currentInputPrinter,
  balancePrinter,
  currentState,
  players,
  balance,
} from './util/handler';

// create class component of App
export default class App extends Component {
  state = currentState;

  // handle tap method
  HandleTap = (type, value) => {
    this.setState((state) => handler(type, value, state));
  };

  // render method
  render() {
    return (
      <View style={styles.container}>
        {/* Status bae here */}
        <SafeAreaView>
          <Text style={styles.value}>{balancePrinter(balance)}</Text>

          <Text style={styles.value}>{currentInputPrinter(this.state)}</Text>

          {/* name */}
          <Row>
            <Button
              text={players.player1}
              theme="accent"
              onPress={() => this.HandleTap('player', players.player1)}
            />

            <Button
              text={players.player2}
              theme="accent"
              onPress={() => this.HandleTap('player', players.player2)}
            />

            <Button
              text={players.player3}
              theme="accent"
              onPress={() => this.HandleTap('player', players.player3)}
            />

            <Button
              text={players.player4}
              theme="accent"
              onPress={() => this.HandleTap('player', players.player4)}
            />
          </Row>

          {/* actions */}
          <Row>
            <Button
              text="an"
              theme="secondary"
              onPress={() => this.HandleTap('an', 'an')}
            />
            <Button
              text="gang"
              theme="secondary"
              onPress={() => this.HandleTap('action', 'gang')}
            />
            <Button
              text="bite"
              theme="secondary"
              onPress={() => this.HandleTap('action', 'bite')}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.HandleTap('tai', 1)} />
            <Button text="2" onPress={() => this.HandleTap('tai', 2)} />
            <Button text="3" onPress={() => this.HandleTap('tai', 3)} />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.HandleTap('tai', 4)} />
            <Button text="5" onPress={() => this.HandleTap('tai', 5)} />
            <Button text="6" onPress={() => this.HandleTap('tai', 6)} />
          </Row>

          <Row>
            <Button
              text="undo"
              onPress={() => this.HandleTap('operation', 'undo')}
            />
            <Button
              text="Done"
              onPress={() => this.HandleTap('operation', 'done')}
            />
            <Button
              text="clear"
              onPress={() => this.HandleTap('operation', 'clear')}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

// create styles of app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 42,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});
