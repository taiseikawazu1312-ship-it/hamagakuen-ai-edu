// Dashboard Report Content

import {
  yearlyComparison,
  scoreDistribution,
  classComparison,
  unitScores,
  aiFactors,
  aiSummary,
  aiProposalSummary,
  proposals,
  interventionEffects,
} from "./demo-data";

export function generateDashboardReport(type: "summary" | "detailed" | "parent"): string {
  const now = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });

  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Noto Sans JP', sans-serif; color: #1e293b; line-height: 1.7; padding: 40px; max-width: 800px; margin: 0 auto; }
      h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1e293b; }
      h2 { font-size: 16px; font-weight: 700; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 2px solid #2563eb; color: #2563eb; }
      h3 { font-size: 14px; font-weight: 600; margin: 16px 0 8px; color: #1e293b; }
      p { font-size: 13px; margin-bottom: 8px; }
      .header { text-align: center; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
      .header .subtitle { color: #64748b; font-size: 13px; }
      .header .date { color: #64748b; font-size: 12px; margin-top: 4px; }
      .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
      .badge-high { background: #fef2f2; color: #dc2626; }
      .badge-medium { background: #fffbeb; color: #d97706; }
      .badge-low { background: #f0fdf4; color: #16a34a; }
      table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px; }
      th { background: #f8fafc; text-align: left; padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #64748b; }
      td { padding: 8px 12px; border: 1px solid #e2e8f0; }
      .negative { color: #dc2626; font-weight: 600; }
      .positive { color: #16a34a; font-weight: 600; }
      .factor-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin: 8px 0; }
      .factor-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
      .factor-desc { font-size: 12px; color: #64748b; }
      .proposal-card { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin: 8px 0; }
      .summary-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 13px; }
      .stat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; margin: 16px 0; }
      .stat-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center; }
      .stat-value { font-size: 20px; font-weight: 700; color: #1e293b; }
      .stat-label { font-size: 11px; color: #64748b; margin-top: 4px; }
      .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 11px; }
      @media print { body { padding: 20px; } .no-print { display: none; } }
    </style>
  `;

  if (type === "summary") return generateSummaryReport(styles, now);
  if (type === "detailed") return generateDetailedReport(styles, now);
  return generateParentReport(styles, now);
}

function generateSummaryReport(styles: string, date: string): string {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>サマリーレポート</title>${styles}</head><body>
    <div class="header">
      <h1>成績分析 サマリーレポート</h1>
      <p class="subtitle">2024年度 2学期 中間テスト</p>
      <p class="date">${date} 作成 | 浜学園 AI教育プラットフォーム</p>
    </div>

    <div class="stat-grid">
      <div class="stat-item"><div class="stat-value">61.2</div><div class="stat-label">全体平均（点）</div></div>
      <div class="stat-item"><div class="stat-value negative">-2.6%</div><div class="stat-label">前年比</div></div>
      <div class="stat-item"><div class="stat-value">87.3</div><div class="stat-label">上位10%平均</div></div>
      <div class="stat-item"><div class="stat-value">55.6</div><div class="stat-label">中位層平均</div></div>
    </div>

    <h2>クラス別成績</h2>
    <table>
      <tr><th>クラス</th><th>平均点</th><th>前年比</th></tr>
      ${classComparison.map(r => `<tr><td>${r.class}</td><td>${r.平均点}点</td><td class="${r.前年比 < -3 ? 'negative' : r.前年比 < 0 ? '' : 'positive'}">${r.前年比 > 0 ? '+' : ''}${r.前年比}点</td></tr>`).join('')}
    </table>

    <h2>AI総合診断</h2>
    <div class="summary-box">${aiSummary.replace(/\n\n/g, '<br><br>').replace(/【([^】]+)】/g, '<strong>$1</strong>')}</div>

    <h2>最優先施策</h2>
    <div class="proposal-card">
      <div class="factor-title">1. ${proposals[0].title}</div>
      <div class="factor-desc">${proposals[0].description}</div>
      <p style="margin-top:8px;font-size:12px;"><strong>対象:</strong> ${proposals[0].target} | <strong>期待効果:</strong> ${proposals[0].expectedImpact}</p>
    </div>

    <div class="footer">浜学園 AI教育プラットフォーム | AI Generated Report</div>
  </body></html>`;
}

function generateDetailedReport(styles: string, date: string): string {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>詳細分析レポート</title>${styles}</head><body>
    <div class="header">
      <h1>成績 詳細分析レポート</h1>
      <p class="subtitle">2024年度 2学期 中間テスト</p>
      <p class="date">${date} 作成 | 浜学園 AI教育プラットフォーム</p>
    </div>

    <h2>1. 全体概要</h2>
    <div class="stat-grid">
      <div class="stat-item"><div class="stat-value">61.2</div><div class="stat-label">全体平均（点）</div></div>
      <div class="stat-item"><div class="stat-value negative">-2.6%</div><div class="stat-label">前年比</div></div>
      <div class="stat-item"><div class="stat-value">87.3</div><div class="stat-label">上位10%平均</div></div>
      <div class="stat-item"><div class="stat-value">31.5</div><div class="stat-label">下位10%平均</div></div>
    </div>

    <h2>2. 年度別推移</h2>
    <table>
      <tr><th>年度</th><th>平均点</th><th>上位10%</th><th>中位</th><th>下位10%</th></tr>
      ${yearlyComparison.map(r => `<tr><td>${r.year}</td><td>${r.平均点}</td><td>${r['上位10%']}</td><td>${r.中位}</td><td>${r['下位10%']}</td></tr>`).join('')}
    </table>

    <h2>3. 得点分布（前年比較）</h2>
    <table>
      <tr><th>得点帯</th><th>今年度（人）</th><th>前年度（人）</th><th>増減</th></tr>
      ${scoreDistribution.map(r => `<tr><td>${r.range}</td><td>${r.今年度}</td><td>${r.前年度}</td><td class="${r.今年度 - r.前年度 > 0 ? 'negative' : 'positive'}">${r.今年度 - r.前年度 > 0 ? '+' : ''}${r.今年度 - r.前年度}</td></tr>`).join('')}
    </table>

    <h2>4. クラス別成績</h2>
    <table>
      <tr><th>クラス</th><th>平均点</th><th>前年比</th></tr>
      ${classComparison.map(r => `<tr><td>${r.class}</td><td>${r.平均点}点</td><td class="${r.前年比 < -3 ? 'negative' : ''}">${r.前年比 > 0 ? '+' : ''}${r.前年比}点</td></tr>`).join('')}
    </table>

    <h2>5. 単元別正答率</h2>
    <table>
      <tr><th>単元</th><th>今年度</th><th>過去平均</th><th>差分</th></tr>
      ${unitScores.map(r => `<tr><td>${r.unit}</td><td>${r.今年度正答率}%</td><td>${r.過去平均正答率}%</td><td class="${r.diff <= -8 ? 'negative' : ''}">${r.diff > 0 ? '+' : ''}${r.diff}%</td></tr>`).join('')}
    </table>

    <h2>6. AI要因分析</h2>
    <h3>成績下降の主要因</h3>
    ${aiFactors.negative.map(f => `<div class="factor-card"><div class="factor-title">${f.id}. ${f.title} <span class="badge ${f.severity === '高' ? 'badge-high' : 'badge-medium'}">重要度: ${f.severity}</span></div><div class="factor-desc">${f.description}</div></div>`).join('')}

    <h3>良好な傾向</h3>
    ${aiFactors.positive.map(f => `<div class="factor-card" style="border-color:#bbf7d0;background:#f0fdf4;"><div class="factor-title">${f.title}</div><div class="factor-desc">${f.description}</div></div>`).join('')}

    <h2>7. AI総合診断</h2>
    <div class="summary-box">${aiSummary.replace(/\n\n/g, '<br><br>').replace(/【([^】]+)】/g, '<strong>$1</strong>')}</div>

    <h2>8. 施策提案</h2>
    ${proposals.map((p, i) => `<div class="proposal-card"><div class="factor-title">${i + 1}. ${p.title} <span class="badge ${p.effort === '高' ? 'badge-high' : p.effort === '中' ? 'badge-medium' : 'badge-low'}">工数: ${p.effort}</span></div><div class="factor-desc">${p.description}</div><p style="margin-top:8px;font-size:12px;"><strong>対象:</strong> ${p.target} | <strong>期待効果:</strong> ${p.expectedImpact}</p></div>`).join('')}

    <h2>9. 施策効果の測定（過去実績）</h2>
    <table>
      <tr><th>期間</th><th>施策</th><th>効果</th></tr>
      ${interventionEffects.map(e => `<tr><td>${e.period}</td><td>${e.intervention}</td><td class="${e.positive ? 'positive' : 'negative'}">${e.impact}</td></tr>`).join('')}
    </table>

    <div class="footer">浜学園 AI教育プラットフォーム | AI Generated Detailed Report</div>
  </body></html>`;
}

function generateParentReport(styles: string, date: string): string {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>保護者向けレポート</title>${styles}</head><body>
    <div class="header">
      <h1>学習状況のご報告</h1>
      <p class="subtitle">2024年度 2学期 中間テスト結果について</p>
      <p class="date">${date} | 浜学園</p>
    </div>

    <p>保護者様</p>
    <p>日頃より浜学園の教育活動にご理解・ご協力を賜り、誠にありがとうございます。2024年度2学期中間テストの結果についてご報告いたします。</p>

    <h2>全体の成績概要</h2>
    <div class="stat-grid">
      <div class="stat-item"><div class="stat-value">61.2</div><div class="stat-label">学年平均（点）</div></div>
      <div class="stat-item"><div class="stat-value negative">-2.6%</div><div class="stat-label">前年比</div></div>
      <div class="stat-item"><div class="stat-value positive">+16点</div><div class="stat-label">入学時からの伸長</div></div>
      <div class="stat-item"><div class="stat-value">54.8</div><div class="stat-label">偏差値</div></div>
    </div>

    <h2>クラス別の状況</h2>
    <table>
      <tr><th>クラス</th><th>平均点</th><th>前年比</th></tr>
      ${classComparison.map(r => `<tr><td>${r.class}</td><td>${r.平均点}点</td><td>${r.前年比 > 0 ? '+' : ''}${r.前年比}点</td></tr>`).join('')}
    </table>

    <h2>今後の取り組み</h2>
    <p>テスト結果の分析に基づき、以下の取り組みを計画しております。</p>
    ${proposals.map((p, i) => `<div class="factor-card"><div class="factor-title">${i + 1}. ${p.title}</div><div class="factor-desc">${p.description}</div></div>`).join('')}

    <h2>ご家庭へのお願い</h2>
    <div class="summary-box">
      <p>・日々の計算ドリルの継続をお願いいたします（毎日15分程度）</p>
      <p>・テスト結果を叱るのではなく、努力の過程を褒めていただけますと、学習意欲の維持につながります</p>
      <p>・ご不明な点がございましたら、お気軽に面談をお申し付けください</p>
    </div>

    <p style="margin-top:24px;">今後とも、お子様の学力向上に向けて全力で取り組んでまいります。ご不明な点やご要望がございましたら、お気軽にお問い合わせください。</p>

    <div class="footer">浜学園 AI教育プラットフォーム</div>
  </body></html>`;
}

// Student Report Content

import {
  studentProfile,
  subjectGaps,
  todaysTasks,
  comprehensionRadar,
  weeklyProgress,
  materials,
} from "./student-data";

export function generateStudentReport(type: "self" | "teacher" | "parent"): string {
  const now = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });

  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Noto Sans JP', sans-serif; color: #1e293b; line-height: 1.7; padding: 40px; max-width: 800px; margin: 0 auto; }
      h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
      h2 { font-size: 16px; font-weight: 700; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 2px solid #10b981; color: #10b981; }
      p { font-size: 13px; margin-bottom: 8px; }
      .header { text-align: center; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
      .subtitle { color: #64748b; font-size: 13px; }
      .date { color: #64748b; font-size: 12px; margin-top: 4px; }
      table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px; }
      th { background: #f8fafc; text-align: left; padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #64748b; }
      td { padding: 8px 12px; border: 1px solid #e2e8f0; }
      .negative { color: #dc2626; font-weight: 600; }
      .positive { color: #16a34a; font-weight: 600; }
      .stat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; margin: 16px 0; }
      .stat-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center; }
      .stat-value { font-size: 20px; font-weight: 700; }
      .stat-label { font-size: 11px; color: #64748b; margin-top: 4px; }
      .info-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 13px; }
      .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin: 8px 0; }
      .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 11px; }
      @media print { body { padding: 20px; } }
    </style>
  `;

  const completedTasks = todaysTasks.filter(t => t.completed).length;

  if (type === "self") {
    return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>自己分析レポート</title>${styles}</head><body>
      <div class="header">
        <h1>自己分析レポート</h1>
        <p class="subtitle">${studentProfile.name} | ${studentProfile.targetSchool} ${studentProfile.targetDepartment} 志望</p>
        <p class="date">${now} 作成</p>
      </div>

      <h2>基本情報</h2>
      <div class="stat-grid">
        <div class="stat-item"><div class="stat-value">${studentProfile.currentDeviation}</div><div class="stat-label">現在偏差値</div></div>
        <div class="stat-item"><div class="stat-value">${studentProfile.targetDeviation}</div><div class="stat-label">目標偏差値</div></div>
        <div class="stat-item"><div class="stat-value">${studentProfile.daysUntilExam}</div><div class="stat-label">受験まで（日）</div></div>
        <div class="stat-item"><div class="stat-value">${studentProfile.streak}日</div><div class="stat-label">連続学習日数</div></div>
      </div>

      <h2>科目別ギャップ分析</h2>
      <table>
        <tr><th>科目</th><th>現在偏差値</th><th>目標偏差値</th><th>ギャップ</th></tr>
        ${subjectGaps.map(s => `<tr><td>${s.subject}</td><td>${s.current}</td><td>${s.target}</td><td class="${s.gap > 0 ? 'positive' : s.gap < -5 ? 'negative' : ''}">${s.gap > 0 ? '+' : ''}${s.gap}</td></tr>`).join('')}
      </table>

      <h2>分野別理解度</h2>
      <table>
        <tr><th>分野</th><th>理解度</th><th>判定</th></tr>
        ${comprehensionRadar.map(c => `<tr><td>${c.area}</td><td>${c.score}%</td><td>${c.score >= 80 ? '✅ 良好' : c.score >= 70 ? '⚠️ 要強化' : '❌ 重点対策'}</td></tr>`).join('')}
      </table>

      <h2>推奨教材</h2>
      ${materials.map(m => `<div class="card"><strong>${m.title}</strong>（${m.subject} / ${m.type}）<br><span style="font-size:12px;color:#64748b;">${m.description}</span></div>`).join('')}

      <div class="footer">浜学園 AI学習サポート | 自己分析レポート</div>
    </body></html>`;
  }

  if (type === "teacher") {
    return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>面談用レポート</title>${styles}</head><body>
      <div class="header">
        <h1>面談用 学習状況レポート</h1>
        <p class="subtitle">生徒: ${studentProfile.name} | ${studentProfile.targetSchool} ${studentProfile.targetDepartment} 志望</p>
        <p class="date">${now} 作成</p>
      </div>

      <h2>生徒概要</h2>
      <div class="stat-grid">
        <div class="stat-item"><div class="stat-value">${studentProfile.currentDeviation}</div><div class="stat-label">現在偏差値</div></div>
        <div class="stat-item"><div class="stat-value">${studentProfile.targetDeviation}</div><div class="stat-label">目標偏差値</div></div>
        <div class="stat-item"><div class="stat-value">${studentProfile.streak}日</div><div class="stat-label">連続学習</div></div>
        <div class="stat-item"><div class="stat-value">${completedTasks}/${todaysTasks.length}</div><div class="stat-label">本日タスク完了</div></div>
      </div>

      <h2>科目別偏差値</h2>
      <table>
        <tr><th>科目</th><th>現在</th><th>目標</th><th>ギャップ</th><th>所見</th></tr>
        ${subjectGaps.map(s => `<tr><td>${s.subject}</td><td>${s.current}</td><td>${s.target}</td><td class="${s.gap > 0 ? 'positive' : s.gap < -5 ? 'negative' : ''}">${s.gap > 0 ? '+' : ''}${s.gap}</td><td style="font-size:11px;">${s.gap > 0 ? '目標達成圏内' : s.gap > -5 ? '要フォロー' : '重点対策必要'}</td></tr>`).join('')}
      </table>

      <h2>理解度分析</h2>
      <table>
        <tr><th>分野</th><th>理解度</th><th>判定</th></tr>
        ${comprehensionRadar.map(c => `<tr><td>${c.area}</td><td>${c.score}%</td><td>${c.score >= 80 ? '良好' : c.score >= 70 ? '要強化' : '重点対策'}</td></tr>`).join('')}
      </table>

      <h2>週次タスク完了率推移</h2>
      <table>
        <tr><th>週</th><th>完了率</th></tr>
        ${weeklyProgress.map(w => `<tr><td>${w.week}</td><td>${w.rate}%</td></tr>`).join('')}
      </table>

      <h2>面談での確認ポイント</h2>
      <div class="info-box">
        <p>• 物理（偏差値58.6）と数学IIB（理解度62%）が重点改善対象</p>
        <p>• 英語は偏差値72.8と良好。得意科目としてさらに伸ばす方向を確認</p>
        <p>• 連続学習${studentProfile.streak}日と学習習慣は定着。質の向上を検討</p>
        <p>• 受験まで${studentProfile.daysUntilExam}日。中期目標の設定を提案</p>
      </div>

      <div class="footer">浜学園 AI学習サポート | 面談用レポート</div>
    </body></html>`;
  }

  // parent report
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>保護者向けレポート</title>${styles}</head><body>
    <div class="header">
      <h1>学習状況のご報告</h1>
      <p class="subtitle">${studentProfile.name}さんの学習状況について</p>
      <p class="date">${now} | 浜学園 AI学習サポート</p>
    </div>

    <p>保護者様</p>
    <p>日頃より浜学園の教育活動にご理解・ご協力を賜り、誠にありがとうございます。${studentProfile.name}さんの最近の学習状況についてご報告いたします。</p>

    <h2>学習状況の概要</h2>
    <div class="stat-grid">
      <div class="stat-item"><div class="stat-value">${studentProfile.currentDeviation}</div><div class="stat-label">現在偏差値</div></div>
      <div class="stat-item"><div class="stat-value">${studentProfile.targetDeviation}</div><div class="stat-label">目標偏差値</div></div>
      <div class="stat-item"><div class="stat-value positive">${studentProfile.streak}日</div><div class="stat-label">連続学習日数</div></div>
      <div class="stat-item"><div class="stat-value">18.5h</div><div class="stat-label">今週の学習時間</div></div>
    </div>

    <h2>科目別の状況</h2>
    <table>
      <tr><th>科目</th><th>現在偏差値</th><th>目標</th><th>状況</th></tr>
      ${subjectGaps.map(s => `<tr><td>${s.subject}</td><td>${s.current}</td><td>${s.target}</td><td>${s.gap > 0 ? '🟢 順調' : s.gap > -5 ? '🟡 もう少し' : '🔴 要努力'}</td></tr>`).join('')}
    </table>

    <h2>最近の取り組み</h2>
    <div class="info-box">
      <p>• ${studentProfile.streak}日間連続で学習に取り組んでおり、学習習慣がしっかりと定着しています</p>
      <p>• 英語は偏差値72.8と目標を上回っており、大変よく頑張っています</p>
      <p>• 物理と数学IIBを重点的に強化するため、AIが最適な教材と学習プランを提案しています</p>
      <p>• 志望校（${studentProfile.targetSchool} ${studentProfile.targetDepartment}）の合格に向けて着実に前進しています</p>
    </div>

    <h2>ご家庭でのサポートのお願い</h2>
    <div class="card">
      <p>• 毎日の学習継続を温かく見守っていただけますと幸いです</p>
      <p>• 受験まであと${studentProfile.daysUntilExam}日です。規則正しい生活リズムの維持にご協力ください</p>
      <p>• ご不明な点や気になることがございましたら、いつでもご相談ください</p>
    </div>

    <div class="footer">浜学園 AI学習サポート | 保護者向けレポート</div>
  </body></html>`;
}
