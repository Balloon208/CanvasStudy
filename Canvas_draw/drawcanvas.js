let canvas = document.querySelector('canvas') // canvas 구역 들고옴

canvas.width = window.innerWidth; // 캔버스 넓이 설정
canvas.height = window.innerHeight;

let c = canvas.getContext('2d'); // 2d canvas받기

/*

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

*/

let mouse = {
    x: undefined,
    y: undefined
}

let Maxradius = 50;
// let Minradius = 5;

let colorArray = [
    '#ffaa33',
    '#99ffaaa',
    '#00ff00',
    '#4411aa',
    '#ff1100'
]

window.addEventListener('mousemove',
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, dx, dy, radius){ // 각 원 개체에서 실행되는 함수
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.Minradius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360, false);
        c.strokeStyle = 'white';
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
        {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
        {
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        // interactive
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < Maxradius) this.radius +=1 ;
        }
        else if(this.radius > this.Minradius){
            this.radius -=1;
        }

        this.draw();
    }

    
}

let circleArray = [];

function init(){
    circleArray = [];
    for(let i=0; i<1000; i++)
    {
        let radius = Math.random() * 3 + 1;
        let speed = 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius; // 범위를 벗어나지 않기 위해 수식을 넣어준다
        let y = Math.random() * (innerHeight - radius * 2) + radius; 
        let dx = (Math.random() - 0.5) * speed;
        let dy = (Math.random() - 0.5) * speed;
        circleArray.push(new Circle(x, y, dx, dy, radius)); // 함수를 실행시키고, 배열에 해당 개체를 집어 넣는다.
    }
}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate); // 애니메이션 사용 요청 (재귀)
    c.clearRect(0, 0, innerWidth, innerHeight); // 화면을 비운다.
    for(let i=0; i<circleArray.length; i++) // 각 개체마다 업데이트를 해주는 함수
    {
        circleArray[i].update();
    }
}

animate();
init();