#!/usr/bin/env node

/**
 * Miyabi Agent Issue Creator
 * カードショップHP開発用のGitHub Issue自動作成スクリプト
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const issues = [
  {
    title: "🎯 在庫管理システムの実装",
    body: `## 概要
カードショップの在庫管理機能を実装する

## 要件
- リアルタイム在庫数表示
- 在庫アラート機能（閾値設定）
- 入荷履歴管理
- 在庫調整機能
- バックオーダー管理

## 技術仕様
- Database: PostgreSQL (Prisma)
- Frontend: Next.js + TypeScript
- State: Zustand
- リアルタイム更新: WebSocket/SSE

## 成功条件
- [ ] 在庫数がリアルタイムで更新される
- [ ] 在庫不足時にアラートが表示される
- [ ] 管理画面から在庫調整が可能
- [ ] テストカバレッジ80%以上`,
    labels: ["feature", "priority:high", "backend", "frontend", "complexity:large"]
  },
  {
    title: "💳 Wise API決済システム統合",
    body: `## 概要
Wise APIを使用した国際決済システムの実装

## 要件
- Wise API認証設定
- 決済フロー実装
- 為替レート自動取得
- 決済状態管理
- Webhook対応

## 技術仕様
- Payment Provider: Wise API
- Security: PCI DSS準拠
- Webhook: Next.js API Routes

## 成功条件
- [ ] Wise APIで決済が完了できる
- [ ] 複数通貨対応
- [ ] 決済履歴が記録される
- [ ] エラーハンドリング実装`,
    labels: ["feature", "priority:critical", "backend", "security", "complexity:xlarge"]
  },
  {
    title: "🔐 ユーザー認証システム実装",
    body: `## 概要
NextAuth.jsを使用したユーザー認証システムの構築

## 要件
- メール/パスワード認証
- ソーシャルログイン（Google, GitHub）
- 2要素認証対応
- パスワードリセット機能
- セッション管理

## 技術仕様
- Auth: NextAuth.js v5
- Database: PostgreSQL
- Session: JWT
- 2FA: TOTP

## 成功条件
- [ ] ユーザー登録/ログインが動作
- [ ] ソーシャルログイン実装
- [ ] セキュリティテスト合格
- [ ] GDPR/CCPA準拠`,
    labels: ["feature", "priority:high", "security", "backend", "complexity:large"]
  },
  {
    title: "🔍 高度な検索・フィルター機能",
    body: `## 概要
カード検索とフィルタリング機能の強化

## 要件
- 全文検索
- 複数条件フィルター
- 価格範囲検索
- レアリティフィルター
- 並び替え機能
- 検索履歴保存

## 技術仕様
- Search: Algolia/MeiliSearch
- Frontend: React + TanStack Query
- Cache: Redis

## 成功条件
- [ ] 高速検索（<100ms）
- [ ] 日本語/英語対応
- [ ] ファセット検索実装
- [ ] モバイル最適化`,
    labels: ["feature", "priority:medium", "frontend", "backend", "complexity:medium"]
  },
  {
    title: "📱 レスポンシブデザイン最適化",
    body: `## 概要
モバイルファーストのレスポンシブデザイン実装

## 要件
- モバイル最適化
- タブレット対応
- タッチジェスチャー対応
- PWA化
- オフライン対応

## 技術仕様
- CSS: Tailwind CSS
- PWA: Next.js PWA
- Cache: Service Worker

## 成功条件
- [ ] Lighthouse Score 90+
- [ ] 全デバイスで正常表示
- [ ] タッチ操作最適化
- [ ] オフライン時も基本機能動作`,
    labels: ["enhancement", "priority:medium", "frontend", "dx", "complexity:medium"]
  },
  {
    title: "⚡ パフォーマンス最適化とSEO対策",
    body: `## 概要
サイトパフォーマンスの向上とSEO最適化

## 要件
- Core Web Vitals改善
- 画像最適化
- コード分割
- SEOメタタグ管理
- サイトマップ生成
- 構造化データ実装

## 技術仕様
- Image: Next.js Image Optimization
- SEO: next-seo
- Analytics: Google Analytics 4

## 成功条件
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] SEOスコア95+`,
    labels: ["enhancement", "priority:medium", "frontend", "performance", "complexity:medium"]
  }
];

// GitHub CLI を使用してIssueを作成
async function createIssues() {
  console.log('🌸 Miyabi Agent - Creating GitHub Issues...\n');

  for (const issue of issues) {
    const labels = issue.labels.join(',');
    const body = issue.body.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const command = `gh issue create --repo rikimaru63/cardshop-hp-miyabi --title "${issue.title}" --body "${body}" --label "${labels}"`;
    
    try {
      console.log(`📝 Creating issue: ${issue.title}`);
      const { stdout } = await execAsync(command);
      console.log(`✅ Created successfully!`);
      console.log(`   ${stdout.trim()}\n`);
      
      // Rate limit回避のため少し待機
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Failed to create issue: ${issue.title}`);
      console.error(error.message);
    }
  }

  console.log('🎉 All issues created successfully!');
  console.log('\n🤖 Miyabi Agents are ready to execute. Add "🤖agent-execute" label to trigger autonomous development.');
}

// メイン実行
createIssues().catch(console.error);

export { issues };