var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();

console.clear();
const container = document.querySelector('.container');

const crossword =
  `Australia
m    l
burglar
u    r
s    myriad
h         r
          a
          m
          a

*********
*    *
*******
*    *
*    ******
*         *
          *
          *
          *
`;
const textArea = document.querySelector('textarea');
textArea.value = crossword;
textArea.addEventListener('input', () => draw(textArea.value));

function draw(text) {
  console.log('drawing')
  container.innerHTML = '';
  const lines = text.split('\n');
  lines.forEach((line, lineNum) => {
    const tds = [];
    let lastCount = lineNum === 0 ? 0 : container.querySelectorAll('td').length + container.querySelectorAll('tr').length;
    let curCount = 0;
    line.split('').forEach((ch, i) => {
      const td = document.createElement('td');
      td.classList.add(ch === ' ' ? 'blank' : 'ch');
      td.textContent = ch !== '*' ? ch : ' ';
      if (ch === '*') {
        td.contentEditable = 'true';
        td.style.color = 'blue'; // through and through
      }
      td.dataset.index = lastCount + curCount;
      curCount += td.classList.contains('ch') ? 1 : 1;
      tds.push(td);
    });
    const tr = document.createElement('tr');
    tds.forEach(td => tr.appendChild(td));
    container.appendChild(tr);
  });
}
/*draw(crossword);

function getHorizontals(text) {
  const horizontals = [];
  text.split('\n').slice(1, text.split('\n').length - 1)
    .filter((l, i) => {
      const words = l.split(' ').filter(w => w.length > 1);
      if (words.length) words.forEach(wo => horizontals.push(wo));
      return words.length;
    });
  const re = /(\w{2,})/g;
  var arr = [];
  var cur;
  while (cur = re.exec(text)) {
    arr.push({
      word: cur[0],
      i: cur.index
    });
    container.querySelector(`[data-index="${cur.index}"]`).dataset.superScript = arr.length;
  }

  console.log(arr)
  return horizontals;
}
const xWords = getHorizontals(crossword);

function getVerticals(text) {
  const horizontalsMap = [];
  const lines = text.split('\n\n')[0].split('\n');
  lines.forEach((line, i) => {
    const chars = line.split('');
    chars.forEach((letter, j) => {
      const nextLine = i < lines.length - 1 ? lines[i + 1].split('') : []; // chars
      if (j <= nextLine.length - 1 && chars[j] !== ' ' && nextLine[j] !== ' ') {
        console.log(`${chars[j]}, i=${i}, j=${j}`);
        horizontalsMap.push({
          letter: chars[j],
          row: i,
          col: j
        });
        if (i === lines.length - 1) horizontalsMap.push({
          letter: nextLine[j],
          row: i + 1,
          col: j
        });
      }
    });
  });
  const horizontalObjs = horizontalsMap.sort(compareCol).reduce((acc, cur, i) => {
    console.log(acc, cur, i)
    if (!acc[cur.col]) acc[cur.col] = [];
    acc[cur.col].push(cur);
    return acc;
  }, {});
  const horizontals = Object.keys(horizontalObjs).map(key => {
    return horizontalObjs[key].sort(compareRow);
  });
  return horizontals;
}

function compareCol(a, b) {
  if (a.col < b.col)
    return -1;
  if (a.col > b.col)
    return 1;
  return 0;
}

function compareRow(a, b) {
  if (a.row < b.row)
    return -1;
  if (a.row > b.row)
    return 1;
  return 0;
}
const yWords = getVerticals(crossword);
console.log(yWords);
