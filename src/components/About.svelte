<script>
  import { fade } from 'svelte/transition';
  import { quartIn } from 'svelte/easing';
</script>

<section in:fade={{ easing: quartIn, duration: 500, delay: 300 }}>
  <h1 class="h3">日記の効果とは？</h1>
  <p>
    書くことによって「自分でも継続出来た」という自信がつき、
    勉強や運動など他のことにもチャレンジしやすくなります。
  </p>
  <h2 class="h4">書くことは精神的な健康をもたらす</h2>
  <p>
    書くことはあなたの健康に素晴らしい影響を及ぼします。
    クリエイティビティを保つこと以外にも、日々のストレスを解き放つ働きをしてくれます。
  </p>
  <h2 class="h4">実用的なメリットも</h2>
  <p>
    書き続けることは実用的でもあります。
    過去の過ち、栄光、素敵な思い出などをリマインドしてくれるのです。
  </p>
</section>

<style>
  p {
    margin-bottom: 1.5rem;
  }
</style>
