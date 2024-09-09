# 헤더로 메타데이터를 전달

파일 다운로드 시 Content-Disposition 헤더를 설정하여 클라이언트에 파일을 제공할 수 있다.  
특히 파일 이름을 인코딩하여 다국어 파일 이름을 처리하거나, 파일을 다운로드로 제공하고 싶을 때 Content-Disposition을 사용한다.

## 예시

```
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

@Controller('files')
export class FileController {

  @Get('download')
  downloadFile(@Res() res: Response) {
    const filePath = path.join(__dirname, '..', 'files', 'example.txt'); // 파일 경로
    const fileName = 'example_파일.txt'; // 파일 이름
    const mimeType = mime.lookup(filePath); // MIME 타입
    const encodedFileName = encodeURIComponent(fileName); // 파일명 UTF-8 인코딩

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;  // 파일의 전체 크기

    // 파일 스트림 생성
    const fileStream = fs.createReadStream(filePath);

    // 헤더 설정
    res.setHeader('Content-Length', fileSize);  // Content-Length 설정
    res.setHeader('Content-Type', mimeType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodedFileName}`,
    );

    // 파일 전송
    fileStream.pipe(res);
  }
}

```

fs.createReadStream으로 파일을 스트림으로 읽어온다.  
Content-Disposition 헤더에 attachment를 설정하여 파일을 다운로드한다고 알려주고 파일 이름을 UTF-8로 인코딩한다.

## utf-8 과 utf8mb4

utf-8

- UTF-8은 가변 길이 인코딩 방식으로, 1바이트에서 4바이트까지 다양한 크기로 문자를 인코딩할 수 있다.
- 영어는 1바이트, 한글이나 일본어 등의 문자는 보통 3바이트를 사용한다.
- UTF-8은 한국어를 포함한 다양한 언어를 지원하는 범용 인코딩 방식이다.
-

utf8mb4

- UTF-8의 확장 버전으로, 4바이트까지 인코딩을 지원하는 방식
- UTF-8 자체도 4바이트 문자를 지원하지만, MySQL 등의 일부 데이터베이스에서 기본적으로 UTF-8은 3바이트까지만 지원하기 때문에, 4바이트 문자를 처리하려면 UTF-8MB4를 사용해야한다.
- 일반적인 한국어 인코딩에는 UTF-8만으로 충분하지만, 4바이트 문자를 처리하려면 UTF-8MB4를 사용해야 한다.(이모지(emoji) 같은 경우가 4바이트)

## application/octet-stream과 mimeType

application/octet-stream

- 바이너리 데이터, 즉 "알 수 없는 이진 데이터"를 의미함
- 주로 파일 다운로드를 위해 사용됩니다. 브라우저는 이 MIME 타입을 받으면, 데이터를 파일로 취급하여 다운로드하도록 동작
- 파일의 타입이 명확하지 않거나 특정 파일 형식에 구애받지 않고 다운로드 용도로 파일을 전송할 때 사용하며 브라우저는 이 값을 받으면 데이터를 직접 열기보다는 파일로 다운로드한다.

mimeType (text/plain, image/png, application/pdf)

- 실제 파일의 정확한 MIME 타입을 의미
- 파일의 형식에 따라 적절한 MIME 타입을 명시하여, 클라이언트가 파일을 어떻게 처리할지를 결정함
- text/plain: 텍스트 파일, image/png: PNG 이미지 파일, application/pdf: PDF 파일 처럼 명확하다.
- 브라우저가 텍스트나 이미지를 직접 표시할 수 있는 상황에서는 이 타입을 명시함

## GeoIP 서비스를 사용하여 IP를 조회한 국가 정보 전달

```
// 바디로 전달
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as geoip from 'geoip-lite';

@Controller('location')
export class LocationController {
  @Get('country')
  getCountry(@Req() req: Request, @Res() res: Response) {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    if (geo) {
      return res.json({
        country: geo.country,
        region: geo.region,
        city: geo.city,
      });
    } else {
      return res.json({ message: 'Location not found' });
    }
  }
}

// 헤더로 전달
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as geoip from 'geoip-lite';

@Controller('location')
export class LocationController {
  @Get('country')
  getCountry(@Req() req: Request, @Res() res: Response) {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    if (geo) {
      // 헤더에 국가 정보를 추가
      res.setHeader('X-Country', geo.country);
      res.setHeader('X-Region', geo.region);
      res.setHeader('X-City', geo.city);

      return res.json({ message: 'Country information added to headers' });
    } else {
      return res.json({ message: 'Location not found' });
    }
  }
}

```

국가 정보(예: X-Country, X-Region, X-City)를 HTTP 응답 헤더에 담아서 프론트엔드에 전달할 수 있다.  
바디로도 전달할 수 있으며 팀 내 규약 혹은 API 설계대로 전달하면 된다.

## 바디, 헤더 기준

![헤더 혹은 바디](/asset/header.png)
