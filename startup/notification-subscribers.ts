import { PushOverNotifier } from "../notifications/subscribers/pushover"
import { SlackNotifier } from "../notifications/subscribers/slack";

(() => {
  new PushOverNotifier();
  new SlackNotifier();
})();
