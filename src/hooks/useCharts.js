const themes = {
  color10: [
    '#5B8FF9',
    '#61DDAA',
    '#65789B',
    '#F6BD16',
    '#7262fd',
    '#78D3F8',
    '#9661BC',
    '#F6903D',
    '#008685',
    '#F08BB4',
  ],
  color20: [
    '#5B8FF9',
    '#CDDDFD',
    '#61DDAA',
    '#CDF3E4',
    '#65789B',
    '#CED4DE',
    '#F6BD16',
    '#FCEBB9',
    '#7262fd',
    '#D3CEFD',
    '#78D3F8',
    '#D3EEF9',
    '#9661BC',
    '#DECFEA',
    '#F6903D',
    '#FFE0C7',
    '#008685',
    '#BBDEDE',
    '#F08BB4',
    '#FFE0ED',
  ],
}

export function useChartsColor(name) {
  return themes[name] || themes.color10
}
