import GM from 'gm';
GM('../../public/test.png').size((a, b) => {
  console.log(a, b);
});
