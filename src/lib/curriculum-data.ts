// 高校カリキュラム単元定義（理系・大学受験向け）

export interface CurriculumUnit {
  id: string;
  name: string;
  importance: 1 | 2 | 3; // 1=基礎, 2=標準, 3=発展
  examFrequency: "high" | "medium" | "low";
}

export interface CurriculumSection {
  id: string;
  name: string;
  units: CurriculumUnit[];
}

export interface CurriculumSubject {
  subjectId: string;
  subjectName: string;
  color: string;
  sections: CurriculumSection[];
}

export const curriculum: CurriculumSubject[] = [
  {
    subjectId: "math", subjectName: "数学", color: "#8B5CF6",
    sections: [
      { id: "math-ia-num", name: "数と式", units: [
        { id: "m1", name: "展開と因数分解", importance: 1, examFrequency: "high" },
        { id: "m2", name: "実数・絶対値・平方根", importance: 1, examFrequency: "medium" },
        { id: "m3", name: "一次不等式", importance: 1, examFrequency: "medium" },
      ]},
      { id: "math-ia-logic", name: "集合と論理", units: [
        { id: "m4", name: "集合", importance: 1, examFrequency: "medium" },
        { id: "m5", name: "命題と条件・必要十分条件", importance: 2, examFrequency: "medium" },
      ]},
      { id: "math-ia-quad", name: "二次関数", units: [
        { id: "m6", name: "二次関数のグラフと最大最小", importance: 2, examFrequency: "high" },
        { id: "m7", name: "二次方程式・二次不等式", importance: 2, examFrequency: "high" },
      ]},
      { id: "math-ia-trig", name: "図形と計量", units: [
        { id: "m8", name: "三角比（sin/cos/tan）", importance: 1, examFrequency: "high" },
        { id: "m9", name: "正弦定理・余弦定理", importance: 2, examFrequency: "high" },
      ]},
      { id: "math-ia-data", name: "データの分析", units: [
        { id: "m10", name: "四分位数・分散・標準偏差", importance: 1, examFrequency: "medium" },
        { id: "m11", name: "相関係数・散布図", importance: 1, examFrequency: "medium" },
      ]},
      { id: "math-ia-prob", name: "場合の数と確率", units: [
        { id: "m12", name: "順列・組合せ", importance: 2, examFrequency: "high" },
        { id: "m13", name: "確率の基本・条件付き確率", importance: 2, examFrequency: "high" },
        { id: "m14", name: "期待値", importance: 2, examFrequency: "high" },
      ]},
      { id: "math-ia-int", name: "整数の性質", units: [
        { id: "m15", name: "約数・倍数・素因数分解", importance: 2, examFrequency: "medium" },
        { id: "m16", name: "ユークリッドの互除法・合同式", importance: 3, examFrequency: "medium" },
      ]},
      { id: "math-iib-proof", name: "式と証明", units: [
        { id: "m17", name: "二項定理", importance: 2, examFrequency: "medium" },
        { id: "m18", name: "等式・不等式の証明", importance: 2, examFrequency: "medium" },
      ]},
      { id: "math-iib-complex", name: "複素数と方程式", units: [
        { id: "m19", name: "複素数", importance: 2, examFrequency: "medium" },
        { id: "m20", name: "剰余の定理・因数定理", importance: 2, examFrequency: "high" },
        { id: "m21", name: "高次方程式", importance: 2, examFrequency: "medium" },
      ]},
      { id: "math-iib-coord", name: "図形と方程式", units: [
        { id: "m22", name: "直線・円の方程式", importance: 2, examFrequency: "high" },
        { id: "m23", name: "軌跡と領域", importance: 3, examFrequency: "medium" },
      ]},
      { id: "math-iib-trigfunc", name: "三角関数", units: [
        { id: "m24", name: "三角関数のグラフ・性質", importance: 2, examFrequency: "high" },
        { id: "m25", name: "加法定理・倍角・合成", importance: 2, examFrequency: "high" },
      ]},
      { id: "math-iib-exp", name: "指数・対数関数", units: [
        { id: "m26", name: "指数関数", importance: 2, examFrequency: "high" },
        { id: "m27", name: "対数関数・常用対数", importance: 2, examFrequency: "high" },
      ]},
      { id: "math-iib-diff2", name: "微分法（II）", units: [
        { id: "m28", name: "導関数と接線", importance: 2, examFrequency: "high" },
        { id: "m29", name: "関数の増減・極値・グラフ", importance: 2, examFrequency: "high" },
      ]},
      { id: "math-iib-int2", name: "積分法（II）", units: [
        { id: "m30", name: "不定積分・定積分", importance: 2, examFrequency: "high" },
        { id: "m31", name: "面積の計算", importance: 2, examFrequency: "high" },
      ]},
      { id: "math-iib-seq", name: "数列", units: [
        { id: "m32", name: "等差・等比数列", importance: 2, examFrequency: "high" },
        { id: "m33", name: "漸化式", importance: 3, examFrequency: "high" },
        { id: "m34", name: "数学的帰納法", importance: 3, examFrequency: "medium" },
      ]},
      { id: "math-iib-vec", name: "ベクトル", units: [
        { id: "m35", name: "平面ベクトル・内積", importance: 2, examFrequency: "high" },
        { id: "m36", name: "空間ベクトル", importance: 3, examFrequency: "high" },
      ]},
      { id: "math-iii-complx", name: "複素数平面", units: [
        { id: "m37", name: "複素数の極形式", importance: 3, examFrequency: "medium" },
        { id: "m38", name: "ド・モアブルの定理", importance: 3, examFrequency: "medium" },
      ]},
      { id: "math-iii-curve", name: "式と曲線", units: [
        { id: "m39", name: "2次曲線（楕円・双曲線・放物線）", importance: 3, examFrequency: "medium" },
        { id: "m40", name: "媒介変数表示・極座標", importance: 3, examFrequency: "medium" },
      ]},
      { id: "math-iii-limit", name: "関数と極限", units: [
        { id: "m41", name: "数列の極限", importance: 3, examFrequency: "high" },
        { id: "m42", name: "関数の極限・連続性", importance: 3, examFrequency: "high" },
      ]},
      { id: "math-iii-diff3", name: "微分法（III）", units: [
        { id: "m43", name: "合成関数・逆関数の微分", importance: 3, examFrequency: "high" },
        { id: "m44", name: "陰関数・媒介変数の微分", importance: 3, examFrequency: "medium" },
      ]},
      { id: "math-iii-int3", name: "積分法（III）", units: [
        { id: "m45", name: "置換積分・部分積分", importance: 3, examFrequency: "high" },
        { id: "m46", name: "面積・体積・区分求積法", importance: 3, examFrequency: "high" },
      ]},
    ],
  },
  {
    subjectId: "english", subjectName: "英語", color: "#3B82F6",
    sections: [
      { id: "eng-read", name: "長文読解", units: [
        { id: "e1", name: "評論文読解", importance: 2, examFrequency: "high" },
        { id: "e2", name: "物語・エッセイ読解", importance: 2, examFrequency: "high" },
        { id: "e3", name: "段落整序・要約", importance: 2, examFrequency: "high" },
        { id: "e4", name: "図表・グラフ読み取り", importance: 2, examFrequency: "high" },
      ]},
      { id: "eng-listen", name: "リスニング", units: [
        { id: "e5", name: "短文リスニング", importance: 1, examFrequency: "high" },
        { id: "e6", name: "長文リスニング", importance: 2, examFrequency: "high" },
        { id: "e7", name: "ディクテーション", importance: 2, examFrequency: "medium" },
      ]},
      { id: "eng-gram", name: "文法・語法", units: [
        { id: "e8", name: "時制（現在完了・過去完了等）", importance: 1, examFrequency: "high" },
        { id: "e9", name: "仮定法", importance: 2, examFrequency: "high" },
        { id: "e10", name: "関係詞（関係代名詞・関係副詞）", importance: 2, examFrequency: "high" },
        { id: "e11", name: "分詞構文", importance: 2, examFrequency: "medium" },
        { id: "e12", name: "比較", importance: 1, examFrequency: "medium" },
        { id: "e13", name: "語法・イディオム", importance: 1, examFrequency: "high" },
      ]},
      { id: "eng-vocab", name: "語彙", units: [
        { id: "e14", name: "入試頻出単語（2000語レベル）", importance: 1, examFrequency: "high" },
        { id: "e15", name: "多義語・派生語", importance: 2, examFrequency: "medium" },
      ]},
      { id: "eng-write", name: "英作文", units: [
        { id: "e16", name: "和文英訳", importance: 2, examFrequency: "high" },
        { id: "e17", name: "自由英作文", importance: 3, examFrequency: "high" },
      ]},
    ],
  },
  {
    subjectId: "japanese", subjectName: "国語", color: "#F97316",
    sections: [
      { id: "jpn-mod", name: "現代文", units: [
        { id: "j1", name: "評論読解", importance: 2, examFrequency: "high" },
        { id: "j2", name: "小説読解", importance: 2, examFrequency: "high" },
        { id: "j3", name: "随筆", importance: 1, examFrequency: "medium" },
        { id: "j4", name: "記述問題対策", importance: 3, examFrequency: "high" },
      ]},
      { id: "jpn-kobun", name: "古文", units: [
        { id: "j5", name: "用言活用（動詞・形容詞・形容動詞）", importance: 1, examFrequency: "high" },
        { id: "j6", name: "助動詞の識別と意味", importance: 2, examFrequency: "high" },
        { id: "j7", name: "敬語（尊敬・謙譲・丁寧）", importance: 2, examFrequency: "high" },
        { id: "j8", name: "古文読解", importance: 2, examFrequency: "high" },
        { id: "j9", name: "和歌の修辞法", importance: 2, examFrequency: "medium" },
      ]},
      { id: "jpn-kanbun", name: "漢文", units: [
        { id: "j10", name: "返り点・書き下し文", importance: 1, examFrequency: "high" },
        { id: "j11", name: "再読文字・句法", importance: 2, examFrequency: "high" },
        { id: "j12", name: "漢詩の形式", importance: 1, examFrequency: "medium" },
        { id: "j13", name: "漢文読解", importance: 2, examFrequency: "high" },
      ]},
    ],
  },
  {
    subjectId: "physics", subjectName: "物理", color: "#14B8A6",
    sections: [
      { id: "phy-mech", name: "力学", units: [
        { id: "p1", name: "等加速度直線運動", importance: 1, examFrequency: "high" },
        { id: "p2", name: "力のつり合い・作用反作用", importance: 1, examFrequency: "high" },
        { id: "p3", name: "運動方程式", importance: 2, examFrequency: "high" },
        { id: "p4", name: "仕事とエネルギー（力学的エネルギー保存）", importance: 2, examFrequency: "high" },
        { id: "p5", name: "運動量と力積・衝突", importance: 2, examFrequency: "high" },
        { id: "p6", name: "円運動・万有引力", importance: 3, examFrequency: "high" },
        { id: "p7", name: "単振動", importance: 3, examFrequency: "medium" },
      ]},
      { id: "phy-em", name: "電磁気", units: [
        { id: "p8", name: "電場と電位", importance: 2, examFrequency: "high" },
        { id: "p9", name: "コンデンサー", importance: 2, examFrequency: "high" },
        { id: "p10", name: "直流回路（オームの法則・キルヒホッフ）", importance: 2, examFrequency: "high" },
        { id: "p11", name: "電流と磁場（ローレンツ力）", importance: 3, examFrequency: "high" },
        { id: "p12", name: "電磁誘導", importance: 3, examFrequency: "high" },
        { id: "p13", name: "交流", importance: 3, examFrequency: "medium" },
      ]},
      { id: "phy-wave", name: "波動", units: [
        { id: "p14", name: "波の性質（干渉・回折）", importance: 2, examFrequency: "high" },
        { id: "p15", name: "音波（ドップラー効果）", importance: 2, examFrequency: "high" },
        { id: "p16", name: "光波（反射・屈折・干渉）", importance: 2, examFrequency: "high" },
      ]},
      { id: "phy-thermo", name: "熱力学", units: [
        { id: "p17", name: "気体の法則（ボイル・シャルル）", importance: 2, examFrequency: "high" },
        { id: "p18", name: "熱力学第一法則", importance: 2, examFrequency: "high" },
        { id: "p19", name: "気体の状態変化（定圧・定積・断熱）", importance: 3, examFrequency: "medium" },
      ]},
      { id: "phy-atom", name: "原子", units: [
        { id: "p20", name: "光電効果", importance: 2, examFrequency: "medium" },
        { id: "p21", name: "ボーアモデル・水素原子", importance: 2, examFrequency: "medium" },
        { id: "p22", name: "原子核・放射線", importance: 2, examFrequency: "low" },
      ]},
    ],
  },
  {
    subjectId: "chemistry", subjectName: "化学", color: "#EC4899",
    sections: [
      { id: "chem-theory", name: "理論化学", units: [
        { id: "c1", name: "物質量（mol）と化学反応式", importance: 1, examFrequency: "high" },
        { id: "c2", name: "酸と塩基（中和滴定）", importance: 2, examFrequency: "high" },
        { id: "c3", name: "酸化還元反応", importance: 2, examFrequency: "high" },
        { id: "c4", name: "電池と電気分解", importance: 2, examFrequency: "high" },
        { id: "c5", name: "化学平衡（ルシャトリエの原理）", importance: 3, examFrequency: "high" },
        { id: "c6", name: "反応速度", importance: 2, examFrequency: "medium" },
        { id: "c7", name: "気体の法則（理想気体）", importance: 2, examFrequency: "high" },
        { id: "c8", name: "溶液の性質（浸透圧・沸点上昇）", importance: 2, examFrequency: "medium" },
      ]},
      { id: "chem-inorg", name: "無機化学", units: [
        { id: "c9", name: "非金属元素（ハロゲン・酸素・窒素）", importance: 2, examFrequency: "high" },
        { id: "c10", name: "典型金属元素（アルカリ・アルカリ土類）", importance: 2, examFrequency: "high" },
        { id: "c11", name: "遷移元素（鉄・銅・銀）", importance: 2, examFrequency: "medium" },
        { id: "c12", name: "無機工業化学（製鉄・アンモニア合成）", importance: 1, examFrequency: "medium" },
      ]},
      { id: "chem-org", name: "有機化学", units: [
        { id: "c13", name: "脂肪族炭化水素", importance: 2, examFrequency: "high" },
        { id: "c14", name: "アルコール・エーテル・カルボニル化合物", importance: 2, examFrequency: "high" },
        { id: "c15", name: "カルボン酸・エステル", importance: 2, examFrequency: "high" },
        { id: "c16", name: "芳香族化合物", importance: 2, examFrequency: "high" },
        { id: "c17", name: "構造決定問題", importance: 3, examFrequency: "high" },
      ]},
      { id: "chem-polymer", name: "高分子・天然有機", units: [
        { id: "c18", name: "高分子化合物（合成樹脂・繊維）", importance: 2, examFrequency: "medium" },
        { id: "c19", name: "糖類", importance: 2, examFrequency: "medium" },
        { id: "c20", name: "アミノ酸・タンパク質", importance: 2, examFrequency: "medium" },
        { id: "c21", name: "核酸", importance: 1, examFrequency: "low" },
      ]},
    ],
  },
];

// ユーティリティ: 全単元のフラットリスト
export function getAllUnits(): { subjectId: string; subjectName: string; sectionId: string; sectionName: string; unit: CurriculumUnit }[] {
  const result: { subjectId: string; subjectName: string; sectionId: string; sectionName: string; unit: CurriculumUnit }[] = [];
  for (const subject of curriculum) {
    for (const section of subject.sections) {
      for (const unit of section.units) {
        result.push({
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          sectionId: section.id,
          sectionName: section.name,
          unit,
        });
      }
    }
  }
  return result;
}

// セクション単位の集約
export function getSectionsBySubject(subjectId: string): CurriculumSection[] {
  const subject = curriculum.find(s => s.subjectId === subjectId);
  return subject?.sections || [];
}
