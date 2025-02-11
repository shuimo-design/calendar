/**
 * @description
 * @author 阿怪
 * @date 2025/1/20 22:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export const weekInfo = ['日', '壹', '贰', '叁', '肆', '伍', '陆'];


/**
 * 甲木、乙木、丙火、丁火、戊土、己土、庚金、辛金、壬水、癸水，
 * 甲丙戊庚壬为阳性，
 * 乙丁己辛癸为阴性。
 */
export const TianGanColor: Record<string, string> = {
  '甲': 'var(--m-color-mu-yang)',
  '乙': 'var(--m-color-mu-yin)',
  '丙': 'var(--m-color-huo-yang)',
  '丁': 'var(--m-color-huo-yin)',
  '戊': 'var(--m-color-tu-yang)',
  '己': 'var(--m-color-tu-yin)',
  '庚': 'var(--m-color-jin-yang)',
  '辛': 'var(--m-color-jin-yin)',
  '壬': 'var(--m-color-shui-yang)',
  '癸': 'var(--m-color-shui-yin)',
};

// 亥子属水，寅卯属木，巳午属火，申酉属金，辰戌丑未属土。
export const DiZhiColor: Record<string, string> = {
  '子': 'var(--m-color-blue)',
  '丑': 'var(--m-color-warn)',
  '寅': 'var(--m-color-green)',
  '卯': 'var(--m-color-green)',
  '辰': 'var(--m-color-warn)',
  '巳': 'var(--m-color-main)',
  '午': 'var(--m-color-main)',
  '未': 'var(--m-color-warn)',
  '申': 'var(--m-color-orange)',
  '酉': 'var(--m-color-orange)',
  '戌': 'var(--m-color-warn)',
  '亥': 'var(--m-color-blue)',
};
