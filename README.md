# Tokyo Culture Score V2 Prototype

現行の `Tokyo Culture Score` を「ランキング」中心から「街の文化生態系の状態診断」中心にリビルドしたV2プロトタイプです。

## 実装したもの

- Culture Vitality（現データMVP）
- Density / 集積性
- Distinctiveness / 固有性
- Quality / 質
- Culture DNA（Location Quotient）
- 10エリア比較地図
- エリア診断パネル
- 既存スポット地図の再利用
- 指標ロジック説明画面
- モバイルレスポンシブ

## 指標ロジック

### Density
既存 `area.density` T-Score を10エリア内で0–100パーセンタイル化。

### Quality
既存 `area.quality` T-Score を10エリア内で0–100パーセンタイル化。

### Distinctiveness
各エリアの6ジャンル構成と10エリア全体のジャンル構成との差を Jensen–Shannon divergence で計算し、10エリア内で0–100パーセンタイル化。

### Culture Vitality
```
45% Density + 30% Distinctiveness + 25% Quality
```

これは現行データだけで作るV2 MVPです。時系列データがないため、Dynamism / Momentum はVitalityに含めていません。

### Culture DNA
Location Quotient (LQ) を使用。
- 1.00× = 10エリア全体と同じ構成比
- 1.50× = そのジャンルが全体平均の1.5倍の構成比

## 未実装 / 次フェーズ

- Dynamism: イベント件数、POP-UP件数、新規開業数など
- Momentum: 前年比・3年変化率
- Sustainability: 閉店率、チェーン化、小規模店舗減少、賃料変化
- Embeddedness: 回遊、滞在、リピート

これらの実データが揃えば、LEAD / PROTECT / SEED / RETHINK を時系列を含む投資判断モデルへ更新できます。

## 起動

```bash
npm install
npm run dev
```

ビルド:

```bash
npm run build
```

## 注意

この実行環境では外部ネットワークからnpmパッケージを取得できなかったため、依存パッケージをインストールした状態でのVite buildは未実行です。JSXの括弧・構文構造については静的チェック済みです。元プロジェクトと同じ依存関係のみを使用しています。
