import { createConfirmation } from 'react-confirm';
import Confirmation from './Confirmation';

const confirmFunction = createConfirmation(Confirmation);

export default function modalConfirm(message: string) {
  // @ts-expect-error Only the confirmation needs to be passed here
  return confirmFunction({ confirmation: message });
}
