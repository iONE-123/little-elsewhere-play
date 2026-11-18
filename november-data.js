/* The November prose was confirmed by Wang Zi; photos were supplied for this chapter. */
const novemberPhotos = [
  { src: './assets/november/hong-kong-dim-sum.jpg', alt: '秋露在香港吃的点心，木盒里的虾饺', caption: '香港 · 一笼点心' },
  { src: './assets/november/hong-kong-dessert.jpg', alt: '秋露在香港吃的甜品与小食', caption: '香港 · 甜味也留在了这个月' },
  { src: './assets/november/disneyland.jpg', alt: '秋露在香港迪士尼拍下的城堡', caption: '香港迪士尼 · 终于走进照片里的地方' },
  { src: './assets/november/flight-search.jpg', alt: '反复查看的来年1月27日上海至大阪航班与票价截图', caption: '反复查看的机票 · 来年1月27日，上海 → 大阪', tall: true }
];
const novemberNarratives = [
  {
    name: '月度叙述', subtitle: '2025.11 · 经过的日子', paragraphs: [
      '十一月开始时，未来是可以一件件数出来的。秋露递交了日本签证，计划着来年一月的云南旅行，也期待已经安排好的演出与旅程。那些日子之所以明亮，并非因为一切都有了保证，而是人已经开始想象自己会怎样抵达。',
      '11 月 13 日以后，外部环境的变化让原本清楚的行程摇晃起来。机票涨价，航班是否取消、能否退改，都没有一个痛快的答案。电话卡的事又添上一层烦扰。聊天里，秋露一遍遍查看航班和价格，有时希望它照常飞，有时又盼它尽早取消，好让自己重新安排。不确定最磨人的地方，是它让人连失望都不能一次失望完。',
      '月底，她还是去了香港。路上险些误机，后来错过高铁，终于抵达西九龙；她看了 MAMA，也去了迪士尼。快乐和劳累都是真的。同一时期，香港大火带来的沉重也是真实的。它不应被写成旅程的背景：这座城市里，人们正在经历各自的生活与失去。',
      '回望这个月，很难只用“倒霉”概括。十一月曾让人满怀期待，也让人反复担心；有些计划改变了，有些路还是走到了。两种天气，都属于她真实经过的十一月。'
    ]
  },
  {
    name: '王孜视角', subtitle: '王孜 · 留在消息这一端', paragraphs: [
      '月初，我也相信那些计划会慢慢成形。后来，消息一条接一条地变，机票价格跟着变，我取消了自己的日本行程。秋露仍要面对她已经买好的票、想看的演出，以及那个迟迟不给准话的航班。我们各自做决定，也都明白对方为什么舍不得、为什么犹豫。',
      '她把查到的新情况发给我，我们讨论退票，讨论还能不能去。许多话并不能改变一张机票的去向，却让等待不必总是一个人闷着。电话卡的麻烦也是这样：事情落在她身上，我能做的很有限，但她说起时，我会听见。',
      '后来她发来一句“艰难到达香港西九龙”，我回了笑声。现在想来，那笑并不是觉得一路轻松。我们只是太熟悉用这样的语气说起不顺了。月底，她终于看到了想看的演出，也在迪士尼走得筋疲力尽。我没有和她走同一条路，却能从这些零零碎碎的消息里，知道她仍在认真过自己的生活。',
      '十一月没有替我们安排好结局。我们也不必替彼此选同一条路。只是当一个人的计划又起了变化，另一个人仍在消息的另一端，愿意把它听完。'
    ]
  }
];
Object.assign(chapters[0], {
  short: '两种天气', title: '十一月的两种天气', prose: novemberNarratives[0].paragraphs,
  quote: '两种天气，都属于她真实经过的十一月。',
  choices: [
    { label: '记得月初的期待', response: '那些后来变得艰难的路，最初也曾让人满心欢喜。' },
    { label: '记得她终于抵达', response: '一路的变数与月底的快乐，都留在这一页。' }
  ],
  weather: '期待 / 风向改变 / 抵达', coordinate: '十一月 → 香港', photo: '香港的食物、迪士尼与反复查看的机票'
});
Object.assign(lifeScenes[0], {
  place: '十一月的两种天气', mood: ['期待仍在', '带着变数抵达'],
  quest: '翻过三处场景，收好十一月的七件回忆。'
});
// Preserve the original first three object slots so existing collections remain valid.
Object.assign(lifeScenes[0].objects[0], {
  title: '屏幕里的远方', text: '来年1月27日，上海 → 大阪。十一月里反复查看的，是还没有到来的日子。票价、航班与退改消息不断变化，每一次点开，都在等一个能让计划落定的答案。', photos: [3]
});
Object.assign(lifeScenes[0].objects[1], {
  title: '未来曾经一件件排好', text: '月初，秋露已经递交日本签证，也规划好了来年一月的云南旅行。后来王孜取消了自己的日本计划，秋露继续等待。两份行程各有去向，最初的期待也被保留。'
});
Object.assign(lifeScenes[0].objects[2], {
  optional: true,
  text: '这盏小灯仍留在回忆桌上。它是十一月的一枚意象：事情还没有全部解决时，给自己留一个可以歇脚的位置。'
});
lifeScenes[0].objects.push(
  { icon: 'sim', name: '电话卡', title: '一张卡，也让人悬着心', text: '航班迟迟没有定数，电话卡的麻烦又占去许多心力。11月19日，她说等电话卡处理好，这件事就能结束。那些看起来很小的事情，落在当时的生活里，也有自己的重量。', action: '收好这一页日常', souvenir: '十一月的电话卡' },
  { icon: 'cup', name: '香港的两顿甜与暖', title: '落在餐桌上的香港', text: '木盒里的点心，桌上的甜品与小食。香港的记忆也有这样具体的模样：坐下来，吃一点喜欢的东西。把这两张照片并排收好。', photos: [0,1], action: '收藏香港的味道', souvenir: '香港的甜与暖' },
  { icon: 'castle', name: '迪士尼的城堡', title: '终于站在城堡前', text: '看完演出，又在迪士尼走了一天。月底她说起旅途的疲惫，这张照片却替那一天留住了蓝天和城堡。高兴与劳累，一起属于这趟旅行。', photos: [2], action: '把这一日夹进相册', souvenir: '迪士尼的一页晴天' },
  { icon: 'award', name: 'MAMA 颁奖礼', title: '想看的舞台，终于在眼前', text: '十一月的香港行程里，有她期待的 MAMA 颁奖礼。此前在聊天中想到即将到来的演出，心情就能好一点。后来，期待终于有了到场的那一天。', kind: 'stage', action: '收藏这束舞台光', souvenir: 'MAMA · 香港舞台光' }
);
const novemberPhases = [
  { label: '月初 · 期待', title: '未来是可以一件件数出来的。', note: '日本签证已经递交，云南被写进来年一月。', objects: [1], theme: 'plans' },
  { label: '月中 · 变数', title: '远方，悬在一次次刷新之间。', note: '机票、电话卡，还有暂时歇脚的一盏灯。', objects: [0,3,2], theme: 'waiting' },
  { label: '月底 · 香港', title: '后来，她还是抵达了。', note: '食物、城堡与舞台，把香港留在这一页。', objects: [4,5,6], theme: 'arrival' }
];
buildRail();
