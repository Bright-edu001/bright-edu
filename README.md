# Bright Edu - ?箸?撟喳

Bright Edu ?臭??隞????銝??脣像?堆???擃?鞈芰?隤脩??批捆嚗??拙飛蝧???璆剛??

## AI Workflow Pointer

Bright-Edu AI workflow uses Notion current records as the source of truth.

- Notion current records are the workflow source of truth.
- Repo docs are bootstrap / execution references only.
- Use `.github/copilot-instructions.md` for repo-local execution guidance.
- Use `docs/ai-collab/` only as transitional repo-local reference or historical context when explicitly needed.
- Use Hermes as QA / research / write-back backup when needed.

This README remains a product / platform overview, not the workflow policy document.

## ?? 蝬脣?鞈?

- **皜祈岫?啣?蝬脣?**: [https://super-caramel-093673.netlify.app/](https://super-caramel-093673.netlify.app/)
- **甇???啣?蝬脣?**: [https://bright-edu-data.web.app/](https://bright-edu-data.web.app/)

## ????寡

- 憭??玨蝔摰?
- 撠平雓葦??
- ?暑?飛蝧撘?
- 摮貊??脣漲餈質馱
- 摮貊?蝷曄黎鈭?

## ?? ?銵瑽?

- **?垢?詨?**: React 19, React Router 6
- **???敹怠?**: `@tanstack/react-query` (React Query)
- **撱箇蔭撌亙**: Vite 5 (璆菟??澆???璅∠??望??
- **UI 憟辣**: Ant Design 5, styled-components, SCSS
- **撖?摮楊頛臬**: BlockNote 0.47 (敺??唳??舐楊頛臬)
- **敺垢??**: Firebase (Firestore, Authentication, Storage, Functions, Hosting)
- **????*: Sentry (?航炊餈質馱), Firebase App Check (reCAPTCHA v3)
- **皜祈岫獢**: Vitest (?桀?皜祈岫) & Playwright (E2E 蝡臬蝡舀葫閰?

## ?? 蝟餌絞?瘙?

- Node.js 20 ?誑銝???(撱箄降 LTS)
- npm 9 ?誑銝???

## ?? 撠?蝯?

```
.
?? .github/workflows/     # CI/CD ?芸??蝵脰身摰?(GitHub Actions)
?? e2e/                   # Playwright End-to-End 皜祈岫獢?
?? public/                # ??鞈? (???WA manifest)
?? src/
?? ?? admin/              # 敺蝞∠?璅∠?
?? ?? components/         # ?舫??函??梁?辣
?? ?? pages/              # 撠????Ｘ芋蝯?
?? ?? context/            # ?典????Context
?? ?? hooks/              # ?芾? React Hooks
?? ?? services/           # Firebase ??????API
?? ?? config/             # ?垢??Firebase ?啣??蔭
?? ?? utils/              # 撖衣撌亙?賢?
?? vite.config.js         # Vite 撱箇蔭???潔撩??蔭
?? vitest.config.js       # Vitest 皜祈岫獢?蔭
?? playwright.config.js   # ?汗??E2E 皜祈岫?蔭
```

## ?? 敹恍?憪?

### 1. ??撠?銝血?鋆?鞈?

```bash
git clone <repo-url>
cd bright-edu
npm install --legacy-peer-deps
```

### 2. ?啣?霈閮剖?

銴ˊ?啣?霈蝭?瑼?撱箇?雿??祆??閮剖?嚗?

```bash
cp .env.example .env.local
```

### 3. ???隡箸???(Vite)

```bash
npm run start
```

?身??`http://localhost:3000` ????嚗?靘扔??HMR (Hot Module Replacement) ?梢?頛?

---

## ? ?砍蝡?Firebase 璅⊥?冽葫閰?(Offline 璅∪?)

憒?銝敶梢?脩垢甇??鞈?嚗隞亙??脩垢鞈?銝??璈?銝血?冽?唳芋?砍???

1. **?臬?脩垢鞈?銝虫?頛?* (?閬?gcloud ?啣?????:

```bash
gcloud firestore export gs://bright-edu-data.firebasestorage.app/firestore_export --project=bright-edu-data
gsutil -m cp -r gs://bright-edu-data.firebasestorage.app/firestore_export ./firebase_data/
```

2. **???祆? Firebase 璅⊥??*:

```bash
firebase emulators:start --import=./firebase_data/firestore_export
```

3. **??`.env` ????隞乩蝙?冽璈??澈**:

```env
VITE_USE_FIREBASE_EMULATOR=true
```

---

## ?? ?舐?單 Scripts

| ?誘                  | 隤芣?                              |
| --------------------- | --------------------------------- |
| `npm run start`       | ?? Vite ?祆??隡箸???         |
| `npm run build`       | 撱箇? Production ???`build/`   |
| `npm run build:prod`  | 撱箇? Production 銝???Source Map |
| `npm run preview`     | ?汗??敺? Production `build/`  |
| `npm run test`        | ?瑁? Vitest ?桀?皜祈岫              |
| `npx playwright test` | ?瑁? E2E 蝬脤?蝡臬蝡舀葫閰?          |
| `npm run analyze`     | ??敺???bundle JS 憭批?         |
| `npm run deploy`      | ???? GitHub Pages ?函蔡???? |

---

## ?? ?啣?霈?” (Vite 閬?)

| 霈 (?誑 `VITE_` ?)     | 隤芣?                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `VITE_SENTRY_DSN`            | Sentry ?其??交?航炊??銝?                                                   |
| `VITE_RECAPTCHA_SITE_KEY`    | reCAPTCHA v3 ??Site Key (?冽 App Check)                                           |
| `VITE_API_KEY`               | Firebase API ?身摰?                                                                |
| `VITE_USE_FIREBASE_EMULATOR` | `true` ??Firestore 撠??身????唳璈?`127.0.0.1:8080`嚗uth/Storage 隞甇???啣? |

---

## ?? CI/CD ?芸????函蔡

撠?撌脫??**GitHub Actions**嚗?

- **Pull Request**: ?潸絲 PR ???芸?閫貊皜祈岫????銝阡? Firebase Hosting ???冽???Preview URL嚗靘踹??炎?曹耨?寧???
- **Merge to Main**: ?蔥??`main` ?????楊霅臭蒂?函蔡?澆???Firebase ?迤閰衣?暺?(`live` channel)??

## ?? ?扯??隞?

??扯?芸??瑽??賊??湔?辣嚗???

- [`docs/PERFORMANCE_OPTIMIZATION_GUIDE.md`](./docs/PERFORMANCE_OPTIMIZATION_GUIDE.md)

## ?? ??

甇文?獢???芣?摰?皞?甈?甈橘????撘Ⅳ?身閮?甈飛???澆?????
