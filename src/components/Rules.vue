<template>
    <section class="subsection" id="rules">
        <h2>Rules</h2>
        <h3>POINTS</h3>
        <ul>
            <li>Show up at official Movie Night = 1 point</li>
            <li>First time showing up = 3 points</li>
        </ul>

        <h3>PICKS</h3>
        <ul>
           <li>Spend 3 points to secure a pick</li>
            <li>Picks can be outbid by adding an additional point (if you hate the movie or whatever)</li>
            <li>Pick spots are made on a first-come-first-serve basis</li>
        </ul>

        <h2>Admin</h2>
        <div>
            <h3>Current night: Doom, Lifeforce</h3>
            <h3>Attendees &amp; ratings:</h3>
            <ul class="list-inline">
                <li>Thane -- 😐, 😐</li>
                <li>Larry -- 😐, 😐</li>
                <li>Chris -- <strong>none!</strong></li>
                <li>Jackson -- 😐, 😐</li>
            </ul>
            <button class="btn btn--mini">Complete night &amp; create next week</button>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Rules'
}
</script>
