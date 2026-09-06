# 自成其形 交互读本

围绕《自成其形_阅读修订稿》的价值根基组织的阅读网页。

第二版将园林、河流与树林图像融合在页面背景、章节开篇和阅读过渡中。

第三版依据《五部作品_阅读记录汇编》增加“阅读互照”，以 14 处具体情境连接价值根基与各章。场景、体系关联、未解张力与开放问题构成一组阅读；可展开 56 段汇编札记核对上下文。五部作品并列呈现，不当作体系的证明链条。《哈姆雷特》仅采用后续回看，不补写原始札记缺口；《红楼梦》止于前八十回。

- 哲学底座：两个承认、两道墙与生命邀请，五个编辑层面的交互导读。
- 阅读互照：五部作品、14 处情境；从哲学底座、体系地图和九章原文双向进入，逐处保留札记来源。
- 体系地图：六扇同时在场的门，关联解释与常见误读。
- 原文阅读：全部九个单元，40 个主题段、138 个概念解释与情境，章内定位、六组专门图解、字号调整与纯原文切换。
- 四问练习：自由书写，不评分；切换视图保留当前书写，刷新或关闭会清空。

`app/chapter-study.json` 保存章内精读分节与概念解释；每组用原稿段落编号回接，全部原文按顺序完整覆盖。

原稿保存在 `app/content.json`，逐段保留文字。`app/editorial.json` 和 `app/foundations.json` 是明确标注的编辑归纳。原文段落编号可追溯导读引用。

`app/literature-data.json` 保存新增编辑归纳与汇编原段。`quote` 均为阅读札记的连续节选，并非一律属于文学原著直接引文；`excerpts` 保留所引札记原段，编号来自汇编中非空正文段落的顺序，表格另行读取而不计入该编号。材料的阶段性对照不回写现有体系正文。

直接进入一处阅读可使用 `#literature-kara--kara-leaves-and-tears` 等片段地址。每部作品选择与每处情境都反映在地址中。

## 本地预览

使用 Node.js 24 与 pnpm 11。

```sh
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1
```

```sh
pnpm check
pnpm build
```

静态页面输出为 `dist/client`。Windows 下的 `scripts/build-exit.mjs` 在构建成功后等待一秒再退出，避开 vinext 强制退出时的原生句柄关闭冲突；失败退出码保持原样。依赖构建脚本许可保存在 `pnpm-workspace.yaml`。

## GitHub Pages 部署

网站部署在 https://d14196831-stack.github.io/zichengqixing/ 。main 分支保存源代码，gh-pages 分支保存已构建的静态网页。

当前使用 GitHub Pages 的分支发布方式：Settings → Pages → Deploy from a branch → gh-pages / (root)。不需要访客登录。

更新网站时，用实际仓库路径构建，将 `dist/client` 内的文件提交到 `gh-pages`，GitHub 会自动发布该分支。

```sh
GITHUB_PAGES=true GITHUB_REPOSITORY=d14196831-stack/zichengqixing pnpm build
```

也保留了可选的自动构建模板 `deploy/github-pages.yml`。若以后需要从 main 自动构建，将该文件放到 `.github/workflows/pages.yml`，并把 Pages 发布源切换到 GitHub Actions；当前分支发布方式无需执行这一步。

所有图片、脚本和样式均由本网站提供，字体使用设备本机字体。站点不依赖 ChatGPT 登录、远程字体、第三方图床或业务服务。仓库子路径由 `next.config.ts` 和 `scripts/prepare-pages.mjs` 处理。

## 图像与设计

见 `docs/design.md`。园林、河流与树林图像为内置 image_gen 生成，页面已标注来源性质，并未声称是某座真实园林的记录照片。

## 验证范围

验证了 TypeScript 编译、静态生产构建、原稿文字完整性、导读引用定位、页面资源引用与项目子路径构建。未执行浏览器交互或截图测试。WebMCP（网页模型上下文协议）提供一个可选的阅读导航接口；不支持该协议的浏览器照常使用网页。当前环境没有可用的协议验证上下文，未验证该可选接口的运行注册。
