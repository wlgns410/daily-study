# net, dgram, websocket

net, dgram, websocket 모두 네트워크 통신을 위한 js 라이브러리이다.  
하지만 서로 다른 사용 목적이 있다.  
이를 알아보자.

## net

프로토콜 : TCP
목적 : 안정적이고 잃어버리면 안되는 데이터가 있을 때 사용
특징

- 연결 지향적 : 서버와 클라이언트 간 연결을 해야만 통신 가능
- 데이터 순서 전달 보장 : 목적지 도달할 때까지 신뢰할 수 있는 방식으로 전달하며 이 데이터가 순차적으로 도착하는 것이 보장됨
- 스트리밍 지원 : 스트림 기반 통신이므로 연속적으로 읽고 쓸 수 있음

```
import net from 'net'

const clinets = []

const server = net.createServer((s) => {

    // 클라이언트를 배열 안에 삽입
    clients.push(s)

    console.log(`새 클라이언트가 연결되었습니다. 현재 연결된 클라이언트 수: ${clients.length}`);

    // 연결처리
    socket.on('data', (d) => {
    })

    // 끊김처리
    socket.on('finish', ()=>{
        const index = clients.indexOf(s) // 배열에서 소켓이 존재하면 그 인덱스를 반환하고, 존재하지 않으면 -1을 반환
        if (index !== -1){ // 배열에서 소켓이 존재하는지 확인하는 조건
            clients.splice(index, 1) // index 위치의 소켓 클라이언트를 배열에서 1개 제거
        }
    })
})

// 테스트

clients = [socket1, socket2, socket3];
const index = clients.indexOf(socket2);  // index = 1
clients = [socket1, socket3]; // 결과
```

## dgram

프로토콜 : UDP
용도 : 빠른 전송이 필요하지만 손상되도 괜찮은 경우(스트리밍 영상, 센터 데이터)
특징

- 연결 비지향적 : 서버와 클라이언트 연결이 되지 않아도 전송
- 데이터 전달 비보장 : 목적지에 도달하지 않아도 되며, 순서가 보장되지 않는다. 따라서 속도가 빠르다(정렬 안해서)
- 스트리밍 미지원 : 각 데이터 패킷이 독립적이라 스트림 기반이 아님

```
import dgram from 'dgram'

const server dgram.createServer('udp4')

server.on('message', (msg, reInfo) =>{
    const responseMessage = `메시지 받았습니다 ${msg}`
    server.send(responseMessage, reInfo.port, reInfo.address, (err) => {
        if(err) {
            // 뭐시기
        } else {
            // 뭐시기
        }
    })
})

```

UDP 특성상 패킷이 독립적인 특성이 있어 다음 데이터 패킷을 계속 처리하지 않으면 지연이 발생하거나 전체 스트림이 멈추거나 버퍼링이 발생해 사용자 경험이 더 나빠지는 문제가 발생할 수 있다고 한다.  
그래서 새 패킷을 받기 위해 못받은 패킷 데이터는 무시하는 것으로 처리한다.

버퍼링과 FEC 같은 기술을 통해 패킷 손실로 인한 문제를 보완하거나 재시도 로직을 통해 못받은 패킷을 처리할 수도 있긴하다고 한다.

## websockets

프로토콜 : TCP(websocket)
용도 : 양방향, 실시간 통신이 필요한 경우(실시간 채팅)
특징

- TCP 기반이라 HTTP로 연결을 시작한 후 지속적인 양방향 연결을 유지
- 양방향 통신 : 서버가 먼저 클라이언트에게 메시지를 보낼 수도 있음
- 브라우저 호환성 : 웹 어플리케이션과 자주 사용되며 웹 브라우저가 기본 제공함

```
import WebSocket from 'ws'

const wss = new WebSocket.Server({port:3000})

wss.on('connection', (ws)=>{
    ws.on(m, (m)=>{
        // 뭐시기
    })
})

```

## 정리

- net: 안정적이고 신뢰성 있는 데이터 전송이 필요할 때 (예: 파일 전송, 웹 서버 통신)
- dgram: 빠른 전송이 필요하고, 데이터 손실이나 순서가 중요하지 않은 경우 (예: 스트리밍, 실시간 게임)
- websockets: 실시간 양방향 통신이 필요한 웹 애플리케이션 (예: 실시간 채팅, 주식 거래 시스템)
