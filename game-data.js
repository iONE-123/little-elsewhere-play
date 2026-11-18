/* Narrative objects are based on the supplied recollections. Quiet months use labelled symbolic scenes. */
const lifeScenes = [
  { place: "雨停之前的房间", theme: "rain", mood: ["计划摇晃", "仍在寻找出口"], quest: "把散落的计划一张张收好。", badge: "风里保存力气", objects: [
    { icon: "ticket", name: "反复刷新的机票", title: "远方忽然变贵了", text: "十一月十三日之后，机票价格上涨。原本指向福冈的计划，开始在“再看看”与“取消”之间往返。先把这份不确定从屏幕上拿下来。", action: "折好这张机票", souvenir: "折过的机票" },
    { icon: "book", name: "两份行程", title: "同一场风，两种决定", text: "王孜取消了福冈计划。秋露已经买下演唱会门票，继续等待航班消息。两个人可以做不同的决定，也仍然理解对方的难处。", action: "为两种决定各留一页", souvenir: "两页行程" },
    { icon: "lamp", name: "窗边的小灯", title: "这个月，确实很难", text: "香港的行程也不太顺利。倒霉的十一月不必被改写成励志故事。这里的小灯是一枚意象：先让这一页有一个可以歇脚的地方。", action: "点亮窗边的灯", souvenir: "一盏微光" }
  ] },
  { place: "十二月的留白室", theme: "winter", mood: ["慢慢安静", "日常回温"], quest: "这一月没有大事件。为平静保留三个位置。", symbolic: true, badge: "留白也被收藏", objects: [
    { icon: "calendar", name: "空白日历", title: "不必每天都有情节", text: "在你的回忆里，十二月渐渐归于平淡。这张日历不补写具体日期，只为没有被命名的日子留出空间。", action: "留下一格空白", souvenir: "留白日历" },
    { icon: "cup", name: "一杯热气", title: "让生活慢下来", text: "把日常想成一杯温热的水：没有盛大的转折，却可以慢慢喝完。它是这一章的意象，并非某次真实聚会的记录。", action: "在这里坐一会儿", souvenir: "十二月的暖意" },
    { icon: "letter", name: "未写满的纸", title: "给自己一点余地", text: "不是所有空白都等待被填满。有些只需要被允许存在。把十一月的余波放在纸边，让这一月继续呼吸。", action: "收好这张留白", souvenir: "一页余地" }
  ] },
  { place: "通往福冈的候机室", theme: "travel", mood: ["忐忑", "终于抵达"], quest: "从云南的晴光走到终于成行的登机口。", badge: "带着害怕也出发", objects: [
    { icon: "flower", name: "云南明信片", title: "新年先换了一种颜色", text: "云南的照片、美食和新染的头发，让一月有了鲜亮的开场。挑一枚颜色，作为这张明信片的边框。", kind: "palette", action: "收好云南的颜色", souvenir: "云南的晴光" },
    { icon: "ticket", name: "航班信息", title: "取消键旁边，还有登机口", text: "赴福冈之前，查票与担心取消反复出现。最后，秋露仍在一月底成功出发。把登机牌翻到“抵达”的那一面。", action: "翻到抵达的一面", souvenir: "福冈登机牌" },
    { icon: "music", name: "舞台的光", title: "当时还不懂的名字", text: "SMTOWN的舞台上有后来变得熟悉的名字。王孜当时还没走进追星的世界，这束光先被留在一月，等后来的自己读懂。", action: "把光留给二月", souvenir: "舞台光片" }
  ] },
  { place: "一首歌打开的房间", theme: "music", mood: ["后知后觉", "心动有了名字"], quest: "连起视频、答案与一支熟悉起来的MV。", badge: "读懂从前的伏笔", objects: [
    { icon: "phone", name: "越洋视频", title: "屏幕那端的大创", text: "一个多小时的视频通话，把挑伴手礼变成共同参与的小事。日本回来后，秋露还第一次见到了蜜袋鼯芝麻球。", action: "接住这段越洋日常", souvenir: "一段视频光影" },
    { icon: "book", name: "答案之书", title: "它曾经这样回答", text: "在喜欢的酒吧，你们问：2026年末到2027年初，能去日本吗？翻开的那一页写着“开心的结果”。先将它作为书签带走。", action: "夹好这枚答案书签", souvenir: "开心的结果 · 书签" },
    { icon: "music", name: "KTV点歌台", title: "二月二十三日的转折", text: "《Love 119》与《Hug》的MV，让那些名字走进王孜自己的生活。回看去年九月首尔的照片，才发现MEGA杯套上已经有RIIZE。", kind: "choice", options: ["先看此刻的MV", "回看九月的杯套"], responses: ["此刻的喜欢，正在长出自己的根。", "照片没有变，读照片的人已经不同。"], souvenir: "后知后觉的杯套" }
  ] },
  { place: "远方开始的站台", theme: "station", mood: ["计划飞快", "期待上车"], quest: "一班高铁开走后，把新的路线拼起来。", badge: "远方有了名字", objects: [
    { icon: "clock", name: "站台时钟", title: "车先开走了", text: "回西安的路上，秋露看见五月首尔粉丝见面会的消息。分析行程太投入，竟然误了高铁。这个有点狼狈的开场，后来成了旅行的注脚。", action: "保存这次误车", souvenir: "站台时刻" },
    { icon: "ticket", name: "见面会门票", title: "忽然可以认真期待", text: "三月初那几天，计划很快定下来。看航班、买见面会票，四月底的相见和五月的见面会一起改变三月的心情。", action: "把门票放进旅行夹", souvenir: "五月的入场券" },
    { icon: "map", name: "双城路线", title: "把远方排成一条路", text: "四月二十九日在首尔相见，三十日再一起去釜山。按这个顺序选择两座城市，拼出你们四月末的路线。", kind: "route", action: "收好双城路线", souvenir: "首尔 → 釜山路线" }
  ] },
  { place: "春天的准备工坊", theme: "garden", mood: ["幸福预热", "倒数越来越近"], quest: "收好清迈的颜色、应援物料与会合前的光。", badge: "幸福提前抵达", objects: [
    { icon: "flower", name: "清迈的颜色", title: "春天先在另一座城展开", text: "四月，秋露去了清迈。那段开心的旅程与即将到来的韩国之行，让整个四月都带着期待。", kind: "palette", action: "保存春天的颜色", souvenir: "清迈色卡" },
    { icon: "letter", name: "应援物料", title: "期待有了可以握住的形状", text: "秋露准备了应援物料。选择一条纸带，将这份期待封好。等到真正到场，屏幕里的日期就会成为身边的声音。", kind: "palette", action: "封好物料袋", souvenir: "应援物料袋" },
    { icon: "map", name: "先到的首尔", title: "城市替会合保管着光", text: "四月二十九日，王孜先到首尔，等秋露随后抵达。两个人从各自的出发地走来，终于在四月末会合。", action: "在地图上留下会合点", souvenir: "会合坐标" }
  ] },
  { place: "五月的回声", theme: "sea", mood: ["旅程余温", "新的念头"], quest: "收好五月三十一日的聊天。", badge: "旅程仍会被想起", objects: [
    { icon: "calendar", name: "翻过的日历", title: "旅程发生在四月末", text: "四月二十九日，首尔；四月三十日，釜山。五月从这两天之后开始。", action: "收好这页日历", souvenir: "04.29 / 04.30" },
    { icon: "map", name: "日本的小城市", title: "还想去的地方", text: "五月三十一日，她在聊天里说：‘日本很多小城市挺有意思的。’", action: "收好这句心愿", souvenir: "05.31 · 小城市" },
    { icon: "cup", name: "明朗热狗", title: "那一口又被想起", text: "五月三十一日，她说：‘我现在有点儿想明朗热狗了。’", action: "收好这句想念", souvenir: "05.31 · 明朗热狗" }
  ] },
  { place: "余温继续播放的小屋", theme: "music", mood: ["等待回归", "下次先吃热狗"], quest: "调好回忆的频率，收好六月五日的下次菜单。", badge: "余温继续播放", objects: [
    { icon: "music", name: "回忆收音机", title: "一首歌接住下一天", text: "六月，你们期待RIIZE的回归。把这台意象收音机调到119，接回二月那首歌留下的线。这里只调频，不播放歌曲。", kind: "tune", action: "收藏这个频率", souvenir: "119回忆频率" },
    { icon: "cup", name: "六月五日的菜单", title: "下一次，从第一口热狗开始", text: "四月底的韩国旅行过去了，六月五日的聊天又排起下一次要吃的东西。秋露说“每次都要去”“下次还先吃个热狗”，接着说“然后再去吃脊骨”“我要吃章鱼”“我要吃铁板鸡”。熟悉的味道，又变成一次新的期待。", action: "收好这张菜单", souvenir: "下次先吃热狗" },
    { icon: "letter", name: "六月留白", title: "后奏不必比主旋律响亮", text: "一边期待新的回归，一边聊着下一顿饭。六月也有平常的日子，留一张纸给尚未写下的部分。", action: "保留这一页", souvenir: "六月后奏" }
  ] },
  { place: "有风经过的日常", theme: "garden", mood: ["各自生活", "相处从容"], quest: "在没有大事件的月份，练习给生活留出空间。", symbolic: true, badge: "自在的默契", objects: [
    { icon: "phone", name: "安静的消息框", title: "允许各自忙碌", text: "这是为你们相处方式设计的意象场景：关心不需要每时每刻出现，回复也不承担证明友情的任务。", kind: "choice", options: ["忙完再说也可以", "留一句轻轻的问候"], responses: ["给彼此的生活留出呼吸。", "问候停在门边，不催人开门。"], souvenir: "从容的消息" },
    { icon: "flower", name: "窗边小花", title: "各自生长", text: "七月的具体事件还有留白。这朵小花只代表一种心意：真心为朋友自己的成长高兴，无须把每一段路都写成共同经历。", action: "给小花一点光", souvenir: "生长的位置" },
    { icon: "lamp", name: "留着的灯", title: "舒服的关系，有合适的距离", text: "你说，你们尊重彼此的节奏和选择，也愿意支持对方。把这份默契安放在一盏灯里：看得见，也不刺眼。", action: "调成柔和的亮度", souvenir: "不刺眼的灯" }
  ] },
  { place: "向西展开的地图", theme: "travel", mood: ["独立远行", "世界辽阔"], quest: "为秋露独自拓开的世界留下三枚地图标记。", badge: "自己的辽阔", objects: [
    { icon: "map", name: "法国地图页", title: "新的地名，有了温度", text: "八月，秋露独自旅行到欧洲，法国是其中一站。地图上原本只是一个名字的地方，开始有了自己的见闻。给这一站留下一枚标记。", action: "盖上法国标记", souvenir: "法国地图章" },
    { icon: "flower", name: "意大利地图页", title: "脚步由自己决定", text: "意大利也在这段旅程里。你很为她骄傲：自己出发、判断与看世界，是属于她的经验。", action: "盖上意大利标记", souvenir: "意大利地图章" },
    { icon: "mountain", name: "瑞士地图页", title: "地图可以继续展开", text: "还有瑞士，以及更多走过的地方。分享一段旅程，并不会改变它属于谁；朋友可以在远处真心为这份勇气高兴。", action: "盖上瑞士标记", souvenir: "瑞士地图章" }
  ] },
  { place: "九月的分岔书桌", theme: "night", mood: ["重新选择", "一口没吃成的热狗"], quest: "收好各自的计划，也收好九月五日想起的小事。", badge: "方向由自己命名", objects: [
    { icon: "book", name: "王孜的计划本", title: "从考研转向留学", text: "方向的改变带来了大量准备，也带来了痛苦与不确定。把“下一步”从庞大的未来中单独拿出来，让它小到今天能够开始。", kind: "choice", options: ["先整理需要做的事", "先容许自己不确定"], responses: ["清单先从一小步写起。", "不确定也可以是思考的一部分。"], souvenir: "留学计划页" },
    { icon: "letter", name: "秋露的方向纸", title: "辨认自己的实习方向", text: "秋露也在思考实习与规划。把想法变成可以选择的方向，需要时间。这里保存那段认真思考：还没有完全定下来的时候，也已经在往前走。", action: "为她自己的决定留位置", souvenir: "实习方向纸" },
    { icon: "cup", name: "没吃成的热狗", title: "九月五日，还记得那一次", text: "聊天里，她数起鸡爪、街边的鱼饼年糕血肠，还有明朗热狗。她说“咱俩上次说走之前再吃一次”，接着说“也没有吃”。四月那趟旅行中没完成的一件小事，在九月仍然可以被笑着想起。", kind: "choice", options: ["收好这件小遗憾", "把它留在下次的菜单上"], responses: ["没吃成的，也成了共同记忆的一部分。", "下一次还没有定下来；想吃什么，已经说得很清楚。"], souvenir: "未吃成的明朗热狗" }
  ] },
  { place: "答案慢慢亮起的房间", theme: "birthday", mood: ["渐入正轨", "未来仍在展开"], quest: "收好回音，把最后一枚书签交还给答案之书。", badge: "又走过了一年", objects: [
    { icon: "letter", name: "实习的回音", title: "等待终于有了回应", text: "秋露拿到了实习offer，生活逐渐沿着她的规划向前。事情并非一下完美，却开始一件件找到位置。", action: "把这封回音收好", souvenir: "实习的回音" },
    { icon: "calendar", name: "十一月的日历", title: "又回到十一月", text: "这一页留给十一月十九日。生日是新一岁的起点，也可以是翻看旧岁的一刻。先给这一天夹上一枚小小的花签。", action: "标记十一月十九日", souvenir: "11·19花签" },
    { icon: "book", name: "那枚旧书签", title: "现在，试着再读一次", text: "二月带走的那句“开心的结果”，走过了三个季节。它的意思可以继续变化。收好最后一件物件，就可以翻开书，看看这一年的回声。", action: "把书签放回答案之书", souvenir: "回到原处的答案" }
  ] }
];
