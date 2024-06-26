import { App } from "./app";
import {connect} from './database'

connect()

async function main() {
  const app = new App(3000);
  await app.listen();
}

main()

