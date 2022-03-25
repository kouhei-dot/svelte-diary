<script>
  import { onMount, onDestroy } from 'svelte';
  import { ProgressLinear } from 'smelte';
  import { Router, Link } from 'svelte-routing';
  import { userId } from '../store';
  import { getDiaries } from '../helpers/api';
  import StarRating from 'svelte-star-rating';
  import dayjs from 'dayjs';

  let uid = '';
  let diaries = getDiaries();

  const starConfig = {
    fullColor: '#C490E4',
  };

  const unsubscribe = userId.subscribe(id => uid = id);
  onMount( async () => {
    diaries = await getDiaries(uid);
  });
  onDestroy(() => unsubscribe);
</script>

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
        <hr />
      </Link>
    {/each}
  </Router>
{/await}
