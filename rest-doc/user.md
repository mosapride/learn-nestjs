# REST Client : user

## GET /user

ユーザー情報を返す

### Parameters

|Name|Required|Type|Description|Default Value|Example|
|---|---|---|---|---|---|
|part|optional|string[]|レスポンス情報に指定したテーブル情報を追加します。カンマ区切りリストの形式で指定します。<br>以下の値を設定できます<br>・ `address` - 住所情報<br>・`game` - 所持ゲーム情報||address,game|
|maxResults|optional|number|返されるアイテムの最大数を指定します。1以上100以下の値を設定できます。|10|10|
|searchKana|optional|string|指定したカナ文字を含む情報のみを返します。カナ文字は全角のみ指定可能です。||タナカ|

## GET /user/:id

指定したユーザーの情報を返す

### Parameters

|Name|Required|Type|Description|Default Value|Example|
|---|---|---|---|---|---|
|:id|required|number|`user.user_id`を指定する||1|
|part|optional|string[]|レスポンス情報に指定したテーブル情報を追加します。カンマ区切りリストの形式で指定します。<br>以下の値を設定できます<br>・ `address` - 住所情報<br>・`game` - 所持ゲーム情報||address,game|
