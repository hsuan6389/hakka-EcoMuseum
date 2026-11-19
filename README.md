# 台三線文化問路所

以「客家文化 × 台三線 × 生態博物館 × 問答諮詢系統」為主軸的一頁式計畫成果網站。

網站提供台三線景點、美食與交通資訊，並透過「來問我」對話介面，依照內建的 30 筆旅遊資料回答使用者問題。

## 主要功能

- 台三線生態博物館景點探索
- 地圖與景點清單切換
- 景點分類篩選與收藏
- AI 文化導覽介面
- 景點、美食及交通問答
- 半日與一日智慧行程規劃
- 桌機與手機響應式版面
- 支援減少動態效果設定

## 本機執行

需安裝 Node.js 22.13.0 以上版本。

```bash
npm install
npm run dev
```

啟動後依終端機顯示的網址開啟網站，通常為 `http://localhost:3000/`。

## 建置檢查

```bash
npm run build
```

## 專案結構

```text
app/
  page.tsx          網站頁面與互動功能
  globals.css       全站視覺與響應式樣式
  travelData.ts     台三線旅遊問答資料
public/images/      網站水彩圖片
```

## GitHub 上傳

1. 在 GitHub 建立新的 repository，預設分支使用 `main`。
2. 將本資料夾中的全部檔案上傳到 repository 根目錄。
3. 開啟 repository 的 `Settings` → `Pages`。
4. 在 `Build and deployment` 的 `Source` 選擇 `GitHub Actions`。
5. 回到 `Actions` 頁面，等待 `Deploy to GitHub Pages` 顯示綠色勾選。
6. 部署完成後，GitHub 會在 `Settings` → `Pages` 顯示公開網址。

每次更新 `main` 分支，網站都會自動重新建置與發布。

請勿上傳 `node_modules`、`dist`、`github-dist` 或 `.wrangler`；這些項目已列入 `.gitignore`。

本專案同時保留 Vinext 本機開發方式與 GitHub Pages 靜態建置方式。`.github/workflows/deploy-pages.yml` 會自動完成 GitHub Pages 發布。

若要在封包前自行檢查 GitHub Pages 版本，可執行：

```bash
npm run build:github
npm run preview:github
```

## 資料說明

旅遊資料整理日期為 2026-11-19。交通班次、營業時間與現場開放情況，請以官方或店家最新公告為準。
