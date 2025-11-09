# 🌸 Miyabi Framework - カードショップHP自律開発

## 概要

このプロジェクトはMiyabiフレームワークを活用した自律型開発環境で、カードショップのECサイトを構築しています。

## 🤖 Miyabi Autonomous Agentsの活用方法

### 1. GitHubリポジトリの作成

```bash
# GitHubで新しいリポジトリを作成
gh repo create cardshop-hp --public --description "International Trading Card Shop with Miyabi Autonomous Development"

# リモートリポジトリを設定
git remote add origin https://github.com/YOUR_USERNAME/cardshop-hp.git
git push -u origin main
```

### 2. GitHub Secretsの設定

以下のSecretsをGitHubリポジトリに設定してください：

- `ANTHROPIC_API_KEY`: Claude API Key
- `DATABASE_URL`: PostgreSQL接続文字列
- `WISE_API_KEY`: Wise決済API Key（オプション）

### 3. Issueの自動作成

```bash
# Issue作成スクリプトを実行
node scripts/create-issue.js
```

### 4. 自律開発の開始

作成されたIssueに `🤖agent-execute` ラベルを追加すると、Miyabi Agentが自動的に：

1. **IssueAgent**: Issueを分析し、タスクを識別
2. **CoordinatorAgent**: タスクをDAG分解し、並列実行計画を作成
3. **CodeGenAgent**: Claude Sonnet 4.0でコードを生成
4. **ReviewAgent**: コード品質をチェック（80点以上で合格）
5. **TestAgent**: テストを実行（カバレッジ80%以上）
6. **PRAgent**: Draft PRを自動作成
7. **DeploymentAgent**: マージ後に自動デプロイ

### 5. 手動でAgentを実行

```bash
# 特定のIssueに対してAgentを実行
npm run agents:parallel:exec -- --issue 1 --concurrency 3

# または、GitHub ActionsのWorkflow Dispatchから実行
```

## 📊 開発状況モニタリング

### KPIダッシュボード

```bash
# 週次レポートを手動生成
npm run report:weekly

# 状態確認
npx miyabi status
```

### 主要メトリクス

- **Issue処理速度**: 平均2-4時間/Issue
- **コード品質スコア**: 85点以上
- **テストカバレッジ**: 80%以上
- **自動化率**: 90%以上

## 🎯 現在の開発タスク

1. ✅ **基本構造構築** - 完了
2. ✅ **データベース設計** - 完了
3. ✅ **API実装** - 完了
4. ⏳ **在庫管理システム** - Agent実行待ち
5. ⏳ **決済システム統合** - Agent実行待ち
6. ⏳ **ユーザー認証** - Agent実行待ち
7. ⏳ **検索機能強化** - Agent実行待ち
8. ⏳ **レスポンシブ対応** - Agent実行待ち
9. ⏳ **パフォーマンス最適化** - Agent実行待ち

## 🚀 ローカル開発

```bash
# 依存関係インストール
cd card-shop-international
npm install

# Prismaセットアップ
npx prisma generate
npx prisma db push
npm run prisma:seed

# 開発サーバー起動
npm run dev
```

## 📝 カスタムコマンド

```bash
# Issueから自動開発
/agent-run

# システム検証
/verify

# セキュリティスキャン
/security-scan

# ドキュメント生成
/generate-docs
```

## 🌟 特徴

- **完全自律開発**: IssueからコードまでAIが自動生成
- **並列処理**: 複数タスクを同時実行で高速化
- **品質保証**: 自動テスト、コードレビュー
- **GitHub OS**: GitHub ActionsとAPIを最大活用
- **識学理論準拠**: 明確な責任と権限の分離

## 📚 参考資料

- [Miyabi Framework Documentation](https://github.com/ShunsukeHayashi/Autonomous-Operations)
- [CLAUDE.md](./CLAUDE.md) - Claude Code用設定
- [ARCHITECTURE.md](./ARCHITECTURE.md) - システム設計書

---

**🤖 Powered by Miyabi Autonomous Operations Framework**

*"美しさと効率性を両立した自律型開発"*