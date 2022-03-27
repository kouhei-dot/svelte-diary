<script>
  import { onDestroy } from 'svelte';
  import { Slider, TextField, Button } from 'smelte';
  import { userId } from '../store';
  import NoticeDialog from './NoticeDialog.svelte';
  import ErrorDialog from './ErrorDialog.svelte';
  import { postDiary } from '../helpers/api';

  let rate = 5;
  let body = '';
  let isShowDialog = false;
  let msg = '';
  let isError = false;

  let uid = null;
  const unsubscribe = userId.subscribe((id) => {
    uid = id;
  });
  onDestroy(() => unsubscribe);

  const submit = async () => {
    if (body.length < 10) {
      msg = '本文は10文字以上で入力してください。';
      isError = true;
      return false;
    }
    const result = await postDiary(uid, rate, body);
    if (result) {
      msg = '日記を追加しました。';
      isShowDialog = true;
    } else {
      msg = '日記の追加に失敗しました。';
      isError = true;
    }
  };

  const onClickOk = () => {
    isShowDialog = false
    document.location.href = '/#';
  };
</script>

<h3>日記を書こう！</h3>
<form on:submit|preventDefault="{submit}">
  <span>今日の気分は{rate}点</span>
  <Slider class="my-6" bind:value={rate} min="1" max="10"></Slider>
  <TextField class="bg-white-900" bind:value={body} label="本文" outlined textarea rows="5"></TextField>
  <Button type="submit" color="accent">日記を保存</Button>
</form>
<NoticeDialog on:ok={onClickOk} showDialog={isShowDialog} msg={msg} />
<ErrorDialog on:ok={() => isError = false} isError={isError} msg={msg} />
