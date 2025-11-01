
# 科技風個人網站（多頁式）

## 結構
- `index.html` 首頁（Hero、快速入口卡片）
- `about.html` 關於我
- `academics.html` 學業歷程（時間軸）
- `competitions.html` 比賽經歷
- `projects.html` 作品集
- `resume.html` 履歷（並可連結 PDF）
- `contact.html` 聯絡（Netlify Forms 樣板）
- `assets/css/style.css` 風格
- `assets/js/main.js` 導覽列、主題切換
- `assets/images/` 放圖片

## 本地開啟
直接雙擊 `index.html` 或用 VS Code Live Server 開啟。

## GitHub Pages 部署
1. 建立新 Repo（例如 `hihi-portfolio`），把整個資料夾上傳。
2. 進入 Repo 的 **Settings → Pages**，Source 選擇 **Deploy from a branch**，分支選 `main`，資料夾選 `/root`。
3. 儲存後等幾十秒，頁面會在 `https://你的帳號.github.io/hihi-portfolio/`。

## 表單（聯絡頁）
- 若使用 **Netlify** 部署，內建支援（已有 `netlify` 屬性）。
- 若使用 **GitHub Pages**，可改成 Formspree：在 `contact.html` 把 `<form ...>` 的屬性替換為 `action="https://formspree.io/f/你的ID" method="POST"` 並移除 `netlify` 與 `form-name`。

## 自訂
- 換成你的名稱、頭像 `assets/images/profile.jpg`、連結與內容。
- 顏色：在 `:root` 的 `--accent` 改主色。
- 加頁面：複製一份任一 `.html`，調整 `<title>` 與 `<h1>` 即可。

<li>
                            <div class="time">大學</div>
                            <div class="content"><b>國立雲林科技大學</b> —（2025資訊管理系）</div>
                        </li>
                        <li>
                            <div class="time">高中職</div>
                            <div class="content"><b>能仁家商</b> —（2022資料處理科）</div>
                        </li>
                        <li>
                            <div class="time">國中</div>
                            <div class="content"><b>淡水國中</b> —（2019）</div>
                        </li>
                        <li>
                            <div class="time">國小</div>
                            <div class="content"><b>興新國小</b> —（2016）</div>
                        </li>
                        <li>
                            <div class="time">國小</div>
                            <div class="content"><b>關渡國小</b> —（2014）</div>
                        </li>
                        <li>
                            <div class="time">國小</div>
                            <div class="content"><b>鷺江國小</b> —（2013）</div>
                        </li>