<script>
  import { onMount } from 'svelte';
  import { ProgressLinear, Slider, TextField, Button } from 'smelte';
  import { getDiary } from '../helpers/api';
  import dayjs from 'dayjs';

  export let id;
  let rate, body;
  let diary = getDiary();

  onMount(async () => {
    diary = await getDiary(id);
    rate = diary.rate;
    body = diary.body;
  });
</script>

{#await diary}
  <p>Now Loading...</p>
  <ProgressLinear />
{:then}
  <h4>{dayjs(diary.createdAt).format('YYYY年MM月DD日')}</h4>
  <img src={diary.image || '/dummy.jpeg'} alt="diary"/>
  <div class="mt-4">今日の気分は{rate}点</div>
  <Slider class="my-4" bind:value={rate} min="1" max="10"></Slider>
  <TextField class="bg-white-900" bind:value={body} label="本文" outlined textarea rows="5"></TextField>
  <Button class="mb-4" type="submit" color="accent">日記を更新</Button>
{/await}
