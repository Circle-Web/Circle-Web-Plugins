<script lang="ts" setup>
import { useRouter } from "vue-router";

const plugins = [
  {
    extUuid: "knvlecop",
    extName: "虎牙领主争霸",
    extStatus: 0,
    userOverdueBillStatus: null,
    extVersionId: 19615,
    extVersion: "1.20.2",
    extVersionType: 3,
    extVersionDisable: 1,
    extVersionOnline: 1,
    extVersionTerms: null,
    extVersionPrivacy: null,
    extLogo:
      "https://livewebbs2.msstatic.com/extension/pic/b88a379f/e54686f7cd_1641540911865.png",
    extIcon:
      "https://livewebbs2.msstatic.com/extension/pic/b88a379f/e54686f7cd_1641540911865.png?x-oss-process=image/resize,limit_0,m_fill,w_120,h_120/sharpen,80/format,png/interlace,1/quality,q_90/rounded-corners,r_25",
    extMarketSnapshots: [
      "https://livewebbs2.msstatic.com/extension/pic/b88a379f/dfea9cfeed_1641540957099.jpg",
      "https://livewebbs2.msstatic.com/extension/pic/b88a379f/bf8219a397_1641557923396.jpg",
      "https://livewebbs2.msstatic.com/extension/pic/b88a379f/c0f4e7e0ff_1641557923505.jpg",
      "https://livewebbs2.msstatic.com/extension/pic/b88a379f/0e83000895_1641557923520.jpg",
      "https://livewebbs2.msstatic.com/extension/pic/b88a379f/ea624adf37_1641557923541.jpg",
    ],
    extBrief:
      "和主播一起建设自己的领地，观众可以在主播领地里培养自己的士兵，送礼可以加速建造。和主播一起守卫家园或者掠夺其他主播的领地。",
    extDescription:
      "进入领主争霸，你可以选择建设自己家园和观众一起建筑工事，抵御侵略。也可以培养自己的士兵，发展壮大和观众一起掠夺其他主播的领地，以战养战。在这纷争之地是安居乐业，镇守一方还是征战四方，称霸天下？你将何去何从。官方交流群号：698045717\n\n2022-11-11更新内容\n本期更新内容:\n本次更新世界等级加成\n建筑,科研,士兵等级以及奖杯数\n低于世界奖杯榜前100名平均数85%,可以获得额外加成\n与平均数差距越大,获得的加成越高\n领主原东、西、南三个区合并为先锋大区，转区、霸主战等现有玩法均不受影响\n同时领主争霸荣誉大区将在近期开放",
    extAuthorName: "huya_minigame1",
    extAuthorEmail: null,
    extSupportEmail: null,
    extSupportWechat: null,
    extTypes: [
      {
        typeName: "PC主播端-面板",
        typeTag: "pc_anchor_panel",
        typeDesc: null,
        endpoint: "anchor_pc",
        hostId: "huyaext",
        showForm: null,
        uaTagList: null,
        runTerminal: null,
        typeUaList: ["pc_exe_template"],
      },
      {
        typeName: "虎牙直播APP-浮窗",
        typeTag: "app_popup",
        typeDesc: null,
        endpoint: "app",
        hostId: "huyaext",
        showForm: null,
        uaTagList: null,
        runTerminal: null,
        typeUaList: ["adr", "ios"],
      },
      {
        typeName: "虎牙主站-浮窗",
        typeTag: "web_popup",
        typeDesc: null,
        endpoint: "web",
        hostId: "huyaext",
        showForm: null,
        uaTagList: null,
        runTerminal: null,
        typeUaList: ["web"],
      },
      {
        typeName: "虎牙直播APP-面板",
        typeTag: "app_panel",
        typeDesc: null,
        endpoint: "app",
        hostId: "huyaext",
        showForm: null,
        uaTagList: null,
        runTerminal: null,
        typeUaList: ["adr", "ios"],
      },
      {
        typeName: "虎牙主站-面板",
        typeTag: "web_video_com",
        typeDesc: null,
        endpoint: "web",
        hostId: "huyaext",
        showForm: null,
        uaTagList: null,
        runTerminal: null,
        typeUaList: ["web"],
      },
      {
        typeName: "虎牙直播APP-内部RN",
        typeTag: "app_inner_rn",
        typeDesc: null,
        endpoint: "app",
        hostId: "huyaext",
        showForm: null,
        uaTagList: null,
        runTerminal: null,
        typeUaList: ["adr", "ios"],
      },
      {
        typeName: "虎牙助手APP-面板",
        typeTag: "zs_anchor_panel",
        typeDesc: null,
        endpoint: "anchor_zs",
        hostId: "huyaext",
        showForm: null,
        uaTagList: null,
        runTerminal: null,
        typeUaList: ["adr_zs", "ios_zs"],
      },
    ],
    createTime: null,
    updateTime: null,
    hadInstall: false,
    extAppStoreUrl: "https://appstore.huya.com/#/app/knvlecop",
    keywords: ["领地建筑", "攻城对战", "快速涨粉"],
    badgeLabelInfo: {
      badgeLabel: "热游推荐",
      color: 1,
    },
    like: 3016,
    hadLike: false,
    useProfileList: [
      {
        uid: 2256766655,
        yyid: 2257892831,
        roomId: 16283644,
        nick: "难测",
        logo: "https://huyaimg.msstatic.com/avatar/1084/26/f1de828112ada83bc119ca35ce2ced_180_135.jpg?1534420834",
        activityCount: 1329,
        audienceNum: 15105,
      },
      {
        uid: 1199513619283,
        yyid: 35184377683322,
        roomId: 25962842,
        nick: "祝大家福生无量",
        logo: "https://huyaimg.msstatic.com/avatar/1020/db/e0d2c840cd7b72da54c59eabff45cb_180_135.jpg?1664804660",
        activityCount: 218,
        audienceNum: 40541,
      },
      {
        uid: 1199546222307,
        yyid: 35184465142437,
        roomId: 28056257,
        nick: "哆啦不是A梦鸭",
        logo: "https://huyaimg.msstatic.com/avatar/1033/52/b3205407900ca5e770b0374eccb057_180_135.jpg?1661533764",
        activityCount: 0,
        audienceNum: 32307,
      },
      {
        uid: 1500137991,
        yyid: 1682472227,
        roomId: 27984432,
        nick: "小帅",
        logo: "https://huyaimg.msstatic.com/avatar/1029/43/5f6b58d44a5615099c1d0b5f621b6d_180_135.jpg?1668310063",
        activityCount: 10,
        audienceNum: 36803,
      },
      {
        uid: 2219451916,
        yyid: 2219612991,
        roomId: 16565885,
        nick: "赢城-猫耳",
        logo: "https://huyaimg.msstatic.com/avatar/1014/c2/c2a567c6e3a3c5b195f1b2722df09f_180_135.jpg?1665151852",
        activityCount: 11055,
        audienceNum: 30592,
      },
    ],
    commentCnt: 176,
    extRating: 4.4,
    hasUserRatingExt: false,
  },
];

const router = useRouter();
const toDetail = (row: any) => {
  router.push({ name: "detail", params: { id: row.extVersionId } });
};
</script>

<template>
  <div
    class="sc__card"
    v-for="plugin in plugins"
    :key="plugin.extVersionId"
    @click="toDetail(plugin)"
  >
    <div class="sc__card-body">
      <img :src="plugin.extLogo" class="sc__card-logo" />
      <div class="sc__card-content">
        <div class="sc__card-title">{{ plugin.extName }}</div>
        <ul class="sc__card-users">
          <li
            class="sc__card-item"
            v-for="user in plugin.useProfileList"
            :key="user.uid"
          >
            <a href="javascript:;">
              <img :src="user.logo" />
            </a>
          </li>
        </ul>
        <div class="sc__card-keywords">
          <div
            class="sc__card-keyword"
            v-for="keyword in plugin.keywords"
            :key="keyword"
          >
            {{ keyword }}
          </div>
        </div>
      </div>
      <div class="sc__card-btn">+ 添加</div>
    </div>
    <div class="sc__card-desc">{{ plugin.extBrief }}</div>
  </div>
</template>

<style lang="scss">
.sc__card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 175px;
  background: #fff;
  border-radius: 6px;
  padding: 25px 20px 14px 20px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 6px rgb(0 0 0 / 9%);
  }
  .sc__card-body {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .sc__card-logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .sc__card-content {
    flex: 1;
    padding-left: 8px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .sc__card-title {
    display: inline-block;
    max-width: 8em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 16px;
    color: #222;
    line-height: 18px;
  }
  .sc__card-users {
    list-style: none;
    margin: 0;
    padding-left: 0;
    line-height: unset;
    .sc__card-item {
      display: inline-block;
      padding-right: 2px;
      img {
        width: 20px;
        height: 20px;
        border: 1px solid white;
        border-radius: 50%;
        transition: all 0.3s;
        &:hover {
          border: 1px solid #ff9600;
        }
      }
    }
  }
  .sc__card-keywords {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    .sc__card-keyword {
      background: #f4f5f8;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.4);
      margin-left: 4px;
      padding: 2px 4px;
    }
  }

  .sc__card-btn {
    display: inline-flex;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 14px;
    white-space: nowrap;
    text-align: center;
    user-select: none;
    touch-action: manipulation;
    cursor: pointer;
    color: #5896e9;
    background: #f4f5f8;
    text-align: center;
    &:hover {
      color: #fff;
      background: #5896e9;
    }
  }
  .sc__card-desc {
    margin-top: 12px;
    font-size: 12px;
    line-height: 1.5;
    height: 3em;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
