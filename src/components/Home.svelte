<script>
  import { onMount, onDestroy } from 'svelte';
  import { ProgressLinear, Button } from 'smelte';
  import { Router, Link } from 'svelte-routing';
  import { userId } from '../store';
  import { getDiaries } from '../helpers/api';
  import { googleSignIn } from '../helpers/firebase';
  import StarRating from 'svelte-star-rating';
  import dayjs from 'dayjs';

  let uid = '';
  let diaries = getDiaries();

  const starConfig = {
    fullColor: '#C490E4',
  };

  const unsubscribe = userId.subscribe(id => uid = id);
  onMount(async () => {
    diaries = await getDiaries(uid);
  });
  onDestroy(() => unsubscribe);
</script>

{#if uid}
  {#await diaries}
    <p>Now Loading...</p>
    <ProgressLinear color="accent" />
  {:then diaries}
    <Router>
      {#each diaries as diary}
        <Link to={`/diary/${diary.id}`}>
          <div class="flex flex-col items-center">
            <span>{dayjs(diary.createdAt).format('YYYY年MM月DD日')}</span>
            <img class="h-2/5 w-2/5" src={diary.image || '/dummy.jpeg'} alt="diary" />
            <StarRating rating={diary.rate / 2} config={starConfig} />
          </div>
          <div>{diary.body}</div>
        </Link>
        <div class="my-4 border-b-2 border-gray-300"></div>
      {/each}
    </Router>
  {/await}
{:else}
  <Button class="mt-10" color="accent" on:click={googleSignIn}>ログイン</Button>
{/if}
