// SVG Chart generators for HTML reports
// All charts are pure inline SVG - no external dependencies

const COLORS = {
  blue: '#2563eb',
  blueLighter: '#93c5fd',
  green: '#16a34a',
  greenLight: '#86efac',
  red: '#dc2626',
  redLight: '#fca5a5',
  amber: '#f59e0b',
  amberLight: '#fde68a',
  purple: '#8b5cf6',
  purpleLight: '#c4b5fd',
  teal: '#14b8a6',
  pink: '#ec4899',
  gray: '#94a3b8',
  grayLight: '#e2e8f0',
  bg: '#f8fafc',
};

// ============================================================
// Line Chart
// ============================================================
export function svgLineChart(config: {
  data: { label: string; values: { name: string; value: number }[] }[];
  width?: number;
  height?: number;
  colors?: string[];
  yMin?: number;
  yMax?: number;
  title?: string;
}): string {
  const { data, width = 700, height = 280, yMin = 20, yMax = 100, title } = config;
  const colors = config.colors || [COLORS.blue, COLORS.green, COLORS.amber, COLORS.red];
  const pad = { top: 30, right: 20, bottom: 50, left: 50 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;

  if (data.length === 0) return '';
  const seriesNames = data[0].values.map(v => v.name);
  const n = data.length;

  const scaleX = (i: number) => pad.left + (i / (n - 1)) * w;
  const scaleY = (v: number) => pad.top + h - ((v - yMin) / (yMax - yMin)) * h;

  // Grid lines
  const gridLines = [yMin, yMin + (yMax - yMin) * 0.25, yMin + (yMax - yMin) * 0.5, yMin + (yMax - yMin) * 0.75, yMax]
    .map(v => `<line x1="${pad.left}" y1="${scaleY(v)}" x2="${width - pad.right}" y2="${scaleY(v)}" stroke="${COLORS.grayLight}" stroke-dasharray="4 3"/><text x="${pad.left - 8}" y="${scaleY(v) + 4}" text-anchor="end" fill="${COLORS.gray}" font-size="10">${v}</text>`)
    .join('');

  // X labels
  const xLabels = data.map((d, i) => `<text x="${scaleX(i)}" y="${height - 10}" text-anchor="middle" fill="${COLORS.gray}" font-size="10">${d.label}</text>`).join('');

  // Series
  const lines = seriesNames.map((name, si) => {
    const points = data.map((d, i) => {
      const v = d.values.find(v => v.name === name);
      return { x: scaleX(i), y: scaleY(v?.value || 0) };
    });
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const dots = points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${colors[si % colors.length]}" stroke="white" stroke-width="2"/>`).join('');
    return `<path d="${path}" fill="none" stroke="${colors[si % colors.length]}" stroke-width="2.5" stroke-linejoin="round"/>${dots}`;
  }).join('');

  // Legend
  const legend = seriesNames.map((name, i) =>
    `<rect x="${pad.left + i * 120}" y="${height - 28}" width="14" height="4" rx="2" fill="${colors[i % colors.length]}"/>` +
    `<text x="${pad.left + i * 120 + 18}" y="${height - 24}" fill="${COLORS.gray}" font-size="10">${name}</text>`
  ).join('');

  const titleEl = title ? `<text x="${width / 2}" y="16" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">${title}</text>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;margin:12px auto;display:block;">
    <rect width="${width}" height="${height}" rx="8" fill="${COLORS.bg}" stroke="${COLORS.grayLight}"/>
    ${titleEl}${gridLines}${xLabels}${lines}${legend}
  </svg>`;
}

// ============================================================
// Bar Chart
// ============================================================
export function svgBarChart(config: {
  data: { label: string; values: { name: string; value: number }[] }[];
  width?: number;
  height?: number;
  colors?: string[];
  yMax?: number;
  title?: string;
  unit?: string;
}): string {
  const { data, width = 700, height = 260, yMax = 40, title, unit = '' } = config;
  const colors = config.colors || [COLORS.blue, COLORS.blueLighter];
  const pad = { top: 30, right: 20, bottom: 50, left: 50 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const n = data.length;
  const seriesCount = data[0]?.values.length || 1;
  const groupWidth = w / n;
  const barWidth = Math.min(28, (groupWidth - 12) / seriesCount);

  const scaleY = (v: number) => pad.top + h - (v / yMax) * h;

  const gridLines = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax]
    .map(v => `<line x1="${pad.left}" y1="${scaleY(v)}" x2="${width - pad.right}" y2="${scaleY(v)}" stroke="${COLORS.grayLight}" stroke-dasharray="4 3"/><text x="${pad.left - 8}" y="${scaleY(v) + 4}" text-anchor="end" fill="${COLORS.gray}" font-size="10">${v}${unit}</text>`)
    .join('');

  const bars = data.map((d, i) => {
    const groupX = pad.left + i * groupWidth + groupWidth / 2;
    const barsInGroup = d.values.map((v, si) => {
      const x = groupX - (seriesCount * barWidth) / 2 + si * barWidth + 1;
      const barH = (v.value / yMax) * h;
      return `<rect x="${x}" y="${scaleY(v.value)}" width="${barWidth - 2}" height="${barH}" rx="3" fill="${colors[si % colors.length]}"/>
        <text x="${x + (barWidth - 2) / 2}" y="${scaleY(v.value) - 4}" text-anchor="middle" fill="${COLORS.gray}" font-size="9">${v.value}</text>`;
    }).join('');
    const label = `<text x="${groupX}" y="${height - 12}" text-anchor="middle" fill="${COLORS.gray}" font-size="10">${d.label}</text>`;
    return barsInGroup + label;
  }).join('');

  const seriesNames = data[0]?.values.map(v => v.name) || [];
  const legend = seriesNames.map((name, i) =>
    `<rect x="${pad.left + i * 100}" y="${height - 30}" width="14" height="8" rx="2" fill="${colors[i % colors.length]}"/>` +
    `<text x="${pad.left + i * 100 + 18}" y="${height - 22}" fill="${COLORS.gray}" font-size="10">${name}</text>`
  ).join('');

  const titleEl = title ? `<text x="${width / 2}" y="16" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">${title}</text>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;margin:12px auto;display:block;">
    <rect width="${width}" height="${height}" rx="8" fill="${COLORS.bg}" stroke="${COLORS.grayLight}"/>
    ${titleEl}${gridLines}${bars}${legend}
  </svg>`;
}

// ============================================================
// Horizontal Bar Chart (for unit scores)
// ============================================================
export function svgHorizontalBarChart(config: {
  data: { label: string; value: number; compare?: number }[];
  width?: number;
  height?: number;
  color?: string;
  compareColor?: string;
  maxValue?: number;
  title?: string;
}): string {
  const { data, width = 700, maxValue = 100, title } = config;
  const color = config.color || COLORS.blue;
  const compareColor = config.compareColor || COLORS.grayLight;
  const barHeight = 22;
  const gap = 8;
  const labelWidth = 160;
  const valueWidth = 50;
  const pad = { top: title ? 36 : 16, left: 10, right: 10 };
  const height = pad.top + data.length * (barHeight + gap) + 16;
  const barArea = width - labelWidth - valueWidth - pad.left - pad.right;

  const bars = data.map((d, i) => {
    const y = pad.top + i * (barHeight + gap);
    const barW = (d.value / maxValue) * barArea;
    const compareW = d.compare ? (d.compare / maxValue) * barArea : 0;
    const diff = d.compare ? d.value - d.compare : 0;
    return `
      ${d.compare ? `<rect x="${labelWidth}" y="${y}" width="${compareW}" height="${barHeight}" rx="4" fill="${compareColor}" opacity="0.5"/>` : ''}
      <rect x="${labelWidth}" y="${y}" width="${barW}" height="${barHeight}" rx="4" fill="${color}" opacity="0.85"/>
      <text x="${labelWidth - 8}" y="${y + barHeight / 2 + 4}" text-anchor="end" fill="#334155" font-size="11" font-weight="500">${d.label}</text>
      <text x="${labelWidth + barW + 6}" y="${y + barHeight / 2 + 4}" fill="#334155" font-size="11" font-weight="600">${d.value}%</text>
      ${d.compare ? `<text x="${labelWidth + barW + 42}" y="${y + barHeight / 2 + 4}" fill="${diff < 0 ? '#dc2626' : '#16a34a'}" font-size="10" font-weight="600">${diff > 0 ? '+' : ''}${diff}%</text>` : ''}
    `;
  }).join('');

  const titleEl = title ? `<text x="${width / 2}" y="20" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">${title}</text>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;margin:12px auto;display:block;">
    <rect width="${width}" height="${height}" rx="8" fill="${COLORS.bg}" stroke="${COLORS.grayLight}"/>
    ${titleEl}${bars}
  </svg>`;
}

// ============================================================
// Radar Chart
// ============================================================
export function svgRadarChart(config: {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
  maxValue?: number;
  title?: string;
}): string {
  const { data, width = 340, height = 340, maxValue = 100, title } = config;
  const color = config.color || COLORS.green;
  const cx = width / 2;
  const cy = (title ? height / 2 + 10 : height / 2);
  const r = Math.min(cx, cy) - 60;
  const n = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const levels = [0.25, 0.5, 0.75, 1.0];
  const gridLines = levels.map(l => {
    const points = Array.from({ length: n }, (_, i) => {
      const a = angle(i);
      return `${cx + Math.cos(a) * r * l},${cy + Math.sin(a) * r * l}`;
    }).join(' ');
    return `<polygon points="${points}" fill="none" stroke="${COLORS.grayLight}" stroke-width="1"/>`;
  }).join('');

  const axes = Array.from({ length: n }, (_, i) => {
    const a = angle(i);
    return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * r}" y2="${cy + Math.sin(a) * r}" stroke="${COLORS.grayLight}"/>`;
  }).join('');

  const labels = data.map((d, i) => {
    const a = angle(i);
    const lx = cx + Math.cos(a) * (r + 30);
    const ly = cy + Math.sin(a) * (r + 30);
    const anchor = Math.abs(Math.cos(a)) < 0.1 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
    return `<text x="${lx}" y="${ly}" text-anchor="${anchor}" fill="#334155" font-size="11" font-weight="500">${d.label}</text>
      <text x="${lx}" y="${ly + 14}" text-anchor="${anchor}" fill="${d.value >= 80 ? '#16a34a' : d.value >= 70 ? '#d97706' : '#dc2626'}" font-size="11" font-weight="700">${d.value}%</text>`;
  }).join('');

  const dataPoints = data.map((d, i) => {
    const a = angle(i);
    const v = d.value / maxValue;
    return `${cx + Math.cos(a) * r * v},${cy + Math.sin(a) * r * v}`;
  }).join(' ');

  const dots = data.map((d, i) => {
    const a = angle(i);
    const v = d.value / maxValue;
    return `<circle cx="${cx + Math.cos(a) * r * v}" cy="${cy + Math.sin(a) * r * v}" r="4" fill="${color}" stroke="white" stroke-width="2"/>`;
  }).join('');

  const titleEl = title ? `<text x="${cx}" y="18" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="600">${title}</text>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;max-width:${width}px;margin:12px auto;display:block;">
    <rect width="${width}" height="${height}" rx="8" fill="${COLORS.bg}" stroke="${COLORS.grayLight}"/>
    ${titleEl}${gridLines}${axes}
    <polygon points="${dataPoints}" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="2.5"/>
    ${dots}${labels}
  </svg>`;
}

// ============================================================
// Donut / Pie Chart
// ============================================================
export function svgDonutChart(config: {
  value: number;
  max?: number;
  size?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}): string {
  const { value, max = 100, size = 120, label, sublabel } = config;
  const color = config.color || COLORS.blue;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const circumference = 2 * Math.PI * r;
  const pct = value / max;
  const offset = circumference * (1 - pct);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size + (sublabel ? 30 : 20)}" style="width:${size}px;display:inline-block;vertical-align:top;">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${COLORS.grayLight}" stroke-width="8"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="8" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" fill="#1e293b" font-size="18" font-weight="700">${value}</text>
    <text x="${cx}" y="${cy + 14}" text-anchor="middle" fill="${COLORS.gray}" font-size="10">${label || ''}</text>
    ${sublabel ? `<text x="${cx}" y="${size + 14}" text-anchor="middle" fill="#334155" font-size="11" font-weight="500">${sublabel}</text>` : ''}
  </svg>`;
}
