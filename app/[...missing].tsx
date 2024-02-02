import { router } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
export default function NotFoundScreen() {
  return (
    <Wrapper title={"Missing"}>
      <Text>Something went wrong.</Text>
      <Button mode='text' onPress={() => router.replace("/feed")}>Go Home</Button>
    </Wrapper>

  );
}