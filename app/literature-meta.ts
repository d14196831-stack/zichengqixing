export const literaryWorks = [
 {id:'kara',number:'I',title:'卡拉马佐夫兄弟',short:'卡拉马佐夫',author:'陀思妥耶夫斯基',theme:'爱生命，也拒绝替苦难销账',word:'珍重',image:'forest.webp',position:'center',scope:'五轮阅读记录',note:'从嫩叶、眼泪与彼此接住的时刻，辨认生命为何值得；保留信仰、自由与苦难之间尚未消解的张力。'},
 {id:'war',number:'II',title:'战争与和平',short:'战争与和平',author:'托尔斯泰',theme:'在庞大的现实里，具体地活',word:'生活',image:'river.webp',position:'center',scope:'十七轮阅读记录',note:'从宏大叙事回到实际承受、照料和行动的人。看见条件的分量，也看见条件之中仍然可能的回应。'},
 {id:'red',number:'III',title:'红楼梦',short:'红楼梦',author:'曹雪芹',theme:'盛筵会散，人仍不可替代',word:'此人',image:'garden.webp',position:'center 60%',scope:'前八十回 · 十轮阅读记录',note:'在诗、欢聚与园林之外，也看见衣食、委屈和说不出的拒绝。美让人可感，不能替照料与公正交账。'},
 {id:'poem',number:'IV',title:'定风波',short:'定风波',author:'苏轼 · 莫听穿林打叶声',theme:'风雨还在，人不必只剩风雨',word:'微冷',image:'forest.webp',position:'center 70%',scope:'小序、全词与思想札记',note:'从声音读到步调，从“谁怕”读到“微冷”。生活仍可展开，而身体、差异和责任不必因此被抹去。'},
 {id:'hamlet',number:'V',title:'哈姆雷特',short:'哈姆雷特',author:'莎士比亚 · 英文全文补读',theme:'看见痛苦，也看见身边的人',word:'辨认',image:'hamlet-stage.webp',position:'center 60%',scope:'五幕二十场 · 六扇门互照 · 八则完读札记',note:'从哀悼与求证，读到复仇、记忆和讲述。以完整补记展开每一场，也保留人物的矛盾，以及理解尚未抵达的地方。'},
];

export const chapterWords = ['序','真','情','苦','手','人','时','园中','结语'];

export const rootReadingLinks: Record<string,{work:string;episode:string;theme:string}> = {
 reality:{work:'hamlet',episode:'hamlet-truth',theme:'求证的人，也可能在未辨认时出手'},
 subject:{work:'red',episode:'red-unrepeatable',theme:'一个人的遭遇，不能被别人的道理替代'},
 ethics:{work:'kara',episode:'kara-leaves-and-tears',theme:'珍爱生命，仍可拒绝苦难的交易'},
 life:{work:'poem',episode:'poem-cold-and-light',theme:'还会觉得冷，仍能继续生活'},
 becoming:{work:'war',episode:'war-freedom-conditions',theme:'行动有条件，生活也有回应'},
};

export const chapterReadingCases = [
 ['kara-leaves-and-tears','red-water-and-memory','poem-cold-and-light'],
 ['hamlet-truth','war-freedom-conditions','red-unrepeatable'],
 ['kara-leaves-and-tears','hamlet-feeling','war-sky-life','red-poetry-table'],
 ['hamlet-suffering','kara-leaves-and-tears','red-water-and-memory','poem-pace'],
 ['hamlet-action','war-tushin-care','kara-one-onion','poem-umbrella'],
 ['hamlet-person','red-unrepeatable','kara-one-onion','poem-umbrella'],
 ['hamlet-time','war-freedom-conditions','poem-cold-and-light','kara-meal-after-funeral'],
 ['red-poetry-table','kara-meal-after-funeral','poem-umbrella'],
 ['hamlet-person','war-tushin-care','poem-umbrella'],
];
