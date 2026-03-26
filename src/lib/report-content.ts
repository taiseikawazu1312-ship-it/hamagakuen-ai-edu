// Dashboard Report Content

import {
  yearlyComparison,
  scoreDistribution,
  classComparison,
  unitScores,
  aiFactors,
  aiSummary,
  proposals,
  interventionEffects,
  growthData,
} from "./demo-data";

// Student Data
import {
  studentProfile,
  subjectGaps,
  todaysTasks,
  comprehensionRadar,
  weeklyProgress,
  comprehensionTrend,
  materials,
  weeklyPlan,
} from "./student-data";

// ============================================================
// Shared Styles
// ============================================================

const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans JP', sans-serif; color: #1e293b; line-height: 1.8; padding: 48px 56px; max-width: 850px; margin: 0 auto; font-size: 13px; }
  h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
  h2 { font-size: 15px; font-weight: 700; margin: 32px 0 14px; padding: 6px 0 6px 12px; border-left: 4px solid; }
  h3 { font-size: 13px; font-weight: 700; margin: 18px 0 8px; color: #334155; }
  p { margin-bottom: 8px; }
  .header { text-align: center; margin-bottom: 36px; padding-bottom: 24px; border-bottom: 2px solid #e2e8f0; }
  .header .org { font-size: 12px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 12px; }
  .header .subtitle { color: #64748b; font-size: 13px; margin-top: 4px; }
  .header .date { color: #94a3b8; font-size: 11px; margin-top: 8px; }
  .header .confidential { display: inline-block; font-size: 10px; font-weight: 600; padding: 2px 10px; border-radius: 3px; margin-top: 8px; }
  table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 12px; }
  th { text-align: left; padding: 10px 12px; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
  td { padding: 9px 12px; }
  tr:nth-child(even) td { background: #f8fafc; }
  .negative { color: #dc2626; font-weight: 600; }
  .positive { color: #16a34a; font-weight: 600; }
  .warning { color: #d97706; font-weight: 600; }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 10px; font-size: 10px; font-weight: 600; }
  .badge-high { background: #fef2f2; color: #dc2626; }
  .badge-medium { background: #fffbeb; color: #d97706; }
  .badge-low { background: #f0fdf4; color: #16a34a; }
  .factor-card { border-radius: 8px; padding: 14px 18px; margin: 10px 0; }
  .factor-title { font-size: 13px; font-weight: 700; margin-bottom: 6px; }
  .factor-desc { font-size: 12px; color: #475569; line-height: 1.7; }
  .summary-box { padding: 18px 20px; border-radius: 8px; margin: 16px 0; font-size: 13px; line-height: 1.8; }
  .stat-grid { display: grid; gap: 12px; margin: 18px 0; }
  .stat-grid-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
  .stat-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  .stat-item { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 12px; text-align: center; }
  .stat-value { font-size: 22px; font-weight: 700; }
  .stat-sub { font-size: 11px; margin-top: 2px; }
  .stat-label { font-size: 10px; color: #64748b; margin-top: 6px; font-weight: 500; }
  .progress-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 6px; }
  .progress-fill { height: 100%; border-radius: 4px; }
  .section-intro { color: #475569; font-size: 12.5px; margin-bottom: 14px; line-height: 1.7; }
  .action-item { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12.5px; }
  .action-num { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
  .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; color: #94a3b8; font-size: 10px; }
  .signature-area { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .signature-box { border-top: 1px solid #cbd5e1; padding-top: 8px; text-align: center; font-size: 11px; color: #64748b; }
  .page-break { page-break-before: always; }
  @media print {
    body { padding: 24px 32px; font-size: 12px; }
    .page-break { page-break-before: always; }
    table { page-break-inside: avoid; }
    .factor-card { page-break-inside: avoid; }
  }
`;

// ============================================================
// Chart Helpers
// ============================================================
import { svgLineChart, svgBarChart, svgHorizontalBarChart, svgRadarChart, svgDonutChart } from "./report-charts";

function buildYearlyTrendChart() {
  return svgLineChart({
    title: '過去4年間の成績推移',
    data: yearlyComparison.map(y => ({
      label: y.year.replace('年度', ''),
      values: [
        { name: '平均点', value: y.平均点 },
        { name: '上位10%', value: y['上位10%'] },
        { name: '中位', value: y.中位 },
        { name: '下位10%', value: y['下位10%'] },
      ]
    })),
    yMin: 20, yMax: 100,
  });
}

function buildScoreDistChart() {
  return svgBarChart({
    title: '得点分布の前年比較',
    data: scoreDistribution.map(s => ({
      label: s.range,
      values: [
        { name: '今年度', value: s.今年度 },
        { name: '前年度', value: s.前年度 },
      ]
    })),
    yMax: 40,
    unit: '人',
  });
}

function buildGrowthChart() {
  return svgLineChart({
    title: '月次学力推移（入学時〜12月）',
    data: growthData.map(g => ({
      label: g.month,
      values: [
        { name: '平均点', value: g.平均点 },
        { name: '上位層', value: g.上位層 },
        { name: '下位層', value: g.下位層 },
      ]
    })),
    yMin: 20, yMax: 100,
    colors: ['#2563eb', '#16a34a', '#dc2626'],
  });
}

function buildUnitScoresChart() {
  return svgHorizontalBarChart({
    title: '単元別正答率（今年度 vs 過去平均）',
    data: unitScores.map(u => ({
      label: u.unit,
      value: u.今年度正答率,
      compare: u.過去平均正答率,
    })),
  });
}

function buildComprehensionRadar() {
  return svgRadarChart({
    title: '分野別理解度',
    data: comprehensionRadar.map(c => ({ label: c.area, value: c.score })),
    color: '#10b981',
  });
}

function buildStudentTrendChart() {
  return svgLineChart({
    title: '模試偏差値の推移',
    data: comprehensionTrend.map(t => ({
      label: t.period.replace('模試', ''),
      values: [
        { name: '英語', value: t.english },
        { name: '数学', value: t.math },
        { name: '国語', value: t.japanese },
        { name: '物理', value: t.physics },
        { name: '化学', value: t.chemistry },
      ]
    })),
    yMin: 40, yMax: 85,
    colors: ['#3B82F6', '#8B5CF6', '#F97316', '#14B8A6', '#EC4899'],
  });
}

function buildWeeklyProgressChart() {
  return svgBarChart({
    title: '週次タスク完了率',
    data: weeklyProgress.map(w => ({
      label: w.week,
      values: [{ name: '完了率', value: w.rate }],
    })),
    yMax: 100,
    unit: '%',
    colors: ['#10b981'],
  });
}

function buildSubjectGapChart() {
  return svgHorizontalBarChart({
    title: '科目別偏差値（現在 vs 目標）',
    data: subjectGaps.map(s => ({
      label: s.subject,
      value: s.current,
      compare: s.target,
    })),
    color: '#10b981',
    compareColor: '#c4b5fd',
    maxValue: 80,
  });
}

function buildDonutSummary() {
  const avgProgress = Math.round(weeklyProgress.reduce((s, w) => s + w.rate, 0) / weeklyProgress.length);
  return `<div style="text-align:center;margin:16px 0;">
    ${svgDonutChart({ value: studentProfile.currentDeviation, max: 80, color: '#10b981', label: '/ 80', sublabel: '偏差値' })}
    ${svgDonutChart({ value: avgProgress, color: '#3b82f6', label: '%', sublabel: '完了率' })}
    ${svgDonutChart({ value: studentProfile.streak, max: 30, color: '#f59e0b', label: '/ 30日', sublabel: '連続学習' })}
    ${svgDonutChart({ value: 78, color: '#8b5cf6', label: '%', sublabel: '理解度' })}
  </div>`;
}

// ============================================================
// Dashboard Reports
// ============================================================

export function generateDashboardReport(type: "summary" | "detailed" | "parent"): string {
  const now = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
  const dashStyles = `<style>${baseStyles}
    h2 { border-color: #2563eb; color: #1e40af; }
    th { background: #eff6ff; color: #1e40af; border-bottom: 2px solid #bfdbfe; }
    td { border-bottom: 1px solid #f1f5f9; }
    .header .org { color: #2563eb; }
    .header .confidential { background: #fef2f2; color: #dc2626; }
  </style>`;

  if (type === "summary") return generateSummaryReport(dashStyles, now);
  if (type === "detailed") return generateDetailedReport(dashStyles, now);
  return generateParentReport(dashStyles, now);
}

function generateSummaryReport(styles: string, date: string): string {
  const totalStudents = scoreDistribution.reduce((s, r) => s + r.今年度, 0);
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>サマリーレポート</title>${styles}</head><body>
    <div class="header">
      <div class="org">浜学園</div>
      <h1>成績分析 エグゼクティブサマリー</h1>
      <p class="subtitle">2024年度 2学期 中間テスト | 対象生徒数: ${totalStudents}名</p>
      <p class="date">作成日: ${date}</p>
      <span class="confidential">社内限定</span>
    </div>

    <h2>全体成績概要</h2>
    <div class="stat-grid stat-grid-4">
      <div class="stat-item"><div class="stat-value">61.2</div><div class="stat-sub negative">▼2.6%</div><div class="stat-label">全体平均点</div></div>
      <div class="stat-item"><div class="stat-value">87.3</div><div class="stat-sub negative">▼1.4%</div><div class="stat-label">上位10%平均</div></div>
      <div class="stat-item"><div class="stat-value">55.6</div><div class="stat-sub negative">▼4.2%</div><div class="stat-label">中位層平均</div></div>
      <div class="stat-item"><div class="stat-value">31.5</div><div class="stat-sub negative">▼2.7%</div><div class="stat-label">下位10%平均</div></div>
    </div>
    <p class="section-intro">全指標で前年を下回る結果となりました。特に<strong>中位層（-4.2%）の低下が顕著</strong>であり、学力の二極化傾向が見られます。</p>

    ${buildYearlyTrendChart()}

    <h2>クラス別成績と前年比較</h2>
    <table>
      <tr><th>クラス</th><th style="text-align:right">平均点</th><th style="text-align:right">前年比</th><th style="text-align:right">所見</th></tr>
      ${classComparison.map(r => `<tr><td><strong>${r.class}</strong></td><td style="text-align:right">${r.平均点}点</td><td style="text-align:right" class="${r.前年比 < -3 ? 'negative' : r.前年比 < 0 ? 'warning' : 'positive'}">${r.前年比 > 0 ? '+' : ''}${r.前年比}点</td><td style="text-align:right;font-size:11px;">${r.前年比 < -3 ? '要対策' : r.前年比 < -1 ? '要注視' : '安定'}</td></tr>`).join('')}
    </table>
    <p class="section-intro"><strong>Bクラスの-4.8点が最大の課題</strong>です。Sクラスは-1.2点と安定しており、上位層の指導は機能しています。</p>

    <h2>重点対策単元（前年比-8%以上）</h2>
    <table>
      <tr><th>単元</th><th style="text-align:right">今年度正答率</th><th style="text-align:right">過去平均</th><th style="text-align:right">差分</th></tr>
      ${unitScores.filter(r => r.diff <= -8).map(r => `<tr><td>${r.unit}</td><td style="text-align:right">${r.今年度正答率}%</td><td style="text-align:right">${r.過去平均正答率}%</td><td style="text-align:right" class="negative">${r.diff}%</td></tr>`).join('')}
    </table>

    <h2>AI総合診断</h2>
    <div class="summary-box" style="background:#eff6ff;border-left:4px solid #2563eb;">
      ${aiSummary.split('\n\n').map(p => `<p>${p.replace(/【([^】]+)】/g, '<strong style="color:#1e40af;">$1</strong>')}</p>`).join('')}
    </div>

    <h2>最優先施策</h2>
    <div class="factor-card" style="background:#eff6ff;border:1px solid #bfdbfe;">
      <div class="factor-title">${proposals[0].title}</div>
      <div class="factor-desc">${proposals[0].description}</div>
      <div style="margin-top:10px;display:flex;gap:16px;font-size:11px;">
        <span><strong>対象:</strong> ${proposals[0].target}</span>
        <span><strong>期待効果:</strong> ${proposals[0].expectedImpact}</span>
        <span><strong>工数:</strong> <span class="badge badge-medium">${proposals[0].effort}</span></span>
      </div>
    </div>

    <div class="signature-area">
      <div class="signature-box">作成者</div>
      <div class="signature-box">学年主任</div>
      <div class="signature-box">教務部長</div>
    </div>

    <div class="footer">
      <span>浜学園 AI教育プラットフォーム | AI Generated</span>
      <span>${date} | Page 1/1</span>
    </div>
  </body></html>`;
}

function generateDetailedReport(styles: string, date: string): string {
  const totalStudents = scoreDistribution.reduce((s, r) => s + r.今年度, 0);
  const lastGrowth = growthData[growthData.length - 1];
  const firstGrowth = growthData[0];

  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>詳細分析レポート</title>${styles}</head><body>
    <div class="header">
      <div class="org">浜学園</div>
      <h1>成績 詳細分析レポート</h1>
      <p class="subtitle">2024年度 2学期 中間テスト | 対象生徒数: ${totalStudents}名</p>
      <p class="date">作成日: ${date} | 分析期間: 2021年度〜2024年度</p>
      <span class="confidential">社内限定</span>
    </div>

    <!-- 目次 -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:18px 24px;margin:0 0 20px;">
      <h3 style="margin:0 0 10px;font-size:13px;">目次</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;font-size:12px;color:#475569;">
        <div>1. 全体概要</div><div>6. AI要因分析</div>
        <div>2. 4年間の推移</div><div>7. AI総合診断</div>
        <div>3. 得点分布分析</div><div>8. 施策提案</div>
        <div>4. クラス別分析</div><div>9. 過去施策の効果測定</div>
        <div>5. 単元別正答率</div><div>10. 今後のスケジュール</div>
      </div>
    </div>

    <h2>1. 全体概要</h2>
    <p class="section-intro">2024年度2学期中間テストの結果を、過去3年間の同時期データと比較分析しました。全${totalStudents}名の回答データに基づくレポートです。</p>
    <div class="stat-grid stat-grid-4">
      <div class="stat-item"><div class="stat-value">61.2</div><div class="stat-sub negative">▼2.6%</div><div class="stat-label">全体平均</div></div>
      <div class="stat-item"><div class="stat-value">87.3</div><div class="stat-sub negative">▼1.4%</div><div class="stat-label">上位10%</div></div>
      <div class="stat-item"><div class="stat-value">55.6</div><div class="stat-sub negative">▼4.2%</div><div class="stat-label">中位層</div></div>
      <div class="stat-item"><div class="stat-value">31.5</div><div class="stat-sub negative">▼2.7%</div><div class="stat-label">下位10%</div></div>
    </div>
    <div class="stat-grid stat-grid-3">
      <div class="stat-item"><div class="stat-value positive">+${lastGrowth.平均点 - firstGrowth.平均点}点</div><div class="stat-label">入学時からの伸長</div></div>
      <div class="stat-item"><div class="stat-value">54.8</div><div class="stat-sub positive">+8.3</div><div class="stat-label">偏差値推移</div></div>
      <div class="stat-item"><div class="stat-value warning">鈍化</div><div class="stat-label">2学期の成長傾向</div></div>
    </div>

    <h2>2. 4年間の推移</h2>
    <p class="section-intro">全体平均は2022年度の64.5点をピークに2年連続で低下しています。上位層は比較的安定していますが、中位層・下位層の低下が全体を押し下げています。</p>
    ${buildYearlyTrendChart()}
    <table>
      <tr><th>年度</th><th style="text-align:right">平均点</th><th style="text-align:right">上位10%</th><th style="text-align:right">中位</th><th style="text-align:right">下位10%</th><th style="text-align:right">上位-下位差</th></tr>
      ${yearlyComparison.map(r => `<tr><td><strong>${r.year}</strong></td><td style="text-align:right">${r.平均点}</td><td style="text-align:right">${r['上位10%']}</td><td style="text-align:right">${r.中位}</td><td style="text-align:right">${r['下位10%']}</td><td style="text-align:right">${(r['上位10%'] - r['下位10%']).toFixed(1)}</td></tr>`).join('')}
    </table>
    <p class="section-intro">上位-下位差は2021年の56.7点から2024年の55.8点へとほぼ横ばいですが、中位の低下（58.2→55.6）が顕著です。</p>

    <div class="page-break"></div>

    <h2>3. 得点分布分析</h2>
    <p class="section-intro">中〜上位帯（61-100点）の生徒数が減少し、中〜下位帯（0-60点）が増加しています。</p>
    ${buildScoreDistChart()}
    <table>
      <tr><th>得点帯</th><th style="text-align:right">今年度</th><th style="text-align:right">前年度</th><th style="text-align:right">増減</th><th style="text-align:right">構成比</th></tr>
      ${scoreDistribution.map(r => {
        const diff = r.今年度 - r.前年度;
        const pct = ((r.今年度 / totalStudents) * 100).toFixed(1);
        return `<tr><td>${r.range}</td><td style="text-align:right">${r.今年度}人</td><td style="text-align:right">${r.前年度}人</td><td style="text-align:right" class="${diff > 0 && r.range.startsWith('0') || diff > 0 && r.range.startsWith('2') ? 'negative' : diff < 0 ? 'negative' : ''}">${diff > 0 ? '+' : ''}${diff}人</td><td style="text-align:right">${pct}%</td></tr>`;
      }).join('')}
    </table>
    <p class="section-intro">61-80点帯が33人→28人（-5人）、81-100点帯が15人→11人（-4人）と上位帯の減少が目立ちます。</p>

    <h2>4. クラス別分析</h2>
    <table>
      <tr><th>クラス</th><th style="text-align:right">平均点</th><th style="text-align:right">前年比</th><th style="text-align:right">全体比</th><th>評価</th></tr>
      ${classComparison.map(r => {
        const diff = r.平均点 - 61.2;
        return `<tr><td><strong>${r.class}</strong></td><td style="text-align:right">${r.平均点}点</td><td style="text-align:right" class="${r.前年比 < -3 ? 'negative' : r.前年比 < 0 ? 'warning' : 'positive'}">${r.前年比 > 0 ? '+' : ''}${r.前年比}点</td><td style="text-align:right">${diff > 0 ? '+' : ''}${diff.toFixed(1)}</td><td>${r.前年比 < -3 ? '<span class="badge badge-high">要対策</span>' : r.前年比 < -1 ? '<span class="badge badge-medium">要注視</span>' : '<span class="badge badge-low">安定</span>'}</td></tr>`;
      }).join('')}
    </table>

    <h2>5. 単元別正答率</h2>
    <p class="section-intro">全8単元中、前年比マイナスが8単元と全面的な低下傾向。特に差分-8%以上の3単元が重点対策対象です。</p>
    ${buildUnitScoresChart()}
    <table>
      <tr><th>単元</th><th style="text-align:right">今年度</th><th style="text-align:right">過去平均</th><th style="text-align:right">差分</th><th>重要度</th></tr>
      ${unitScores.map(r => `<tr><td>${r.unit}</td><td style="text-align:right">${r.今年度正答率}%</td><td style="text-align:right">${r.過去平均正答率}%</td><td style="text-align:right" class="${r.diff <= -8 ? 'negative' : r.diff <= -4 ? 'warning' : ''}">${r.diff > 0 ? '+' : ''}${r.diff}%</td><td>${r.diff <= -8 ? '<span class="badge badge-high">重点</span>' : r.diff <= -4 ? '<span class="badge badge-medium">注意</span>' : '<span class="badge badge-low">許容</span>'}</td></tr>`).join('')}
    </table>

    <div class="page-break"></div>

    <h2>6. AI要因分析</h2>
    <h3>成績下降の主要因（5件検出）</h3>
    ${aiFactors.negative.map(f => `<div class="factor-card" style="background:#fef2f2;border:1px solid #fecaca;">
      <div class="factor-title">${f.id}. ${f.title} <span class="badge ${f.severity === '高' ? 'badge-high' : 'badge-medium'}">重要度: ${f.severity}</span></div>
      <div class="factor-desc">${f.description}</div>
    </div>`).join('')}

    <h3>良好な傾向・維持されている点（4件）</h3>
    ${aiFactors.positive.map(f => `<div class="factor-card" style="background:#f0fdf4;border:1px solid #bbf7d0;">
      <div class="factor-title">${f.title}</div>
      <div class="factor-desc">${f.description}</div>
    </div>`).join('')}

    <h2>7. AI総合診断</h2>
    <div class="summary-box" style="background:#eff6ff;border-left:4px solid #2563eb;">
      ${aiSummary.split('\n\n').map(p => `<p>${p.replace(/【([^】]+)】/g, '<strong style="color:#1e40af;">$1</strong>')}</p>`).join('')}
    </div>

    <div class="page-break"></div>

    <h2>8. 施策提案</h2>
    <p class="section-intro">分析結果に基づき、効果・工数・緊急度を考慮した3つの施策を提案します。</p>
    ${proposals.map((p, i) => `<div class="factor-card" style="background:#eff6ff;border:1px solid #bfdbfe;">
      <div class="factor-title">施策${i + 1}: ${p.title}</div>
      <div class="factor-desc">${p.description}</div>
      <table style="margin:10px 0 0;font-size:11px;">
        <tr><td style="border:none;padding:4px 12px 4px 0;"><strong>対象</strong></td><td style="border:none;padding:4px 0;">${p.target}</td></tr>
        <tr><td style="border:none;padding:4px 12px 4px 0;"><strong>期待効果</strong></td><td style="border:none;padding:4px 0;">${p.expectedImpact}</td></tr>
        <tr><td style="border:none;padding:4px 12px 4px 0;"><strong>工数</strong></td><td style="border:none;padding:4px 0;"><span class="badge ${p.effort === '高' ? 'badge-high' : p.effort === '中' ? 'badge-medium' : 'badge-low'}">${p.effort}</span></td></tr>
      </table>
    </div>`).join('')}

    <h2>9. 過去施策の効果測定</h2>
    <p class="section-intro">過去に実施した施策の効果を定量的に評価します。施策ありの期間は改善、施策なしの期間は低下が見られます。</p>
    <table>
      <tr><th>期間</th><th>実施施策</th><th style="text-align:right">効果</th><th>評価</th></tr>
      ${interventionEffects.map(e => `<tr><td>${e.period}</td><td>${e.intervention}</td><td style="text-align:right" class="${e.positive ? 'positive' : 'negative'}">${e.impact}</td><td>${e.positive ? '<span class="badge badge-low">有効</span>' : '<span class="badge badge-high">要改善</span>'}</td></tr>`).join('')}
    </table>
    <p class="section-intro"><strong>示唆:</strong> 施策を継続的に実施しないと効果が失われる傾向があります。2学期の-4点は「施策なし」の結果であり、3学期は必ず施策を投入すべきです。</p>

    <h2>10. 今後のスケジュール</h2>
    <table>
      <tr><th>時期</th><th>アクション</th><th>担当</th></tr>
      <tr><td>12月上旬</td><td>施策1「少人数別指導」開始、対象生徒の選定</td><td>学年主任・B/C担当</td></tr>
      <tr><td>12月中旬</td><td>施策2「体験型ワークショップ」第1回実施</td><td>教科担当</td></tr>
      <tr><td>12月下旬</td><td><strong>2学期 期末テスト</strong>（中間効果測定）</td><td>全教科</td></tr>
      <tr><td>1月</td><td>期末テスト結果分析、施策の効果検証</td><td>教務部</td></tr>
      <tr><td>1月中旬</td><td>施策3「復習サイクル自動化」検討開始</td><td>教務部・IT</td></tr>
      <tr><td>1月下旬</td><td><strong>1月模試</strong>（総合効果測定）</td><td>全教科</td></tr>
      <tr><td>2月</td><td>年間総括レポート作成、来年度方針策定</td><td>教務部長</td></tr>
    </table>

    <div class="signature-area">
      <div class="signature-box">作成者</div>
      <div class="signature-box">学年主任</div>
      <div class="signature-box">教務部長</div>
    </div>

    <div class="footer">
      <span>浜学園 AI教育プラットフォーム | AI Generated Detailed Report</span>
      <span>${date}</span>
    </div>
  </body></html>`;
}

function generateParentReport(styles: string, date: string): string {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>保護者向けレポート</title>${styles}
  <style>
    h2 { border-color: #6366f1; color: #4338ca; }
    th { background: #eef2ff; color: #4338ca; border-bottom: 2px solid #c7d2fe; }
  </style></head><body>
    <div class="header">
      <div class="org" style="color:#6366f1;">浜学園</div>
      <h1>学習状況のご報告</h1>
      <p class="subtitle">2024年度 2学期 中間テスト結果</p>
      <p class="date">${date}</p>
    </div>

    <p>保護者の皆様へ</p>
    <p>平素より浜学園の教育活動に格別のご理解とご協力を賜り、厚く御礼申し上げます。2024年度2学期中間テストの結果がまとまりましたので、ご報告させていただきます。</p>

    <h2>テスト結果の概要</h2>
    <div class="stat-grid stat-grid-4">
      <div class="stat-item"><div class="stat-value">61.2<span style="font-size:13px;">点</span></div><div class="stat-label">学年平均</div></div>
      <div class="stat-item"><div class="stat-value negative">-2.6<span style="font-size:13px;">%</span></div><div class="stat-label">前年同時期比</div></div>
      <div class="stat-item"><div class="stat-value positive">+16<span style="font-size:13px;">点</span></div><div class="stat-label">入学時からの伸び</div></div>
      <div class="stat-item"><div class="stat-value">54.8</div><div class="stat-label">偏差値（入学時46.5）</div></div>
    </div>

    <p class="section-intro">入学時から比較すると着実に成長しておりますが、今学期のテストでは前年を下回る結果となりました。以下に詳しくご説明いたします。</p>

    <h2>クラス別の状況</h2>
    <table>
      <tr><th>クラス</th><th style="text-align:right">平均点</th><th style="text-align:right">前年比</th><th>ひとこと</th></tr>
      ${classComparison.map(r => `<tr><td><strong>${r.class}</strong></td><td style="text-align:right">${r.平均点}点</td><td style="text-align:right">${r.前年比 > 0 ? '+' : ''}${r.前年比}点</td><td style="font-size:11px;">${r.前年比 >= -1.5 ? '前年並みを維持しています' : r.前年比 >= -3 ? 'やや低下しています' : '重点的に対策を講じます'}</td></tr>`).join('')}
    </table>

    ${buildGrowthChart()}

    <h2>成績の傾向と分析</h2>
    <div class="summary-box" style="background:#eef2ff;border-left:4px solid #6366f1;">
      <p><strong>伸びている点:</strong></p>
      <p>基礎計算力は正答率78%と安定しており、日々の計算ドリルの成果が表れています。また、入学時から+16点の成長があり、全体としての学力向上は着実に進んでいます。</p>
      <p style="margin-top:12px;"><strong>課題となっている点:</strong></p>
      <p>文章題（割合）と図形（面積・体積）の分野で正答率が低下しています。問題文を正しく読み取り、式を立てる力の強化が必要です。また、夏期講習で学んだ内容の定着が十分ではなく、復習の仕組みを見直す必要があります。</p>
    </div>

    <h2>今後の取り組み</h2>
    <p class="section-intro">テスト結果を踏まえ、以下の取り組みを実施いたします。</p>
    ${proposals.map((p, i) => `<div class="action-item">
      <div class="action-num" style="background:#eef2ff;color:#4338ca;">${i + 1}</div>
      <div><strong>${p.title}</strong><br><span style="font-size:12px;color:#475569;">${p.description.slice(0, 80)}...</span><br><span style="font-size:11px;color:#6366f1;">期待効果: ${p.expectedImpact}</span></div>
    </div>`).join('')}

    <h2>ご家庭へのお願い</h2>
    <div class="factor-card" style="background:#fefce8;border:1px solid #fde68a;">
      <div style="font-size:12.5px;line-height:2;">
        <p><strong>1. 日々の学習習慣の維持</strong><br>計算ドリル（毎日15分程度）の継続が成績の土台となっております。引き続きお声がけをお願いいたします。</p>
        <p><strong>2. 学習への前向きな姿勢づくり</strong><br>テスト結果の数字だけでなく、日々の努力の過程を認めていただけますと、お子様の学習意欲の維持につながります。</p>
        <p><strong>3. 生活リズムの安定</strong><br>十分な睡眠と規則正しい生活は、学習効率に直結します。特にテスト前の夜更かし学習は逆効果になることがございます。</p>
      </div>
    </div>

    <p style="margin-top:24px;">今後とも、お子様の学力向上と健やかな成長のために教職員一同努めてまいります。ご不明な点やお気づきの点がございましたら、担任までお気軽にご連絡ください。</p>

    <div style="margin-top:32px;text-align:right;font-size:13px;">
      <p>浜学園</p>
      <p style="color:#64748b;font-size:12px;">担任: _______________</p>
    </div>

    <div style="margin-top:32px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:11px;color:#64748b;">
      <strong>次回面談予定:</strong> ____年____月____日（____）____:____〜<br>
      <strong>面談場所:</strong> ____________________<br>
      ※ ご都合が合わない場合は、別途日程をご相談ください。
    </div>

    <div class="footer">
      <span>浜学園</span>
      <span>${date}</span>
    </div>
  </body></html>`;
}

// ============================================================
// Student Reports
// ============================================================

export function generateStudentReport(type: "self" | "teacher" | "parent"): string {
  const now = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
  const studentStyles = `<style>${baseStyles}
    h2 { border-color: #10b981; color: #047857; }
    th { background: #ecfdf5; color: #047857; border-bottom: 2px solid #a7f3d0; }
    td { border-bottom: 1px solid #f1f5f9; }
    .header .org { color: #10b981; }
  </style>`;

  const completedTasks = todaysTasks.filter(t => t.completed).length;
  const avgProgress = Math.round(weeklyProgress.reduce((s, w) => s + w.rate, 0) / weeklyProgress.length);
  const totalWeeklyHours = weeklyPlan.reduce((s, d) => s + d.subjects.reduce((ss, sub) => ss + sub.duration, 0), 0) / 60;

  if (type === "self") return generateSelfReport(studentStyles, now, avgProgress, totalWeeklyHours);
  if (type === "teacher") return generateTeacherReport(studentStyles, now, completedTasks, avgProgress, totalWeeklyHours);
  return generateStudentParentReport(studentStyles, now, avgProgress, totalWeeklyHours);
}

function generateSelfReport(styles: string, date: string, avgProgress: number, weeklyHours: number): string {
  const gapToTarget = studentProfile.targetDeviation - studentProfile.currentDeviation;
  const strongSubjects = subjectGaps.filter(s => s.gap < -5);
  const weakSubjects = subjectGaps.filter(s => s.gap > 0);

  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>自己分析レポート</title>${styles}</head><body>
    <div class="header">
      <div class="org" style="color:#10b981;">浜学園 AI学習サポート</div>
      <h1>自己分析レポート</h1>
      <p class="subtitle">${studentProfile.name} | ${studentProfile.targetSchool} ${studentProfile.targetDepartment} 志望（${studentProfile.entranceMethod}）</p>
      <p class="date">${date} 作成</p>
    </div>

    <h2>現在の学習状況</h2>
    <div class="stat-grid stat-grid-4">
      <div class="stat-item"><div class="stat-value">${studentProfile.currentDeviation}</div><div class="stat-sub">目標まで<span class="${gapToTarget > 0 ? 'negative' : 'positive'}"> ${gapToTarget > 0 ? '+' + gapToTarget.toFixed(1) : '達成済'}</span></div><div class="stat-label">現在偏差値</div></div>
      <div class="stat-item"><div class="stat-value">${studentProfile.targetDeviation}</div><div class="stat-label">目標偏差値</div></div>
      <div class="stat-item"><div class="stat-value">${studentProfile.daysUntilExam}<span style="font-size:13px;">日</span></div><div class="stat-label">受験まで</div></div>
      <div class="stat-item"><div class="stat-value positive">${studentProfile.streak}<span style="font-size:13px;">日</span></div><div class="stat-label">連続学習</div></div>
    </div>
    <div class="stat-grid stat-grid-3">
      <div class="stat-item"><div class="stat-value">${weeklyHours.toFixed(1)}<span style="font-size:13px;">h</span></div><div class="stat-label">週間学習計画</div></div>
      <div class="stat-item"><div class="stat-value">${avgProgress}<span style="font-size:13px;">%</span></div><div class="stat-label">平均タスク完了率</div></div>
      <div class="stat-item"><div class="stat-value">78<span style="font-size:13px;">%</span></div><div class="stat-label">総合理解度</div></div>
    </div>

    <h2>科目別ギャップ分析</h2>
    <p class="section-intro">志望校合格に必要な偏差値との差を科目別に分析します。ギャップがマイナスの科目は目標を上回っており、プラスの科目が強化対象です。</p>
    ${buildSubjectGapChart()}
    <table>
      <tr><th>科目</th><th style="text-align:right">現在</th><th style="text-align:right">目標</th><th style="text-align:right">ギャップ</th><th>達成度</th><th>優先度</th></tr>
      ${subjectGaps.map(s => {
        const pct = Math.min(100, Math.round((s.current / s.target) * 100));
        return `<tr><td><strong>${s.subject}</strong></td><td style="text-align:right">${s.current}</td><td style="text-align:right">${s.target}</td><td style="text-align:right" class="${s.gap > 0 ? 'positive' : s.gap < -5 ? 'negative' : ''}">${s.gap > 0 ? '+' : ''}${s.gap}</td>
        <td><div class="progress-bar" style="width:100px;display:inline-block;vertical-align:middle;"><div class="progress-fill" style="width:${pct}%;background:${s.gap > 0 ? '#f59e0b' : '#10b981'};"></div></div> <span style="font-size:11px;">${pct}%</span></td>
        <td>${s.gap > 5 ? '<span class="badge badge-high">最優先</span>' : s.gap > 0 ? '<span class="badge badge-medium">要強化</span>' : '<span class="badge badge-low">維持</span>'}</td></tr>`;
      }).join('')}
    </table>

    <h2>分野別理解度</h2>
    ${buildComprehensionRadar()}
    <table>
      <tr><th>分野</th><th style="text-align:right">理解度</th><th>レベル</th><th>目安</th></tr>
      ${comprehensionRadar.map(c => `<tr><td>${c.area}</td><td style="text-align:right"><strong>${c.score}%</strong></td>
        <td><div class="progress-bar" style="width:120px;display:inline-block;vertical-align:middle;"><div class="progress-fill" style="width:${c.score}%;background:${c.score >= 80 ? '#10b981' : c.score >= 70 ? '#f59e0b' : '#ef4444'};"></div></div></td>
        <td>${c.score >= 80 ? '<span class="badge badge-low">応用問題へ</span>' : c.score >= 70 ? '<span class="badge badge-medium">演習量増</span>' : '<span class="badge badge-high">基礎から</span>'}</td></tr>`).join('')}
    </table>

    <h2>模試偏差値の推移</h2>
    ${buildStudentTrendChart()}
    <table>
      <tr><th>時期</th><th style="text-align:right">英語</th><th style="text-align:right">数学</th><th style="text-align:right">国語</th><th style="text-align:right">物理</th><th style="text-align:right">化学</th></tr>
      ${comprehensionTrend.map(t => `<tr><td>${t.period}</td><td style="text-align:right">${t.english}</td><td style="text-align:right">${t.math}</td><td style="text-align:right">${t.japanese}</td><td style="text-align:right">${t.physics}</td><td style="text-align:right">${t.chemistry}</td></tr>`).join('')}
    </table>
    <p class="section-intro">全科目で上昇傾向にあり、特に英語（+13）の伸びが顕著です。物理（+10）も着実に伸びていますが、他科目より水準が低いため引き続き重点強化が必要です。</p>

    <div class="page-break"></div>

    <h2>AI推奨教材</h2>
    <p class="section-intro">あなたの弱点・志望校の出題傾向を分析し、AIが選定した推奨教材です。</p>
    ${materials.map(m => `<div class="factor-card" style="background:#ecfdf5;border:1px solid #a7f3d0;">
      <div class="factor-title">${m.title} <span class="badge badge-low">マッチ度 ${m.matchRate}%</span></div>
      <div style="font-size:11px;color:#047857;margin-bottom:4px;">${m.subject} / ${m.type}</div>
      <div class="factor-desc">${m.description}</div>
    </div>`).join('')}

    <h2>今後の学習方針（提案）</h2>
    <div class="action-item"><div class="action-num" style="background:#ecfdf5;color:#047857;">1</div><div><strong>物理・数学IIBの基礎固め</strong><br><span style="font-size:12px;color:#475569;">理解度が65%以下の分野は、応用問題に進む前に基礎問題集を1周してください。目安は2週間です。</span></div></div>
    <div class="action-item"><div class="action-num" style="background:#ecfdf5;color:#047857;">2</div><div><strong>英語は過去問演習へ</strong><br><span style="font-size:12px;color:#475569;">偏差値72.8と十分な水準です。早稲田商学部の過去問を週1題ペースで進め、出題傾向に慣れましょう。</span></div></div>
    <div class="action-item"><div class="action-num" style="background:#ecfdf5;color:#047857;">3</div><div><strong>タスク完了率を85%以上に</strong><br><span style="font-size:12px;color:#475569;">現在の平均完了率${avgProgress}%を85%以上に引き上げることが、確実な成績向上につながります。</span></div></div>

    <div class="footer">
      <span>浜学園 AI学習サポート | 自己分析レポート</span>
      <span>${date}</span>
    </div>
  </body></html>`;
}

function generateTeacherReport(styles: string, date: string, completedTasks: number, avgProgress: number, weeklyHours: number): string {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>面談用レポート</title>${styles}</head><body>
    <div class="header">
      <div class="org" style="color:#10b981;">浜学園 AI学習サポート</div>
      <h1>面談用 学習状況レポート</h1>
      <p class="subtitle">生徒: ${studentProfile.name} | ${studentProfile.targetSchool} ${studentProfile.targetDepartment} 志望（${studentProfile.entranceMethod}）</p>
      <p class="date">${date} 作成</p>
      <span class="confidential" style="background:#ecfdf5;color:#047857;">面談資料</span>
    </div>

    <h2>生徒サマリー</h2>
    <div class="stat-grid stat-grid-4">
      <div class="stat-item"><div class="stat-value">${studentProfile.currentDeviation}</div><div class="stat-sub">目標 ${studentProfile.targetDeviation}</div><div class="stat-label">現在偏差値</div></div>
      <div class="stat-item"><div class="stat-value positive">${studentProfile.streak}<span style="font-size:13px;">日</span></div><div class="stat-label">連続学習</div></div>
      <div class="stat-item"><div class="stat-value">${avgProgress}<span style="font-size:13px;">%</span></div><div class="stat-label">平均完了率</div></div>
      <div class="stat-item"><div class="stat-value">${studentProfile.daysUntilExam}<span style="font-size:13px;">日</span></div><div class="stat-label">受験まで</div></div>
    </div>
    <div class="summary-box" style="background:#ecfdf5;border-left:4px solid #10b981;">
      <strong>総合所見:</strong> 学習習慣は${studentProfile.streak}日連続学習と良好に定着。偏差値は目標まであと${(studentProfile.targetDeviation - studentProfile.currentDeviation).toFixed(1)}ポイント。英語が得意科目として牽引しているが、物理・数学IIBの底上げが合格の鍵。週${weeklyHours.toFixed(1)}時間の学習計画に対し、完了率${avgProgress}%はやや改善余地あり。
    </div>

    <h2>科目別偏差値と評価</h2>
    ${buildSubjectGapChart()}
    <table>
      <tr><th>科目</th><th style="text-align:right">現在</th><th style="text-align:right">目標</th><th style="text-align:right">差</th><th>判定</th><th>指導方針</th></tr>
      ${subjectGaps.map(s => `<tr>
        <td><strong>${s.subject}</strong></td><td style="text-align:right">${s.current}</td><td style="text-align:right">${s.target}</td>
        <td style="text-align:right" class="${s.gap > 0 ? 'positive' : ''}">${s.gap > 0 ? '+' : ''}${s.gap}</td>
        <td>${s.gap > 5 ? '<span class="badge badge-high">要対策</span>' : s.gap > 0 ? '<span class="badge badge-medium">要強化</span>' : '<span class="badge badge-low">順調</span>'}</td>
        <td style="font-size:11px;">${s.gap > 5 ? '基礎から再構築、週2回の補習推奨' : s.gap > 0 ? '演習量の増加、弱点単元の集中対策' : '現行ペース維持、過去問演習へ移行'}</td>
      </tr>`).join('')}
    </table>

    <h2>分野別理解度</h2>
    ${buildComprehensionRadar()}
    <table>
      <tr><th>分野</th><th style="text-align:right">理解度</th><th>レベル</th><th>推奨アクション</th></tr>
      ${comprehensionRadar.map(c => `<tr><td>${c.area}</td><td style="text-align:right">${c.score}%</td>
        <td>${c.score >= 80 ? '<span class="badge badge-low">良好</span>' : c.score >= 70 ? '<span class="badge badge-medium">要強化</span>' : '<span class="badge badge-high">重点</span>'}</td>
        <td style="font-size:11px;">${c.score >= 80 ? '応用・発展問題に取り組ませる' : c.score >= 70 ? '標準問題の反復で定着させる' : '基礎問題に立ち返り、概念理解を確認'}</td></tr>`).join('')}
    </table>

    <h2>模試偏差値の推移</h2>
    ${buildStudentTrendChart()}
    <table>
      <tr><th>時期</th><th style="text-align:right">英語</th><th style="text-align:right">数学</th><th style="text-align:right">国語</th><th style="text-align:right">物理</th><th style="text-align:right">化学</th></tr>
      ${comprehensionTrend.map(t => `<tr><td>${t.period}</td><td style="text-align:right">${t.english}</td><td style="text-align:right">${t.math}</td><td style="text-align:right">${t.japanese}</td><td style="text-align:right">${t.physics}</td><td style="text-align:right">${t.chemistry}</td></tr>`).join('')}
    </table>
    <p class="section-intro">全科目上昇傾向。英語+13、国語+10が特に良好。物理は+10だが水準が低い（50→60）ため、12月模試で65到達を目標に指導を強化。</p>

    <h2>タスク完了率の推移</h2>
    ${buildWeeklyProgressChart()}
    <table>
      <tr><th>週</th>${weeklyProgress.map(w => `<th style="text-align:center">${w.week}</th>`).join('')}<th style="text-align:center">平均</th></tr>
      <tr><td><strong>完了率</strong></td>${weeklyProgress.map(w => `<td style="text-align:center" class="${w.rate >= 85 ? 'positive' : w.rate < 75 ? 'negative' : ''}">${w.rate}%</td>`).join('')}<td style="text-align:center"><strong>${avgProgress}%</strong></td></tr>
    </table>
    <p class="section-intro">第4週（68%）に大きく落ち込みあり。本人確認の上、原因を特定する必要あり。</p>

    <h2>面談での確認・検討事項</h2>
    <div class="factor-card" style="background:#fffbeb;border:1px solid #fde68a;">
      <div style="font-size:12.5px;line-height:2;">
        <p><strong>1. 物理の学習方法の見直し</strong> — 偏差値58.6、理解度60%以下。現在の学習法が合っていない可能性。「物理のエッセンス」への切り替えを提案。</p>
        <p><strong>2. 数学IIBの弱点特定</strong> — 理解度62%。微分積分のどの段階でつまずいているか確認し、ピンポイントで対策。</p>
        <p><strong>3. 第4週の完了率低下</strong> — 68%に落ち込んだ原因（体調？モチベーション？量の問題？）を確認。</p>
        <p><strong>4. 中期目標の設定</strong> — 12月模試での各科目目標偏差値を本人と合意し、逆算スケジュールを策定。</p>
        <p><strong>5. 英語の得意科目戦略</strong> — 偏差値72.8を武器に、早稲田商学部の英語で高得点を狙う戦略を共有。</p>
      </div>
    </div>

    <div style="margin-top:24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
      <h3 style="margin:0 0 8px;font-size:12px;">面談メモ欄</h3>
      <div style="min-height:100px;border:1px dashed #cbd5e1;border-radius:4px;padding:8px;font-size:11px;color:#94a3b8;">
        面談内容をここに記入してください
      </div>
      <div style="margin-top:12px;display:flex;gap:16px;font-size:11px;color:#64748b;">
        <span>面談日: ____年____月____日</span>
        <span>担当: _______________</span>
        <span>次回面談: ____年____月____日</span>
      </div>
    </div>

    <div class="footer">
      <span>浜学園 AI学習サポート | 面談用レポート</span>
      <span>${date}</span>
    </div>
  </body></html>`;
}

function generateStudentParentReport(styles: string, date: string, avgProgress: number, weeklyHours: number): string {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>保護者向けレポート</title>${styles}
  <style>
    h2 { border-color: #8b5cf6; color: #6d28d9; }
    th { background: #f5f3ff; color: #6d28d9; border-bottom: 2px solid #c4b5fd; }
  </style></head><body>
    <div class="header">
      <div class="org" style="color:#8b5cf6;">浜学園 AI学習サポート</div>
      <h1>学習状況のご報告</h1>
      <p class="subtitle">${studentProfile.name}さんの学習状況について</p>
      <p class="date">${date}</p>
    </div>

    <p>${studentProfile.name}さんの保護者様</p>
    <p>いつも浜学園の教育活動にご理解とご協力を賜り、ありがとうございます。${studentProfile.name}さんの最近の学習状況についてご報告いたします。</p>

    <h2>学習の概要</h2>
    <div class="stat-grid stat-grid-4">
      <div class="stat-item"><div class="stat-value">${studentProfile.currentDeviation}</div><div class="stat-sub">目標 ${studentProfile.targetDeviation}</div><div class="stat-label">現在偏差値</div></div>
      <div class="stat-item"><div class="stat-value positive">${studentProfile.streak}<span style="font-size:13px;">日</span></div><div class="stat-label">連続学習日数</div></div>
      <div class="stat-item"><div class="stat-value">${weeklyHours.toFixed(1)}<span style="font-size:13px;">h</span></div><div class="stat-label">週間学習時間</div></div>
      <div class="stat-item"><div class="stat-value">${studentProfile.daysUntilExam}<span style="font-size:13px;">日</span></div><div class="stat-label">受験まで</div></div>
    </div>

    <div class="summary-box" style="background:#f5f3ff;border-left:4px solid #8b5cf6;">
      <strong>${studentProfile.streak}日間連続で毎日学習に取り組んでおり、学習習慣がしっかりと定着しています。</strong>これは受験においてとても重要な基盤です。保護者の皆様の日々のサポートの賜物と存じます。
    </div>

    <h2>科目別の状況</h2>
    <table>
      <tr><th>科目</th><th style="text-align:right">偏差値</th><th style="text-align:right">目標</th><th>達成状況</th><th>コメント</th></tr>
      ${subjectGaps.map(s => `<tr><td><strong>${s.subject}</strong></td><td style="text-align:right">${s.current}</td><td style="text-align:right">${s.target}</td>
        <td>${s.gap <= 0 ? '🟢 目標超' : s.gap <= 5 ? '🟡 あと少し' : '🔴 要努力'}</td>
        <td style="font-size:11px;">${s.gap <= 0 ? 'この調子で頑張っています' : s.gap <= 5 ? 'もう少しで目標に届きます' : '重点的に取り組んでいます'}</td></tr>`).join('')}
    </table>

    <h2>模試成績の推移</h2>
    <p class="section-intro">4月から12月にかけて、全科目で着実に成績が向上しています。</p>
    ${buildStudentTrendChart()}
    <table>
      <tr><th>時期</th><th style="text-align:right">英語</th><th style="text-align:right">数学</th><th style="text-align:right">国語</th><th style="text-align:right">物理</th><th style="text-align:right">化学</th></tr>
      ${comprehensionTrend.map(t => `<tr><td>${t.period}</td><td style="text-align:right">${t.english}</td><td style="text-align:right">${t.math}</td><td style="text-align:right">${t.japanese}</td><td style="text-align:right">${t.physics}</td><td style="text-align:right">${t.chemistry}</td></tr>`).join('')}
    </table>
    <p class="section-intro">英語は+13、国語は+10と大きく伸びています。物理・化学も着実に上昇しており、全体として良い方向に進んでいます。</p>

    <h2>頑張っている点</h2>
    <div class="factor-card" style="background:#ecfdf5;border:1px solid #a7f3d0;">
      <div style="font-size:12.5px;line-height:2;">
        <p>🌟 <strong>${studentProfile.streak}日間連続</strong>で毎日学習に取り組んでいます。素晴らしい継続力です。</p>
        <p>🌟 <strong>英語は偏差値72.8</strong>と、志望校のレベルを十分に上回っています。</p>
        <p>🌟 週${weeklyHours.toFixed(1)}時間の学習計画を立て、平均<strong>${avgProgress}%の完了率</strong>で実行しています。</p>
        <p>🌟 AI学習アシスタントを活用して、自分で調べて理解する力が身についてきています。</p>
      </div>
    </div>

    <h2>今後の取り組み</h2>
    <div class="factor-card" style="background:#f5f3ff;border:1px solid #c4b5fd;">
      <div style="font-size:12.5px;line-height:2;">
        <p><strong>1. 物理の基礎強化</strong> — 現在最も伸びしろがある科目です。基礎的な参考書を用いて、概念理解から丁寧に取り組みます。</p>
        <p><strong>2. 数学IIBの弱点克服</strong> — 微分積分の分野を集中的に強化します。AIが個別に最適な練習問題を提案しています。</p>
        <p><strong>3. 12月模試に向けた総仕上げ</strong> — 各科目の到達目標を設定し、逆算スケジュールで取り組みます。</p>
      </div>
    </div>

    <h2>ご家庭へのお願い</h2>
    <div class="factor-card" style="background:#fefce8;border:1px solid #fde68a;">
      <div style="font-size:12.5px;line-height:2;">
        <p>📝 <strong>学習習慣の継続サポート</strong> — ${studentProfile.streak}日連続の学習は大きな財産です。「今日も頑張ったね」のひとことが、お子様の大きな励みになります。</p>
        <p>📝 <strong>生活リズムの維持</strong> — 受験まであと${studentProfile.daysUntilExam}日です。十分な睡眠と栄養バランスの取れた食事が学習効率を支えます。</p>
        <p>📝 <strong>結果よりもプロセスを</strong> — 模試の結果に一喜一憂するのではなく、日々の積み重ねを認めていただけますと幸いです。</p>
      </div>
    </div>

    <p style="margin-top:24px;">${studentProfile.name}さんは、志望校合格に向けて着実に力をつけています。教職員一同、引き続き全力でサポートしてまいります。ご不明な点がございましたら、お気軽にご連絡ください。</p>

    <div style="margin-top:32px;text-align:right;font-size:13px;">
      <p>浜学園</p>
      <p style="color:#64748b;font-size:12px;">担任: _______________</p>
    </div>

    <div style="margin-top:24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:11px;color:#64748b;">
      <strong>次回面談予定:</strong> ____年____月____日（____）____:____〜<br>
      ※ ご都合が合わない場合は、担任までご連絡ください。
    </div>

    <div class="footer">
      <span>浜学園 AI学習サポート</span>
      <span>${date}</span>
    </div>
  </body></html>`;
}
