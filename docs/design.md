# 设计依据

视觉从文本的两个承认出发：世界有其所是，人有其自身。两道墙与生命邀请并列呈现，明确区别边界与被保护的生活。五个哲学层面是阅读导读，不是给作者补写的理论分类。

园林图像中的自然树形对应成形，墙与开放圆门对应边界和关系，石凳对应可停留而不必产出的生活。图像只是意象，不被用于证明哲学命题。

墨绿、朱红、石灰白构成有限的色彩体系；宋体与细线提供阅读层次，朱红指向可进入的内容。六门用环表示同时在场和回写，不设置关卡、评分与成长排名。

原文、导读、练习提示分别标明性质。读者可随时返回引文所在段落。

图像使用内置 image_gen 生成一次，尺寸 1536 × 1024。项目资产：`public/garden.png`。

## 图像生成提示词

Use case: photorealistic-natural
Asset type: single landscape editorial photograph for a Chinese philosophy reading website hero, 3:2 aspect ratio, 1536x1024 pixels.
Primary request: an inviting quiet Chinese literati garden that suggests architectural structure exists to protect concrete life, while leaving room for a tree to take its own shape. Empty yet alive, restrained and accessible.
Scene/backdrop: a pale white lime-plaster garden wall with an open circular moon gate. Through the gate is a naturally growing tree with an irregular, unpruned silhouette, deep green moss and a simple stone path. A single plain stone bench provides the possibility of sitting and lingering.
Style/medium: premium realistic architectural and nature editorial photography, true material textures, natural perspective and subtle depth, not illustration.
Composition/framing: horizontal wide composition. Show the round opening, the tree, some mossy foreground and stone path clearly; keep the essential scene around the center so it works as a right-half website hero crop as well as a shallow full-width crop. Human eye-height camera. Calm layered space that can be entered.
Lighting/mood: soft oblique natural daylight, quiet, contemplative, warm enough to feel inhabitable, clear contrast without harsh drama.
Color palette: deep ink green, lime white, natural stone and wood, neutral restrained tones.
Materials/textures: nuanced aged limewash, textured grey stone, soft dense moss, credible leaves and bark.
Constraints: one image only. No people, no text, no lettering, no watermarks, no logos, no UI, no cards, no fantasy, no stylized chinoiserie, no painting.


## 第二版图文融合与精读设计

园林进入首页背景，与文字在同一个空间内相接；河流出现在体系环的背景和真、苦、手、时的篇章开端；树林承接共生与结语。图像不是事实证据，统一标为生成意象。三幅图以 WebP（网页图像格式）发布，不裁改原始内容，通过页面布局按需取景。

九章细分为 40 个编辑主题段，含 138 个概念解释与具体情境。分节遵循原文顺序，无遗漏、无重复。重点处用四账对照、时间层次、锋刃与底盘、沉积与回写、关系边界、幸福条件次序六组图解，回应文本的细微区分。纯原文开关可以收起全部学习辅助。

图像路径：`public/garden.webp`、`public/river.webp`、`public/forest.webp`。新增两图均使用内置 imagegen 各生成一次。

## 新增图像提示词

Generation mode: built-in image_gen

ASSET 1: river-formation.png

Use case: photorealistic-natural
Asset type: wide editorial photography banner for a refined Chinese philosophy reading website, landscape 3:2.
Primary request: a real shallow river at intimate middle distance, clear water flowing around several irregular dark stones, a visible bending course and a naturally formed bed with fine gravel and quiet layers of sediment. The visual expresses time and repeated action gradually shaping a riverbed, with the possibility of changing course, entirely through believable natural photography.
Style/medium: high-end natural editorial photography, understated and tactile, matching the aesthetic of a quiet Chinese courtyard photographed in natural daylight. Real stone, real water, botanical irregularity, authentic rather than idealized.
Composition/framing: horizontal 3:2 framing, near bank and streambed foreground, dark stones at middle distance, low banks and foliage in the background. Gentle diagonal flow. Include a broad quieter area of water toward the left-center that can harmonize with webpage text, but do not render any text. Keep the stream the focus, with no distant dramatic mountain view.
Lighting/mood: soft lateral daylight, subtle reflections and small authentic ripples, calm and contemplative, not glowing.
Color palette: restrained low-saturation deep greens, warm limestone gray, dark wet stone, neutral water tones.
Materials/textures: natural mineral variation, gritty sediment, fine pebbles visible under transparent shallow water, uneven moss and worn edges, plausible water movement.
Constraints: no people, no artificial landscape structures, no typography, no watermark, no logos, no arrows or diagrams, no fantasy, no luminous paths, no CGI sheen, no long-exposure mist, no tourism-poster grandeur. Single finished photograph.

ASSET 2: forest-coexistence.png

Use case: photorealistic-natural
Asset type: wide editorial photography banner for a refined Chinese philosophy reading website, landscape 3:2.
Primary request: an intimate natural woodland with several distinct tree trunks and branches, each having its own irregular direction, space and form; the canopy leaves visible openings for light and air. A small quiet glade and richly textured mossy ground feel enterable. The image expresses individual forms coexisting to become a forest, entirely through believable natural photography.
Style/medium: high-end natural editorial photography, restrained and tactile, matching a quiet Chinese courtyard photographed in natural daylight. Real bark and stone, authentic nature, no aesthetic overstatement.
Composition/framing: horizontal 3:2, layered near, middle and far depth. A darker, quieter left third with bark and foliage suitable for webpage text integration, distinct irregular trees across the center and right, patches of daylight and visible air between crowns. Natural variation in tree size, lean, branching and spacing; no aligned plantation. A modest moss-covered clearing provides a sense of space to enter.
Lighting/mood: softly filtered daylight, subtle patches of real sun, quiet and grounded, no visible shafts of theatrical light.
Color palette: restrained low-saturation ink green, muted leaf green, neutral limestone and earthy gray-brown; no vivid emerald or orange grading.
Materials/textures: nuanced bark, damp moss, soft leaf litter, rough roots and small natural stones.
Constraints: no people, no man-made objects, no text, no watermark, no logos, no arrows or diagrams, no uniformly straight identical trees, no fantasy forest, no epic wilderness panorama, no tourism poster, no CGI sheen. Single finished photograph.
# 阅读互照增补

第三版从用户提供的《五部作品_阅读记录汇编》中选择 14 处具体情境。视觉沿用园林、河床与树林，将图像作为正文情境的环境，与深绿底色及渐变融合。它们是生成意象，不冒充文学中的确切地点、人物或情节插图。

阅读结构为：情境概述、照见体系、留住张力、札记节选、开放问题、原段上下文。阅读者可以从五个哲学层面或任何一章进入，再通过章节链接返回体系；同一处情境可与多章关联，避免作品与概念一对一归类。

原稿正文不变。汇编札记与网站归纳分别标识；不把文学当作哲学证明，不把宗教语境悄悄改写成心理技巧。《哈姆雷特》保存原始札记缺口的提示，两个入口均为《卡拉马佐夫兄弟》中的后续回看。原图重复使用，不增加无关的装饰图像。
