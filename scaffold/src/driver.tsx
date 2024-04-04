import './opal.rb';
import { OpalDriver } from 'gamefic-driver';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const driver = new OpalDriver(Opal, '%(className)');
export default driver;
