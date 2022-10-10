let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

c.fillStyle = "rgba(255, 0, 0, 0.5)"; // 채우기 색 설정
c.fillRect(100, 100, 100, 100); // 100,100 위치에 100*100size 만큼 채우기
c.fillStyle = "rgba(0, 255, 0, 0.5)";
c.fillRect(400, 100, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.5)";
c.fillRect(300, 300, 100, 100);
console.log(canvas);

// Line

c.beginPath(); // 그림 그리기 시작!
c.moveTo(50, 300); // 펜 위치 이동
c.lineTo(300, 100); // ~~로 줄을 긋겠다!
c.lineTo(300, 300);
c.lineTo(50, 300);
c.strokeStyle = "#ff0000"; // 색상 변경
c.stroke(); // 경로까지 stroke 실행!

// c.arc(x,y,r,startAngle,endAngle,counterclockwise:) = 원 그리기
c.beginPath();  
c.arc(300, 400, 30, 0, Math.PI / 180 * 360, false);
c.strokeStyle = 'blue';
c.stroke();

for(let i = 0; i<100; i++)
{
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let coloring = Math.floor(Math.random() * 3) + 1;
    c.beginPath();  
    c.arc(x, y, 30, 0, Math.PI / 180 * 360, false);
    if(coloring==1) c.strokeStyle = 'red';
    else if(coloring==2) c.strokeStyle = 'green';
    else if(coloring==3) c.strokeStyle = 'yellow';
    c.stroke();
}