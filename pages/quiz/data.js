const dimensions = {
  E: "外向/社交能量",
  I: "内向/独处能量",
  L: "领导/掌控欲",
  S: "辅助/照顾他人",
  X: "搞怪/自由灵魂",
  P: "洞察力"
};


const fixedQuestions = [
  //---能量来源与社交(EvsI)---
  {
    id: 1,
    question: "结束了繁忙的学习或工作，假期你最想怎么度过？",
    options: [
      { text: "立刻约上三五好友，去NEXZ去过的地方打卡巡礼", type: ["E"] },
      { text: "只想一个人待着，点个外卖，看看团综和舞台直拍", type: ["I", "I"] },
      { text: "复刻呐呐大厨的经典菜品，研究一下食谱", type: ["S", "P"] },
      { text: "和朋友约饭顺便安利我们六团舞一NEXZ", type: ["E"] }
    ]
  },
  {
    id: 2,
    question: "在一个全是陌生人的派对/聚会上，你通常会是什么状态？",
    options: [
      { text: "作为主持者调动气氛，组织大家破冰", type: ["L", "E"] },
      { text: "找个角落或者待在熟悉的朋友身边，默默观察", type: ["I"] },
      { text: "别人来主动搭话会很友好地回应，不然就是抠城堡", type: ["S", "I"] },
      { text: "不管认不认识，只要有音乐就能一起发疯", type: ["X", "E", "E"] }
    ]
  },
  {
    id: 3,
    question: "看团综时，你的关注点通常在？",
    options: [
      { text: "我要截图做表情包", type: [] },
      { text: "哈哈哈哈哈哈哈哈哈", type: [] },
      { text: "好想学韩语……", type: ["L"] },
      { text: "速扒同款香水！", type: ["P", "L"] },
      { text: "素材积累中……", type: [] }

    ]
  },

  //---行事风格与掌控欲(LvsSvsP)---
  {
    id: 4,
    question: "如果和朋友复刻小呐呐济州岛之旅，你通常扮演什么角色？",
    options: [
      { text: "严肃复习vlog，安排好每天的行程，大家跟着我走就行", type: ["L", "P"] },
      { text: "随遇而安，没有固定计划，走到哪玩到哪，享受惊喜", type: ["S"] },
      { text: "负责旅途中的生活琐事，比如找美食、订酒店、拍照", type: ["S", "S"] },
      { text: "负责睡觉和当吉祥物，提供情绪价值", type: ["E"] }
    ]
  },
  {
    id: 5,
    question: "玩MAFIA类游戏时，你通常是哪种玩家？",
    options: [
      { text: "控场分析局势，输了会复盘", type: ["L", "P"] },
      { text: "不太说话，暗中记票算身份，最后carry全场", type: ["P", "P"] },
      { text: "听不懂，还是跟票吧", type: [] },
      { text: "捣乱型，乱杀乱投开心就好（^-^）", type: ["X"] }
    ]
  },
  {
    id: 6,
    question: "面对一个全新的、有挑战性的任务（比如学一支很难的舞），你的第一反应是？",
    options: [
      { text: "有点兴奋，把它当成证明自己的机会，迎难而上", type: ["L", "E"] },
      { text: "感到有些焦虑，担心自己做不好，希望能有人带", type: [] },
      { text: "先拆解动作，分析难点，制定练习计划", type: ["P", "L"] },
      { text: "先学了再说，动作错了就加个即兴动作混过去", type: ["X"] }
    ]
  },

  //---情感特质与共情力(SvsXvsE)---
  {
    id: 7,
    question: "如果不小心做错事伤害了朋友，你会？",
    options: [
      { text: "非常自责和内疚，想尽一切办法买礼物道歉", type: ["S", "S"] },
      { text: "诚恳地道歉，并理性分析错误原因，保证下次不再犯", type: ["S"] },
      { text: "觉得既然不是故意的，对方应该会理解吧，过会儿就好了", type: [] },
      { text: "不知所措，躲在角落里生闷气，等对方来哄", type: ["I"] }
    ]
  },
  {
    id: 8,
    question: "如果可以变成一种植物，你会选择？",
    options: [
      { text: "向日葵：永远向阳生长", type: [] },
      { text: "仙人掌：生命力顽强，浑身带刺但有独特的生存法则", type: ["L"] },
      { text: "多肉：圆润温和，安安静静地待在角落里也很治愈", type: ["S", "I", "I", "S"] },
      { text: "梅花：在雪天也能绽放，花气袭人", type: [] },
      { text: "大树：森林深处枝繁叶茂", type: ["S", "I"] }
    ]
  },

  //---特殊光环与直觉(X&Dream)---
  {
    id: 9,
    question: "在朋友们聊天时，你通常是那个…？",
    options: [
      { text: "非常优秀的倾听者！", type: ["S", "S"] },
      { text: "分享最近的八卦或奇思妙想", type: [] },
      { text: "我总能敏锐察觉朋友的情绪变化", type: ["P", "P"] },
      { text: "出其不意的幽默总是语出惊人，诡秘你也为我着迷吧", type: ["X", "E"] },
      { text: "我好想莫名其妙在大街上跳舞", type: ["X"] },
      { text: "要不我们去KTV吧？", type: ["E", "L"] }
    ]
  },

  {
    id: 10,
    question: "关于“梦想”，以下哪种描述最符合你的情况？",
    options: [
      { text: "我有一个从小到大的梦想，并且正在为之死磕", type: ["L"] },
      { text: "梦想嘛，顺其自然就好，活在当下更重要", type: ["L"] },
      { text: "我的梦想是过上自己喜欢的简简单单的生活", type: ["I"] },
      { text: "我希望能永远和好朋友们在一起", type: ["E"] },

      { text: "只能梦一梦和想一想了", type: ["X"] },
      { text: "我想一夜暴富，然后环游世界", type: [] }
    ]
  },

  {
    id: 11,
    question: "如果让你拥有一种超能力，你希望是？",
    options: [
      { text: "瞬间移动，可以去世界任何地方探索新奇事物", type: ["E"] },
      { text: "治愈之光，可以抚平所有伤痛和悲伤", type: ["S", "S", "I"] },
      { text: "绝对掌控，能让事情完全按照自己的意愿发展", type: ["L", "L"] },
      { text: "读心术，能看穿所有人的谎言和伪装", type: ["P", "I"] }
    ]
  },
  {
    id: 12,
    question: "如果让你养一只宠物，你会选择？",
    options: [
      { text: "一只忠诚热情的狗狗，每天带出去跑步社交", type: ["E", "S"] },
      { text: "一只高冷的猫咪，互不打扰但在同一个空间", type: ["I"] },
      { text: "一只粘人的垂耳兔，每天都要抱抱", type: ["S"] },
      { text: "鳄鱼、大象或者长颈鹿，就要养别人不敢养的", type: ["X", "L"] }
    ]
  },

  // --- 能量来源与社交 (E vs I) ---

  {
    id: 13,
    question: "去KTV聚会，大家都把麦克风递来递去，你通常会？",
    options: [
      { text: "主动点几首拿手歌，不仅要唱还要带动气氛", type: ["E", "L"] },
      { text: "安静地坐在角落吃果盘，很少唱", type: ["I"] },
      { text: "点一些耳熟能详的歌大家一起唱", type: ["E", "S"] },
      { text: "点个忐忑吧", type: ["X"] }
    ]
  },

  // --- 行事风格与掌控欲 (L vs S vs P) ---

  {
    id: 14,
    question: "当团队里出现分歧，大家都在争吵时，你会？",
    options: [
      { text: "站出来拍板决定，推进进度", type: ["L", "E"] },
      { text: "充当和事佬，安抚大家的情绪，避免冲突升级", type: ["S"] },
      { text: "冷静分析双方的利弊，指出最合理的解决方案", type: ["P"] },
      { text: "好恐怖，要不我还是退出吧", type: ["I"] }
    ]
  },

  // --- 情感特质与共情力 (S vs X vs E) ---
  {
    id: 15,
    question: "朋友向你抱怨一件很倒霉的事，你通常的反应是？",
    options: [
      { text: "太惨了！我也遇到过，咱们一起骂那个倒霉蛋！", type: ["E", "S"] },
      { text: "抱抱他/她，耐心倾听，递纸巾安慰情绪", type: ["S", "I"] },
      { text: "我来分析一下事发原因", type: ["P"] },
      { text: "哈哈哈哈哈哈哈，太离谱了，这种事也能发生", type: [] }
    ]
  },
  {
    id: 16,
    question: "看物料时，哪个瞬间最让你心动/印象深刻？",
    options: [
      { text: "成员们互相照顾、彼此依靠的温馨时刻", type: ["S", "I"] },
      { text: "他们在舞台上整齐划一、充满力量的舞蹈瞬间", type: ["L"] },
      { text: "展现成员智慧的时候", type: [] },
      { text: "突如其来的抽象举动或精辟吐槽", type: ["X"] }
    ]
  },
  {
    id: 17,
    question: "如果用一种天气来形容你的性格，你是？",
    options: [
      { text: "晴天：热情开朗，走到哪里都是焦点", type: ["E", "L"] },
      { text: "阴天：冷静内敛，适合思考和观察", type: ["I", "P"] },
      { text: "雷阵雨：情绪来得快去得也快，偶尔会有惊人之举", type: ["X"] },
      { text: "微风：温柔舒适，让人感到放松", type: ["S"] }
    ]
  },

  // --- 能量来源与社交 (E vs I) ---

  {
    id: 18,
    question: "如果要向完全不了解K-pop的人安利NEXZ，你会怎么做？",
    options: [
      { text: "直接按头安利最新的回归舞台，让我们一起期待427的到来", type: ["E"] },
      { text: "挑最最喜欢的歌放给他听，看他反应再决定安利哪个成员", type: ["P", "S"] },
      { text: "直接开跳！嗯七克嗯七克嗯七克！", type: ["X"] },
      { text: "给他看团综，告诉他这群人很有趣", type: [] },
      { text: "算了，太累了，还是自己默默喜欢吧", type: ["I"] }
    ]
  },
  {
    id: 19,
    question: "收到朋友送的生日礼物，结果发现是你已经拥有的专辑，你会？",
    options: [
      { text: "虽然重复了但还是很开心，立刻和朋友分享拆专的喜悦", type: ["E", "S"] },
      { text: "礼貌道谢，然后把它挂在闲鱼上回血", type: ["P"] },
      { text: "假装没发现是重复的，先收起来再说", type: ["S"] },
      { text: "悄咪咪暗示我已有这套", type: ["P"] }
    ]
  },

  // --- 行事风格与掌控欲 (L vs S vs P) ---
  {
    id: 20,
    question: "去演唱会现场前，你的行李打包风格是？",
    options: [
      { text: "列好清单，分门别类装进收纳袋，连充电宝线都理好了", type: ["L", "P"] },
      { text: "带上相机、灯牌、电池，确保能记录下每一个神图瞬间", type: [] },
      { text: "带上一堆零食、湿巾、创可贴，以备不时之需", type: ["S"] },
      { text: "随便塞几件衣服，主打一个“说走就走”，到了再说", type: [] }
    ]
  },
  {
    id: 21,
    question: "在玩《谁是卧底》游戏时，如果你的词和别人的描述不符，你会？",
    options: [
      { text: "根据他们的描述开始热演，先帮自己排除嫌疑", type: ["P", "E"] },
      { text: "通过对比大家的发言猜他们的词", type: ["P"] },
      { text: "保持沉默，然后就被怀疑百口莫辩", type: ["I"] },
      { text: "三二一说颜色", type: [] }
    ]
  },
  {
    id: 22,
    question: "当你感到压力很大时，哪种解压方式最适合你？",
    options: [
      { text: "约朋友出去大吃一顿，吐槽发泄", type: ["E"] },
      { text: "一个人静静地把房间收拾干净，整理心情", type: ["I"] },
      { text: "和朋友出远门散心", type: ["E"] },
      { text: "制定一个新的计划表，用忙碌对抗焦虑", type: ["L", "P"] }
    ]
  },


  // --- 情感特质与共情力 (S vs X vs E) ---
  {
    id: 23,
    question: "如果成员不开心，你会在泡泡发什么？",
    options: [
      { text: "写一大段暖心留言，治愈他鼓励他", type: ["S"] },
      { text: "分析上下文，推测不开心的原因", type: ["P", "S"] },
      { text: "发一堆可爱的表情包和加油打气的话刷屏", type: [] },
      { text: "试图讲笑话逗他开心", type: ["X"] }
    ]
  },
  {
    id: 24,
    question: "如果要把你的生活拍成Vlog，标题会是？",
    options: [
      { text: "《沉浸式追星的一天：特种兵式打卡》", type: ["E", "L"] },
      { text: "《独处时光：宅家补档NEXZ物料》", type: ["I"] },
      { text: "《人类观察日记：我和我的冤种朋友们》", type: ["E"] },
      { text: "《今天也在努力做一个正常人（失败版）》", type: ["X"] }
    ]
  },

  // --- 特殊光环与直觉 (X & Dream & P) ---
  {
    id: 25,
    question: "如果在大街上看到有人穿着印着NEXZ头像（moya新作）的衣服，你会？",
    options: [
      { text: "虽然很好奇，但是我社恐，只能目送同志远去", type: ["I"] },
      { text: "偷偷拍下来发给同担", type: [] },
      { text: "上去搭讪，问他是不是二丫能不能扩列", type: ["E"] },
      { text: "一起cha刀不刀不刀", type: ["E"] }
    ]
  },

  {
    id: 26,
    question: "你觉得自己的大脑更像什么？",
    options: [
      { text: "像搜索引擎，随时能调取关于成员的各种资料", type: ["P"] },
      { text: "像记事本，填满各种计划和攻略", type: ["L"] },
      { text: "像避风港，总是想着怎么照顾大家的情绪", type: ["S"] },
      { text: "像万花筒，充满了各种天马行空的奇怪想法", type: ["X"] }
    ]
  },
  {
    id: 27,
    question: "对于“运气”这件事，你怎么看？",
    options: [
      { text: "运气是实力的一部分，但我更相信努力", type: ["L"] },
      { text: "运气好坏无所谓，开心最重要", type: [] },
      { text: "我总是能敏锐地察觉到好运什么时候来", type: ["P", "I"] },
      { text: "我就是那个能把坏运气当玩笑讲出来的人", type: ["X"] }
    ]
  }

];


const randomQuestions = [
  {
    id: "R1",
    question: "如果得到和NEXZ互动的机会，你最想？",
    countForScore: false,
    options: [
      { text: "检查七小呐的腹肌", type: ["X"] },
      { text: "在fay胳膊上荡秋千", type: ["X"] },
      { text: "挑战把seita逗笑", type: ["E"] },
      { text: "给忙内line放trouble maker", type: ["X"] },
      { text: "和so geon聊到天亮", type: ["I"] },
      { text: "yuki说老梗，我和小森优阳比憋笑", type: ["X"] }
    ]
  },
  {
    id: "R2",
    question: "突击检查！以下歌词出自哪首歌？",
    countForScore: false,
    image: "../../img/lyrics.jpg",
    options: [
      { text: "Keep on Moving", type: ["L"] },
      { text: "Here & Now", type: ["S"] },
      { text: "Make it Better", type: ["E"] },
      { text: "One Day", type: ["X"] }
    ]
  },
  {
    id: "R3",
    question: "以下哪个说法是对的？",
    countForScore: false,
    options: [
      { text: "tomoya的嘴唇厚度是2.1cm", type: ["X"] },
      { text: "忙内是最稳重的孩子", type: ["S"] },
      { text: "so geon其实厨艺很好", type: ["I"] },
      { text: "haru学poping是为了演丧尸", type: ["I"] },
      { text: "MOMOz已经认识了7年", type: ["I"] },

      { text: "当你惹到seita就可以飞上天空", type: ["X"] }
    ]
  },
  {
    id: "R4",
    question: "以下哪件事最难做到？",
    countForScore: false,
    options: [
      { text: "让hyui严肃拍完一期真呐！", type: ["L"] },
      { text: "让yuki把老梗备忘录删掉！", type: ["L"] },
      { text: "让yu一星期不下厨！", type: ["S"] },
      { text: "让haru一星期不做breaking！", type: ["I"] },
      { text: "让so geon不许比小狗爪子！", type: ["I"] },
      { text: "让tomoya不许one bite！", type: ["I"] },
      { text: "让seita在公司门口倒立！", type: ["I"] }


    ]
  },
  {
    id: "R5",
    question: "如果可以我想要……",
    countForScore: false,
    options: [
      { text: "moya的执行力", type: ["L"] },
      { text: "haru的自律", type: ["I"] },
      { text: "geon的毅力", type: ["L"] },
      { text: "yu的厨艺", type: ["S"] },
      { text: "hyui的pro按键", type: ["E"] },
      { text: "seita的细腻", type: ["S"] },
      { text: "yuki的稳重", type: ["I"] },
      { text: "NEXZ的舞蹈实力", type: ["X"] }
    ]
  },
  {
    id: "R6",
    question: "如果偶遇NEXZ我会做什么吸引他们的注意力",
    countForScore: false,
    options: [
      { text: "摇身一变变成Hello Kitty向hyui表白", type: ["E"] },
      { text: "去买一份香香的炸猪排围着yuki转圈圈", type: ["X"] },
      { text: "突然对着哥line跳beat-boxer的dance break", type: ["L"] },
      { text: "前面背一个库巴包后面背一个苏建天吸引so geon注意力", type: ["X"] },
      { text: "拿着画板走到seita面前让他摆姿势开始作画", type: ["S"] },
      { text: "突然来个后空翻然后跳出道曲离场", type: ["X"] }
    ]
  },
  {
    id: "R7",
    question: "你做了一个很奇怪的梦，梦里你变成了",
    countForScore: false,
    options: [
      { text: "yu的卡姿兰大眼睛。前面的帅哥是谁！嗷原来是镜子里的我", type: ["X"] },
      { text: "moya的明太子嘴唇。什么东西QQ弹弹还很软，原来是我", type: ["X"] },
      { text: "so geon嘴角的巧克力痣。为什么所有人都在看着我", type: ["I"] },
      { text: "hyui的牙齿。啊好凉快", type: ["E"] }
    ]
  },
  {
    id: "R8",
    question: "如果入职JYP，你想当？",
    countForScore: false,
    options: [
      { text: "一楼咖啡厅的店员（有机会被请咖啡版）", type: ["S"] },
      { text: "有机食堂的营养师，孩子们香蕉管够", type: ["S"] },
      { text: "一本部的cody", type: ["I"] },
      { text: "我想给孩子们写歌", type: ["L"] },
      { text: "我想篡位PD nim，然后抢c位", type: ["X"] }
    ]
  },
  {
    id: "R9",
    question: "如果让你策划NEXZ下一次粉丝见面会的小短片，你想策划什么剧情？",
    countForScore: true,
    options: [
      { text: "赛博朋克+机械战甲，要帅帅地打架！", type: [] },
      { text: "校园青春+纯爱剧情，要有那种心动的眼神特写", type: ["S"] },
      { text: "无厘头搞笑剧，让他们玩点尬的", type: ["X"] },
      { text: "悬疑推理片，策划一个烧脑剧情", type: ["P"] }
    ]
  }
];

const RANDOM_PICK_COUNT = 4;

function cloneQuestions(list) {
  return list.map((question) => ({
    ...question,
    options: (question.options || []).map((option) => ({ ...option }))
  }));
}

function shuffle(list) {
  const result = list.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function getQuizQuestions(randomCount = RANDOM_PICK_COUNT) {
  const fixed = cloneQuestions(fixedQuestions).map((question) => ({
    countForScore: true,
    ...question
  }));

  const randomPool = shuffle(cloneQuestions(randomQuestions));
  const randomPick = randomPool.slice(0, Math.min(randomCount, randomPool.length));

  return shuffle(fixed.concat(randomPick));
}

module.exports = {
  dimensions,
  fixedQuestions,
  randomQuestions,
  getQuizQuestions,
  RANDOM_PICK_COUNT
};
