const QUESTIONS = [
  ["下水道醒来", "你被井盖缝里漏下来的阳光晃醒。今天第一反应是：", [
    ["查一下今天的工作计划", { DO: 2, SAFE: 1 }],
    ["先刷会儿人类短视频，等灵感上线", { AVOID: 2, DRAMA: 1 }],
    ["os：一直躺在床上会不会死", { DRAMA: 2, DO: -1 }]
  ]],
  ["下水道醒来", "走到门口，你闻到三种味道，可能是食物。你会：", [
    ["先判断哪条路线最安全", { SAFE: 2, DO: 1 }],
    ["跟着最香的走，机不可失", { DRAMA: 1, SAFE: -1, DO: 1 }],
    ["还是再等等，静观其变", { AVOID: 2, DO: -1 }]
  ]],
  ["下水道醒来", "路过水洼看到自己倒影，你会：", [
    ["整理毛发，体面是基本盘", { MASK: 2, SAFE: 1 }],
    ["自拍一张发朋友圈", { MASK: 1, SOCIAL: 1, DRAMA: 1 }],
    ["无所谓什么样，每天都一样", { SAFE: 2, MASK: -1 }]
  ]],
  ["觅食时段", "第一站是便利店后门，垃圾袋已上线。你会：", [
    ["按老规矩高热量、低风险", { SAFE: 2, DO: 1 }],
    ["今天想吃点新鲜的，赌一把网红店后厨", { DRAMA: 1, SAFE: -1 }],
    ["在隐蔽的地方随便捡一点", { AVOID: 2, DO: -1 }]
  ]],
  ["觅食时段", "你发现一块完整三明治，同时听到脚步声。你会：", [
    ["秒叼就跑，执行大于犹豫", { DO: 2, SAFE: 1 }],
    ["卖萌可耻但有用", { MASK: 1, SAFE: 2 }],
    ["放弃这口，告诉自己‘我值得更好的’", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["觅食时段", "吃到一半，另一只浣熊盯着你看。你会：", [
    ["分他一点，做熊留一线", { SOCIAL: 2, SAFE: 1 }],
    ["先聊两句试探，再决定分不分", { SOCIAL: 1, MASK: 1 }],
    ["护食后退，避免复杂关系", { SAFE: 1, SOCIAL: -1, AVOID: 1 }]
  ]],
  ["街区社交", "老友邀你加入‘今晚整活小队’。你会：", [
    ["冲！熊多，事就有戏！", { SOCIAL: 2, DRAMA: 1 }],
    ["看成员名单再决定", { SAFE: 2, MASK: 1 }],
    ["已读不回，睡觉梳毛才是正事", { AVOID: 2, MASK: 1, SOCIAL: -1 }]
  ]],
  ["街区社交", "群里讨论路线吵起来了。你通常：", [
    ["出来定调，直接拍板", { DO: 2, SOCIAL: 1 }],
    ["发个‘都可以’维持和气", { MASK: 1, AVOID: 1 }],
    ["围观并截图精彩片段", { AVOID: 2, DRAMA: 1 }]
  ]],
  ["街区社交", "路边碰见流浪猫，对方气场很强。你会：", [
    ["主动打招呼，兄弟气色真好", { SOCIAL: 2, MASK: 1 }],
    ["今天太阳真好，小猫咪也是一只小猫咪", { SAFE: 1, MASK: 1 }],
    ["默默走进草丛，然后脑补一段宿命对手戏", { DRAMA: 2, DO: -1 }]
  ]],
  ["公园职业发展", "你听说公园垃圾桶要‘区域承包’。你会：", [
    ["立刻踩点——我要承包这里", { DO: 2, SAFE: 1 }],
    ["找人问问内幕", { SOCIAL: 2, MASK: 1 }],
    ["暂时观望，等风向明确", { SAFE: 1, AVOID: 1 }]
  ]],
  ["公园职业发展", "队友提议‘搞个品牌：城市清道夫’。你会：", [
    ["霸气！名字要响，人设要稳", { MASK: 2, SOCIAL: 1 }],
    ["先算收益，不做无效包装", { SAFE: 2, DO: 1 }],
    ["不如去公园整点薯条", { DRAMA: 2, DO: 1 }]
  ]],
  ["公园职业发展", "试运营第一天，效果一般。你倾向：", [
    ["正常情况，复盘问题明天优化", { DO: 2, SAFE: 1 }],
    ["发条动态展示进度，配文：我们在路上", { MASK: 2, DRAMA: 1 }],
    ["我要认真了", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["感情支线", "路灯下你遇到一只很会说话的浣熊小未。你会：", [
    ["快速找出话题", { SOCIAL: 2, DRAMA: 1 }],
    ["保持礼貌距离，熊还是习惯慢慢来", { SAFE: 2, MASK: 1 }],
    ["内心想了N件事，话只说了三句", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["感情支线", "聊天中途你思绪飘远，小未问你‘你在想什么’。你会：", [
    ["坦白自己走神", { DO: 1, SOCIAL: 1, MASK: -1 }],
    ["回个玩笑，轻轻带过", { MASK: 2, AVOID: 1 }],
    ["转移话题聊天气和垃圾分类", { AVOID: 2, SAFE: 1 }]
  ]],
  ["感情支线", "分别时，对方说‘改天见’。你会：", [
    ["当晚发消息，明确下一次", { DO: 2, SOCIAL: 1 }],
    ["下次的事情下次再说", { MASK: 2, SAFE: 1 }],
    ["开始想象下一次见面，但是并不出门", { DRAMA: 2, AVOID: 2 }]
  ]],
  ["自我娱乐", "夜深了，你打开人类论坛：", [
    ["搜索‘塔罗一周运势解读’", { DO: 1, DRAMA: 1 }],
    ["看别人吵架并点赞高赞阴阳", { AVOID: 1, DRAMA: 2 }],
    ["（已睡着）", { MASK:1, DO: 2 }]
  ]],
  ["自我娱乐", "朋友发来‘来打游戏’。你会：", [
    ["立马加入", { SOCIAL: 2, DRAMA: 1 }],
    ["先把手头事做完再玩", { DO: 2, SAFE: 1 }],
    ["说太忙了，然后继续刷帖子", { AVOID: 2, MASK: 1 }]
  ]],
  ["自我娱乐", "你突然想学新技能（开锁/跑酷/烹饪）。你会：", [
    ["立刻找教程开学", { DO: 2 }],
    ["先买装备，仪式感到位", { MASK: 1, DRAMA: 1, DO: -1 }],
    ["畅想一通后继续晒太阳", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["危机追逐", "你被手电照到，保安开始追。你会：", [
    ["按预设路线撤离", { SAFE: 2, DO: 1 }],
    ["临场走位，见缝插针", { DRAMA: 1, DO: 1, SAFE: -1 }],
    ["先躲进灌木，等等再说", { AVOID: 2, SAFE: 1 }]
  ]],
  ["危机追逐", "逃跑中队友摔了一跤，回头救不救？", [
    ["回头拉他一把", { SOCIAL: 2, DO: 1 }],
    ["还是先确保自己安全再接应", { SAFE: 2, DO: 1 }],
    ["默念‘各安天命’", { AVOID: 2, MASK: 1, SOCIAL: -1 }]
  ]],
  ["危机追逐", "安全后大家复盘，你会：", [
    ["整理问题，制定下次方案", { DO: 2, SAFE: 1 }],
    ["讲成传奇故事，提升士气", { DRAMA: 2, SOCIAL: 1 }],
    ["都过去了，不用复盘", { AVOID: 2 }]
  ]],
  ["天亮前总结", "凌晨四点，你准备写‘今日总结’。你会：", [
    ["写三条做得好的、两条要改的", { DO: 2, SAFE: 1 }],
    ["写下对这一天的感受", { MASK: 1, DRAMA: 2 }],
    ["想了很久，不知道写什么，最后只写了个句号", { OID: 2, DRAMA: 1 }]
  ]],
  ["天亮前总结", "明天最想改变的一件事是：", [
    ["少想一点，先做一点", { DO: 2, AVOID: -1 }],
    ["把关系维护得更体面", { MASK: 2, SOCIAL: 1 }],
    ["希望命运自己好起来", { AVOID: 2, DRAMA: 1 }]
  ]],
  ["天亮前总结", "你躺回纸箱前，在心里想：", [
    ["明天干点什么呢", { SAFE: 1, DO: 1 }],
    ["电影般的平静一天…", { DRAMA: 2 }],
    ["今天的事情明天再说", { AVOID: 2, SAFE: 1 }]
  ]]
 ];
const DIMS = ["MASK", "SAFE", "SOCIAL", "AVOID", "DRAMA", "DO"];
const DIM_META = [
  { key: "MASK", label: "体面" },
  { key: "SAFE", label: "安全感" },
  { key: "SOCIAL", label: "社交温度" },
  { key: "AVOID", label: "回避倾向" },
  { key: "DRAMA", label: "戏剧感" },
  { key: "DO", label: "执行力" },
];

const TITLE_MAP = {
  "MASK+SAFE": "体面生存架构师",
  "MASK+AVOID": "战术性失踪总监",
  "MASK+DRAMA": "精致崩溃艺术家",
  "SAFE+DO": "稳健推进工程师",
  "SAFE+AVOID": "风险规避型观察员",
  "SAFE+SOCIAL": "礼貌联盟协调员",
  "SOCIAL+DRAMA": "夜间气氛组组长",
  "SOCIAL+DO": "行动派社交发动机",
  "SOCIAL+AVOID": "间歇性热闹选手",
  "DRAMA+AVOID": "浪漫废墟建筑师",
  "DRAMA+DO": "理想主义执行官",
  "AVOID+DO": "最后一刻逆袭者"
};

const SUB_TITLES = [
  { when: s => s.MASK >= 10, text: "人设维护大师" },
  { when: s => s.SAFE >= 10, text: "稳字当头派" },
  { when: s => s.SOCIAL >= 10, text: "人类Wi-Fi浣熊版" },
  { when: s => s.AVOID >= 10, text: "明日再议委员会" },
  { when: s => s.DRAMA >= 10, text: "情绪电影导演" },
  { when: s => s.DO >= 10, text: "先做再说执行者" },
  { when: s => s.DO <= 2 && s.AVOID >= 8, text: "计划表收藏家" },
  { when: s => s.SOCIAL <= 2 && s.MASK >= 8, text: "礼貌潜水艇" }
];

const CURATED_AI_REPORTS = {
  "MASK+SAFE:spiky": {
    label: "体面生存架构师·硬壳版",
    deep_dive: [
      `你像那种会先确认监控死角、再决定从哪个垃圾桶下爪的浣熊。你对体面的执念已经不是审美，而是一套完整的生存系统：情绪可以有，破绽最好没有；想要可以很强，但吃相必须克制。别人以为你天生稳，其实你只是太早学会了，城市夜里最贵的东西不是浪漫，是补救成本。你最厉害的地方，是总能把狼狈压成一条很平的褶；你最累的地方，也是在这儿，因为你连崩溃都想挑一个光线好的地方。`
    ]
  },
  "MASK+SAFE:steady": {
    label: "体面生存架构师·缓流版",
    deep_dive: [
      `你不是那种张牙舞爪的浣熊，你更像会在路灯下先把胡须捋顺，再安静判断哪条巷子值得走的那种熊。你有一种很温和但很顽固的自尊：事情可以慢一点，出手可以少一点，但不能乱，不能丢脸，不能把自己弄得太难收拾。所以你常常让别的浣熊觉得“这只浣熊挺有分寸”，只有你自己知道，这分寸感里藏着多少预演和彩排。你其实并不冷，你只是习惯先把安全感搭好，再允许真实自己出来透气。`
    ]
  },
  "MASK+AVOID:spiky": {
    label: "战术性失踪总监·隐身版",
    deep_dive: [
      `你最擅长的技能，不是表达，而是撤退，而且撤退得还挺体面。别的浣熊消失是因为慌，你消失是因为你已经在脑内完成了五轮社交后果评估，觉得“算了，今晚不值得”。你会认真经营别人眼里的自己，却把真正的疲惫、麻烦和狼狈藏在最深的下水道拐角。好笑的是，你并不是不在乎关系，你是太在乎关系里那个可能出糗的自己，所以宁可先下线，再让别人猜你是不是很酷。你不是神秘，你是过度维护现场秩序的小浣熊。`
    ]
  },
  "MASK+AVOID:steady": {
    label: "战术性失踪总监·月光版",
    deep_dive: [
      `你有一种很柔软的退场方式：不是突然翻脸，也不是彻底失联，而是轻轻把自己从现场挪开，像一只叼着半块饼干慢慢退回树影里的浣熊。你想被喜欢，也想被理解，但更想避免那些需要当场拆开自己的时刻。于是你总把“以后再说”包装得很自然，把“我有点招架不住”藏成一句礼貌的玩笑。你温和、聪明、有审美，就是太会给别人留台阶，以至于自己常常没有正面表达的机会。`
    ]
  },
  "MASK+DRAMA:spiky": {
    label: "精致崩溃艺术家·首映版",
    deep_dive: [
      `你这只浣熊活得像一场布光考究的夜戏，连情绪都有镜头调度。你不是不清醒，相反，你太清醒了，所以你特别知道什么样的脆弱会显得高级，什么样的失控会显得难看。你会一边心里翻江倒海，一边表面把尾巴抖得像刚上过造型课。你的魅力在于你能把普通的难过讲得像城市传说，但风险也很明显：有时候你不是在感受生活，而是在给生活做后期。你其实很想被看见，只是希望别人看到的是完整版导演剪辑，不是拍摄现场那点手忙脚乱。`
    ]
  },
  "MASK+DRAMA:steady": {
    label: "精致崩溃艺术家·留白版",
    deep_dive: [
      `你身上那股“有事，但我先保持好看”的气质非常明显。你会在情绪上来时先整理句子，再整理表情，最后才决定要不要把真实心情放出来，像一只在雨后认真舔毛的浣熊，哪怕心里已经积了一地小水坑。你其实很有叙事感，知道什么值得珍藏、什么适合沉默，只是有时候太会把痛感包上漂亮包装，连自己都差点忘了它还是痛。你不是矫情，你只是很会把混乱修成一张能发出去的照片。`
    ]
  },
  "SAFE+DO:spiky": {
    label: "稳健推进工程师·施工版",
    deep_dive: [
      `你像那种已经给今晚觅食路线画好流程图的浣熊，垃圾桶在哪个点翻、保安几点巡、撤退路径怎么走，全在脑子里排过。你不靠气氛活着，你靠执行；但你又不是那种莽冲型选手，你每一步都带着“先活下来再说”的职业素养。你总让熊群觉得很可靠，甚至有点像浣熊版项目经理，能把混乱夜晚硬生生整理出一个可交付版本。缺点也很直接：你容易把日子过成一份长期待办清单，休息都得像完成任务一样才放心。`
    ]
  },
  "SAFE+DO:steady": {
    label: "稳健推进工程师·值夜版",
    deep_dive: [
      `你不是最吵的那只浣熊，但常常是最后真把事办成的那只。你身上有一种很踏实的夜行气质：不抢戏，不乱扑，不把“我有计划”挂在嘴边，但关键时刻总能稳稳地往前推。你不是没有幻想，只是比起热血宣言，你更相信先把今天这顿饭找着、把眼前这件事落地。你的靠谱让人安心，只是偶尔也会让你自己忘记，原来你也可以不那么懂事，不那么总是负责。`
    ]
  },
  "SAFE+AVOID:spiky": {
    label: "风险规避型观察员·雷达版",
    deep_dive: [
      `你像一只自带雷达的浣熊，别人还在闻薯条味，你已经先闻到风险了。你很少鲁莽犯错，因为你脑子里总有一个安静但不肯下班的值班员，不停提醒你：这个人靠谱吗，这条路稳吗，这件事会不会很麻烦。你的谨慎救过你很多次，但也让你错过过一些本来能尝一口的生活。你不是胆小，你只是太懂“收拾残局”有多耗电。问题是，世界不是每次都需要你先备案，有些夜晚只需要你先伸出爪子，试一口再说。`
    ]
  },
  "SAFE+AVOID:steady": {
    label: "风险规避型观察员·望风版",
    deep_dive: [
      `你是那种会先蹲在树杈上看完整个现场，再决定要不要下去的浣熊。你不爱无意义的冒险，也不相信“冲就完了”这套热血口号。你更像一个温和的观察者，习惯在行动之前给自己留余地、给局面留出口。你身上的审慎感不是扫兴，而是一种成熟的夜间礼貌。只是有时候你把“先看看”用得太熟了，熟到机会从面前慢慢经过，你还在研究它会不会翻车。`
    ]
  },
  "SAFE+SOCIAL:spiky": {
    label: "礼貌联盟协调员·街区版",
    deep_dive: [
      `你像街区里最会打圆场的那只浣熊，谁吵起来你都能接住，谁慌了你都能递个台阶。你不是单纯爱热闹，你是擅长在热闹里维持秩序：既不让局面失控，也不让气氛死掉。你身上那种“大家先别急”的能量特别珍贵，像便利店后门永远亮着的一盏小灯。可这类浣熊也有老毛病，太习惯照顾现场，就容易忘了自己也是现场的一部分。你很会让别人舒服，却不一定记得及时问一句：那我自己现在舒不舒服？`
    ]
  },
  "SAFE+SOCIAL:steady": {
    label: "礼貌联盟协调员·后勤版",
    deep_dive: [
      `你不是那种高调控场的浣熊，你更像一只默默把局面维持住的后勤型选手。你知道什么时候该给台阶，什么时候该换个轻一点的话题，什么时候该把过度尴尬的空气悄悄拨散。你有温度，也有边界，这种组合非常难得。你不是天生热情外放，而是懂得关系要想走得远，靠的不是一时上头，是持续稳定地给人安全感。只是你偶尔会太懂事，懂事到把自己的需求藏得像压箱底的坚果。`
    ]
  },
  "SOCIAL+DRAMA:spiky": {
    label: "夜间气氛组组长·炸场版",
    deep_dive: [
      `你这只浣熊天生适合在夜里发光，走到哪儿都像自带一点情节和背景音乐。你不是单纯爱社交，你是爱那种“熊与熊之间忽然活起来”的瞬间：一句话让全场笑，一次接梗让关系升温，一场夜聊硬是被你聊出群像戏。你会让熊觉得你很会玩、很会懂、很会共振，但你也容易被场子的情绪拖着跑，像一位一边给大家点火、一边偷偷消耗自己电量的主持浣熊。你热闹是真的，疲惫也是真的。`
    ]
  },
  "SOCIAL+DRAMA:steady": {
    label: "夜间气氛组组长·柔光版",
    deep_dive: [
      `你不是最炸的那种热闹选手，但你特别会把场子养热。你像一只坐在路灯下讲八卦也能讲出氛围感的浣熊，别人跟你待久了，会不自觉把戒备放下来。你有一种很稀缺的能力：既能感受气氛，又能给气氛加一点好看的滤镜。你会让平常的夜晚变得值得记住，像垃圾桶旁边突然出现的一块完整披萨。只是你也容易把别人的反应当成自己的晴雨表，外面一降温，你心里也跟着起雾。`
    ]
  },
  "SOCIAL+DO:spiky": {
    label: "行动派社交发动机·点火版",
    deep_dive: [
      `你是那种会一边招呼大家集合、一边已经把计划推进两格的浣熊。你不只会说，你真的会动；不只会热情，你还能把热情变成结果。所以你给人的感觉很像城市夜行动员令本身，谁在你旁边都容易被带着往前走。你的优点是高启动、高连接、高推进，缺点也一目了然：你有时快到来不及确认自己是不是也愿意。你很像那种嘴里叼着薯条还在帮全场张罗路线的浣熊，能量十足，也容易把自己忙成移动充电宝。`
    ]
  },
  "SOCIAL+DO:steady": {
    label: "行动派社交发动机·暖机版",
    deep_dive: [
      `你不是高声喧哗型的社交王者，但你很会把局和关系往前带。你像一只特别会串场的浣熊，看起来轻松，实际一直在默默推进：提醒、确认、接话、拉队友、把一团乱线理成能走的方向。你的可靠感很强，因为你不是嘴上热情，是手脚也跟得上。只是你偶尔会把“我来吧”说得太顺，顺到别的浣熊以为你不需要被照顾。其实你也会累，只是你的累通常穿着工作服，不太容易被看出来。`
    ]
  },
  "SOCIAL+AVOID:spiky": {
    label: "间歇性热闹选手·闪现版",
    deep_dive: [
      `你是那种能在局里突然发光，也能在下一秒原地蒸发的浣熊。热闹对你不是负担，但它必须刚刚好，太无聊你嫌闷，太黏你想跑。你很会在人群里留下存在感，像夜里一下跳上栏杆的那道影子，大家都看见了，但没人真能抓住你多久。你其实并不矛盾，你只是需要比别人更灵活的距离感：想连接，但不想被套牢；想被懂，但不想被追问到底。你不是忽冷忽热，你是电量管理非常有主见。`
    ]
  },
  "SOCIAL+AVOID:steady": {
    label: "间歇性热闹选手·省电版",
    deep_dive: [
      `你很可爱的一点是，你明明也需要同伴，但也很需要退路。你像一只会在朋友堆里认真笑、认真接话、认真贡献气氛，然后回家之后把手机倒扣三小时的浣熊。你并不是不喜欢亲近，你只是对持续在线这件事有天然疲惫感。别的浣熊有时候会觉得你难猜，其实你很好懂：你想要的是轻盈的关系，不是紧逼的管理。你愿意热闹，但前提是热闹别变成考勤。`
    ]
  },
  "DRAMA+AVOID:spiky": {
    label: "浪漫废墟建筑师·午夜版",
    deep_dive: [
      `你很会把生活过成一部夜里两点半才上头的电影，问题是你常常只负责前半段氛围，不太负责后半段推进。你像一只坐在屋顶边缘看月亮、顺手把心事酿得更浓的浣熊，对情绪和细节都很敏感，敏感到有时候现实还没怎样，你心里已经剪完了一版悲喜交加的预告片。你的魅力在于深、在于会感受，但你的麻烦也在这儿：你太容易在脑内把可能性养成迷宫，最后连自己都懒得走出来。`
    ]
  },
  "DRAMA+AVOID:steady": {
    label: "浪漫废墟建筑师·薄雾版",
    deep_dive: [
      `你不是剧烈外放的那种戏剧型浣熊，你更像一团慢慢扩散的夜雾，安静、细腻、带着一点说不清的伤感。你有很强的内在感受力，哪怕只是便利店后门吹来一阵风，你都能从里面听出一点命运感。你会给生活自动加旁白，也会给关系自动加留白。好处是你非常有灵魂，坏处是你有时会把“我还没准备好面对现实”包装成一种很诗意的停滞。说白了，你不是没想法，你只是太会在想法里久住。`
    ]
  },
  "DRAMA+DO:spiky": {
    label: "理想主义执行官·起飞版",
    deep_dive: [
      `你最厉害的地方，是你不光会做梦，你还真敢把梦叼起来往前跑。你像一只在深夜公园里边奔边规划未来版图的浣熊，既有情绪张力，也有行动爆发力。别人把愿望说成口号，你会直接开始试；别人感动完就散场，你能把感动变成第二天真的去做的事。这样的你很有感染力，也很容易把自己燃过头。你一旦相信某件事值得，就会冲得像刚喝完三罐功能饮料的浣熊，帅是真的，累也是真的。`
    ]
  },
  "DRAMA+DO:steady": {
    label: "理想主义执行官·热身版",
    deep_dive: [
      `你身上有一种很珍贵的组合：既有理想的火，又有落地的脚。你不是天天喊热血口号的熊，但你一旦被某件事打动，就会认真地往前推，像一只边整理尾巴边计划明晚行动的浣熊。你很少完全躺平，因为你对生活仍然抱着期待；你也很少纯靠蛮劲，因为你知道情绪要是没有去处，最后只会烧到自己。你的问题不是不行，而是容易太想把每一次出手都做成“有意义的版本”。`
    ]
  },
  "AVOID+DO:spiky": {
    label: "最后一刻逆袭者·冲线版",
    deep_dive: [
      `你这只浣熊的经典戏码是：白天像没上线，晚上突然完成奇迹。你不是不会做，你只是很擅长把启动键藏到最后一秒，然后在别人以为你要摆烂的时候猛地窜出去。说得好听点，这叫临场爆发；说得直白点，这就是把焦虑当燃料。你对压力有种危险的熟悉感，仿佛非得看到垃圾车已经拐进巷口，身体才肯全面开机。好笑的是，你每次逆袭后都说“下次一定早点”，然后下次照样熟练地拖到钟点工都想下班。`
    ]
  },
  "AVOID+DO:steady": {
    label: "最后一刻逆袭者·回魂版",
    deep_dive: [
      `你不是纯拖延型浣熊，你更像那种需要很长很长的预热，表面看着在发呆，内部其实一直在慢慢聚拢电量。一旦真到临界点，你又能迅速进入状态，把别人以为来不及的事做出个像样的结果。你身上有一种被低估的行动力，只是它不爱按人类上班表出现。你的可爱之处在于总能回魂，你的麻烦之处也在于总得等自己回魂。你不是没本事，你只是总把本事安排在最后登场。`
    ]
  }
};
const CHART_MAX_SCORES = calculateChartMaxScores();

/* =========================
 * 3) 状态 & DOM
 * ========================= */
const state = { index: 0, answers: new Array(QUESTIONS.length).fill(null) };

const qs = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
  startBtn: document.getElementById("start-btn"),
  prevBtn: document.getElementById("prev-btn"),
  nextBtn: document.getElementById("next-btn"),
  copyBtn: document.getElementById("copy-btn"),
  restartBtn: document.getElementById("restart-btn"),
  progressCurrent: document.getElementById("progress-current"),
  progressTotal: document.getElementById("progress-total"),
  progressFill: document.getElementById("progress-fill"),
  scenePill: document.getElementById("scene-pill"),
  qTitle: document.getElementById("question-title"),
  qText: document.getElementById("question-text"),
  options: document.getElementById("options"),
  endpointInput: document.getElementById("endpoint-input") || null,
  saveEndpointBtn: document.getElementById("save-endpoint-btn") || null,
  modelInput: document.getElementById("model-input") || null,
  aiGenerateBtn: document.getElementById("ai-generate-btn") || null,
  aiStatus: document.getElementById("ai-status") || null,
  aiReport: document.getElementById("ai-report") || null,
  radarChart: document.getElementById("radar-chart") || null,
  resultArchetype: document.getElementById("result-archetype") || null,
  resultSubtitles: document.getElementById("result-subtitles") || null
};

function getSavedEndpoint() {
  return localStorage.getItem("ai_proxy_endpoint") || "/api/report";
}
function setStatus(text) {
  if (qs.aiStatus) qs.aiStatus.textContent = text;
}

function formatModelStatus(prefix, model) {
  return model ? `${prefix} 当前模型：${model}` : prefix;
}

function setButtonBusy(button, disabled) {
  if (button) button.disabled = disabled;
}

function setAvatarImage(img, title) {
  if (!img) return;

  img.onerror = () => {
    img.onerror = null;
    img.src = "./raccoon.jpg";
  };
  img.src = `/api/avatar?title=${encodeURIComponent(title)}`;
}

function show(screen) {
  [qs.start, qs.quiz, qs.result].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

/* =========================
 * 4) 问题渲染
 * ========================= */
function renderQuestion() {
  const idx = state.index;
  const [scene, text, options] = QUESTIONS[idx];

  qs.progressCurrent.textContent = idx + 1;
  qs.progressTotal.textContent = QUESTIONS.length;
  qs.progressFill.style.width = `${((idx + 1) / QUESTIONS.length) * 100}%`;

  qs.scenePill.textContent = scene;
  qs.qTitle.textContent = `第 ${idx + 1} 题`;
  qs.qText.textContent = text;
  qs.options.innerHTML = "";

  options.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    if (state.answers[idx] === i) btn.classList.add("active");
    btn.textContent = `${String.fromCharCode(65 + i)}. ${op[0]}`;
    btn.onclick = () => {
      state.answers[idx] = i;
      renderQuestion();
    };
    qs.options.appendChild(btn);
  });

  qs.prevBtn.disabled = idx === 0;
  qs.nextBtn.disabled = state.answers[idx] === null;
  qs.nextBtn.textContent = idx === QUESTIONS.length - 1 ? "查看结果" : "下一题";
}

/* =========================
 * 5) 评分与本地报告
 * ========================= */
function computeScores() {
  const scores = Object.fromEntries(DIMS.map(d => [d, 0]));
  state.answers.forEach((answer, i) => {
    const effect = QUESTIONS[i][2][answer][1];
    Object.entries(effect).forEach(([k, v]) => (scores[k] += v));
  });
  return scores;
}

function sortedDimsFromScores(scores) {
  return [...DIMS].sort((a, b) => scores[b] - scores[a]);
}

function pairKeyFromScores(scores) {
  const sorted = sortedDimsFromScores(scores);
  return `${sorted[0]}+${sorted[1]}`;
}

function curatedVariantFromScores(scores) {
  const sorted = sortedDimsFromScores(scores);
  return scores[sorted[0]] - scores[sorted[1]] >= 3 ? "spiky" : "steady";
}

function curatedPairFromScores(scores) {
  const sorted = sortedDimsFromScores(scores);
  const candidates = [
    `${sorted[0]}+${sorted[1]}`,
    `${sorted[0]}+${sorted[2]}`,
    `${sorted[1]}+${sorted[2]}`,
    `${sorted[0]}+${sorted[3]}`,
  ];

  for (const candidate of candidates) {
    if (CURATED_AI_REPORTS[`${candidate}:spiky`] || CURATED_AI_REPORTS[`${candidate}:steady`]) {
      return candidate;
    }
  }

  return "SAFE+DO";
}

function titleFromScores(scores) {
  const pair = pairKeyFromScores(scores);
  return TITLE_MAP[pair] || "城市夜行观察员";
}

function subtitlesFromScores(scores) {
  return SUB_TITLES.filter(r => r.when(scores)).map(r => r.text).slice(0, 2);
}

function generateReport(scores) {
  const title = titleFromScores(scores);
  const subs = subtitlesFromScores(scores);
  const verdict = "你不是没想法，你只是把“想法”先寄存在明天。";

  const talents = [];
  if (scores.SAFE >= 8) talents.push("你有风险雷达，遇事不会第一时间把自己送走。");
  if (scores.DO >= 8) talents.push("你具备推进能力，不会把所有愿望都留在收藏夹。");
  if (scores.SOCIAL >= 8) talents.push("你在关系场里有温度，关键时刻能把场子接住。");
  if (scores.MASK >= 8) talents.push("你有表达分寸感，知道什么时候该体面收尾。");
  if (scores.DRAMA >= 8) talents.push("你对生活有叙事能力，能把普通日子过出镜头感。");
  if (talents.length < 2) {
    talents.push("你最大的天赋是自我观察，知道自己在逃什么、盼什么。");
    talents.push("你并不迟钝，你只是选择了更省电的生存节奏。");
  }

  const traps = [];
  if (scores.AVOID >= 8) traps.push("你容易把‘再想想’当止痛药，短期舒适，长期焦虑。建议：把任务切成5分钟动作，先启动再评价。");
  if (scores.MASK >= 8 && scores.SOCIAL <= 3) traps.push("你过于维护体面，导致真实需求常常缺席。建议：每周至少一次直接表达‘我其实需要…’。");
  if (scores.DRAMA >= 8 && scores.DO <= 4) traps.push("你擅长脑内大制作，但执行预算常常不足。建议：每个灵感只允许保留一个最小版本。");
  if (scores.SAFE >= 9 && scores.DRAMA <= 3) traps.push("你太稳了，稳到错过新机会。建议：每周给自己一次可控冒险。");
  if (traps.length < 2) {
    traps.push("你最大的惯性是‘知道很多，开始很晚’。建议：先做最笨的一步。");
    traps.push("你会在关键处犹豫。建议：把‘正确决定’改成‘可迭代决定’。");
  }

  const manual = [
    "和你相处，最好直说重点，别让你猜。",
    scores.SOCIAL >= 7 ? "你在热闹里能量更高，但也需要被认真听见。" : "你不是冷淡，只是需要慢一点建立信任。",
    "当你开始玩笑变多，通常说明你在掩饰一点点不安。"
  ];

  const quest = scores.DO >= 7
    ? "今晚把一个拖了很久的小事做完，然后允许自己痛快休息。"
    : "今晚只做一件5分钟小事：回一条消息、整理一个角落、发一个确认。做完就算赢。";

  const recap = "从下水道醒来到天亮前收尾，你一路在‘体面、效率、情绪和安全感’之间做权衡。你不是没有勇气，而是太懂代价，所以总在冲动和克制之间拉扯。";

  return {
    title,
    subtitles: subs,
    verdict,
    recap,
    talents: talents.slice(0, 3),
    traps: traps.slice(0, 2),
    manual,
    quest
  };
}

/* =========================
 * 6) AI 生成
 * ========================= */
function createAiPrompt(scores, baseReport) {
  const sorted = sortedDimsFromScores(scores);
  return [
    "你是一个毒舌但善良的中文人格解读写手，风格是70%认真洞察+20%幽默+10%温柔。",
    "禁止人身攻击、精神疾病诊断、绝对化标签。",
    "请基于以下数据生成更像长文截图风格的报告，带一点讽刺但不刻薄。",
    `主称号：${baseReport.title}`,
    `基础判词：${baseReport.verdict}`,
    `六维分数：${JSON.stringify(scores)}`,
    `最高维度：${sorted[0]}、${sorted[1]}`,
    "请输出 JSON：",
    "{\"verdict\":\"\",\"story_recap\":\"\",\"talents\":[\"\",\"\"],\"traps\":[\"\",\"\"],\"relationship_manual\":[\"\",\"\"],\"tonight_quest\":\"\"}"
  ].join("\n");
}

function getCuratedAiReport(scores) {
  const pair = curatedPairFromScores(scores);
  const variant = curatedVariantFromScores(scores);
  return (
    CURATED_AI_REPORTS[`${pair}:${variant}`] ||
    CURATED_AI_REPORTS[`${pair}:steady`] ||
    CURATED_AI_REPORTS["SAFE+DO:steady"]
  );
}

function renderCuratedAiReport(entry) {
  if (qs.aiReport) {
    qs.aiReport.innerHTML = "";
    entry.deep_dive.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      qs.aiReport.appendChild(p);
    });
  }

  setStatus(entry.label);
}

function renderIdentityPanel(report) {
  if (qs.resultArchetype) qs.resultArchetype.textContent = report.title;

  if (qs.resultSubtitles) {
    qs.resultSubtitles.innerHTML = "";
    report.subtitles.forEach((subtitle) => {
      const span = document.createElement("span");
      span.className = "identity-chip";
      span.textContent = subtitle;
      qs.resultSubtitles.appendChild(span);
    });
  }
}

function calculateChartMaxScores() {
  const maxScores = Object.fromEntries(DIMS.map((dim) => [dim, 1]));

  QUESTIONS.forEach(([, , options]) => {
    DIMS.forEach((dim) => {
      const bestContribution = Math.max(
        0,
        ...options.map(([, effect]) => Number(effect[dim] || 0))
      );
      maxScores[dim] += bestContribution;
    });
  });

  return maxScores;
}

function renderRadarChart(scores) {
  if (!qs.radarChart) return;

  const size = 420;
  const center = size / 2;
  const radius = 120;
  const levels = 5;
  const startAngle = -Math.PI / 2;
  const minDisplayScale = 0.18;

  const pointFor = (index, scale) => {
    const angle = startAngle + (Math.PI * 2 * index) / DIM_META.length;
    return {
      x: center + Math.cos(angle) * radius * scale,
      y: center + Math.sin(angle) * radius * scale,
      angle,
    };
  };

  const gridPolygons = Array.from({ length: levels }, (_, idx) => {
    const scale = (idx + 1) / levels;
    const points = DIM_META.map((_, pointIndex) => {
      const point = pointFor(pointIndex, scale);
      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${points}" class="radar-grid radar-grid-${idx + 1}"></polygon>`;
  }).join("");

  const spokes = DIM_META.map((_, index) => {
    const point = pointFor(index, 1);
    return `<line x1="${center}" y1="${center}" x2="${point.x.toFixed(1)}" y2="${point.y.toFixed(1)}" class="radar-spoke"></line>`;
  }).join("");

  const dataPoints = DIM_META.map((meta, index) => {
    const value = Math.max(0, Number(scores[meta.key] || 0));
    const max = Math.max(1, CHART_MAX_SCORES[meta.key] || 1);
    const rawScale = Math.min(1, value / max);
    const displayScale =
      rawScale <= 0 ? 0 : minDisplayScale + rawScale * (1 - minDisplayScale);
    const point = pointFor(index, displayScale);
    return {
      ...point,
      meta,
      value,
      percent: Math.round(rawScale * 100),
    };
  });

  const dataPolygon = dataPoints
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");

  const dots = dataPoints
    .map(
      (point) =>
        `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="5.5" class="radar-dot"></circle>`
    )
    .join("");

  const labels = DIM_META.map((meta, index) => {
    const point = pointFor(index, 1.24);
    const anchor =
      Math.cos(point.angle) > 0.2 ? "start" : Math.cos(point.angle) < -0.2 ? "end" : "middle";
    return `<text x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}" text-anchor="${anchor}" class="radar-label">${meta.label}</text>`;
  }).join("");

  const rings = Array.from({ length: levels }, (_, idx) => {
    const scale = (idx + 1) / levels;
    const labelValue = Math.round(scale * 100);
    const y = center - radius * scale + 12;
    return `<text x="${center}" y="${y.toFixed(1)}" text-anchor="middle" class="radar-ring-label">${labelValue}%</text>`;
  }).join("");

  const stats = dataPoints
    .map(
      (point) => `
        <div class="radar-stat">
          <span class="radar-stat-label">${point.meta.label}</span>
          <strong>${point.percent}%</strong>
        </div>
      `
    )
    .join("");

  qs.radarChart.innerHTML = `
    <div class="radar-shell">
      <svg viewBox="0 0 ${size} ${size}" class="radar-svg" aria-label="浣熊六维图谱">
        ${gridPolygons}
        ${spokes}
        <polygon points="${dataPolygon}" class="radar-area"></polygon>
        <polyline points="${dataPolygon}" class="radar-outline"></polyline>
        ${dots}
        ${labels}
        ${rings}
      </svg>
      <div class="radar-stats">${stats}</div>
    </div>
  `;
}

async function generateAIReport(scores, baseReport) {
  const endpoint = getSavedEndpoint();
  const model = qs.modelInput.value.trim();
  if (!model) throw new Error("请填写模型名称。");

  const prompt = createAiPrompt(scores, baseReport);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt })
  });

  if (!response.ok) {
    const t = await response.text();
   throw new Error(`AI 请求失败：${response.status} ${t}`);
  }

  const data = await response.json();
  const cleaned = (data?.content || "").replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("AI 返回格式不是 JSON，请重试或更换免费模型。");
  }
}

function applyAIToUI(ai) {
  const normalized = normalizeAIReport(ai);

  if (normalized.verdict) document.getElementById("result-verdict").textContent = normalized.verdict;
  if (normalized.story_recap) document.getElementById("result-recap").textContent = normalized.story_recap;

  if (Array.isArray(normalized.talents) && normalized.talents.length) {
    const talentsEl = document.getElementById("result-talents");
    talentsEl.innerHTML = "";
    normalized.talents.slice(0, 3).forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      talentsEl.appendChild(li);
    });
  }

  if (Array.isArray(normalized.traps) && normalized.traps.length) {
    const trapsEl = document.getElementById("result-traps");
    trapsEl.innerHTML = "";
    normalized.traps.slice(0, 2).forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      trapsEl.appendChild(li);
    });
  }

  if (Array.isArray(normalized.relationship_manual) && normalized.relationship_manual.length) {
    const manualEl = document.getElementById("result-manual");
    manualEl.innerHTML = "";
    normalized.relationship_manual.slice(0, 3).forEach(m => {
      const li = document.createElement("li");
      li.textContent = m;
      manualEl.appendChild(li);
    });
  }

  if (normalized.tonight_quest) document.getElementById("result-quest").textContent = normalized.tonight_quest;
}

/* =========================
 * 7) 结果渲染（关键改动都在这里）
 * ========================= */
function renderResult() {
  const scores = computeScores();
  const report = generateReport(scores);

  setAvatarImage(document.getElementById("raccoon-avatar"), report.title);

  // 你要的醒目标题：固定“夜行观察员”
  document.getElementById("result-title").textContent = "夜行观察员";
  renderIdentityPanel(report);
  document.getElementById("result-verdict").textContent = report.verdict;
  renderRadarChart(scores);
  document.getElementById("result-recap").textContent = report.recap;

  const talentsEl = document.getElementById("result-talents");
  talentsEl.innerHTML = "";
  report.talents.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    talentsEl.appendChild(li);
  });

  const trapsEl = document.getElementById("result-traps");
  trapsEl.innerHTML = "";
  report.traps.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    trapsEl.appendChild(li);
  });

  const manualEl = document.getElementById("result-manual");
  manualEl.innerHTML = "";
  report.manual.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    manualEl.appendChild(li);
  });

  document.getElementById("result-quest").textContent = report.quest;
  renderCuratedAiReport(getCuratedAiReport(scores));

  qs.copyBtn.onclick = async () => {
    const text = [
      `【浣熊今天怎么活】`,
      `夜行观察员`,
      document.getElementById("result-verdict").textContent,
      `- 剧情回放：${document.getElementById("result-recap").textContent}`,
      `- 今晚任务：${document.getElementById("result-quest").textContent}`
    ].join("\n");
    await navigator.clipboard.writeText(text);
    qs.copyBtn.textContent = "已复制 ✅";
    setTimeout(() => (qs.copyBtn.textContent = "复制结果文案"), 1200);
  };
}

/* =========================
 * 8) 事件绑定
 * ========================= */
qs.startBtn.onclick = () => {
  state.index = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  show(qs.quiz);
  renderQuestion();
};

qs.prevBtn.onclick = () => {
  if (state.index > 0) {
    state.index -= 1;
    renderQuestion();
  }
};

qs.nextBtn.onclick = () => {
  if (state.answers[state.index] === null) return;
  if (state.index < QUESTIONS.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    show(qs.result);
    renderResult();
  }
};

qs.restartBtn.onclick = () => show(qs.start);

if (qs.saveEndpointBtn && qs.endpointInput) {
  qs.saveEndpointBtn.onclick = () => {
    const endpoint = qs.endpointInput.value.trim();
    if (!endpoint) return setStatus("请先输入 API 地址。");
    localStorage.setItem("ai_proxy_endpoint", endpoint);
    setStatus("API 地址已保存。");
  };
}
// 覆盖旧的 generateAIReport：固定 endpoint，模型交给后端默认值或环境变量决定
generateAIReport = async function (scores, baseReport) {
  const endpoint = "/api/report";
  const prompt = createAiPrompt(scores, baseReport);
  const timeoutMs = getAiRequestTimeoutMs();

  let response;
  try {
    response = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    }, timeoutMs);
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`AI 请求超时（${Math.ceil(timeoutMs / 1000)} 秒），请稍后重试`);
    }
    throw error;
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload?.message ||
      payload?.detail ||
      payload?.error ||
      `AI 请求失败：${response.status}`;
    throw new Error(message);
  }

  try {
    const data = await response.json();
    const parsedContent = parseAIJsonResponse(data?.content || "");
    const normalizedContent = normalizeAIReport(parsedContent);
    if (!hasVisibleAIContent(normalizedContent)) {
      throw new Error("AI 返回内容为空");
    }
    return {
      content: normalizedContent,
      model: data?.model || ""
    };
  } catch {
    throw new Error("AI 返回格式不是 JSON");
  }
};
if (qs.endpointInput) qs.endpointInput.value = getSavedEndpoint();

function parseAIJsonResponse(text) {
  const cleaned = String(text).replace(/```json|```/gi, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const objectText = extractFirstJsonObject(cleaned);
    if (!objectText) throw new Error("missing json object");
    return JSON.parse(objectText);
  }
}

function fetchWithTimeout(url, options, timeoutMs) {
  if (typeof AbortController !== "function") {
    return fetch(url, options);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timer);
  });
}

function getAiRequestTimeoutMs() {
  const raw = Number(globalThis.__AI_REQUEST_TIMEOUT_MS__);
  return Number.isFinite(raw) && raw > 0 ? raw : 45000;
}

function extractFirstJsonObject(text) {
  let start = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (start === -1) {
      if (char === "{") {
        start = i;
        depth = 1;
      }
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  return "";
}

function normalizeAIReport(payload) {
  const root = findBestReportObject(payload);

  const verdict = firstString(
    root.verdict,
    root.summary,
    root.overview,
    root.analysis,
    root.description,
    root.result,
    root.title
  );

  const storyRecap = firstString(
    root.story_recap,
    root.storyRecap,
    root.recap,
    root.story,
    root.narrative,
    root.details
  );

  const talents = normalizeList(
    root.talents,
    root.strengths,
    root.highlights,
    root.advantages,
    root.good_points
  );

  const traps = normalizeList(
    root.traps,
    root.weaknesses,
    root.risks,
    root.pitfalls,
    root.bad_points
  );

  const relationshipManual = normalizeList(
    root.relationship_manual,
    root.relationshipManual,
    root.relationship_advice,
    root.relationshipAdvice,
    root.advice,
    root.suggestions
  );

  const tonightQuest = firstString(
    root.tonight_quest,
    root.tonightQuest,
    root.quest,
    root.action,
    root.next_step,
    root.nextStep
  );

  return {
    verdict,
    story_recap: storyRecap,
    talents,
    traps,
    relationship_manual: relationshipManual,
    tonight_quest: tonightQuest,
  };
}

function hasVisibleAIContent(report) {
  return Boolean(
    report?.verdict ||
    report?.story_recap ||
    report?.tonight_quest ||
    (Array.isArray(report?.talents) && report.talents.length) ||
    (Array.isArray(report?.traps) && report.traps.length) ||
    (Array.isArray(report?.relationship_manual) && report.relationship_manual.length)
  );
}

function findBestReportObject(payload) {
  const queue = [payload];
  const seen = new Set();
  let best = {};
  let bestScore = -1;

  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== "object" || seen.has(current)) continue;
    seen.add(current);

    const score = scoreReportObject(current);
    if (score > bestScore) {
      best = current;
      bestScore = score;
    }

    for (const value of Object.values(current)) {
      if (value && typeof value === "object") queue.push(value);
    }
  }

  return best;
}

function scoreReportObject(obj) {
  let score = 0;
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (/verdict|summary|analysis|story|recap|quest|talent|strength|trap|risk|advice/i.test(key)) {
      score += 2;
    }
    const value = obj[key];
    if (typeof value === "string" && value.trim()) score += 1;
    if (Array.isArray(value) && value.length) score += 1;
  }
  return score;
}

function firstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function normalizeList(...values) {
  for (const value of values) {
    if (Array.isArray(value)) {
      const items = value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean);
      if (items.length) return items;
    }

    if (typeof value === "string" && value.trim()) {
      const items = value
        .split(/\n|[;；]|(?<=\S)[,，](?=\S)/)
        .map((item) => item.replace(/^[-*•]\s*/, "").trim())
        .filter(Boolean);
      if (items.length) return items;
    }
  }

  return [];
}
