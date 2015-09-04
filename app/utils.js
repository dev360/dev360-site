

export default function curColor () {
  var n = new Date().getMilliseconds();
  var f = n / 1000;
  return 'rgb(' + (Math.floor(f * 256)) + ',' + (Math.floor(f * 256)) + ',' + (Math.floor(f * 256)) + ')'; 
}
