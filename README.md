<p align="center">
  <a href="https://v-kurore.com/NestJS/" target="blank"><img src="https://v-kurore.com/hero.png" width="200" alt="v-kurore.com logo" /></a>
</p>

<p align="center">Kuro Doc / NestJS</p>

## This repository

学習用のNestJSプロジェクト。

@see <https://v-kurore.com/NestJS/>

他のプロジェクトと使用するポートのバッティングを防ぐため、デフォルトポートを変更しています。

## Databaseをセットアップする

DatabaseにはMySQLを利用しています。Dockerとdocker-composeのセットアップを済ませておいてください。

@see <https://www.docker.com/get-started/>

### コンテナを起動する

```bash
cd docker
docker-compose up -d
```

コンテナ名：learn-nestdbとadminerが立ち上がります。

### learn-nestdbコンテナ

MySQLのコンテナです。`nestdb`データベースが作成されます。

|項目|値|
|---|---|
|ユーザ名|root|
|パスワード|example|
|PORT|3307|

外部から接続するには3307ポートを使用します。ポートを変更する場合はdocker-compose.ymlを変更してください。

```yml
    ports:
      - 3307:3306  ## 3307を任意のポートに変更することが可能。
```

### adminerコンテナ

[adminer](https://www.adminer.org/)はブラウザから操作できるDatabase Management systemです。

ブラウザから<http://localhost:8090>から接続することができます。ログインに必要な情報は初期状態では下記の通りです。

|項目|値|
|---|---|
|データベース種別|MySQL|
|サーバ|learn-nestdb|
|ユーザ名|root|
|パスワード|example|
|データベース|nestdb|

[MySQL Workbench](https://www.mysql.com/jp/products/workbench/)などの外部ツールを利用する場合は、サーバの指定を`localhost:3307`にする必要があります。

## プロジェクトを起動する

```bash
# install
$ npm i

# development
$ npm run start:dev

```

### 起動の確認

ブラウザから<http://localhost:3000/api>にアクセスし、「Hello World!」が表示されるか確認してください。

## データについて

基本的にフリーです。ですが、商業目的、販売などはご遠慮ください。

ライセンス、利用規約は「データの作成に利用させていただいたサイト」に準拠します。

- [すごい名前生成器](https://namegen.jp/)
- [ゲーム売上定点観測](https://teitengame.com/index.html)
- [郵便局](https://www.post.japanpost.jp/zipcode/dl/oogaki-zip.html)

## License

MIT License
