import { FALSE } from "sass";
import { computed, ref, Ref, watchEffect } from "vue";

import { Character, GameStatus, TIMEOUT } from "../../shared/GameDefs";
import {
  round, PlayerDef, PublicPlayerDef, RoomDef
} from "../../shared/ModelDefs";
//import { getGameStatus } from "../http/gameStatus";

export const Room = ref<RoomDef>({
  roomNumber: "",//房间号码
	creatorID: "",//创建者ID
	players: [],// 参与者
	password: undefined, //是否设置密码，存放哈希过的密码
	currentRound: 0,//当前轮数 -> 游戏结束重置
	currentTeamVote: 0,//当前组队投票轮数 -> 游戏结束重置
	prevTeamVote: 0,//上一次组队投票成功的轮数 -> 游戏结束重置
	needingChatacters: [],//设置的角色
	remainingIndexes: [],//空缺玩家号码
	isFinished: false,//是否已经结束 -> 游戏结束重置
	gameStatus: [],//所有的游戏状态的栈，游戏结束重置
});
/** 玩家的公开信息 */
export const players: Ref<PublicPlayerDef[]> = ref([]);
/** 角色配置 */
export const needingCharacters = ref<Character[]>([]);
/** 自己的详细状态 */
export const self = ref<PlayerDef>({
  _id: "",
  character: "",
  teamVoted: [],
  questVoted: [],
  index: 0,
  isFairy: false,
  name: "---",
});
/** 自己的角色 */
export const character = computed(() =>
  self.value ? self.value.character : ""
);
/** 天数 */
export const date = ref<round>(-1);
/** 当前游戏进程 */
export const gameStatus = ref<GameStatus>(GameStatus.DAY_DISCUSS);
/** 当前状态还有多结束 */
export const gameStatusTimeLeft = ref(
  TIMEOUT[GameStatus.DAY_DISCUSS]
);
/**
 * gameStatus 被修改时调用, 改变 ui 状态, 弹出提示等
 */

/**
 * 获得最新的游戏信息
 */
/* export async function refresh() {
  const data = await getGameStatus({});
  if (!data) return;

  date.value = data.curDay;
  gameStatus.value = data.gameStatus;
  players.value = data.players;
  self.value = data.self;
}
 */