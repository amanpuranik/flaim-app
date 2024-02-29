import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const generateUid = (): string => {
    const uid = uuidv4().replace(/-/g, '').substring(0, 28);
    return uid.padEnd(28, '0');
}
