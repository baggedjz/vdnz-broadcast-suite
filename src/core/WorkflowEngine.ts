import { eventBus } from "./EventBus";

export const WorkflowEngine = {
  startBattle() {
    eventBus.emit("battle:start", {});
  },

  finishBattle() {
    eventBus.emit("battle:finish", {});
  },

  nextBattle() {
    eventBus.emit("battle:next", {});
  },

  showReplay() {
    eventBus.emit("broadcast:replay", {});
  },

  showWinner() {
    eventBus.emit("broadcast:winner", {});
  },
};